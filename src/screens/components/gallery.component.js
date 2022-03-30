import { SliderBox } from "react-native-image-slider-box";

import styled, { useTheme } from "styled-components/native";
import { SliderContainer } from "./details-screen.component";
import { Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { IconButton } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

const { height } = Dimensions.get("window");

const BackButtonContainer = styled.TouchableOpacity`
  position: absolute;
  top: 12px;
  left: 12px;
  width: 40px;
  height: 40px;
  background-color: white;
  border-radius: 100px;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

export const Gallery = ({ images }) => {
  const theme = useTheme();
  const navigation = useNavigation();

  return (
    <SliderContainer style={{ position: "relative" }}>
      <BackButtonContainer onPress={() => navigation.goBack()} elevation={2}>
        <Ionicons name="arrow-back" size={20} />
      </BackButtonContainer>
      <SliderBox
        images={images}
        sliderBoxHeight={height * 0.3}
        dotColor={theme.colors.brand.primary}
        paginationBoxVerticalPadding={20}
        autoplay
        circleLoop
        resizeMethod={"resize"}
        resizeMode={"cover"}
        paginationBoxStyle={{
          position: "absolute",
          bottom: 0,
          padding: 0,
          alignItems: "center",
          alignSelf: "center",
          justifyContent: "center",
          paddingVertical: 10,
        }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 0,
          padding: 0,
          margin: 0,
          backgroundColor: "rgba(128, 128, 128, 0.92)",
        }}
        ImageComponentStyle={{
          borderRadius: 15,
          width: "97%",
          marginTop: 5,
        }}
        imageLoadingColor="#2196F3"
      />
    </SliderContainer>
  );
};
