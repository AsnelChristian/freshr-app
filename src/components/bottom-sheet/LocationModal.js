import React, { useState } from "react";
import { useTheme } from "styled-components/native";
import { View } from "react-native";
import { connect } from "react-redux";

import { Spacer } from "../spacer/spacer.component";
import { Text } from "../typography/typography.component";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { SearchLocation } from "../form/input.component";
import { Row, Separator } from "../helpers/helpers.component";
import { ModalButton } from "../button/button.component";
import { FilterModal } from "./bottom-sheet.component";


const LocationModalComponent = ({
                                  showModal,
                                  toggleShowModal,
                                  ...restProps
                                }) => {
  const theme = useTheme();
  const [searchInput, setSearchInput] = useState("");
  const [active, setActive] = useState(false);

  return (
    <FilterModal showModal={showModal} toggleShowModal={toggleShowModal}>
      <Spacer position="top" size="large" />
      <View style={{ flex: 1 }}>
        <Spacer position="left" size="medium">
          <Spacer position="top" size="medium" />
          <Text style={{ fontSize: 22, fontWeight: "bold" }}>
            Change location
          </Text>
          <Spacer position="bottom" size="large" />
        </Spacer>
        <View>
          <GooglePlacesAutocomplete
            query={{
              key: "GOOGLE_PLACES_API_KEY",
              language: "en", // language of the results
            }}
            onPress={(data, details) => console.log(data, details)}
            suppressDefaultStyles
            textInputProps={{
              InputComp: SearchLocation,
            }}
            placeholder="search location"
          />
        </View>
      </View>
      <Spacer position="bottom" size="large" />
      <Separator />

      <Row
        style={{
          justifyContent: "space-between",
          paddingHorizontal: 8,
          paddingVertical: 16,
        }}
      >
        <ModalButton>
          <Text>Clear</Text>
        </ModalButton>
        <ModalButton variant="primary">
          <Text style={{ color: "white" }}>Use location</Text>
        </ModalButton>
      </Row>
    </FilterModal>
  );
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});


export const LocationModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationModalComponent);
