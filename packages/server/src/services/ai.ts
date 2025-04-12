import axios from "axios";

export interface AIProcessParams {
  persona: string;
  behavior: Record<string, any>;
  messageHistory: { role: "user" | "assistant"; content: string }[];
  newMessage: string;
}

export async function processWithAI({
  persona,
  behavior,
  messageHistory,
}: AIProcessParams): Promise<string> {
  try {
    const systemPrompt = constructSystemPrompt(persona, behavior);

    const messages = [{ role: "system", content: systemPrompt }, ...messageHistory];

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: behavior.model || "openai/gpt-4-turbo-preview", // Default model
        messages,
        temperature: behavior.temperature || 0.7,
        max_tokens: behavior.maxTokens || 300,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer":
            process.env.NODE_ENV === "production"
              ? process.env.PRODUCTION_URL
              : "http://localhost:4000",
          "X-Title": "NoGhost App", // Your app's name
        },
      }
    );

    return response.data.choices[0].message.content || "Sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("AI processing error:", error);
    throw new Error("Failed to process with AI");
  }
}

function constructSystemPrompt(persona: string, behavior: Record<string, any>): string {
  // Same as before
  let prompt = `You are texting as the following persona: ${persona}\n\n`;

  prompt += "Important guidelines:\n";
  prompt += "- Respond as if you are texting from a mobile phone\n";
  prompt += "- Keep responses relatively brief and casual\n";
  prompt += "- Never break character or mention that you are an AI\n";
  prompt +=
    "- Use text messaging style language, including occasional typos if that fits your persona\n";

  if (behavior.textingStyle) {
    prompt += `\nYour texting style: ${behavior.textingStyle}\n`;
  }

  if (behavior.emotionState) {
    prompt += `\nYour current emotional state: ${behavior.emotionState}\n`;
  }

  if (behavior.backstory) {
    prompt += `\nYour backstory (for context): ${behavior.backstory}\n`;
  }

  return prompt;
}

// Twilio sender function
export async function sendTwilioMessage(to: string, from: string, body: string): Promise<void> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = require("twilio")(accountSid, authToken);

  try {
    await client.messages.create({
      body,
      from,
      to,
    });
  } catch (error) {
    console.error("Error sending Twilio message:", error);
    throw new Error("Failed to send Twilio message");
  }
}
