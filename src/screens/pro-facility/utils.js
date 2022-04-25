import { Footer, FooterRow } from "../components/details-screen.component";
import { Separator } from "../../components/helpers/helpers.component";
import { ModalButton } from "../../components/button/button.component";
import { AntDesign } from "@expo/vector-icons";
import { Spacer } from "../../components/spacer/spacer.component";
import { Text } from "../../components/typography/typography.component";
import { Dimensions, TouchableOpacity } from "react-native";
import styled, { useTheme } from "styled-components/native";
import { rgba } from "polished";
import { Bar, VictoryBar, VictoryChart, VictoryTheme } from "victory-native";
import { Calendar } from "react-native-calendars/src/index";
import { theme } from "../../infrastructure/theme";

export const renderFooter = (navigation, next) => {
  return (
    <Footer>
      <Separator />
      <FooterRow>
        <ModalButton onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={16} color="black" />
          <Spacer position="left" size="small" />
          <Text>Go back</Text>
        </ModalButton>
        <ModalButton
          variant="primary"
          onPress={() => navigation.navigate(next)}
        >
          <Text style={{ color: "white" }}>Next</Text>
          <Spacer position="left" size="small" />
          <AntDesign name="arrowright" size={16} color="white" />
        </ModalButton>
      </FooterRow>
    </Footer>
  );
};

export const StatsBarChart = () => {
  const theme = useTheme();
  return (
    <VictoryChart
      theme={VictoryTheme.material}
      domainPadding={{ x: 15 }}
      animate={{
        duration: 2000,
        onLoad: { duration: 1000 },
      }}
      height={300}
      width={Dimensions.get("window").width}
      style={{
        background: { fill: "white" },
        grid: {
          fill: "none",
          stroke: "white",
        },
      }}
    >
      <VictoryBar
        labels={({ datum }) => `$${datum.y}`}
        cornerRadius={{
          topLeft: 6,
          topRight: 6,
          bottomLeft: 6,
          bottomRight: 6,
        }}
        padding={{ top: 20, bottom: 60 }}
        dataComponent={
          <Bar
            style={{
              fill: theme.colors.brand.primary,
              borderRadius: 30,
              width: 12,

              overflow: "hidden",
            }}
          />
        }
        data={[
          {
            y: 20,
            x: "Jan",
            pos: 1,
          },
          {
            y: 60,
            x: "Feb",
            pos: 2,
          },
          {
            y: 10,
            x: "Mar",
            pos: 3,
          },
          {
            y: 40,
            x: "Apr",
            pos: 4,
          },
          {
            y: 70,
            x: "May",
            pos: 5,
          },
          {
            y: 20,
            x: "Jun",
            pos: 6,
          },
        ]}
      />
    </VictoryChart>
  );
};

const BookingCountContainer = styled.View`
  height: 20px;
  width: 20px;
  border-radius: 100px;
  background-color: ${({ theme }) => theme.colors.brand.primary};
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -8px;
  right: -8px;
`;

export const renderCalendar = (onDayPress) => {
  const today = new Date().toISOString().split("T")[0];

  return (
    <Calendar
      // Initially visible month. Default = now
      current={today}
      minDate={"2022-01-01"}
      maxDate={today}
      // current={"2012-03-01"}
      // // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
      // minDate={"2012-05-10"}
      // // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
      // maxDate={"2012-05-30"}
      // Handler which gets executed on day press. Default = undefined
      // onDayPress={onDayPress}
      // Handler which gets executed on day long press. Default = undefined
      // onDayLongPress={(day) => {
      //   console.log("selected day", day);
      // }}
      // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
      // monthFormat={"yyyy MM"}
      // Handler which gets executed when visible month changes in calendar. Default = undefined
      onMonthChange={(month) => {
        console.log("month changed", month);
      }}
      // Hide month navigation arrows. Default = false
      // hideArrows={true}
      // Replace default arrows with custom ones (direction can be 'left' or 'right')
      renderArrow={(direction) =>
        direction === "left" ? (
          <AntDesign name="arrowleft" size={24} color="black" />
        ) : (
          <AntDesign name="arrowright" size={24} color="black" />
        )
      }
      // Do not show days of other months in month page. Default = false
      hideExtraDays={true}
      // If hideArrows = false and hideExtraDays = false do not switch month when tapping on greyed out
      // day from another month that is visible in calendar page. Default = false
      // disableMonthChange={true}
      // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
      firstDay={1}
      // Hide day names. Default = false
      // hideDayNames={true}
      // Show week numbers to the left. Default = false
      // showWeekNumbers={true}
      // Handler which gets executed when press arrow icon left. It receive a callback can go back month
      // onPressArrowLeft={(subtractMonth) => subtractMonth()}
      // Handler which gets executed when press arrow icon right. It receive a callback can go next month
      // onPressArrowRight={(addMonth) => addMonth()}
      // Disable left arrow. Default = false
      // disableArrowLeft={true}
      // Disable right arrow. Default = false
      // disableArrowRight={true}
      // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
      disableAllTouchEventsForDisabledDays={true}
      // Replace default month and year title with custom one. the function receive a date as parameter
      // renderHeader={(date) => {
      //   /*Return JSX*/
      // }}
      // Enable the option to swipe between months. Default = false
      // enableSwipeMonths={true}
      // displayLoadingIndicator
      markingType={"multi-dot"}
      markedDates={{
        "2022-03-08": {
          cnt: 19,
          selected: true,
        },
        "2022-03-09": {
          disabled: true,
          cnt: 9,
        },
      }}
      dayComponent={({ date, state, marking }) => {
        const textColor =
          state === "disabled"
            ? theme.colors.ui.border
            : date === today
            ? theme.colors.brand.primary
            : theme.colors.ui.primary;
        const backgroundColor = marking
          ? rgba(theme.colors.brand.primary, 0.1)
          : "white";
        return (
          <TouchableOpacity
            style={{ padding: 7, backgroundColor: backgroundColor }}
            onPress={() => onDayPress(date)}
          >
            <Text
              style={{
                textAlign: "center",
                color: textColor,
              }}
            >
              {date.day}
            </Text>
            {marking && (
              <BookingCountContainer>
                <Text variant="caption" style={{ color: "white" }}>
                  {marking.cnt}
                </Text>
              </BookingCountContainer>
            )}
          </TouchableOpacity>
        );
      }}
      theme={{
        calendarBackground: "white",
        selectedDayTextColor: theme.colors.brand.primary,
        monthTextColor: theme.colors.brand.primary,
        indicatorColor: theme.colors.brand.primary,
        "stylesheet.calendar.main": {
          marginBottom: 10,
          dayContainer: {
            borderColor: theme.colors.brand.muted,
            borderWidth: 0.5,
            flex: 1,
            position: "relative",
            padding: 8,
          },
          emptyDayContainer: {
            borderColor: theme.colors.ui.quaternary,
            borderWidth: 0.5,
            flex: 1,
            position: "relative",
            padding: 8,
          },
          week: {
            marginTop: 0,
            marginBottom: 0,
            flexDirection: "row",
            justifyContent: "space-around",
          },
        },
        // textDisabledColor: 'red',
        "stylesheet.calendar.header": {
          week: {
            marginTop: 30,
            marginHorizontal: 12,
            flexDirection: "row",
            justifyContent: "space-between",
          },
        },
      }}
    />
  );
};
