import React, { useState } from "react";
import { connect } from "react-redux";
import styled, { useTheme } from "styled-components/native";
import { Entypo } from "@expo/vector-icons";

import { SafeArea } from "../../components/utils/safearea.component";
import { Spacer } from "../../components/spacer/spacer.component";
import {
  PaddedContainer,
  SectionTitle,
} from "../components/details-screen.component";
import { Text } from "../../components/typography/typography.component";
import { FlatGrid } from "react-native-super-grid";
import { View } from "react-native";
import { renderFooter } from "./utils";

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const FormContainer = styled.View`
  height: 170px;
  background-color: ${({ theme }) => theme.colors.ui.quaternary};
  border-radius: 16px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

const SeatIndicator = styled.View`
  height: 140px;
  width: 110px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.ui.border};
  background-color: ${({ theme }) => theme.colors.ui.primary};
`;

const FormButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.ui.primary};
  height: 48px;
  width: 48px;
  border-radius: 100px;
`;

const Content = styled.View`
  flex: 1;
`;

const SeatCounterIndicator = styled.View`
  background-color: ${({ theme }) => theme.colors.brand.primary};
  padding: ${({ theme }) => theme.space[2]};
  flex-direction: row;
  align-items: center;
  border-radius: 15px;
  justify-content: center;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
`;

const SeatsFacilityScreen = (props) => {
  const theme = useTheme();
  const [seats, setSeats] = useState([]);

  const handleAddSeatPress = () => {
    setSeats((old) => [...old, `seat-${old.length}`]);
  };

  const handleRemoveSeatPress = () => {
    setSeats((old) => [...old.splice(0, old.length - 1)]);
  };

  const renderSeat = (key) => {
    return <SeatIndicator key={key} />;
  };
  const renderSeats = () => {
    return (
      <FlatGrid
        itemDimension={110}
        data={seats}
        spacing={8}
        renderItem={({ item, index }) => renderSeat(index)}
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
      />
    );
  };
  const renderForm = () => {
    return (
      <FormContainer>
        <FormButton onPress={() => handleRemoveSeatPress()}>
          <Entypo name="minus" size={24} color="white" />
        </FormButton>
        <Spacer position="left" size="large" />
        <Spacer position="left" size="large" />
        <Text variant="caption" style={{ fontSize: 16 }}>
          How many seats
        </Text>
        <Spacer position="left" size="large" />
        <Spacer position="left" size="large" />
        <FormButton onPress={() => handleAddSeatPress()}>
          <Entypo name="plus" size={24} color="white" />
        </FormButton>
        <SeatCounterIndicator>
          <Text variant="caption" style={{ color: "white" }}>
            {seats.length}
          </Text>
        </SeatCounterIndicator>
      </FormContainer>
    );
  };

  return (
    <SafeArea>
      <Container>
        <View
          style={{ flex: 0.6, backgroundColor: theme.colors.brand.primary }}
        />
        <Content>
          <Spacer position="bottom" size="medium" />
          <Spacer position="bottom" size="large" />
          <PaddedContainer style={{ flex: 1 }}>
            <SectionTitle>Set seats number</SectionTitle>
            <Spacer position="bottom" size="medium" />
            <Text variant="caption" style={{ lineHeight: 22 }}>
              How many seats do you want to make available here
            </Text>
            <Spacer position="bottom" size="large" />
            {renderForm()}
            <Spacer position="bottom" size="large" />
            {renderSeats()}
          </PaddedContainer>
        </Content>
        {renderFooter(props.navigation, "CreateGalleryFacility")}
      </Container>
    </SafeArea>
  );
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SeatsFacilityScreen);
