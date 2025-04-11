import React from "react";
import SignupScreen from "@/screens/auth/SignupScreen";
import { ThemedView } from "@/components/ThemedView";

const signup = () => {
  return (
    <ThemedView style={{ flex: 1 }}>
      <SignupScreen />
    </ThemedView>
  );
};

export default signup;
