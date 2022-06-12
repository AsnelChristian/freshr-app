import React from "react";

import { useTheme } from "styled-components/native";
import { Spacer } from "../spacer/spacer.component";
import { SectionTitle } from "../../screens/components/details-screen.component";
import { BookingCard } from "../../screens/pro-facility/components/pro-booking-card";
import { FilterModal } from "./bottom-sheet.component";

export const FacilityBookingList = ({
                                      showModal,
                                      toggleShowModal,
                                      navigation,
                                      date,
                                    }) => {
  const theme = useTheme();

  return (
    <FilterModal showModal={showModal} toggleShowModal={toggleShowModal}>
      <Spacer position="top" size="large" />
      <SectionTitle>{date}</SectionTitle>
      <Spacer position="bottom" size="large" />
      <BookingCard facility={null} navigation={navigation} />
      <Spacer position="top" size="medium" />
      <BookingCard facility={null} navigation={navigation} />
      <Spacer position="top" size="medium" />
      <Spacer position="bottom" size="medium" />
      <Spacer position="bottom" size="large" />
    </FilterModal>
  );
};
