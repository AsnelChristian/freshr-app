import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "../../screens/auth/welcome-screen";
import SelectSignupMethodScreen from "../../screens/auth/select-auth-method.screen";
import RegisterScreen from "../../screens/auth/sign-in.screen";
import SignUpScreen from "../../screens/auth/sign-up.screen";
import PasswordResetScreen from "../../screens/auth/password-reset.screen";

const Stack = createStackNavigator();

export const AccountNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerBackTitle: "",
      }}
    >
      <Stack.Screen name="welcome" component={WelcomeScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Choose sign in method",
        }}
        name="select-auth"
        component={SelectSignupMethodScreen}
      />
      <Stack.Screen name="signin" component={RegisterScreen} />
      <Stack.Screen name="signup" component={SignUpScreen} />
      <Stack.Screen name="passwordReset" component={PasswordResetScreen} />
    </Stack.Navigator>
  );
};
