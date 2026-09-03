import { GoogleGenAI } from "@google/genai";
import { generateCuratedChatReply } from "../src/data/curatedChat";

function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    let body = req.body;
    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch (e) {
        body = {};
      }
    }
    const { message, destination, conversationHistory = [] } = body || {};
    if (!message || typeof message !== "string") {
      return res.status(200).json({
        reply: "Hello! Where are you planning your next journey? Feel free to ask about any destination, best times to travel, packing essentials, or local cultural highlights!",
      });
    }

    const ai = getGeminiClient();

    if (!ai) {
      const reply = generateCuratedChatReply(message, destination);
      return res.status(200).json({ reply });
    }

    const destContext = destination
      ? `You are discussing ${destination.name}, ${destination.country}.
Key Info:
- Tagline: ${destination.tagline || ""}
- Best Time to Visit: ${destination.bestTimeToVisit || ""}
- Famous Places: ${(destination.famousPlaces || []).map((p: any) => p.name).join(", ")}
- Vibe & Culture: ${destination.culture || ""}
- Currency: ${destination.currency || ""}
- Language: ${destination.language || ""}`
      : "The user is exploring world travel destinations.";

    const systemInstruction = `You are the chief travel curator and conversational assistant for "Voyage", a world-class travel discovery platform.
Your tone is sophisticated, knowledgeable, warm, and design-minded.
Provide well-structured, insightful, and practical advice for travelers.
Cover questions about:
- How long to spend in a destination
- What to see (both iconic places and hidden gems)
- When to go (seasonality, climate, cultural events)
- Local etiquette, food recommendations, and travel pacing

${destContext}

Keep your answers engaging, concise, and structured with clean markdown (bold highlights, clear bullet points, short paragraphs).`;

    const contextMessages = (conversationHistory || [])
      .slice(-6)
      .map((m: any) => `${m.role === "user" ? "Traveler" : "Curator"}: ${m.content}`)
      .join("\n\n");

    const promptText = contextMessages
      ? `${contextMessages}\n\nTraveler: ${message}\nCurator:`
      : message;

    let reply = "";
    const modelsToTry = [
      "gemini-2.5-flash",
      "gemini-3.1-flash-lite",
      "gemini-3.8-flash",
      "gemini-flash-latest",
    ];

    for (const modelName of modelsToTry) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: promptText,
          config: {
            systemInstruction,
            temperature: 0.7,
          },
        });
        if (response.text) {
          reply = response.text;
          break;
        }
      } catch (err: any) {
        console.warn(`Vercel API chat model ${modelName} encountered issue:`, err?.message || err);
        continue;
      }
    }

    if (!reply) {
      reply = generateCuratedChatReply(message, destination);
    }

    res.status(200).json({ reply });
  } catch (error: any) {
    console.warn("Vercel API chat fallback engaged:", error?.message || error);
    const reply = generateCuratedChatReply(req.body?.message || "", req.body?.destination);
    res.status(200).json({ reply });
  }
}
