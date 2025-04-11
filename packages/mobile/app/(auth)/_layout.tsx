import { ThemedView } from "@/components/ThemedView";
import { Stack } from "expo-router";
import React from "react";

export default function AuthLayout() {
  return (
    <ThemedView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerTransparent: true,
          headerTintColor: "white",
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="signup"
          options={{
            title: "Sign Up",
          }}
        />
        <Stack.Screen
          name="verify"
          options={{
            title: "Verify",
          }}
        />
      </Stack>
    </ThemedView>
  );
}
