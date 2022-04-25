import styled, { useTheme } from "styled-components/native";
import { SafeArea } from "../../components/utils/safearea.component";
import { connect } from "react-redux";
import { Spacer } from "../../components/spacer/spacer.component";
import { Text } from "../../components/typography/typography.component";
import { NavButton, TopNavContainer } from "./components/top-nav.component";
import { Dimensions, View } from "react-native";
import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import React, { useState } from "react";
import { TextInput } from "react-native-paper";
import {
  PaddedContainer,
  SectionTitle,
} from "../components/details-screen.component";
import { Row } from "../../components/helpers/helpers.component";
import Rheostat from "react-native-rheostat";
import MapView, { Circle } from "react-native-maps";
import mapStyles from "../components/mapStyles.json";
import { rgba } from "polished";
import { MapMarker } from "../components/map-marker.component";
import {
  EditServiceModal,
  ImageUploadModal,
} from "../../components/bottom-sheet/bottom-sheet.component";
import { FlatGrid } from "react-native-super-grid";
import {
  ServiceCardGallery,
  ServiceCardGalleryInfoContainer,
  ServiceCardGalleryMoreButton,
} from "./components/service-gallery.component";

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const HeaderSection = styled.View`
  align-items: center;
  padding: 32px 0;
`;

const ProfilePicture = styled.ImageBackground`
  width: 120px;
  height: 120px;
  overflow: hidden;
  border-radius: 100px;
`;

const ProfilePictureContainer = styled.TouchableOpacity`
  align-items: center;
`;

export const FormInput = styled(TextInput).attrs((props) => ({
  mode: "outlined",
  color: props.theme.colors.ui.primary,
  numberOfLines: 1,
  textAlign: { undefined },
  theme: {
    colors: {
      primary: props.theme.colors.ui.primary,
      text: props.theme.colors.ui.primary,
    },
  },
}))`
  width: 100%;
  font-size: 14px;
  background-color: white;
  height: 50px;
  font-weight: bold;
`;

export const LengthIndicator = styled.View`
  position: absolute;
  top: -12px;
  right: 0px;
`;

const MapLocationContainer = styled.View`
  height: 300px;
  border-radius: 15px;
  overflow: hidden;
`;

const MapLocation = styled(MapView)`
  height: 100%;
  border-radius: 30px;
  overflow: hidden;
`;

