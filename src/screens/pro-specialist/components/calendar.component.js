import styled, { useTheme } from "styled-components/native";
import { View, StyleSheet } from "react-native";
import CalendarStrip from "react-native-calendar-strip";
import moment from "moment";

export const CalendarOneLine = () => {
  const theme = useTheme();
  const datesBlacklistFunc = (date) => {
    return date.isoWeekday() === 6 || date.isoWeekday() === 7; // disable Saturdays
  };
  const today = moment();
  return (
    <View style={styles.container}>
      <CalendarStrip
        scrollable
        style={{
          height: 100,
          paddingTop: 20,
          paddingBottom: 10,
          borderRadius: 15,
        }}
        maxDate={today}
        markedDates={[
          {
            date: today,
            lines: [
              {
                color: "white",
              },
            ],
          },
        ]}
        selectedDate={today}
        datesBlacklist={datesBlacklistFunc}
        calendarColor={theme.colors.brand.quaternary}
        calendarHeaderStyle={{ color: "white" }}
        dateNumberStyle={{ color: "white" }}
        dateNameStyle={{ color: "white" }}
        disabledDateNameStyle={{ color: theme.colors.brand.muted }}
        disabledDateNumberStyle={{ color: theme.colors.brand.muted }}
        highlightDateNumberStyle={{ color: theme.colors.brand.primary }}
        highlightDateNameStyle={{ color: theme.colors.brand.primary }}
        highlightDateContainerStyle={{ backgroundColor: "white" }}
        iconContainer={{ flex: 0.1 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});
