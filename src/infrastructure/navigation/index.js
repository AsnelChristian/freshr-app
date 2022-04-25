import { useTheme } from "styled-components";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";

import { Platform, StatusBar } from "react-native";
import { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import SearchScreen from "../../screens/normal-app/search.screen";
import { setServices } from "../../redux/services/services.action";
import { serviceListMock } from "../../mocks/service-list-mock";
import HomeScreen from "../../screens/normal-app/home.screen";
import SearchMapScreen from "../../screens/normal-app/search.map.screen";
import FacilityDetailsScreen from "../../screens/normal-app/facility-details.screen";
import SpecialistDetailsScreen from "../../screens/normal-app/specialist-details.screen";
import MeetingTimeSelectionScreen from "../../screens/normal-app/meeting-time.screen";
import BookingReviewScreen from "../../screens/normal-app/booking-review.screen";
import InboxScreen from "../../screens/normal-app/inbox.screen";
import ChatScreen from "../../screens/normal-app/chat.screen";
import FavoritesScreen from "../../screens/normal-app/favorites.screen";
import OrdersScreen from "../../screens/normal-app/orders.screen";
import BookingCompletedScreen from "../../screens/normal-app/booking-completed.screen";
import OrderReviewScreen from "../../screens/normal-app/order-review.screen";
import ReviewScreen from "../../screens/normal-app/review.screen";
import ProfileScreen from "../../screens/normal-app/profile.screen";
import HomeFacilityScreen from "../../screens/pro-facility/home-facility.screen";
import FacilityLocationScreen from "../../screens/pro-facility/facility-location.screen";
import SeatsFacilityScreen from "../../screens/pro-facility/seats-facility.screen";
import FacilityGalleryScreen from "../../screens/pro-facility/facility-gallery-screen";
import FacilityNameScreen from "../../screens/pro-facility/facility-name.screen";
import FacilityHighlightScreen from "../../screens/pro-facility/facility-highlight-screen";
import FacilityDescriptionScreen from "../../screens/pro-facility/facility-description.screen";
import FacilityAnalyticsScreen from "../../screens/pro-facility/analytics.screen";
import FacilityMenuScreen from "../../screens/pro-facility/facility-menu.screen";
import ProFacilityDetailsScreen from "../../screens/pro-facility/pro-facility-details.screen";
import SubscriptionPlanFacilityScreen from "../../screens/pro-facility/subscription-plan-facility.screen";
import FacilityHoursScreen from "../../screens/pro-facility/facility-hours.screen";
import HomeSpecialistScreen from "../../screens/pro-specialist/home-specialist.screen";
import AnalyticsSpecialistScreen from "../../screens/pro-specialist/analytics-specialist.screen";
import InboxSpecialistScreen from "../../screens/pro-specialist/inbox-specialist.screen";
import MenuSpecialistScreen from "../../screens/pro-specialist/menu-specialist.screen";
import ServicesManagementScreen from "../../screens/pro-specialist/services-management.screen";
import ServiceDetailsScreen from "../../screens/pro-specialist/service-details.screen";
import LocationManualScreen from "../../screens/pro-facility/location-manual.screen";
import SpecialistProfileSocialScreen from "../../screens/pro-specialist/specialist-profile-social.screen";
import EditProfileScreen from "../../screens/pro-specialist/edit-profile.screen";
import SpecialistStoryScreen from "../../screens/pro-specialist/specialist-story.screen";
import CreateServiceScreen from "../../screens/pro-specialist/create-service.screen";

const TAB_ICON = {
  Explore: (size, color) => <Feather name="home" size={size} color={color} />,
  Favorites: (size, color) => (
    <MaterialIcons name="favorite-border" size={size} color={color} />
  ),
  Inbox: (size, color) => (
    <Ionicons name="md-chatbox-outline" size={size} color={color} />
  ),
  Orders: (size, color) => (
    <Feather name="scissors" size={size} color={color} />
  ),
  Account: (size, color) => (
    <Ionicons name="md-person-outline" size={size} color={color} />
  ),
};

const PRO_TAB_ICON = {
  Overview: (size, color) => <Feather name="home" size={size} color={color} />,
  Analytics: (size, color) => (
    <Ionicons name="analytics" size={size} color={color} />
  ),
  Menu: (size, color) => <Feather name="menu" size={size} color={color} />,
  Inbox: (size, color) => (
    <Ionicons name="md-chatbox-outline" size={size} color={color} />
  ),
  Profile: (size, color) => (
    <Ionicons name="md-person-outline" size={size} color={color} />
  ),
};

const getStyledScreenOptions = (icons, theme) => {
  return ({ route }) => {
    const renderIcon = icons[route.name];
    return {
      headerShown: false,
      tabBarActiveTintColor: theme.colors.brand.quaternary,
      tabBarInactiveTintColor: "white",
      tabBarIcon: ({ size, color }) => {
        return renderIcon(size, color);
      },
      tabBarStyle: {
        borderTopWidth: 0,
        borderTopLeftRadius: 32,
        alignItems: "center",
        justifyContent: "center",
        borderTopRightRadius: 32,
        backgroundColor: theme.colors.brand.quaternary,
        height: 60,
        zIndex: 4,
        marginTop: 2,
        padding: 5,

        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 6,
      },
      tabBarItemStyle: {
        fontFamily: theme.fonts.body,
        alignItems: "center",
        justifyContent: "center",
        height: "80%",
        borderRadius: 30,
        padding: 4,
        marginHorizontal: 6,
      },
      tabBarActiveBackgroundColor: "white",
    };
  };
};

const HomeStack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
        headerBackTitle: "",
      }}
    >
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Search" component={SearchScreen} />
      <HomeStack.Screen name="Map" component={SearchMapScreen} />
    </HomeStack.Navigator>
  );
};

