import {
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import {
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/typography.component";
import React, { useContext, useRef, useState } from "react";
import { ActionButton, InputContainer } from "./helpers.component";
import PhoneInput from "react-native-phone-number-input";
import {
  NavButton,
  TopNavContainer,
} from "../../pro-specialist/components/top-nav.component";
import { rgba } from "polished";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { useTheme } from "styled-components";
import { AuthContext } from "../../../providers/auth/auth.context";

export const renderEmailInput = ({
  values,
  handleChange,
  errors,
  setFieldTouched,
  touched,
  isValid,
  theme,
}) => {
  return (
    <>
      <InputContainer>
        <MaterialCommunityIcons
          name="email-outline"
          size={22}
          color={theme.colors.brand.primary}
        />

        <TextInput
          type="email"
          textContentType="emailAddress"
          keyboardType="email-address"
          color={theme.colors.ui.primary}
          onChangeText={handleChange("email")}
          value={values.email}
          onBlur={() => setFieldTouched("email")}
          placeholder="Enter your email"
          style={{ flex: 1, paddingHorizontal: 8 }}
        />
        {touched.email && !errors.email && (
          <Ionicons
            name="checkmark-circle"
            size={24}
            color={theme.colors.brand.primary}
          />
        )}
        {touched.email && errors.email && (
          <MaterialIcons name="error-outline" size={24} color={"red"} />
        )}
      </InputContainer>
      {touched.email && errors.email && (
        <View>
          <Spacer position="top" size="small" />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialIcons name="error-outline" size={14} color={"red"} />
            <Spacer position="left" size="small" />

            <Text style={{ fontSize: 12, color: "#FF0D10" }}>
              {errors.email}
            </Text>
          </View>
          <Spacer position="top" size="small" />
        </View>
      )}
    </>
  );
};

export const renderPasswordInput = ({
  values,
  handleChange,
  errors,
  setFieldTouched,
  touched,
  isValid,
  theme,
  showPassword,
  setShowPassword,
  value,
  message,
}) => {
  return (
    <>
      <InputContainer>
        <Ionicons
          name="md-lock-closed-outline"
          size={24}
          color={theme.colors.brand.primary}
        />

        <TextInput
          secureTextEntry={!showPassword}
          color={theme.colors.ui.primary}
          textContentType="password"
          autoCapitalize="none"
          onChangeText={handleChange(value)}
          onBlur={() => setFieldTouched(value)}
          value={values[value]}
          placeholder={message}
          style={{ flex: 1, paddingHorizontal: 8 }}
        />
        <TouchableOpacity
          style={{
            height: 50,
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 8,
          }}
          onPress={() => setShowPassword(!showPassword)}
        >
          {!showPassword ? (
            <Ionicons
              name="eye"
              size={16}
              color={theme.colors.brand.quaternary}
            />
          ) : (
            <Ionicons
              name="eye-off"
              size={16}
              color={theme.colors.brand.quaternary}
            />
          )}
        </TouchableOpacity>
      </InputContainer>
      {touched[value] && errors[value] && (
        <View>
          <Spacer position="top" size="small" />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialIcons name="error-outline" size={14} color={"red"} />
            <Spacer position="left" size="small" />

            <Text style={{ fontSize: 12, color: "#FF0D10" }}>
              {errors[value]}
            </Text>
          </View>
          <Spacer position="top" size="small" />
        </View>
      )}
    </>
  );
};

export const VerifyPhone = () => {
  const theme = useTheme();
  const phoneInput = useRef();
  const { verifyPhone, sendVerificationCode, isSent } = useContext(AuthContext);
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [inputTouched, setInputTouched] = useState(false);
  const [message, showMessage] = useState(null);

  const [formattedPhone, setFormattedPhone] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: 6 });
  const [inputprops, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 30,
        }}
      >
        <PhoneInput
          ref={phoneInput}
          defaultCode="US"
          layout="first"
          value={phone}
          onChangeText={(text) => setPhone(text)}
          textInputProps={{
            onBlur: () => setInputTouched(true),
          }}
          onChangeFormattedText={(text) => setFormattedPhone(text)}
          containerStyle={{
            flex: 1,
            elevation: 3,
            borderRadius: 30,
            flexDirection: "row",
            zIndex: 1,
            position: "relative",
          }}
          countryPickerButtonStyle={{
            height: 50,
            // backgroundColor: "red",
          }}
          textContainerStyle={{
            // backgroundColor: "yellow",
            height: 50,
            paddingVertical: 8,
          }}
          withShadow
        />
        <TouchableOpacity
          disable={!phone}
          style={{
            height: 48,
            paddingHorizontal: 16,
            borderTopRightRadius: 30,
            borderBottomRightRadius: 30,
            backgroundColor: theme.colors.brand.quaternary,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => sendVerificationCode(formattedPhone, true)}
        >
          <Feather name="send" size={16} color="white" />
          <Spacer position="left" size="medium" />
          <Text
            variant="caption"
            style={{
              fontSize: 14,
              color: "white",
            }}
          >
            send code
          </Text>
        </TouchableOpacity>
      </View>
      {/*{inputTouched && !isValid && (*/}
      {/*  <View>*/}
      {/*    <Spacer position="top" size="small" />*/}
      {/*    <View style={{ flexDirection: "row", alignItems: "center" }}>*/}
      {/*      <MaterialIcons name="error-outline" size={14} color={"red"} />*/}
      {/*      <Spacer position="left" size="small" />*/}

      {/*      <Text style={{ fontSize: 12, color: "#FF0D10" }}>*/}
      {/*        Please enter a valid phone number*/}
      {/*      </Text>*/}
      {/*    </View>*/}
      {/*    <Spacer position="top" size="small" />*/}
      {/*  </View>*/}
      {/*)}*/}
      <Spacer position="bottom" size="large" />
      <Spacer position="bottom" size="large" />
      {isSent && (
        <CodeField
          ref={ref}
          {...inputprops}
          caretHidden={true}
          // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
          value={value}
          onChangeText={setValue}
          cellCount={6}
          // rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({ index, symbol, isFocused }) => (
            <Text
              variant="caption"
              key={index}
              style={[
                {
                  width: 40,
                  height: 40,
                  marginBottom: -4,
                  lineHeight: 38,
                  fontSize: 24,
                  borderWidth: 2,
                  borderColor: "#00000030",
                  textAlign: "center",
                },
                isFocused && {
                  borderColor: theme.colors.brand.quaternary,
                },
              ]}
              onLayout={getCellOnLayoutHandler(index)}
            >
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />
      )}
      <Spacer position="bottom" size="large" />
      <Spacer position="bottom" size="large" />
      <View
        style={{
          alignItems: "center",
        }}
      >
        <Spacer position="bottom" size="large" />
        <Spacer position="bottom" size="large" />
        {value.length >= 6 && (
          <>
            {!isLoading ? (
              <ActionButton onPress={() => verifyPhone(value)}>
                <Text style={{ color: "white", fontSize: 16 }}>
                  Verify phone number
                </Text>
              </ActionButton>
            ) : (
              <ActivityIndicator
                animating={true}
                color={theme.colors.brand.quaternary}
              />
            )}
          </>
        )}
      </View>
    </View>
  );
};

