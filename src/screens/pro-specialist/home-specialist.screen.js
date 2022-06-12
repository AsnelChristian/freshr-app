import { connect } from "react-redux";
import styled, { useTheme } from "styled-components/native";
import { SafeArea } from "../../components/utils/safearea.component";
import { AntDesign, Feather } from "@expo/vector-icons";
import { Spacer } from "../../components/spacer/spacer.component";
import { Text } from "../../components/typography/typography.component";
import { PaddedContainer } from "../components/details-screen.component";
import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  useWindowDimensions,
  View,
  Dimensions,
} from "react-native";
import { rgba } from "polished";
import { NavButton, TopNavContainer } from "./components/top-nav.component";
import { renderConfirmModal } from "./components/modal.component";
import { SwitchInput } from "./components/switch-component";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import {
  animatedData,
  animatedData2,
  animatedData3,
  originalData,
} from "./graph-mock-data";

import { round } from "react-native-redash";
import { LineChart, makeGraph } from "./components/graph.component";
import { ProActivityModal } from "./components/activity-modal.component";
import * as Progress from "react-native-progress";
import { RequestModal } from "./components/request.modal.component";

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const MainSection = styled.View`
  flex: 1;
  position: relative;
  height: 400px;
`;

const MainSectionGradient = styled(LinearGradient)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const ProfileAvatar = styled.ImageBackground`
  height: 44px;
  width: 44px;
  border-radius: 44px;
  overflow: hidden;
`;

const BalanceContainer = styled.View`
  flex: 1;
  padding: 16px;
`;

const ManageServiceButtonContainer = styled.TouchableOpacity`
  position: relative;
  padding: 16px;
  border-radius: 15px;
  justify-content: center;
  overflow: hidden;
`;

const GlassBackground = styled(BlurView)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 15px;
`;

const HeaderSectionContainer = styled.View`
  flex-direction: row;
  align-items: stretch;
  justify-content: space-between;
`;

const StatsContainer = styled.ScrollView`
  position: relative;
  padding: 8px 0px;
`;

const StatItemContainer = styled.View`
  padding: 16px;
  align-items: center;
