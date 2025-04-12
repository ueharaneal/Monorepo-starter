import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  // Public procedure - can be called by anyone
  hello: protectedProcedure
    .input(
      z.object({
        name: z.string().optional(),
      })
    )
    .query(({ input }) => {
      console.log("input", input);
      return {
        greeting: `Hello ${input.name || "world"}!`,
      };
    }),
});
