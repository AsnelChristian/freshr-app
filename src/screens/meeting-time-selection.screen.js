import styled, { useTheme } from "styled-components/native";
import { connect } from "react-redux";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Spacer } from "../components/spacer/spacer.component";
import { Text } from "../components/typography/typography.component";
import DashedLine from "react-native-dashed-line";
import { rgba } from "polished";
import React, { useState } from "react";
import { SectionTitle } from "./components/details-screen.component";
import {
  ActionButton,
  ButtonContainer,
} from "../components/button/process-action-button.component";

const Container = styled.ScrollView`
  flex: 1;
  background-color: white;
  padding: ${({ theme }) => theme.space[3]};
`;

const PageContentContainer = styled.View`
  flex: 1;
`;

const SelectionSectionContainer = styled.View`
  position: relative;
  padding: ${({ theme }) => theme.space[3]};
  background-color: ${({ theme }) => theme.colors.ui.quaternary};
  border-radius: ${({ theme }) => theme.sizes[2]};
`;

const IconContainer = styled.View`
  padding: ${({ theme }) => theme.space[2]};
  background-color: white;
  border-radius: 12px;
  border: 2px solid ${({ theme }) => "gray"};
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const TravelWaysContainer = styled.View`
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  padding: ${({ theme }) => theme.space[2]};
`;

const VerticalDashed = styled(DashedLine)`
  position: absolute;
  top: 20px;
  left: ${11 + 4 + 2 + 16}px;
  width: 5px;
  height: 90%;
`;

const RadioButtonContainer = styled.TouchableOpacity`
  padding: ${({ theme }) => theme.space[2]};
  border: 2px solid
    ${({ active, theme }) =>
      active ? theme.colors.brand.primary : rgba(theme.colors.ui.primary, 0.5)};
  border-radius: ${({ theme }) => theme.sizes[2]};
  background-color: ${({ active, theme }) =>
    active ? theme.colors.brand.primary : "white"};
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: ${({ theme }) => theme.space[2]};
`;

const MeetingTimeSelectionScreen = ({ selectedFacility, navigation }) => {
  const [travelWay, setTravelWay] = useState("walking");
  const [additionalTime, setAdditionalTime] = useState(null);

  const { time } = selectedFacility;

  const createRadioButton = (
    value,
    label,
    selectedValue,
    handlePress,
    icon
  ) => {
    const active = value === selectedValue;
    return (
      <>
        <RadioButtonContainer
          active={active}
          onPress={() => handlePress(value)}
        >
          {icon && (
            <Ionicons
              name={icon}
              size={20}
              color={active ? "white" : "black"}
            />
          )}
          <Spacer position="left" size="small" />
          <Text
            variant="caption"
            style={{ fontSize: 14, color: active ? "white" : "black" }}
          >
            {value} {label}
          </Text>
        </RadioButtonContainer>
        <Spacer position="left" size="medium" />
      </>
    );
  };

  const theme = useTheme();
  return (
    <>
      <Container showsVerticalScrollIndicator={false}>
        <PageContentContainer>
          <Spacer position="bottom" size="large" />
          <SectionTitle>Travel way</SectionTitle>
          <Spacer position="bottom" size="medium" />
          <Text variant="caption" numberOfLines={2}>
            This is used to approximate time needed for appointment
          </Text>
          <Spacer position="bottom" size="large" />

          <SelectionSectionContainer>
            <VerticalDashed
              axis="vertical"
              dashLength={6}
              dashThickness={6}
              dashGap={8}
              dashColor={rgba(theme.colors.ui.primary, 1)}
              dashStyle={{ borderRadius: 100 }}
            />
            <Row>
              <IconContainer>
                <Ionicons name="location" size={22} />
              </IconContainer>
              <Spacer position="left" size="medium" />
              <Text
                numberOfLines={2}
                variant="caption"
                style={{ fontSize: 16 }}
              >
                your location
              </Text>
            </Row>

            <TravelWaysContainer style={{ marginLeft: 16 + 16 + 22 }}>
              {createRadioButton(
                "walking",
                `~ ${time.foot} min`,

                travelWay,
                setTravelWay,
                "md-walk-sharp"
              )}
              {createRadioButton(
                "cycling",
                `~ ${time.bicycle}  min`,
                travelWay,
                setTravelWay,
                "md-bicycle-sharp"
              )}
              {createRadioButton(
                "driving",
                `~ ${time.car}  min`,

                travelWay,
                setTravelWay,
                "md-car-sharp"
              )}
            </TravelWaysContainer>

            <Row>
              <IconContainer>
                <Ionicons name="location" size={22} />
              </IconContainer>
              <Spacer position="left" size="medium" />
              <Text
                numberOfLines={2}
                variant="caption"
                style={{ fontSize: 16, color: theme.colors.ui.primary }}
              >
                your destination
              </Text>
            </Row>
          </SelectionSectionContainer>
          <Spacer position="bottom" size="large" />
          <Spacer position="bottom" size="large" />
          <SectionTitle>More time </SectionTitle>
          <Spacer position="bottom" size="medium" />
          <Text variant="caption" numberOfLines={2}>
            In case you think you would require more time
          </Text>
          <Spacer position="bottom" size="large" />
          <SelectionSectionContainer>
            <Spacer position="bottom" size="large" />

            <Row>
              <MaterialIcons name="more-time" size={22} />
              <Spacer position="left" size="medium" />
              <Text
                numberOfLines={2}
                variant="caption"
                style={{ fontSize: 16 }}
              >
                Pick additional time
              </Text>
            </Row>
            <Spacer position="bottom" size="medium" />

            <TravelWaysContainer>
              {createRadioButton(
                5,
                "min",

                additionalTime,
                setAdditionalTime
              )}
              {createRadioButton(10, "min", additionalTime, setAdditionalTime)}
              {createRadioButton(
                15,
                "min",

                additionalTime,
                setAdditionalTime
              )}
              {createRadioButton(
                30,
                "min",

                additionalTime,
                setAdditionalTime
              )}
            </TravelWaysContainer>
            <Spacer position="bottom" size="large" />
          </SelectionSectionContainer>
          <Spacer position="bottom" size="large" />

          <SelectionSectionContainer>
            <Row style={{ justifyContent: "space-between" }}>
              <Row>
                <Feather name="target" size={22} />
                <Spacer position="left" size="medium" />
                <Text
                  numberOfLines={2}
                  variant="caption"
                  style={{ fontSize: 16 }}
                >
                  In total approximately
                </Text>
              </Row>
              <RadioButtonContainer active={true}>
                <Text
                  variant="caption"
                  style={{ fontSize: 14, color: "white" }}
                >
                  45 minutes
                </Text>
              </RadioButtonContainer>
            </Row>
          </SelectionSectionContainer>
        </PageContentContainer>
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
          onPress={() => navigation.navigate("MeetingTimeSelection")}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            Proceed to next step
          </Text>
        </ActionButton>
      </ButtonContainer>
    </>
  );
};

const mapStateToProps = (state) => ({
  selectedFacility: state.booking.facility,
});

export default connect(mapStateToProps, null)(MeetingTimeSelectionScreen);
