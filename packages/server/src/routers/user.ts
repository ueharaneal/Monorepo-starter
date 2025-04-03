import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";

export const userRouter = router({
  // Public procedure - can be called by anyone
  hello: publicProcedure
    .input(
      z.object({
        name: z.string().optional(),
      })
    )
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.name || "world"}!`,
      };
    }),

  // Protected procedure - requires authentication
  getProfile: protectedProcedure.query(({ ctx }) => {
    // Return the user from the context
    return {
      user: ctx.user,
    };
  }),
});
