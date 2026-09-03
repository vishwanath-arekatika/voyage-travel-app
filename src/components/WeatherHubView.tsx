import React, { useState, useEffect } from "react";
import {
  Cloud,
  Sun,
  CloudRain,
  Wind,
  Droplets,
  Thermometer,
  Search,
  Compass,
  ArrowRight,
  Clock,
  Sparkles,
  MapPin,
  RefreshCw,
} from "lucide-react";
import { Destination, UserLocation, WeatherData } from "../types";
import { fetchWeather, searchGeocode } from "../services/api";

interface WeatherHubViewProps {
  userLocation: UserLocation;
  tempUnit: "C" | "F";
  onToggleTempUnit: () => void;
  destinations: Destination[];
  onSelectDestination: (destination: Destination) => void;
  onOpenLocationModal: () => void;
}

export const WeatherHubView: React.FC<WeatherHubViewProps> = ({
  userLocation,
  tempUnit,
  onToggleTempUnit,
  destinations,
  onSelectDestination,
  onOpenLocationModal,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [activeWeather, setActiveWeather] = useState<WeatherData | null>(null);
  const [userWeather, setUserWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user location weather on mount
  useEffect(() => {
    let mounted = true;
    async function loadUserWeather() {
      try {
        const data = await fetchWeather(
          userLocation.latitude,
          userLocation.longitude,
          userLocation.cityName
        );
        if (mounted) {
          setUserWeather(data);
          if (!activeWeather) setActiveWeather(data);
        }
      } catch (err) {
        console.error("Failed to load user weather:", err);
      } finally {
        if (mounted) setIsLoading(false);
      }
    }
    loadUserWeather();
    return () => {
      mounted = false;
    };
  }, [userLocation]);

  // Handle location search
  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    try {
      const results = await searchGeocode(searchQuery);
      setSearchResults(results);
      if (results.length > 0) {
        handleSelectCity(results[0]);
      }
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectCity = async (city: any) => {
    setIsLoading(true);
    setSearchResults([]);
    setSearchQuery(`${city.name}, ${city.country}`);
    try {
      const data = await fetchWeather(city.latitude, city.longitude, city.name);
      setActiveWeather(data);
    } catch (err) {
      console.error("Weather error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const getWeatherIcon = (iconName: string) => {
    switch (iconName) {
      case "sun":
        return <Sun className="w-8 h-8 text-amber-400" />;
      case "cloud-rain":
        return <CloudRain className="w-8 h-8 text-blue-400" />;
      default:
        return <Cloud className="w-8 h-8 text-stone-300" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-stone-800 pb-6">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-2.5">
            <Cloud className="w-3.5 h-3.5" />
            <span>OpenWeather & Open-Meteo Meteorological Hub</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-100">
            Global Weather & Travel Forecasts
          </h1>
          <p className="text-sm text-stone-400 mt-1 max-w-xl">
            Live meteorological data, 5-day forecasts, atmospheric humidity, and departure weather
            comparisons powered by OpenWeather and Open-Meteo.
          </p>
        </div>

        {/* Units & Refresh */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onToggleTempUnit}
            className="px-3.5 py-1.5 rounded-xl bg-stone-900 border border-stone-800 text-xs font-medium text-stone-300 hover:text-white hover:border-stone-700 transition-colors"
          >
            Displaying: <span className="font-semibold text-amber-400">°{tempUnit}</span>
          </button>
          <button
            onClick={onOpenLocationModal}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-stone-900 border border-stone-800 text-xs text-stone-300 hover:text-white hover:border-stone-700 transition-colors"
          >
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>My Location</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-2xl mx-auto mb-10">
        <form onSubmit={handleSearchSubmit} className="flex items-center">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search any world city (e.g. Malé, Tokyo, Paris, Rome, Sydney)..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-stone-900/90 border border-stone-800 text-stone-100 text-sm placeholder-stone-400 focus:outline-none focus:border-amber-400/80 focus:ring-1 focus:ring-amber-400/50"
            />
          </div>
          <button
            type="submit"
            disabled={isSearching}
            className="ml-2 px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-semibold text-sm transition-colors"
          >
            {isSearching ? "Searching..." : "Search"}
          </button>
        </form>

        {/* Autocomplete Dropdown */}
        {searchResults.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-stone-900 border border-stone-800 rounded-xl overflow-hidden shadow-2xl z-30 divide-y divide-stone-800/60">
            {searchResults.map((city, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectCity(city)}
                className="w-full px-4 py-2.5 text-left text-xs text-stone-300 hover:bg-stone-800 flex items-center justify-between transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>
                    {city.name}, {city.country}
                  </span>
                </div>
                <span className="text-[11px] text-stone-400 font-mono">
                  {city.latitude.toFixed(1)}°, {city.longitude.toFixed(1)}°
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Weather Display */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 text-stone-400">
          <RefreshCw className="w-8 h-8 animate-spin text-amber-400 mb-3" />
          <p className="text-sm">Fetching real-time meteorological metrics...</p>
        </div>
      ) : activeWeather ? (
        <div className="space-y-8">
          {/* Hero Weather Card */}
          <div className="bg-gradient-to-br from-stone-900 via-stone-900/90 to-stone-950 rounded-3xl border border-stone-800 p-6 sm:p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
              <div>
                <div className="flex items-center space-x-2 text-stone-400 text-xs mb-2">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>
                    {activeWeather.city}{" "}
                    {activeWeather.latitude && activeWeather.longitude
                      ? `(${activeWeather.latitude.toFixed(2)}°, ${activeWeather.longitude.toFixed(2)}°)`
                      : ""}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-stone-600" />
                  <span>Provider: {activeWeather.provider}</span>
                </div>

                <div className="flex items-baseline space-x-4">
                  <span className="font-serif text-6xl sm:text-7xl font-bold text-stone-100">
                    {tempUnit === "C" ? activeWeather.tempC : activeWeather.tempF}°
                  </span>
                  <span className="text-xl text-stone-400">
                    {activeWeather.condition}
                  </span>
                </div>

                <p className="text-sm text-stone-400 mt-2">
                  Feels like {tempUnit === "C" ? activeWeather.feelsLikeC : activeWeather.feelsLikeF}°
                  • {activeWeather.isDay !== false ? "Daytime conditions" : "Night conditions"}
                </p>
              </div>

              {/* Weather Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full md:w-auto">
                <div className="p-4 rounded-2xl bg-stone-950/60 border border-stone-800/80 flex items-center space-x-3">
                  <Droplets className="w-5 h-5 text-blue-400" />
                  <div>
                    <span className="text-[11px] text-stone-400 uppercase tracking-wider block">
                      Humidity
                    </span>
                    <span className="text-base font-semibold text-stone-200">
                      {activeWeather.humidity}%
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-stone-950/60 border border-stone-800/80 flex items-center space-x-3">
                  <Wind className="w-5 h-5 text-teal-400" />
                  <div>
                    <span className="text-[11px] text-stone-400 uppercase tracking-wider block">
                      Wind Speed
                    </span>
                    <span className="text-base font-semibold text-stone-200">
                      {activeWeather.windSpeedKmh} km/h
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-stone-950/60 border border-stone-800/80 flex items-center space-x-3 col-span-2 sm:col-span-1">
                  <Thermometer className="w-5 h-5 text-amber-400" />
                  <div>
                    <span className="text-[11px] text-stone-400 uppercase tracking-wider block">
                      Comfort
                    </span>
                    <span className="text-base font-semibold text-stone-200">
                      {activeWeather.tempC > 28 ? "Tropical Warm" : activeWeather.tempC > 18 ? "Pleasant" : "Crisp Cool"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 5-Day Forecast Grid */}
            {activeWeather.forecast && activeWeather.forecast.length > 0 && (
              <div className="mt-8 pt-6 border-t border-stone-800/80">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-4 flex items-center space-x-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>5-Day Weather Outlook</span>
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {activeWeather.forecast.map((day, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-stone-950/50 border border-stone-800/60 text-center flex flex-col items-center justify-between"
                    >
                      <span className="text-xs font-semibold text-stone-300 block mb-1">
                        {day.dayOfWeek}
                      </span>
                      <div className="my-2">{getWeatherIcon(day.icon)}</div>
                      <span className="text-[11px] text-stone-400 block mb-1.5">
                        {day.condition}
                      </span>
                      <div className="text-xs font-mono text-stone-200">
                        <span className="font-bold text-amber-300">
                          {tempUnit === "C" ? day.maxC : day.maxF}°
                        </span>{" "}
                        <span className="text-stone-500">
                          / {tempUnit === "C" ? day.minC : day.minF}°
                        </span>
                      </div>
                      {day.precipChance > 0 && (
                        <span className="text-[10px] text-blue-400 mt-1 font-mono">
                          {day.precipChance}% rain
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quick Destination Weather Cards */}
          <div>
            <h2 className="font-serif text-2xl font-bold text-stone-100 mb-4">
              Featured Destinations Current Conditions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {destinations.slice(0, 4).map((dest) => (
                <div
                  key={dest.id}
                  onClick={() => onSelectDestination(dest)}
                  className="bg-stone-900/80 border border-stone-800/80 hover:border-stone-700 rounded-2xl p-4 cursor-pointer transition-all hover:scale-[1.01] group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                      {dest.country}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-stone-500 group-hover:text-amber-400 transition-colors" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-stone-100 group-hover:text-amber-300 transition-colors">
                    {dest.name}
                  </h3>
                  <p className="text-xs text-stone-400 line-clamp-1 mt-1">
                    {dest.tagline}
                  </p>
                  <div className="mt-3 pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs text-stone-400">
                    <span>Best time:</span>
                    <span className="text-stone-300 text-[11px]">
                      {dest.bestTimeToVisit.split("(")[0]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
