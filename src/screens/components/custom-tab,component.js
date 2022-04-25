import styled from "styled-components/native";
import { rgba } from "polished";

export const CustomTabButtonsContainer = styled.ScrollView`
  flex: 1;
  height: 50px;
  background-color: ${({ theme }) => theme.colors.ui.quaternary};
  padding: 0px ${({ theme }) => theme.space[2]};
  padding-left: 0;
  border-radius: 10px;
  overflow: hidden;
`;

export const CustomTabSeparator = styled.View`
  height: 70%;
  width: 1px;
  background-color: ${({ theme }) => rgba(theme.colors.ui.primary, 0.1)}; ;
`;

export const CustomTabButton = styled.TouchableOpacity`
  height: 100%;
  padding: 0px ${({ theme }) => theme.space[3]};
  background-color: ${({ active, theme }) =>
    active ? theme.colors.ui.primary : "white"};
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
