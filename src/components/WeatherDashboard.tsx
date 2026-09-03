import React, { useState, useEffect } from "react";
import {
  CloudSun,
  MapPin,
  Wind,
  Droplets,
  Search,
  Compass,
  ArrowRight,
  Sun,
  Cloud,
  CloudRain,
  Snowflake,
  CloudLightning,
  Sparkles,
  Loader2,
  Calendar,
} from "lucide-react";
import { UserLocation, WeatherData } from "../types";
import { fetchWeather, searchGeocode } from "../services/api";
import { DESTINATIONS } from "../data/destinations";

interface WeatherDashboardProps {
  userLocation: UserLocation;
  unit: "C" | "F";
  onToggleUnit: () => void;
  onOpenLocationModal: () => void;
}

export const WeatherDashboard: React.FC<WeatherDashboardProps> = ({
  userLocation,
  unit,
  onToggleUnit,
  onOpenLocationModal,
}) => {
  const [localWeather, setLocalWeather] = useState<WeatherData | null>(null);
  const [loadingLocal, setLoadingLocal] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedCityWeather, setSelectedCityWeather] = useState<WeatherData | null>(null);
  const [selectedCityName, setSelectedCityName] = useState<string>("");
  const [destinationsWeather, setDestinationsWeather] = useState<Record<string, WeatherData>>({});

  useEffect(() => {
    setLoadingLocal(true);
    fetchWeather(userLocation.latitude, userLocation.longitude, userLocation.cityName)
      .then((data) => setLocalWeather(data))
      .finally(() => setLoadingLocal(false));
  }, [userLocation]);

  useEffect(() => {
    // Fetch quick weather for top 6 destinations
    DESTINATIONS.slice(0, 6).forEach((dest) => {
      fetchWeather(dest.coordinates.lat, dest.coordinates.lon, dest.name).then((data) => {
        setDestinationsWeather((prev) => ({ ...prev, [dest.id]: data }));
      });
    });
  }, []);

  const handleSearchSubmit = async (query: string) => {
    if (!query.trim()) return;
    const results = await searchGeocode(query);
    setSearchResults(results);
    if (results.length > 0) {
      const top = results[0];
      handleSelectCity(top);
    }
  };

  const handleSelectCity = async (item: any) => {
    setSelectedCityName(`${item.name}, ${item.country}`);
    const data = await fetchWeather(item.latitude, item.longitude, item.name);
    setSelectedCityWeather(data);
    setSearchResults([]);
  };

  const getWeatherIcon = (iconName: string) => {
    switch (iconName) {
      case "sun":
        return <Sun className="w-6 h-6 text-amber-400" />;
      case "cloud-sun":
        return <CloudSun className="w-6 h-6 text-amber-300" />;
      case "cloud":
        return <Cloud className="w-6 h-6 text-stone-300" />;
      case "cloud-rain":
      case "cloud-drizzle":
        return <CloudRain className="w-6 h-6 text-sky-400" />;
      case "snowflake":
        return <Snowflake className="w-6 h-6 text-cyan-300" />;
      case "cloud-lightning":
        return <CloudLightning className="w-6 h-6 text-purple-400" />;
      default:
        return <CloudSun className="w-6 h-6 text-amber-400" />;
    }
  };

  return (
    <div id="weather-dashboard-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-800 pb-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-medium mb-3">
            <CloudSun className="w-3.5 h-3.5" />
            <span>OpenWeather & Open-Meteo Meteorological Engine</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-100">
            Global Meteorological Center
          </h1>
          <p className="text-sm text-stone-400 mt-1 max-w-xl">
            Real-time atmospheric telemetry, temperature differentials, wind vectors, and 5-day forecasts across global destinations.
          </p>
        </div>

        {/* Unit Toggle & Change Location */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleUnit}
            className="px-3.5 py-2 rounded-xl bg-stone-900 border border-stone-800 hover:border-stone-700 text-xs font-mono text-stone-200 transition-colors"
          >
            Unit: <span className="text-amber-400 font-bold">°{unit}</span> (Toggle)
          </button>
          <button
            onClick={onOpenLocationModal}
            className="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 border border-stone-700 text-xs font-medium text-stone-100 transition-colors flex items-center space-x-1.5"
          >
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>Change Base ({userLocation.cityName})</span>
          </button>
        </div>
      </div>

      {/* Primary Cards Grid: Current Location Weather & Target Search Weather */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Card 1: Your Detected Location */}
        <div className="bg-stone-900/90 rounded-2xl border border-stone-800 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase tracking-wider text-amber-400/90 font-mono font-semibold flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                Detected Origin Weather
              </span>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-stone-800 text-stone-400 border border-stone-700">
                {localWeather?.provider || "OpenWeather Engine"}
              </span>
            </div>

            <div className="flex items-baseline justify-between">
              <div>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-100">
                  {userLocation.cityName}
                </h2>
                <p className="text-sm text-stone-400">
                  {userLocation.country || "Local Coordinates"}
                </p>
              </div>

              {localWeather && (
                <div className="text-right">
                  <div className="text-4xl sm:text-5xl font-mono font-bold text-stone-100">
                    {unit === "C" ? `${localWeather.tempC}°C` : `${localWeather.tempF}°F`}
                  </div>
                  <p className="text-xs text-amber-400 font-medium capitalize mt-1">
                    {localWeather.condition}
                  </p>
                </div>
              )}
            </div>

            {loadingLocal ? (
              <div className="py-12 flex justify-center">
                <Loader2 className="w-6 h-6 text-amber-400 animate-spin" />
              </div>
            ) : localWeather ? (
              <>
                <div className="grid grid-cols-3 gap-3 my-6 pt-6 border-t border-stone-800/80">
                  <div className="p-3 rounded-xl bg-stone-950 border border-stone-850">
                    <span className="text-[11px] text-stone-500 block mb-1">Feels Like</span>
                    <span className="text-sm font-semibold text-stone-200 font-mono">
                      {unit === "C" ? `${localWeather.feelsLikeC}°C` : `${localWeather.feelsLikeF}°F`}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-stone-950 border border-stone-850">
                    <span className="text-[11px] text-stone-500 block mb-1 flex items-center gap-1">
                      <Droplets className="w-3 h-3 text-sky-400" /> Humidity
                    </span>
                    <span className="text-sm font-semibold text-stone-200 font-mono">
                      {localWeather.humidity}%
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-stone-950 border border-stone-850">
                    <span className="text-[11px] text-stone-500 block mb-1 flex items-center gap-1">
                      <Wind className="w-3 h-3 text-amber-400" /> Wind
                    </span>
                    <span className="text-sm font-semibold text-stone-200 font-mono">
                      {localWeather.windSpeedKmh} km/h
                    </span>
                  </div>
                </div>

                {/* 5-Day Forecast Strip */}
                {localWeather.forecast && (
                  <div>
                    <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider block mb-3">
                      5-Day Atmospheric Forecast:
                    </span>
                    <div className="grid grid-cols-5 gap-2">
                      {localWeather.forecast.map((day) => (
                        <div
                          key={day.date}
                          className="p-2.5 rounded-xl bg-stone-950/80 border border-stone-800 text-center flex flex-col items-center justify-between"
                        >
                          <span className="text-xs font-medium text-stone-400">{day.dayOfWeek}</span>
                          <div className="my-1.5">{getWeatherIcon(day.icon)}</div>
                          <span className="text-xs font-mono font-bold text-stone-200">
                            {unit === "C" ? `${day.maxC}°` : `${day.maxF}°`}
                          </span>
                          <span className="text-[10px] text-stone-500 font-mono">
                            {unit === "C" ? `${day.minC}°` : `${day.minF}°`}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : null}
          </div>
        </div>

        {/* Card 2: Interactive City / Destination Lookup */}
        <div className="bg-stone-900/90 rounded-2xl border border-stone-800 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase tracking-wider text-stone-400 font-mono font-semibold flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5 text-amber-400" />
                Live City Query
              </span>
              <span className="text-xs text-stone-500">Worldwide Geocoding</span>
            </div>

            {/* City search input */}
            <div className="relative mb-4">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearchSubmit(searchQuery);
                }}
                placeholder="Search any destination e.g. Tokyo, Reykjavik, Honolulu..."
                className="w-full pl-9 pr-24 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-400/80"
              />
              <button
                onClick={() => handleSearchSubmit(searchQuery)}
                className="absolute right-1.5 top-1.5 bottom-1.5 px-3 rounded-lg bg-amber-400 hover:bg-amber-300 text-stone-950 font-semibold text-xs transition-colors"
              >
                Check
              </button>
            </div>

            {/* If a city has been inspected */}
            {selectedCityWeather ? (
              <div className="p-5 rounded-xl bg-stone-950 border border-stone-800 mt-4 animate-in fade-in">
                <div className="flex items-baseline justify-between mb-4">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-stone-100">
                      {selectedCityWeather.city || selectedCityName}
                    </h3>
                    <p className="text-xs text-stone-400">Atmospheric status</p>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-mono font-bold text-amber-300">
                      {unit === "C" ? `${selectedCityWeather.tempC}°C` : `${selectedCityWeather.tempF}°F`}
                    </span>
                    <span className="block text-xs text-stone-400 capitalize">
                      {selectedCityWeather.condition}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-stone-900 border border-stone-800">
                    <span className="text-stone-500 block">Humidity</span>
                    <span className="font-mono font-semibold text-stone-200">
                      {selectedCityWeather.humidity}%
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-stone-900 border border-stone-800">
                    <span className="text-stone-500 block">Wind</span>
                    <span className="font-mono font-semibold text-stone-200">
                      {selectedCityWeather.windSpeedKmh} km/h
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-stone-900 border border-stone-800">
                    <span className="text-stone-500 block">Feels Like</span>
                    <span className="font-mono font-semibold text-stone-200">
                      {unit === "C" ? `${selectedCityWeather.feelsLikeC}°C` : `${selectedCityWeather.feelsLikeF}°F`}
                    </span>
                  </div>
                </div>

                {selectedCityWeather.forecast && (
                  <div className="mt-4 pt-4 border-t border-stone-850">
                    <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block mb-2">
                      Upcoming Forecast:
                    </span>
                    <div className="grid grid-cols-5 gap-1.5 text-center">
                      {selectedCityWeather.forecast.map((d) => (
                        <div key={d.date} className="p-1.5 rounded bg-stone-900 border border-stone-850">
                          <span className="text-[10px] text-stone-400 block">{d.dayOfWeek}</span>
                          <span className="text-xs font-mono font-bold text-stone-200">
                            {unit === "C" ? `${d.maxC}°` : `${d.maxF}°`}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="py-12 text-center text-stone-500 text-xs border border-dashed border-stone-800 rounded-xl mt-2">
                Type any city above or pick from popular destination spots below to inspect live climate conditions.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Destination Weather Comparison Matrix */}
      <div className="mt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-2xl font-bold text-stone-100">
            Compare Featured Destinations
          </h2>
          <span className="text-xs text-stone-400">Real-time sync</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {DESTINATIONS.slice(0, 6).map((dest) => {
            const w = destinationsWeather[dest.id];
            return (
              <div
                key={dest.id}
                onClick={() => {
                  setSelectedCityName(`${dest.name}, ${dest.country}`);
                  if (w) setSelectedCityWeather(w);
                }}
                className="p-4 rounded-xl bg-stone-900/80 border border-stone-800 hover:border-amber-400/50 cursor-pointer transition-all flex items-center justify-between group"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={dest.heroImage}
                    alt={dest.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <h4 className="font-medium text-stone-200 group-hover:text-amber-300 transition-colors">
                      {dest.name}
                    </h4>
                    <span className="text-xs text-stone-400">{dest.country}</span>
                  </div>
                </div>

                <div className="text-right">
                  {w ? (
                    <>
                      <span className="text-lg font-mono font-bold text-amber-400">
                        {unit === "C" ? `${w.tempC}°C` : `${w.tempF}°F`}
                      </span>
                      <span className="text-[11px] text-stone-400 block capitalize">
                        {w.condition}
                      </span>
                    </>
                  ) : (
                    <span className="text-xs text-stone-500 font-mono">Syncing...</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
