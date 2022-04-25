import styled, { useTheme } from "styled-components/native";
import { connect } from "react-redux";
import { SafeArea } from "../../components/utils/safearea.component";
import React, { useEffect, useState } from "react";
import { useWindowDimensions, View } from "react-native";
import { Spacer } from "../../components/spacer/spacer.component";
import { Text } from "../../components/typography/typography.component";
import {
  HeaderContainer,
  PaddedContainer,
  PageTitle,
} from "../components/details-screen.component";
import { SceneMap, TabView } from "react-native-tab-view";
import { renderTabBar } from "../normal-app/utils";
import { NavButton, TopNavContainer } from "./components/top-nav.component";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { SwitchInput } from "./components/switch-component";
import { renderConfirmModal } from "./components/modal.component";
import { toggleBottomNavBackground } from "./utils";

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const InboxSpecialistScreen = (props) => {
  const theme = useTheme();
  const layout = useWindowDimensions();
  const [available, setAvailable] = useState(false);
  const [showAvailableConfirmation, setShowAvailableConfirmation] =
    useState(false);
  const [showUnavailableConfirmation, setShowUnavailableConfirmation] =
    useState(false);

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "messages", title: "Messages" },
    { key: "notifications", title: "Notifications" },
  ]);

  useEffect(() => {
    toggleBottomNavBackground(available, props.navigation, theme);
  }, [available]);

  const renderMessages = () => {
    return (
      <View>
        <Spacer position="top" size="large" />
        <Text variant="caption">Messages</Text>
      </View>
    );
  };

  const renderNotifications = () => {
    return (
      <View>
        <Spacer position="top" size="large" />
        <Text variant="caption">Notifications</Text>
      </View>
    );
  };

  const renderHeader = () => {
    return (
      <HeaderContainer>
        <Spacer position="top" size="large" />
        <PageTitle>Inbox</PageTitle>
      </HeaderContainer>
    );
  };

  const renderScene = SceneMap({
    messages: renderMessages,
    notifications: renderNotifications,
  });

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
        <Spacer position="bottom" size="large" />
        <PaddedContainer style={{ flex: 1 }}>
          <TabView
            renderTabBar={renderTabBar}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
          />
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
)(InboxSpecialistScreen);
