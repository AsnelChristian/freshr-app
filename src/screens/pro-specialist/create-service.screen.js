import styled, { useTheme } from "styled-components/native";
import { connect } from "react-redux";
import { SafeArea } from "../../components/utils/safearea.component";
import { NavButton, TopNavContainer } from "./components/top-nav.component";
import { FlatList, TouchableOpacity, View } from "react-native";
import { AntDesign, Fontisto, Ionicons } from "@expo/vector-icons";
import { Spacer } from "../../components/spacer/spacer.component";
import { Text } from "../../components/typography/typography.component";
import React, { useContext, useEffect, useState } from "react";
import {
  PaddedContainer,
  SectionTitle,
} from "../components/details-screen.component";
import { rgba } from "polished";
import DropDownPicker from "react-native-dropdown-picker";
import CurrencyInput from "react-native-currency-input/src/CurrencyInput";
import { TextInput } from "react-native-paper";
import {
  ActionButton,
  ButtonContainer,
} from "../../components/button/process-action-button.component";
import { LinearGradient } from "expo-linear-gradient";
import { LongSelectButton, SelectButton } from "../onboarding/set-gender-screen";
import { AppContext } from "../../providers/app-provider";
import { LoadingScreen } from "../loading.screen";
import { ImageUploadModal } from "../../components/bottom-sheet/ImageUploadModal";
import { renderConfirmModal } from "./components/modal.component";

const Container = styled.FlatList``;

const CoverImage = styled.ImageBackground`
  height: 200px;
  border-radius: 0;
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
  height: 100px;
  font-size: 14px;
`;

