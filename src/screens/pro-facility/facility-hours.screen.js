import { connect } from "react-redux";
import styled, { useTheme } from "styled-components/native";
import DateTimePicker from "@react-native-community/datetimepicker";

import { SafeArea } from "../../components/utils/safearea.component";
import {
  PaddedContainer,
  SectionTitle,
} from "../components/details-screen.component";
import { Spacer } from "../../components/spacer/spacer.component";
import { Text } from "../../components/typography/typography.component";
import React, { useState } from "react";
import { renderFooter } from "./utils";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { Row } from "../../components/helpers/helpers.component";
import { renderTime } from "./components/time-view.helper";

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const Content = styled.View`
  flex: 1;
  background-color: white;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const HourButton = styled.TouchableOpacity`
  flex: 1;
  height: 80px;
  background-color: ${({ color }) => color};
  border-radius: 15px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const FacilityHoursScreen = (props) => {
  const theme = useTheme();
  const [openingHour, setOpeningHour] = useState(new Date());
  const [closingHour, setClosingHour] = useState(new Date());
  const [showOpeningPicker, setShowOpeningPicker] = useState(false);
  const [showClosingPicker, setShowClosingPicker] = useState(false);

  const updateOpeningHour = (e, selectedValue) => {
    if (selectedValue) {
      setOpeningHour(selectedValue);
    }
    setShowOpeningPicker(!showOpeningPicker);
  };

  const updateClosingHour = (e, selectedValue) => {
    if (selectedValue) {
      setClosingHour(selectedValue);
    }
    setShowClosingPicker(!showClosingPicker);
  };

  const renderHourButton = (label, value, toggle) => {
    return (
      <HourButton
        color={value ? theme.colors.ui.primary : theme.colors.brand.primary}
        onPress={toggle}
      >
        {label === "opening" ? (
          <FontAwesome5 name="door-open" size={20} color="white" />
        ) : (
          <FontAwesome5 name="door-closed" size={20} color="white" />
        )}
        <Spacer position="left" size="medium" />
        <Text variant="caption" style={{ color: "white", fontSize: 18 }}>
          {`${label} hour`}
        </Text>
      </HourButton>
    );
  };

  const renderHourButtons = () => {
    return (
      <ButtonContainer>
        {renderHourButton("opening", openingHour, () =>
          setShowOpeningPicker(!showOpeningPicker)
        )}
        <Spacer position="left" size="large" />
        {renderHourButton("closing", closingHour, () =>
          setShowClosingPicker(!showClosingPicker)
        )}
      </ButtonContainer>
    );
  };

  const renderHeader = () => {
    return (
      <>
        <SectionTitle>Opening hours</SectionTitle>
        <Spacer position="bottom" size="medium" />
        <Text variant="caption" style={{ lineHeight: 22 }}>
          At what time is your facility operational
        </Text>
      </>
    );
  };

  const renderTimePicker = (value, updateValue, min = false) => {
    return (
      <DateTimePicker
        testID="dateTimePicker"
        value={value}
        mode="time"
        is24Hour={true}
        onChange={updateValue}
        minimumDate={min ? openingHour : null}
      />
    );
  };

  return (
    <SafeArea>
      <Container style={{ backgroundColor: theme.colors.brand.primary }}>
        <View
          style={{ flex: 1, backgroundColor: theme.colors.brand.primary }}
        />
        <Content style={{ borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>
          <PaddedContainer>
            <Spacer position="bottom" size="large" />
            <Spacer position="bottom" size="large" />

            {renderHeader()}
            <Spacer position="bottom" size="large" />
            <Spacer position="bottom" size="large" />
            {renderHourButtons()}
            {showOpeningPicker &&
              renderTimePicker(openingHour, updateOpeningHour)}
            {showClosingPicker &&
              renderTimePicker(closingHour, updateClosingHour, true)}
            <Spacer position="bottom" size="large" />
            <Spacer position="bottom" size="large" />
            <Row>
              {renderTime(openingHour, "From")}
              <Spacer position="left" size="large" />
              {renderTime(closingHour, "Until")}
            </Row>
          </PaddedContainer>
        </Content>
      </Container>
      {renderFooter(props.navigation, "")}
    </SafeArea>
  );
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FacilityHoursScreen);
