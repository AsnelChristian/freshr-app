import styled, { useTheme } from "styled-components/native";
import { connect } from "react-redux";
import { SafeArea } from "../../components/utils/safearea.component";
import { Gradient } from "./components/helpers.component";
import React, { useContext } from "react";
import { View } from "react-native";
import { PaddedContainer } from "../components/details-screen.component";
import { Spacer } from "../../components/spacer/spacer.component";
import { Text } from "../../components/typography/typography.component";
import { AuthContext } from "../../providers/auth/auth.context";
import Logo from "../../assets/Logo_C_FB.svg";
import { NavButton } from "../../components/button/button.component";
import { LogoContainer } from "../../components/logo/logo";


const WelcomeScreen = (props) => {
  const theme = useTheme();
  const { skipAuthentication } = useContext(AuthContext);

  return (
    <SafeArea>
      <View
        style={{
          flex: 1,
          flexDirection: "column-reverse",
          position: "relative",
          backgroundColor: theme.colors.brand.quaternary
        }}
      >
        <LogoContainer>
          <Logo width={300} height={200} fill={theme.colors.brand.secondary}/>
          <View style={{ marginBottom: 50 }} />
        </LogoContainer>
        <PaddedContainer>
          <NavButton
            style={{ backgroundColor: theme.colors.brand.primary }}
            onPress={() => props.navigation.navigate("select-auth")}
          >
            <Text variant="caption" style={{ color: "white", fontSize: 16 }}>
              Sign up / sign in
            </Text>
          </NavButton>
          <Spacer position="bottom" size="large" />
          <NavButton
            style={{
              backgroundColor: theme.colors.brand.secondary,
            }}
            onPress={skipAuthentication}
          >
            {/*<GlassBackground />*/}
            <Text
              variant="caption"
              style={{ color: "white", fontSize: 16 }}
            >
              Proceed without &rarr;
            </Text>
          </NavButton>
          <Spacer position="bottom" size="large" />
          <Spacer position="bottom" size="large" />
          <Spacer position="bottom" size="large" />
        </PaddedContainer>
      </View>
    </SafeArea>
  );
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen);
