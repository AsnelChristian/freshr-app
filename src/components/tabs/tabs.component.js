import styled from "styled-components/native";

export const TabViewContainer = styled.View`
  flex: 1;
  padding: 0px ${({ theme }) => theme.space[3]};
  background-color: ${({ theme }) => theme.colors.ui.quaternary};
`;
