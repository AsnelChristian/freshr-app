import { createStackNavigator } from "@react-navigation/stack";
import SetLocationScreen from "../../screens/onboarding/set-location.screen";
import {
  SetGenderScreen,
  SetProGenderScreen,
} from "../../screens/onboarding/set-gender-screen";

const Stack = createStackNavigator();

export const OnboardingNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerBackTitle: "",
      }}
    >
      {/*<Stack.Screen name="addPhone" component={AddPhoneScreen} />*/}
      <Stack.Screen name="setSearchLocation" component={SetLocationScreen} />
      <Stack.Screen name="setSearchGender" component={SetGenderScreen} />
      <Stack.Screen name="setSearchProGender" component={SetProGenderScreen} />
    </Stack.Navigator>
  );
};
