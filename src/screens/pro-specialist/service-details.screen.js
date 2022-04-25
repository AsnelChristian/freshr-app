import { connect } from "react-redux";
import styled, { useTheme } from "styled-components/native";
import { SafeArea } from "../../components/utils/safearea.component";
import { NavButton, TopNavContainer } from "./components/top-nav.component";
import { Dimensions, FlatList, TouchableOpacity, View } from "react-native";
import {
  AntDesign,
  Entypo,
  Feather,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  PaddedContainer,
  SectionTitle,
} from "../components/details-screen.component";
import { Spacer } from "../../components/spacer/spacer.component";
import { Text } from "../../components/typography/typography.component";
import { SwitchInput } from "./components/switch-component";
import { toggleBottomNavBackground } from "./utils";
import { facilitiesMock } from "../../mocks/facilities-mock";
import { renderConfirmModal } from "./components/modal.component";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { rgba } from "polished";
import { HistoryCard } from "./components/history-card.component";

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const Gradient = styled(LinearGradient)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const GlassBackground = styled(BlurView)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Row = styled.View`
  position: relative;
  flex-direction: row;
  align-items: center;
`;

const PriceContainer = styled.View`
  position: relative;
  padding: 16px;
  border-radius: 15px;
  overflow: hidden;
`;

const CoverImage = styled.ImageBackground`
  height: 250px;
  overflow: hidden;
  width: 100%;
  position: relative;
  background-color: black;
`;

const StatsRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const StatsItem = styled.View`
  width: ${Dimensions.get("window").width / 3}px;
`;

const StatsRowSeparator = styled.View`
  height: 70%;
  width: 1px;
  background-color: ${({ theme }) => theme.colors.ui.primary};
`;

const ServiceDetailsScreen = (props) => {
  const theme = useTheme();
  const mockImage =
    "https://i.pinimg.com/originals/83/1b/5d/831b5dfdc5a785b1603054452698d5a8.jpg";
  const [coverImage, setCoverImage] = useState({
    uri: mockImage,
  });
  const [description, setDescription] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam feugiat justo ac tortor hendrerit."
  );

  const [service, setService] = useState(null);
  const [available, setAvailable] = useState(false);
  const [showAvailableConfirmation, setShowAvailableConfirmation] =
    useState(false);
  const [showUnavailableConfirmation, setShowUnavailableConfirmation] =
    useState(false);

  useEffect(() => {
    toggleBottomNavBackground(available, props.navigation, theme);
  }, [available]);

  useEffect(() => {
    const serviceMock = facilitiesMock[0].professionals[0].services[0];
    setService(serviceMock);
  }, []);
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

  const renderHeader = () => {
    return (
      <View style={{ position: "relative" }}>
        <Gradient
          colors={[theme.colors.brand.primary, theme.colors.brand.quaternary]}
          start={[0, 1]}
          end={[1, 0]}
        />
        <Spacer position="bottom" size="large" />
        <PaddedContainer>
          <Row style={{ justifyContent: "space-between" }}>
            <SectionTitle style={{ color: "white" }}>Dreadlocks</SectionTitle>
            <Row>
              <PriceContainer>
                <GlassBackground intensity={80} />
                <Text
                  style={{ fontSize: 24, fontWeight: "bold", color: "white" }}
                >
                  30 min
                </Text>
              </PriceContainer>

              <Spacer position="left" size="large" />
              <PriceContainer>
                <GlassBackground intensity={80} />
                <Text
                  style={{ fontSize: 24, fontWeight: "bold", color: "white" }}
                >
                  $ 23.5
                </Text>
              </PriceContainer>
            </Row>
          </Row>
        </PaddedContainer>
        <Spacer position="bottom" size="large" />
      </View>
    );
  };

  const renderCoverImage = () => {
    return <CoverImage source={coverImage} resizeMode="contain" />;
  };

  const renderDescription = () => {
    return (
      <PaddedContainer>
        <Text style={{ fontSize: 16, lineHeight: 22 }}>{description}</Text>
      </PaddedContainer>
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

  const renderStatsRow = () => {
    return (
      <View style={{ backgroundColor: rgba(theme.colors.brand.primary, 0.05) }}>
        <Spacer position="top" size="large" />

        <StatsRow>
          <StatsItem style={{ alignItems: "center" }}>
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

          <StatsItem style={{ alignItems: "center" }}>
            <Text style={{ fontWeight: "bold", fontSize: 24 }}>$ 300</Text>
            <Spacer position="bottom" size="medium" />
            <Text
              style={{
                color: theme.colors.ui.primary,
                fontWeight: "bold",
                textDecorationColor: "white",
              }}
            >
              total profit
            </Text>
          </StatsItem>
          <StatsRowSeparator />
          <StatsItem style={{ alignItems: "center" }}>
            <Text style={{ fontWeight: "bold", fontSize: 24 }}>50</Text>
            <Spacer position="bottom" size="medium" />
            <Text
              style={{
                color: theme.colors.ui.primary,
                fontWeight: "bold",
                textDecorationColor: "white",
              }}
            >
              requests
            </Text>
          </StatsItem>
        </StatsRow>
        <Spacer position="top" size="large" />
      </View>
    );
  };

  const renderBeforeHistoryList = () => {
    return (
      <>
        <Spacer position="top" size="large" />
        <PaddedContainer>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("SpecialistCreateService", {
                isEdit: true,
              })
            }
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <SectionTitle style={{ lineHeight: 24 }}>
              Service details
            </SectionTitle>
            <Spacer position="left" size="medium" />
            <Entypo
              name="edit"
              size={13}
              color={theme.colors.brand.quaternary}
            />
          </TouchableOpacity>
        </PaddedContainer>
        <Spacer position="top" size="large" />
        {renderHeader()}
        {renderCoverImage()}
        {renderStatsRow()}
        <Spacer position="top" size="large" />
        {renderDescription()}
        <Spacer position="top" size="large" />
        <Spacer position="top" size="large" />
        <PaddedContainer>
          <SectionTitle>History</SectionTitle>
        </PaddedContainer>
        <Spacer position="top" size="large" />
      </>
    );
  };

  const renderAfterHistoryList = () => {
    return (
      <>
        <Spacer position="top" size="large" />
        <Spacer position="top" size="large" />
      </>
    );
  };
  const renderHistory = () => {
    return (
      <View style={{ position: "relative" }}>
        <FlatList
          ListHeaderComponent={renderBeforeHistoryList}
          ListFooterComponent={renderAfterHistoryList}
          showsVerticalScrollIndicator={false}
          data={[{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]}
          renderItem={({ item }) => (
            <PaddedContainer key={item.id}>
              <HistoryCard />
              <Spacer position="bottom" size="medium" />
            </PaddedContainer>
          )}
          keyExtractor={(item) => item.id}
          // style={{ backgroundColor: theme.colors.ui.quaternary }}
        />
      </View>
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
      <Container>{renderHistory()}</Container>
    </SafeArea>
  );
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServiceDetailsScreen);
