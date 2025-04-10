import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@big-monorepo-starter/server";

export const trpc = createTRPCReact<AppRouter>();
