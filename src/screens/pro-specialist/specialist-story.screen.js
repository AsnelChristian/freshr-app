import { connect } from "react-redux";
import styled, { useTheme } from "styled-components/native";

import { SafeArea } from "../../components/utils/safearea.component";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { useInterval } from "usehooks-ts";
import { rgba } from "polished";
import { AntDesign, Feather } from "@expo/vector-icons";
import { Spacer } from "../../components/spacer/spacer.component";
import { Text } from "../../components/typography/typography.component";
import {
  EditImageModal,
  ImageUploadModal,
} from "../../components/bottom-sheet/bottom-sheet.component";
import { Video } from "expo-av";

const Container = styled.View`
  flex: 1;
`;

const ImageContainer = styled.View`
  flex: 1;
  background-color: black;
  justify-content: center;
  align-items: center;
  position: relative;
`;
const StatusImage = styled.ImageBackground`
  width: 100%;
  aspect-ratio: 1;
  background-color: ${({ theme }) => theme.colors.ui.primary};
`;

const NavButton = styled.TouchableOpacity`
  height: 100%;
  flex: 1;
`;

const NavButtonContainer = styled.View`
  flex-direction: row;
`;

const ProgressBarContainer = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 16px;
`;

const ProgressBar = styled.View`
  flex: 1;
  height: 4px;
  border-radius: 20px;
  background-color: ${({ theme }) => rgba(theme.colors.ui.quaternary, 0.9)};
  margin: 4px;
`;

const ProgressBarIndicator = styled.View`
  background-color: ${({ theme, active }) =>
    active ? rgba(theme.colors.brand.quaternary, 0.6) : "transparent"};
  height: 100%;
  border-radius: 20px;
`;

const TopNavContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 8px;
  position: absolute;
  left: 0;
  right: 0;
  top: 10px;
  z-index: 3;
`;

const NavigationButton = styled.TouchableOpacity`
  height: 44px;
  width: 44px;
  border-radius: 44px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => rgba(theme.colors.ui.primary, 0.3)};
`;

const ProfilePicture = styled.Image`
  height: 44px;
  width: 44px;
  border-radius: 44px;
  overflow: hidden;
`;

const SpecialistStoryScreen = ({ route, ...restProps }) => {
  const { story } = route.params;
  const [activeIndex, setActiveIndex] = useState(0);
  const [gallery, setGallery] = useState([...story]);
  const [progress, setProgress] = useState(0);
  const [showImageUploadModal, setShowImageUploadModal] = useState(false);
  const [showEditImageModal, setShowEditImageModal] = useState(false);
  const [status, setStatus] = useState({});

  const profilePicture =
    "https://media.istockphoto.com/photos/barber-shop-owner-wearing-protective-face-mask-and-cutting-customers-picture-id1297946321?b=1&k=20&m=1297946321&s=170667a&w=0&h=fyWRxzdghvvsuRnpE0C1gbwby5A1JQukbRFZxLz9XiM=";
  const name = "John doe";

  useEffect(() => {
    if (gallery.length === 0) {
      restProps.navigation.goBack();
    }
  }, [gallery]);

  useInterval(() => {
    // custom hook created for interval
    if (progress >= 300) {
      setActiveIndex((prev) => (prev + 1) % gallery.length);
      setProgress(0);
    } else {
      setProgress((old) => old + 5);
    }
  }, 100);

  useEffect(() => {
    if (status && status.didJustFinish) {
      moveNext();
    }
  }, [status]);

  const addImageToStory = (result) => {
    setGallery((old) => [
      ...old,
      { ...result, id: `${old.length + 1}-image-story` },
    ]);
  };

  const moveNext = () => {
    setActiveIndex((prev) =>
      prev - 1 < 0 ? story.length - 1 : (prev - 1) % gallery.length
    );
    setProgress(0);
    setStatus({});
  };

  const moveBack = () => {
    setActiveIndex((prev) => (prev + 1) % gallery.length);
    setProgress(0);
    setStatus({});
  };

  return (
    <SafeArea style={{ backgroundColor: "black" }}>
      <Container>
        <TopNavContainer>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity onPress={() => setShowImageUploadModal(true)}>
              <ProfilePicture source={{ uri: profilePicture }} />
            </TouchableOpacity>
            <Spacer position="left" size="large" />
            <Text variant="caption" style={{ color: "white" }}>
              {name}
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <NavigationButton onPress={() => setShowEditImageModal(true)}>
              <Feather name="more-horizontal" size={24} color="white" />
            </NavigationButton>
            <Spacer position="left" size="medium" />
            <NavigationButton onPress={() => restProps.navigation.goBack()}>
              <AntDesign name="close" size={24} color="white" />
            </NavigationButton>
          </View>
        </TopNavContainer>
        <ImageContainer>
          <ProgressBarContainer>
            {gallery.map((image, index) => (
              <ProgressBar key={`${index}-progress`}>
                <ProgressBarIndicator active={index === activeIndex} />
              </ProgressBar>
            ))}
          </ProgressBarContainer>
          <NavButtonContainer>
            <NavButton onPress={moveNext} />
            <NavButton onPress={moveBack} />
          </NavButtonContainer>
          {gallery[activeIndex] && gallery[activeIndex].type === "video" ? (
            <Video
              style={{
                width: "100%",
                aspectRatio: 1,
                height: 400,
                backgroundColor: "red",
              }}
              resizeMode={Video.RESIZE_MODE_COVER}
              shouldPlay={true}
              isLooping={false}
              usePoster
              rate={1.0}
              volume={1.0}
              isMuted={false}
              source={gallery[activeIndex]}
              autoplay={true}
              onPlaybackStatusUpdate={(status) => setStatus(() => status)}
            />
          ) : (
            <StatusImage source={gallery[activeIndex]} />
          )}
        </ImageContainer>
      </Container>
      <ImageUploadModal
        showModal={showImageUploadModal}
        toggleShowModal={() => setShowImageUploadModal(false)}
        addImage={addImageToStory}
        noGallery={true}
        allowVideo={true}
      />
      <EditImageModal
        showModal={showEditImageModal}
        toggleShowModal={() => setShowEditImageModal(false)}
      />
    </SafeArea>
  );
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SpecialistStoryScreen);
