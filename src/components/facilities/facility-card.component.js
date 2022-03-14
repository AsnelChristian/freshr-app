import styled from "styled-components/native";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const FacilityCardContainer = styled.View`
  height: 200px;
  width: ${width - 50}px;
  background-color: white;
`;

export const FacilityCard = ({ facility }) => {
  return <FacilityCardContainer />;
};
