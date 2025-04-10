import { initTRPC, TRPCError } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";

// User type definition
export interface User {
  id: string;
  email?: string; // Make email optional to match Supabase's User type
  // Add other user properties as needed
}

// Context type
// created for each request
export const createContext = ({ req, res }: trpcExpress.CreateExpressContextOptions) => ({}); // no context

type Context = Awaited<ReturnType<typeof createContext>>;
const t = initTRPC.context<Context>().create();

// Export reusable router and procedure helpers
export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;
// export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
//   if (!ctx.user) {
//     throw new TRPCError({ code: "UNAUTHORIZED" });
//   }
//   return next({
//     ctx: {
//       ...ctx,
//       user: ctx.user,
//     },
//   });
// });
