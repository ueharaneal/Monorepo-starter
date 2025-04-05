import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { trpc } from "../utils/trpc";

export default function TabOneScreen() {
  // Example query using the 'hello' procedure from our server
  const helloQuery = trpc.user.hello.useQuery({ name: "from Mobile App" });

  return (
    <View style={styles.container}>
      {helloQuery.isLoading ? (
        <Text>Loading...</Text>
      ) : helloQuery.error ? (
        <Text>Error: {helloQuery.error.message}</Text>
      ) : (
        <Text style={styles.title}>{helloQuery.data?.greeting}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
