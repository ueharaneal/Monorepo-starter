import { createTRPCReact } from "@trpc/react-query";
import { httpBatchLink } from "@trpc/client";
import superjson from "superjson";
import { AppRouter } from "@big-monorepo-starter/server";

export const trpc = createTRPCReact<AppRouter>();

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: "http://localhost:4000/trpc",
      // You can pass custom headers here if needed
      headers() {
        return {
          // Add any headers you want to pass to the server
          // For example, if you're using authentication:
          // authorization: getAuthCookie(),
        };
      },
    }),
  ],
  transformer: superjson,
});
