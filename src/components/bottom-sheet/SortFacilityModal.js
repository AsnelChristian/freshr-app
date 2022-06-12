import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { connect } from "react-redux";

import { Spacer } from "../spacer/spacer.component";
import { Text } from "../typography/typography.component";
import { CheckBoxInput } from "../form/form-checkbox.component";
import { Row, Separator } from "../helpers/helpers.component";
import { ModalButton } from "../button/button.component";
import { FilterModal } from "./bottom-sheet.component";
import { setSortFacilityMethod, setSortMethod } from "../../redux/booking/booking.actions";

const SortFacilityModalComponent = ({
                                      showModal,
                                      toggleShowModal,
                                      ...restProps
                                    }) => {
  const [sort, setSort] = useState("");

  useEffect(() => {
    setSort(restProps.sortFacilitiesBy);
  }, []);
  const applyFilter = () => {
    restProps.setSortFacilityMethod(sort);
    toggleShowModal();
  };
  return (
    <FilterModal showModal={showModal} toggleShowModal={toggleShowModal}>
      <Spacer position="top" size="large" />
      <View style={{ flex: 1 }}>
        <Spacer position="left" size="medium">
          <Spacer position="top" size="medium" />
          <Text style={{ fontSize: 22, fontWeight: "bold" }}>
            Sort facilities by
          </Text>
          <Spacer position="bottom" size="large" />
        </Spacer>

        <Spacer position="bottom" size="small" />
        <CheckBoxInput
          value={sort === "rating"}
          handleChange={() => setSort("rating")}
        >
          <Text style={{ fontSize: 16 }}>Rating</Text>
          <Spacer position="bottom" size="small" />
          <Text variant="caption">How they like it.</Text>
        </CheckBoxInput>
        <Spacer position="bottom" size="small" />
        <CheckBoxInput
          value={sort === "popularity"}
          handleChange={() => setSort("popularity")}
        >
          <Text style={{ fontSize: 16 }}>Popularity</Text>
          <Spacer position="bottom" size="small" />
          <Text variant="caption">They all go there</Text>
        </CheckBoxInput>
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
        <ModalButton onPress={() => setSort(restProps.sortFacilitiesBy)}>
          <Text>Clear all</Text>
        </ModalButton>
        <ModalButton variant="primary" onPress={applyFilter}>
          <Text style={{ color: "white" }}>Apply filters</Text>
        </ModalButton>
      </Row>
    </FilterModal>
  );
};

const mapStateToProps = (state) => ({
  sortMethod: state.booking.sortBy,
  sortFacilitiesBy: state.booking.sortFacilitiesBy,
});

const mapDispatchToProps = (dispatch) => ({
  setSortMethod: (method) => dispatch(setSortMethod(method)),
  setSortFacilityMethod: (method) => dispatch(setSortFacilityMethod(method)),
});


export const SortFacilityModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(SortFacilityModalComponent);
