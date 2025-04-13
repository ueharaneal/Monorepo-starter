import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.DATABASE_URL!;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!;

// Create a Supabase client with the anon key
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function verifyToken(token: string): Promise<any> {
  console.log("verifyToken called with token:", token ? "present" : "missing");
  return new Promise((resolve) => {
    supabase.auth
      .getUser(token)
      .then(({ data, error }) => {
        console.log("Supabase auth response:", { data, error });
        if (error) {
          console.error("Token verification error:", error);
          resolve(null);
          return;
        }
        resolve(data.user);
      })
      .catch((error) => {
        console.error("Token verification error:", error);
        resolve(null);
      });
  });
}
