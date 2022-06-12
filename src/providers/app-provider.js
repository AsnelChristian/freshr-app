import { createContext, useState } from "react";
import { flashMessageStyle, getError, getTokenAndCreateAuthorizationHeader, sendMessage } from "./utils";
import FlashMessage, { showMessage } from "react-native-flash-message";
import axios from "axios";
import { BASE_API_URL } from "../constants";
import * as SecureStore from "expo-secure-store";
import { useRef } from "react";
import { useTheme } from "styled-components/native";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const flashRef = useRef();
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [currentApp, setCurrentApp] = useState('normal')
  const [error, setError] = useState(null);

  const handleError = (e) => {
    setLoading(false);
    setError(getError(e));
    sendMessage(
      "Failure",
      getError(e).message,
      "danger",
      2500,
      theme.colors.ui.error
    );
    console.log(e);
  }

  const handleSuccess = (res) => {
    sendMessage(
      "Updated",
      res.data.message,
      "success",
      1000,
      theme.colors.brand.primary
    );
    setLoading(false);
  }

  const loadFilters = async () => {
    try {
      setLoading(true);
      const resCategories = await axios.get(
        `${BASE_API_URL}/filters/serviceCategories`
      );
      const resServiceTypes = await axios.get(
        `${BASE_API_URL}/filters/serviceTypes`
      );

      console.log(resCategories.data);

      const serviceCategories = resCategories.data.data.categories;
      const serviceTypes = resServiceTypes.data.data.serviceTypes;
      setLoading(false);
      return { serviceCategories, serviceTypes };
    } catch (e) {
      handleError(e)
    }
  };

  const getUser = async () => {
    try {
      setLoading(true);
      const token = await SecureStore.getItemAsync("token");

      const res = await axios.get(`${BASE_API_URL}/users/getMe`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLoading(false);
      handleSuccess(res)
      return res.data.data;
    } catch (e) {
      handleError(e)
    }
  };

  const onCreateService = async (data) => {
    try {
      setLoading(true);
      const config = await getTokenAndCreateAuthorizationHeader()
      const res = await axios.post(
        `${BASE_API_URL}/specialists/specialist/services`,
        data,
        config,
      );
      handleSuccess(res)
      return res.data.data.service;
    } catch (e) {
      handleError(e);
    }
  }

  const onGetServices = async () => {
    try  {
      setLoading(true);
      const config = await getTokenAndCreateAuthorizationHeader();
      const res = await axios.get(`${BASE_API_URL}/specialists/specialist/services`, config)
      handleSuccess(res);
      return res.data.data.services;
    } catch (err) {
      handleError(err)
    }
  }

  return (
    <AppContext.Provider
      value={{
        error,
        loadFilters,
        loading,
        currentApp,
        changeApp: val => setCurrentApp(val),
        getUser,
        onCreateService,
        onGetServices
      }}
    >
      <FlashMessage ref={flashRef} />
      {children}
    </AppContext.Provider>
  );
};

