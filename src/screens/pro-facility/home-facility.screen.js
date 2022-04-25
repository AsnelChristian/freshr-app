import { connect } from "react-redux";
import styled, { useTheme } from "styled-components/native";

import { SafeArea } from "../../components/utils/safearea.component";
import { Spacer } from "../../components/spacer/spacer.component";
import { Text } from "../../components/typography/typography.component";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { TouchableOpacity, useWindowDimensions, View } from "react-native";
import React, { useCallback, useState } from "react";
import { SceneMap, TabView } from "react-native-tab-view";
import {
  HeaderContainer,
  PaddedContainer,
  SectionTitle,
} from "../components/details-screen.component";
import { renderTabBar } from "../normal-app/utils";
import ProFacilityCard from "./components/pro-facility-card";
import { rgba } from "polished";
import { Row, Separator } from "../../components/helpers/helpers.component";
import { Calendar } from "react-native-calendars/src/index";
import { FacilityBookingList } from "../../components/bottom-sheet/bottom-sheet.component";
import { BookingCard } from "./components/pro-booking-card";
import { renderCalendar } from "./utils";
import {
  CTAButton,
  LargeButton,
} from "../../components/button/button.component";
import { CalendarOneLine } from "../pro-specialist/components/calendar.component";
import {
  WelcomeContainer,
  WelcomeMessageContainer,
  WelcomeText,
} from "../components/pro/pro-details-screen.component";

const Container = styled.ScrollView`
  flex: 1;
  background-color: white;
`;

const TabViewContainer = styled.View`
  min-height: 480px;
  background-color: ${({ theme }) => theme.colors.ui.quaternary};
  border-radius: 10px;
  overflow: hidden;
`;

const TabContainer = styled.ScrollView.attrs((props) => ({
  showsVerticalScrollIndicator: false,
  nestedScrollEnabled: true,
}))`
  flex: 1;
  background-color: white;
  padding-bottom: 16px;
`;

const HeaderSectionContainer = styled.View`
  height: 300px;
  background-color: ${({ theme }) => rgba(theme.colors.brand.primary, 1)};
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
`;

const CenteredRow = styled.View`
  align-items: center;
  justify-content: center;
`;

const HeatMapContainer = styled.View.attrs((props) => ({
  shadowColor: props.theme.colors.ui.border,
  shadowOffset: {
    width: 10,
    height: 10,
  },
  shadowOpacity: 1,
  shadowRadius: 5,
  elevation: 6,
}))`
  background-color: white;
  border-radius: 30px;
`;

const HomeFacilityScreen = (props) => {
  const layout = useWindowDimensions();
  const theme = useTheme();
  const [showBookingList, setShowBookingList] = useState(false);
  const [selectedDay, setSelectedDay] = useState("");

  const toggleShowBookingList = () => {
    setShowBookingList(!showBookingList);
  };

  const onDayPress = useCallback((day) => {
    console.log(day);
    setSelectedDay(day.dateString);
    toggleShowBookingList();
  }, []);

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "bookingHistory", title: "Booking history" },
    { key: "openedFacilities", title: "Opened" },
    { key: "closedFacilities", title: "Closed" },
  ]);

  const renderHeader = () => {
    return (
      <WelcomeContainer active={true}>
        <WelcomeMessageContainer>
          <WelcomeText>
            Welcome{" "}
            <WelcomeText style={{ color: theme.colors.brand.primary }}>
              John doe
            </WelcomeText>
          </WelcomeText>
          <Spacer position="bottom" size="medium" />
          <Text variant="caption" style={{ color: "white", fontSize: 16 }}>
            Lorem ipsum dolor sit amet consectetur
          </Text>
        </WelcomeMessageContainer>
        <Spacer position="bottom" size="large" />
        <View style={{ flexDirection: "row" }}>
          <CTAButton onPress={() => props.navigation.navigate("")}>
            <View>
              <Text
                style={{
                  textDecorationLine: "underline",
                  fontWeight: "bold",
                  fontSize: 16,
                }}
              >
                View analytics &rarr;
              </Text>
            </View>
          </CTAButton>
        </View>
      </WelcomeContainer>
    );
  };

  const renderOpenedFacilities = () => {
    return (
      <TabContainer>
        <Spacer position="top" size="large" />
        <ProFacilityCard navigation={props.navigation} />
        <Spacer position="top" size="medium" />
        <ProFacilityCard navigation={props.navigation} />
      </TabContainer>
    );
  };

  const renderClosedFacilities = () => {
    return (
      <TabContainer>
        <Spacer position="top" size="large" />
        <ProFacilityCard navigation={props.navigation} />
      </TabContainer>
    );
  };

  const renderBookingHistory = () => {
    return (
      <TabContainer>
        <Spacer position="top" size="large" />
        <BookingCard facility={null} navigation={props.navigation} />
        <Spacer position="top" size="medium" />
        {/*<BookingCard facility={null} />*/}
        <Spacer position="top" size="large" />
        <PaddedContainer>
          <TouchableOpacity>
            <Text
              style={{ textDecorationLine: "underline", fontWeight: "bold" }}
            >
              View more &rarr;
            </Text>
          </TouchableOpacity>
        </PaddedContainer>

        <Spacer position="top" size="large" />
      </TabContainer>
    );
  };

  const renderScene = SceneMap({
    bookingHistory: renderBookingHistory,
    openedFacilities: renderOpenedFacilities,
    closedFacilities: renderClosedFacilities,
  });

  const renderCalendarComp = () => {
    return (
      <PaddedContainer>
        <CalendarOneLine />
      </PaddedContainer>
    );
  };

  return (
    <SafeArea>
      <Container
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
      >
        {renderHeader()}
        {/*<PaddedContainer style={{ marginTop: -90 }}>*/}
        {/*  <View*/}
        {/*    style={{ borderRadius: 30, overflow: "hidden", paddingBottom: 16 }}*/}
        {/*  >*/}
        {/*    {renderCalendar(onDayPress)}*/}
        {/*  </View>*/}
        {/*</PaddedContainer>*/}
        <Spacer position="top" size="large" />
        {renderCalendarComp()}
        <Spacer position="top" size="large" />
        <Spacer position="top" size="large" />
        <PaddedContainer>
          <LargeButton onPress={() => props.navigation.navigate("SetLocation")}>
            <Text variant="caption" style={{ fontSize: 24, color: "white" }}>
              Add new facility
            </Text>
            <Entypo name="chevron-right" size={24} color="white" />
          </LargeButton>

          {/*<LargeButton*/}
          {/*  onPress={() =>*/}
          {/*    props.navigation.navigate("SubscriptionPlanFacility")*/}
          {/*  }*/}
          {/*  variant="primary"*/}
          {/*>*/}
          {/*  <Text variant="caption" style={{ fontSize: 24, color: "white" }}>*/}
          {/*    Manage subscription*/}
          {/*  </Text>*/}
          {/*  <Entypo name="chevron-right" size={24} color="white" />*/}
          {/*</LargeButton>*/}
          <Spacer position="bottom" size="large" />
          <Spacer position="top" size="large" />
          <Spacer position="top" size="large" />
        </PaddedContainer>
        <PaddedContainer>
          <Spacer position="top" size="large" />
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
          <Separator />
        </PaddedContainer>
        <Spacer position="top" size="large" />

        {/*{renderRevenueChart()}*/}
        <FacilityBookingList
          showModal={showBookingList}
          toggleShowModal={toggleShowBookingList}
          navigation={props.navigation}
          date={selectedDay}
        />
      </Container>
    </SafeArea>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(HomeFacilityScreen);
