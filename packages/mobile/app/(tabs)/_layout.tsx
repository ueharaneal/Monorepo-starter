import { Tabs, Redirect } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { useColorScheme } from "nativewind";
import { useAuth } from "@/providers/AuthProvider";
import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { HomeIcon, PlusIcon, UserIcon } from "lucide-react-native";
import { ThemedView } from "@/components/ThemedView";
import { StatusBar } from "expo-status-bar";

export default function TabLayout() {
  const { colorScheme } = useColorScheme();
  const activeTintColor = colorScheme === "dark" ? "white" : "rgb(51, 51, 51)";

  const { session, user } = useAuth();

  if (!session || !user) {
    return <Redirect href="/(auth)/signup" />;
  }

  return (
    <ThemedView style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: activeTintColor,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              position: "absolute",
              backgroundColor: "transparent",
            },
            default: {
              backgroundColor: "transparent",
            },
          }),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => <HomeIcon color={color} />,
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: "Explore",
            tabBarIcon: ({ color }) => <PlusIcon color={color} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color }) => <UserIcon color={color} />,
          }}
        />
      </Tabs>
    </ThemedView>
  );
}
