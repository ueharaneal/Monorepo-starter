import { StyleSheet, Text, View } from "react-native";
import { Redirect } from "expo-router";
import { useAuth } from "@/providers/AuthProvider";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
export function unstable_settings() {
  return { auth: false };
}

export default function Page() {
  const { session, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        SplashScreen.hideAsync();
      }, 1000);
    }
  }, [isLoading]);

  if (isLoading) {
    return null;
  }

  if (!session) {
    return <Redirect href="/(auth)/signup" />;
  }

  // Redirect to tabs when authenticated
  return <Redirect href="/(tabs)" />;
}
