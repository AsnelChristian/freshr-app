import styled, { useTheme } from "styled-components/native";
import { View, Dimensions } from "react-native";
import { Rating } from "react-native-elements";
import { rgba as rgbaConverter } from "polished";
// import { Text } from "react-native";

import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/typography.component";
import { Suggestion } from "./suggestion.component";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

const { width } = Dimensions.get("window");

const SpecialistCardContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.sizes[1]};
  padding: 0px ${({ theme }) => theme.space[2]};

  overflow: hidden;
  background-color: white;
  height: 175px;
  margin-right: ${({ theme }) => theme.space[2]};
`;

const SpecialistCardImage = styled.Image.attrs((props) => ({
  resizeMode: "cover",
}))`
  width: 40%;
  aspect-ratio: 1;
  border-radius: ${({ theme }) => theme.sizes[1]};
`;

const SpecialistCardInfoContainer = styled.View`
  flex-direction: row;
  flex: 1;
  padding: ${({ theme }) => theme.space[2]} ${({ theme }) => theme.space[1]};
  background-color: white;
`;

const Title = styled(Text)`
  font-size: ${({ theme }) => theme.fontSizes.title};
  font-weight: bold;
`;

const RatingContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const InformationRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

const InformationChip = styled.View`
  padding: ${({ theme }) => theme.space[2]};
  background-color: ${({ theme }) =>
    `${rgbaConverter(theme.colors.brand.primary, 0.15)}`};
  color: white;
  border-radius: 5px;
`;

export const SpecialistCard = ({ specialist }) => {
  const theme = useTheme();
  const {
    coverImage = "http://americanbarber.org/wp-content/uploads/2021/09/iStock-1302315949-Copy-scaled.jpg",
    name = "John doe what ever",
    address = "Koblenz metternich",
    rating = 4.3,
    ratingCnt = 1003,
    priceRange = [15, 60],
    serviceCnt = 20,
  } = specialist;
  return (
    <SpecialistCardContainer
      style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
        width: width - 50,
      }}
    >
      <SpecialistCardImage source={{ uri: coverImage }} />
      <Spacer position="right" size="medium" />
      <SpecialistCardInfoContainer>
        <View>
          <Spacer variant="caption" position="bottom" size="large">
            <Title numberOfLines={1} ellipsizeMode="tail">
              {name}
            </Title>
          </Spacer>
          <Spacer position="bottom" size="medium">
            <RatingContainer>
              <Spacer position="right" size="small">
                <Text variant="caption" style={{ fontSize: 16 }}>
                  {rating}
                </Text>
              </Spacer>
              <Rating
                type="star"
                ratingColor={theme.colors.brand.primary}
                fractions={1}
                startingValue={rating}
                readonly
                imageSize={16}
              />
              <Spacer position="right" size="small" />
              <Text variant="caption">{ratingCnt} ratings</Text>
            </RatingContainer>
          </Spacer>
          <InformationRow>
            <Spacer position="right" size="medium">
              <InformationChip>
                <Text>{serviceCnt} services</Text>
              </InformationChip>
            </Spacer>
            <Spacer position="right" size="medium">
              <InformationChip>
                <Text>
                  ${priceRange[0]} - ${priceRange[1]}
                </Text>
              </InformationChip>
            </Spacer>
          </InformationRow>
          <Spacer position="bottom" size="small">
            <Suggestion value={address}>
              <Ionicons name="location" size={12} />
            </Suggestion>
          </Spacer>
        </View>
      </SpecialistCardInfoContainer>
    </SpecialistCardContainer>
  );
};
