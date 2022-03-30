import styled from "styled-components/native";
import { rgba } from "polished";

export const TimeItemMainContainer = styled.View`
  background-color: white;
  border-radius: ${({ theme }) => theme.sizes[1]};
  overflow: hidden;
  z-index: 2;
  position: relative;
`;
export const TimeItemContainer = styled.View`
  background-color: ${({ theme }) =>
    `${rgba(theme.colors.brand.primary, 0.15)}`};
  border-radius: ${({ theme }) => theme.sizes[1]};
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.space[1]} ${({ theme }) => theme.space[2]};
  margin-top: ${({ theme }) => theme.space[2]};
`;
