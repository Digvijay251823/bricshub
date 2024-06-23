import { Web3Modal } from "@web3modal/react-native";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import { GlobalProvider } from "@/components/ToastNotification/GlobalState";
import ToastNotification from "@/components/ToastNotification/ToastNotification";

const providerMetadata = {
  name: "Bricshub",
  description: "This app is powered by bricshub.com",
  url: "https://bricshub.com/",
  redirect: {
    native: "bricshub://",
  },
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GlobalProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen
            name="modal"
            options={{ headerShown: false, presentation: "modal" }}
          />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="notification" options={{ headerShown: false }} />
          <Stack.Screen name="audithistory" options={{ headerShown: false }} />
          <Stack.Screen name="connection" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <Web3Modal
          projectId={"a724fd6f434dcc64058405875ea4a634"}
          providerMetadata={providerMetadata}
        />
        <ToastNotification />
      </ThemeProvider>
    </GlobalProvider>
  );
}
