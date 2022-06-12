import React, { useState } from "react";
import { useTheme } from "styled-components/native";
import * as ImageManipulator from "expo-image-manipulator";
import { Dimensions, View } from "react-native";
import { ImageBrowser } from "expo-image-picker-multiple";

import { Spacer } from "../spacer/spacer.component";
import { Row, Separator } from "../helpers/helpers.component";
import { ModalButton } from "../button/button.component";
import { Text } from "../typography/typography.component";
import { FilterModal } from "./bottom-sheet.component";

export const ImageSelectionModal = ({
                                      showModal,
                                      toggleShowModal,
                                      updateValue,
                                    }) => {
  const theme = useTheme();
  const [images, setImages] = useState([]);

  const uploadImages = () => {
    console.log(images);
    updateValue(images);
    toggleShowModal();
  };

  const imagesCallback = (callback) => {
    callback
      .then(async (photos) => {
        const cPhotos = [];
        for (let photo of photos) {
          const pPhoto = await _processImageAsync(photo.uri);
          cPhotos.push({
            uri: pPhoto.uri,
            name: photo.filename,
            type: "image/jpg",
          });
        }
        setImages(cPhotos);
      })
      .catch((e) => console.log(e));
  };

  const updateHandler = (count, onSubmit) => {
    onSubmit();
  };

  const _processImageAsync = async (uri) => {
    const file = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 1000 } }],
      { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
    );
    return file;
  };

  return (
    <FilterModal
      showModal={showModal}
      toggleShowModal={toggleShowModal}
      scrollView={false}
    >
      <Spacer position="top" size="large" />
      <View style={{ height: Dimensions.get("window").height - 200 }}>
        <ImageBrowser
          max={6}
          onChange={updateHandler}
          callback={imagesCallback}
        />
        {/*<AssetsSelector*/}
        {/*  Settings={widgetSettings}*/}
        {/*  Errors={widgetErrors}*/}
        {/*  Styles={widgetStyles}*/}
        {/*  // Resize={widgetResize} know how to use first , perform slower results.*/}
        {/*/>*/}
      </View>
      <Separator />
      <Row
        style={{
          justifyContent: "space-between",
          paddingHorizontal: 8,
          paddingVertical: 16,
        }}
      >
        {/*<ModalButton onPress={() => null}>*/}
        {/*  <Text>Clear all</Text>*/}
        {/*</ModalButton>*/}
        <ModalButton
          variant="primary"
          onPress={uploadImages}
          style={{ flex: 1 }}
        >
          <Text style={{ color: "white" }}>Upload images</Text>
        </ModalButton>
      </Row>
    </FilterModal>
  );
};
