import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "styled-components";
import { createStackNavigator } from "@react-navigation/stack";

import HomeSpecialistScreen from "../../screens/pro-specialist/home-specialist.screen";
import AnalyticsSpecialistScreen from "../../screens/pro-specialist/analytics-specialist.screen";
import InboxSpecialistScreen from "../../screens/pro-specialist/inbox-specialist.screen";
import SpecialistProfileSocialScreen from "../../screens/pro-specialist/specialist-profile-social.screen";
import ServicesManagementScreen from "../../screens/pro-specialist/services-management.screen";
import ServiceDetailsScreen from "../../screens/pro-specialist/service-details.screen";
import MenuSpecialistScreen from "../../screens/pro-specialist/menu-specialist.screen";
import EditProfileScreen from "../../screens/pro-specialist/edit-profile.screen";
import SpecialistStoryScreen from "../../screens/pro-specialist/specialist-story.screen";
import CreateServiceScreen from "../../screens/pro-specialist/create-service.screen";
import { getStyledScreenOptions, PRO_TAB_ICON } from "./utils";


const HomStack = createStackNavigator();

const StackNavigator = () => {
  return (
    <HomStack.Navigator
      screenOptions={{
        headerShown: false,
        headerBackTitle: "",
      }}
    >
      <HomStack.Screen name="HomePage" component={HomeSpecialistScreen} />
      <HomStack.Screen
        name="SpecialistServiceManagement"
        component={ServicesManagementScreen}
      />

      <HomStack.Screen
        name="SpecialistServiceDetails"
        component={ServiceDetailsScreen}
      />

      <HomStack.Screen
        name="SpecialistMenu"
        component={MenuSpecialistScreen}
      />
      <HomStack.Screen
        name="SpecialistEditProfile"
        component={EditProfileScreen}
      />
      <HomStack.Screen
        name="SpecialistStory"
        component={SpecialistStoryScreen}
      />


    </HomStack.Navigator>
  );
};

const ProTabService = createBottomTabNavigator();
export const ProAppServiceTabNavigator = () => {
  const theme = useTheme();
  return (
    <ProTabService.Navigator
      screenOptions={getStyledScreenOptions(PRO_TAB_ICON, theme)}
    >
      <ProTabService.Screen name="Overview" component={StackNavigator} />
      <ProTabService.Screen
        name="Analytics"
        component={AnalyticsSpecialistScreen}
      />
      <ProTabService.Screen name="Inbox" component={InboxSpecialistScreen} />
      {/*<ProTabService.Screen name="Menu" component={MenuSpecialistScreen} />*/}
      <ProTabService.Screen
        name="Profile"
        component={SpecialistProfileSocialScreen}
      />
    </ProTabService.Navigator>
  );
};


const Stack = createStackNavigator();
export const SpecialistNavigator = () => {
  return <Stack.Navigator screenOptions={{
    headerShown: false,
    headerBackTitle: "",
  }}>
    <Stack.Screen name={"specialistApp"} component={ProAppServiceTabNavigator}/>
    <Stack.Screen
      name="SpecialistCreateService"
      component={CreateServiceScreen}
    />
  </Stack.Navigator>
}


