import { AppNavigator } from "./app-navigator";
import { useEffect } from "react";
import { Platform, StatusBar } from "react-native";
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
        </NavigationContainer>
    );
};