`;

const GRAPH_HEIGHT = 150;
const GRAPH_WIDTH = Dimensions.get("window").width;

const HomeSpecialistScreen = (props) => {
  const theme = useTheme();
  const layout = useWindowDimensions();

  const [available, setAvailable] = useState(false);
  const [showAvailableConfirmation, setShowAvailableConfirmation] =
    useState(false);
  const [showUnavailableConfirmation, setShowUnavailableConfirmation] =
    useState(false);
  const [balance, setBalance] = useState("");
  const [graphData, setGraphData] = useState([]);
  const [progressPlaceHolder, setProgressPlaceHolder] = useState(0);
  const [showOrder, setShowOrder] = useState(false);
  const profilePicture =
    "https://media.istockphoto.com/photos/barber-shop-owner-wearing-protective-face-mask-and-cutting-customers-picture-id1297946321?b=1&k=20&m=1297946321&s=170667a&w=0&h=fyWRxzdghvvsuRnpE0C1gbwby5A1JQukbRFZxLz9XiM=";

  const chartData = [originalData, animatedData, animatedData2, animatedData3];

  useEffect(() => {
    const graphDataGen = chartData.map((data) => makeGraph(data));
    setGraphData(graphDataGen);
  }, []);
  const updateBalance = (graphIndex) => {
    const sum = chartData[graphIndex]
      .map((val) => val.value)
      .reduce((partialSum, a) => partialSum + a, 0);
    setBalance(round(sum, 1).toLocaleString("en-US", { currency: "USD" }));
  };

  useEffect(() => {
    updateBalance(0);
  }, [graphData]);

  useEffect(() => {
    setProgressPlaceHolder(0.8);
  }, []);

  const renderTopNav = () => {
    return (
      <TopNavContainer style={{ backgroundColor: "transparent" }}>
        <TouchableOpacity onPress={() => props.navigation.navigate("Profile")}>
          <ProfileAvatar source={{ uri: profilePicture }} />
        </TouchableOpacity>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <SwitchInput
            circleColor={theme.colors.brand.secondary}
            color={rgba("white", 0.2)}
            value={available}
            trueAction={() => setShowAvailableConfirmation(true)}
            falseAction={() => setShowUnavailableConfirmation(true)}
          />
          <Spacer position="left" size="large" />
          <Spacer position="left" size="small" />
          <NavButton
            color="transparent"
            onPress={() => props.navigation.navigate("SpecialistMenu")}
          >
            <GlassBackground intensity={30} style={{ borderRadius: 200 }} />
            <Feather name="menu" size={24} color="white" />
          </NavButton>
        </View>
      </TopNavContainer>
    );
  };

  const renderStatItem = () => {
    return (
      <StatItemContainer style={{ position: "relative" }}>
        <Progress.Circle
          progress={progressPlaceHolder}
          size={60}
          showsText={true}
          borderColor={rgba("white", 0.3)}
          textStyle={{ color: "white" }}
          color={"white"}
        />
        <GlassBackground intensity={40} />

        <Spacer position="bottom" size="medium" />
        <Text
          variant="caption"
          style={{
            fontSize: 14,
            color: theme.colors.ui.quaternary,
            letterSpacing: 1,
          }}
        >
          stats 1
        </Text>
      </StatItemContainer>
    );
  };

  const renderStats = () => {
    const repeat = [1, 2, 3, 4, 5];
    return (
      <StatsContainer showsHorizontalScrollIndicator={false} horizontal={true}>
        {repeat.map((_, index) => (
          <View style={{ flexDirection: "row" }} key={`${index}-stats-item`}>
            {renderStatItem()}
            <Spacer position="left" size="medium" />
          </View>
        ))}
      </StatsContainer>
    );
  };

  const renderMainSection = () => {
    return (
      <MainSection>
        <View
          style={{
            top: 0,
            left: 0,
            right: 0,
            zIndex: 3,
          }}
        >
          {renderTopNav()}
        </View>
        <MainSectionGradient
          colors={
            available
              ? [theme.colors.brand.primary, theme.colors.brand.quaternary]
              : ["black", theme.colors.ui.primary]
          }
          start={[0, 1]}
          end={[1, 0]}
        />

        <PaddedContainer>
          <Spacer position="top" size="large" />
          <Spacer position="top" size="large" />
          <HeaderSectionContainer>
            <BalanceContainer>
              <GlassBackground intensity={40} />

              <Text
                style={{
                  fontSize: 14,
                  textTransform: "uppercase",
                  color: theme.colors.ui.quaternary,
                  letterSpacing: 1,
                }}
              >
                Balance
              </Text>
              <Spacer position="bottom" size="large" />
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={{ color: "white", fontSize: 35, fontWeight: "bold" }}
                >
                  $ {balance}
                </Text>
              </View>
            </BalanceContainer>
            <Spacer position="left" size="large" />
            <ManageServiceButtonContainer
              onPress={() =>
                props.navigation.navigate("SpecialistServiceManagement")
              }
            >
              <GlassBackground intensity={40} />
              <AntDesign name="setting" size={35} color="white" />
              <Spacer position="bottom" size="large" />
              <Text style={{ color: "white" }}>Manage services</Text>
            </ManageServiceButtonContainer>
          </HeaderSectionContainer>
        </PaddedContainer>

        {/*<Spacer position="bottom" size="large" />*/}
        {/*<PaddedContainer>{renderStats()}</PaddedContainer>*/}
        {/*<Spacer position="bottom" size="large" />*/}
        {/*{graphData.length > 0 && (*/}
        {/*  <LineChart*/}
        {/*    height={GRAPH_HEIGHT}*/}
        {/*    width={GRAPH_WIDTH}*/}
        {/*    data={graphData}*/}
        {/*    fill="transparent"*/}
        {/*    stroke="black"*/}
        {/*    strokeWidth={3}*/}
        {/*    setBalance={updateBalance}*/}
        {/*  />*/}
        {/*)}*/}
      </MainSection>
    );
  };

  return (
    <SafeArea>
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
        {renderMainSection()}
        {/*{renderHeader()}*/}
        {/*<Spacer position="top" size="large" />*/}
        {/*<Spacer position="top" size="large" />*/}
        {/*<Spacer position="top" size="large" />*/}
        {/*{renderTabView()}*/}
        {/*<Spacer position="top" size="large" />*/}
        {/*<PaddedContainer>{renderViewMoreButton()}</PaddedContainer>*/}
        {/*<Spacer position="top" size="large" />*/}
        {/*<Spacer position="top" size="large" />*/}
        {/*<Spacer position="top" size="large" />*/}
        {/*{renderCTAButtons()}*/}
        <Spacer position="top" size="large" />
      </Container>
      <RequestModal
        isVisible={showOrder}
        closeRequest={() => setShowOrder(false)}
      />
      <ProActivityModal expand={() => setShowOrder(true)} />
    </SafeArea>
  );
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeSpecialistScreen);
