import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MapPin,
  ArrowUpRight,
  Compass,
  Calendar,
  CloudSun,
  Sparkles,
  Heart,
} from "lucide-react";
import { Destination, UserLocation, WeatherData } from "../types";
import { calculateDistanceKm, formatDistance } from "../data/destinations";
import { fetchWeather } from "../services/api";

interface DestinationCardProps {
  destination: Destination;
  userLocation: UserLocation;
  unit: "C" | "F";
  weather?: WeatherData;
  onSelect?: (destination: Destination) => void;
  onPlanTrip?: (destination: Destination) => void;
  isBookmarked?: boolean;
  onToggleBookmark?: (id: string) => void;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({
  destination,
  userLocation,
  unit,
  weather: initialWeather,
  onSelect,
  onPlanTrip,
  isBookmarked = false,
  onToggleBookmark,
}) => {
  const [weather, setWeather] = useState<WeatherData | null>(initialWeather || null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (initialWeather) {
      setWeather(initialWeather);
      return;
    }
    let isMounted = true;
    fetchWeather(destination.coordinates.lat, destination.coordinates.lon, destination.name)
      .then((data) => {
        if (isMounted) setWeather(data);
      })
      .catch(() => {});
    return () => {
      isMounted = false;
    };
  }, [destination, initialWeather]);

  const distanceKm = calculateDistanceKm(
    userLocation.latitude,
    userLocation.longitude,
    destination.coordinates.lat,
    destination.coordinates.lon
  );

  const handleCardClick = () => {
    if (onSelect) onSelect(destination);
    navigate(`/destination/${destination.id}`);
  };

  const handlePlanClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onPlanTrip) onPlanTrip(destination);
    navigate(`/itinerary?dest=${encodeURIComponent(destination.name)}`);
  };

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleBookmark) onToggleBookmark(destination.id);
  };

  return (
    <article
      id={`destination-card-${destination.id}`}
      onClick={handleCardClick}
      className="group relative bg-stone-900/90 rounded-2xl border border-stone-800/80 overflow-hidden hover:border-amber-400/50 hover:shadow-2xl hover:shadow-amber-950/20 transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Visual Image Banner with Subtle Zoom */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-950">
        <img
          src={destination.heroImage}
          alt={destination.name}
          loading="lazy"
          referrerPolicy="no-referrer"
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${
            imageLoaded ? "opacity-100 blur-0" : "opacity-0 blur-sm"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-black/30 pointer-events-none" />

        {/* Top Badges: Region & Cost & Bookmark */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
          <span className="px-2.5 py-1 rounded-full text-[11px] font-medium tracking-wide bg-stone-900/80 backdrop-blur-md text-stone-200 border border-stone-700/60">
            {destination.region}
          </span>

          <div className="flex items-center space-x-1.5">
            {/* Live Weather pill */}
            {weather ? (
              <span className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-mono bg-stone-950/80 backdrop-blur-md text-amber-300 border border-amber-500/30">
                <CloudSun className="w-3.5 h-3.5 text-amber-400" />
                <span>{unit === "C" ? `${weather.tempC}°C` : `${weather.tempF}°F`}</span>
              </span>
            ) : (
              <span className="px-2 py-1 rounded-full text-[10px] bg-stone-900/80 text-stone-400">
                Live Weather...
              </span>
            )}
            <span className="px-2 py-1 rounded-full text-xs font-mono font-bold bg-stone-900/80 text-stone-300 border border-stone-700/60">
              {destination.costLevel}
            </span>
            {onToggleBookmark && (
              <button
                onClick={handleBookmarkClick}
                className={`p-1.5 rounded-full backdrop-blur-md border transition-colors ${
                  isBookmarked
                    ? "bg-amber-400/20 border-amber-400 text-amber-400"
                    : "bg-stone-900/80 border-stone-700/60 text-stone-400 hover:text-white"
                }`}
                title="Bookmark destination"
              >
                <Heart className={`w-3.5 h-3.5 ${isBookmarked ? "fill-amber-400" : ""}`} />
              </button>
            )}
          </div>
        </div>

        {/* Distance from current location */}
        <div className="absolute bottom-3 left-3.5 flex items-center space-x-1.5 text-xs text-stone-300 font-medium drop-shadow">
          <MapPin className="w-3.5 h-3.5 text-amber-400" />
          <span>
            {formatDistance(distanceKm, unit)} from {userLocation.cityName}
          </span>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Destination Name & Country */}
          <div className="flex items-baseline justify-between mb-1.5">
            <h3 className="font-serif text-2xl font-bold text-stone-100 group-hover:text-amber-300 transition-colors">
              {destination.name}
            </h3>
            <span className="text-xs uppercase tracking-wider font-semibold text-stone-400">
              {destination.country}
            </span>
          </div>

          {/* Tagline */}
          <p className="text-xs font-serif italic text-amber-400/90 mb-3">
            "{destination.tagline}"
          </p>

          {/* Short narrative summary */}
          <p className="text-stone-400 text-xs line-clamp-2 leading-relaxed mb-4">
            {destination.description}
          </p>

          {/* Famous Places preview strip */}
          <div className="mb-4">
            <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block mb-1.5">
              Notable Sights ({destination.famousPlaces.length}):
            </span>
            <div className="flex flex-wrap gap-1.5">
              {destination.famousPlaces.slice(0, 3).map((place) => (
                <span
                  key={place.id}
                  className="px-2 py-0.5 rounded text-[11px] bg-stone-950 text-stone-300 border border-stone-800 truncate max-w-[170px]"
                >
                  {place.name}
                </span>
              ))}
              {destination.famousPlaces.length > 3 && (
                <span className="px-1.5 py-0.5 rounded text-[11px] bg-stone-800 text-stone-400">
                  +{destination.famousPlaces.length - 3} more
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-stone-800/80 flex items-center justify-between gap-2">
          <button
            id={`plan-trip-btn-${destination.id}`}
            onClick={handlePlanClick}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-medium text-stone-300 hover:text-white bg-stone-800/60 hover:bg-stone-800 transition-colors border border-stone-700/40"
            title="Generate custom day-by-day itinerary with AI"
          >
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span>Plan Itinerary</span>
          </button>

          <Link
            to={`/destination/${destination.id}`}
            id={`view-destination-btn-${destination.id}`}
            onClick={(e) => {
              e.stopPropagation();
              if (onSelect) onSelect(destination);
            }}
            className="flex items-center space-x-1 px-4 py-2 rounded-xl text-xs font-semibold bg-stone-100 hover:bg-white text-stone-950 transition-all active:scale-95 group-hover:bg-amber-400 group-hover:text-stone-950"
          >
            <span>Explore</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
};
