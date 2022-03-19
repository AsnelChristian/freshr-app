import { AppNavigator } from "./app-navigator";
import React, { useEffect, useRef } from "react";
import { Platform, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { connect } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import FacilitySelectionScreen from "../../screens/booking/facility-selection.screen";
import SpecialistScreen from "../../screens/booking/specialist-details.screen";
import FacilityDetailsScreen from "../../screens/details/facility-details.screen";
import MeetingTimeSelectionScreen from "../../screens/booking/meeting-time-selection.screen";
import BookingReviewScreen from "../../screens/booking/booking-review.screen";
import CheckoutScreen from "../../screens/booking/checkout.screen";
import SpecialistsMapScreen from "../../screens/booking/professional-selection.screen";

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
        options={{ headerShown: true, headerTitle: "Filter professional by services" }}
        name="ProfessionalSelection" component={SpecialistsMapScreen}
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
