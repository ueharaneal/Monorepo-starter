import { supabase } from "./supabase";

export const phoneAuth = {
  signInWithPhoneNumber: async (phoneNumber: string) => {
    const { data, error } = await supabase.auth.signInWithOtp({
      phone: phoneNumber,
      options: {
        channel: "sms",
      },
    });
  },
  verifyOtp: async (phoneNumber: string, token: string) => {
    return await supabase.auth.verifyOtp({
      phone: phoneNumber,
      token,
      type: "sms",
    });
  },
  signOut: async () => {
    return await supabase.auth.signOut();
  },
  getSession: async () => {
    return await supabase.auth.getSession();
  },
  getUser: async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    return session?.user;
  },
};
