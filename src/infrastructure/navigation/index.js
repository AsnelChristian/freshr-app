import { Platform, StatusBar, View } from "react-native";
import { useContext, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { setServices } from "../../redux/services/services.action";
import { AccountNavigator } from "./account.navigator";
import { OnboardingNavigator } from "./onboarding.navigator";
import { AuthContext } from "../../providers/auth/auth.context";
import { ProAppFacilityTabNavigator } from "./host.navigator";
import { SpecialistNavigator } from "./specialist.navigator";
import { AppContext } from "../../providers/app-provider";
import { AppNavigator} from "./app.navigator";



const Navigation = (props) => {
  const navigationRef = useRef();
  const { isAuthenticated, hasOnboarded, skipAuth } = useContext(AuthContext);
  const {currentApp} = useContext(AppContext);

  useEffect(() => {
    console.log(currentApp)
    Platform.OS === "android" && StatusBar.setTranslucent(true);
    StatusBar.setBarStyle("dark-content");
    StatusBar.setBackgroundColor("white");
    return () => {
      StatusBar.setBarStyle("default");
    };
  }, []);

  const _pickApp = () => {
    switch(currentApp) {
      case 'normal' :
        return <AppNavigator/>
      case 'host':
        return <ProAppFacilityTabNavigator/>
      case 'specialist':
        return <SpecialistNavigator/>
    }
  }

  const pickApp = () => {
    if (skipAuth) {
      return _pickApp()
    } else if (isAuthenticated) {
      return hasOnboarded ? _pickApp() : <OnboardingNavigator/>
    } else {
      return <AccountNavigator/>
    }
  }

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={{ colors: { background: "transparent" } }}
    >
      {pickApp()}
    </NavigationContainer>
  );
};
const mapDispatchToProps = (dispatch) => ({
  setServices: (services) => dispatch(setServices(services)),
});

export default connect(null, mapDispatchToProps)(Navigation);
