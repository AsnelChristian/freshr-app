import React from "react";
import { View } from "react-native";

import { Spacer } from "../spacer/spacer.component";
import { Text } from "../typography/typography.component";
import { FileButton, FilterModal } from "./bottom-sheet.component";

export const EditImageModal = ({ showModal, toggleShowModal }) => {
  return (
    <FilterModal showModal={showModal} toggleShowModal={toggleShowModal}>
      <Spacer position="bottom" size="large" />
      <View>
        <FileButton onPress={() => null}>
          <Text variant="caption" style={{ color: "white", fontSize: 16 }}>
            Delete image
          </Text>
        </FileButton>

        <Spacer position="bottom" size="large" />
        <FileButton onPress={toggleShowModal}>
          <Text variant="caption" style={{ color: "white", fontSize: 16 }}>
            Cancel
          </Text>
        </FileButton>
      </View>
      <Spacer position="bottom" size="large" />
      <Spacer position="bottom" size="large" />
      <Spacer position="bottom" size="medium" />
    </FilterModal>
  );
};
