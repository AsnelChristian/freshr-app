import React, { useState } from "react";
import { connect } from "react-redux";
import styled, { useTheme } from "styled-components/native";
import { Entypo, FontAwesome5 } from "@expo/vector-icons";

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
import {
  renderSeatsForm,
  SeatCounterIndicator,
  SeatFormButton,
  SeatFormContainer,
  SeatIndicator,
} from "./components/pro-facility-form-helper";

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const Content = styled.View`
  flex: 1;
  background-color: white;
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
    return (
      <SeatIndicator key={key}>
        <FontAwesome5 name="chair" size={50} color={theme.colors.ui.primary} />
      </SeatIndicator>
    );
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

  return (
    <SafeArea>
      <Container style={{ backgroundColor: theme.colors.brand.primary }}>
        <View
          style={{ flex: 0.5, backgroundColor: theme.colors.brand.primary }}
        />
        <Content style={{ borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>
          <Spacer position="bottom" size="medium" />
          <Spacer position="bottom" size="large" />
          <PaddedContainer style={{ flex: 1 }}>
            <SectionTitle>Set seats number</SectionTitle>
            <Spacer position="bottom" size="medium" />
            <Text variant="caption" style={{ lineHeight: 22 }}>
              How many seats do you want to make available here
            </Text>
            <Spacer position="bottom" size="large" />
            {renderSeatsForm(
              handleAddSeatPress,
              handleRemoveSeatPress,
              seats.length
            )}
            <Spacer position="bottom" size="large" />
            {renderSeats()}
          </PaddedContainer>
          <Spacer position="bottom" size="medium" />
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
