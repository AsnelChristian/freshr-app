import "react-native-gesture-handler";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components";
import { DefaultTheme } from "react-native-paper";
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from "react-native-safe-area-context";

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
import { AppProvider } from "./src/providers/app-provider";
import { AuthContextProvider } from "./src/providers/auth/auth.context";
import { PreferencesProvider } from "./src/providers/preferences.provider";

const completeTheme = {
  ...DefaultTheme,
  roundness: 2,
  ...theme,

  colors: {
    ...theme.colors,
    ...DefaultTheme.colors,
    primary: theme.colors.brand.primary,
    accent: theme.colors.ui.primary,
  },
};

export const App = (props) => {
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
        <ThemeProvider theme={completeTheme}>
          <BottomSheetModalProvider>
            <SafeAreaProvider initialMetrics={initialWindowMetrics}>
                <AuthContextProvider>
                  <PreferencesProvider>
                      <AppProvider>
                        <Navigation />
                      </AppProvider>
                  </PreferencesProvider>
                </AuthContextProvider>
            </SafeAreaProvider>
          </BottomSheetModalProvider>
        </ThemeProvider>
      </Provider>
      <ExpoStatusBar style="auto" />
    </>
  );
};
