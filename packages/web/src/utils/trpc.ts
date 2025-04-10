"use client";
import { createTRPCReact } from "@trpc/react-query";
import { AppRouter } from "@big-monorepo-starter/server";
import { createTRPCContext } from "@trpc/tanstack-react-query";
import type { ReactNode } from "react";
import { type TRPCClient } from "@trpc/client";
import { QueryClient } from "@tanstack/react-query";

//export const trpc = createTRPCReact<AppRouter>();

// Create the context
const context = createTRPCContext<AppRouter>();

// Define the Provider with explicit React component type
interface TRPCProviderProps {
  children: ReactNode;
  queryClient: QueryClient;
  trpcClient: TRPCClient<AppRouter>;
}

// Export the provider and hooks with proper types
export const TRPCProvider = context.TRPCProvider as React.FC<TRPCProviderProps>;
export const useTRPC = context.useTRPC;
export const useTRPCClient = context.useTRPCClient;
