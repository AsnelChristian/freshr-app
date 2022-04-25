import styled from "styled-components/native";
import { rgba } from "polished";

export const ServiceCardGallery = styled.ImageBackground`
  height: 160px;
  flex-direction: column-reverse;
  position: relative;
`;

export const ServiceCardGalleryInfoContainer = styled.View`
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  height: 70px;

  background-color: ${({ theme }) => rgba(theme.colors.ui.primary, 0.8)};
`;

export const ServiceCardGalleryMoreButton = styled.TouchableOpacity`
  position: absolute;
  top: 3px;
  right: 3px;
  height: 34px;
  width: 34px;
  border-radius: 44px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => rgba(theme.colors.ui.primary, 0.7)};
`;
