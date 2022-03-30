import styled, { useTheme } from "styled-components/native";
import {
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

const Container = styled.View`
  height: 140px;
  width: 350px;
  background-color: white;
  border-radius: ${({ theme }) => theme.sizes[1]};
  flex-direction: row;
  align-items: center;
  position: relative;
  border: 2px solid
    ${({ active, theme }) => (active ? theme.colors.brand.primary : "white")};
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
  background-color: ${({ theme }) => theme.colors.ui.quaternary};
  border-radius: 100px;
  height: 30px;
  width: 30px;

  top: 0;
  right: 0;
  z-index: 10;
`;

const ShowResultsButton = styled.TouchableOpacity`
  border-radius: 30px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 40px;
  padding: 0px ${({ theme }) => theme.space[3]};
  background-color: ${({ theme }) => theme.colors.ui.primary};
`;

const CoverImage = styled.Image.attrs((props) => ({
  resizeMode: "cover",
}))`
  height: 130px;
  width: 125px;
  border-radius: ${({ theme }) => theme.sizes[1]};
  overflow: hidden;
`;

const ContentContainer = styled.View`
  flex: 1;
  padding-right: ${({ theme }) => theme.space[2]};
`;

const Title = styled(Text)`
  font-size: 16px;
  font-weight: bold;
`;

const FacilityCard = ({
  facility,
  selectedFacility,
  setSelectedFacility,
  handleMorePress,
  handleViewResultPress,
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
    <Container
      active={selected}
      style={{
        elevation: 2,
      }}
    >
      <MoreButton onPress={handleMorePress}>
        <MaterialIcons name="more-vert" size={24} />
      </MoreButton>

      {selected && (
        <Ionicons
          name="checkmark-circle"
          size={24}
          color={theme.colors.brand.primary}
          style={{ position: "absolute", top: 0, left: 0, zIndex: 1 }}
        />
      )}
      <Button onPress={handlePress}>
        <CoverImage source={{ uri: coverImage }} />
        <Spacer position="left" size="medium" />
        <ContentContainer>
          <Spacer position="top" size="small" />
          <Title numberOfLines={1}>{name}</Title>
          <Spacer position="bottom" size="large" />
          <Row style={{ flexWrap: "wrap" }}>
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
          </Row>
          <Spacer position="bottom" size="medium" />

          <Spacer position="bottom" size="small">
            <Row>
              <Ionicons name="location" size={12} />
              <Spacer position="left" size="small" />
              <Text variant="caption">{address}</Text>
            </Row>
          </Spacer>
          <Row style={{ justifyContent: "space-between" }}>
            <TimeItemContainer>
              <MaterialCommunityIcons name="map-marker-distance" size={20} />
              <Spacer position="left" size="small" />
              <Text variant="caption">{distance} km</Text>
            </TimeItemContainer>
            <Spacer position="right" size="medium" />
            <ShowResultsButton onPress={handleViewResultPress}>
              <Text
                variant="caption"
                style={{ color: "white", fontWeight: "bold" }}
              >
                Show results {facility.professionals.length}
              </Text>
            </ShowResultsButton>
          </Row>
        </ContentContainer>
      </Button>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  selectedFacility: state.booking.facility,
});

const mapDispatchToProps = (dispatch) => ({
  setSelectedFacility: (facility) => dispatch(selectFacility(facility)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FacilityCard);
