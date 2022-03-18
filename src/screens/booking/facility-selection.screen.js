import styled from "styled-components/native";
import { connect } from "react-redux";
import React, { useEffect } from "react";

import {selectFacility, setBookingStep} from "../../redux/booking/booking.actions";
import Map from "../../features/map/components/map.component";
import { setMatchinFacilities } from "../../redux/facilities/facilities.actions";
import { facilitiesMock } from "../mock/facilities.mock";
import FacilityCard from "../../components/facilities/facility-card.component";
import {
  ActionButton,
  ButtonContainer,
} from "../../components/button/process-action-button.component";
import { Text } from "../../components/typography/typography.component";
import BookingStepper from "../components/booking-step.component";

const PageContainer = styled.View`
  flex: 1;
  background-color: white;
  ${({ showActionButton }) => (showActionButton ? "margin-bottom: 60px" : "")};
`;

const MapContainer = styled.View`
  flex: 1;
`;

const FacilitySelectionScreen = ({
  showCart,
  navigation,
  route,
  ...restProps
}) => {
  const editBooking = route.params.edit;
  useEffect(() => {
    restProps.setMatchingFacilities(facilitiesMock);
    // restProps.setSelectedFacility(restProps.matchingFacilities[0]);
    if (!editBooking) {
      restProps.setBookingStep(1)
    }
  }, [navigation.route]);
  return (
    <>
      <BookingStepper pageStep={1} navigation={navigation}/>
      <PageContainer showActionButon={restProps.selectedFacility !== null}>
        <MapContainer>
          <Map
            data={restProps.matchingFacilities}
            bottomMargin={30}
            itemWidth={340}
            renderItem={({ item }) => (
              <FacilityCard
                handleMorePress={() =>
                  navigation.navigate("FacilityDetails", { facility: item })
                }
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
              onPress={() =>
                editBooking
                  ? navigation.navigate("BookingReview")
                  : navigation.navigate("MeetingTimeSelection", { edit: false })
              }
            >
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 16,
                }}
              >
                {editBooking ? "Back to review" : "Next step"}
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
  bookingStep: state.booking.step
});

const mapDispatchToProps = (dispatch) => ({
  setMatchingFacilities: (facilities) =>
    dispatch(setMatchinFacilities(facilities)),
  setSelectedFacility: (facility) => dispatch(selectFacility(facility)),
  setBookingStep: (step) => dispatch(setBookingStep(step))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FacilitySelectionScreen);