const CreateServiceScreen = (props) => {
  const { isEdit = false } = props.route.params;
  const theme = useTheme();
  const {onCreateService,  loading, error} = useContext(AppContext)
  const mockImage =
    "https://i.pinimg.com/originals/83/1b/5d/831b5dfdc5a785b1603054452698d5a8.jpg";

  const choices = [
    {
      value: "none",
      title: "No preference",
      description: "Search styles for all genders",
    },
    {
      value: "male",
      title: "Styles for male",
    },
    {
      value: "female",
      title: "Styles for female",
    },
  ];
  const [showImageUploadModal, setShowImageUploadModal] = useState(false);
  const [coverImage, setCoverImage] = useState({
    uri: mockImage,
  });
  const [open, setOpen] = useState(false);
  const [gender, setGender] = useState(choices[0].value)
  const [value, setValue] = useState(null);
  const [price, setPrice] = React.useState(23.5); // can also be null
  const [serviceDescription, setServiceDescription] = useState("");
  const [isFormCompleted, setIsFormCompleted] = useState(false);
  const [showCreateServiceModal, setShowCreateServiceModal] = useState(false);
  const [service, setService] = useState(null);

  const renderServiceIcon = (icon) => {
    return <ServiceItemIcon source={{ uri: icon }} />;
  };

  const verifyForm = () => {
    return !!value && serviceDescription;
  }

  useEffect(() => {
    setIsFormCompleted(verifyForm())
  }, [value, serviceDescription])

  useEffect(() => {
    if (service) {
      props.navigation.navigate('SpecialistServiceDetails', {id: service.id})
    }
  }, [service])


  const [items, setItems] = useState(props.serviceTypes.map(service => ({label: service.name, value: service.id, id: service.id, icon: () => renderServiceIcon(service.photo)})));

  const renderSelectService = () => {
    return (
      <View>
        <Spacer position="top" size="large" />
        <Spacer position="top" size="large" />
        <DropDownPicker
          listMode="MODAL"
          searchPlaceholder="search service"
          placeholder="Select service"
          listItemContainer={{
            height: 60,
          }}
          dropDownContainerStyle={{
            height: 600
          }}
          listItemContainerStyle={{
            height: 60,
          }}
          searchable={true}
          open={open}
          value={value}
          style={{
            height: 70,
            borderColor: 'transparent',
            backgroundColor: !value ? "white" : theme.colors.brand.secondary,
            color: "white"
          }}
          label ={{
            color: "white"
          }}
          listItemLabel={{
            color: !value ? theme.colors.brand.quaternary : 'white',
          }}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
        />
      </View>
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

        <View style={{ flex: 1 }}>
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
        </View>
      </View>
    );
  };

  const renderFinishButton = () => {
    return (
      <ButtonContainer
        style={theme.shadows.default}
      >
        <ActionButton
          height={55}
          disabled={!isFormCompleted}
          onPress={() => {
            setShowCreateServiceModal(true);
          }}>
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

  const renderSelectGender = () => {
    return (
      <PaddedContainer>
        <LongSelectButton
          active={gender === choices[0].value}
          onPress={() => setGender(choices[0].value)}
        >
          <Text
            variant="caption"
            style={{
              fontSize: 16,
              color:
                gender !== choices[0].value
                  ? theme.colors.brand.quaternary
                  : "white",
            }}
          >
            {choices[0].title}
          </Text>
          <Spacer position="bottom" size="large" />
          <Text
            variant="caption"
            style={{
              fontSize: 12,
              color:
                gender !== "none" ? theme.colors.brand.quaternary : "white",
            }}
          >
            {choices[0].description}
          </Text>
        </LongSelectButton>
        <Spacer position="bottom" size="large" />

        <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "space-between"}}>
          <SelectButton
            active={gender === choices[1].value}
            onPress={() => setGender(choices[1].value)}
          >
            <Fontisto
              name={choices[1].value}
              size={80}
              color={
                gender !== choices[1].value
                  ? theme.colors.brand.quaternary
                  : "white"
              }
            />
            <Spacer position="bottom" size="large" />
            <Text
              variant="caption"
              style={{
                fontSize: 14,
                color:
                  gender !== choices[1].value
                    ? theme.colors.brand.quaternary
                    : "white",
              }}
            >
              {choices[1].title}
            </Text>
          </SelectButton>
          <Spacer position="right" size="large" />
          <SelectButton
            active={gender === choices[2].value}
            onPress={() => setGender(choices[2].value)}
          >
            <Fontisto
              name="female"
              size={80}
              color={
                gender !== choices[2].value
                  ? theme.colors.brand.quaternary
                  : "white"
              }
            />
            <Spacer position="bottom" size="large" />
            <Text
              variant="caption"
              style={{
                fontSize: 14,
                color:
                  gender !== "female"
                    ? theme.colors.brand.quaternary
                    : "white",
              }}
            >
              {choices[2].title}
            </Text>
          </SelectButton>
        </View>
      </PaddedContainer>
    )
  }

  const renderFlatListHeader = () => {
    return (<>
      {!isEdit && renderSelectService()}

      {renderPriceInput()}
      <Spacer position="top" size="large" />


      {renderForm()}
      <Spacer position="bottom" size="large" />
      <PaddedContainer>
        <DescriptionInput
          label="Service's description"
          value={serviceDescription}
          style={{
            borderColor: 'transparent',
            backgroundColor: 'white'
          }}
          onChangeText={(text) => {
            setServiceDescription(text);
          }}
        />
      </PaddedContainer>
      <Spacer position="bottom" size="large" />
      <Spacer position="top" size="large" />
      <PaddedContainer>
        <Text variant="caption" style={{fontSize: 16}}>Select taget gender</Text>
      </PaddedContainer>
      <Spacer position="bottom" size="large" />
      {renderSelectGender()}
      <Spacer position="bottom" size="large" />
      <Spacer position="bottom" size="large" />
      <Spacer position="bottom" size="large" />
      <Spacer position="bottom" size="large" />
      <ImageUploadModal
        showModal={showImageUploadModal}
        toggleShowModal={() => setShowImageUploadModal(false)}
        addImage={replaceCoverImage}
        noGallery={false}
      />
      <Spacer position="bottom" size="large" />
      {isEdit && renderDeleteButton()}
    </>)
  }

  if (loading) {
    return <LoadingScreen/>
  }

  return (
    <SafeArea>
      {renderTopNav()}
      {renderConfirmModal(
        showCreateServiceModal,
        setShowCreateServiceModal,
        "Create service",
        "Creating a service will reduce your total number of possible service.",
        () => {
          const data = {
            serviceType: value,
            forMale: gender === 'male' || gender === 'none',
            forFemale: gender === 'female' || gender === 'none',
            price: price
          }
          onCreateService(data).then(res => setService(res));
        }
      )}
      <Container
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={renderFlatListHeader()}
        data={[]}
        renderItem={() => null}>
      </Container>
      {renderFinishButton()}
    </SafeArea>
  );
};

const mapStateToProps = (state) => ({
  serviceTypes: state.services.serviceTypes,
});
const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateServiceScreen);
