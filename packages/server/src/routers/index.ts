import { createTRPCRouter } from "../trpc";
import { userRouter } from "./user";

export const appRouter = createTRPCRouter({
  user: userRouter,
  // Add more routers here as needed
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
