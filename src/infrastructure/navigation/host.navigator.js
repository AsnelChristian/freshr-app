import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "styled-components";

import FacilityMenuScreen from "../../screens/pro-facility/facility-menu.screen";
import LocationManualScreen from "../../screens/pro-facility/location-manual.screen";
import FacilityLocationScreen from "../../screens/pro-facility/facility-location.screen";
import SeatsFacilityScreen from "../../screens/pro-facility/seats-facility.screen";
import FacilityGalleryScreen from "../../screens/pro-facility/facility-gallery-screen";
import FacilityNameScreen from "../../screens/pro-facility/facility-name.screen";
import FacilityHighlightScreen from "../../screens/pro-facility/facility-highlight-screen";
import FacilityDescriptionScreen from "../../screens/pro-facility/facility-description.screen";
import FacilityHoursScreen from "../../screens/pro-facility/facility-hours.screen";
import ProFacilityDetailsScreen from "../../screens/pro-facility/pro-facility-details.screen";
import SubscriptionPlanFacilityScreen from "../../screens/pro-facility/subscription-plan-facility.screen";
import { getStyledScreenOptions, PRO_TAB_ICON } from "./utils";
import HomeFacilityScreen from "../../screens/pro-facility/home-facility.screen";
import FacilityAnalyticsScreen from "../../screens/pro-facility/analytics.screen";

const HomeProFacilityStack = createStackNavigator();

const HomeProFacilityNavigator = () => {
  return (
    <HomeProFacilityStack.Navigator
      screenOptions={{
        headerShown: false,
        headerBackTitle: "",
      }}
    >
      <HomeProFacilityStack.Screen name="FacilityHome" component={HomeFacilityScreen} />

      <HomeProFacilityStack.Screen
        name="LocationManual"
        component={LocationManualScreen}
      />
      <HomeProFacilityStack.Screen name="SetLocation" component={FacilityLocationScreen} />
      <HomeProFacilityStack.Screen name="SetSeatsNumber" component={SeatsFacilityScreen} />
      <HomeProFacilityStack.Screen
        name="CreateGalleryFacility"
        component={FacilityGalleryScreen}
      />
      <HomeProFacilityStack.Screen name="SetFacilityName" component={FacilityNameScreen} />
      <HomeProFacilityStack.Screen
        name="SetFacilityHighlight"
        component={FacilityHighlightScreen}
      />
      <HomeProFacilityStack.Screen
        name="SetFacilityDescription"
        component={FacilityDescriptionScreen}
      />
      <HomeProFacilityStack.Screen
        name="SetFacilityHours"
        component={FacilityHoursScreen}
      />
      <HomeProFacilityStack.Screen
        name="ProFacilityDetails"
        component={ProFacilityDetailsScreen}
      />
      <HomeProFacilityStack.Screen
        name="SubscriptionPlanFacility"
        component={SubscriptionPlanFacilityScreen}
      />
    </HomeProFacilityStack.Navigator>
  );
};

const ProTabFacility = createBottomTabNavigator();
export const ProAppFacilityTabNavigator = () => {
  const theme = useTheme();
  return (
    <ProTabFacility.Navigator
      screenOptions={getStyledScreenOptions(PRO_TAB_ICON, theme)}
    >
      <ProTabFacility.Screen
        name="Overview"
        component={HomeProFacilityNavigator}
      />
      <ProTabFacility.Screen
        name="Analytics"
        component={FacilityAnalyticsScreen}
      />
      <ProTabFacility.Screen name="Menu" component={FacilityMenuScreen} />
    </ProTabFacility.Navigator>
  );
};
