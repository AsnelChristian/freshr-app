import { AppNavigator } from "./app-navigator";
import React, { useEffect, useRef } from "react";
import { Platform, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { connect } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import FacilitySelectionScreen from "../../screens/facility-selection.screen";
import SpecialistScreen from "../../screens/specialist-details.screen";
import FacilityDetailsScreen from "../../screens/facility-details.screen";
import MeetingTimeSelectionScreen from "../../screens/meeting-time-selection.screen";
import BookingReviewScreen from "../../screens/booking-review.screen";
import CheckoutScreen from "../../screens/checkout.screen";

const MainStack = createStackNavigator();

const MainNavigator = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
        headerBackTitle: "",
      }}
    >
      <MainStack.Screen name="app" component={AppNavigator} />

      <MainStack.Screen
        name="SpecialistDetails"
        options={{ headerShown: true, headerTitle: "" }}
        component={SpecialistScreen}
      />
      <MainStack.Screen
        name="SelectFacility"
        options={{ headerShown: true, headerTitle: "Select facility" }}
        component={FacilitySelectionScreen}
      />
      <MainStack.Screen
        name="FacilityDetails"
        options={{ headerShown: true, headerTitle: "" }}
        component={FacilityDetailsScreen}
      />
      <MainStack.Screen
        name="MeetingTimeSelection"
        options={{ headerShown: true, headerTitle: "Pick meeting time" }}
        component={MeetingTimeSelectionScreen}
      />
      <MainStack.Screen
        name="BookingReview"
        options={{
          headerShown: true,
          headerTitle: "Review booking",
        }}
        component={BookingReviewScreen}
      />
      <MainStack.Screen
        name="Checkout"
        options={{
          headerShown: true,
          headerTitle: "Checkout",
        }}
        component={CheckoutScreen}
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
