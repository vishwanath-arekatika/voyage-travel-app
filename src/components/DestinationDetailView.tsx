import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Globe,
  Coins,
  Clock,
  Sparkles,
  Compass,
  Navigation,
  Image as ImageIcon,
  Share2,
  Bookmark,
  BookmarkCheck,
  ExternalLink,
  ChevronRight,
  Cloud,
  Sun,
  CloudRain,
} from "lucide-react";
import { Destination, UserLocation, WeatherData } from "../types";
import { FamousPlacesSection } from "./FamousPlacesSection";
import { fetchWeather } from "../services/api";

interface DestinationDetailViewProps {
  destination: Destination;
  userLocation: UserLocation;
  tempUnit: "C" | "F";
  onBack: () => void;
  onOpenItineraryForDest: (dest: Destination) => void;
  onOpenChatForDest: (dest: Destination) => void;
}

export const DestinationDetailView: React.FC<DestinationDetailViewProps> = ({
  destination,
  userLocation,
  tempUnit,
  onBack,
  onOpenItineraryForDest,
  onOpenChatForDest,
}) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoadingWeather, setIsLoadingWeather] = useState(true);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Fetch destination live weather
  useEffect(() => {
    let isMounted = true;
    async function loadDestWeather() {
      setIsLoadingWeather(true);
      try {
        const data = await fetchWeather(
          destination.coordinates.lat,
          destination.coordinates.lon,
          destination.name
        );
        if (isMounted) setWeather(data);
      } catch (err) {
        console.error("Weather error:", err);
      } finally {
        if (isMounted) setIsLoadingWeather(false);
      }
    }
    loadDestWeather();
    return () => {
      isMounted = false;
    };
  }, [destination]);

  // Calculate distance in km from user location
  const calculateDistance = () => {
    const lat1 = userLocation.latitude;
    const lon1 = userLocation.longitude;
    const lat2 = destination.coordinates.lat;
    const lon2 = destination.coordinates.lon;
    const R = 6371; // Earth's radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c);
  };

  const distanceKm = calculateDistance();

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="min-h-screen bg-stone-950 pb-20">
      {/* Top Breadcrumb & Actions Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4 flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center space-x-2 text-xs font-medium text-stone-400 hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Destinations</span>
        </button>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className="p-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 hover:text-amber-400 transition-colors"
            title="Bookmark destination"
          >
            {isBookmarked ? (
              <BookmarkCheck className="w-4 h-4 text-amber-400" />
            ) : (
              <Bookmark className="w-4 h-4" />
            )}
          </button>
          <button
            onClick={handleShare}
            className="p-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 hover:text-white transition-colors text-xs flex items-center space-x-1.5"
            title="Copy share link"
          >
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">{copiedLink ? "Link Copied" : "Share"}</span>
          </button>
        </div>
      </div>

      {/* Hero Visual Header */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="relative h-[480px] sm:h-[540px] rounded-3xl overflow-hidden border border-stone-800 bg-stone-900">
          <img
            src={destination.heroImage}
            alt={destination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-black/30" />

          {/* Hero Badges */}
          <div className="absolute top-6 left-6 flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-stone-950/80 backdrop-blur-md text-amber-400 border border-amber-500/30">
              {destination.region}
            </span>
            {destination.vibes.map((vibe) => (
              <span
                key={vibe}
                className="px-3 py-1 rounded-full text-xs font-medium bg-stone-950/80 backdrop-blur-md text-stone-200 border border-stone-800"
              >
                {vibe}
              </span>
            ))}
          </div>

          {/* Gallery Trigger Button */}
          <button
            onClick={() => setActiveGalleryIndex(0)}
            className="absolute bottom-6 right-6 z-10 px-4 py-2 rounded-xl bg-stone-950/80 hover:bg-stone-900 backdrop-blur-md text-xs font-medium text-stone-200 border border-stone-700/60 transition-colors flex items-center space-x-2"
          >
            <ImageIcon className="w-4 h-4 text-amber-400" />
            <span>View Photography Gallery ({destination.galleryImages.length + 1})</span>
          </button>

          {/* Title & Tagline overlay */}
          <div className="absolute bottom-6 left-6 right-24 sm:right-64 z-10">
            <div className="flex items-center space-x-2 text-amber-400 text-xs font-medium mb-2">
              <MapPin className="w-4 h-4" />
              <span>
                {destination.name}, {destination.country}
              </span>
              <span className="text-stone-400">• {distanceKm.toLocaleString()} km from you</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-2 leading-tight">
              {destination.name}
            </h1>
            <p className="text-sm sm:text-base text-stone-200 max-w-2xl font-light">
              {destination.tagline}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Two-Column Overview & Live Weather */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Narrative & Quick Facts */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-stone-900/80 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="font-serif text-2xl font-bold text-stone-100 mb-3">
                  About {destination.name}
                </h2>
                <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                  {destination.description}
                </p>
              </div>

              {/* Best Season Callout */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-stone-200 flex items-start space-x-3">
                <Calendar className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-amber-300 block mb-0.5">
                    Optimal Travel Season:
                  </span>
                  <span>{destination.bestTimeToVisit}</span>
                </div>
              </div>

              {/* Quick Facts Grid */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-3">
                  Essential Regional Context
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3.5 rounded-xl bg-stone-950/70 border border-stone-800/80">
                    <div className="flex items-center space-x-1.5 text-stone-400 text-xs mb-1">
                      <Globe className="w-3.5 h-3.5 text-amber-400" />
                      <span>Language</span>
                    </div>
                    <span className="text-xs font-semibold text-stone-200 block truncate">
                      {destination.language}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-stone-950/70 border border-stone-800/80">
                    <div className="flex items-center space-x-1.5 text-stone-400 text-xs mb-1">
                      <Coins className="w-3.5 h-3.5 text-amber-400" />
                      <span>Currency</span>
                    </div>
                    <span className="text-xs font-semibold text-stone-200 block truncate">
                      {destination.currency}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-stone-950/70 border border-stone-800/80">
                    <div className="flex items-center space-x-1.5 text-stone-400 text-xs mb-1">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>Timezone</span>
                    </div>
                    <span className="text-xs font-semibold text-stone-200 block truncate">
                      {destination.timezone}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-stone-950/70 border border-stone-800/80">
                    <div className="flex items-center space-x-1.5 text-stone-400 text-xs mb-1">
                      <Navigation className="w-3.5 h-3.5 text-amber-400" />
                      <span>Cost Level</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-amber-400 block">
                      {destination.costLevel}
                    </span>
                  </div>
                </div>
              </div>

              {/* Specific Facts */}
              {destination.quickFacts && destination.quickFacts.length > 0 && (
                <div className="pt-4 border-t border-stone-800">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {destination.quickFacts.map((fact, idx) => (
                      <div
                        key={idx}
                        className="flex items-baseline justify-between text-xs p-2.5 rounded-lg bg-stone-950/40 border border-stone-800/60"
                      >
                        <span className="text-stone-400">{fact.label}:</span>
                        <span className="font-medium text-stone-200">{fact.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Live OpenWeather Card & AI Actions */}
          <div className="lg:col-span-4 space-y-6">
            {/* Live Weather Widget */}
            <div className="bg-stone-900/90 border border-stone-800 rounded-3xl p-6 relative overflow-hidden">
              <div className="flex items-center justify-between mb-4 border-b border-stone-800 pb-3">
                <div className="flex items-center space-x-2">
                  <Cloud className="w-4 h-4 text-blue-400" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-300">
                    Live Meteorology
                  </span>
                </div>
                <span className="text-[10px] text-stone-500 font-mono">OpenWeather / Open-Meteo</span>
              </div>

              {isLoadingWeather ? (
                <div className="py-8 text-center text-xs text-stone-400">
                  Fetching current weather...
                </div>
              ) : weather ? (
                <div className="space-y-4">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="font-serif text-5xl font-bold text-stone-100">
                        {tempUnit === "C" ? weather.tempC : weather.tempF}°{tempUnit}
                      </span>
                      <p className="text-xs text-stone-400 mt-1">
                        {weather.condition} • Feels like{" "}
                        {tempUnit === "C" ? weather.feelsLikeC : weather.feelsLikeF}°
                      </p>
                    </div>
                    <div className="text-right text-xs text-stone-400 space-y-1 font-mono">
                      <div>Humidity: {weather.humidity}%</div>
                      <div>Wind: {weather.windSpeedKmh} km/h</div>
                    </div>
                  </div>

                  {/* 5-Day Outlook Miniature */}
                  {weather.forecast && weather.forecast.length > 0 && (
                    <div className="pt-3 border-t border-stone-800/80 space-y-2">
                      <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block">
                        5-Day Forecast
                      </span>
                      <div className="grid grid-cols-5 gap-1.5 text-center">
                        {weather.forecast.map((f, i) => (
                          <div
                            key={i}
                            className="p-2 rounded-xl bg-stone-950/60 border border-stone-800/50"
                          >
                            <span className="text-[10px] text-stone-400 block">{f.dayOfWeek.slice(0, 3)}</span>
                            <span className="text-xs font-bold text-stone-200 block mt-1">
                              {tempUnit === "C" ? f.maxC : f.maxF}°
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="py-6 text-center text-xs text-stone-500">
                  Weather unavailable
                </div>
              )}
            </div>

            {/* AI Action Trigger Card */}
            <div className="bg-gradient-to-br from-amber-500/15 via-stone-900 to-stone-900 border border-amber-500/30 rounded-3xl p-6 space-y-4">
              <div className="flex items-center space-x-2 text-amber-400 text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Google Gemini AI</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-100">
                Plan Your {destination.name} Visit
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                Generate a precision day-by-day itinerary or ask our AI travel concierge about
                secret sights, dress codes, and dining spots.
              </p>

              <div className="space-y-2 pt-2">
                <button
                  onClick={() => onOpenItineraryForDest(destination)}
                  className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-semibold text-xs transition-colors flex items-center justify-center space-x-2"
                >
                  <Compass className="w-4 h-4" />
                  <span>Generate AI Itinerary</span>
                </button>

                <button
                  onClick={() => onOpenChatForDest(destination)}
                  className="w-full py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-200 text-xs transition-colors flex items-center justify-center space-x-2"
                >
                  <span>Chat with Gemini Concierge</span>
                  <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Famous Places & Landmarks Section */}
        {destination.famousPlaces && destination.famousPlaces.length > 0 && (
          <FamousPlacesSection
            places={destination.famousPlaces}
            destinationName={destination.name}
          />
        )}
      </div>

      {/* Photography Lightbox Modal */}
      {activeGalleryIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-8 animate-in fade-in duration-300">
          <div className="flex items-center justify-between text-stone-300">
            <span className="text-xs font-medium font-mono">
              {destination.name} • Photo {activeGalleryIndex + 1} of{" "}
              {destination.galleryImages.length + 1}
            </span>
            <button
              onClick={() => setActiveGalleryIndex(null)}
              className="px-3 py-1.5 rounded-xl bg-stone-900 border border-stone-800 text-xs text-stone-300 hover:text-white"
            >
              Close (ESC)
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center p-4">
            <img
              src={
                activeGalleryIndex === 0
                  ? destination.heroImage
                  : destination.galleryImages[activeGalleryIndex - 1]
              }
              alt={destination.name}
              className="max-h-[75vh] max-w-full rounded-2xl object-contain shadow-2xl"
            />
          </div>

          {/* Thumbnails row */}
          <div className="flex items-center justify-center space-x-2 overflow-x-auto pb-2">
            {[destination.heroImage, ...destination.galleryImages].map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveGalleryIndex(idx)}
                className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                  activeGalleryIndex === idx ? "border-amber-400 scale-105" : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
