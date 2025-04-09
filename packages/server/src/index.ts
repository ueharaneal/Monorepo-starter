import express from "express";
import cors from "cors";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import dotenv from "dotenv";
import { appRouter } from "./routers";
import { createContext } from "./trpc";

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// CORS configuration
const corsOptions = {
  origin:
    process.env.NODE_ENV === "production" ? process.env.PRODUCTION_URL : "http://localhost:3000", // Your Next.js app URL
  credentials: true,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// tRPC middleware with error handling
app.use(
  "/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext,
    onError: ({ error, type, path, input, ctx, req }) => {
      console.error("tRPC Error:", {
        error,
        type,
        path,
        input,
        ctx,
      });
    },
  })
);

// Basic health check endpoint
app.get("/healthcheck", (_, res) => {
  res.json({ status: "ok" });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`tRPC endpoint: http://localhost:${PORT}/trpc`);
});
