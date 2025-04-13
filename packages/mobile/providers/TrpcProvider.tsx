import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import React from "react";
import { trpc } from "@/utils/trpc";
import { useAuth } from "@/providers/AuthProvider";

const getBaseUrl = () => {
  if (process.env.NODE_ENV == "production") return process.env.EXPO_PUBLIC_API_URL as string;
  return "http://localhost:4000/trpc";
};

export default function TrpcProvider({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  const { session } = useAuth();

  const trpcClient = trpc.createClient({
    links: [
      httpBatchLink({
        url: getBaseUrl(),
        async headers() {
          return {
            authorization: session?.access_token ? `Bearer ${session.access_token}` : "",
          };
        },
      }),
    ],
  });

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}
