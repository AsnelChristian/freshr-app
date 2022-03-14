import styled from "styled-components/native";
import { connect } from "react-redux";
import React, { useEffect } from "react";
import { selectFacility, toggleCart } from "../redux/booking/booking.actions";
import { Map } from "../features/map/components/map.component";
import { SpecialistCard } from "../features/map/components/specialist-card.component";
import { setMatchinFacilities } from "../redux/facilities/facilities.actions";
import { facilitiesMock } from "./facilities.mock";
import { FacilityCard } from "../components/facilities/facility-card.component";
import { Dimensions } from "react-native";

const PageContainer = styled.View`
  flex: 1;
  background-color: white;
`;

const MapContainer = styled.View`
  flex: 1;
`;

const FacilitySelectionScreen = ({ showCart, ...restProps }) => {
  useEffect(() => {
    restProps.setMatchingFacilities(facilitiesMock);
    // restProps.setSelectedFacility(restProps.matchingFacilities[0]);
    showCart(false);
  }, []);
  return (
    <PageContainer>
      <MapContainer>
        <Map
          data={restProps.matchingFacilities}
          itemWidth={Dimensions.get("window").width - 60}
          renderItem={({ item }) => (
            <FacilityCard
              onPress={() => {
                restProps.setSelectedFacility(item);
              }}
              facility={item}
            />
          )}
        />
      </MapContainer>
    </PageContainer>
  );
};

const mapStateToProps = (state) => ({
  selectedFacility: state.booking.facility,
  matchingFacilities: state.facilities.facilities,
});

const mapDispatchToProps = (dispatch) => ({
  showCart: (value) => dispatch(toggleCart(value)),
  setMatchingFacilities: (facilities) =>
    dispatch(setMatchinFacilities(facilities)),
  setSelectedFacility: (facility) => dispatch(selectFacility(facility)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FacilitySelectionScreen);
