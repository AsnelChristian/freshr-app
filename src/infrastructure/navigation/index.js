import { AppNavigator } from "./app-navigator";
import { useEffect } from "react";
import { Platform, StatusBar, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

export const Navigation = () => {
  useEffect(() => {
    Platform.OS === "android" && StatusBar.setTranslucent(true);
    StatusBar.setBarStyle("dark-content");
    StatusBar.setBackgroundColor("white");
    return () => {
      StatusBar.setBarStyle("default");
    };
  }, []);
  return (
    <NavigationContainer>
      <AppNavigator />
      {/*<View*/}
      {/*  style={{*/}
      {/*    position: "absolute",*/}
      {/*    bottom: 0,*/}
      {/*    left: 0,*/}
      {/*    zIndex: 9999,*/}
      {/*    height: 100,*/}
      {/*    width: 1000,*/}
      {/*    backgroundColor: "black",*/}
      {/*  }}*/}
      {/*/>*/}
    </NavigationContainer>
  );
};
