import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import TrpcProvider from "@/providers/TrpcProvider";
import { useColorScheme } from "@/hooks/useColorScheme";
import AuthProvider from "@/providers/AuthProvider";
import { useColorScheme as useNativewindColorScheme } from "nativewind";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [colorMode, setColorMode] = useState<"light" | "dark">("dark");

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
    <GluestackUIProvider mode={colorMode}>
      <TrpcProvider>
        <AuthProvider>
          <Stack
            screenOptions={{
              headerStyle: { backgroundColor: "#6200ee" },
              headerTintColor: "#fff",
              headerTitleStyle: { fontFamily: "SpaceMono" },
              headerShadowVisible: false, // Removes the bottom shadow
            }}
          >
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen
              name="(auth)"
              options={{
                headerShown: false,
                animation: "slide_from_bottom",
                presentation: "card",
              }}
            />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="light" />
        </AuthProvider>
      </TrpcProvider>
    </GluestackUIProvider>
  );
}