export const renderAuthFormFooter = ({
  theme,
  navigation,
  message,
  messageLink,
  navigationLink,
}) => {
  return (
    <View>
      <Spacer position="top" size="large" />
      <Spacer position="top" size="large" />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text variant="caption" style={{ fontSize: 14 }}>
          {`${message} `}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate(navigationLink)}>
          <Text
            variant="caption"
            style={{ fontSize: 14, color: theme.colors.brand.primary }}
          >
            {`${messageLink}`}
          </Text>
        </TouchableOpacity>
      </View>
      <Spacer position="top" size="large" />
      <Spacer position="top" size="large" />
      <Spacer position="top" size="large" />
    </View>
  );
};

export const renderAuthFormNav = ({
  navigation,
  skipAuthentication,
  theme,
}) => {
  return (
    <TopNavContainer
      active={true}
      style={{ backgroundColor: "white", borderRadius: 0 }}
    >
      <View>
        <NavButton color="white" onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </NavButton>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            padding: 8,
            paddingHorizontal: 12,
            backgroundColor: rgba(theme.colors.brand.muted, 0.5),
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 30,
          }}
          onPress={skipAuthentication}
        >
          <Text
            variant="caption"
            style={{ color: theme.colors.brand.quaternary }}
          >
            proceed without
          </Text>
          <Spacer position="left" size="small" />
          <Ionicons
            name="arrow-forward"
            size={16}
            color={theme.colors.brand.quaternary}
          />
        </TouchableOpacity>
      </View>
    </TopNavContainer>
  );
};
