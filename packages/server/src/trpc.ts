import { initTRPC, TRPCError } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import { verifyToken } from "./auth/supabase";

export interface User {
  id: string;
  phone?: string;
}

export interface Context {
  user: User | null;
}

// Context type
// created for each request
export const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions): Promise<Context> => {
  console.log("createContext called");
  console.log("Authorization header:", req.headers.authorization ? "present" : "missing");

  return new Promise(async (resolve) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      console.log("No auth header, returning null user");
      resolve({ user: null });
      return;
    }

    const token = authHeader.replace(/^Bearer\s/, "");
    console.log("Extracted token:", token ? "present" : "missing");
    const user = await verifyToken(token);
    console.log("User from verifyToken:", user ? "present" : "null");
    resolve({ user });
  });
};

export type ContextType = Awaited<ReturnType<typeof createContext>>;
const t = initTRPC.context<ContextType>().create();

// Export reusable router and procedure helpers
export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  console.log("running");
  if (!ctx.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be logged in to access this resource",
    });
  }
  return next({
    ctx: {
      ...ctx,
      user: { ...ctx.user, profileId: ctx.user.id },
    },
  });
});
