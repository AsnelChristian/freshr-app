import React, { useEffect, useRef } from "react";
import styled, { useTheme } from "styled-components/native";

import { AreaRheostat } from "react-native-rheostat";
import { View } from "react-native";
import { BottomModal } from "../../../components/modal/bottom-sheet-modalcomponent";
import { Text } from "../../../components/typography/typography.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Ionicons } from "@expo/vector-icons";

const ModalContent = styled.View`
  flex: 1;
  padding: 0px ${({ theme }) => theme.space[3]};
`;

const Separator = styled.View`
  height: 1px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
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
