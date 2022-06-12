import styled, { useTheme } from "styled-components/native";
import { SafeArea } from "../../components/utils/safearea.component";
import { rgba } from "polished";
import { Spacer } from "../../components/spacer/spacer.component";
import { Text } from "../../components/typography/typography.component";
import React, { useContext, useState } from "react";
import {
  ActionButton,
  CartItemCountContainer,
  PositioningContainer,
} from "../../components/button/process-action-button.component";
import { View } from "react-native";
import { Fontisto } from "@expo/vector-icons";
import { PreferencesContext } from "../../providers/preferences.provider";
import { LoadingScreen } from "../loading.screen";
import { AuthContext } from "../../providers/auth/auth.context";

const Container = styled.View`
  flex: 1;
  background-color: #fafafa;
  padding: 16px;
`;

const Content = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;
const SelectButtonBase = styled.TouchableOpacity.attrs((props) => ({
  shadowColor: props.theme.colors.brand.quaternary,
  shadowOffset: { width: 0, height: 0.5 },
  shadowRadius: 1,
  shadowOpacity: 0.13,
  elevation: 2,
}))`
  border-radius: 15px;
  border-width: 0px;
  border-style: solid;
  border-color: ${({ active, theme }) =>
    active
      ? theme.colors.brand.secondary
      : rgba(theme.colors.brand.quaternary, 0.1)};
  background-color: ${({ active, theme }) =>
    active ? theme.colors.brand.secondary : "white"};
  flex-direction: column;
  justify-content: center;
  position: relative;
  padding: 16px;
`;

export const LongSelectButton = styled(SelectButtonBase)`
  min-height: 120px;
  background-color: ${({ active, theme }) =>
    active ? theme.colors.brand.quaternary : "white"};
  border-color: ${({ active, theme }) =>
    active
      ? theme.colors.brand.quaternary
      : rgba(theme.colors.brand.quaternary, 0.1)};
`;

export const SelectButton = styled(SelectButtonBase)`
  min-height: 220px;
  flex: 1;
  align-items: center;
`;

const createGenderScreen = ({
  title,
  choices,
  navigateTo,
  method,
  step = "",
}) => {
  return ({ navigation }) => {
    const theme = useTheme();
    const [gender, setGender] = useState(choices[0].value);
    const {
      isLoading,
      updateGenderPreference,
      updateProGenderPreference,
      error,
    } = useContext(PreferencesContext);
    const { onOnboarding } = useContext(AuthContext);

    if (isLoading) {
      return <LoadingScreen />;
    }
    return (
      <SafeArea>
        <Container>
          <Content>
            <Text variant="caption" style={{ fontSize: 24 }}>
              {title}
            </Text>
            <Spacer position="bottom" size="large" />
            <Spacer position="bottom" size="large" />
            <Spacer position="bottom" size="large" />
            <Spacer position="bottom" size="large" />
            <Spacer position="bottom" size="large" />
            <LongSelectButton
              active={gender === choices[0].value}
              onPress={() => setGender(choices[0].value)}
            >
              <Text
                variant="caption"
                style={{
                  fontSize: 16,
                  color:
                    gender !== choices[0].value
                      ? theme.colors.brand.quaternary
                      : "white",
                }}
              >
                {choices[0].title}
              </Text>
              <Spacer position="bottom" size="large" />
              <Text
                variant="caption"
                style={{
                  fontSize: 12,
                  color:
                    gender !== "none" ? theme.colors.brand.quaternary : "white",
                }}
              >
                {choices[0].description}
              </Text>
            </LongSelectButton>
            <Spacer position="bottom" size="large" />

            <ButtonContainer>
              <SelectButton
                active={gender === choices[1].value}
                onPress={() => setGender(choices[1].value)}
              >
                <Fontisto
                  name={choices[1].value}
                  size={80}
                  color={
                    gender !== choices[1].value
                      ? theme.colors.brand.quaternary
                      : "white"
                  }
                />
                <Spacer position="bottom" size="large" />
                <Text
                  variant="caption"
                  style={{
                    fontSize: 14,
                    color:
                      gender !== choices[1].value
                        ? theme.colors.brand.quaternary
                        : "white",
                  }}
                >
                  {choices[1].title}
                </Text>
              </SelectButton>
              <Spacer position="right" size="large" />
              <SelectButton
                active={gender === choices[2].value}
                onPress={() => setGender(choices[2].value)}
              >
                <Fontisto
                  name="female"
                  size={80}
                  color={
                    gender !== choices[2].value
                      ? theme.colors.brand.quaternary
                      : "white"
                  }
                />
                <Spacer position="bottom" size="large" />
                <Text
                  variant="caption"
                  style={{
                    fontSize: 14,
                    color:
                      gender !== "female"
                        ? theme.colors.brand.quaternary
                        : "white",
                  }}
                >
                  {choices[2].title}
                </Text>
              </SelectButton>
            </ButtonContainer>
            <Spacer position="bottom" size="large" />
            <Spacer position="bottom" size="large" />
            <Spacer position="bottom" size="large" />
            <Spacer position="bottom" size="large" />
            <Spacer position="bottom" size="large" />
          </Content>
        </Container>
        <View>
          <ButtonContainer>
            <Spacer position="left" size="large" />

            <ActionButton
              height={55}
              onPress={() => {
                if (method === "styles") {
                  updateGenderPreference(gender).then(() => {
                    if (step === "last") {
                      return onOnboarding();
                    } else {
                      return !error ? navigation.navigate(navigateTo) : null;
                    }
                  });
                } else {
                  updateProGenderPreference(gender).then(() => {
                    if (step === "last") {
                      return onOnboarding();
                    } else {
                      return !error ? navigation.navigate(navigateTo) : null;
                    }
                  });
                }
              }}
            >
              <Text
                style={{ color: "white", fontWeight: "bold", fontSize: 16 }}
              >
                Confirm and proceed
              </Text>
            </ActionButton>
            <Spacer position="right" size="large" />
          </ButtonContainer>
          <Spacer position="bottom" size="large" />
          <Spacer position="bottom" size="large" />
        </View>
      </SafeArea>
    );
  };
};

export const SetGenderScreen = createGenderScreen({
  title: "Search styles for",
  choices: [
    {
      value: "none",
      title: "No preference",
      description: "Search styles for all genders",
    },
    {
      value: "male",
      title: "Styles for male",
    },
    {
      value: "female",
      title: "Styles for female",
    },
  ],
  method: "styles",
  navigateTo: "setSearchProGender",
});

export const SetProGenderScreen = createGenderScreen({
  title: "Pro preferences",
  choices: [
    {
      value: "none",
      title: "No preference",
      description: "It does not matter to you ;)",
    },
    {
      value: "male",
      title: "A male professional",
    },
    {
      value: "female",
      title: "A female professional",
    },
  ],
  method: "pro",
  navigateTo: "app",
  step: "last",
});
