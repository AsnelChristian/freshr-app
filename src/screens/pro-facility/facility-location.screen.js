import styled, { useTheme } from "styled-components/native";
import { connect } from "react-redux";
import { Dimensions, Keyboard, View } from "react-native";
import React, { useState } from "react";
import { SearchLocationNotAutoFocus } from "../../components/form/input.component";
import { LocationModal } from "../../components/bottom-sheet/bottom-sheet.component";
import { Spacer } from "../../components/spacer/spacer.component";
import {
  PaddedContainer,
  SectionTitle,
} from "../components/details-screen.component";
import { Text } from "../../components/typography/typography.component";
import { SafeArea } from "../../components/utils/safearea.component";
import MapView from "react-native-maps";
import { MapMarkerLocation } from "../components/map-marker.component";
import { renderFooter } from "./utils";

const mapStyles = require("../components/mapStyles.json");
const { height } = Dimensions.get("window");

const Container = styled.View`
  flex: 1;
  background-color: white;
  position: relative;
`;

const Map = styled(MapView)`
  flex: 1;
  border-radius: 15px;
`;

const MapContainer = styled.View`
  flex: 1;
`;

const FloatTextMapContainer = styled.View`
  position: absolute;
  bottom: 60px;
  left: 0;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Content = styled.View`
  flex: 1;
`;
const TextContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.ui.primary};
  flex-direction: row;
  padding: 8px 16px;
  border-radius: 15px;
`;

const FacilityLocationScreen = (props) => {
  const theme = useTheme();
  const [showLocationFilter, setShowLocationFilter] = useState(false);
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });
  const [marker, setMarker] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });

  const handleShowLocationFilterChange = () => {
    setShowLocationFilter(!showLocationFilter);
  };

  return (
    <SafeArea>
      <Container>
        <View
          style={{ flex: 0.5, backgroundColor: theme.colors.brand.primary }}
        />
        <Content>
          <Spacer position="bottom" size="medium" />
          <Spacer position="bottom" size="large" />
          <PaddedContainer>
            <SectionTitle>Set location</SectionTitle>
            <Spacer position="bottom" size="medium" />
            <Text variant="caption">Where is your facility located ?</Text>
            <Spacer position="bottom" size="large" />
            <SearchLocationNotAutoFocus
              placeholder="Search location"
              onFocus={() => {
                Keyboard.dismiss();
                handleShowLocationFilterChange();
              }}
            />
          </PaddedContainer>
          <Spacer position="bottom" size="large" />
          <MapContainer>
            <Map
              customMapStyle={mapStyles}
              region={region}
              onPress={(e) => setMarker(e.nativeEvent.coordinate)}
            >
              {marker && <MapMarkerLocation coordinate={marker} />}
            </Map>
            <FloatTextMapContainer>
              <TextContainer>
                <Text variant="caption" style={{ color: "white" }}>
                  Drag pin to your location
                </Text>
              </TextContainer>
            </FloatTextMapContainer>
          </MapContainer>
        </Content>
        {renderFooter(props.navigation, "SetSeatsNumber")}
      </Container>
      <LocationModal
        showModal={showLocationFilter}
        toggleShowModal={handleShowLocationFilterChange}
      />
    </SafeArea>
  );
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (state) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FacilityLocationScreen);
