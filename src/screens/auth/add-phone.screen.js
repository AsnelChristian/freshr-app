import { connect } from "react-redux";
import styled, { useTheme } from "styled-components/native";
import { showMessage } from "react-native-flash-message";
import { View } from "react-native";

import { SafeArea } from "../../components/utils/safearea.component";
import React, { useContext, useEffect, useRef } from "react";
import { Spacer } from "../../components/spacer/spacer.component";
import { Text } from "../../components/typography/typography.component";
import { setAuthorized } from "../../redux/auth/auth.actions";
import { renderAuthFormNav, VerifyPhone } from "./components/form.component";
import { phoneRegExp } from "../../constants";
import { AuthContext } from "../../providers/auth/auth.context";

const Container = styled.View`
  flex: 1;
  background-color: white;
  position: relative;
`;

const AddPhoneScreen = (props) => {
  const theme = useTheme();
  const { verified, skipAuthentication } = useContext(AuthContext);

  useEffect(() => {
    if (verified) {
      props.navigation.navigate("setLocation");
    }
  }, [verified]);

  const renderForm = () => {
    return (
      <View
        style={{
          position: "relative",
          backgroundColor: "white",
          flex: 1,
        }}
      >
        <View style={{ paddingHorizontal: 20 }}>
          <Spacer position="top" size="large" />
          <Spacer position="top" size="large" />
          <Spacer position="top" size="large" />
          <Text variant="caption" style={{ fontSize: 30 }}>
            Welcome to Freshr
          </Text>
          <Spacer position="top" size="large" />
          <Text>Please add a phone number</Text>
          <Spacer position="top" size="large" />
          <Spacer position="top" size="large" />
          <Spacer position="top" size="large" />
          <VerifyPhone />
        </View>
        <View style={{ flex: 1, justifyContent: "flex-end" }} />
      </View>
    );
  };

  return (
    <SafeArea>
      <Container>
        {renderAuthFormNav({
          navigation: props.navigation,
          skipAuthentication,
          theme,
        })}
        {renderForm()}
      </Container>
    </SafeArea>
  );
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
  setAuthorized: () => dispatch(setAuthorized),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPhoneScreen);
