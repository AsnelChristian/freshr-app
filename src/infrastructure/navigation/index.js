import { useTheme } from "styled-components";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";

import { SafeArea } from "../../components/utils/safearea.component";
import { Text } from "../../components/typography/typography.component";
import { Platform, StatusBar } from "react-native";
import { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import SearchScreen from "../../screens/search.screen";
import { setServices } from "../../redux/services/services.action";
import { serviceListMock } from "../../mocks/service-list-mock";
import HomeScreen from "../../screens/home.screen";
import SearchMapScreen from "../../screens/search.map.screen";
import FacilityDetailsScreen from "../../screens/facility-details.screen";
import SpecialistDetailsScreen from "../../screens/specialist-details.screen";
import MeetingTimeSelectionScreen from "../../screens/meeting-time.screen";
import BookingReviewScreen from "../../screens/booking-review.screen";
import InboxScreen from "../../screens/inbox.screen";
import ChatScreen from "../../screens/chat.screen";
import FavoritesScreen from "../../screens/favorites.screen";
import OrdersScreen from "../../screens/orders.screen";
import BookingCompletedScreen from "../../screens/booking-completed.screen";
import OrderReviewScreen from "../../screens/order-review.screen";
import ReviewScreen from "../../screens/review.screen";
import ProfileScreen from "../../screens/profile.screen";

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

const getStyledScreenOptions = (theme) => {
  return ({ route }) => {
    const renderIcon = TAB_ICON[route.name];
    return {
      headerShown: false,
      tabBarActiveTintColor: theme.colors.brand.primary,
      tabBarInactiveTintColor: theme.colors.ui.secondary,
      tabBarIcon: ({ size, color }) => {
        return renderIcon(size, color);
      },
      tabBarStyle: {
        paddingVertical: 4,
      },
      tabBarItemStyle: {
        fontFamily: theme.fonts.body,
        alignItems: "center",
        justifyContent: "center",
        padding: 4,
      },
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
    <Tab.Navigator screenOptions={getStyledScreenOptions(theme)}>
      <Tab.Screen name="Explore" component={HomeNavigator} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Orders" component={OrdersScreen} />
      <Tab.Screen name="Inbox" component={InboxScreen} />
      <Tab.Screen name="Account" component={ProfileScreen} />
    </Tab.Navigator>
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
    <NavigationContainer ref={navigationRef}>
      <MainNavigator />
    </NavigationContainer>
  );
};
const mapDispatchToProps = (dispatch) => ({
  setServices: (services) => dispatch(setServices(services)),
});

export default connect(null, mapDispatchToProps)(Navigation);
