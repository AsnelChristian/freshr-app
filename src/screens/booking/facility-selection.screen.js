import styled, {useTheme} from "styled-components/native";
import { connect } from "react-redux";
import React, {useEffect, useState} from "react";

import {clearCart, selectFacility, setBookingStep} from "../../redux/booking/booking.actions";
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
import {LocationModal} from "../../features/map/components/filter-modal.component";
import {rgba} from "polished";
import {FontAwesome} from "@expo/vector-icons";
import {Spacer} from "../../components/spacer/spacer.component";

const PageContainer = styled.View`
  flex: 1;
  background-color: white;
  ${({ showActionButton }) => (showActionButton ? "margin-bottom: 60px" : "")};
`;

const MapContainer = styled.View`
  flex: 1;
`;

const SearchLocationButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin:  0px ${({theme}) => theme.space[3]};
  padding: ${({theme}) => theme.space[3]}; 
  background-color: ${({theme}) => theme.colors.ui.quaternary};
  border: 2px solid ${({theme}) => rgba(theme.colors.ui.primary, 0.1)};
  border-radius: ${({theme}) => theme.sizes[2]};
`

const FacilitySelectionScreen = ({
  showCart,
  navigation,
  route,
  ...restProps
}) => {
  const theme = useTheme();
  const editBooking = route.params.edit;
  const [locationFilter, setLocationFilter] = useState([]);
  const [showLocationFilter, setShowLocationFilter] = useState(false);

  const handleLocationFilterPress = () => {
    setShowLocationFilter(!showLocationFilter);
  };

  const filters = [
    {
      name: "Location",
      method: handleLocationFilterPress,
      variant: showLocationFilter,
    },
  ]

  useEffect(() => {
    restProps.setMatchingFacilities(facilitiesMock);
    // restProps.setSelectedFacility(restProps.matchingFacilities[0]);
    if (!editBooking) {
      restProps.setBookingStep(0)
    }
    return () => {
      restProps.resetCart();
    };
  }, [navigation.route]);
  return (
    <>
      <BookingStepper pageStep={0} navigation={navigation}/>
      <PageContainer showActionButon={restProps.selectedFacility !== null}>
        <SearchLocationButton onPress={handleLocationFilterPress}>
          <FontAwesome name="location-arrow" size={20}/>
          <Spacer position="right" size="medium"/>
          <Text style={{color: rgba(theme.colors.ui.primary, 0.3)}}>Search location</Text>
        </SearchLocationButton>
        <Spacer position="bottom" size="medium"/>
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
                  : navigation.navigate("ProfessionalSelection", { edit: false })
              }
            >
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 16,
                }}
              >
                {editBooking ? "Back to review" : "Book a professional nearby"}
              </Text>
            </ActionButton>
          </ButtonContainer>
        )}
      </PageContainer>
      <LocationModal
          value={locationFilter}
          showModal={showLocationFilter}
          toggleShowModal={handleLocationFilterPress}
      />
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
  setBookingStep: (step) => dispatch(setBookingStep(step)),
  resetCart: () => dispatch(clearCart())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FacilitySelectionScreen);
