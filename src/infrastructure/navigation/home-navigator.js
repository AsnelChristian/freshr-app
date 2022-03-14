import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native";

import { SafeArea } from "../../components/utils/safearea.component";
import { Text } from "../../components/typography/typography.component";
import SpecialistsMapScreen from "../../screens/specialists-map.screen";
import SpecialistScreen from "../../screens/specialist.screen";

const HomeScreen = ({ navigation }) => (
  <SafeArea>
    <Text variant="label">Home Screen</Text>
    <TouchableOpacity onPress={() => navigation.navigate("Map")}>
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
      <HomeStack.Screen name="Map" component={SpecialistsMapScreen} />
      <HomeStack.Screen
        name="SpecialistDetails"
        options={{ headerShown: true, headerTitle: "" }}
        component={SpecialistScreen}
      />
    </HomeStack.Navigator>
  );
};
