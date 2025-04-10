"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { trpc } from "@/utils/trpc";
import { httpBatchLink } from "@trpc/client";

const getBaseUrl = () => {
  if (process.env.NODE_ENV === "development") {
    return `http://localhost:4000`;
  }

  // Return your production server URL here
  return process.env.PRODUCTION_SERVER_URL as string;
};

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: getBaseUrl(),
          // You can pass any HTTP headers you wish here
          async headers() {
            return {
              // authorization: getAuthCookie(),
            };
          },
        }),
      ],
    })
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}
