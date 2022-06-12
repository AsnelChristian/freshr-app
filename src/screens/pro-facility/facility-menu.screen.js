import { connect } from "react-redux";
import styled from "styled-components/native";
import { SafeArea } from "../../components/utils/safearea.component";
import {
  HeaderContainer,
  PaddedContainer,
  PageTitle,
  SectionTitle,
} from "../components/details-screen.component";
import { Spacer } from "../../components/spacer/spacer.component";
import { View } from "react-native";
import {
  LogoutButton,
  ProfileButton,
} from "../components/profile.helper.component";
import {
  AntDesign,
  Entypo,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Separator } from "../../components/helpers/helpers.component";
import { Text } from "../../components/typography/typography.component";
import React, { useContext } from "react";
import { AppContext } from "../../providers/app-provider";

const Container = styled.ScrollView`
  flex: 1;
  background-color: white;
`;

const FacilityMenuScreen = (props) => {
  const {changeApp} = useContext(AppContext)
  const renderHeader = () => {
    return (
      <HeaderContainer>
        <Spacer position="top" size="large" />
        <Spacer position="top" size="large" />
        <PageTitle>Menu</PageTitle>
      </HeaderContainer>
    );
  };

  const renderButtons = () => {
    return (
      <>
        <View>
          <ProfileButton
            icon={
              <MaterialCommunityIcons
                name="account-circle-outline"
                size={28}
                color="black"
              />
            }
            label="Personal information"
          />
          <ProfileButton
            icon={<MaterialIcons name="payments" size={28} color="black" />}
            label="Payment methods"
          />
          <ProfileButton
            icon={<MaterialIcons name="payments" size={28} color="black" />}
            label="Subscription plan"
            onPress={() =>
              props.navigation.navigate("SubscriptionPlanFacility")
            }
          />
          <Separator />
        </View>
        <Spacer position="bottom" size="large" />
        <Spacer position="bottom" size="medium" />
        <SectionTitle variant="label">Accounts</SectionTitle>
        <Spacer position="bottom" size="large" />
        <View>
          <ProfileButton
            icon={<AntDesign name="swap" size={28} color="black" />}
            onPress={() => changeApp('normal')
              // props.navigation.reset({
              //   index: 0,
              //   routes: [{ name: "app" }],
              // })
            }
            label="Switch to customer's account"
          />
          <ProfileButton
            icon={<AntDesign name="swap" size={28} color="black" />}
            onPress={() => changeApp('specialist')
              // props.navigation.reset({
              //   index: 0,
              //   routes: [{ name: "proAppService" }],
              // })
            }
            label="Switch service provider account"
          />
          <Separator />
        </View>
        <Spacer position="bottom" size="large" />
        <Spacer position="bottom" size="medium" />
        <SectionTitle variant="label">Legal</SectionTitle>
        <Spacer position="bottom" size="large" />
        <View>
          <ProfileButton
            icon={
              <MaterialIcons
                name="chrome-reader-mode"
                size={28}
                color="black"
              />
            }
            label="Terms of service"
          />
          <Separator />
        </View>
        <Spacer position="bottom" size="large" />
        <Spacer position="bottom" size="medium" />
        <SectionTitle variant="label">Info</SectionTitle>
        <Spacer position="bottom" size="large" />
        <View>
          <ProfileButton
            icon={<Feather name="help-circle" size={24} color="black" />}
            label="Help"
          />
          <ProfileButton
            icon={<Entypo name="list" size={28} color="black" />}
            label="FAQ"
          />
          <Separator />
        </View>
        <Spacer position="bottom" size="large" />
        <Spacer position="bottom" size="large" />
        <LogoutButton>
          <Ionicons name="log-out-sharp" size={28} color="black" />
          <Spacer position="left" size="medium" />
          <Text variant="label" style={{ fontSize: 14, fontWeight: "bold" }}>
            Log out
          </Text>
        </LogoutButton>
        <Spacer position="bottom" size="large" />
      </>
    );
  };

  return (
    <SafeArea>
      <Container showsVerticalScrollIndicator={false}>
        {renderHeader()}
        <Spacer position="bottom" size="large" />
        <PaddedContainer>{renderButtons()}</PaddedContainer>
      </Container>
    </SafeArea>
  );
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(FacilityMenuScreen);
