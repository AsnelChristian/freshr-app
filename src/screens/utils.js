import { CustomSearchBar } from "../components/form/input.component";
import { Keyboard, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { theme } from "../infrastructure/theme";
import { TabBar, TabBarItem } from "react-native-tab-view";
import { Text } from "../components/typography/typography.component";
import { useTheme } from "styled-components/native";
import { rgba } from "polished";

export const renderSearch = (
  navigation,
  flex = false,
  placeholder,
  renderLeft = null
) => {
  return (
    <CustomSearchBar
      flex={flex}
      color="black"
      renderLeft={renderLeft}
      placeholder={placeholder}
      placeholderTextColor={"#8898AA"}
      onFocus={() => {
        Keyboard.dismiss();
        navigation.navigate("Search");
      }}
      iconContent={
        <View
          style={{
            height: "100%",
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "flex-end",
          }}
        >
          {renderLeft && renderLeft()}
          <Feather name="search" size={16} color={theme.colors.brand.muted} />
        </View>
      }
    />
  );
};

export const renderTabBarItem = (props) => (
  <TabBarItem {...props} style={{ flex: 1, padding: 16 }} />
);
export const renderLabel = ({ route, focused, color }) => (
  <Text style={{ color, margin: 8 }}>{route.title}</Text>
);
export const renderTabBar = (props) => {
  return (
    <TabBar
      {...props}
      scrollEnabled
      renderLabel={renderLabel}
      renderTabBarItem={renderTabBarItem}
      activeColor={"black"}
      inactiveColor={rgba(theme.colors.ui.primary, 0.4)}
      indicatorStyle={{ backgroundColor: "black", height: 2 }}
      style={{ backgroundColor: theme.colors.ui.quaternary }}
    />
  );
};
