import { showMessage } from "react-native-flash-message";
import * as SecureStore from "expo-secure-store";

export const getError = (e) => {
  if (e.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    return { message: e.response.data.message };
  } else {
    return { message: e.message };
  }
};

export const flashMessageStyle = {
  hideStatusBar: false,
  duration: 10000,
  style: {
    borderRadius: 10,
    marginHorizontal: 16,
    marginVertical: 65,
  },
};

export const sendMessage = (title, description, status, duration, color) =>
  showMessage({
    message: title,
    description,
    type: status,
    backgroundColor: color,
    ...flashMessageStyle,
    duration,
  });


export const getTokenAndCreateAuthorizationHeader = async () => {
  try {
    const token = await SecureStore.getItemAsync("token");
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  } catch (e) {
    throw new Error("Something wrong happened please login again.")
  }
}
