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
import { View } from "react-native";
import { ImageSelectionModal } from "../../components/bottom-sheet/bottom-sheet.component";
import { Feather } from "@expo/vector-icons";
import { Row } from "../../components/helpers/helpers.component";
import { arrayMoveImmutable } from "array-move";
import {
  GalleryEmptyContainer,
  renderCoverImage,
  renderImage,
  renderModal,
  UploadButton,
} from "./components/pro-facility-form-helper";

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const Content = styled.View`
  flex: 1;
  background-color: white;
`;

const UploadImageButton = styled.TouchableOpacity`
  height: 50px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  background-color: ${({ theme }) => theme.colors.ui.primary};
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

  const setActiveImage = () => setSelectedImage(null);

  const moveImageForward = () => {
    setGallery((old) => {
      const moveToIndex =
        selectedImageIndex === 0 ? gallery.length - 1 : selectedImageIndex - 1;
      return arrayMoveImmutable(old, selectedImageIndex, moveToIndex);
    });
    setSelectedImage(null);
  };
  const moveImageBackward = () => {
    setGallery((old) => {
      const moveToIndex =
        selectedImageIndex === gallery.length - 1 ? 0 : selectedImageIndex + 1;
      return arrayMoveImmutable(old, selectedImageIndex, moveToIndex);
    });
    setSelectedImage(null);
  };
  const setImageAsCoverImage = () => {
    setGallery((old) => {
      const newCover = { ...selectedImage };

      const newGallery = [...old];
      const pos = newGallery.map((e) => e.id).indexOf(selectedImage.id);
      newGallery[pos] = coverImage;
      setCoverImage(newCover);

      setSelectedImage(null);
      return newGallery;
    });
  };

  const handleSelectImage = (item, index) => {
    setSelectedImage(item);
    setSelectedImageIndex(index);
  };
  const deleteImage = () => null;

  const renderFlatGridFooter = () => {
    return (
      <>
        <Spacer position="bottom" size="medium" />
        <Spacer position="bottom" size="large" />
      </>
    );
  };

  const renderGalleryEmpty = () => {
    return (
      <GalleryEmptyContainer onPress={toggleShowFileSelectionModal}>
        <Text style={{ color: "gray" }}>No image selected</Text>
      </GalleryEmptyContainer>
    );
  };
  const renderGallery = () => {
    return (
      <FlatGrid
        ListHeaderComponent={renderCoverImage(coverImage, handleSelectImage)}
        ListFooterComponent={renderFlatGridFooter()}
        data={gallery}
        spacing={2}
        renderItem={({ item, index }) =>
          renderImage(item, index, handleSelectImage)
        }
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  const renderHeader = () => {
    return (
      <Row style={{ justifyContent: "space-between" }}>
        <View>
          <SectionTitle>Gallery</SectionTitle>
          <Spacer position="bottom" size="medium" />
          <Text variant="caption" style={{ lineHeight: 22 }}>
            Upload some images to advertise your facility
          </Text>
          <Spacer position="bottom" size="large" />
        </View>
        <UploadButton onPress={toggleShowFileSelectionModal}>
          <Feather name="upload" size={18} color={theme.colors.ui.primary} />
          <Spacer position="left" size="small" />
          <Text>Upload</Text>
        </UploadButton>
      </Row>
    );
  };

  return (
    <SafeArea>
      <Container style={{ backgroundColor: theme.colors.brand.primary }}>
        <View
          style={{ flex: 0.5, backgroundColor: theme.colors.brand.primary }}
        />
        {renderModal(
          selectedImage !== null,
          selectedImage !== coverImage,
          setActiveImage,
          moveImageForward,
          moveImageBackward,
          setImageAsCoverImage,
          deleteImage
        )}
        <Content
          showsVerticalScrollIndicator={false}
          style={{ borderTopLeftRadius: 30, borderTopRightRadius: 30 }}
        >
          <Spacer position="bottom" size="medium" />
          <Spacer position="bottom" size="large" />
          <PaddedContainer style={{ flex: 1 }}>
            {renderHeader()}
            {gallery.length ? renderGallery() : renderGalleryEmpty()}
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
