import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthSession, SupabaseUser } from "@big-monorepo-starter/shared";
import { supabase } from "@/utils/supabase";
import { router, useSegments } from "expo-router";
import { View, ActivityIndicator } from "react-native";

type AuthContextType = {
  session: AuthSession | null;
  user: SupabaseUser | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (phone: string) => Promise<void>;
  signOut: () => Promise<void>;
  phoneSignIn: (phoneNumber: string) => Promise<void>;
  verifyOtp: (phoneNumber: string, token: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const segments = useSegments();
  const [session, setSession] = useState<AuthSession | null>(null);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user || null);
      setLoading(false);
    });

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user || null);
    });

    // Clean up subscription on unmount
    return () => subscription.unsubscribe();
  }, []);

  // Redirect unauthenticated users to signup
  useEffect(() => {
    // Don't do anything while still isLoading
    if (isLoading) return;

    // Check if user is in auth group
    const inAuthGroup = segments[0] === "(auth)";

    // Redirect authenticated users away from auth
    if (session && inAuthGroup) {
      router.replace("/(tabs)");
    }

    // Redirect unauthenticated users to auth
    if (!session && !inAuthGroup) {
      router.replace("/(auth)/signup");
    }
  }, [session, isLoading, segments]);

  const value = {
    session,
    user,
    isLoading,
    signIn: async (email: string, password: string) => {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    },
    signUp: async (phone: string) => {
      const { error } = await supabase.auth.signUp({ phone });
      if (error) throw error;
    },
    signOut: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    },
    phoneSignIn: async (phoneNumber: string) => {
      const { error } = await supabase.auth.signInWithOtp({
        phone: phoneNumber,
        options: {
          channel: "sms",
        },
      });
      if (error) throw error;
    },
    verifyOtp: async (phoneNumber: string, token: string) => {
      const { error } = await supabase.auth.verifyOtp({
        phone: phoneNumber,
        token,
        type: "sms",
      });
      if (error) throw error;
    },
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
