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

const { width } = Dimensions.get("window");

const Container = styled.TouchableOpacity`
  height: 180px;
  width: ${width - 50}px;
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

const Button = styled.View`
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
`;

const CoverImage = styled.Image.attrs((props) => ({
  resizeMode: "cover",
}))`
  height: 95%;
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

const TimeItemContainer = styled.View`
  background-color: ${({ theme }) =>
    `${rgba(theme.colors.brand.primary, 0.15)}`};
  border-radius: ${({ theme }) => theme.sizes[1]};
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.space[1]} ${({ theme }) => theme.space[2]};
  margin-top: ${({ theme }) => theme.space[2]};
`;

const FacilityCard = ({ facility, selectedFacility, setSelectedFacility }) => {
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
    <Container onPress={handlePress} active={selected}>
      <MoreButton>
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
      <Button>
        <CoverImage source={{ uri: coverImage }} />
        <Spacer position="left" size="medium" />
        <ContentContainer>
          <Spacer position="top" size="small" />
          <Title>{name}</Title>
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
            <Suggestion value={address}>
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
            {/*<TimeItemContainer>*/}
            {/*  <Ionicons name="md-bicycle-sharp" size={20} />*/}
            {/*  <Spacer position="left" size="small" />*/}
            {/*  <Text variant="caption">{time.bicycle} min</Text>*/}
            {/*</TimeItemContainer>*/}
            {/*<Spacer position="right" size="medium" />*/}
            <TimeItemContainer>
              <Ionicons name="md-walk-sharp" size={20} />
              <Spacer position="left" size="small" />
              <Text variant="caption">{time.foot} min</Text>
            </TimeItemContainer>
            {/*<Spacer position="right" size="medium" />*/}
            {/*<TimeItemContainer>*/}
            {/*  <Ionicons name="md-car-sharp" size={20} />*/}
            {/*  <Spacer position="left" size="small" />*/}
            {/*  <Text variant="caption">{time.car} min</Text>*/}
            {/*</TimeItemContainer>*/}
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
