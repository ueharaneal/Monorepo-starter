import { pgTable, text, timestamp, uuid, jsonb, boolean } from "drizzle-orm/pg-core";
import { profiles } from "./profiles";
import { phoneNumbers } from "./phoneNumbers";

// AI Contacts table
export const contacts = pgTable("contacts", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => profiles.userId, { onDelete: "cascade" }),
  phoneNumberId: uuid("phone_number_id").references(() => phoneNumbers.id),
  name: text("name").notNull(),
  persona: text("persona").notNull(), // Prompt for the AI
  behavior: jsonb("behavior").default({}), // Additional behavior settings
  responseTimeBySeconds: jsonb("response_time_by_seconds").default({
    min: 30, // Minimum seconds to wait before response
    max: 300, // Maximum seconds to wait before response
  }),
  active: boolean("active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
