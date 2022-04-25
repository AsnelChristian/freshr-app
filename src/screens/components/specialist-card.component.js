import styled, { useTheme } from "styled-components/native";
import { TouchableOpacity, View } from "react-native";
import { Rating } from "react-native-elements";
import { rgba } from "polished";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import React from "react";
import { connect } from "react-redux";

import { Text } from "../../components/typography/typography.component";
import { Spacer } from "../../components/spacer/spacer.component";
import { setSpecialist } from "../../redux/booking/booking.actions";

const Wrapper = styled.TouchableOpacity.attrs((props) => ({
  shadowColor: rgba(props.theme.colors.ui.primary, 1),
  shadowOffset: {
    width: 10,
    height: 10,
  },
  shadowOpacity: 0.3,
  shadowRadius: 5,
  elevation: 10,
}))`
  background-color: ${({ theme }) => rgba(theme.colors.brand.primary, 0.05)};
  border-radius: 30px;
  margin: 3px 0;
`;
const SpecialistCardContainer = styled.View`
  flex-direction: row;
  align-items: center;
  height: 110px;
  padding: 0px ${({ theme }) => theme.space[2]};
  overflow: hidden;
`;

const SpecialistCardImage = styled.ImageBackground.attrs((props) => ({
  resizeMode: "cover",
}))`
  height: 100px;
  aspect-ratio: 1;
  border-radius: ${({ theme }) => theme.sizes[1]};
  overflow: hidden;
`;

const ImageContent = styled.View`
  flex: 1;
  border-radius: ${({ theme }) => theme.sizes[1]};
  background-color: ${rgba("black", 0.3)};
`;

const SpecialistCardInfoContainer = styled.View`
  justify-content: center;
  flex: 1;
  height: 100%;
  padding: ${({ theme }) => theme.space[2]} ${({ theme }) => theme.space[1]};
`;

const Title = styled(Text)`
  font-size: ${({ theme }) => theme.fontSizes.title};
  font-weight: bold;
`;

const RatingContainer = styled.View`
  flex-direction: row;
  padding: ${({ theme }) => theme.space[2]} 10px;
  background-color: ${({ theme }) => rgba(theme.colors.brand.primary, 0.1)};
  border-radius: 30px;
`;
const InformationRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

const InformationChip = styled.View`
  padding: ${({ theme }) => theme.space[2]};
  background-color: ${({ theme }) =>
    `${rgba(theme.colors.brand.primary, 0.15)}`};
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
  const { coverImage, name, rating, ratingCnt, priceRange, serviceCnt } =
    specialist;
  const ratingArray = Array.from(new Array(Math.floor(rating)));
  const halfStarType = rating - ratingArray.length >= 0.5 ? "fill" : "empty";

  return (
    <Wrapper {...restProps}>
      <View>
        <Spacer position="bottom" size="medium" />
        <SpecialistCardContainer
          active={
            active ||
            (selectedSpecialist && selectedSpecialist.id === specialist.id)
          }
          elevation={22}
        >
          {active ||
            (selectedSpecialist && selectedSpecialist.id === specialist.id && (
              <Ionicons
                name="checkmark-circle"
                size={24}
                color={theme.colors.ui.primary}
                style={{ position: "absolute", bottom: 0, right: 0, zIndex: 1 }}
              />
            ))}
          <SpecialistCardImage source={{ uri: coverImage }}>
            <ImageContent />
          </SpecialistCardImage>
          <Spacer position="right" size="medium" />
          <SpecialistCardInfoContainer>
            <Spacer variant="caption" position="bottom" size="medium">
              <Title numberOfLines={1} ellipsizeMode="tail" width={140}>
                {name}
              </Title>
            </Spacer>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <RatingContainer>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: theme.colors.brand.primary,
                  }}
                >
                  {rating}
                </Text>
                <Spacer position="left" size="small" />
                {ratingArray.map((start, index) => (
                  <View key={`${index}-star-`}>
                    <AntDesign
                      name="star"
                      size={16}
                      color={theme.colors.brand.primary}
                    />
                  </View>
                ))}
              </RatingContainer>
              <Spacer position="left" size="large" />
              <TouchableOpacity>
                <Text
                  style={{
                    textDecorationLine: "underline",
                    fontWeight: "bold",
                    fontSize: 12,
                  }}
                >
                  {ratingCnt} reviews
                </Text>
              </TouchableOpacity>
            </View>
            <Spacer position="bottom" size="medium" />

            <InformationRow>
              <Spacer position="right" size="medium">
                <InformationChip>
                  <Text
                    variant="caption"
                    style={{ color: theme.colors.brand.primary }}
                  >
                    {serviceCnt} services
                  </Text>
                </InformationChip>
              </Spacer>
              <Spacer position="right" size="medium">
                <InformationChip>
                  <Text
                    variant="caption"
                    style={{ color: theme.colors.brand.primary }}
                  >
                    ${priceRange[0]} - ${priceRange[1]}
                  </Text>
                </InformationChip>
              </Spacer>
            </InformationRow>
            <Spacer position="bottom" size="medium" />
          </SpecialistCardInfoContainer>
        </SpecialistCardContainer>
        <Spacer position="bottom" size="medium" />
      </View>
    </Wrapper>
  );
};

const mapStateToProps = (state) => ({
  selectedSpecialist: state.booking.specialist,
});

const mapDispatchToProps = (dispatch) => ({
  setSpecialist: (specialist) => dispatch(setSpecialist(specialist)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SpecialistCard);
