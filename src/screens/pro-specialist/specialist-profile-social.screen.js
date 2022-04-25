import styled, { useTheme } from "styled-components/native";
import { connect } from "react-redux";

import { SafeArea } from "../../components/utils/safearea.component";
import React, { useState } from "react";
import { NavButton, TopNavContainer } from "./components/top-nav.component";
import { Dimensions, TouchableOpacity, View } from "react-native";
import {
  AntDesign,
  Entypo,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { SwitchInput } from "./components/switch-component";
import { Spacer } from "../../components/spacer/spacer.component";
import { renderConfirmModal } from "./components/modal.component";
import { Text } from "../../components/typography/typography.component";
import { FlatGrid } from "react-native-super-grid";
import { LinearGradient } from "expo-linear-gradient";
import {
  PaddedContainer,
  SectionTitle,
} from "../components/details-screen.component";
import { Switch } from "react-native-paper";

// import moment from "moment";
// import * as Progress from "react-native-progress";
import {
  EditServiceModal,
  ImageSelectionModal,
  ImageUploadModal,
  SearchRadiusModal,
} from "../../components/bottom-sheet/bottom-sheet.component";
import { rgba } from "polished";
import { IconButton } from "../../components/button/button.component";
import {
  ServiceCardGallery,
  ServiceCardGalleryInfoContainer,
  ServiceCardGalleryMoreButton,
} from "./components/service-gallery.component";
import Modal from "react-native-modal";
import {
  ModalCloseButton,
  ModalView,
  ModalViewPositioning,
} from "../pro-facility/components/pro-facility-form-helper";

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const HeaderSection = styled.View`
  align-items: center;
  padding: 32px 0;
  padding-bottom: 0;
`;

const ProfilePictureContainer = styled.View`
  position: relative;
  width: 118px;
  height: 118px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const ProfilePictureGradient = styled(LinearGradient)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 200px;
`;

const ProfilePicture = styled.ImageBackground`
  width: 110px;
  height: 110px;
  border-radius: 100px;
  overflow: hidden;
`;

const StatsRowContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const StatsRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const StatsItem = styled.View`
  justify-content: center;
  flex: 1;
  padding: 0px ${({ theme }) => theme.space[3]};
`;

const StatsRowSeparator = styled.View`
  height: 40%;
  width: 1px;
  background-color: ${({ theme }) => theme.colors.ui.border};
`;

const EditProfileButton = styled.TouchableOpacity`
  padding: 10px ${({ theme }) => theme.space[4]};
  background-color: white;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.colors.ui.border};
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const DistanceButton = styled.TouchableOpacity`
  padding: 10px ${({ theme }) => theme.space[3]};
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.brand.quaternary};
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const StoryButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 3;
  border-radius: 100px;
  background-color: white;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const QueueToggle = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.ui.quaternary};
