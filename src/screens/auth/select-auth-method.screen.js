import { connect } from "react-redux";
import { SafeArea } from "../../components/utils/safearea.component";
import { PaddedContainer } from "../components/details-screen.component";
import { AppButton, AppButtonImage } from "./components/helpers.component";
import { Spacer } from "../../components/spacer/spacer.component";
import { Text } from "../../components/typography/typography.component";

const SelectAuthMethodScreen = (props) => {
  const renderAppButtons = () => {
    return (
      <PaddedContainer>
        <AppButton
          elevation={2}
          onPress={() => props.navigation.navigate("signin")}
        >
          <Text variant="caption" style={{ fontSize: 14 }}>
            Use email / phone number
          </Text>
        </AppButton>
        <Spacer position="top" size="large" />
        <AppButton elevation={2}>
          <AppButtonImage source={require("../../assets/apple.png")} />
          <Spacer position="left" size="medium" />
          <Text variant="caption" style={{ fontSize: 14 }}>
            Continue with apple
          </Text>
        </AppButton>
        <Spacer position="top" size="large" />
        <AppButton elevation={2}>
          <AppButtonImage source={require("../../assets/google-color.png")} />
          <Spacer position="left" size="medium" />
          <Text variant="caption" style={{ fontSize: 14 }}>
            Continue with google
          </Text>
        </AppButton>
        <Spacer position="top" size="large" />
        <AppButton elevation={2}>
          <AppButtonImage source={require("../../assets/facebook-color.png")} />
          <Spacer position="left" size="medium" />
          <Text variant="caption" style={{ fontSize: 14 }}>
            Continue with facebook
          </Text>
        </AppButton>
      </PaddedContainer>
    );
  };

  return <SafeArea>{renderAppButtons()}</SafeArea>;
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectAuthMethodScreen);
