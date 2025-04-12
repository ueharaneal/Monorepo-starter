import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { contacts, phoneNumbers } from "../db/schema";
import { eq, and } from "drizzle-orm";
import db from "@/db";
export const contactRouter = createTRPCRouter({
  // Get all contacts for a user
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const userContacts = await db.query.contacts.findMany({
      where: eq(contacts.userId, ctx.user.id),
      with: {
        phoneNumber: true,
      },
    });
    return userContacts;
  }),

  // Create a new contact/persona
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        persona: z.string(),
        behavior: z.record(z.any()).optional(),
        responseTime: z
          .object({
            min: z.number().min(10).default(30),
            max: z.number().min(10).default(300),
          })
          .optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Find an available phone number
      const availableNumber = await db.query.phoneNumbers.findFirst({
        where: eq(phoneNumbers.available, true),
      });

      if (!availableNumber) {
        throw new Error("No available phone numbers");
      }

      // Assign the number and create the contact
      await db
        .update(phoneNumbers)
        .set({ available: false })
        .where(eq(phoneNumbers.id, availableNumber.id));

      const newContact = await db
        .insert(contacts)
        .values({
          userId: ctx.user.profileId,
          phoneNumberId: availableNumber.id,
          name: input.name,
          persona: input.persona,
          behavior: input.behavior || {},
          responseTimeBySeconds: input.responseTime || { min: 30, max: 300 },
        })
        .returning();

      return newContact[0];
    }),

  // Update a contact
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
        persona: z.string().optional(),
        behavior: z.record(z.any()).optional(),
        responseTime: z
          .object({
            min: z.number().min(10),
            max: z.number().min(10),
          })
          .optional(),
        active: z.boolean().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;

      const updated = await db
        .update(contacts)
        .set(data)
        .where(and(eq(contacts.id, id), eq(contacts.userId, ctx.user.id)))
        .returning();

      if (updated.length === 0) {
        throw new Error("Contact not found or not owned by user");
      }

      return updated[0];
    }),

  // Delete a contact
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const contact = await db.query.contacts.findFirst({
        where: and(eq(contacts.id, input.id), eq(contacts.userId, ctx.user.id)),
      });

      if (!contact || !contact.phoneNumberId) {
        throw new Error("Contact not found or not owned by user");
      }

      // Release the phone number
      await db
        .update(phoneNumbers)
        .set({ available: true })
        .where(eq(phoneNumbers.id, contact.phoneNumberId));

      // Delete the contact
      await db.delete(contacts).where(eq(contacts.id, input.id));

      return { success: true };
    }),
});
