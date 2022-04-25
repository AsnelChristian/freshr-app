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
import {
  FormDescriptionInput,
  LengthIndicator,
} from "./components/pro-facility-form-helper";

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const Content = styled.View`
  flex: 1;
  background-color: white;
`;

const FormContainer = styled.View`
  position: relative;
`;

const FacilityDescriptionScreen = (props) => {
  const theme = useTheme();
  const [facilityDescription, setFacilityDescription] = useState("");
  const [inputLength, setInputLength] = useState(0);

  const renderForm = () => (
    <FormContainer>
      <FormDescriptionInput
        label="Facility's description"
        value={facilityDescription}
        onChangeText={(text) => {
          setFacilityDescription(text);
          setInputLength(text.length);
        }}
      />
      <LengthIndicator>
        <Text style={{ fontSize: 18, color: "gray" }}>{inputLength} / 280</Text>
      </LengthIndicator>
    </FormContainer>
  );

  return (
    <SafeArea>
      <Container style={{ backgroundColor: theme.colors.brand.primary }}>
        <View
          style={{ flex: 1, backgroundColor: theme.colors.brand.primary }}
        />
        <Content style={{ borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>
          <Spacer position="bottom" size="medium" />
          <Spacer position="bottom" size="large" />
          <PaddedContainer style={{ flex: 1 }}>
            <SectionTitle>Description</SectionTitle>
            <Spacer position="bottom" size="medium" />
            <Text variant="caption" style={{ lineHeight: 22 }}>
              How do you describe your facility
            </Text>
            <Spacer position="bottom" size="medium" />
            <Spacer position="bottom" size="large" />
            {renderForm()}
          </PaddedContainer>
        </Content>
        {renderFooter(props.navigation, "SetFacilityHours")}
      </Container>
    </SafeArea>
  );
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FacilityDescriptionScreen);
