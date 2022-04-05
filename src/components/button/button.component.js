import styled from "styled-components/native";

export const IconButton = styled.TouchableOpacity`
  height: 48px;
  width: 48px;
  border-radius: 100px;
  border: 1px solid ${({ theme }) => theme.colors.ui.border};
  align-items: center;
  justify-content: center;
  background-color: ${({ active, activeColor, inactiveColor }) =>
    active ? activeColor : inactiveColor};
`;

export const FilterButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  height: 35px;
  border-radius: 40px;
  padding: 0px 10px;
  background-color: white;
  border: 1px solid
    ${({ theme, active }) =>
      active ? theme.colors.ui.primary : theme.colors.ui.border};
`;

export const CancelButton = styled.TouchableOpacity`
  height: 44px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  background-color: ${({ theme }) => theme.colors.ui.primary};
`;

export const ModalButton = styled.TouchableOpacity`
  background-color: ${({ variant, theme }) =>
    variant === "primary"
      ? theme.colors.ui.primary
      : theme.colors.ui.quaternary};
  padding: ${({ theme }) => theme.space[3]};
  border-radius: ${({ theme }) => theme.sizes[1]};
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
