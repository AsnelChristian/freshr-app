import React, { useEffect } from "react";
import { SliderBox } from "react-native-image-slider-box";
import styled, { useTheme } from "styled-components/native";
import { Dimensions } from "react-native";
import { Rating } from "react-native-elements";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";

import { SpecialistCard } from "../features/map/components/specialist-card.component";
import { Spacer } from "../components/spacer/spacer.component";
import { Text } from "../components/typography/typography.component";
import { Suggestion } from "../features/map/components/suggestion.component";

const PageContainer = styled.View`
  flex: 1;
  background-color: white;
`;
const SliderContainer = styled.View`
  background-color: white;
`;

const PageContentContainer = styled.View`
  padding: ${({ theme }) => theme.space[2]} ${({ theme }) => theme.space[3]};
`;

const Title = styled(Text).attrs((props) => ({
  numberOfLines: 2,
  ellipsis: "tail",
}))`
  font-size: ${({ theme }) => theme.fontSizes.h4};
  font-weight: bold;
  letter-spacing: 1px;
`;

const SectionTitle = styled(Text).attrs((props) => ({
  numberOfLines: 1,
  ellipsis: "tail",
}))`
  font-size: ${({ theme }) => theme.fontSizes.h5};
  font-weight: bold;
  letter-spacing: 1px;
`;

const RatingRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const RatingContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const MoreInfoButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: ${({ theme }) => theme.space[2]};
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.ui.quaternary};
`;

const DescriptionContainer = styled.View`
  padding: ${({ theme }) => theme.space[3]};
  background-color: white;
  border-radius: ${({ theme }) => theme.space[2]};
  overflow: hidden;
`;

const QuoteIconContainer = styled.View`
  padding: ${({ theme }) => theme.space[1]};
  background-color: rgba(128, 128, 128, 0.1);
  border-radius: 5px;
  position: absolute;
  flex: 1;
  justify-content: center;
`;

const { height } = Dimensions.get("window");
export const SpecialistScreen = ({ route }) => {
  const theme = useTheme();
  const { specialist } = route.params;

  const { name, gallery, rating, ratingCnt, address } = specialist;

  useEffect(() => {
    console.log(route);
  }, []);

  return (
    <PageContainer>
      <SliderContainer>
        <SliderBox
          images={gallery}
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
          ImageComponentStyle={{ borderRadius: 15, width: "97%", marginTop: 5 }}
          imageLoadingColor="#2196F3"
        />
      </SliderContainer>

      <PageContentContainer>
        <Spacer position="top" size="medium" />

        <Title>{name}</Title>
        <Spacer position="top" size="medium" />
        <RatingRow>
          <RatingContainer>
            <Spacer position="right" size="medium">
              <Text
                variant="caption"
                style={{ color: theme.colors.brand.primary, fontSize: 22 }}
              >
                {rating}
              </Text>
            </Spacer>
            <Rating
              type="star"
              ratingColor={theme.colors.brand.primary}
              fractions={1}
              startingValue={rating}
              readonly
              imageSize={20}
            />
          </RatingContainer>
          <MoreInfoButton>
            <Text
              variant="caption"
              numberOfLines={1}
              ellipsis="tail"
              style={{ fontSize: 16, color: theme.colors.brand.primary }}
            >
              {ratingCnt}
            </Text>
            <Text
              variant="caption"
              numberOfLines={1}
              ellipsis="tail"
              style={{ fontSize: 16 }}
            >
              {" "}
              reviews
            </Text>
            <Spacer position="right" size="medium" />
            <AntDesign
              name="arrowright"
              size={24}
              color={theme.colors.ui.primary}
            />
          </MoreInfoButton>
        </RatingRow>
        <Suggestion value={address}>
          <Ionicons name="location" size={22} />
        </Suggestion>
        <Spacer position="bottom" size="medium" />
        <DescriptionContainer
          style={{
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowOpacity: 0.34,
            shadowRadius: 6.27,
            elevation: 6,
          }}
        >
          <QuoteIconContainer style={{ bottom: 0, right: 0 }}>
            <MaterialIcons name="format-quote" size={45} color={"white"} />
          </QuoteIconContainer>
          <Text style={{ lineHeight: 22 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            feugiat justo ac tortor hendrerit mollis et in nunc. Pellentesque
            faucibus metus auctor euismod convallis
          </Text>
        </DescriptionContainer>
        <Spacer position="bottom" size="large" />
        <SectionTitle>Services</SectionTitle>
        {/*<SpecialistCard specialist={specialist} />*/}
      </PageContentContainer>
    </PageContainer>
  );
};
