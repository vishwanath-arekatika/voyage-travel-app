import React, { useState, useEffect } from "react";
import {
  X,
  MapPin,
  Compass,
  Search,
  Check,
  AlertCircle,
  Loader2,
  Globe,
} from "lucide-react";
import { UserLocation } from "../types";
import { searchGeocode } from "../services/api";

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLocation: UserLocation;
  onUpdateLocation?: (location: UserLocation) => void;
  onSelectLocation?: (location: UserLocation) => void;
  onRequestGeolocation?: () => void;
  isLocating?: boolean;
  locationError?: string | null;
}

const POPULAR_HUBS: Array<{ name: string; country: string; lat: number; lon: number }> = [
  { name: "New York", country: "United States", lat: 40.7128, lon: -74.006 },
  { name: "London", country: "United Kingdom", lat: 51.5074, lon: -0.1278 },
  { name: "Tokyo", country: "Japan", lat: 35.6762, lon: 139.6503 },
  { name: "Paris", country: "France", lat: 48.8566, lon: 2.3522 },
  { name: "San Francisco", country: "United States", lat: 37.7749, lon: -122.4194 },
  { name: "Sydney", country: "Australia", lat: -33.8688, lon: 151.2093 },
  { name: "Singapore", country: "Singapore", lat: 1.3521, lon: 103.8198 },
  { name: "Mumbai", country: "India", lat: 19.076, lon: 72.8777 },
];

