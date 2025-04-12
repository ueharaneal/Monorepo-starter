import { pgTable, text, timestamp, uuid, jsonb, boolean } from "drizzle-orm/pg-core";
import { contacts } from "./contacts";

// Message history
export const messages = pgTable("messages", {
  id: uuid("id").primaryKey().defaultRandom(),
  contactId: uuid("contact_id").references(() => contacts.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  fromUser: boolean("from_user").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});
