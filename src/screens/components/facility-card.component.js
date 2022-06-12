import styled, { useTheme } from "styled-components/native";
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Rating } from "react-native-elements";
import { connect } from "react-redux";
import { selectFacility } from "../../redux/booking/booking.actions";
import { Spacer } from "../../components/spacer/spacer.component";
import { Row } from "../../components/helpers/helpers.component";
import { Text } from "../../components/typography/typography.component";
import { TimeItemContainer } from "./chip.component";
import { rgba } from "polished";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const SlideContainer = styled.View.attrs((props) => ({
  shadowColor: rgba(props.theme.colors.brand.primary, 0.5),
  shadowOffset: {
    width: 10,
    height: 10,
  },
  shadowOpacity: 0.3,
  shadowRadius: 5,
  elevation: 10,
}))`
  height: 130px;
  width: ${width - 48}px;
  background-color: white;
  margin-top: 4px;
  margin-bottom: 12px;
  border-radius: 15px;
  overflow: hidden;
  position: relative;
`;
const Container = styled.View`
  height: 130px;
  width: ${width - 48}px;
  background-color: white;
  border-radius: 15px;
  flex-direction: row;
  align-items: center;
  padding: ${({ theme }) => theme.space[2]};
`;

const Button = styled.TouchableOpacity`
  width: 100%;
  height: 100%;
  flex-direction: row;
  align-items: center;
`;

const MoreButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  position: absolute;
  background-color: white;
  border-radius: 100px;
  height: 30px;
  width: 30px;

  top: 4px;
  right: 4px;
  z-index: 10;
`;

const ShowResultsButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 12px;
  right: 12px;
  border-radius: 15px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 44px;
  padding: 0px ${({ theme }) => theme.space[3]};
  background-color: ${({ theme }) => theme.colors.brand.secondary};
`;

const CoverImage = styled.Image.attrs((props) => ({
  resizeMode: "cover",
}))`
  height: 100px;
  width: 100px;
  border-radius: ${({ theme }) => theme.sizes[1]};
  overflow: hidden;
`;

const ContentContainer = styled.View`
  flex: 1;
  justify-content: center;
`;

const Title = styled(Text)`
  font-size: 16px;
  font-weight: bold;
`;

const RatingContainer = styled.View`
  flex-direction: row;
  padding: ${({ theme }) => theme.space[2]} 10px;
  background-color: ${({ theme }) => rgba(theme.colors.brand.secondary, 0.1)};
  border-radius: 30px;
`;

const FacilityCard = ({
  facility,
  selectedFacility,
  setSelectedFacility,
  handleMorePress,
  handleViewResultPress,
  info = false,
}) => {
  const theme = useTheme();
  const [selected, setSelected] = useState(false);
  const { name, address, coverImage, time, rating, distance, ratingCnt } =
    facility;

  const handlePress = () => {
    setSelectedFacility(facility);
  };
  useEffect(() => {
    if (selectedFacility) {
      setSelected(facility.id === selectedFacility.id);
    } else {
      setSelected(false);
    }
  }, [selectedFacility]);

  return (
    <SlideContainer>
      <Container active={selected}>
        <MoreButton onPress={handleMorePress}>
          <MaterialIcons
            name="more-horiz"
            size={24}
            color={theme.colors.brand.secondary}
          />
        </MoreButton>

        {/*{selected && (*/}
        {/*  <Ionicons*/}
        {/*    name="checkmark-circle"*/}
        {/*    size={24}*/}
        {/*    color={theme.colors.brand.primary}*/}
        {/*    style={{ position: "absolute", top: 4, left: 4, zIndex: 1 }}*/}
        {/*  />*/}
        {/*)}*/}
        <Button onPress={handlePress}>
          <CoverImage source={{ uri: coverImage }} />
          <Spacer position="left" size="medium" />
          <ContentContainer>
            <Title numberOfLines={1}>{name}</Title>
            <Spacer position="bottom" size="large" />
            <Row>
              <Ionicons
                name="location"
                size={12}
                color={theme.colors.brand.secondary}
              />
              <Spacer position="left" size="small" />
              <Text variant="caption" style={{ fontWeight: "normal" }}>
                {address}
              </Text>
            </Row>
            <Spacer position="bottom" size="large" />

            <Row style={{ flexWrap: "wrap" }}>
              <RatingContainer>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: theme.colors.brand.secondary,
                  }}
                >
                  {rating}
                </Text>
                <Spacer position="left" size="small" />
                <AntDesign
                  name="star"
                  size={16}
                  color={theme.colors.brand.secondary}
                />
              </RatingContainer>
            </Row>
          </ContentContainer>
        </Button>
      </Container>
      {!info && (
        <ShowResultsButton onPress={handleViewResultPress}>
          <Text
            variant="caption"
            style={{ color: "white", fontWeight: "bold" }}
          >
            Show results {facility.professionals.length}
          </Text>
        </ShowResultsButton>
      )}
    </SlideContainer>
  );
};

const mapStateToProps = (state) => ({
  selectedFacility: state.booking.facility,
});

const mapDispatchToProps = (dispatch) => ({
  setSelectedFacility: (facility) => dispatch(selectFacility(facility)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FacilityCard);
