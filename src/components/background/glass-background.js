import styled from "styled-components/native";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";

export const GlassBackground = styled(BlurView)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const ContainerGradient = styled(LinearGradient)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;
