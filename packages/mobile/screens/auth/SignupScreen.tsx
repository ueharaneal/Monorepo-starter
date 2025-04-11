import React, { useState } from "react";
import { TextInput, Button, StyleSheet, ScrollView, View } from "react-native";
import { useAuth } from "@/providers/AuthProvider";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { VStack } from "@/components/ui/vstack";
import { useColorScheme } from "@/hooks/useColorScheme";
import AuthLayout from "./AuthLayout";

export default function SignupScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signUp } = useAuth();
  const theme = useColorScheme() ?? "light";

  // Get theme colors
  const textColor = useThemeColor({}, "text");
  const iconColor = useThemeColor({}, "icon");

  const handleSignUp = async () => {
    try {
      setError("");
      await signUp(email, password);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <AuthLayout title="Create an account">
      <VStack>
        <ThemedText style={{ textAlign: "left", fontSize: 12 }}>Enter your phone number</ThemedText>
        <TextInput
          style={[
            styles.input,
            { borderColor: theme === "dark" ? "#444" : "#ccc", color: textColor },
          ]}
          placeholder="Phone number"
          placeholderTextColor={iconColor}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
        {error ? <ThemedText style={{ color: "red", marginBottom: 10 }}>{error}</ThemedText> : null}
      </VStack>
      <Button title="Sign Up" onPress={handleSignUp} />
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    padding: 20,
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
    width: "100%",
  },
  formContainer: {
    width: "100%",
    marginTop: 10,
  },
  image: {
    width: 140,
    height: 140,
  },
  title: {
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});
