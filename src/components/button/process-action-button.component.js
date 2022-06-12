import styled from "styled-components/native";

export const ButtonContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: white;
  bottom: 0;
  left: 0;
  position: absolute;
  z-index: 1;
  padding: ${({ theme }) => theme.space[2]} ${({ theme }) => theme.space[3]};
`;

export const ActionButton = styled.TouchableOpacity`
  position: relative;
  flex-direction: row;
  flex: 1;
  height: ${({ height }) => `${height}px`};
  align-items: center;
  justify-content: center;
  background-color: ${({ theme, disabled }) => disabled ? 'gray' : theme.colors.brand.primary};
  border-radius: ${({ theme }) => theme.sizes[1]};
`;

export const PositioningContainer = styled.View`
  height: 55px;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  right: ${({ theme }) => theme.space[3]};
`;

export const CartItemCountContainer = styled.View`
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 30px;
  border-radius: ${({ theme }) => theme.sizes[4]};
  background-color: ${({ theme }) => theme.colors.ui.primary};
`;
