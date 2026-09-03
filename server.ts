import express, { Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";
import { getCuratedPhotos } from "./src/data/curatedPhotos";
import { generateCuratedItinerary } from "./src/data/curatedItinerary";
import { generateCuratedChatReply } from "./src/data/curatedChat";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini client lazily
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

// WMO weather code mapping to human-readable condition and icon
function decodeWmoCode(code: number): { condition: string; icon: string } {
  if (code === 0) return { condition: "Clear Sky", icon: "sun" };
  if (code === 1) return { condition: "Mainly Clear", icon: "sun-dim" };
  if (code === 2) return { condition: "Partly Cloudy", icon: "cloud-sun" };
  if (code === 3) return { condition: "Overcast", icon: "cloud" };
  if (code === 45 || code === 48) return { condition: "Foggy & Misty", icon: "cloud-fog" };
  if (code >= 51 && code <= 55) return { condition: "Light Drizzle", icon: "cloud-drizzle" };
  if (code >= 61 && code <= 65) return { condition: "Rain", icon: "cloud-rain" };
  if (code >= 71 && code <= 77) return { condition: "Snowfall", icon: "snowflake" };
  if (code >= 80 && code <= 82) return { condition: "Rain Showers", icon: "cloud-rain" };
  if (code >= 95 && code <= 99) return { condition: "Thunderstorm", icon: "cloud-lightning" };
  return { condition: "Pleasant", icon: "cloud-sun" };
}

// Health check endpoint
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    app: "Voyage Travel Application",
    timestamp: new Date().toISOString(),
    geminiConfigured: !!process.env.GEMINI_API_KEY,
  });
});

