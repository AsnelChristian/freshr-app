import styled from "styled-components/native";
import { rgba } from "polished";

export const PageContainer = styled.View`
  flex: 1;
  background-color: #fafafa;
`;

export const Content = styled.View`
  padding: 0px 18px;
`;

export const Row = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
`;

export const Separator = styled.View`
  height: 1px;
  background-color: ${({ theme }) => rgba(theme.colors.ui.primary, 0.05)};
`;
