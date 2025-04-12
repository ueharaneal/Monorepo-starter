import React, { useState } from "react";
import { TextInput, StyleSheet, ScrollView, View, Pressable } from "react-native";
import { useAuth } from "@/providers/AuthProvider";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { VStack } from "@/components/ui/vstack";
import { useColorScheme } from "@/hooks/useColorScheme";
import AuthLayout from "./AuthLayout";

export default function SignupScreen() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const { phoneSignIn, verifyOtp } = useAuth();
  const theme = useColorScheme() ?? "light";

  // Get theme colors
  const textColor = useThemeColor({}, "text");
  const iconColor = useThemeColor({}, "icon");

  const handleSendOtp = async () => {
    try {
      setError("");
      await phoneSignIn(phone);
      setIsOtpSent(true);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      setError("");
      await verifyOtp(phone, otp);
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
          value={phone}
          onChangeText={setPhone}
          autoCapitalize="none"
          keyboardType="phone-pad"
          editable={!isOtpSent}
        />

        {isOtpSent && (
          <>
            <ThemedText style={{ textAlign: "left", fontSize: 12, marginTop: 10 }}>
              Enter the OTP sent to your phone
            </ThemedText>
            <TextInput
              style={[
                styles.input,
                { borderColor: theme === "dark" ? "#444" : "#ccc", color: textColor },
              ]}
              placeholder="OTP"
              placeholderTextColor={iconColor}
              value={otp}
              onChangeText={setOtp}
              autoCapitalize="none"
              keyboardType="number-pad"
            />
          </>
        )}

        {error ? <ThemedText style={{ color: "red", marginBottom: 10 }}>{error}</ThemedText> : null}
      </VStack>

      <Pressable
        onPress={isOtpSent ? handleVerifyOtp : handleSendOtp}
        style={({ pressed }) => [styles.button, { opacity: pressed ? 0.7 : 1 }]}
      >
        <ThemedText style={styles.buttonText}>{isOtpSent ? "Verify OTP" : "Send OTP"}</ThemedText>
      </Pressable>
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
  button: {
    backgroundColor: "#6200ee",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