// Geocoding endpoint: Search for locations worldwide
app.get("/api/geocode", async (req: Request, res: Response) => {
  try {
    const query = req.query.q as string;
    if (!query || query.trim().length < 2) {
      return res.status(400).json({ error: "Query must be at least 2 characters" });
    }

    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      query.trim()
    )}&count=8&language=en&format=json`;

    const response = await fetch(geoUrl);
    if (!response.ok) {
      throw new Error(`Geocoding failed with status ${response.status}`);
    }

    const data = await response.json();
    const results = (data.results || []).map((item: any) => ({
      id: item.id,
      name: item.name,
      country: item.country,
      countryCode: item.country_code,
      admin1: item.admin1 || "",
      latitude: item.latitude,
      longitude: item.longitude,
      timezone: item.timezone,
    }));

    res.json({ results });
  } catch (error: any) {
    console.error("Geocoding error:", error);
    res.status(500).json({ error: "Failed to search location", message: error.message });
  }
});

// Real-time weather endpoint (supports both Open-Meteo real-time & OpenWeatherMap if key exists)
app.get("/api/weather", async (req: Request, res: Response) => {
  try {
    const lat = parseFloat(req.query.lat as string);
    const lon = parseFloat(req.query.lon as string);
    const cityName = (req.query.city as string) || "Current Location";

    if (isNaN(lat) || isNaN(lon)) {
      return res.status(400).json({ error: "Valid latitude and longitude required" });
    }

    // Check if OpenWeather key is provided and try it
    const openWeatherKey = process.env.OPENWEATHER_API_KEY;
    if (openWeatherKey) {
      try {
        const owUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${openWeatherKey}`;
        const owRes = await fetch(owUrl);
        if (owRes.ok) {
          const owData = await owRes.json();
          const tempC = Math.round(owData.main.temp);
          const tempF = Math.round((tempC * 9) / 5 + 32);
          const condition = owData.weather?.[0]?.main || "Clear";
          const description = owData.weather?.[0]?.description || "Pleasant";

          return res.json({
            provider: "OpenWeather",
            city: cityName || owData.name,
            tempC,
            tempF,
            feelsLikeC: Math.round(owData.main.feels_like),
            humidity: owData.main.humidity,
            windSpeedKmh: Math.round((owData.wind.speed || 0) * 3.6),
            condition,
            description,
            icon: owData.weather?.[0]?.icon || "01d",
            timestamp: new Date().toISOString(),
          });
        }
      } catch (owErr) {
        console.warn("OpenWeather query failed, falling back to Open-Meteo:", owErr);
      }
    }

    // Open-Meteo real-time global weather API (no key required, 100% reliable)
    const meteoUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto`;

    const meteoRes = await fetch(meteoUrl);
    if (!meteoRes.ok) {
      throw new Error(`Weather service returned ${meteoRes.status}`);
    }

    const meteoData = await meteoRes.json();
    const current = meteoData.current;
    const tempC = Math.round(current.temperature_2m);
    const tempF = Math.round((tempC * 9) / 5 + 32);
    const feelsLikeC = Math.round(current.apparent_temperature);
    const weatherInfo = decodeWmoCode(current.weather_code);

    // Build 5-day daily forecast
    const dailyForecast = (meteoData.daily?.time || []).slice(0, 5).map((date: string, idx: number) => {
      const code = meteoData.daily.weather_code[idx];
      const maxC = Math.round(meteoData.daily.temperature_2m_max[idx]);
      const minC = Math.round(meteoData.daily.temperature_2m_min[idx]);
      const precip = meteoData.daily.precipitation_probability_max?.[idx] ?? 0;
      const dayInfo = decodeWmoCode(code);

      return {
        date,
        dayOfWeek: new Date(date).toLocaleDateString("en-US", { weekday: "short" }),
        maxC,
        minC,
        maxF: Math.round((maxC * 9) / 5 + 32),
        minF: Math.round((minC * 9) / 5 + 32),
        condition: dayInfo.condition,
        icon: dayInfo.icon,
        precipChance: precip,
      };
    });

    res.json({
      provider: "Open-Meteo Global",
      city: cityName,
      latitude: lat,
      longitude: lon,
      tempC,
      tempF,
      feelsLikeC,
      feelsLikeF: Math.round((feelsLikeC * 9) / 5 + 32),
      humidity: current.relative_humidity_2m,
      windSpeedKmh: Math.round(current.wind_speed_10m),
      isDay: current.is_day === 1,
      condition: weatherInfo.condition,
      icon: weatherInfo.icon,
      forecast: dailyForecast,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("Weather error:", error);
    res.status(500).json({ error: "Failed to fetch weather data", message: error.message });
  }
});

// Photo search endpoint supporting Unsplash or Pexels API, with curated high-res fallbacks
app.get("/api/photos", async (req: Request, res: Response) => {
  try {
    const query = (req.query.q as string) || "tropical beach travel";
    const unsplashKey = process.env.UNSPLASH_ACCESS_KEY;
    const pexelsKey = process.env.PEXELS_API_KEY;

    // 1. Try Unsplash API if configured
    if (unsplashKey) {
      try {
        const uRes = await fetch(
          `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=12&orientation=landscape`,
          { headers: { Authorization: `Client-ID ${unsplashKey}` } }
        );
        if (uRes.ok) {
          const uData = await uRes.json();
          const photos = (uData.results || []).map((p: any) => ({
            id: p.id,
            url: p.urls?.regular || p.urls?.full,
            thumb: p.urls?.small,
            photographer: p.user?.name || "Unsplash Creator",
            photographerUrl: p.user?.links?.html,
            description: p.alt_description || p.description || query,
            source: "Unsplash API",
          }));
          return res.json({ photos, source: "Unsplash" });
        }
      } catch (uErr) {
        console.warn("Unsplash API fetch failed:", uErr);
      }
    }

    // 2. Try Pexels API if configured
    if (pexelsKey) {
      try {
        const pRes = await fetch(
          `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=12&orientation=landscape`,
          { headers: { Authorization: pexelsKey } }
        );
        if (pRes.ok) {
          const pData = await pRes.json();
          const photos = (pData.photos || []).map((p: any) => ({
            id: String(p.id),
            url: p.src?.large2x || p.src?.large,
            thumb: p.src?.medium,
            photographer: p.photographer,
            photographerUrl: p.photographer_url,
            description: p.alt || query,
            source: "Pexels API",
          }));
          return res.json({ photos, source: "Pexels" });
        }
      } catch (pErr) {
        console.warn("Pexels API fetch failed:", pErr);
      }
    }

    // 3. High-quality curated destination photography (guaranteed 100% working without external API key)
    const curatedPhotos = getCuratedPhotos(query, 12);
    res.json({ photos: curatedPhotos, source: "Curated Travel Archive" });
  } catch (error: any) {
    res.status(500).json({ error: "Failed to fetch photos", message: error.message });
  }
});

// AI Chatbot endpoint powered by Google Gemini API
app.post("/api/chat", async (req: Request, res: Response) => {
  try {
    const { message, destination, conversationHistory = [] } = req.body;
    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message is required" });
    }

    const ai = getGeminiClient();

    if (!ai) {
      // Graceful, highly personalized response if GEMINI_API_KEY is not yet populated
      const reply = generateCuratedChatReply(message, destination);
      return res.json({ reply });
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

    // Construct prompt with recent conversation history
    const contextMessages = conversationHistory
      .slice(-6)
      .map((m: any) => `${m.role === "user" ? "Traveler" : "Curator"}: ${m.content}`)
      .join("\n\n");

    const promptText = contextMessages
      ? `${contextMessages}\n\nTraveler: ${message}\nCurator:`
      : message;

    let reply = "";
    const modelsToTry = ["gemini-3.8-flash", "gemini-3.1-flash-lite", "gemini-flash-latest"];

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
        console.warn(`Model ${modelName} returned status or high demand, checking next model:`, err?.message || err);
        continue;
      }
    }

    if (!reply) {
      reply = generateCuratedChatReply(message, destination);
    }

    res.json({ reply });
  } catch (error: any) {
    console.warn("Gemini chat fallback engaged:", error?.message || error);
    const reply = generateCuratedChatReply(req.body?.message || "", req.body?.destination);
    res.json({ reply });
  }
});

// AI Itinerary Planning endpoint: Generates structured, day-by-day itineraries (not a blob of text)
app.post("/api/plan-itinerary", async (req: Request, res: Response) => {
  try {
    const {
      destination,
      country,
      durationDays = 3,
      travelStyle = "Cultural & Highlights",
      budget = "Moderate",
      companions = "Solo",
      interests = [],
    } = req.body;

    if (!destination) {
      return res.status(400).json({ error: "Destination is required" });
    }

    const ai = getGeminiClient();

    if (!ai) {
      // Fallback deterministic structured itinerary if API key not present
      const fallbackItinerary = generateCuratedItinerary(
        destination,
        country || "World",
        durationDays,
        travelStyle,
        budget
      );
      return res.json({ itinerary: fallbackItinerary });
    }

    const prompt = `Create a realistic, beautifully structured ${durationDays}-day travel itinerary for ${destination}, ${country || ""}.
