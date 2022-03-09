import React, { useEffect, useRef } from "react";
import styled, { useTheme } from "styled-components/native";

import { AreaRheostat } from "react-native-rheostat";
import { View } from "react-native";
import { BottomModal } from "../../../components/modal/bottom-sheet-modalcomponent";
import { Text } from "../../../components/typography/typography.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Ionicons } from "@expo/vector-icons";
import { CheckBoxInput } from "../../../components/form/form-checkbox.component";

const ModalContent = styled.View`
  flex: 1;
  padding: 0px ${({ theme }) => theme.space[3]};
`;

const Separator = styled.View`
  height: 1px;
  width: 100%;
  background-color: #ccc;
`;

const CloseButton = styled.TouchableOpacity`
  margin-left: ${({ theme }) => theme.space[3]};
  padding: 0px ${({ theme }) => theme.space[1]};
`;

const ModalFooter = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.space[3]};
`;

const ModalButton = styled.TouchableOpacity`
  background-color: ${({ variant, theme }) =>
    variant === "primary"
      ? theme.colors.ui.primary
      : theme.colors.ui.quaternary};
  padding: ${({ theme }) => theme.space[3]};
  border-radius: ${({ theme }) => theme.sizes[1]};
`;

export const FilterModal = ({ showModal, toggleShowModal, children }) => {
  const bottomSheetModalRef = useRef(null);
  useEffect(() => {
    if (showModal) {
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.close();
    }
  }, [showModal]);

  const handleClose = () => {
    toggleShowModal();
  };

  return (
    <BottomModal ref={bottomSheetModalRef}>
      <Spacer position="bottom" size="small">
        <CloseButton onPress={handleClose}>
          <Ionicons name="close" size={20} />
        </CloseButton>
      </Spacer>
      <Spacer position="top" size="medium" />
      <ModalContent>{children}</ModalContent>
      <Spacer position="bottom" size="large" />
      <Separator />
      <ModalFooter>
        <ModalButton>
          <Text>Clear all</Text>
        </ModalButton>
        <ModalButton variant="primary">
          <Text style={{ color: "white" }}>Apply filters</Text>
        </ModalButton>
      </ModalFooter>
    </BottomModal>
  );
};

export const PriceRangeModal = ({
  showModal,
  toggleShowModal,
  updateValue,
  value,
}) => {
  const theme = useTheme();
  const onRheostatValUpdated = (payload) => {
    updateValue(payload.values);
  };
  return (
    <FilterModal showModal={showModal} toggleShowModal={toggleShowModal}>
      <Spacer position="top" size="large" />
      <View style={{ flex: 1 }}>
        <Spacer position="left" size="medium">
          <Spacer position="top" size="medium" />
          <Text style={{ fontSize: 22, fontWeight: "bold" }}>Price range</Text>
          <Spacer position="bottom" size="large" />
          <Text>
            ${value[0]} - ${value[1]}
          </Text>
        </Spacer>
        <AreaRheostat
          values={[8, 15]}
          min={0}
          max={16}
          theme={{
            rheostat: { themeColor: "gray", grey: "#fafafa" },
          }}
          onValuesUpdated={onRheostatValUpdated}
          svgData={[
            2, 10, 40, 85, 85, 91, 35, 53, 24, 50, 10, 40, 95, 85, 40, 12,
          ]}
        />
      </View>
      <Spacer position="bottom" size="large" />
    </FilterModal>
  );
};

export const GenderModal = ({
  value,
  showModal,
  toggleShowModal,
  updateValue,
}) => {
  return (
    <FilterModal showModal={showModal} toggleShowModal={toggleShowModal}>
      <Spacer position="top" size="large" />
      <View style={{ flex: 1 }}>
        <Spacer position="left" size="medium">
          <Spacer position="top" size="medium" />
          <Text style={{ fontSize: 22, fontWeight: "bold" }}>Pick gender</Text>
          <Spacer position="bottom" size="large" />
        </Spacer>

        <View>
          <CheckBoxInput
            value={value.men}
            handleChange={() => updateValue("men")}
          >
            <Text style={{ fontSize: 16 }}>Men's style</Text>
            <Spacer position="bottom" size="small" />
            <Text variant="caption">Haircut for men</Text>
          </CheckBoxInput>
          <Spacer position="bottom" size="small" />
          <CheckBoxInput
            value={value.women}
            handleChange={() => updateValue("women")}
          >
            <Text style={{ fontSize: 16 }}>Women's style</Text>
            <Spacer position="bottom" size="small" />
            <Text variant="caption">Haircut for women</Text>
          </CheckBoxInput>
          <Spacer position="bottom" size="small" />
          <CheckBoxInput
            value={value.both}
            handleChange={() => updateValue("both")}
          >
            <Text style={{ fontSize: 16 }}>Unspecified</Text>
            <Spacer position="bottom" size="small" />
            <Text variant="caption">Haircut for either</Text>
          </CheckBoxInput>
        </View>
      </View>
      <Spacer position="bottom" size="large" />
    </FilterModal>
  );
};

export const ServiceTypeModal = ({
  value,
  showModal,
  toggleShowModal,
  updateValue,
}) => {
  return (
    <FilterModal showModal={showModal} toggleShowModal={toggleShowModal}>
      <Spacer position="top" size="large" />
      <View style={{ flex: 1 }}>
        <Spacer position="left" size="medium">
          <Spacer position="top" size="medium" />
          <Text style={{ fontSize: 22, fontWeight: "bold" }}>
            Pick service type
          </Text>
          <Spacer position="bottom" size="large" />
        </Spacer>
        <View>
          <CheckBoxInput
            value={value.haircut}
            handleChange={() => updateValue("haircut")}
          >
            <Text style={{ fontSize: 16 }}>Haircut</Text>
            <Spacer position="bottom" size="small" />
            <Text variant="caption">Get that new haircut</Text>
          </CheckBoxInput>
          <Spacer position="bottom" size="small" />
          <CheckBoxInput
            value={value.hairColoring}
            handleChange={() => updateValue("hairColoring")}
          >
            <Text style={{ fontSize: 16 }}>Hair coloring</Text>
            <Spacer position="bottom" size="small" />
            <Text variant="caption">Get your right color</Text>
          </CheckBoxInput>
          <Spacer position="bottom" size="small" />
          <CheckBoxInput
            value={value.beardSculpting}
            handleChange={() => updateValue("beardSculpting")}
          >
            <Text style={{ fontSize: 16 }}>Beard sculpting</Text>
            <Spacer position="bottom" size="small" />
            <Text variant="caption">The right shape of beard</Text>
          </CheckBoxInput>
          <Spacer position="bottom" size="small" />
          <CheckBoxInput
            value={value.scalpMassage}
            handleChange={() => updateValue("scalpMassage")}
          >
            <Text style={{ fontSize: 16 }}>Scalp massage</Text>
            <Spacer position="bottom" size="small" />
            <Text variant="caption">Relax your head</Text>
          </CheckBoxInput>
        </View>
      </View>

      <Spacer position="bottom" size="large" />
    </FilterModal>
  );
};

export const LocationModal = ({ showModal, toggleShowModal }) => {
  return (
    <FilterModal showModal={showModal} toggleShowModal={toggleShowModal}>
      <Spacer position="top" size="large" />
      <View style={{ flex: 1 }}>
        <Text>Location </Text>
      </View>
      <Spacer position="bottom" size="large" />
    </FilterModal>
  );
};

export const SortFilterModal = ({ showModal, toggleShowModal }) => {
  return (
    <FilterModal showModal={showModal} toggleShowModal={toggleShowModal}>
      <Spacer position="top" size="large" />
      <View style={{ flex: 1 }}>
        <Text>Sort </Text>
      </View>
      <Spacer position="bottom" size="large" />
    </FilterModal>
  );
};
