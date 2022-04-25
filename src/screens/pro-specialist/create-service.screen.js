import styled, { useTheme } from "styled-components/native";
import { connect } from "react-redux";
import { SafeArea } from "../../components/utils/safearea.component";
import { NavButton, TopNavContainer } from "./components/top-nav.component";
import { TouchableOpacity, View } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Spacer } from "../../components/spacer/spacer.component";
import { Text } from "../../components/typography/typography.component";
import React, { useState } from "react";
import {
  PaddedContainer,
  SectionTitle,
} from "../components/details-screen.component";
import { ImageUploadModal } from "../../components/bottom-sheet/bottom-sheet.component";
import { rgba } from "polished";
import DropDownPicker from "react-native-dropdown-picker";
import CurrencyInput from "react-native-currency-input/src/CurrencyInput";
import { TextInput } from "react-native-paper";
import {
  ActionButton,
  ButtonContainer,
} from "../../components/button/process-action-button.component";
import { LinearGradient } from "expo-linear-gradient";

const Container = styled.ScrollView``;

const CoverImage = styled.ImageBackground`
  height: 250px;
  border-radius: 10px;
  overflow: hidden;
  width: 100%;
  background-color: black;
  position: relative;
`;

const CoverImageIndicator = styled.View`
  position: absolute;
  flex-direction: row;
  align-items: center;
  border-radius: 8px;
  padding: 8px;
  background-color: white;
  top: 5px;
  left: 5px;
`;

const ServiceItemIcon = styled.Image`
  height: 40px;
  width: 40px;
  border-radius: 5px;
  overflow: hidden;
`;

const Gradient = styled(LinearGradient)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const DescriptionInput = styled(TextInput).attrs((props) => ({
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
  height: 120px;
  font-size: 14px;
`;

const CreateServiceScreen = (props) => {
  const { isEdit = false } = props.route.params;
  const theme = useTheme();
  const mockImage =
    "https://i.pinimg.com/originals/83/1b/5d/831b5dfdc5a785b1603054452698d5a8.jpg";
  const [showImageUploadModal, setShowImageUploadModal] = useState(false);
  const [coverImage, setCoverImage] = useState({
    uri: mockImage,
  });
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [price, setPrice] = React.useState(23.5); // can also be null
  const [serviceDescription, setServiceDescription] = useState("");

  const renderServiceIcon = (icon) => {
    return <ServiceItemIcon source={{ uri: icon }} />;
  };

  const [items, setItems] = useState([
    {
      label: "Dreadlocks",
      value: "dreadlocks",
      icon: () => renderServiceIcon(mockImage),
    },
    {
      label: "Clean shave",
      value: "clean shave",
      icon: () => renderServiceIcon(mockImage),
    },
  ]);

  const renderSelectService = () => {
    return (
      <PaddedContainer>
        <Spacer position="top" size="large" />
        <Spacer position="top" size="large" />
        <DropDownPicker
          searchPlaceholder="search service"
          placeholder="Select service"
          listItemContainer={{
            height: 60,
          }}
          listItemContainerStyle={{
            height: 60,
          }}
          searchable={true}
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
        />
      </PaddedContainer>
    );
  };

  const renderPriceInput = () => {
    return (
      <PaddedContainer style={{ position: "relative", alignItems: "center" }}>
        <Gradient
          colors={[theme.colors.brand.primary, theme.colors.brand.quaternary]}
          start={[0, 1]}
          end={[1, 0]}
        />
        <Spacer position="bottom" size="large" />
        <SectionTitle style={{ color: "white" }}>Price</SectionTitle>
        <Spacer position="bottom" size="large" />

        <CurrencyInput
          value={price}
          onChangeValue={setPrice}
          style={{
            fontSize: 35,
            fontWeight: "bold",
            textAlign: "center",
            color: "white",
          }}
          prefix="$"
          delimiter=","
          separator="."
          precision={1}
          onChangeText={(formattedValue) => {
            console.log(formattedValue); // $2,310.46
          }}
        />
        <Spacer position="bottom" size="large" />
      </PaddedContainer>
    );
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
          <Text style={{ fontWeight: "bold", fontSize: 22 }}>
            {isEdit ? "Edit service" : "Create service"}
          </Text>
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

  const replaceCoverImage = (result) => setCoverImage(result);

  const renderForm = () => {
    return (
      <View style={{ flex: 1 }}>
        <Spacer position="top" size="large" />

        <PaddedContainer style={{ flex: 1 }}>
          <CoverImage source={coverImage} resizeMode="contain">
            <TouchableOpacity
              style={{ width: "100%", height: "100%" }}
              onPress={() => setShowImageUploadModal(true)}
            />
            <CoverImageIndicator
              style={{ backgroundColor: rgba("white", 0.9) }}
            >
              <Text>Change image</Text>
            </CoverImageIndicator>
          </CoverImage>
        </PaddedContainer>
      </View>
    );
  };

  const renderFinishButton = () => {
    return (
      <ButtonContainer
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.34,
          shadowRadius: 6.27,
          elevation: 10,
        }}
      >
        <ActionButton height={55} onPress={() => null}>
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
            {isEdit ? "Complete edit" : "Create service"}
          </Text>
        </ActionButton>
      </ButtonContainer>
    );
  };

  const renderDeleteButton = () => {
    return (
      <TouchableOpacity style={{ backgroundColor: theme.colors.ui.quaternary }}>
        <Spacer position="top" size="large" />
        <PaddedContainer
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AntDesign name="close" size={20} color={theme.colors.ui.primary} />
          <Spacer position="left" size="large" />
          <Text variant="caption" style={{ fontSize: 14 }}>
            delete service
          </Text>
        </PaddedContainer>
        <Spacer position="top" size="large" />
      </TouchableOpacity>
    );
  };
  return (
    <SafeArea>
      {renderTopNav()}
      <Container>
        {!isEdit && renderSelectService()}
        <Spacer position="bottom" size="large" />

        {renderPriceInput()}
        <Spacer position="top" size="large" />

        <PaddedContainer>
          <DescriptionInput
            label="Service's description"
            value={serviceDescription}
            onChangeText={(text) => {
              setServiceDescription(text);
            }}
          />
        </PaddedContainer>
        <Spacer position="top" size="large" />
        {renderForm()}
        <ImageUploadModal
          showModal={showImageUploadModal}
          toggleShowModal={() => setShowImageUploadModal(false)}
          addImage={replaceCoverImage}
          noGallery={false}
        />
        <Spacer position="bottom" size="large" />
        {isEdit && renderDeleteButton()}
      </Container>
      {renderFinishButton()}
    </SafeArea>
  );
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateServiceScreen);
