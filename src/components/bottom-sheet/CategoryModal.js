import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { connect } from "react-redux";

import { Spacer } from "../spacer/spacer.component";
import { Text } from "../typography/typography.component";
import { CheckBoxInput } from "../form/form-checkbox.component";
import { Row, Separator } from "../helpers/helpers.component";
import { ModalButton } from "../button/button.component";
import { FilterModal } from "./bottom-sheet.component";
import {
  setCurrentCategory,
} from "../../redux/booking/booking.actions";

const CategoryModalComponent = ({
                                  showModal,
                                  toggleShowModal,
  serviceCategories,
                                  ...restProps
                                }) => {
  const [category, setCategory] = useState(restProps.category);

  useEffect(() => {
    setCategory(restProps.category);
  }, []);
  const applyFilter = () => {
    restProps.setCurrentCategory(category);
    toggleShowModal();
  };
  return (
    <FilterModal showModal={showModal} toggleShowModal={toggleShowModal}>
      <Spacer position="top" size="large" />
      <View style={{ flex: 1 }}>
        <Spacer position="left" size="medium">
          <Spacer position="top" size="medium" />
          <Text style={{ fontSize: 22, fontWeight: "bold" }}>
            Pick a category
          </Text>
          <Spacer position="bottom" size="large" />
        </Spacer>

        <View>
          {serviceCategories.map((item, index) => (
            <View key={`${item.id}-${index}`}>
              <CheckBoxInput
                value={category ? category.name === item.name : false}
                handleChange={() => setCategory(item)}
              >
                <Text style={{ fontSize: 16, textTransform: "capitalize" }}>
                  {item.name}
                </Text>
                <Spacer position="bottom" size="small" />
                <Text variant="caption">{item.catchPhrase}</Text>
              </CheckBoxInput>
              <Spacer position="bottom" size="small" />
            </View>
          ))}
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
        <ModalButton onPress={() => setCategory(restProps.category)}>
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
  category: state.booking.currentCategory,
  serviceCategories: state.services.serviceCategories,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentCategory: (category) => dispatch(setCurrentCategory(category)),
});


export const CategoryModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryModalComponent);
