import { relations } from "drizzle-orm";
import { contacts } from "./tables/contacts";
import { messages } from "./tables/messsages";
import { phoneNumbers } from "./tables/phoneNumbers";
import { profiles } from "./tables/profiles";

// Profile relations
export const profileRelations = relations(profiles, ({ many }) => ({
  contacts: many(contacts),
}));

// Contact relations
export const contactRelations = relations(contacts, ({ one, many }) => ({
  profile: one(profiles, {
    fields: [contacts.userId],
    references: [profiles.userId],
  }),
  phoneNumber: one(phoneNumbers, {
    fields: [contacts.phoneNumberId],
    references: [phoneNumbers.id],
  }),
  messages: many(messages),
}));

// Phone Number relations
export const phoneNumberRelations = relations(phoneNumbers, ({ many }) => ({
  contacts: many(contacts),
}));

// Message relations
export const messageRelations = relations(messages, ({ one }) => ({
  contact: one(contacts, {
    fields: [messages.contactId],
    references: [contacts.id],
  }),
}));
