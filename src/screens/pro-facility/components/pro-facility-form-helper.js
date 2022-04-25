import styled from "styled-components/native";
import { TextInput } from "react-native-paper";
import { rgba } from "polished";
import Modal from "react-native-modal";
import { View } from "react-native";
import { Spacer } from "../../../components/spacer/spacer.component";
import { AntDesign, Entypo, Feather, Ionicons } from "@expo/vector-icons";
import { PaddedContainer } from "../../components/details-screen.component";
import { Text } from "../../../components/typography/typography.component";
import { Separator } from "../../../components/helpers/helpers.component";
import React from "react";

export const FormContainer = styled.View`
  position: relative;
`;

export const FormInput = styled(TextInput).attrs((props) => ({
  mode: "outlined",
  color: props.theme.colors.ui.primary,
  maxLength: 50,
  numberOfLines: 3,
  multiline: true,
  textAlign: { undefined },
  theme: {
    colors: {
      primary: props.theme.colors.ui.primary,
      text: props.theme.colors.ui.primary,
    },
  },
}))`
  width: 100%;
  height: 200px;
  font-size: 40px;
  font-weight: bold;
  padding: 0 10px;
`;

export const SeatFormContainer = styled.View`
  height: 170px;
  background-color: ${({ theme }) => theme.colors.ui.quaternary};
  border-radius: 16px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

export const SeatIndicator = styled.View.attrs((props) => ({
  shadowColor: props.theme.colors.ui.border,
  shadowOffset: {
    width: 10,
    height: 10,
  },
  shadowOpacity: 1,
  shadowRadius: 5,
  elevation: 6,
}))`
  height: 110px;
  width: 110px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.ui.border};
  background-color: white;
  align-items: center;
  justify-content: center;
`;

export const SeatFormButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.ui.primary};
  height: 48px;
  width: 48px;
  border-radius: 100px;
`;

export const SeatCounterIndicator = styled.View`
  background-color: ${({ theme }) => theme.colors.brand.primary};
  padding: ${({ theme }) => theme.space[2]};
  flex-direction: row;
  align-items: center;
  border-radius: 15px;
  justify-content: center;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
`;

export const FormDescriptionInput = styled(TextInput).attrs((props) => ({
  mode: "outlined",
  color: props.theme.colors.ui.primary,
  maxLength: 280,
  multiline: true,
  textAlign: { undefined },
  theme: {
    colors: {
      primary: props.theme.colors.ui.primary,
      text: props.theme.colors.ui.primary,
    },
  },
}))`
  width: 100%;
  height: 250px;
  font-size: 18px;
  font-weight: bold;
`;

export const LengthIndicator = styled.View`
  position: absolute;
  bottom: 5px;
  right: 5px;
`;

export const GalleryImage = styled.ImageBackground`
  aspect-ratio: 1;
  border-radius: 5px;
  overflow: hidden;
  position: relative;
`;

export const CoverImage = styled.ImageBackground`
  border-radius: 5px;
  width: 100%;
  height: 200px;
  position: relative;
  overflow: hidden;
`;

export const CoverImageTag = styled.View`
  background-color: ${({ theme }) => rgba(theme.colors.ui.primary, 0.5)};
  padding: ${({ theme }) => theme.space[2]};
  position: absolute;
  top: 5px;
  left: 5px;
`;

export const ImageSettingButton = styled.TouchableOpacity`
  height: 25px;
  width: 25px;
  border-radius: 100px;
  background-color: white;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 5px;
  top: 5px;
`;

export const ModalViewPositioning = styled.View`
  flex-direction: row;
  justify-content: center;
`;
export const ModalView = styled.View`
  width: 300px;
  background-color: ${({ theme }) => theme.colors.ui.quaternary};
  border-radius: ${({ theme }) => theme.sizes[1]};
  overflow: hidden;
`;

export const ModalCloseButton = styled.TouchableOpacity`
  border-radius: 100px;
  background-color: ${({ theme }) => theme.colors.ui.primary};
  width: 30px;
  height: 30px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const SettingsButtonContainer = styled.View`
  border-radius: 10px;
  background-color: white;
  border: 1px solid ${({ theme }) => theme.colors.ui.border};
`;

export const SettingButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.space[3]};
`;

