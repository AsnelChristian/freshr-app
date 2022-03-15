import styled from "styled-components/native";
import { connect } from "react-redux";
import React, { useEffect } from "react";

import { selectFacility } from "../redux/booking/booking.actions";
import Map from "../features/map/components/map.component";
import { setMatchinFacilities } from "../redux/facilities/facilities.actions";
import { facilitiesMock } from "./facilities.mock";
import FacilityCard from "../components/facilities/facility-card.component";
import { Dimensions } from "react-native";
import {
  ActionButton,
  ButtonContainer,
} from "../components/button/process-action-button.component";
import { Text } from "../components/typography/typography.component";

const PageContainer = styled.View`
  flex: 1;
  background-color: white;
  ${({ showActionButton }) => (showActionButton ? "margin-bottom: 60px" : "")};
`;

const MapContainer = styled.View`
  flex: 1;
`;

const FacilitySelectionScreen = ({ showCart, navigation, ...restProps }) => {
  useEffect(() => {
    restProps.setMatchingFacilities(facilitiesMock);
    // restProps.setSelectedFacility(restProps.matchingFacilities[0]);

    return () => {
      restProps.setSelectedFacility(null);
    };
  }, []);
  return (
    <>
      <PageContainer showActionButon={restProps.selectedFacility !== null}>
        <MapContainer>
          <Map
            data={restProps.matchingFacilities}
            bottomMargin={30}
            itemWidth={Dimensions.get("window").width - 60}
            renderItem={({ item }) => (
              <FacilityCard
                handleMorePress={() => navigation.navigate("FacilityDetails")}
                facility={item}
              />
            )}
          />
        </MapContainer>
        {restProps.selectedFacility && (
          <ButtonContainer
            style={{
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 5,
              },
              shadowOpacity: 0.34,
              shadowRadius: 6.27,
              elevation: 10,
            }}
          >
            <ActionButton
              height={50}
              onPress={() => navigation.navigate("MeetingTimeSelection")}
            >
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 16,
                  textTransform: "uppercase",
                }}
              >
                Proceed to next step
              </Text>
            </ActionButton>
          </ButtonContainer>
        )}
      </PageContainer>
    </>
  );
};

const mapStateToProps = (state) => ({
  selectedFacility: state.booking.facility,
  matchingFacilities: state.facilities.facilities,
});

const mapDispatchToProps = (dispatch) => ({
  setMatchingFacilities: (facilities) =>
    dispatch(setMatchinFacilities(facilities)),
  setSelectedFacility: (facility) => dispatch(selectFacility(facility)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FacilitySelectionScreen);
