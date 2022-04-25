import { CustomSearchBar } from "../../components/form/input.component";
import { Keyboard, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { theme } from "../../infrastructure/theme";
import { TabBar, TabBarItem } from "react-native-tab-view";
import { Text } from "../../components/typography/typography.component";
import { useTheme } from "styled-components/native";
import { rgba } from "polished";
import { useState } from "react";
import { getInputRangeFromIndexes } from "react-native-snap-carousel";

export const renderSearch = (
  navigation,
  flex = false,
  placeholder,
  renderLeft = null
) => {
  const theme = useTheme();
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
      style={{
        shadowColor: theme.colors.ui.border,
        shadowOffset: {
          width: 10,
          height: 10,
        },
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 6,
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
          <Feather name="search" size={16} color={theme.colors.ui.border} />
        </View>
      }
    />
  );
};

export const renderTabBarItem = (props) => (
  <TabBarItem {...props} style={{ padding: 16 }} />
);
export const renderLabel = ({ route, focused, color }) => (
  <Text variant="caption" style={{ color, margin: 8, fontSize: 16 }}>
    {route.title}
  </Text>
);
export const renderTabBar = ({ scrollable = true, ...restProps }) => {
  return (
    <TabBar
      {...restProps}
      scrollEnabled={scrollable}
      renderLabel={renderLabel}
      renderTabBarItem={renderTabBarItem}
      activeColor={theme.colors.ui.primary}
      inactiveColor={rgba(theme.colors.ui.primary, 0.4)}
      indicatorStyle={{
        backgroundColor: theme.colors.brand.quaternary,
        height: 2,
      }}
      style={{
        backgroundColor: rgba(theme.colors.brand.quaternary, 0),
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: "hidden",
        elevation: 0,
      }}
    />
  );
};

// Photo album effect
export function scrollInterpolator1(index, carouselProps) {
  const range = [3, 2, 1, 0, -1];
  const inputRange = getInputRangeFromIndexes(range, index, carouselProps);
  const outputRange = range;

  return { inputRange, outputRange };
}
export function animatedStyles1(index, animatedValue, carouselProps) {
  const sizeRef = carouselProps.vertical
    ? carouselProps.itemHeight
    : carouselProps.itemWidth;
  const translateProp = carouselProps.vertical ? "translateY" : "translateX";

  return {
    zIndex: carouselProps.data.length - index,
    opacity: animatedValue.interpolate({
      inputRange: [2, 3],
      outputRange: [1, 0],
      extrapolate: "clamp",
    }),
    transform: [
      {
        rotate: animatedValue.interpolate({
          inputRange: [-1, 0, 1, 2, 3],
          outputRange: ["-25deg", "0deg", "-3deg", "1.8deg", "0deg"],
          extrapolate: "clamp",
        }),
      },
      {
        [translateProp]: animatedValue.interpolate({
          inputRange: [-1, 0, 1, 2, 3],
          outputRange: [
            -sizeRef * 0.5,
            0,
            -sizeRef, // centered
            -sizeRef * 2, // centered
            -sizeRef * 3, // centered
          ],
          extrapolate: "clamp",
        }),
      },
    ],
  };
}

// Perspective effect
export function scrollInterpolator2(index, carouselProps) {
  const range = [2, 1, 0, -1];
  const inputRange = getInputRangeFromIndexes(range, index, carouselProps);
  const outputRange = range;

  return { inputRange, outputRange };
}
export function animatedStyles2(index, animatedValue, carouselProps) {
  const sizeRef = carouselProps.vertical
    ? carouselProps.itemHeight
    : carouselProps.itemWidth;
  const translateProp = carouselProps.vertical ? "translateY" : "translateX";

  return {
    zIndex: carouselProps.data.length - index,
    opacity: animatedValue.interpolate({
      inputRange: [-1, 0, 1, 2],
      outputRange: [0.75, 1, 0.6, 0.4],
    }),
    transform: [
      {
        rotate: animatedValue.interpolate({
          inputRange: [-1, 0, 1, 2],
          outputRange: ["0deg", "0deg", "5deg", "8deg"],
          extrapolate: "clamp",
        }),
      },
      {
        scale: animatedValue.interpolate({
          inputRange: [-1, 0, 1, 2],
          outputRange: [0.96, 1, 0.85, 0.7],
        }),
      },
      {
        [translateProp]: animatedValue.interpolate({
          inputRange: [-1, 0, 1, 2],
          outputRange: [0, 0, -sizeRef + 30, -sizeRef * 2 + 45],
          extrapolate: "clamp",
        }),
      },
    ],
  };
}
