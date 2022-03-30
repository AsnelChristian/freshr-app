import { connect } from "react-redux";
import { useEffect, useState } from "react";
import styled, { useTheme } from "styled-components/native";
import { rgba } from "polished";
import { useNavigation } from "@react-navigation/native";

import { Text } from "../../components/typography/typography.component";
import { Spacer } from "../../components/spacer/spacer.component";
import { AntDesign } from "@expo/vector-icons";

const StepContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Container = styled.View`
  padding: ${({ theme }) => theme.space[3]};
  background-color: white;
`;

const StepIndicatorContainer = styled.TouchableOpacity`
  width: ${({ small }) => (small ? "14px" : "22px")};
  height: ${({ small }) => (small ? "14px" : "22px")};
  border-radius: 200px;
  align-items: center;
  justify-content: center;
  border: 2px solid
    ${({ active, theme }) =>
      active ? theme.colors.brand.primary : rgba(theme.colors.ui.primary, 0.1)};
`;

const StepIndicator = styled.View`
  width: ${({ small }) => (small ? "6px" : "9px")};
  height: ${({ small }) => (small ? "6px" : "9px")};
  border-radius: 200px;
  background-color: ${({ active, theme }) =>
    active ? theme.colors.brand.primary : rgba(theme.colors.ui.primary, 0.1)};
`;
const StepFlowIndicator = styled.View`
  flex-direction: row;
  height: 3px;
  background-color: ${({ active, theme }) =>
    active ? theme.colors.brand.primary : rgba(theme.colors.ui.primary, 0.1)};
`;

const BookingStepper = ({ pageStep, ...props }) => {
  const theme = useTheme();
  const [step, setStep] = useState(props.bookingStep);
  const navigation = useNavigation();

  const stepNavigationLinks = [
    "SpecialistDetails",
    "MeetingTimeSelection",
    "BookingReview",
  ];
  const bookingStepMessages = [
    {
      default: "",
      edit: "Edit service selection",
    },
    {
      default: "Almost there",
      edit: "Edit time and wrap up",
    },
    {
      default: "Checkout and done",
      edit: "Ready... checkout",
    },
  ];
  useEffect(() => {
    setStep(props.bookingStep);
  }, [props.bookingStep]);

  return (
    <Container>
      <Text variant="caption" style={{ textAlign: "center" }}>
        {props.bookingStep >= 2
          ? bookingStepMessages[pageStep].edit
          : bookingStepMessages[pageStep].default}
      </Text>
      <Spacer position="bottom" size="small" />
      <StepContainer>
        <StepIndicatorContainer
          active={pageStep === 0}
          onPress={() =>
            navigation.push(stepNavigationLinks[0], {
              edit: props.bookingStep >= 2,
            })
          }
        >
          <StepIndicator active={props.bookingStep >= 0} />
        </StepIndicatorContainer>
        <StepFlowIndicator
          active={props.bookingStep >= 1}
          style={{ flex: 1 }}
        />
        <StepIndicatorContainer
          disabled={props.bookingStep < 1}
          active={pageStep === 1}
          onPress={() =>
            navigation.push(stepNavigationLinks[1], {
              edit: props.bookingStep >= 2,
            })
          }
        >
          <StepIndicator active={props.bookingStep >= 1} />
        </StepIndicatorContainer>
        <StepFlowIndicator
          active={props.bookingStep >= 2}
          style={{ flex: 1 }}
        />
        <StepIndicatorContainer
          disabled={props.bookingStep < 2}
          active={pageStep === 2}
          onPress={() =>
            navigation.push(stepNavigationLinks[2], {
              edit: props.bookingStep >= 2,
            })
          }
        >
          <AntDesign
            name="star"
            size={14}
            color={
              props.bookingStep >= 1
                ? theme.colors.brand.primary
                : rgba(theme.colors.ui.primary, 0.1)
            }
          />
          {/*<StepIndicator active={props.bookingStep >= 1} />*/}
        </StepIndicatorContainer>
      </StepContainer>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  bookingStep: state.booking.step,
});

export default connect(mapStateToProps, null)(BookingStepper);
