import { useTheme } from "styled-components/native";
import { createContext, useRef, useState } from "react";
import axios from "axios";
import { BASE_API_URL } from "../constants";
import * as SecureStore from "expo-secure-store";
import FlashMessage from "react-native-flash-message";
import { getError, getTokenAndCreateAuthorizationHeader, sendMessage } from "./utils";

export const PreferencesContext = createContext();

export const PreferencesProvider = ({ children, ...restProps }) => {
  const theme = useTheme();
  const flashRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateGenderPreference = async (gender) => {
    try {
      setIsLoading(true);
      const config = await getTokenAndCreateAuthorizationHeader()
      const res = await axios.patch(
        `${BASE_API_URL}/users/updateMe`,
        {
          searchStylesFor: gender,
        },
        config,
      );
      sendMessage(
        "Updated",
        res.data.message,
        "success",
        1000,
        theme.colors.brand.primary
      );
      setIsLoading(false);
    } catch (e) {
      setError(getError(e));
      sendMessage(
        "Failure",
        getError(e).message,
        "danger",
        2500,
        theme.colors.ui.error
      );
      console.log(e);
      setIsLoading(false);
    }
  };

  const updateProGenderPreference = async (gender) => {
    try {
      setIsLoading(true);
      const config = await getTokenAndCreateAuthorizationHeader()
      const res = await axios.patch(
        `${BASE_API_URL}/users/updateMe`,
        {
          searchProGender: gender,
        },
        config,
      );
      sendMessage(
        "Updated",
        res.data.message,
        "success",
        1000,
        theme.colors.brand.primary
      );
      setIsLoading(false);
    } catch (e) {
      setError(getError(e));
      sendMessage(
        "Failure",
        getError(e).message,
        "danger",
        2500,
        theme.colors.ui.error
      );
      console.log(e);
      setIsLoading(false);
    }
  };
  const updateSearchLocation = async (location, radius) => {
    try {
      setIsLoading(true);
      const token = await SecureStore.getItemAsync("token");
      const res = await axios.patch(
        `${BASE_API_URL}/users/updateMe`,
        {
          searchRadius: radius,
          searchLocation: {
            type: "Point",
            coordinates: [location.longitude, location.latitude],
            address: "No address for now",
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      sendMessage(
        "Updated",
        res.data.message,
        "success",
        1000,
        theme.colors.brand.primary
      );
      setIsLoading(false);
    } catch (e) {
      setError(getError(e));
      sendMessage(
        "Failure",
        getError(e).message,
        "danger",
        2500,
        theme.colors.ui.error
      );
      console.log(e);
      setIsLoading(false);
    }
  };

  return (
    <PreferencesContext.Provider
      value={{
        isLoading,
        error,
        updateSearchLocation,
        updateGenderPreference,
        updateProGenderPreference,
      }}
    >
      <FlashMessage ref={flashRef} />
      {children}
    </PreferencesContext.Provider>
  );
};
