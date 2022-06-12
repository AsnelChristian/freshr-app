import styled, { useTheme } from "styled-components/native";
import { ActivityIndicator } from "react-native-paper";
import { SafeArea } from "../components/utils/safearea.component";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const LoadingScreen = () => {
  const theme = useTheme();
  return (
    <SafeArea>
      <Container>
        <ActivityIndicator color={theme.colors.brand.primary} />
      </Container>
    </SafeArea>
  );
};
