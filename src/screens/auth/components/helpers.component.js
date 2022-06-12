import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import React from "react";
import { rgba } from "polished";

export const Gradient = styled(LinearGradient)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const GlassBackground = styled(BlurView)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 15px;
`;

export const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 10px;
  height: 50px;
  border: 1px solid ${({ theme }) => theme.colors.ui.border};
  border-radius: 30px;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ActionButton = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 44px;
  background-color: ${({ theme }) => theme.colors.brand.quaternary};
  border-radius: 30px;
  position: relative;
  z-index: 20;
`;

export const AppButton = styled.TouchableOpacity`
  height: 44px;
  border-radius: 30px;
  background-color: white;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.colors.ui.border};
  position: relative;
`;

export const AppButtonImage = styled.Image`
  height: 24px;
  width: 24px;
  left: 16px;
  position: absolute;
`;

export const RadioButton = styled.TouchableOpacity`
  padding: ${({ theme }) => theme.space[3]};
  border-radius: 5px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme, variant }) =>
    variant === "primary"
      ? theme.colors.brand.primary
      : rgba(theme.colors.brand.muted, 0.5)};
`;
