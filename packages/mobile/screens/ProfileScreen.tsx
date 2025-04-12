import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedView } from "@/components/ThemedView";
import { Pressable } from "react-native";
import { useAuth } from "@/providers/AuthProvider";
import { ThemedText } from "@/components/ThemedText";

const ProfileScreen = () => {
  const auth = useAuth();

  const handlePress = async () => {
    await auth.signOut();
    console.log("ran");
  };
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ThemedView style={styles.container}>
        <Text>ProfileScreen</Text>
        <Pressable onPress={handlePress}>
          <ThemedText>Sign Out </ThemedText>
        </Pressable>
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
