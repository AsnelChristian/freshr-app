import { connect } from "react-redux";
import styled, { useTheme } from "styled-components/native";

import { SafeArea } from "../../components/utils/safearea.component";
import { Spacer } from "../../components/spacer/spacer.component";
import { Text } from "../../components/typography/typography.component";
import { Entypo } from "@expo/vector-icons";
import { useWindowDimensions, View } from "react-native";
import { useState } from "react";
import { SceneMap, TabView } from "react-native-tab-view";
import {
  PaddedContainer,
  SectionTitle,
} from "../components/details-screen.component";
import { renderTabBar } from "../utils";

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const LargeButton = styled.TouchableOpacity`
  height: 90px;
  background-color: ${({ theme }) => theme.colors.ui.primary};
  padding: 0px 32px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
`;

const TabViewContainer = styled.View`
  height: 350px;
  background-color: ${({ theme }) => theme.colors.ui.quaternary};
  padding: 2px;
  border-radius: 10px;
  overflow: hidden;
`;

const TabContainer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.ui.quaternary};
`;

const HomeFacilityScreen = (props) => {
  const layout = useWindowDimensions();
  const theme = useTheme();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "openedFacilities", title: "Opened" },
    { key: "closedFacilities", title: "Closed" },
    { key: "dayStats", title: "Today's stats" },
  ]);

  const renderOpenedFacilities = () => {
    return (
      <TabContainer>
        <Spacer position="top" size="large" />
        <Text variant="caption">Opened Facilities</Text>
      </TabContainer>
    );
  };

  const renderClosedFacilities = () => {
    return (
      <TabContainer>
        <Spacer position="top" size="large" />
        <Text variant="caption">Closed Facilities</Text>
      </TabContainer>
    );
  };
  const renderDayStats = () => {
    return (
      <TabContainer>
        <Spacer position="top" size="large" />
        <Text variant="caption">Today's stats</Text>
      </TabContainer>
    );
  };

  const renderScene = SceneMap({
    openedFacilities: renderOpenedFacilities,
    closedFacilities: renderClosedFacilities,
    dayStats: renderDayStats,
  });

  return (
    <SafeArea>
      <Container>
        <Spacer position="top" size="large" />
        <Spacer position="top" size="large" />
        <PaddedContainer>
          <SectionTitle>Your facilities</SectionTitle>
          <Spacer position="top" size="large" />
          <TabViewContainer>
            <TabView
              renderTabBar={renderTabBar}
              navigationState={{ index, routes }}
              renderScene={renderScene}
              onIndexChange={setIndex}
              initialLayout={{ width: layout.width }}
            />
          </TabViewContainer>
        </PaddedContainer>
        <Spacer position="top" size="large" />

        <PaddedContainer>
          <LargeButton onPress={() => props.navigation.navigate("SetLocation")}>
            <Text variant="caption" style={{ fontSize: 24, color: "white" }}>
              Add new facility
            </Text>
            <Entypo name="chevron-right" size={24} color="white" />
          </LargeButton>
        </PaddedContainer>
      </Container>
    </SafeArea>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(HomeFacilityScreen);
