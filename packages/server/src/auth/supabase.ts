import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Create a Supabase client with the service role key
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function verifyToken(token: string) {
  try {
    const { data, error } = await supabase.auth.getUser(token);

    if (error) {
      throw error;
    }

    return data.user;
  } catch (error) {
    console.error("Token verification error:", error);
    return null;
  }
}