const Tab = createBottomTabNavigator();
const AppTabNavigator = () => {
  const theme = useTheme();
  return (
    <Tab.Navigator screenOptions={getStyledScreenOptions(TAB_ICON, theme)}>
      <Tab.Screen name="Explore" component={HomeNavigator} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Orders" component={OrdersScreen} />
      <Tab.Screen name="Inbox" component={InboxScreen} />
      <Tab.Screen name="Account" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const HomeProFacilityStack = createStackNavigator();

const HomeProFacilityNavigator = () => {
  return (
    <HomeProFacilityStack.Navigator
      screenOptions={{
        headerShown: false,
        headerBackTitle: "",
      }}
    >
      <HomeProFacilityStack.Screen name="Home" component={HomeFacilityScreen} />
    </HomeProFacilityStack.Navigator>
  );
};

const ProTabFacility = createBottomTabNavigator();
const ProAppFacilityTabNavigator = () => {
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

const ProTabService = createBottomTabNavigator();
const ProAppServiceTabNavigator = () => {
  const theme = useTheme();
  return (
    <ProTabService.Navigator
      screenOptions={getStyledScreenOptions(PRO_TAB_ICON, theme)}
    >
      <ProTabService.Screen name="Overview" component={HomeSpecialistScreen} />
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

const MainStack = createStackNavigator();
const MainNavigator = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
        headerBackTitle: "",
      }}
    >
      <MainStack.Screen name="app" component={AppTabNavigator} />
      <MainStack.Screen
        name="proAppFacility"
        component={ProAppFacilityTabNavigator}
      />
      <MainStack.Screen
        name="proAppService"
        component={ProAppServiceTabNavigator}
      />
      <MainStack.Screen
        name="FacilityDetails"
        // options={{ headerShown: true, headerTitle: "" }}
        component={FacilityDetailsScreen}
      />
      <MainStack.Screen
        name="SpecialistDetails"
        // options={{ headerShown: true, headerTitle: "" }}
        component={SpecialistDetailsScreen}
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
        name="OrderCompleted"
        component={BookingCompletedScreen}
      />
      <MainStack.Screen
        name="Reviews"
        options={{
          headerShown: true,
          headerTitle: "",
        }}
        component={ReviewScreen}
      />
      <MainStack.Screen
        name="OrderSummary"
        options={{
          headerShown: true,
          headerTitle: "Order summary",
        }}
        component={OrderReviewScreen}
      />
      <MainStack.Screen
        name="Chat"
        options={({ route }) => ({
          headerShown: true,
          headerTitle: route.params.user.name,
        })}
        component={ChatScreen}
      />
      <MainStack.Screen
        name="LocationManual"
        component={LocationManualScreen}
      />
      <MainStack.Screen name="SetLocation" component={FacilityLocationScreen} />
      <MainStack.Screen name="SetSeatsNumber" component={SeatsFacilityScreen} />
      <MainStack.Screen
        name="CreateGalleryFacility"
        component={FacilityGalleryScreen}
      />
      <MainStack.Screen name="SetFacilityName" component={FacilityNameScreen} />
      <MainStack.Screen
        name="SetFacilityHighlight"
        component={FacilityHighlightScreen}
      />
      <MainStack.Screen
        name="SetFacilityDescription"
        component={FacilityDescriptionScreen}
      />
      <MainStack.Screen
        name="SetFacilityHours"
        component={FacilityHoursScreen}
      />
      <MainStack.Screen
        name="ProFacilityDetails"
        component={ProFacilityDetailsScreen}
      />
      <MainStack.Screen
        name="SubscriptionPlanFacility"
        component={SubscriptionPlanFacilityScreen}
      />

      <MainStack.Screen
        name="SpecialistServiceManagement"
        component={ServicesManagementScreen}
      />

      <MainStack.Screen
        name="SpecialistServiceDetails"
        component={ServiceDetailsScreen}
      />

      <MainStack.Screen
        name="SpecialistMenu"
        component={MenuSpecialistScreen}
      />
      <MainStack.Screen
        name="SpecialistEditProfile"
        component={EditProfileScreen}
      />
      <MainStack.Screen
        name="SpecialistStory"
        component={SpecialistStoryScreen}
      />
      <MainStack.Screen
        name="SpecialistCreateService"
        component={CreateServiceScreen}
      />
    </MainStack.Navigator>
  );
};

const Navigation = ({ cart, showCart, showNext, ...restProps }) => {
  const navigationRef = useRef();

  useEffect(() => {
    restProps.setServices(serviceListMock);

    Platform.OS === "android" && StatusBar.setTranslucent(true);
    StatusBar.setBarStyle("dark-content");
    StatusBar.setBackgroundColor("white");
    return () => {
      StatusBar.setBarStyle("default");
    };
  }, []);

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={{ colors: { background: "transparent" } }}
    >
      <MainNavigator />
    </NavigationContainer>
  );
};
const mapDispatchToProps = (dispatch) => ({
  setServices: (services) => dispatch(setServices(services)),
});

export default connect(null, mapDispatchToProps)(Navigation);
