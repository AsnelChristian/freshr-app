import { connect } from "react-redux";
import styled, { useTheme } from "styled-components/native";
import { Formik } from "formik";
import * as yup from "yup";
import { Checkbox } from "react-native-paper";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  TouchableOpacity,
  View,
} from "react-native";

import { SafeArea } from "../../components/utils/safearea.component";
import React, { useContext, useState } from "react";
import { Spacer } from "../../components/spacer/spacer.component";
import { Text } from "../../components/typography/typography.component";
import { ActionButton, Row } from "./components/helpers.component";
import { setAuthorized } from "../../redux/auth/auth.actions";
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

const SignInScreen = (props) => {
  const theme = useTheme();
  const { onLogin, error, isLoading, skipAuthentication } =
    useContext(AuthContext);
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  if (isLoading) {
    return <LoadingScreen />;
  }
  const renderRememberRow = () => {
    return (
      <Row>
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={() => setRememberMe(!rememberMe)}
        >
          <Checkbox
            color={theme.colors.brand.primary}
            status={rememberMe ? "checked" : "unchecked"}
            onPress={() => setRememberMe(!rememberMe)}
          />
          <Spacer position="left" size="medium" />
          <Text variant="caption" style={{ color: theme.colors.ui.primary }}>
            Remember me
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={() => props.navigation.navigate("passwordReset")}
        >
          <Text variant="caption" style={{ color: theme.colors.brand.primary }}>
            Forgot password
          </Text>
          <Spacer position="left" size="small" />
        </TouchableOpacity>
      </Row>
    );
  };

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
            Welcome back
          </Text>
          <Spacer position="top" size="large" />
          <Text>Use your credentials below and login to your account</Text>
          <Spacer position="top" size="large" />
          {/*{error && <MessageBox message={error.message} status="failure" />}*/}
          <Spacer position="top" size="medium" />
          <Formik
            initialValues={{
              email: "",
              password: "",
              useEmail: true,
            }}
            onSubmit={(values) => {
              console.log(JSON.stringify(values));
              onLogin(values.email, values.password);
            }}
            validationSchema={yup.object().shape({
              useEmail: yup.boolean(),
              email: yup
                .string()
                .email()
                .when("useEmail", {
                  is: true,
                  then: yup.string().required("Must enter email address"),
                }),
              password: yup
                .string()
                .min(4)
                .max(10, "Password should not exceed 10 chars.")
                .when("useEmail", {
                  is: true,
                  then: yup.string().required("Must enter password"),
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
                {/*<View*/}
                {/*  style={{*/}
                {/*    flexDirection: "row",*/}
                {/*    alignItems: "center",*/}
                {/*    paddingVertical: 8,*/}
                {/*  }}*/}
                {/*>*/}
                {/*  <RadioButton*/}
                {/*    onPress={() => setFieldValue("useEmail", true)}*/}
                {/*    variant={values.useEmail ? "primary" : "secondary"}*/}
                {/*  >*/}
                {/*    <Text*/}
                {/*      variant="caption"*/}
                {/*      style={{*/}
                {/*        color: values.useEmail*/}
                {/*          ? "white"*/}
                {/*          : theme.colors.ui.primary,*/}
                {/*      }}*/}
                {/*    >*/}
                {/*      Email*/}
                {/*    </Text>*/}
                {/*  </RadioButton>*/}
                {/*  <Spacer position="left" size="large" />*/}
                {/*  <RadioButton*/}
                {/*    onPress={() => setFieldValue("useEmail", false)}*/}
                {/*    variant={!values.useEmail ? "primary" : "secondary"}*/}
                {/*  >*/}
                {/*    <Text*/}
                {/*      variant="caption"*/}
                {/*      style={{*/}
                {/*        color: !values.useEmail*/}
                {/*          ? "white"*/}
                {/*          : theme.colors.ui.primary,*/}
                {/*      }}*/}
                {/*    >*/}
                {/*      Phone number*/}
                {/*    </Text>*/}
                {/*  </RadioButton>*/}
                {/*</View>*/}
                <Spacer position="bottom" size="large" />
                {/*{values.useEmail ? (*/}

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
                {/*) : (*/}
                {/*  <VerifyPhone />*/}
                {/*)}*/}

                <Spacer position="bottom" size="large" />
                {/*{values.useEmail && renderRememberRow()}*/}
                {renderRememberRow()}
                <Spacer position="bottom" size="large" />
                <Spacer position="bottom" size="large" />
                <Spacer position="bottom" size="large" />
                {/*{values.useEmail && (*/}
                <View
                  style={{
                    alignItems: "center",
                  }}
                >
                  <ActionButton onPress={(e) => handleSubmit(e)}>
                    <Text style={{ color: "white", fontSize: 16 }}>
                      Log into your account
                    </Text>
                  </ActionButton>
                  <Spacer position="bottom" size="large" />
                </View>
              </View>
            )}
          </Formik>
        </View>
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          {renderAuthFormFooter({
            message: "Don't have an account?",
            messageLink: "Sign up here",
            navigation: props.navigation,
            navigationLink: "signup",
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
const mapDispatchToProps = (dispatch) => ({
  setAuthorized: () => dispatch(setAuthorized),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen);
