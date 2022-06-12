import styled, { useTheme } from "styled-components/native";
import { rgba } from "polished";
import { Text } from "../typography/typography.component";

const Container = styled.View.attrs((props) => ({
  shadowColor: rgba(props.theme.colors.brand.primary, 0.5),
  shadowOffset: {
    width: 10,
    height: 10,
  },
  shadowOpacity: 0.3,
  shadowRadius: 5,
  elevation: 10,
}))`
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background-color: ${({ color }) => color};
  border-radius: 5px;
  overflow: hidden;
`;

const StatusIndicator = styled.View`
  width: 4px;
  height: 100%;
  background-color: ${({ color }) => color};
`;

export const MessageBox = ({ message, status, ...restProps }) => {
  const theme = useTheme();

  const getColor = (status) => {
    switch (status) {
      case "success":
        return theme.colors.brand.quaternary;
      case "warning":
        return theme.colors.brand.secondary;
      case "failure":
        return theme.colors.ui.error;
      default:
        return theme.colors.ui.quaternary;
    }
  };
  return (
    <Container color={getColor(status)}>
      <StatusIndicator color={getColor(status)} />
      <Text style={{ color: "white", fontSize: 14 }} variant="caption">
        {message}
      </Text>
    </Container>
  );
};
