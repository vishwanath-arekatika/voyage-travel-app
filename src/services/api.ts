import { WeatherData, Itinerary, Destination } from "../types";
import { getCuratedPhotos } from "../data/curatedPhotos";

// In-memory weather cache to minimize duplicate requests
const weatherCache = new Map<string, { data: WeatherData; timestamp: number }>();
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

export async function fetchWeather(
  lat: number,
  lon: number,
  city: string = ""
): Promise<WeatherData> {
  const cacheKey = `${lat.toFixed(2)},${lon.toFixed(2)}`;
  const cached = weatherCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  try {
    const res = await fetch(`/api/weather?lat=${lat}&lon=${lon}&city=${encodeURIComponent(city)}`);
    if (!res.ok) {
      throw new Error(`Weather fetch failed: ${res.statusText}`);
    }
    const data: WeatherData = await res.json();
    weatherCache.set(cacheKey, { data, timestamp: Date.now() });
    return data;
  } catch (err) {
    console.warn(`Weather fetch failed for ${city}, providing estimated fallback:`, err);
    // Safe graceful fallback so UI never crashes
    return {
      provider: "Standard Estimation",
      city: city || "Global Location",
      tempC: 22,
      tempF: 72,
      feelsLikeC: 22,
      feelsLikeF: 72,
      humidity: 55,
      windSpeedKmh: 14,
      condition: "Pleasant",
      icon: "cloud-sun",
      timestamp: new Date().toISOString(),
      forecast: [
        { date: "Day 1", dayOfWeek: "Today", maxC: 23, minC: 15, maxF: 73, minF: 59, condition: "Clear", icon: "sun", precipChance: 10 },
        { date: "Day 2", dayOfWeek: "Tomorrow", maxC: 24, minC: 16, maxF: 75, minF: 61, condition: "Partly Cloudy", icon: "cloud-sun", precipChance: 20 },
        { date: "Day 3", dayOfWeek: "Day 3", maxC: 22, minC: 14, maxF: 72, minF: 57, condition: "Clear", icon: "sun", precipChance: 5 },
        { date: "Day 4", dayOfWeek: "Day 4", maxC: 20, minC: 13, maxF: 68, minF: 55, condition: "Overcast", icon: "cloud", precipChance: 30 },
        { date: "Day 5", dayOfWeek: "Day 5", maxC: 21, minC: 14, maxF: 70, minF: 57, condition: "Partly Cloudy", icon: "cloud-sun", precipChance: 15 },
      ],
    };
  }
}

export async function searchGeocode(query: string) {
  if (!query || query.trim().length < 2) return [];
  try {
    const res = await fetch(`/api/geocode?q=${encodeURIComponent(query)}`);
    if (!res.ok) return [];
    const data = await res.json();
    return data.results || [];
  } catch (err) {
    console.error("Geocoding search error:", err);
    return [];
  }
}

export async function sendAIChat(
  message: string,
  destination?: Destination,
  conversationHistory: Array<{ role: string; content: string }> = []
): Promise<string> {
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, destination, conversationHistory }),
    });
    const data = await res.json();
    return data.reply || data.fallback || "I'm here to assist with all your travel queries. Please feel free to ask!";
  } catch (err) {
    console.error("AI Chat error:", err);
    return `### Travel Guide for ${destination?.name || "Your Journey"}\n\nHere are some recommendations:\n- **Recommended length**: 4 to 6 days\n- **Best season**: Spring or Autumn\n- **Must-see**: Local historic quarters and scenic viewpoints\n\n*(Note: Ensure Gemini API key is configured in settings for full conversation)*`;
  }
}

export const sendChatMessage = sendAIChat;

export async function planItinerary(params: {
  destination: string;
  country?: string;
  durationDays: number;
  travelStyle: string;
  budget: string;
  companions: string;
  interests: string[];
}): Promise<Itinerary> {
  try {
    const res = await fetch("/api/plan-itinerary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });
    const data = await res.json();
    if (data.itinerary) {
      return data.itinerary;
    }
    throw new Error(data.error || "Failed to generate itinerary");
  } catch (err) {
    console.error("Itinerary planning error:", err);
    throw err;
  }
}

export interface PhotoItem {
  id: string;
  url: string;
  thumb: string;
  photographer: string;
  photographerUrl?: string;
  description: string;
  source: string;
}

export async function fetchPhotos(query: string = "tropical beach"): Promise<PhotoItem[]> {
  try {
    const res = await fetch(`/api/photos?q=${encodeURIComponent(query)}`);
    if (res.ok) {
      const data = await res.json();
      if (data.photos && data.photos.length > 0) {
        return data.photos;
      }
    }
  } catch (err) {
    console.warn("fetchPhotos network error, using curated archive:", err);
  }
  
  // Intelligent curated fallback matching the user's query
  return getCuratedPhotos(query);
}
