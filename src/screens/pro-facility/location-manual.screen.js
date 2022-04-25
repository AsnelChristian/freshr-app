import styled from "styled-components/native";
import { connect } from "react-redux";

import { SafeArea } from "../../components/utils/safearea.component";
import {
  Footer,
  FooterRow,
  HeaderContainer,
  PaddedContainer,
  PageTitle,
} from "../components/details-screen.component";
import { Separator } from "../../components/helpers/helpers.component";
import { ModalButton } from "../../components/button/button.component";
import { AntDesign } from "@expo/vector-icons";
import { Spacer } from "../../components/spacer/spacer.component";
import { Text } from "../../components/typography/typography.component";
import React from "react";
import { TextInput } from "react-native-paper";
import { View } from "react-native";

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

export const FormInput = styled(TextInput).attrs((props) => ({
  mode: "outlined",
  color: props.theme.colors.ui.primary,
  numberOfLines: 1,
  textAlign: { undefined },
  theme: {
    colors: {
      primary: props.theme.colors.ui.primary,
      text: props.theme.colors.ui.primary,
    },
  },
}))`
  font-size: 14px;
  background-color: white;
  height: 50px;
  font-weight: bold;
`;

const LocationManualScreen = (props) => {
  const renderHeader = () => {
    return (
      <HeaderContainer>
        <Spacer position="top" size="large" />
        <Spacer position="top" size="large" />
        <PageTitle>Address</PageTitle>
      </HeaderContainer>
    );
  };
  const renderFooter = () => {
    return (
      <Footer>
        <Separator />
        <FooterRow>
          <ModalButton onPress={() => props.navigation.goBack()}>
            {/*<AntDesign name="arrowleft" size={16} color="black" />*/}
            <Spacer position="left" size="small" />
            <Text>Cancel</Text>
          </ModalButton>
          <ModalButton variant="primary" onPress={() => ""}>
            <Text style={{ color: "white" }}>Apply</Text>
            <Spacer position="left" size="small" />
            <AntDesign name="arrowright" size={16} color="white" />
          </ModalButton>
        </FooterRow>
      </Footer>
    );
  };

  const renderForm = () => {
    return (
      <View>
        <FormInput
          value={"Auf dem Hellen weyer 2"}
          label="Street"
          onChangeText={(text) => null}
        />
        <Spacer position="bottom" size="large" />
        <FormInput
          value={""}
          label="Apartment, suite, (optional)"
          onChangeText={(text) => null}
        />
        <Spacer position="bottom" size="large" />
        <FormInput
          value={"Koblenz"}
          label="Town"
          onChangeText={(text) => null}
        />
        <Spacer position="bottom" size="large" />
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <FormInput
            value={"NRW"}
            label="Region"
            onChangeText={(text) => null}
            style={{ flex: 1 }}
          />
          <Spacer position="left" size="medium" />
          <FormInput
            value={"56072"}
            label="Postal code"
            onChangeText={(text) => null}
            style={{ flex: 1 }}
          />
        </View>
        <Spacer position="bottom" size="large" />
        <FormInput
          value={"Germany"}
          label="Country"
          onChangeText={(text) => null}
        />
      </View>
    );
  };
  return (
    <SafeArea>
      <Container>
        {renderHeader()}
        <PaddedContainer>{renderForm()}</PaddedContainer>
      </Container>
      {renderFooter()}
    </SafeArea>
  );
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationManualScreen);
