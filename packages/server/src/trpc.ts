import { initTRPC, TRPCError } from "@trpc/server";
import { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { verifyToken } from "./auth/supabase";

// User type definition
export interface User {
  id: string;
  email?: string; // Make email optional to match Supabase's User type
  // Add other user properties as needed
}

// Context type
export interface Context {
  user: User | null;
}

// Initialize tRPC
const t = initTRPC.context<Context>().create();

// Export reusable router and procedure helpers
export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      ...ctx,
      user: ctx.user,
    },
  });
});

// Context creator
export const createContext = async ({ req }: CreateExpressContextOptions): Promise<Context> => {
  // Get the authorization header
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return { user: null };
  }

  // Extract the token
  const token = authHeader.split(" ")[1];

  try {
    // Verify the token and get user data
    const userData = await verifyToken(token);
    return { user: userData };
  } catch (error) {
    return { user: null };
  }
};