Traveler Profile:
- Duration: ${durationDays} days
- Travel Style: ${travelStyle}
- Budget Tier: ${budget}
- Traveling with: ${companions}
- Interests: ${interests.length ? interests.join(", ") : "Iconic sights, local culinary, architecture, photography"}

Strictly return a JSON object with this structure:
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
      "title": "Title of the day e.g. Historic Heart & Sunset Vistas",
      "theme": "Day theme e.g. Architectural Heritage",
      "morning": {
        "activity": "Specific name of place or activity",
        "description": "2-3 sentences explaining what to do, see, and experience.",
        "duration": "e.g. 2.5 hours",
        "tip": "Insider design or traveler tip"
      },
      "afternoon": {
        "activity": "Specific name of place or activity",
        "description": "2-3 sentences explaining what to do, see, and experience.",
        "duration": "e.g. 3 hours",
        "tip": "Insider tip"
      },
      "evening": {
        "activity": "Specific evening experience or sunset walk",
        "description": "2-3 sentences describing the evening vibe and stroll.",
        "duration": "e.g. 2.5 hours",
        "tip": "Insider tip"
      },
      "culinaryHighlight": {
        "dish": "Signature dish to order",
        "spot": "Type of eatery or renowned district",
        "notes": "Why it's unmissable"
      }
    }
  ]
}`;

    let parsedItinerary: any = null;
    const modelsToTry = ["gemini-3.8-flash", "gemini-3.1-flash-lite", "gemini-flash-latest"];

    for (const modelName of modelsToTry) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: prompt,
          config: {
            systemInstruction: "You are an elite travel architect and itinerary designer. Always output strictly valid JSON with complete day-by-day schedules.",
            responseMimeType: "application/json",
            temperature: 0.4,
          },
        });

        const rawText = response.text || "{}";
        try {
          parsedItinerary = JSON.parse(rawText);
          if (parsedItinerary && parsedItinerary.days && parsedItinerary.days.length > 0) {
            break;
          }
        } catch {
          const jsonMatch = rawText.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            parsedItinerary = JSON.parse(jsonMatch[0]);
            if (parsedItinerary && parsedItinerary.days && parsedItinerary.days.length > 0) {
              break;
            }
          }
        }
      } catch (err: any) {
        console.warn(`Itinerary model ${modelName} returned high demand/error, trying backup:`, err?.message || err);
        continue;
      }
    }

    if (!parsedItinerary || !parsedItinerary.days || parsedItinerary.days.length === 0) {
      parsedItinerary = generateCuratedItinerary(
        destination,
        country,
        durationDays,
        travelStyle,
        budget
      );
    }

    res.json({ itinerary: parsedItinerary });
  } catch (error: any) {
    console.warn("Itinerary fallback engaged:", error?.message || error);
    const fallbackItinerary = generateCuratedItinerary(
      req.body?.destination || "Destination",
      req.body?.country || "",
      req.body?.durationDays || 3,
      req.body?.travelStyle || "Cultural",
      req.body?.budget || "Moderate"
    );
    res.json({ itinerary: fallbackItinerary });
  }
});

async function startServer() {
  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Voyage Travel Server] Running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
