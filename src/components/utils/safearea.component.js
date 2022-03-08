import styled from "styled-components/native";
import { SafeAreaView, StatusBar } from "react-native";

export const SafeArea = styled(SafeAreaView)`
  flex: 1;
  background-color: white;

  ${StatusBar.currentHeight && `padding-top: ${StatusBar.currentHeight}px`}
`;
