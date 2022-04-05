import { connect } from "react-redux";
import styled, { useTheme } from "styled-components/native";
import { SafeArea } from "../../components/utils/safearea.component";
import { renderFooter } from "./utils";
import { Spacer } from "../../components/spacer/spacer.component";
import {
  PaddedContainer,
  SectionTitle,
} from "../components/details-screen.component";
import { Text } from "../../components/typography/typography.component";
import React, { useState } from "react";
import { TextInput } from "react-native-paper";
import { View } from "react-native";

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

//justify-content: center;

const Content = styled.View`
  flex: 1;
`;

const FormContainer = styled.View`
  position: relative;
`;

const FormInput = styled(TextInput).attrs((props) => ({
  mode: "outlined",
  color: props.theme.colors.ui.primary,
  maxLength: 50,
  numberOfLines: 3,
  multiline: true,
  textAlign: { undefined },
  theme: {
    colors: {
      primary: props.theme.colors.ui.primary,
      text: props.theme.colors.ui.primary,
    },
  },
}))`
  width: 100%;
  height: 200px;
  font-size: 40px;
  font-weight: bold;
  padding: 0 10px;
`;

const LengthIndicator = styled.View`
  position: absolute;
  bottom: 5px;
  right: 5px;
`;

const FacilityNameScreen = (props) => {
  const theme = useTheme();
  const [facilityName, setFacilityName] = useState("");
  const [inputLength, setInputLength] = useState(0);

  const renderForm = () => (
    <FormContainer>
      <FormInput
        label="Facility's name"
        value={facilityName}
        onChangeText={(text) => {
          setFacilityName(text);
          setInputLength(text.length);
        }}
      />
      <LengthIndicator>
        <Text style={{ fontSize: 18, color: "gray" }}>{inputLength} / 50</Text>
      </LengthIndicator>
    </FormContainer>
  );
  return (
    <SafeArea>
      <Container>
        <View
          style={{ flex: 0.7, backgroundColor: theme.colors.brand.primary }}
        />
        <Content>
          <Spacer position="bottom" size="medium" />
          <Spacer position="bottom" size="large" />
          <PaddedContainer>
            <SectionTitle>Name</SectionTitle>
            <Spacer position="bottom" size="medium" />
            <Text variant="caption" style={{ lineHeight: 22 }}>
              What is the name of your facility
            </Text>
            <Spacer position="bottom" size="medium" />
            <Spacer position="bottom" size="large" />
            {renderForm()}
          </PaddedContainer>
        </Content>
        {renderFooter(props.navigation, "SetFacilityHighlight")}
      </Container>
    </SafeArea>
  );
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(FacilityNameScreen);
