import { useTheme } from "styled-components/native";
import { useState, createContext, useRef, useEffect } from "react";
import axios from "axios";
import { BASE_API_URL } from "../../constants";
import * as SecureStore from "expo-secure-store";
import FlashMessage, {
  hideMessage,
  showMessage,
} from "react-native-flash-message";
import { flashMessageStyle, getError, getTokenAndCreateAuthorizationHeader, sendMessage } from "../utils";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children, navigation }) => {
  const theme = useTheme();
  const flashRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [hasOnboarded, setHasOnboarded] = useState(true);
  const [skipAuth, setSkipAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [specialist, setSpecialist] = useState(null);
  const [host, setHost] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
    return () => {
      hideMessage();
      setError(null);
    };
  }, []);

  const onLogOut = () => {
    SecureStore.deleteItemAsync("token").then(() => setUser(null));
  };

  const onOnboarding = () => {
    setHasOnboarded(true);
  };

  const onLogin = (email, password) => {
    setIsLoading(true);
    axios
      .post(`${BASE_API_URL}/users/signin`, { email, password })
      .then((res) => {
        SecureStore.setItemAsync(
          "token",
          res.headers["set-cookie"][0].replace("jwt=", "").split(";")[0]
        ).then(() => {
          setUser(res.data.data.user);

          setIsLoading(false);
          showMessage({
            message: "Welcome back",
            description: res.data.message,
            type: "success",
            backgroundColor: theme.colors.brand.primary,
            ...flashMessageStyle,
            duration: 1000,
          });
        });
      })
      .catch((e) => {
        setIsLoading(false);
        setError(getError(e));
        showMessage({
          message: "Failure",
          description: getError(e).message,
          type: "danger",
          ...flashMessageStyle,
        });
        console.log(e);
      });
  };
  const onRegister = (data) => {
    setIsLoading(true);
    axios
      .post(`${BASE_API_URL}/users/signup`, data)
      .then((res) => {
        SecureStore.setItemAsync(
          "token",
          res.headers["set-cookie"][0].replace("jwt=", "").split(";")[0]
        ).then(() => {
          setUser(res.data.data.user);
          setHasOnboarded(false);
          showMessage({
            message: "Login successfully",
            description: res.data.message,
            type: "success",
            backgroundColor: theme.colors.brand.quaternary,
            ...flashMessageStyle,
            duration: 2500,
          });
          setIsLoading(false);
        });
      })
      .catch((e) => {
        setIsLoading(false);
        setError(getError(e));
        showMessage({
          message: "Failure",
          description: getError(e).message,
          type: "danger",
          ...flashMessageStyle,
          duration: 3000,
        });
        console.log(e);
      });
  };

  const skipAuthentication = () => {
    setSkipAuth(true);
  };

  const onBecomeHost = async () => {
    try {
      setIsLoading(true);
      const config = await getTokenAndCreateAuthorizationHeader()
      const res = await axios.post(
        `${BASE_API_URL}/users/becomeHost`,
        {},
        config,
      );
      setUser(res.data.data.host.user);
      setHost(res.data.data.host);
      sendMessage(
        "Updated",
        res.data.message,
        "success",
        1000,
        theme.colors.brand.primary
      );
      setIsLoading(false);
      return res.data.data.host;
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
  }
  const onBecomeSpecialist = async () => {
    try {
      setIsLoading(true);
      const config = await getTokenAndCreateAuthorizationHeader()
      const res = await axios.post(
        `${BASE_API_URL}/users/becomeSpecialist`,
        {},
        config,
      );
      setUser(res.data.data.specialist.user);
      sendMessage(
        "Updated",
        res.data.message,
        "success",
        1000,
        theme.colors.brand.primary
      );
      setIsLoading(false);
      return res.data.data.specialist;
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
  }

  return (
    <AuthContext.Provider
      value={{
        // isAuthenticated: true,
        isAuthenticated: !!user,
        user,
        isLoading,
        error,
        hasOnboarded,
        skipAuth,
        specialist,
        host,
        skipAuthentication,
        onLogin,
        onRegister,
        onOnboarding,
        onBecomeSpecialist,
        onBecomeHost
      }}
    >
      <FlashMessage ref={flashRef} />
      {children}
    </AuthContext.Provider>
  );
};
