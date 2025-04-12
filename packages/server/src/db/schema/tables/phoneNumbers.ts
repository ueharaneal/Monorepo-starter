import { pgTable, text, timestamp, uuid, pgEnum, boolean } from "drizzle-orm/pg-core";

export const PROVIDERS = ["twilio_sms", "whatsapp", "loop_message"] as const;

export const ProvidersEnum = pgEnum("providers_enum", PROVIDERS);

export const phoneNumbers = pgTable("phone_numbers", {
  id: uuid("id").primaryKey().defaultRandom(),
  number: text("number").unique().notNull(),
  provider: ProvidersEnum("provider").notNull(),
  available: boolean("available").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
