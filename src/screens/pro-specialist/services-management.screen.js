import { connect } from "react-redux";
import styled, { useTheme } from "styled-components/native";
import { SafeArea } from "../../components/utils/safearea.component";
import { NavButton, TopNavContainer } from "./components/top-nav.component";
import { Dimensions, View } from "react-native";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  HeaderContainer,
  PaddedContainer,
  SectionTitle,
} from "../components/details-screen.component";
import { Spacer } from "../../components/spacer/spacer.component";
import { Text } from "../../components/typography/typography.component";
import { rgba } from "polished";
import { FlatGrid } from "react-native-super-grid";
import { facilitiesMock } from "../../mocks/facilities-mock";
import ServiceCard from "../components/service-card.component";
import { renderConfirmModal } from "./components/modal.component";
import { SwitchInput } from "./components/switch-component";
import { toggleBottomNavBackground } from "./utils";

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const AddServiceButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.ui.quaternary};
  border-radius: 5px;
  border: 1px solid ${({ theme }) => rgba(theme.colors.ui.border, 0.3)};
  align-items: center;
  padding: ${({ theme }) => theme.space[3]};
`;

const ServicesManagementScreen = (props) => {
  const theme = useTheme();
  const [services, setServices] = useState([]);
  const [available, setAvailable] = useState(false);
  const [showAvailableConfirmation, setShowAvailableConfirmation] =
    useState(false);
  const [showUnavailableConfirmation, setShowUnavailableConfirmation] =
    useState(false);

  useEffect(() => {
    toggleBottomNavBackground(available, props.navigation, theme);
  }, [available]);

  useEffect(() => {
    const servicesMock = facilitiesMock[0].professionals[0].services;
    setServices(servicesMock);
  }, []);

  const renderTopNav = () => {
    return (
      <TopNavContainer
        active={true}
        style={{ backgroundColor: theme.colors.brand.muted, borderRadius: 0 }}
      >
        <View>
          <NavButton color="white" onPress={() => props.navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="black" />
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
  const renderHeader = () => {
    return (
      <HeaderContainer>
        <Spacer position="top" size="large" />
        <SectionTitle>Your services</SectionTitle>
      </HeaderContainer>
    );
  };

  const renderAddServiceButton = () => {
    return (
      <AddServiceButton
        onPress={() =>
          props.navigation.navigate("SpecialistCreateService", {
            isEdit: false,
          })
        }
      >
        <Ionicons
          name="md-add-circle-outline"
          size={24}
          color={theme.colors.ui.border}
        />
        <Spacer position="bottom" size="medium" />
        <Text
          variant="caption"
          style={{
            color: theme.colors.ui.border,
            textTransform: "uppercase",
            letterSpacing: 1,
          }}
        >
          service
        </Text>
      </AddServiceButton>
    );
  };

  const renderServices = () => {
    return (
      <PaddedContainer style={{ flex: 1 }}>
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            press={() => props.navigation.navigate("SpecialistServiceDetails")}
            info={true}
            style={{ marginBottom: 8 }}
          />
        ))}
      </PaddedContainer>
    );
  };

  const renderAddServiceButtons = () => {
    return (
      <FlatGrid
        data={[1, 2, 3]}
        spacing={10}
        renderItem={({ item, index }) => renderAddServiceButton()}
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  return (
    <SafeArea>
      {renderTopNav()}
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
      <Container>
        {renderHeader()}
        <Spacer position="top" size="large" />
        {renderServices()}
        <Spacer position="top" size="large" />
        <Spacer position="top" size="large" />
        <PaddedContainer>
          <SectionTitle>Add more services</SectionTitle>
          <Spacer position="top" size="medium" />
          <Text variant="caption">
            You can add 3 more services based on your subscription
          </Text>
          <Spacer position="top" size="large" />
        </PaddedContainer>
        <PaddedContainer style={{ flex: 1 }}>
          {renderAddServiceButtons()}
        </PaddedContainer>
      </Container>
    </SafeArea>
  );
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServicesManagementScreen);
