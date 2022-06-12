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
  setProGender,
  setTargetGender,
} from "../../redux/booking/booking.actions";

const GenderModalComponent = ({ showModal, toggleShowModal, ...restProps }) => {
  const [gender, setGender] = useState("");
  const [genderPro, setGenderPro] = useState("");

  useEffect(() => {
    setGender(restProps.targetGender);
    setGenderPro(restProps.proGender);
  }, [restProps.proGender, restProps.targetGender]);

  const applyFilter = () => {
    restProps.setTargetGender(gender);
    restProps.setProGender(genderPro);
    toggleShowModal();
  };
  return (
    <FilterModal showModal={showModal} toggleShowModal={toggleShowModal}>
      <Spacer position="top" size="large" />
      <View style={{ flex: 1 }}>
        <Spacer position="left" size="medium">
          <Spacer position="top" size="medium" />
          <Text style={{ fontSize: 22, fontWeight: "bold" }}>
            Pick a gender style
          </Text>
          <Spacer position="bottom" size="large" />
        </Spacer>

        <CheckBoxInput
          value={gender === "male"}
          handleChange={() => setGender("male")}
        >
          <Text style={{ fontSize: 16 }}>Men's style</Text>
          <Spacer position="bottom" size="small" />
          <Text variant="caption">Haircut for men</Text>
        </CheckBoxInput>
        <Spacer position="bottom" size="small" />
        <CheckBoxInput
          value={gender === "female"}
          handleChange={() => setGender("female")}
        >
          <Text style={{ fontSize: 16 }}>Women's style</Text>
          <Spacer position="bottom" size="small" />
          <Text variant="caption">Haircut for women</Text>
        </CheckBoxInput>
        <Spacer position="bottom" size="small" />
        <CheckBoxInput
          value={gender === "none"}
          handleChange={() => setGender("none")}
        >
          <Text style={{ fontSize: 16 }}>All gender</Text>
          <Spacer position="bottom" size="small" />
          <Text variant="caption">Style for all</Text>
        </CheckBoxInput>
      </View>
      <Spacer position="top" size="large" />

      <View style={{ flex: 1 }}>
        <Spacer position="left" size="medium">
          <Spacer position="top" size="medium" />
          <Text style={{ fontSize: 22, fontWeight: "bold" }}>
            Professional's gender
          </Text>
          <Spacer position="top" size="medium" />
          <Text variant="caption">
            Which gender do you feel more comfortable with ?
          </Text>
          <Spacer position="bottom" size="large" />
        </Spacer>

        <CheckBoxInput
          value={genderPro === "male"}
          handleChange={() => setGenderPro("male")}
        >
          <Text style={{ fontSize: 16 }}>Male</Text>
          <Spacer position="bottom" size="small" />
          {/*<Text variant="caption">Haircut for men</Text>*/}
        </CheckBoxInput>
        <Spacer position="bottom" size="small" />
        <CheckBoxInput
          value={genderPro === "female"}
          handleChange={() => setGenderPro("female")}
        >
          <Text style={{ fontSize: 16 }}>Female</Text>
          <Spacer position="bottom" size="small" />
          {/*<Text variant="caption">Haircut for women</Text>*/}
        </CheckBoxInput>
        <Spacer position="bottom" size="small" />
        <CheckBoxInput
          value={genderPro === "none"}
          handleChange={() => setGenderPro("none")}
        >
          <Text style={{ fontSize: 16 }}>No particular preference</Text>
          <Spacer position="bottom" size="small" />
          {/*<Text variant="caption">Style for all</Text>*/}
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
        <ModalButton
          onPress={() => {
            setGender(restProps.targetGender);
            setGenderPro(restProps.proGender);
          }}
        >
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
  targetGender: state.booking.targetGender,
  proGender: state.booking.proGender,
});

const mapDispatchToProps = (dispatch) => ({
  setTargetGender: (gender) => dispatch(setTargetGender(gender)),
  setProGender: (gender) => dispatch(setProGender(gender)),
});


export const GenderModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(GenderModalComponent);