`;

const SpecialistProfileSocialScreen = (props) => {
  const theme = useTheme();
  const [available, setAvailable] = useState(false);
  const [showAvailableConfirmation, setShowAvailableConfirmation] =
    useState(false);
  const [showUnavailableConfirmation, setShowUnavailableConfirmation] =
    useState(false);
  const [showImageUploadModal, setShowImageUploadModal] = useState(false);
  const [story, setStory] = useState([]);
  const [showRadiusModal, setShowRadiusModal] = useState(false);
  const [showEditServiceModal, setShowEditServiceModal] = useState(false);
  const [showServiceEditMenu, setShowServiceEditMenu] = useState(false);
  const [showNoStoryModal, setShowNoStoryModal] = useState(false);
  const [useQueue, setUseQueue] = useState(false);
  const [showQueueConfirmation, setShowQueueConfirmation] = useState(false);
  const [showStopQueueConfirmation, setShowStopQueueConfirmation] =
    useState(false);

  const name = "John doe";
  const about =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam feugiat justo ac tortor hendrerit.";
  const profilePicture =
    "https://media.istockphoto.com/photos/barber-shop-owner-wearing-protective-face-mask-and-cutting-customers-picture-id1297946321?b=1&k=20&m=1297946321&s=170667a&w=0&h=fyWRxzdghvvsuRnpE0C1gbwby5A1JQukbRFZxLz9XiM=";

  const [services, setServices] = useState([
    {
      name: "Dreadlocks",
      price: 10,
      image: {
        id: "image-1",
        uri: "https://barbersconcept.de/wp-content/uploads/2019/02/cropped-2_7edb7de0-1606-11e7-9302-f53e2e1f7cf7.jpg",
      },
    },
    {
      name: "Service 2",
      price: 20,
      image: {
        id: "image-2",
        uri: "https://media.gq-magazin.de/photos/5cf4d59293d170d22972ac8c/master/pass/Body&Care_BestBarber.jpg",
      },
    },
    {
      name: "Service 3",
      price: 25,
      image: {
        id: "image-3",
        uri: "https://cdn1.treatwell.net/images/view/v2.i1445489.w1080.h720.x303ACF8D/",
      },
    },
    {
      name: "Service 4",
      price: 15,

      image: {
        id: "image-4",
        uri: "https://cdn1.treatwell.net/images/view/v2.i1822163.w1080.h720.x8E70B900/",
      },
    },
    {
      name: "Service 5",
      price: 15.99,

      image: {
        id: "image-5",
        uri: "https://www.haller-barbershop.de/wp-content/uploads/2019/11/barbershop10-e1574483037534.jpg",
      },
    },
    {
      name: "Service 6",
      price: 8.99,
      image: {
        id: "image-6",
        uri: "https://www.haller-barbershop.de/wp-content/uploads/2019/11/barbershop10-e1574483037534.jpg",
      },
    },
  ]);

  const addImageToStory = (result) => {
    setStory((old) => [
      ...old,
      { ...result, id: `${old.length + 1}-image-story` },
    ]);
  };

  const renderTopNav = () => {
    return (
      <TopNavContainer
        active={true}
        style={{ backgroundColor: theme.colors.brand.muted, borderRadius: 0 }}
      >
        <View>
          <NavButton color="white" onPress={() => props.navigation.goBack()}>
            <Ionicons
              name="arrow-back"
              size={24}
              color={theme.colors.ui.primary}
            />
          </NavButton>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <SwitchInput
            value={available}
            trueAction={() => setShowAvailableConfirmation(true)}
            falseAction={() => setShowUnavailableConfirmation(true)}
          />
          <Spacer position="left" size="large" />
          <Spacer position="left" size="small" />
          <NavButton
            color="white"
            onPress={() => props.navigation.navigate("SpecialistMenu")}
          >
            <Feather name="menu" size={24} color={theme.colors.ui.primary} />
          </NavButton>
        </View>
      </TopNavContainer>
    );
  };
  const renderRating = () => {
    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text
          variant="caption"
          style={{
            fontSize: 24,
            color: theme.colors.brand.primary,
          }}
        >
          4.3
        </Text>
        <Spacer position="left" size="small" />
        <AntDesign name="star" size={20} color={theme.colors.brand.primary} />
      </View>
    );
  };

  const renderFav = () => {
    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text
          variant="caption"
          style={{
            fontSize: 24,
            color: "black",
          }}
        >
          120
        </Text>
        <Spacer position="left" size="small" />
        <AntDesign name="heart" size={20} color="black" />
      </View>
    );
  };

  const renderStatsRow = () => {
    return (
      <StatsRowContainer>
        <StatsRow>
          <StatsItem style={{ alignItems: "flex-end" }}>
            {renderRating()}
            <Spacer position="bottom" size="medium" />
            <Text
              style={{
                color: theme.colors.ui.primary,
                textDecorationLine: "underline",
                fontWeight: "bold",
                textDecorationColor: "white",
              }}
            >
              reviews (12k)
            </Text>
          </StatsItem>

          <StatsRowSeparator />
          <ProfilePictureContainer>
            {story.length > 0 && (
              <ProfilePictureGradient
                colors={[theme.colors.brand.secondary, "#753a88"]}
                start={[0, 1]}
                end={[1, 0]}
              />
            )}
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate("SpecialistStory", { story })
              }
              onLongPress={() =>
                available
                  ? setShowImageUploadModal(true)
                  : setShowNoStoryModal(true)
              }
            >
              <ProfilePicture source={{ uri: profilePicture }} />
            </TouchableOpacity>
            {story.length <= 0 && (
              <StoryButton
                onPress={() =>
                  available
                    ? setShowImageUploadModal(true)
                    : setShowNoStoryModal(true)
                }
              >
                <Ionicons
                  name="add-circle"
                  size={35}
                  color={theme.colors.brand.quaternary}
                />
              </StoryButton>
            )}
          </ProfilePictureContainer>
          <StatsRowSeparator />

          <StatsItem style={{ alignItems: "flex-start" }}>
            {renderFav()}
            <Spacer position="bottom" size="medium" />
            <TouchableOpacity
              onPress={() => null}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <Text
                style={{
                  color: theme.colors.ui.primary,
                  textDecorationLine: "underline",
                  fontWeight: "bold",
                  textDecorationColor: "white",
                }}
              >
                favorites
              </Text>
              <Spacer position="left" size="small" />
              <AntDesign name="arrowright" size={20} color="black" />
            </TouchableOpacity>
          </StatsItem>
          {/*<StatsRowSeparator />*/}
        </StatsRow>
      </StatsRowContainer>
    );
  };

  const renderQueueToggle = () => {
    return (
      <View>
        <QueueToggle>
          <View>
            <Text>Use queue</Text>
            <Spacer position="bottom" size="medium" />
            <Text variant="caption">Pile up services requests in queue</Text>
          </View>
          <Switch
            color={theme.colors.brand.secondary}
            value={useQueue}
            onValueChange={() =>
              useQueue
                ? setShowStopQueueConfirmation(true)
                : setShowQueueConfirmation(true)
            }
          />
        </QueueToggle>
        <Spacer position="bottom" size="large" />
      </View>
    );
  };

  const renderHeaderSection = () => {
    return (
      <PaddedContainer>
        <HeaderSection>
          <Text
            style={{
              fontSize: 24,
              color: theme.colors.ui.primary,
              fontWeight: "bold",
            }}
          >
            {name}
          </Text>
          <Spacer position="bottom" size="large" />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {/*<Spacer position="left" size="large" />*/}
            <View style={{ flex: 1 }}>{renderStatsRow()}</View>
          </View>
          <Spacer position="bottom" size="large" />
          <Text style={{ textAlign: "center", lineHeight: 22 }}>{about}</Text>
          <Spacer position="bottom" size="large" />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <EditProfileButton
              onPress={() => props.navigation.navigate("SpecialistEditProfile")}
            >
              <Text variant="caption" style={{ fontSize: 16 }}>
                Edit profile
              </Text>
            </EditProfileButton>
            <Spacer position="left" size="medium" />
            <DistanceButton onPress={() => setShowRadiusModal(true)}>
              <MaterialCommunityIcons
                name="radius-outline"
                size={20}
                color="white"
              />
              <Spacer position="left" size="small" />

              <Text variant="caption" style={{ fontSize: 16, color: "white" }}>
                3 km
              </Text>
            </DistanceButton>
          </View>
        </HeaderSection>
        <Spacer position="bottom" size="large" />
      </PaddedContainer>
    );
  };
  const renderBeforeGallery = () => {
    return (
      <>
        {renderHeaderSection()}
        {available && renderQueueToggle()}

        <PaddedContainer>
          <TouchableOpacity
            onPress={() => setShowServiceEditMenu((old) => !old)}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <SectionTitle style={{ lineHeight: 24 }}>Services</SectionTitle>
            <Spacer position="left" size="medium" />
            <Entypo name="edit" size={13} color="black" />
          </TouchableOpacity>
        </PaddedContainer>
        <Spacer position="top" size="large" />
      </>
    );
  };

  const renderAfterGallery = () => {
    return <Spacer position="top" size="large" />;
  };

  const renderGallery = () => {
    return (
      <FlatGrid
        ListHeaderComponent={renderBeforeGallery()}
        ListFooterComponent={renderAfterGallery()}
        itemDimension={(Dimensions.get("window").width - 32 - 2 * 3 * 2) / 3}
        data={services}
        spacing={1}
        renderItem={({ item, index }) => (
          <ServiceCardGallery source={item.image}>
            {showServiceEditMenu && (
              <ServiceCardGalleryMoreButton
                onPress={() => setShowEditServiceModal(true)}
              >
                <Feather name="more-horizontal" size={20} color="white" />
              </ServiceCardGalleryMoreButton>
            )}
            <ServiceCardGalleryInfoContainer>
              <Text variant="caption" style={{ color: "white", fontSize: 14 }}>
                {item.name}
              </Text>
              <Spacer position="bottom" size="medium" />
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingVertical: 2,
                    paddingHorizontal: 8,
                    borderRadius: 30,
                    backgroundColor: "white",
                  }}
                >
                  <MaterialIcons
                    name="attach-money"
                    size={16}
                    color={theme.colors.brand.quaternary}
                  />
                  <Spacer position="left" size="small" />
                  <Text
                    variant="caption"
                    style={{
                      color: theme.colors.brand.quaternary,
                      fontSize: 18,
                    }}
                  >
                    {item.price}
                  </Text>
                </View>
              </View>
            </ServiceCardGalleryInfoContainer>
          </ServiceCardGallery>
        )}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  const renderStoryModal = () => {
    return (
      <Modal isVisible={showNoStoryModal}>
        <ModalViewPositioning>
          <ModalView>
            <View>
              <Spacer position="top" size="small" />
              <Spacer position="left" size="small">
                <ModalCloseButton onPress={() => setShowNoStoryModal(false)}>
                  <Ionicons name="close" size={20} color="white" />
                </ModalCloseButton>
              </Spacer>
              <Spacer position="top" size="small" />
            </View>
            <Spacer position="top" size="large" />

            <PaddedContainer>
              <SectionTitle>Restricted </SectionTitle>
              <Spacer position="bottom" size="large" />
              <Text variant="caption" style={{ fontSize: 14 }}>
                You have to be online to post on story
              </Text>
              <Spacer position="bottom" size="large" />
            </PaddedContainer>
          </ModalView>
        </ModalViewPositioning>
      </Modal>
    );
  };

  return (
    <SafeArea>
      {renderTopNav()}
      {renderStoryModal()}
      {renderConfirmModal(
        showQueueConfirmation,
        setShowQueueConfirmation,
        "Start queue",
        "Make sure you are ready to get clients in the queue",
        () => setUseQueue(true)
      )}
      {renderConfirmModal(
        showStopQueueConfirmation,
        setShowStopQueueConfirmation,
        "Stop queue",
        "You will receive requests one at a time",
        () => setUseQueue(false)
      )}
      {renderConfirmModal(
        showAvailableConfirmation,
        setShowAvailableConfirmation,
        "Available",
        "Make sure you are ready to get clients and move to requested locations",
        () => setAvailable(true)
      )}
      {renderConfirmModal(
        showUnavailableConfirmation,
        setShowUnavailableConfirmation,
        "Unavailable",
        "You won't be visible in search results and will not receive any client",
        () => setAvailable(false)
      )}
      <Container showsVerticalScrollIndicator={false}>
        {renderGallery()}
      </Container>
      <ImageUploadModal
        showModal={showImageUploadModal}
        toggleShowModal={() => setShowImageUploadModal(false)}
        addImage={addImageToStory}
        noGallery={true}
        allowVideo={true}
      />
      <SearchRadiusModal
        showModal={showRadiusModal}
        toggleShowModal={() => setShowRadiusModal(false)}
      />
      <EditServiceModal
        showModal={showEditServiceModal}
        toggleShowModal={() => setShowEditServiceModal(false)}
      />

      {/*<ImageSelectionModal*/}
      {/*  showModal={showGalleryModal}*/}
      {/*  toggleShowModal={() => setShowGalleryModal(false)}*/}
      {/*  updateValue={() => null}*/}
      {/*/>*/}
    </SafeArea>
  );
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SpecialistProfileSocialScreen);
