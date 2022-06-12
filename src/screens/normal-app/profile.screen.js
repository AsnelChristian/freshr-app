import { connect } from "react-redux";
import styled, { useTheme } from "styled-components/native";
import { View } from "react-native";
import { Spacer } from "../../components/spacer/spacer.component";
import { Text } from "../../components/typography/typography.component";
import { SafeArea } from "../../components/utils/safearea.component";
import { SectionTitle } from "../components/details-screen.component";
import { Separator } from "../../components/helpers/helpers.component";
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import {
  LogoutButton,
  ProfileButton,
  Avatar,
} from "../components/profile.helper.component";
import { AuthContext } from "../../providers/auth/auth.context";
import { useContext } from "react";
import { LoadingScreen } from "../loading.screen";
import { AppContext } from "../../providers/app-provider";

const Container = styled.ScrollView`
  flex: 1;
  padding: ${({ theme }) => theme.space[3]};
  background-color: white;
`;
const Header = styled.View`
  align-items: center;
`;

const ProfileScreen = (props) => {
  const theme = useTheme();
  const {currentApp, changeApp} = useContext(AppContext);
  const {isLoading, user} = useContext(AuthContext)
  const coverImage =
    "https://st2.depositphotos.com/1009634/7235/v/950/depositphotos_72350117-stock-illustration-no-user-profile-picture-hand.jpg";
  const name = "John doe";
  const email = "johndoe@mail.com";

  const renderHeader = () => {
    return (
      <Header>
        <Spacer position="bottom" size="large" />
        <Avatar source={{ uri: coverImage }} />
        <Spacer position="bottom" size="medium" />
        <Text
          variant="label"
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color: theme.colors.ui.primary,
          }}
        >
          {name}
        </Text>
        <Spacer position="bottom" size="medium" />
        <Text
          variant="label"
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color: theme.colors.ui.primary,
          }}
        >
          {email}
        </Text>
        <Spacer position="bottom" size="large" />
        <Spacer position="bottom" size="large" />
      </Header>
    );
  };

  if (isLoading) {
    return <LoadingScreen/>
  }

  return (
    <SafeArea>
      <Container showsVerticalScrollIndicator={false}>
        {renderHeader()}
        <Spacer position="bottom" size="large" />
        <SectionTitle variant="label">Account settings</SectionTitle>
        <Spacer position="bottom" size="large" />
        <View>
          <ProfileButton
            icon={
              <MaterialCommunityIcons
                name="account-circle-outline"
                size={28}
                color={theme.colors.ui.primary}
              />
            }
            label="Personal information"
          />
          <ProfileButton
            icon={
              <MaterialIcons
                name="payments"
                size={28}
                color={theme.colors.ui.primary}
              />
            }
            label="Payment methods"
          />
          <Separator />
        </View>
        <Spacer position="bottom" size="large" />
        <Spacer position="bottom" size="medium" />
        <SectionTitle variant="label">Pro</SectionTitle>
        <Spacer position="bottom" size="large" />
        <View>
          {user && user.isHost && <ProfileButton
            icon={
              <AntDesign
                name="swap"
                size={28}
                color={theme.colors.ui.primary}
              />
            }
            onPress={() =>
              changeApp('host')
              // props.navigation.reset({
              //   index: 0,
              //   routes: [{ name: "ProAppFacility" }],
              // })
            }
            label="Switch to host account"
          />}
          {user && !user.isHost && <ProfileButton
            icon={
              <AntDesign
                name="swap"
                size={28}
                color={theme.colors.ui.primary}
              />
            }
            onPress={() => props.navigation.navigate("HostVerification")}
            label="Become a host"
          />}
          {user && user.isSpecialist &&<ProfileButton
            icon={
              <AntDesign
                name="swap"
                size={28}
                color={theme.colors.ui.primary}
              />
            }
            onPress={() =>
              changeApp('specialist')
              // props.navigation.reset({
              //   index: 0,
              //   routes: [{ name: "ProAppSpecialist" }],
              // })
            }
            label="Switch service provider account"
          />}
          {user && !user.isSpecialist && <ProfileButton
            icon={
              <AntDesign
                name="swap"
                size={28}
                color={theme.colors.ui.primary}
              />
            }
            onPress={() => props.navigation.navigate("SpecialistVerification")}
            label="Become a specialist"
          />}
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
                color={theme.colors.ui.primary}
              />
            }
            label="Terms of service"
          />
          <Separator />
        </View>
        <Spacer position="bottom" size="large" />
        <Spacer position="bottom" size="large" />
        <LogoutButton>
          <Ionicons
            name="log-out-sharp"
            size={28}
            color={theme.colors.ui.primary}
          />
          <Spacer position="left" size="medium" />
          <Text variant="label" style={{ fontSize: 14, fontWeight: "bold" }}>
            Log out
          </Text>
        </LogoutButton>
      </Container>
    </SafeArea>
  );
};

export default connect(null, null)(ProfileScreen);
