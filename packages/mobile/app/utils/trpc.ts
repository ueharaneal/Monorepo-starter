import { createTRPCReact } from "@trpc/react-query";
import { httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../../../server/src/routers";
import { QueryClient } from "@tanstack/react-query";
import Constants from "expo-constants";

// Create the tRPC react client
export const trpc = createTRPCReact<AppRouter>();

// Create a new QueryClient instance
export const queryClient = new QueryClient();

// Get the development server URL
const getBaseUrl = () => {
  // Get the localhost IP from Expo constants
  const localhost = Constants.expoConfig?.hostUri?.split(":")[0] || "localhost";

  if (process.env.NODE_ENV === "development") {
    return `http://${localhost}:4000`;
  }

  // Return your production server URL here
  return "https://your-production-url.com";
};

// Create the tRPC client configuration
export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: `${getBaseUrl()}/trpc`,
      // You can pass any HTTP headers you need here
      async headers() {
        return {
          // Add your authentication token here if needed
          // authorization: `Bearer ${token}`,
        };
      },
    }),
  ],
});
