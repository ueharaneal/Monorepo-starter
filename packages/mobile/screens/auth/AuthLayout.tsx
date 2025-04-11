import React, { useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import GhostSvg from "@/components/GhostSvg";
import { SafeAreaView } from "react-native-safe-area-context";
import { Divider } from "@/components/ui/divider";
const AuthLayout = ({ children, title }: { children: React.ReactNode; title: string }) => {
  return (
    <SafeAreaView style={styles.scrollContainer} className="">
      <ThemedView style={styles.container}>
        <ThemedView style={styles.imageContainer}>
          <GhostSvg width={100} height={152} />
        </ThemedView>
        <ThemedView style={styles.formContainer}>
          <Divider />
          <ThemedText type="title" style={styles.title}>
            {title}
          </ThemedText>
          {children}
        </ThemedView>
      </ThemedView>
    </SafeAreaView>
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
    gap: 20,
  },
  image: {
    width: 140,
    height: 140,
  },
  title: {
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});
