import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  // Public procedure - can be called by anyone
  hello: publicProcedure
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
