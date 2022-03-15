import { AppNavigator } from "./app-navigator";
import React, { useEffect, useRef } from "react";
import { Platform, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { connect } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import FacilitySelectionScreen from "../../screens/facility-selection.screen";
import SpecialistScreen from "../../screens/specialist.screen";

const MainStack = createStackNavigator();

const MainNavigator = () => {
  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      <MainStack.Screen name="app" component={AppNavigator} />
      <MainStack.Screen
        name="SelectFacility"
        options={{ headerShown: true, headerTitle: "Select facility" }}
        component={FacilitySelectionScreen}
      />
      <MainStack.Screen
        name="SpecialistDetails"
        options={{ headerShown: true, headerTitle: "" }}
        component={SpecialistScreen}
      />
    </MainStack.Navigator>
  );
};

const Navigation = ({ cart, showCart, showNext }) => {
  const navigationRef = useRef();

  useEffect(() => {
    Platform.OS === "android" && StatusBar.setTranslucent(true);
    StatusBar.setBarStyle("dark-content");
    StatusBar.setBackgroundColor("white");
    return () => {
      StatusBar.setBarStyle("default");
    };
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <MainNavigator />
    </NavigationContainer>
  );
};

export default connect(null, null)(Navigation);
