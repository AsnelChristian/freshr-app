import styled, { useTheme } from "styled-components/native";
import { connect } from "react-redux";

import { SafeArea } from "../../components/utils/safearea.component";
import { renderFooter } from "./utils";
import { Spacer } from "../../components/spacer/spacer.component";
import {
  PaddedContainer,
  SectionTitle,
} from "../components/details-screen.component";
import { Text } from "../../components/typography/typography.component";
import React, { useState } from "react";
import { FlatGrid } from "react-native-super-grid";
import { ScrollView, View } from "react-native";
import * as MediaLibrary from "expo-media-library";
import { ImageSelectionModal } from "../../components/bottom-sheet/bottom-sheet.component";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { Separator } from "../../components/helpers/helpers.component";
import { cover, rgba } from "polished";
import { arrayMoveImmutable } from "array-move";

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const Content = styled.View`
  flex: 1;
`;

const UploadImageButton = styled.TouchableOpacity`
  height: 50px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  background-color: ${({ theme }) => theme.colors.ui.primary};
`;

const GalleryImage = styled.ImageBackground`
  aspect-ratio: 1;
  border-radius: 5px;
  overflow: hidden;
  position: relative;
`;

const CoverImage = styled.ImageBackground`
  border-radius: 5px;
  width: 100%;
  height: 200px;
  position: relative;
  overflow: hidden;
`;

const CoverImageTag = styled.View`
  background-color: ${({ theme }) => rgba(theme.colors.ui.primary, 0.5)};
  padding: ${({ theme }) => theme.space[2]};
  position: absolute;
  top: 5px;
  left: 5px;
`;

const ImageSettingButton = styled.TouchableOpacity`
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

const ModalViewPositioning = styled.View`
  flex-direction: row;
  justify-content: center;
`;
const ModalView = styled.View`
  width: 300px;
  background-color: ${({ theme }) => theme.colors.ui.quaternary};
  border-radius: ${({ theme }) => theme.sizes[1]};
  overflow: hidden;
`;

const ModalCloseButton = styled.TouchableOpacity`
  border-radius: 100px;
  background-color: ${({ theme }) => theme.colors.ui.primary};
  width: 30px;
  height: 30px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const SettingsButtonContainer = styled.View`
  border-radius: 10px;
  background-color: white;
  border: 1px solid ${({ theme }) => theme.colors.ui.border};
`;

const SettingButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.space[3]};
`;

const GalleryEmptyContainer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.ui.quaternary};
  border: 1px solid ${({ theme }) => theme.colors.ui.border};
  border-radius: 15px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const FacilityGalleryScreen = (props) => {
  const theme = useTheme();
  const [gallery, setGallery] = useState([]);
  const [coverImage, setCoverImage] = useState(null);
  const [showFileSelectionModal, setShowFileSelectionModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(-1);

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const updateGallery = (images) => {
    const cover = images.pop();
    setGallery(images);
    setCoverImage(cover);
  };

  const toggleShowFileSelectionModal = () => {
    setShowFileSelectionModal(!showFileSelectionModal);
  };

  const renderModal = () => {
    return (
      <Modal isVisible={selectedImage !== null}>
        <ModalViewPositioning>
          <ModalView>
            <View>
              <Spacer position="top" size="small" />
              <Spacer position="left" size="small">
                <ModalCloseButton
                  onPress={() => {
                    setSelectedImage(null);
                  }}
                >
                  <Ionicons name="close" size={20} color="white" />
                </ModalCloseButton>
              </Spacer>
              <Spacer position="top" size="small" />
            </View>
            {selectedImage !== coverImage && (
              <PaddedContainer>
                <Spacer position="bottom" size="large" />
                <SettingsButtonContainer>
                  <SettingButton
                    onPress={() => {
                      setGallery((old) => {
                        const moveToIndex =
                          selectedImageIndex === 0
                            ? gallery.length - 1
                            : selectedImageIndex - 1;
                        return arrayMoveImmutable(
                          old,
                          selectedImageIndex,
                          moveToIndex
                        );
                      });
                      setSelectedImage(null);
                    }}
                  >
                    <Text variant="caption" style={{ fontSize: 14 }}>
                      Move forward
                    </Text>
                    <AntDesign name="arrowright" size={24} color="black" />
                  </SettingButton>
                  <Separator />
                  <SettingButton
                    onPress={() => {
                      setGallery((old) => {
                        const moveToIndex =
                          selectedImageIndex === gallery.length - 1
                            ? 0
                            : selectedImageIndex + 1;
                        return arrayMoveImmutable(
                          old,
                          selectedImageIndex,
                          moveToIndex
                        );
                      });
                      setSelectedImage(null);
                    }}
                  >
                    <Text variant="caption" style={{ fontSize: 14 }}>
                      Move backward
                    </Text>
                    <AntDesign name="arrowleft" size={24} color="black" />
                  </SettingButton>
                  <Separator />
                  <SettingButton
                    onPress={() => {
                      setGallery((old) => {
                        const newCover = { ...selectedImage };

                        const newGallery = [...old];
                        const pos = newGallery
                          .map((e) => e.id)
                          .indexOf(selectedImage.id);
                        newGallery[pos] = coverImage;
                        setCoverImage(newCover);

                        setSelectedImage(null);
                        return newGallery;
                      });
                    }}
                  >
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
            <SettingButton
              style={{
                backgroundColor: theme.colors.ui.primary,
                marginBottom: -1,
              }}
            >
              <Text variant="caption" style={{ fontSize: 14, color: "white" }}>
                Delete image
              </Text>
              <AntDesign name="delete" size={24} color="white" />
            </SettingButton>
          </ModalView>
        </ModalViewPositioning>
      </Modal>
    );
  };

  const renderImage = (item, index) => {
    return (
      <GalleryImage key={index} source={item}>
        <ImageSettingButton
          onPress={() => {
            setSelectedImage(item);
            setSelectedImageIndex(index);
          }}
        >
          <Feather name="more-horizontal" size={20} color="black" />
        </ImageSettingButton>
      </GalleryImage>
    );
  };

  const renderGalleryEmpty = () => {
    return (
      <GalleryEmptyContainer>
        <Text style={{ color: "gray" }}>No image selected</Text>
      </GalleryEmptyContainer>
    );
  };
  const renderGallery = () => {
    return (
      <FlatGrid
        data={gallery}
        spacing={4}
        renderItem={({ item, index }) => renderImage(item, index)}
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  return (
    <SafeArea>
      <Container>
        <View
          style={{ flex: 0.6, backgroundColor: theme.colors.brand.primary }}
        />

        {renderModal()}
        <Content showsVerticalScrollIndicator={false}>
          <Spacer position="bottom" size="medium" />
          <Spacer position="bottom" size="large" />
          <PaddedContainer style={{ flex: 1 }}>
            <SectionTitle>Gallery</SectionTitle>
            <Spacer position="bottom" size="medium" />
            <Text variant="caption" style={{ lineHeight: 22 }}>
              Upload some images to advertise your facility
            </Text>

            <Spacer position="bottom" size="large" />
            {gallery.length ? (
              <ScrollView
                style={{ flex: 1 }}
                showsVerticalScrollIndicator={false}
              >
                {coverImage && (
                  <CoverImage source={coverImage} resizeMode="cover">
                    <ImageSettingButton
                      onPress={() => setSelectedImage(coverImage)}
                    >
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
                {renderGallery()}
              </ScrollView>
            ) : (
              renderGalleryEmpty()
            )}
            <Spacer position="bottom" size="medium" />
            <Spacer position="bottom" size="large" />
            <UploadImageButton onPress={toggleShowFileSelectionModal}>
              <Text variant="caption" style={{ color: "white", fontSize: 16 }}>
                Upload images
              </Text>
            </UploadImageButton>
          </PaddedContainer>
        </Content>
        {renderFooter(props.navigation, "SetFacilityName")}
      </Container>
      <ImageSelectionModal
        showModal={showFileSelectionModal}
        toggleShowModal={toggleShowFileSelectionModal}
        updateValue={updateGallery}
      />
    </SafeArea>
  );
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FacilityGalleryScreen);
