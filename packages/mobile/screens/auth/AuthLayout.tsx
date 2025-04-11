import React, { useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import GhostSvg from "@/components/GhostSvg";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.imageContainer}>
          <GhostSvg width={120} height={192} />
        </ThemedView>
        <ThemedView style={styles.formContainer}>
          <ThemedText type="title" style={styles.title}>
            Create Account
          </ThemedText>
          {children}
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
};

export default AuthLayout;

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
