import { GoogleGenAI } from "@google/genai";
import { generateCuratedItinerary } from "../src/data/curatedItinerary";

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

    const {
      destination = "Kyoto",
      country = "Japan",
      durationDays = 3,
      travelStyle = "Cultural & Highlights",
      budget = "Moderate",
      companions = "Solo",
      interests = [],
    } = body || {};

    const ai = getGeminiClient();

    if (!ai) {
      const fallbackItinerary = generateCuratedItinerary(
        destination,
        country || "World",
        durationDays,
        travelStyle,
        budget
      );
      return res.status(200).json({ itinerary: fallbackItinerary });
    }

    const prompt = `Create a realistic, beautifully structured ${durationDays}-day travel itinerary for ${destination}, ${country || ""}.
Traveler Profile:
- Duration: ${durationDays} days
- Travel Style: ${travelStyle}
- Budget Tier: ${budget}
- Traveling with: ${companions}
- Interests: ${interests.length ? interests.join(", ") : "Iconic sights, local culinary, architecture, photography"}

Strictly return a valid JSON object matching this schema:
{
  "destination": "${destination}",
  "country": "${country || ""}",
  "totalDays": ${durationDays},
  "summary": "2-sentence inspiring overview of the journey",
  "bestTimeToVisit": "Best months and reason",
  "packingEssentials": ["item 1", "item 2", "item 3", "item 4"],
  "estimatedDailyBudget": "Estimated daily cost range in USD",
  "days": [
    {
      "day": 1,
      "title": "Day title",
      "theme": "Day theme",
      "morning": {
        "activity": "Activity name",
        "description": "2-3 sentences explaining what to do.",
        "duration": "e.g. 2.5 hours",
        "tip": "Insider tip"
      },
      "afternoon": {
        "activity": "Activity name",
        "description": "2-3 sentences explaining what to do.",
        "duration": "e.g. 3 hours",
        "tip": "Insider tip"
      },
      "evening": {
        "activity": "Evening activity name",
        "description": "2-3 sentences describing the evening.",
        "duration": "e.g. 2 hours",
        "tip": "Insider tip"
      },
      "culinaryHighlight": {
        "dish": "Signature dish",
        "spot": "Type of eatery",
        "notes": "Why it's unmissable"
      }
    }
  ]
}`;

    let parsedItinerary: any = null;
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
          contents: prompt,
          config: {
            responseMimeType: "application/json",
            temperature: 0.4,
          },
        });

        const text = response.text?.trim();
        if (text) {
          try {
            const parsed = JSON.parse(text);
            if (parsed && parsed.days && parsed.days.length > 0) {
              parsedItinerary = parsed;
              break;
            }
          } catch {
            const jsonMatch = text.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
              const parsed = JSON.parse(jsonMatch[0]);
              if (parsed && parsed.days && parsed.days.length > 0) {
                parsedItinerary = parsed;
                break;
              }
            }
          }
        }
      } catch (err: any) {
        console.warn(`Vercel API itinerary model ${modelName} encountered issue:`, err?.message || err);
        continue;
      }
    }

    if (!parsedItinerary || !parsedItinerary.days || parsedItinerary.days.length === 0) {
      parsedItinerary = generateCuratedItinerary(destination, country || "", durationDays, travelStyle, budget);
    }

    res.status(200).json({ itinerary: parsedItinerary });
  } catch (error: any) {
    console.warn("Itinerary fallback engaged:", error?.message || error);
    const fallback = generateCuratedItinerary(
      req.body?.destination || "World Destination",
      req.body?.country || "",
      req.body?.durationDays || 3,
      req.body?.travelStyle || "Cultural",
      req.body?.budget || "Moderate"
    );
    res.status(200).json({ itinerary: fallback });
  }
}
