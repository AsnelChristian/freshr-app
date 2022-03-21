import styled, {useTheme} from "styled-components/native";
import { connect } from "react-redux";
import {rgba} from "polished";
import {PaymentIcon} from 'react-native-payment-icons';

import {Spacer} from "../../components/spacer/spacer.component";
import {Text} from '../../components/typography/typography.component';
import {SectionTitle} from "../components/details-screen.component";
import React, {useEffect} from "react";
import {View} from "react-native";
import {Entypo} from "@expo/vector-icons";
import {
  ActionButton, ButtonContainer,
} from "../../components/button/process-action-button.component";
import {setBookingStep} from "../../redux/booking/booking.actions";
import BookingStepper from "../components/booking-step.component";


const Container = styled.ScrollView`
  flex: 1;
  background-color: white;
`;
const PaymentMethodContainer = styled.View`
  padding: ${({theme}) => theme.space[3]};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${({theme}) => theme.colors.ui.quaternary};
  border-radius: ${({theme}) => theme.sizes[1]} ;
  border: 2px solid ${({theme}) => rgba(theme.colors.ui.primary, 0.1)};
`

const PaymentMethodCardContainer = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
`

const EditButton = styled.View`
  width: 25px;
  height: 25px;
  border: 2px solid ${({theme}) => rgba(theme.colors.ui.primary, 0.15)};
  border-radius: 100px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`


const PaymentMethodRadio  = styled.View`
  width: 25px; 
  height: 25px;
  background-color: transparent;
  border-radius: 100px;
  border: 2px solid ${({active, theme}) => active ? theme.colors.brand.primary : rgba(theme.colors.ui.primary, 0.1)}; 
  align-items: center;
  justify-content: center;
`

const PaymentMethodRadioIndicator = styled.View`
  width: 10px;
  height: 10px;
  border-radius: 100px;
  background-color: ${({active, theme}) => active ? theme.colors.brand.primary  : "transparent" } ;
`

const Content = styled.View`
  padding: ${({theme}) => theme.space[3]};
`

const CheckoutScreen = ({ booking, setBookingStep, navigation }) => {
  const theme = useTheme();

  useEffect(() => {
    setBookingStep(4);
  }, [])
  return (
  <>
    {/*<BookingStepper pageStep={4} navigation={navigation}/>*/}
  <Container showsVerticalScrollIndicator={false}>
    <Content>
      <Spacer position="top" size="large"/>
      <SectionTitle>Choose payment method</SectionTitle>
      <Spacer position="bottom" size="large" />
      <Spacer position="bottom" size="medium" />
      <PaymentMethodContainer>
        <PaymentMethodCardContainer>
          <PaymentIcon type='visa' height={40}/>
          <Spacer position="left" size="medium"/>
          <View>
            <Text variant="caption" style={{fontSize: 16}}>**** **** **** 4809</Text>
            <Spacer position="bottom" size="small"/>
            <Text variant="caption" style={{fontWeight: "100"}}>expires 10/24</Text>
          </View>
        </PaymentMethodCardContainer>
        <EditButton>
          <Entypo name="edit" size={16} />
        </EditButton>
        <Spacer position="left" size="large"/>
        <PaymentMethodRadio active={true}>
          <PaymentMethodRadioIndicator active={true}/>
        </PaymentMethodRadio>
      </PaymentMethodContainer>
      <Spacer position="bottom" size="large" />
      <PaymentMethodContainer>
        <PaymentMethodCardContainer>
          <PaymentIcon type='master' height={40}/>
          <Spacer position="left" size="medium"/>
          <View>
            <Text variant="caption" style={{fontSize: 16}}>**** **** **** 4809</Text>
            <Spacer position="bottom" size="small"/>
            <Text variant="caption" style={{fontWeight: "100"}}>expires 10/24</Text>
          </View>
        </PaymentMethodCardContainer>
        <EditButton>
          <Entypo name="edit" size={16} />
        </EditButton>
        <Spacer position="left" size="large"/>
        <PaymentMethodRadio active={true}>
          <PaymentMethodRadioIndicator active={true}/>
        </PaymentMethodRadio>
      </PaymentMethodContainer>

      <Spacer position="bottom" size="large" />
      <PaymentMethodContainer>
        <PaymentMethodCardContainer>
          <PaymentIcon type='paypal' height={40}/>
          <Spacer position="left" size="medium"/>
          <View>
            <Text numberOfLines={1} variant="caption" style={{fontSize: 16}}>ab*****r@mail.com</Text>
          </View>
        </PaymentMethodCardContainer>
        <EditButton>
          <Entypo name="edit" size={16} />
        </EditButton>
        <Spacer position="left" size="large"/>
        <PaymentMethodRadio active={true}>
          <PaymentMethodRadioIndicator active={true}/>
        </PaymentMethodRadio>
      </PaymentMethodContainer>
    </Content>
    <Spacer position="bottom" size="large"/>
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
        height={55}
        onPress={() => navigation.navigate("BookingConfirm")}
    >
      <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
        Confirm and pay
      </Text>
    </ActionButton>
    </ButtonContainer>
    </>
  )
};



const mapStateToProps = (state) => ({
  booking: state.booking,
});

const mapDispatchToProps = (dispatch) => ({
  setBookingStep: (step) => dispatch(setBookingStep(step))
})

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutScreen);
