import { initTRPC, TRPCError } from "@trpc/server";
import { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { verifyToken } from "./auth/supabase";

// Context type
export interface Context {
  user: any | null;
}

// Context creator
export const createContext = async ({ req }: CreateExpressContextOptions): Promise<Context> => {
  // Get the authorization header
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return { user: null };
  }

  // Extract the token
  const token = authHeader.split(" ")[1];

  // Verify the token
  const user = await verifyToken(token);

  return { user };
};

// Initialize tRPC
const t = initTRPC.context<Context>().create();

// Export reusable router and procedure builders
export const router = t.router;
export const publicProcedure = t.procedure;

// Protected procedure middleware
export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be logged in to access this resource",
    });
  }

  return next({ ctx: { ...ctx, user: ctx.user } });
});
