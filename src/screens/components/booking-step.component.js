import {connect} from "react-redux";
import {useEffect, useState} from "react";
import styled from 'styled-components/native';
import {rgba} from "polished";
import {useNavigation} from "@react-navigation/native";


const StepContainer = styled.View`
  background-color: white;
  padding: ${({theme}) => theme.space[3]};
  flex-direction: row;
  align-items: center;
`

const StepIndicatorContainer = styled.TouchableOpacity`
  width: 20px;
  height: 20px;
  border-radius: 200px;
  align-items: center;
  justify-content: center;
  border: 2px solid ${({active, theme}) =>  active ? theme.colors.brand.primary: rgba(theme.colors.ui.primary, 0.1)};
`

const StepIndicator = styled.View`
  width: 13px;
  height: 13px;
  border-radius: 200px;
  background-color: ${({active, theme}) =>  active ? theme.colors.brand.primary: rgba(theme.colors.ui.primary, 0.1)};
`
const StepFlowIndicator = styled.View`
  flex-direction: row;
  height: 3px;
  flex: 1;
  background-color: ${({active, theme}) =>  active ? theme.colors.brand.primary: rgba(theme.colors.ui.primary, 0.1)};
`


const BookingStepper = ({pageStep, navigation, ...props }) => {
    const [step, setStep] = useState(props.bookingStep)
    // const navigation = useNavigation()

    const stepNavigationLinks = ["SpecialistDetails", "SelectFacility", "MeetingTimeSelection", "BookingReview", "Checkout"]
    useEffect(() => {
        setStep(props.bookingStep)
    }, [props.bookingStep])

    return <StepContainer>
        <StepIndicatorContainer active={pageStep === 0} onPress={() => navigation.navigate(stepNavigationLinks[0], {edit: props.bookingStep >= 3})}>
            <StepIndicator  active={props.bookingStep >= 0} />
        </StepIndicatorContainer>
        <StepFlowIndicator active={props.bookingStep >= 1}/>
        <StepIndicatorContainer disabled={props.bookingStep < 1} active={pageStep === 1} onPress={() => navigation.navigate(stepNavigationLinks[1], {edit: props.bookingStep >= 3})}>
            <StepIndicator active={props.bookingStep >= 1}/>
        </StepIndicatorContainer>
        <StepFlowIndicator active={props.bookingStep >= 2}/>
        <StepIndicatorContainer disabled={props.bookingStep < 2} active={pageStep === 2} onPress={() => navigation.navigate(stepNavigationLinks[2], {edit: props.bookingStep >= 3})}>
            <StepIndicator active={props.bookingStep >= 2}/>
        </StepIndicatorContainer>
        <StepFlowIndicator active={props.bookingStep >= 3}/>
        <StepIndicatorContainer disabled={props.bookingStep < 3} active={pageStep === 3} onPress={() => navigation.navigate(stepNavigationLinks[3], {edit: props.bookingStep >= 3})}>
            <StepIndicator active={props.bookingStep >= 3}/>
        </StepIndicatorContainer>
        <StepFlowIndicator active={props.bookingStep >= 4}/>
        <StepIndicatorContainer disabled={props.bookingStep < 4} active={pageStep === 4} onPress={() => navigation.navigate(stepNavigationLinks[4], {edit: props.bookingStep >= 3})}>
            <StepIndicator  active={props.bookingStep >= 4}/>
        </StepIndicatorContainer>
    </StepContainer>
}

const mapStateToProps = state => ({
    bookingStep: state.booking.step
})

export default connect(mapStateToProps, null)(BookingStepper)
