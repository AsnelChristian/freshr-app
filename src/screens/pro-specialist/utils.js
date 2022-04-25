export const toggleBottomNavBackground = (value, navigation, theme) => {
  navigation.setOptions({
    tabBarActiveTintColor: value
      ? theme.colors.brand.primary
      : theme.colors.ui.primary,
    tabBarStyle: {
      borderTopWidth: 0,
      borderTopLeftRadius: 32,
      alignItems: "center",
      justifyContent: "center",
      borderTopRightRadius: 32,
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
      backgroundColor: value
        ? theme.colors.brand.quaternary
        : theme.colors.ui.primary,
    },
  });
};
