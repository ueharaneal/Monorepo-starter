import { createTRPCRouter } from "../trpc";
import { userRouter } from "./userRouter";
import { contactRouter } from "./contactRouter";
import { messageRouter } from "./messageRouter";

export const appRouter = createTRPCRouter({
  user: userRouter,
  contact: contactRouter,
  message: messageRouter,
});

export type AppRouter = typeof appRouter;
