import "react-native-gesture-handler";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components";
import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";
import { theme } from "./src/infrastructure/theme";
import Navigation from "./src/infrastructure/navigation";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import {StripeProvider} from "@stripe/stripe-react-native";

export default function App() {
  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });
  const [latoLoaded] = useLato({
    Lato_400Regular,
  });

  if (!oswaldLoaded || !latoLoaded) {
    return null;
  }

  return (
    <>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <BottomSheetModalProvider>
              <Navigation />
            </BottomSheetModalProvider>
          </ThemeProvider>
        </Provider>
      <ExpoStatusBar style="auto" />
    </>
  );
}
