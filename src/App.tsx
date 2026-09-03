import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, useNavigate, useLocation, useParams } from "react-router-dom";
import {
  Compass,
  MapPin,
  Calendar,
  Sparkles,
  CloudSun,
  Camera,
  ArrowRight,
  Filter,
  CheckCircle2,
  Globe2,
  ChevronRight,
  Layers,
} from "lucide-react";

import { DESTINATIONS } from "./data/destinations";
import { Destination, Region, UserLocation, WeatherData } from "./types";
import { fetchWeather } from "./services/api";

import { Navbar } from "./components/Navbar";
import { HeroVideo } from "./components/HeroVideo";
import { DestinationCard } from "./components/DestinationCard";
import { LocationModal } from "./components/LocationModal";
import { DestinationDetailView } from "./components/DestinationDetailView";
import { WeatherHubView } from "./components/WeatherHubView";
import { ItineraryPlannerView } from "./components/ItineraryPlannerView";
import { AIChatbotView } from "./components/AIChatbotView";
import { GalleryExplorerView } from "./components/GalleryExplorerView";

// Internal Main Application with Router hooks
const TravelAppContent: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Primary State
  const [unit, setUnit] = useState<"C" | "F">("C");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<Region>("All");
  const [selectedVibe, setSelectedVibe] = useState<string>("All");
  const [activeDestination, setActiveDestination] = useState<Destination | null>(null);

  // Modals
  const [locationModalOpen, setLocationModalOpen] = useState(false);

  // Geolocation & Weather
  const [userLocation, setUserLocation] = useState<UserLocation>({
    latitude: 51.5074,
    longitude: -0.1278,
    cityName: "London",
    country: "United Kingdom",
    isDetected: false,
    permissionState: "prompt",
  });
  const [localWeather, setLocalWeather] = useState<WeatherData | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  const explorerRef = useRef<HTMLDivElement>(null);

  // Auto-detect browser geolocation on initial load
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          try {
            // Geocode reverse or fetch weather
            const weather = await fetchWeather(lat, lon, "My Location");
            setUserLocation({
              latitude: lat,
              longitude: lon,
              cityName: weather.city || "Current Location",
              isDetected: true,
              permissionState: "granted",
            });
            setLocalWeather(weather);
          } catch (e) {
            setUserLocation((prev) => ({
              ...prev,
              latitude: lat,
              longitude: lon,
              isDetected: true,
              permissionState: "granted",
            }));
          }
        },
        (error) => {
          console.log("Geolocation prompt dismissed/denied, default location retained:", error.message);
        },
        { timeout: 8000 }
      );
    }
  }, []);

  // Update weather whenever userLocation changes
  useEffect(() => {
    fetchWeather(userLocation.latitude, userLocation.longitude, userLocation.cityName)
      .then((data) => setLocalWeather(data))
      .catch(() => {});
  }, [userLocation]);

  // Request GPS
  const handleRequestGeolocation = () => {
    if (!("geolocation" in navigator)) {
      setLocationError("Geolocation is not supported by your browser environment.");
      return;
    }
    setIsLocating(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        setIsLocating(false);
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        try {
          const weather = await fetchWeather(lat, lon, "Detected Location");
          setUserLocation({
            latitude: lat,
            longitude: lon,
            cityName: weather.city || "GPS Detected",
            isDetected: true,
            permissionState: "granted",
          });
          setLocalWeather(weather);
          setLocationModalOpen(false);
        } catch (err) {
          setUserLocation((prev) => ({
            ...prev,
            latitude: lat,
            longitude: lon,
            cityName: "GPS Location",
            isDetected: true,
            permissionState: "granted",
          }));
          setLocationModalOpen(false);
        }
      },
      (err) => {
        setIsLocating(false);
        setLocationError(`Permission issue: ${err.message}. You can search your city manually below.`);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  // Filter destinations
  const filteredDestinations = DESTINATIONS.filter((d) => {
    const matchesSearch =
      searchQuery.trim() === "" ||
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.famousPlaces.some((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesRegion = selectedRegion === "All" || d.region === selectedRegion;
    const matchesVibe = selectedVibe === "All" || d.vibes.includes(selectedVibe);

    return matchesSearch && matchesRegion && matchesVibe;
  });

  const vibesList = [
    "All",
    "Coastal & Islands",
    "Cultural",
    "Mountain & Adventure",
    "Historic",
    "Culinary",
  ];

  // Navigation handlers
  const handleNavigate = (view: "explore" | "weather" | "itinerary" | "concierge" | "chat" | "gallery") => {
    if (view === "explore") {
      navigate("/");
    } else if (view === "chat" || view === "concierge") {
      navigate("/concierge");
    } else {
      navigate(`/${view}`);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectDestination = (dest: Destination) => {
    setActiveDestination(dest);
    navigate(`/destination/${dest.id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePlanItinerary = (dest: Destination) => {
    setActiveDestination(dest);
    navigate("/itinerary");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOpenChat = (dest: Destination) => {
    setActiveDestination(dest);
    navigate("/concierge");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToExplorer = () => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        explorerRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      explorerRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const currentViewId =
    location.pathname === "/"
      ? "explore"
      : location.pathname.startsWith("/weather")
      ? "weather"
      : location.pathname.startsWith("/itinerary")
      ? "itinerary"
      : location.pathname.startsWith("/concierge") || location.pathname.startsWith("/chat")
      ? "concierge"
      : location.pathname.startsWith("/gallery")
      ? "gallery"
      : "explore";

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-amber-400 selection:text-stone-950">
      {/* Top Navigation */}
      <Navbar
        userLocation={userLocation}
        localWeather={localWeather}
        unit={unit}
        onToggleUnit={() => setUnit(unit === "C" ? "F" : "C")}
        onOpenLocationModal={() => setLocationModalOpen(true)}
        onNavigate={handleNavigate}
        currentView={currentViewId}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        <Routes>
          {/* Home Route: Hero Video + Explorer */}
          <Route
            path="/"
            element={
              <>
                {/* Hero with Tropical Beach Looping Video Background matching requested video */}
                <HeroVideo
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  selectedRegion={selectedRegion}
                  onSelectRegion={setSelectedRegion}
                  onScrollToExplorer={scrollToExplorer}
                  userLocation={userLocation}
                  onOpenLocationModal={() => setLocationModalOpen(true)}
                />

                {/* Destinations Explorer Section */}
                <section
                  ref={explorerRef}
                  id="destination-explorer-section"
                  className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-20"
                >
                  <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 border-b border-stone-800 pb-8">
                    <div>
                      <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
                        <Compass className="w-3.5 h-3.5" />
                        <span>Curated World Archives</span>
                      </div>
                      <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-100">
                        Explore World Destinations
                      </h2>
                      <p className="text-sm text-stone-400 mt-2 max-w-xl">
                        Live meteorological telemetry from OpenWeather, architectural landmarks, and
                        distance calculations relative to your location.
                      </p>
                    </div>

                    {/* Vibe / Atmosphere Filter Pills */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      {vibesList.map((vibe) => (
                        <button
                          key={vibe}
                          onClick={() => setSelectedVibe(vibe)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                            selectedVibe === vibe
                              ? "bg-amber-400 text-stone-950 font-semibold"
                              : "bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800"
                          }`}
                        >
                          {vibe}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Destination Grid */}
                  {filteredDestinations.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {filteredDestinations.map((dest) => (
                        <DestinationCard
                          key={dest.id}
                          destination={dest}
                          userLocation={userLocation}
                          unit={unit}
                          onSelect={handleSelectDestination}
                          onPlanTrip={handlePlanItinerary}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="py-20 text-center bg-stone-900/40 rounded-3xl border border-dashed border-stone-800">
                      <Filter className="w-12 h-12 text-stone-600 mx-auto mb-3" />
                      <h3 className="font-serif text-xl font-semibold text-stone-200">
                        No destinations matched your criteria
                      </h3>
                      <p className="text-xs text-stone-400 mt-1 max-w-sm mx-auto">
                        Try clearing search terms or selecting "All" regions and vibes.
                      </p>
                      <button
                        onClick={() => {
                          setSearchQuery("");
                          setSelectedRegion("All");
                          setSelectedVibe("All");
                        }}
                        className="mt-4 px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium"
                      >
                        Reset All Filters
                      </button>
                    </div>
                  )}
                </section>

                {/* Intelligent Travel Feature Strip */}
                <section className="border-t border-stone-800/80 bg-stone-950/80 py-16">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div
                        onClick={() => navigate("/weather")}
                        className="p-6 rounded-3xl bg-stone-900/60 border border-stone-800/80 hover:border-stone-700 transition-all cursor-pointer group"
                      >
                        <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <CloudSun className="w-6 h-6" />
                        </div>
                        <h3 className="font-serif text-xl font-bold text-stone-100 mb-2">
                          Live Meteorological Hub
                        </h3>
                        <p className="text-xs text-stone-400 leading-relaxed">
                          Compare real-time temperatures, wind currents, and 5-day forecasts
                          between your departure city and world destinations.
                        </p>
                      </div>

                      <div
                        onClick={() => navigate("/itinerary")}
                        className="p-6 rounded-3xl bg-stone-900/60 border border-stone-800/80 hover:border-stone-700 transition-all cursor-pointer group"
                      >
                        <div className="w-12 h-12 rounded-2xl bg-amber-400/10 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <Calendar className="w-6 h-6" />
                        </div>
                        <h3 className="font-serif text-xl font-bold text-stone-100 mb-2">
                          Gemini AI Itinerary Planner
                        </h3>
                        <p className="text-xs text-stone-400 leading-relaxed">
                          Synthesize personalized, balanced day-by-day travel itineraries with
                          morning, afternoon, evening activities, and culinary pairings.
                        </p>
                      </div>

                      <div
                        onClick={() => navigate("/gallery")}
                        className="p-6 rounded-3xl bg-stone-900/60 border border-stone-800/80 hover:border-stone-700 transition-all cursor-pointer group"
                      >
                        <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <Camera className="w-6 h-6" />
                        </div>
                        <h3 className="font-serif text-xl font-bold text-stone-100 mb-2">
                          Unsplash & Pexels Photography
                        </h3>
                        <p className="text-xs text-stone-400 leading-relaxed">
                          Browse crystalline tropical beaches, historic architecture, and remote
                          mountain ranges captured by world photographers.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              </>
            }
          />

          {/* Destination Detail Route */}
          <Route
            path="/destination/:id"
            element={
              <DestinationRouteWrapper
                userLocation={userLocation}
                tempUnit={unit}
                onOpenItinerary={(dest) => {
                  setActiveDestination(dest);
                  navigate("/itinerary");
                }}
                onOpenChat={(dest) => {
                  setActiveDestination(dest);
                  navigate("/concierge");
                }}
              />
            }
          />

          {/* Live Weather Hub Route */}
          <Route
            path="/weather"
            element={
              <WeatherHubView
                userLocation={userLocation}
                tempUnit={unit}
                onToggleTempUnit={() => setUnit(unit === "C" ? "F" : "C")}
                destinations={DESTINATIONS}
                onSelectDestination={handleSelectDestination}
                onOpenLocationModal={() => setLocationModalOpen(true)}
              />
            }
          />

          {/* AI Itinerary Planner Route */}
          <Route
            path="/itinerary"
            element={
              <ItineraryPlannerView
                destinations={DESTINATIONS}
                initialDestination={activeDestination || DESTINATIONS[0]}
                onSelectDestination={handleSelectDestination}
              />
            }
          />

          {/* AI Concierge Routes (supports both /concierge from navbar and /chat) */}
          <Route
            path="/concierge"
            element={
              <AIChatbotView
                destinations={DESTINATIONS}
                activeDestination={activeDestination || DESTINATIONS[0]}
                onSelectDestination={handleSelectDestination}
              />
            }
          />
          <Route
            path="/chat"
            element={
              <AIChatbotView
                destinations={DESTINATIONS}
                activeDestination={activeDestination || DESTINATIONS[0]}
                onSelectDestination={handleSelectDestination}
              />
            }
          />

          {/* Unsplash & Pexels Photo Gallery Route */}
          <Route path="/gallery" element={<GalleryExplorerView />} />
        </Routes>
      </main>

      {/* Global Footer */}
      <footer className="border-t border-stone-800 bg-stone-950 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-serif text-xl font-bold text-stone-100">
                voyage<span className="text-amber-400">.</span>
              </span>
              <span className="text-xs text-stone-500 font-mono">Travel Experience</span>
            </div>
            <p className="text-xs text-stone-400 mt-1">
              Curated World Travel Platform • React + Vite + Tailwind + Gemini AI + OpenWeather
            </p>
          </div>

          <div className="flex items-center space-x-4 text-xs text-stone-500">
            <span>© {new Date().getFullYear()} Voyage. Curated for world travelers.</span>
          </div>
        </div>
      </footer>

      {/* Location Modal */}
      <LocationModal
        isOpen={locationModalOpen}
        onClose={() => setLocationModalOpen(false)}
        currentLocation={userLocation}
        onUpdateLocation={setUserLocation}
        onRequestGeolocation={handleRequestGeolocation}
        isLocating={isLocating}
        locationError={locationError}
      />
    </div>
  );
};

// Destination Route Wrapper to read URL params
const DestinationRouteWrapper: React.FC<{
  userLocation: UserLocation;
  tempUnit: "C" | "F";
  onOpenItinerary: (dest: Destination) => void;
  onOpenChat: (dest: Destination) => void;
}> = ({ userLocation, tempUnit, onOpenItinerary, onOpenChat }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const destination = DESTINATIONS.find((d) => d.id === id) || DESTINATIONS[0];

  return (
    <DestinationDetailView
      destination={destination}
      userLocation={userLocation}
      tempUnit={tempUnit}
      onBack={() => navigate("/")}
      onOpenItineraryForDest={onOpenItinerary}
      onOpenChatForDest={onOpenChat}
    />
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <TravelAppContent />
    </BrowserRouter>
  );
}
