import express from "express";
import cors from "cors";
import * as trpcExpress from "@trpc/server/adapters/express";
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
    process.env.NODE_ENV === "production"
      ? process.env.PRODUCTION_URL
      : ["http://localhost:3000", "http://localhost:19006"], // Support both Next.js and Expo
  credentials: true,
};

// Security middleware
app.disable("x-powered-by");
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cors(corsOptions));

// tRPC middleware
app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

// Basic health check endpoint
app.get("/healthcheck", (_, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: "Not Found",
    path: req.path,
  });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(`Error [${req.method} ${req.path}]:`, err);

  // Don't expose internal server errors to client in production
  const message = process.env.NODE_ENV === "production" ? "Internal Server Error" : err.message;

  res.status(err.status || 500).json({
    error: message,
    path: req.path,
    timestamp: new Date().toISOString(),
  });
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`tRPC endpoint: http://localhost:${PORT}/trpc`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});
