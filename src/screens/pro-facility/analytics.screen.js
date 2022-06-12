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
import { Text } from "../../components/typography/typography.component";
import { Row, Separator } from "../../components/helpers/helpers.component";
import {
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { rgba } from "polished";
import { renderCalendar, StatsBarChart } from "./utils";
import { View } from "react-native";
import React, { useCallback, useState } from "react";
import { FacilityBookingList } from "../../components/bottom-sheet/FacilityBookingListModal";

const Container = styled.ScrollView`
  flex: 1;
  background-color: white;
`;

const StatsContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${({ theme }) => theme.space[3]} 0px;
  background-color: ${({ theme, color }) =>
    color ? color : theme.colors.ui.quaternary};
`;

const StatsCard = styled.View`
  border-radius: 10px;
  overflow: hidden;
  position: relative;
`;

const StatItem = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const StatItemRow = styled.View`
  flex-direction: row;
  align-items: flex-end;
`;
const StatsCardHeader = styled.View`
  flex-direction: row;
  padding: ${({ theme }) => theme.space[3]};
  align-items: center;
  background-color: ${({ color }) => color};
`;

const FacilityAnalyticsScreen = (props) => {
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

  const renderHeader = () => {
    return (
      <HeaderContainer>
        <Spacer position="top" size="large" />
        <Spacer position="top" size="large" />
        <PageTitle>Analytics</PageTitle>
      </HeaderContainer>
    );
  };

  const renderRevenueChart = () => {
    return <StatsBarChart />;
  };

  const renderOverAllStats = () => {
    return (
      <StatsCard>
        <StatsCardHeader color={theme.colors.ui.primary}>
          <Text variant="caption" style={{ color: "white" }}>
            Overall stats
          </Text>
        </StatsCardHeader>
        <StatsContainer>
          <StatItem>
            <StatItemRow>
              <Text
                variant="caption"
                style={{
                  fontSize: 24,
                  lineHeight: 24,
                  marginBottom: -3,
                  color: theme.colors.brand.primary,
                }}
              >
                4.3
              </Text>
              <Spacer position="left" size="small" />
              <AntDesign
                name="star"
                size={20}
                color={theme.colors.brand.primary}
              />
            </StatItemRow>
            <Spacer position="bottom" size="small" />
            <Text style={{ color: "gray" }}>Overall rating</Text>
          </StatItem>
          <Spacer position="left" size="medium" />
          <StatItem>
            <StatItemRow>
              <Text
                variant="caption"
                style={{ fontSize: 24, lineHeight: 24, marginBottom: -3 }}
              >
                1.4k
              </Text>
            </StatItemRow>
            <Spacer position="bottom" size="small" />
            <Text style={{ color: "gray" }}>Reviews</Text>
          </StatItem>
          <Spacer position="left" size="medium" />

          <StatItem>
            <StatItemRow>
              <Text
                variant="caption"
                style={{ fontSize: 24, lineHeight: 24, marginBottom: -3 }}
              >
                400
              </Text>
            </StatItemRow>
            <Spacer position="bottom" size="small" />
            <Text style={{ color: "gray" }}>Pro Reviews</Text>
          </StatItem>
        </StatsContainer>
        <Separator />
        <StatsContainer>
          <StatItem>
            <StatItemRow>
              <MaterialIcons
                name="attach-money"
                size={20}
                color={theme.colors.ui.primary}
              />
              <Spacer position="left" size="small" />
              <Text
                variant="caption"
                style={{ fontSize: 24, lineHeight: 24, marginBottom: -3 }}
              >
                1,030
              </Text>
            </StatItemRow>
            <Spacer position="bottom" size="small" />
            <Text style={{ color: "gray" }}>Overall revenue</Text>
          </StatItem>
          <Spacer position="left" size="medium" />

          <StatItem>
            <MaterialCommunityIcons
              name="approximately-equal"
              size={24}
              color="gray"
            />
          </StatItem>
          <Spacer position="left" size="medium" />

          <StatItem>
            <StatItemRow>
              <Text
                variant="caption"
                style={{ fontSize: 24, lineHeight: 24, marginBottom: -3 }}
              >
                400
              </Text>
            </StatItemRow>
            <Spacer position="bottom" size="small" />
            <Text style={{ color: "gray" }}>Bookings</Text>
          </StatItem>
        </StatsContainer>
        <Separator />
        <StatsContainer color={rgba(theme.colors.brand.primary, 0.1)}>
          <StatItem>
            <StatItemRow>
              <MaterialIcons
                name="attach-money"
                size={20}
                color={theme.colors.ui.primary}
              />
              <Spacer position="left" size="small" />
              <Text
                variant="caption"
                style={{ fontSize: 24, lineHeight: 24, marginBottom: -3 }}
              >
                210
              </Text>
            </StatItemRow>
            <Spacer position="bottom" size="small" />
            <Text style={{ color: "gray" }}>Today's revenue</Text>
          </StatItem>
          <Spacer position="left" size="medium" />

          <StatItem>
            <MaterialCommunityIcons
              name="approximately-equal"
              size={24}
              color={"gray"}
            />
          </StatItem>
          <Spacer position="left" size="medium" />

          <StatItem>
            <StatItemRow>
              <Text
                variant="caption"
                style={{ fontSize: 24, lineHeight: 24, marginBottom: -3 }}
              >
                10
              </Text>
            </StatItemRow>
            <Spacer position="bottom" size="small" />
            <Text style={{ color: "gray" }}>Bookings</Text>
          </StatItem>
        </StatsContainer>
        <Separator />
        <StatsContainer>
          <StatItem>
            <StatItemRow>
              <MaterialIcons
                name="attach-money"
                size={20}
                color={theme.colors.ui.primary}
              />
              <Spacer position="left" size="small" />
              <Text
                variant="caption"
                style={{ fontSize: 24, lineHeight: 24, marginBottom: -3 }}
              >
                210
              </Text>
            </StatItemRow>
            <Spacer position="bottom" size="small" />
            <Text style={{ color: "gray" }}>March revenue</Text>
          </StatItem>
          <Spacer position="left" size="medium" />

          <StatItem>
            <MaterialCommunityIcons
              name="approximately-equal"
              size={24}
              color="gray"
            />
          </StatItem>
          <Spacer position="left" size="medium" />

          <StatItem>
            <StatItemRow>
              <Text
                variant="caption"
                style={{ fontSize: 24, lineHeight: 24, marginBottom: -3 }}
              >
                10
              </Text>
            </StatItemRow>
            <Spacer position="bottom" size="small" />
            <Text style={{ color: "gray" }}>Bookings</Text>
          </StatItem>
        </StatsContainer>
      </StatsCard>
    );
  };

  return (
    <SafeArea>
      <Container showsVerticalScrollIndicator={false}>
        {renderHeader()}

        <PaddedContainer>
          <Spacer position="top" size="large" />
          <SectionTitle>Booking history</SectionTitle>
          <Spacer position="top" size="medium" />
          <View
            style={{
              borderRadius: 30,
              overflow: "hidden",
              paddingBottom: 16,
            }}
          >
            {renderCalendar(onDayPress)}
          </View>
          <Spacer position="top" size="large" />
          {renderOverAllStats()}
          <Spacer position="top" size="large" />
          <Spacer position="top" size="large" />
          {/*{renderRevenueChart()}*/}
        </PaddedContainer>
      </Container>
      <FacilityBookingList
        showModal={showBookingList}
        toggleShowModal={toggleShowBookingList}
        navigation={props.navigation}
        date={selectedDay}
      />
    </SafeArea>
  );
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FacilityAnalyticsScreen);
