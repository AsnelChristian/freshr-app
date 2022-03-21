import styled, { useTheme } from "styled-components/native";
import React, { useEffect, useState } from "react";
import { Entypo, FontAwesome, Octicons } from "@expo/vector-icons";

import { connect } from "react-redux";
import {clearCart, setBookingStep, setSpecialist} from "../../redux/booking/booking.actions";

import { Text } from "../../components/typography/typography.component";
import { Spacer } from "../../components/spacer/spacer.component";
import { SafeArea } from "../../components/utils/safearea.component";
import {
  GenderModal,
  PriceRangeModal,
  LocationModal,
  ServiceTypeModal,
  SortFilterModal,
  ServicesModal,
} from "../../features/map/components/filter-modal.component";
import Map from "../../features/map/components/map.component";
import { specialistsMock } from "../mock/specialists.mock";
import { setMatchingSpecialists } from "../../redux/specialists/specialists.action";
import SpecialistCard from "../../features/map/components/specialist-card.component";
import {rgba} from "polished";
import BookingStepper from "../components/booking-step.component";
import {View} from "react-native";

const MapScreenContainer = styled.View`
  flex: 1;
  background-color: white;
`;



const MapContainer = styled.View`
  flex: 1;
`;


const ProfessionalSelectionScreen = ({ navigation, ...props }) => {
  const theme = useTheme();

  useEffect(() => {
    props.setMatchingSpecialists(specialistsMock);
    props.setBookingStep(0.5);
  }, []);



  return (
    <View style={{flex: 1}}>
      <BookingStepper pageStep={0.5} navigation={navigation}/>
      <MapScreenContainer>

        <MapContainer>
          <Map
              page="specialists"
            data={props.matchingSpecialists}
            itemWidth={340}
            renderItem={({ item }) => (
              <SpecialistCard
                  navigation={navigation}
                onPress={() => {
                  props.setSpecialist(item);
                  navigation.navigate("SpecialistDetails", { edit: false });
                }}
                specialist={item}
              />
            )}
          />
        </MapContainer>
      </MapScreenContainer>

    </View>
  );
};

const mapStateToProps = (state) => ({
  matchingSpecialists: state.specialists.specialists,
  selectedSpecialist: state.booking.specialists,
});

const mapDispatchToProps = (dispatch) => ({
  setMatchingSpecialists: (specialists) =>
    dispatch(setMatchingSpecialists(specialists)),
  setSpecialist: (specialist) => dispatch(setSpecialist(specialist)),
  setBookingStep: (step) => dispatch(setBookingStep(step)),
  clearCart: () => dispatch(clearCart()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfessionalSelectionScreen);
