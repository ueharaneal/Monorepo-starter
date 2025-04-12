import express from "express";
import { messages, contacts, phoneNumbers } from "../db/schema";
import db from "@/db";
import { eq } from "drizzle-orm";
import { processWithAI, sendTwilioMessage } from "@/services/ai";

const webhookRouter = express.Router();

// Process incoming SMS from Twilio
webhookRouter.post("/sms", async (req, res) => {
  try {
    const { From, To, Body } = req.body;

    // Find the phone number in our database
    const phoneNumber = await db.query.phoneNumbers.findFirst({
      where: eq(phoneNumbers.number, To),
    });

    if (!phoneNumber) {
      console.error(`Received message for unknown number: ${To}`);
      return res.status(404).send("Number not found");
    }

    // Find the associated contact
    const contact = await db.query.contacts.findFirst({
      where: eq(contacts.phoneNumberId, phoneNumber.id),
      with: {
        messages: {
          orderBy: (messages: { createdAt: any }, { desc }: any) => [desc(messages.createdAt)],
          limit: 20, // Get recent message history for context
        },
      },
    });

    if (!contact || !contact.active) {
      console.error(`No active contact found for number: ${To}`);
      return res.status(404).send("Contact not found or inactive");
    }

    // Store the user's message
    await db.insert(messages).values({
      contactId: contact.id,
      content: Body,
      fromUser: true,
    });

    // Process with AI and schedule a response
    const messageHistory = contact.messages.map((msg) => ({
      role: msg.fromUser ? "user" : "assistant",
      content: msg.content,
    }));

    // Schedule an AI response
    const responseDelay = getRandomResponseTime(contact.responseTime);

    setTimeout(async () => {
      try {
        const aiResponse = await processWithAI({
          persona: contact.persona,
          behavior: contact.behavior,
          messageHistory,
          newMessage: Body,
        });

        // Store the AI response
        await db.insert(messages).values({
          contactId: contact.id,
          content: aiResponse,
          fromUser: false,
        });

        // Send the message via Twilio
        await sendTwilioMessage(From, To, aiResponse);
      } catch (error) {
        console.error("Error processing AI response:", error);
      }
    }, responseDelay);

    // Respond to Twilio
    res.status(200).send("OK");
  } catch (error) {
    console.error("Error processing webhook:", error);
    res.status(500).send("Internal Server Error");
  }
});

function getRandomResponseTime(settings) {
  const min = settings.min || 30;
  const max = settings.max || 300;
  return Math.floor(Math.random() * (max - min + 1) + min) * 1000; // Convert to milliseconds
}

export default webhookRouter;
