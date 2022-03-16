import styled, { useTheme } from "styled-components/native";
import { Dimensions } from "react-native";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Spacer } from "../spacer/spacer.component";
import { Text } from "../typography/typography.component";
import { rgba } from "polished";
import { Suggestion } from "../../features/map/components/suggestion.component";
import React, { useEffect, useState } from "react";
import { Rating } from "react-native-elements";
import { connect } from "react-redux";
import { selectFacility } from "../../redux/booking/booking.actions";
import { TimeItemContainer } from "../chip/chip.component";

const { width } = Dimensions.get("window");

const Container = styled.View`
  height: 175px;
  width: 350px;
  padding: ${({ theme }) => theme.space[2]};
  background-color: white;
  border-radius: ${({ theme }) => theme.sizes[1]};
  overflow: hidden;
  flex-direction: row;
  align-items: center;
  position: relative;
  border: 2px solid
    ${({ active, theme }) => (active ? theme.colors.ui.primary : "white")};
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
  border-radius: ${({ theme }) => theme.sizes[1]};

  padding: ${({ theme }) => theme.space[2]};
  top: 0;
  right: 0;
  z-index: 10;
`;

const CoverImage = styled.Image.attrs((props) => ({
  resizeMode: "cover",
}))`
  height: 140px;
  border-radius: ${({ theme }) => theme.sizes[1]};
  overflow: hidden;
  aspect-ratio: 1;
`;

const ContentContainer = styled.View`
  flex: 1;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
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
    <Container active={selected}>
      <MoreButton onPress={handleMorePress}>
        <MaterialIcons name="more-vert" size={24} />
      </MoreButton>

      {selected && (
        <Ionicons
          name="checkmark-circle"
          size={24}
          color={theme.colors.ui.primary}
          style={{ position: "absolute", bottom: 0, right: 0, zIndex: 1 }}
        />
      )}
      <Button onPress={handlePress}>
        <CoverImage source={{ uri: coverImage }} />
        <Spacer position="left" size="medium" />
        <ContentContainer>
          <Spacer position="top" size="small" />
          <Title numberOfLines={1}>{name}</Title>
          <Spacer position="bottom" size="large" />
          <Row>
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
            <Suggestion value={address} pressable={false}>
              <Ionicons name="location" size={12} />
            </Suggestion>
          </Spacer>

          <Row>
            <TimeItemContainer>
              <MaterialCommunityIcons name="map-marker-distance" size={20} />
              <Spacer position="left" size="small" />
              <Text variant="caption">{distance} km</Text>
            </TimeItemContainer>
            <Spacer position="right" size="medium" />
            <TimeItemContainer>
              <Ionicons name="md-walk-sharp" size={20} />
              <Spacer position="left" size="small" />
              <Text variant="caption">{time.foot} min</Text>
            </TimeItemContainer>
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
