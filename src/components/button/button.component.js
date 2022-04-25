import styled from "styled-components/native";
import { rgba } from "polished";

export const IconButton = styled.TouchableOpacity`
  height: 44px;
  width: 44px;
  border-radius: 100px;
  border: 1px solid ${({ theme }) => theme.colors.brand.quaternary};
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
      active ? theme.colors.brand.quaternary : theme.colors.brand.muted};
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

export const LargeButton = styled.TouchableOpacity.attrs((props) => ({
  shadowColor: props.theme.colors.ui.border,
  shadowOffset: {
    width: 10,
    height: 10,
  },
  shadowOpacity: 1,
  shadowRadius: 5,
  elevation: 6,
}))`
  height: 80px;
  background-color: ${({ theme, variant }) =>
    variant === "primary"
      ? rgba(theme.colors.brand.secondary, 1)
      : theme.colors.ui.primary};
  padding: 0px 32px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
`;

export const EditButton = styled.TouchableOpacity`
  height: 40px;
  width: 40px;
  border-radius: 40px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.ui.quaternary};
  border: 1px solid ${({ theme }) => theme.colors.ui.border};
`;

export const CTAButton = styled.TouchableOpacity.attrs((props) => ({
  shadowColor: props.theme.colors.ui.border,
  shadowOffset: {
    width: 10,
    height: 10,
  },
  shadowOpacity: 1,
  shadowRadius: 5,
  elevation: 6,
}))`
  background-color: white;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.space[3]};
  border-radius: 15px;
`;
