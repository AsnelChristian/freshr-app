import styled from "styled-components/native";
import { connect } from "react-redux";
import React, { useEffect } from "react";
import { setShowNext, toggleCart } from "../redux/booking/booking.actions";
import { Map } from "../features/map/components/map.component";
import { setMatchinFacilities } from "../redux/facilities/facilities.actions";
import { facilitiesMock } from "./facilities.mock";
import FacilityCard from "../components/facilities/facility-card.component";
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
    restProps.setShowAction(true);
  }, []);
  return (
    <PageContainer>
      <MapContainer>
        <Map
          data={restProps.matchingFacilities}
          bottomMargin={30}
          itemWidth={Dimensions.get("window").width - 60}
          renderItem={({ item }) => <FacilityCard facility={item} />}
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
  setShowAction: (value) => dispatch(setShowNext(value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FacilitySelectionScreen);
