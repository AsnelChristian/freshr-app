import React from "react";
import styled, {useTheme} from "styled-components/native";

const defaultTextStyles = (theme) => `
  font-weight: ${theme.fontWeights.regular};
  color: ${theme.colors.text.primary};
  flex-wrap: wrap;
  margin-top: 0px;
  margin-bottom: 0px;
`;
const body = (theme) => `
  font-size: ${theme.fontSizes.body}
`;
const hint = (theme) => `
  font-size: ${theme.fontSizes.body}
`;
const error = (theme) => `
  color: ${theme.colors.text.error}
`;
const caption = (theme) => `
  font-size: ${theme.fontSizes.caption};
  font-weight: ${theme.fontWeights.bold}
`;
const label = (theme) => `
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes.body};
  font-weight: ${theme.fontWeights.medium}
`;

const variants = {
  body,
  hint,
  error,
  caption,
  label,
};

const TextView = styled.Text`
  ${({ defaultStyle }) => defaultStyle} ;
  ${({ specificStyle }) => specificStyle}
`;

export const Text = ({variant, children, style}) => {
  const theme = useTheme();
  const defaultStyle = defaultTextStyles(theme);
  const specificStyle = variants[variant](theme);
  return (<TextView defaultStyle={defaultStyle} specificStyle={specificStyle} style={style}>{children}</TextView>);
}

Text.defaultProps = {
  variant : "body"
}
