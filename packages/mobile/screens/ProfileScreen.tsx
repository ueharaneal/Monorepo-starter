import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedView } from "@/components/ThemedView";

const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ThemedView style={styles.container}>
        <Text>ProfileScreen</Text>
      </ThemedView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    padding: 20,
  },
});

export default ProfileScreen;
