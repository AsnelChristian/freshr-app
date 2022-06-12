import styled, { useTheme } from "styled-components/native";
import { connect } from "react-redux";
import { SafeArea } from "../../components/utils/safearea.component";
import React, { useContext, useRef, useState } from "react";
import { Spacer } from "../../components/spacer/spacer.component";
import { Text } from "../../components/typography/typography.component";
import { TouchableOpacity, View } from "react-native";
import { ActionButton, RadioButton } from "./components/helpers.component";
import { Formik } from "formik";
import * as yup from "yup";
import {
  renderAuthFormFooter,
  renderAuthFormNav,
  renderEmailInput,
} from "./components/form.component";
import { AuthContext } from "../../providers/auth/auth.context";

const Container = styled.View`
  flex: 1;
  background-color: white;
  position: relative;
`;

const PasswordResetScreen = (props) => {
  const theme = useTheme();
  const { skipAuthentication } = useContext(AuthContext);

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
            Forgot password
          </Text>
          <Spacer position="top" size="large" />
          <Text>Enter email or phone number to reset your password</Text>
          <Spacer position="top" size="large" />
          <Spacer position="top" size="large" />
          <Spacer position="top" size="large" />
          <Formik
            initialValues={{
              email: "",
            }}
            onSubmit={(values) => {
              console.log(JSON.stringify(values));
            }}
            validationSchema={yup.object().shape({
              email: yup
                .string()
                .email()
                .when("useEmail", {
                  is: true,
                  then: yup.string().required("Must enter email address"),
                }),
            })}
          >
            {({
              values,
              handleChange,
              errors,
              setFieldTouched,
              setFieldValue,
              touched,
              isValid,
              handleSubmit,
            }) => (
              <View>
                <Spacer position="bottom" size="large" />

                {renderEmailInput({
                  values,
                  handleChange,
                  errors,
                  setFieldTouched,
                  touched,
                  theme,
                })}

                <Spacer position="bottom" size="large" />
                <Spacer position="bottom" size="large" />
                <Spacer position="bottom" size="large" />
                <View
                  style={{
                    alignItems: "center",
                  }}
                >
                  <ActionButton
                    onPress={(e) => handleSubmit(e)}
                    disabled={!isValid}
                  >
                    <Text style={{ color: "white", fontSize: 16 }}>
                      Reset password
                    </Text>
                  </ActionButton>
                </View>
              </View>
            )}
          </Formik>
        </View>
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          {renderAuthFormFooter({
            message: "Already have an account",
            messageLink: "Sign in here",
            navigation: props.navigation,
            navigationLink: "signin",
            theme,
          })}
        </View>
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
const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PasswordResetScreen);
