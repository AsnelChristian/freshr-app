import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native";

import { SafeArea } from "../../components/utils/safearea.component";
import { Text } from "../../components/typography/typography.component";
import SpecialistsMapScreen from "../../screens/booking/professional-selection.screen";
import FacilitySelectionScreen from "../../screens/booking/facility-selection.screen";
import React from "react";

const HomeScreen = ({ navigation }) => (
  <SafeArea>
    <Text variant="label">Home Screen</Text>
    <TouchableOpacity onPress={() => navigation.navigate("SelectFacility", {edit: false})}>
      <Text variant="body">view Map</Text>
    </TouchableOpacity>
  </SafeArea>
);

const HomeStack = createStackNavigator();

export const HomeNavigator = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Home"
    >
      <HomeStack.Screen name="Home" component={HomeScreen} />
        <HomeStack.Screen
            name="SelectFacility"
            options={{ headerShown: false}}
            component={FacilitySelectionScreen}
        />
    </HomeStack.Navigator>
  );
};
