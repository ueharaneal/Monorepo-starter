import { defineConfig } from "drizzle-kit";

interface DBCredentials {
  url: string;
}

export default defineConfig({
  schema: "./src/db/schema/*",
  dialect: "postgresql",
  verbose: true,
  strict: true,
  dbCredentials: {
    url: process.env.DATABASE_URL,
  } as DBCredentials,
  out: "./src/server/drizzle",
});
