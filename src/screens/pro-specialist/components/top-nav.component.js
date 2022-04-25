import styled from "styled-components/native";

export const TopNavContainer = styled.View`
  height: 65px;
  padding: 0px ${({ theme }) => theme.space[2]};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme, active }) =>
    active ? theme.colors.brand.quaternary : theme.colors.ui.primary};
  border-radius: 30px;
`;

export const NavButton = styled.TouchableOpacity`
  background-color: ${({ color }) => color};
  height: 40px;
  width: 40px;
  border-radius: 100px;
  align-items: center;
  justify-content: center;
`;