export const GalleryEmptyContainer = styled.TouchableOpacity`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.ui.quaternary};
  border: 1px solid ${({ theme }) => theme.colors.ui.border};
  border-radius: 15px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const UploadButton = styled.TouchableOpacity`
  background-color: white;
  flex-direction: row;
  height: 40px;
  align-items: center;
  padding: 0px 10px;
  border: 1px solid ${({ theme }) => theme.colors.ui.border};
  border-radius: 30px;
`;

export const renderModal = (
  isVisible,
  isCover,
  setActive,
  moveForward,
  moveBackward,
  setAsCoverImage,
  deleteCurrentImage
) => {
  return (
    <Modal isVisible={isVisible}>
      <ModalViewPositioning>
        <ModalView>
          <View>
            <Spacer position="top" size="small" />
            <Spacer position="left" size="small">
              <ModalCloseButton onPress={setActive}>
                <Ionicons name="close" size={20} color="white" />
              </ModalCloseButton>
            </Spacer>
            <Spacer position="top" size="small" />
          </View>
          {isCover && (
            <PaddedContainer>
              <Spacer position="bottom" size="large" />
              <SettingsButtonContainer>
                <SettingButton onPress={moveForward}>
                  <Text variant="caption" style={{ fontSize: 14 }}>
                    Move forward
                  </Text>
                  <AntDesign name="arrowright" size={24} color="black" />
                </SettingButton>
                <Separator />
                <SettingButton onPress={moveBackward}>
                  <Text variant="caption" style={{ fontSize: 14 }}>
                    Move backward
                  </Text>
                  <AntDesign name="arrowleft" size={24} color="black" />
                </SettingButton>
                <Separator />
                <SettingButton onPress={setAsCoverImage}>
                  <Text variant="caption" style={{ fontSize: 14 }}>
                    Use as cover image
                  </Text>
                  <AntDesign name="staro" size={24} color="black" />
                </SettingButton>
              </SettingsButtonContainer>
              <Spacer position="bottom" size="large" />
              <Spacer position="bottom" size="medium" />
            </PaddedContainer>
          )}
          <Separator />
          <SettingButton
            style={{
              marginBottom: -1,
            }}
            onPress={deleteCurrentImage}
          >
            <Text variant="caption" style={{ fontSize: 14 }}>
              Delete image
            </Text>
            <AntDesign name="delete" size={24} />
          </SettingButton>
        </ModalView>
      </ModalViewPositioning>
    </Modal>
  );
};

export const renderImage = (item, index, selectImage) => {
  return (
    <GalleryImage key={index} source={item}>
      <ImageSettingButton onPress={() => selectImage(item, index)}>
        <Feather name="more-horizontal" size={20} color="black" />
      </ImageSettingButton>
    </GalleryImage>
  );
};

export const renderCoverImage = (image, selectImage) => {
  return (
    <>
      {image && (
        <CoverImage source={image} resizeMode="cover">
          <ImageSettingButton onPress={() => selectImage(image, -1)}>
            <Feather name="more-horizontal" size={20} color="black" />
          </ImageSettingButton>
          <CoverImageTag>
            <Text
              variant="caption"
              style={{
                fontWeight: "normal",
                color: "white",
                textTransform: "uppercase",
              }}
            >
              cover image
            </Text>
          </CoverImageTag>
        </CoverImage>
      )}
      <Spacer position="bottom" size="small" />
    </>
  );
};

export const renderSeatsForm = (increase, reduce, cnt) => {
  return (
    <SeatFormContainer>
      <SeatFormButton onPress={reduce}>
        <Entypo name="minus" size={24} color="white" />
      </SeatFormButton>
      <Spacer position="left" size="large" />
      <Spacer position="left" size="large" />
      <Text variant="caption" style={{ fontSize: 16 }}>
        How many seats
      </Text>
      <Spacer position="left" size="large" />
      <Spacer position="left" size="large" />
      <SeatFormButton onPress={increase}>
        <Entypo name="plus" size={24} color="white" />
      </SeatFormButton>
      <SeatCounterIndicator>
        <Text variant="caption" style={{ color: "white" }}>
          {cnt}
        </Text>
      </SeatCounterIndicator>
    </SeatFormContainer>
  );
};
