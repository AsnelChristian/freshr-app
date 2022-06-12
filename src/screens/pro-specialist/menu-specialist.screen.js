import styled, { useTheme } from "styled-components/native";
import { connect } from "react-redux";
import { SafeArea } from "../../components/utils/safearea.component";
import {
  HeaderContainer,
  PaddedContainer,
  PageTitle,
  SectionTitle,
} from "../components/details-screen.component";
import { Spacer } from "../../components/spacer/spacer.component";
import { View } from "react-native";
import {
  LogoutButton,
  ProfileButton,
} from "../components/profile.helper.component";
import {
  AntDesign,
  Entypo,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Separator } from "../../components/helpers/helpers.component";
import { Text } from "../../components/typography/typography.component";
import { NavButton, TopNavContainer } from "./components/top-nav.component";
import React, { useContext, useEffect, useState } from "react";
import { renderConfirmModal } from "./components/modal.component";
import { SwitchInput } from "./components/switch-component";
import { toggleBottomNavBackground } from "./utils";
import { AppContext } from "../../providers/app-provider";

const Container = styled.ScrollView`
  flex: 1;
  background-color: white;
`;

const MenuSpecialistScreen = (props) => {
  const theme = useTheme();

  const {changeApp} = useContext(AppContext)
  const [available, setAvailable] = useState(false);
  const [showAvailableConfirmation, setShowAvailableConfirmation] =
    useState(false);
  const [showUnavailableConfirmation, setShowUnavailableConfirmation] =
    useState(false);

  useEffect(() => {
    toggleBottomNavBackground(available, props.navigation, theme);
  }, [available]);

  const renderHeader = () => {
    return (
      <HeaderContainer>
        <Spacer position="top" size="large" />
        <PageTitle>Menu</PageTitle>
      </HeaderContainer>
    );
  };
  const renderButtons = () => {
    return (
      <>
        <View>
          <ProfileButton
            icon={
              <MaterialCommunityIcons
                name="account-circle-outline"
                size={28}
                color={theme.colors.ui.primary}
              />
            }
            label="Personal information"
          />
          <ProfileButton
            icon={
              <MaterialIcons
                name="payments"
                size={28}
                color={theme.colors.ui.primary}
              />
            }
            label="Payment methods"
          />
          <ProfileButton
            icon={
              <MaterialIcons
                name="payments"
                size={28}
                color={theme.colors.ui.primary}
              />
            }
            label="Subscription plan"
          />
          <Separator />
        </View>
        <Spacer position="bottom" size="large" />
        <Spacer position="bottom" size="medium" />
        <SectionTitle variant="label">Accounts</SectionTitle>
        <Spacer position="bottom" size="large" />
        <View>
          <ProfileButton
            icon={
              <AntDesign
                name="swap"
                size={28}
                color={theme.colors.ui.primary}
              />
            }
            onPress={() =>
              changeApp('normal')
              // props.navigation.reset({
              //   index: 0,
              //   routes: [{ name: "app" }],
              // })
            }
            label="Switch to customer's account"
          />
          <ProfileButton
            icon={
              <AntDesign
                name="swap"
                size={28}
                color={theme.colors.ui.primary}
              />
            }
            onPress={() =>
              changeApp('host')
              // props.navigation.reset({
              //   index: 0,
              //   routes: [{ name: "proAppFacility" }],
              // })
            }
            label="Switch host account"
          />
          <Separator />
        </View>
        <Spacer position="bottom" size="large" />
        <Spacer position="bottom" size="medium" />
        <SectionTitle variant="label">Legal</SectionTitle>
        <Spacer position="bottom" size="large" />
        <View>
          <ProfileButton
            icon={
              <MaterialIcons
                name="chrome-reader-mode"
                size={28}
                color={theme.colors.ui.primary}
              />
            }
            label="Terms of service"
          />
          <Separator />
        </View>
        <Spacer position="bottom" size="large" />
        <Spacer position="bottom" size="medium" />
        <SectionTitle variant="label">Info</SectionTitle>
        <Spacer position="bottom" size="large" />
        <View>
          <ProfileButton
            icon={
              <Feather
                name="help-circle"
                size={24}
                color={theme.colors.ui.primary}
              />
            }
            label="Help"
          />
          <ProfileButton
            icon={
              <Entypo name="list" size={28} color={theme.colors.ui.primary} />
            }
            label="FAQ"
          />
          <Separator />
        </View>
        <Spacer position="bottom" size="large" />
        <Spacer position="bottom" size="large" />
        <LogoutButton>
          <Ionicons
            name="log-out-sharp"
            size={28}
            color={theme.colors.ui.primary}
          />
          <Spacer position="left" size="medium" />
          <Text variant="label" style={{ fontSize: 14, fontWeight: "bold" }}>
            Log out
          </Text>
        </LogoutButton>
        <Spacer position="bottom" size="large" />
      </>
    );
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
        <View style={{ flexDirection: "row" }}>
          <SwitchInput
            value={available}
            trueAction={() => setShowAvailableConfirmation(true)}
            falseAction={() => setShowUnavailableConfirmation(true)}
          />
          {/*<NavButton color="white">*/}
          {/*  <MaterialIcons name="event-available" size={24} color={theme.colors.ui.primary />*/}
          {/*</NavButton>*/}
          <Spacer position="left" size="medium" />
        </View>
      </TopNavContainer>
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
      <Container showsVerticalScrollIndicator={false}>
        {renderHeader()}
        <Spacer position="bottom" size="large" />
        <PaddedContainer>{renderButtons()}</PaddedContainer>
      </Container>
    </SafeArea>
  );
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuSpecialistScreen);
