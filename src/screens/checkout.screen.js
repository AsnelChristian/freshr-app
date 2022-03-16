import styled from "styled-components/native";
import { connect } from "react-redux";

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const CheckoutScreen = ({ booking }) => {
  return <Container />;
};

const mapStateToProps = (state) => ({
  booking: state.booking,
});
export default connect(null, null)(CheckoutScreen);
