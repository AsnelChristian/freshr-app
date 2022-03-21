import styled, { useTheme } from "styled-components/native";
import { View, Dimensions } from "react-native";
import { Rating } from "react-native-elements";
import {rgba, rgba as rgbaConverter} from "polished";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/typography.component";
import { Suggestion } from "./suggestion.component";
import { Ionicons } from "@expo/vector-icons";
import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {useNavigation} from "@react-navigation/native";

const { width } = Dimensions.get("window");

const Wrapper = styled.TouchableOpacity``;
const SpecialistCardContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0px ${({ theme }) => theme.space[2]};
  
  overflow: hidden;
  background-color: white;
`;

const Separator = styled.View`
  height: 1px;
  background-color: ${({theme}) => rgba(theme.colors.ui.primary, 0.1)};
`

const SpecialistCardImage = styled.Image.attrs((props) => ({
  resizeMode: "cover",
}))`
  height: 120px;
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
  flex-wrap: wrap;
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
  border-radius: ${({ theme }) => theme.sizes[2]};
`;

const SpecialistCard = ({
  specialist,
  active = false,
    selectedSpecialist,
  ...restProps
}) => {
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
    <Wrapper {...restProps}>
      <>
        <Spacer position="bottom" size="medium"/>
        <SpecialistCardContainer
            active={active || (selectedSpecialist && selectedSpecialist.id === specialist.id)}
        >
          {active || (selectedSpecialist && selectedSpecialist.id === specialist.id) && (
              <Ionicons
                  name="checkmark-circle"
                  size={24}
                  color={theme.colors.ui.primary}
                  style={{ position: "absolute", bottom: 0, right: 0, zIndex: 1 }}
              />
          )}
          <SpecialistCardImage source={{ uri: coverImage }} />
          <Spacer position="right" size="medium" />
          <SpecialistCardInfoContainer>
            <View>
              <Spacer variant="caption" position="bottom" size="large">
                <Title numberOfLines={1} ellipsizeMode="tail" width={140}>
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
                  <Text variant="caption" style={{ marginTop: 4 }}>
                    ({ratingCnt})
                  </Text>
                </RatingContainer>
              </Spacer>
              <InformationRow>
                <Spacer position="right" size="medium">
                  <InformationChip>
                    <Text variant="caption">{serviceCnt} services</Text>
                  </InformationChip>
                </Spacer>
                <Spacer position="right" size="medium">
                  <InformationChip>
                    <Text variant="caption">
                      ${priceRange[0]} - ${priceRange[1]}
                    </Text>
                  </InformationChip>
                </Spacer>
              </InformationRow>
              <Spacer position="bottom" size="medium" />
              <Spacer position="bottom" size="small" />

              <Suggestion value={address} pressable={false} width={140}>
                <Ionicons name="location" size={12} />
              </Suggestion>
            </View>
          </SpecialistCardInfoContainer>
        </SpecialistCardContainer>
        <Separator/>
        <Spacer position="bottom" size="medium"/>
      </>
    </Wrapper>
  );
};

const mapStateToProps = state => ({
  selectedSpecialist : state.booking.specialist
})

export default connect(mapStateToProps, null)(SpecialistCard)
