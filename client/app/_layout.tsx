import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { GlobalProvider } from "../context/globalContext";
import { PendingPackagesProvider } from "@/context/pendingPackageContext";
import { ConfirmedPackagesProvider } from "@/context/confirmedPackageContext";
import { ScannedPackageProvider } from "@/context/scannedPackageContext";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <GlobalProvider>
        <ScannedPackageProvider>
          <PendingPackagesProvider>
            <ConfirmedPackagesProvider>
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="(stack)" options={{ headerShown: false }} />
                <Stack.Screen name="+not-found" />
              </Stack>
              <StatusBar style="auto" />
            </ConfirmedPackagesProvider>
          </PendingPackagesProvider>
        </ScannedPackageProvider>
      </GlobalProvider>
    </ThemeProvider>
  );
}
