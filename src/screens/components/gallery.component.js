import { SliderBox } from "react-native-image-slider-box";

import { useTheme } from "styled-components/native";
import { SliderContainer } from "./details-screen.component";
import { Dimensions } from "react-native";

const { height } = Dimensions.get("window");

export const Gallery = ({ images }) => {
  const theme = useTheme();
  return (
    <SliderContainer>
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
