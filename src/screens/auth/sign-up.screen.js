import styled, { useTheme } from "styled-components/native";
import { connect } from "react-redux";
import { Formik } from "formik";

import { SafeArea } from "../../components/utils/safearea.component";
import React, { useContext, useRef, useState } from "react";
import { Spacer } from "../../components/spacer/spacer.component";
import { Text } from "../../components/typography/typography.component";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { ActionButton } from "./components/helpers.component";
import * as yup from "yup";
import {
  renderAuthFormFooter,
  renderAuthFormNav,
  renderEmailInput,
  renderPasswordInput,
} from "./components/form.component";
import { AuthContext } from "../../providers/auth/auth.context";
import { MessageBox } from "../../components/MessageBox/message-box.component";
import { LoadingScreen } from "../loading.screen";

const Container = styled.View`
  flex: 1;
  background-color: white;
  position: relative;
`;

const SignUpScreen = (props) => {
  const theme = useTheme();
  const { onRegister, error, isLoading, skipAuthentication } =
    useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  if (isLoading) {
    return <LoadingScreen />;
  }

  const renderForm = () => {
    return (
      <View
        style={{
          position: "relative",
          flex: 1,
          backgroundColor: "white",
        }}
      >
        <View style={{ paddingHorizontal: 20 }}>
          <Spacer position="top" size="large" />
          <Spacer position="top" size="large" />
          <Spacer position="top" size="large" />
          <Text variant="caption" style={{ fontSize: 30 }}>
            Create account
          </Text>
          <Spacer position="top" size="large" />
          <Text>Let us know what are you name, email and password</Text>
          <Spacer position="top" size="large" />
          {/*{error && <MessageBox message={error.message} status="failure" />}*/}

          <Spacer position="top" size="large" />
          <Spacer position="top" size="large" />
          <Formik
            initialValues={{
              email: "",
              password: "",
              confirmPassword: "",
            }}
            onSubmit={(values) => {
              console.log(JSON.stringify(values));
              onRegister(values);
            }}
            validationSchema={yup.object().shape({
              email: yup.string().email().required(),
              password: yup
                .string()
                .min(6)
                .max(10, "Password should not exceed 10 chars.")
                .required(),
              confirmPassword: yup
                .string()
                .required("Please confirm your password")
                .oneOf([yup.ref("password"), null], "Passwords must match"),
            })}
          >
            {({
              values,
              handleChange,
              errors,
              setFieldTouched,
              touched,
              isValid,
              handleSubmit,
            }) => (
              <View>
                {renderEmailInput({
                  values,
                  handleChange,
                  errors,
                  setFieldTouched,
                  touched,
                  theme,
                })}
                <Spacer position="bottom" size="large" />
                {renderPasswordInput({
                  values,
                  handleChange,
                  errors,
                  setFieldTouched,
                  touched,
                  showPassword,
                  setShowPassword,
                  theme,
                  value: "password",
                  message: "Please enter password",
                })}
                <Spacer position="bottom" size="large" />
                {renderPasswordInput({
                  values,
                  handleChange,
                  errors,
                  setFieldTouched,
                  touched,
                  showPassword: showConfirmPassword,
                  setShowPassword: setShowConfirmPassword,
                  theme,
                  value: "confirmPassword",
                  message: "Please confirm password",
                })}
                <Spacer position="bottom" size="large" />
                <Spacer position="bottom" size="large" />
                <Spacer position="top" size="large" />
                <Spacer position="top" size="large" />
                <View
                  style={{
                    alignItems: "center",
                  }}
                >
                  <ActionButton onPress={(e) => handleSubmit(e)}>
                    <Text style={{ color: "white", fontSize: 16 }}>
                      create account
                    </Text>
                  </ActionButton>
                </View>
              </View>
            )}
          </Formik>
          <Spacer position="top" size="large" />
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);
