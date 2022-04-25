import styled, { useTheme } from "styled-components/native";
import { connect } from "react-redux";
import { SafeArea } from "../../components/utils/safearea.component";
import { useWindowDimensions, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Spacer } from "../../components/spacer/spacer.component";
import { Text } from "../../components/typography/typography.component";
import { SceneMap, TabView } from "react-native-tab-view";
import { renderTabBar } from "../normal-app/utils";
import {
  HeaderContainer,
  PaddedContainer,
  PageTitle,
} from "../components/details-screen.component";
import { NavButton, TopNavContainer } from "./components/top-nav.component";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { CalendarOneLine } from "./components/calendar.component";
import { toggleBottomNavBackground } from "./utils";
import { SwitchInput } from "./components/switch-component";
import { renderConfirmModal } from "./components/modal.component";

const Container = styled.ScrollView`
  flex: 1;
  background-color: white;
`;

const AnalyticsSpecialistScreen = (props) => {
  const theme = useTheme();
  const layout = useWindowDimensions();
  const [available, setAvailable] = useState(false);
  const [showAvailableConfirmation, setShowAvailableConfirmation] =
    useState(false);
  const [showUnavailableConfirmation, setShowUnavailableConfirmation] =
    useState(false);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "stats", title: "Stats" },
    { key: "history", title: "History" },
  ]);

  useEffect(() => {
    toggleBottomNavBackground(available, props.navigation, theme);
  }, [available]);

  const renderStats = () => {
    return (
      <View>
        <Spacer position="top" size="large" />
        <Text variant="caption">Stats</Text>
      </View>
    );
  };

  const renderHistory = () => {
    return (
      <View>
        <Spacer position="top" size="large" />
        <Text variant="caption">Booking history</Text>
      </View>
    );
  };

  const renderHeader = () => {
    return (
      <HeaderContainer>
        <Spacer position="top" size="large" />
        <PageTitle>Insights</PageTitle>
      </HeaderContainer>
    );
  };

  const renderScene = SceneMap({
    stats: renderStats,
    history: renderHistory,
  });

  const renderCalendarComp = () => {
    return (
      <PaddedContainer>
        <CalendarOneLine />
      </PaddedContainer>
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
        <Spacer position="bottom" size="medium" />

        {renderCalendarComp()}
        <Spacer position="bottom" size="large" />
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
)(AnalyticsSpecialistScreen);
