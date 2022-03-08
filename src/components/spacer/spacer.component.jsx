import React from "react";
import styled, { useTheme } from "styled-components/native";

const sizeVariants = {
  small: 1,
  medium: 2,
  large: 3,
};

const positionVariants = {
  left: "margin-left",
  right: "margin-right",
  top: "margin-top",
  bottom: "margin-bottom",
};

const getVariant = (position, size, theme) => {
  const sizeIndex = sizeVariants[size];
  const cssProperty = positionVariants[position];
  const value = theme.space[sizeIndex];
  return `${cssProperty}: ${value}`;
};

const SpacerView = styled.View`
  ${({ variant }) => variant}
`;

export const Spacer = ({ position, size, children }) => {
  const theme = useTheme();
  const variant = getVariant(position, size, theme);
  return <SpacerView variant={variant}>{children}</SpacerView>
};
