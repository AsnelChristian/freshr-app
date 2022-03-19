import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "styled-components";

import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { SafeArea } from "../../components/utils/safearea.component";
import { Text } from "../../components/typography/typography.component";
import { HomeNavigator } from "./home-navigator";
import InboxScreen from "../../screens/inbox.screen";

const FavoritesScreen = () => (
  <SafeArea>
    <Text variant="label">Favorite screen</Text>
  </SafeArea>
);


const OrdersScreen = () => (
  <SafeArea>
    <Text variant="label">Orders Screen</Text>
  </SafeArea>
);

const ProfileScreen = () => (
  <SafeArea>
    <Text variant="label">Profile screen</Text>
  </SafeArea>
);

const TAB_ICON = {
  Explore: "home",
  Favorites: "favorite-border",
  Inbox: "md-chatbox-outline",
  Orders: "scissors",
  Account: "md-person-outline",
};

const getStyledScreenOptions = (theme) => {
  return ({ route }) => {
    const iconName = TAB_ICON[route.name];
    return {
      headerShown: false,
      tabBarActiveTintColor: theme.colors.brand.primary,
      tabBarInactiveTintColor: theme.colors.ui.secondary,
      tabBarIcon: ({ size, color }) => {
        if (iconName.startsWith("md")) {
          return <Ionicons name={iconName} size={size} color={color} />;
        } else if (
          iconName.startsWith("home") ||
          iconName.startsWith("scissors")
        ) {
          return <Feather name={iconName} size={size} color={color} />;
        }
        return <MaterialIcons name={iconName} size={size} color={color} />;
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

const Tab = createBottomTabNavigator();

export const AppNavigator = () => {
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
