import React from "react";
import { useTheme } from "styled-components/native";
import * as ImagePicker from "expo-image-picker";
import { View } from "react-native";
import { Feather } from "@expo/vector-icons";

import { Spacer } from "../spacer/spacer.component";
import { Text } from "../typography/typography.component";
import { FileButton, FilterModal } from "./bottom-sheet.component";


export const ImageUploadModal = ({
                                   showModal,
                                   toggleShowModal,
                                   addImage,
                                   noGallery = false,
                                   allowVideo = false,
                                 }) => {
  const theme = useTheme();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      addImage(result);
      toggleShowModal();
    }
  };

  const takeImage = async (mediaType) => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: mediaType,
      allowsEditing: true,
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      addImage(result);
      toggleShowModal();
    }
  };
  return (
    <FilterModal showModal={showModal} toggleShowModal={toggleShowModal}>
      <Spacer position="bottom" size="large" />
      <View>
        <FileButton
          onPress={() => takeImage(ImagePicker.MediaTypeOptions.Images)}
        >
          <Feather name="image" size={20} color="white" />
          <Spacer position="left" size="large" />
          <Text variant="caption" style={{ color: "white", fontSize: 16 }}>
            Take photo
          </Text>
        </FileButton>

        <Spacer position="bottom" size="large" />

        {allowVideo && (
          <>
            <FileButton
              onPress={() => takeImage(ImagePicker.MediaTypeOptions.Videos)}
            >
              <Feather name="video" size={20} color="white" />
              <Spacer position="left" size="large" />

              <Text variant="caption" style={{ color: "white", fontSize: 16 }}>
                Take video
              </Text>
            </FileButton>

            <Spacer position="bottom" size="large" />
          </>
        )}
        {!noGallery && (
          <>
            <FileButton onPress={pickImage}>
              <Text variant="caption" style={{ color: "white", fontSize: 16 }}>
                Choose from gallery
              </Text>
            </FileButton>
            <Spacer position="bottom" size="large" />
          </>
        )}
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