export const LocationModal: React.FC<LocationModalProps> = ({
  isOpen,
  onClose,
  currentLocation,
  onUpdateLocation,
  onSelectLocation,
  onRequestGeolocation,
  isLocating = false,
  locationError = null,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [localLocating, setLocalLocating] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const setLocation = (loc: UserLocation) => {
    if (onUpdateLocation) onUpdateLocation(loc);
    if (onSelectLocation) onSelectLocation(loc);
  };

  const handleRequestGeo = () => {
    if (onRequestGeolocation) {
      onRequestGeolocation();
      return;
    }
    if (!("geolocation" in navigator)) {
      setLocalError("Geolocation is not supported by your browser");
      return;
    }
    setLocalLocating(true);
    setLocalError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          id: "browser-gps",
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          cityName: "Current GPS Location",
          country: "Detected Position",
          isDetected: true,
          permissionState: "granted",
        });
        setLocalLocating(false);
        onClose();
      },
      (err) => {
        setLocalLocating(false);
        setLocalError(err.message || "Location permission denied");
      },
      { timeout: 8000 }
    );
  };

  useEffect(() => {
    if (!searchQuery.trim() || searchQuery.trim().length < 2) {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      const results = await searchGeocode(searchQuery);
      setSearchResults(results);
      setIsSearching(false);
    }, 350);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  if (!isOpen) return null;

  const handleSelectResult = (item: any) => {
    setLocation({
      latitude: item.latitude,
      longitude: item.longitude,
      cityName: item.name,
      country: item.country,
      isDetected: false,
      permissionState: "custom",
    });
    onClose();
  };

  const handleSelectHub = (hub: (typeof POPULAR_HUBS)[0]) => {
    setLocation({
      latitude: hub.lat,
      longitude: hub.lon,
      cityName: hub.name,
      country: hub.country,
      isDetected: false,
      permissionState: "custom",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        id="location-modal-container"
        className="relative w-full max-w-lg bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-800">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-amber-400/10 text-amber-400 border border-amber-400/20">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-semibold text-stone-100">
                Departure & Location
              </h3>
              <p className="text-xs text-stone-400">
                Used to calculate travel distances and compare local weather.
              </p>
            </div>
          </div>
          <button
            id="close-location-modal-btn"
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Active Location Display */}
        <div className="mt-4 p-3 rounded-xl bg-stone-950/70 border border-stone-800 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <Globe className="w-4 h-4 text-amber-400" />
            <div>
              <span className="text-[11px] uppercase tracking-wider text-stone-500 font-mono">
                Current Location
              </span>
              <p className="text-sm font-medium text-stone-200">
                {currentLocation.cityName}
                {currentLocation.country ? `, ${currentLocation.country}` : ""}
              </p>
            </div>
          </div>
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-stone-800 text-stone-400 border border-stone-700">
            {currentLocation.isDetected ? "Detected via GPS" : "Custom set"}
          </span>
        </div>

        {/* Error notification if geolocation denied */}
        {(locationError || localError) && (
          <div className="mt-3 p-3 rounded-xl bg-rose-950/40 border border-rose-800/60 text-xs text-rose-300 flex items-start space-x-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold">Location Access Notice: </span>
              {locationError || localError}
            </div>
          </div>
        )}

        {/* Geolocation Button */}
        <div className="mt-4">
          <button
            id="modal-detect-gps-btn"
            onClick={handleRequestGeo}
            disabled={isLocating || localLocating}
            className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl bg-stone-800 hover:bg-stone-750 text-stone-200 hover:text-white border border-stone-700/60 text-sm font-medium transition-all active:scale-[0.99] disabled:opacity-50"
          >
            {(isLocating || localLocating) ? (
              <>
                <Loader2 className="w-4 h-4 text-amber-400 animate-spin" />
                <span>Accessing your location...</span>
              </>
            ) : (
              <>
                <Compass className="w-4 h-4 text-amber-400" />
                <span>Use Current Device Location (GPS)</span>
              </>
            )}
          </button>
        </div>

        {/* Search Input for manual city lookup */}
        <div className="mt-5">
          <label className="block text-xs font-medium text-stone-400 mb-1.5">
            Or Search Any City Worldwide
          </label>
          <div className="relative">
            <Search className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              id="city-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="e.g., Berlin, Singapore, Chicago, Seoul..."
              className="w-full pl-9 pr-8 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500/80 focus:ring-1 focus:ring-amber-500/40"
            />
            {isSearching && (
              <Loader2 className="w-4 h-4 text-amber-400 animate-spin absolute right-3 top-1/2 -translate-y-1/2" />
            )}
          </div>

          {/* Autocomplete Search Results */}
          {searchResults.length > 0 && (
            <div className="mt-2 max-h-48 overflow-y-auto rounded-xl bg-stone-950 border border-stone-800 divide-y divide-stone-850 no-scrollbar">
              {searchResults.map((item) => (
                <button
                  key={`${item.id}-${item.latitude}`}
                  onClick={() => handleSelectResult(item)}
                  className="w-full px-3.5 py-2.5 text-left hover:bg-stone-850 flex items-center justify-between text-xs transition-colors group"
                >
                  <div>
                    <span className="font-semibold text-stone-200 group-hover:text-amber-400">
                      {item.name}
                    </span>
                    <span className="text-stone-400 ml-1.5">
                      {item.admin1 ? `${item.admin1}, ` : ""}
                      {item.country}
                    </span>
                  </div>
                  <span className="text-[10px] text-stone-500 font-mono">
                    {item.latitude.toFixed(2)}°, {item.longitude.toFixed(2)}°
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Popular Global Hubs */}
        <div className="mt-5">
          <span className="text-xs font-medium text-stone-400 block mb-2">
            Popular Global Hubs:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {POPULAR_HUBS.map((hub) => {
              const isSelected = currentLocation.cityName === hub.name;
              return (
                <button
                  key={hub.name}
                  onClick={() => handleSelectHub(hub)}
                  className={`px-2.5 py-1 rounded-lg text-xs transition-colors flex items-center space-x-1 border ${
                    isSelected
                      ? "bg-amber-400/15 border-amber-400/40 text-amber-300 font-medium"
                      : "bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200 hover:border-stone-700"
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 text-amber-400" />}
                  <span>{hub.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-6 pt-4 border-t border-stone-800/80 flex items-center justify-between text-[11px] text-stone-400">
          <span>All coordinates verified via Open-Meteo Geocoding.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
