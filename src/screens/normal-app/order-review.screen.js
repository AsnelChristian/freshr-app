import { SafeArea } from "../../components/utils/safearea.component";
import { OrderCard } from "../components/order-card.component";
import { connect } from "react-redux";
import React, { useState } from "react";
import { ServiceDetailsModal } from "../../components/bottom-sheet/bottom-sheet.component";
import styled from "styled-components/native";
import { View } from "react-native";
import { Spacer } from "../../components/spacer/spacer.component";

const Container = styled.ScrollView`
  flex: 1;
  background-color: white;
  padding: ${({ theme }) => theme.space[3]};
`;

const OrderReviewScreen = ({ route }) => {
  const { order } = route.params;
  const [selectedService, setSelectedService] = useState(null);

  const handleShowViewMore = (service) => {
    setSelectedService(service);
  };
  const handleCloseViewMore = () => {
    setSelectedService(null);
  };
  return (
    <View style={{ flex: 1 }}>
      <Container>
        <OrderCard order={order} handleShowViewMore={handleShowViewMore} />
        <Spacer position="bottom" size="large" />
        <Spacer position="bottom" size="large" />
        <Spacer position="bottom" size="large" />
        <Spacer position="bottom" size="large" />
      </Container>
      {selectedService && (
        <ServiceDetailsModal
          showModal={true}
          toggleShowModal={handleCloseViewMore}
          service={selectedService}
        />
      )}
    </View>
  );
};

export default connect(null, null)(OrderReviewScreen);
