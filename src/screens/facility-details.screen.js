import styled from "styled-components/native";
import { connect } from "react-redux";

const Container = styled.View`
  flex: 1;
`;

const FacilityDetailsScreen = ({ facility }) => {
  return <Container />;
};

export default connect(null, null)(FacilityDetailsScreen);