const EditProfileScreen = (props) => {
  const theme = useTheme();
  const [currentRadius, setCurrentRadius] = useState([3]);
  const [showImageUploadModal, setShowImageUploadModal] = useState(false);
  const [showEditServiceModal, setShowEditServiceModal] = useState(false);

  const [profilePicture, setProfilePicture] = useState({
    uri: "https://media.istockphoto.com/photos/barber-shop-owner-wearing-protective-face-mask-and-cutting-customers-picture-id1297946321?b=1&k=20&m=1297946321&s=170667a&w=0&h=fyWRxzdghvvsuRnpE0C1gbwby5A1JQukbRFZxLz9XiM=",
  });
  // const [name, setName] = useState("John doe");
  // const [nameInputLength, setNameInputLength] = useState(name.length);
  // const [showNameInputLength, setShowNameInputLength] = useState(false);
  const [bio, setBio] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam feugiat justo ac tortor hendrerit."
  );
  const [bioInputLength, setBioInputLength] = useState(bio.length);
  const [showBioInputLength, setShowBioInputLength] = useState(false);
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

  const onRheostatValUpdated = (payload) => {
    setCurrentRadius(payload.values);
  };

  const replaceProfile = (result) => {
    setProfilePicture(result);
  };

  const renderTopNav = () => {
    return (
      <TopNavContainer
        active={true}
        style={{ backgroundColor: theme.colors.brand.muted, borderRadius: 0 }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <NavButton color="white" onPress={() => props.navigation.goBack()}>
            <AntDesign name="close" size={24} color={theme.colors.ui.primary} />
          </NavButton>
          <Spacer position="left" size="large" />
          <Text style={{ fontWeight: "bold", fontSize: 22 }}>Edit profile</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <NavButton color="white">
            <Ionicons
              name="checkmark"
              size={30}
              color={theme.colors.ui.primary}
            />
          </NavButton>
        </View>
      </TopNavContainer>
    );
  };

  const renderForm = () => {
    return (
      <View>
        {/*<View style={{ position: "relative" }}>*/}
        {/*  <FormInput*/}
        {/*    value={name}*/}
        {/*    label="User name"*/}
        {/*    onChangeText={(text) => {*/}
        {/*      setName(text);*/}
        {/*      setNameInputLength(text.length);*/}
        {/*    }}*/}
        {/*    onFocus={() => setShowNameInputLength(!showNameInputLength)}*/}
        {/*  />*/}
        {/*  <LengthIndicator>*/}
        {/*    {showNameInputLength && (*/}
        {/*      <Text style={{ fontSize: 14, color: "gray" }}>*/}
        {/*        {nameInputLength} / 50*/}
        {/*      </Text>*/}
        {/*    )}*/}
        {/*  </LengthIndicator>*/}
        {/*</View>*/}
        {/*<Spacer position="bottom" size="large" />*/}
        <View style={{ position: "relative" }}>
          <FormInput
            value={bio}
            label="Bio"
            numberOfLines={5}
            onChangeText={(text) => {
              setBio(text);
              setBioInputLength(text.length);
            }}
            onFocus={() => setShowBioInputLength(!showBioInputLength)}
          />
          <LengthIndicator>
            {showBioInputLength && (
              <Text style={{ fontSize: 14, color: "gray" }}>
                {bioInputLength} / 280
              </Text>
            )}
          </LengthIndicator>
        </View>
      </View>
    );
  };

  const renderRadiusSlider = () => {
    return (
      <View>
        {currentRadius && (
          <View style={{ flexDirection: "row" }}>
            <MaterialCommunityIcons
              name="map-marker-distance"
              size={16}
              color="black"
            />
            <Spacer position="left" size="medium" />
            <Text
              variant="caption"
              style={{ fontSize: 16, fontWeight: "bold" }}
            >
              Distance {currentRadius[0]} km
            </Text>
          </View>
        )}
        <Rheostat
          values={currentRadius}
          min={1}
          max={7}
          onValuesUpdated={onRheostatValUpdated}
          theme={{
            rheostat: { themeColor: "gray", grey: "#fafafa" },
          }}
        />
        <Spacer position="bottom" size="small" />
      </View>
    );
  };
  const renderMap = () => {
    return (
      <MapLocationContainer>
        <MapLocation
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          customMapStyle={mapStyles}
        >
          <Circle
            center={{
              latitude: 37.78825,
              longitude: -122.4324,
            }}
            radius={currentRadius * 1000}
            strokeColor={theme.colors.brand.quaternary}
            fillColor={rgba(theme.colors.brand.quaternary, 0.4)}
          />
          <MapMarker
            coordinate={{
              latitude: 37.78825,
              longitude: -122.4324,
            }}
            isSelected={true}
            onPress={() => null}
          />
        </MapLocation>
      </MapLocationContainer>
    );
  };

  const renderBeforeGallery = () => {
    return (
      <>
        {renderHeaderSection()}
        <Spacer position="bottom" size="large" />
        <PaddedContainer>
          {renderForm()}
          <Spacer position="bottom" size="large" />
          <Spacer position="bottom" size="large" />
          {renderRadiusSlider()}
          <Spacer position="bottom" size="large" />
          {renderMap()}
          <Spacer position="top" size="large" />
          <Spacer position="top" size="large" />
          <Spacer position="top" size="medium" />
          <View
            // onPress={() => setShowGalleryModal(true)}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <SectionTitle style={{ lineHeight: 24 }}>
              Edit services
            </SectionTitle>
            <Spacer position="left" size="medium" />
            {/*<Entypo name="edit" size={13} color="black" />*/}
          </View>
          <Spacer position="top" size="large" />
        </PaddedContainer>
      </>
    );
  };

  const renderAfterGallery = () => {
    return (
      <>
        <Spacer position="bottom" size="large" />
        <Spacer position="top" size="large" />
        <Spacer position="bottom" size="large" />
      </>
    );
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
            <ServiceCardGalleryMoreButton
              onPress={() => setShowEditServiceModal(true)}
            >
              <Feather name="more-horizontal" size={20} color="white" />
            </ServiceCardGalleryMoreButton>
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

  const renderHeaderSection = () => {
    return (
      <HeaderSection>
        <ProfilePictureContainer onPress={() => setShowImageUploadModal(true)}>
          <ProfilePicture source={profilePicture} />
          <Spacer position="bottom" size="small" />
          <Text variant="caption">Change profile picture</Text>
        </ProfilePictureContainer>
      </HeaderSection>
    );
  };

  return (
    <SafeArea>
      {renderTopNav()}
      <Container>{renderGallery()}</Container>
      <ImageUploadModal
        showModal={showImageUploadModal}
        toggleShowModal={() => setShowImageUploadModal(false)}
        addImage={replaceProfile}
      />
      <EditServiceModal
        showModal={showEditServiceModal}
        toggleShowModal={() => setShowEditServiceModal(false)}
      />
    </SafeArea>
  );
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileScreen);
