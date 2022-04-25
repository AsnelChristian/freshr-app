import { Text } from "../../../components/typography/typography.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import styled from "styled-components/native";
import { DefaultTheme } from "react-native-paper";
import { theme } from "../../../infrastructure/theme";

const WorkTimeContainer = styled.View.attrs((props) => ({
  shadowColor: props.theme.colors.ui.border,
  shadowOffset: {
    width: 10,
    height: 10,
  },
  shadowOpacity: 1,
  shadowRadius: 5,
  elevation: 6,
}))`
  border-radius: 15px;
  padding: ${({ theme, isBookingCard }) =>
    isBookingCard ? theme.space[2] : theme.space[3]};
  justify-content: center;
  align-items: center;
  background-color: white;
  ${({ isBookingCard }) => (isBookingCard ? "" : "flex: 1;")}
`;

const TimeContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const TimeTextContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 6px 2px;
  position: relative;
`;

const TimeTextIndicator = styled.View`
  height: 3px;
  width: 100%;
  border-radius: 30px;
  background-color: ${({ theme }) => theme.colors.brand.primary};
  position: absolute;
  bottom: 0;
  left: 0;
`;

export const renderTimeText = (value, size = 36) => {
  return (
    <TimeTextContainer>
      <Text
        variant="caption"
        style={{ fontSize: size, color: theme.colors.ui.primary }}
      >
        {value}
      </Text>
      <TimeTextIndicator />
    </TimeTextContainer>
  );
};

export const renderTime = (value, label, size = 36, isBookingCard = false) => {
  console.log(value);
  const hour = value.getHours();
  const minute = value.getMinutes();
  const modif = hour >= 12 ? "PM" : "AM";
  const hourStr = hour > 9 ? `${hour}` : `0${hour}`;
  const minuteStr = minute > 9 ? `${minute}` : `0${minute}`;

  return (
    <WorkTimeContainer isBookingCard={isBookingCard}>
      {!isBookingCard && (
        <>
          <Text variant="caption" style={{ fontSize: 14 }}>
            {label}
          </Text>
          <Spacer position="bottom" size="small" />
        </>
      )}
      <TimeContainer>
        {renderTimeText(hourStr, size)}
        <Text variant="caption">:</Text>
        {renderTimeText(minuteStr, size)}
        <Spacer position="left" size="small" />
        {renderTimeText(modif, size)}
      </TimeContainer>
    </WorkTimeContainer>
  );
};
