import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";

export const TAB_ICON = {
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

export const PRO_TAB_ICON = {
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

export const getStyledScreenOptions = (icons, theme) => {
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
