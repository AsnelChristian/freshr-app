import React, { useState } from "react";

import { connect } from "react-redux";
import styled, { useTheme } from "styled-components/native";

import { Text } from "../../components/typography/typography.component";
import { Spacer } from "../../components/spacer/spacer.component";
import { ServiceDetailsModal } from "../../components/bottom-sheet/bottom-sheet.component";
import { OrderCard, SmallOrderCard } from "../components/order-card.component";
import {
  ActionButton,
  ButtonContainer,
} from "../../components/button/process-action-button.component";
import { SafeArea } from "../../components/utils/safearea.component";

const Container = styled.ScrollView`
  flex: 1;
  background-color: white;
  padding: ${({ theme }) => theme.space[3]};
`;

const BookingCompletedScreen = (props) => {
  const theme = useTheme();
  const [selectedService, setSelectedService] = useState(null);

  const handleShowViewMore = (service) => {
    setSelectedService(service);
  };
  const handleCloseViewMore = () => {
    setSelectedService(null);
  };

  return (
    <SafeArea>
      <Container showsVerticalScrollIndicator={false}>
        <OrderCard
          order={props.booking}
          handleShowViewMore={handleShowViewMore}
        />

        <Spacer position="bottom" size="large" />
        <Spacer position="bottom" size="large" />
        <Spacer position="bottom" size="large" />
        <Spacer position="bottom" size="large" />
        <Spacer position="bottom" size="large" />
        <Spacer position="bottom" size="large" />
        {selectedService && (
          <ServiceDetailsModal
            showModal={true}
            toggleShowModal={handleCloseViewMore}
            service={selectedService}
          />
        )}
      </Container>
      <ButtonContainer
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.34,
          shadowRadius: 6.27,
          elevation: 10,
        }}
      >
        <ActionButton
          height={50}
          onPress={() => props.navigation.navigate("Map")}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            Back to map &rarr;
          </Text>
        </ActionButton>
      </ButtonContainer>
    </SafeArea>
  );
};

const mapStateToProps = (state) => ({
  booking: state.booking,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookingCompletedScreen);
