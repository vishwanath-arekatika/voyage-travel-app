export type Region = "All" | "Europe" | "Asia" | "Americas" | "Africa" | "Oceania";
export type Vibe = "All" | "Cultural" | "Coastal & Islands" | "Mountain & Adventure" | "Historic" | "Culinary" | "Urban Architecture";

export interface FamousPlace {
  id: string;
  name: string;
  category: "Monument" | "Nature & Scenic" | "Historic Quarter" | "Museum & Art" | "Culinary & Market" | "Architectural Icon" | string;
  image: string;
  description: string;
  highlights: string[];
  visitorTips: string;
  bestTimeToExplore: string;
  entryFee: string;
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  region: "Europe" | "Asia" | "Americas" | "Africa" | "Oceania";
  coordinates: {
    lat: number;
    lon: number;
  };
  tagline: string;
  description: string;
  culture?: string;
  idealDurationDays?: number;
  safetyScore?: number;
  heroImage: string;
  galleryImages: string[];
  bestTimeToVisit: string;
  language: string;
  currency: string;
  timezone: string;
  costLevel: "$" | "$$" | "$$$" | "$$$$";
  vibes: string[];
  famousPlaces: FamousPlace[];
  quickFacts: { label: string; value: string }[];
}

export interface WeatherDayForecast {
  date: string;
  dayOfWeek: string;
  maxC: number;
  minC: number;
  maxF: number;
  minF: number;
  condition: string;
  icon: string;
  precipChance: number;
}

export interface WeatherData {
  provider: string;
  city: string;
  latitude?: number;
  longitude?: number;
  tempC: number;
  tempF: number;
  feelsLikeC: number;
  feelsLikeF: number;
  humidity: number;
  windSpeedKmh: number;
  isDay?: boolean;
  condition: string;
  description?: string;
  icon: string;
  forecast?: WeatherDayForecast[];
  timestamp: string;
}

export interface UserLocation {
  id?: string;
  latitude: number;
  longitude: number;
  cityName: string;
  country?: string;
  countryCode?: string;
  isDetected: boolean;
  permissionState?: "prompt" | "granted" | "denied" | "custom";
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  theme: string;
  morning: {
    activity: string;
    description: string;
    duration: string;
    tip: string;
  };
  afternoon: {
    activity: string;
    description: string;
    duration: string;
    tip: string;
  };
  evening: {
    activity: string;
    description: string;
    duration: string;
    tip: string;
  };
  culinaryHighlight?: {
    dish: string;
    spot: string;
    notes: string;
  };
}

export interface Itinerary {
  destination: string;
  country: string;
  totalDays: number;
  summary: string;
  bestTimeToVisit: string;
  packingEssentials: string[];
  estimatedDailyBudget: string;
  days: ItineraryDay[];
}
