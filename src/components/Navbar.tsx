import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Compass,
  MapPin,
  Sparkles,
  Calendar,
  CloudSun,
  Menu,
  X,
  Globe2,
  Camera,
} from "lucide-react";
import { UserLocation, WeatherData } from "../types";

interface NavbarProps {
  userLocation: UserLocation;
  localWeather: WeatherData | null;
  unit: "C" | "F";
  onToggleUnit: () => void;
  onOpenLocationModal: () => void;
  onOpenPhotoModal?: () => void;
  onNavigate?: (view: "explore" | "weather" | "itinerary" | "chat" | "gallery") => void;
  currentView?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  userLocation,
  localWeather,
  unit,
  onToggleUnit,
  onOpenLocationModal,
  onOpenPhotoModal,
  onNavigate,
  currentView,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Destinations", icon: Compass },
    { path: "/weather", label: "Live Weather", icon: CloudSun },
    { path: "/itinerary", label: "AI Itinerary", icon: Calendar },
    { path: "/concierge", label: "AI Concierge", icon: Sparkles },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 backdrop-blur-md bg-stone-950/85 border-b border-stone-800/80 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <div className="flex items-center space-x-6">
            <Link
              to="/"
              id="brand-logo-btn"
              className="flex items-center text-left group focus:outline-none focus:ring-2 focus:ring-amber-400/50 rounded-lg p-1"
            >
              <span className="font-serif text-2xl font-bold tracking-tight text-stone-100 group-hover:text-white transition-colors">
                voyage<span className="text-amber-400">.</span>
              </span>
              <span className="hidden sm:inline-block ml-3 px-2 py-0.5 text-[11px] font-medium tracking-wider uppercase text-amber-300/90 bg-amber-950/60 border border-amber-800/40 rounded-full">
                Travel
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  id={`nav-link-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? "text-stone-100 bg-stone-900 border border-stone-800 shadow-sm"
                      : "text-stone-400 hover:text-stone-200 hover:bg-stone-900/60"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? "text-amber-400" : "text-stone-500"
                    }`}
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Actions: Location chip, Unit toggle, Deploy Guide */}
          <div className="hidden sm:flex items-center space-x-3">
            {/* User Location Pill */}
            <button
              id="user-location-pill-btn"
              onClick={onOpenLocationModal}
              className="flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-stone-900 hover:bg-stone-850 border border-stone-800 hover:border-stone-700 transition-all text-xs text-stone-300 group"
              title="Change current or home location"
            >
              <MapPin className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
              <span className="max-w-[120px] truncate font-medium text-stone-200">
                {userLocation.cityName}
              </span>
              {localWeather && (
                <span className="pl-2 border-l border-stone-750 text-amber-300 font-mono">
                  {unit === "C" ? `${localWeather.tempC}°C` : `${localWeather.tempF}°F`}
                </span>
              )}
            </button>

            {/* Temperature Unit Toggle */}
            <button
              id="temp-unit-toggle-btn"
              onClick={onToggleUnit}
              className="px-2.5 py-1.5 rounded-full bg-stone-900 border border-stone-800 hover:border-stone-700 text-xs font-mono text-stone-300 hover:text-white transition-colors"
              title="Toggle Celsius / Fahrenheit"
            >
              <span className={unit === "C" ? "text-amber-400 font-bold" : "text-stone-500"}>
                °C
              </span>
              <span className="text-stone-600 mx-1">/</span>
              <span className={unit === "F" ? "text-amber-400 font-bold" : "text-stone-500"}>
                °F
              </span>
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              id="mobile-location-btn"
              onClick={onOpenLocationModal}
              className="p-2 rounded-lg bg-stone-900 border border-stone-800 text-stone-300"
              aria-label="Location"
            >
              <MapPin className="w-4 h-4 text-amber-400" />
            </button>
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-stone-900 border border-stone-800 text-stone-300 hover:text-white"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-stone-950 border-b border-stone-800 px-4 py-4 space-y-2 animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800/80">
              <div className="flex items-center space-x-2 text-xs text-stone-300">
                <Globe2 className="w-4 h-4 text-amber-400" />
                <span>
                  Base: <strong>{userLocation.cityName}</strong>
                </span>
              </div>
              <button
                onClick={onToggleUnit}
                className="text-xs px-2.5 py-1 rounded bg-stone-900 border border-stone-800 font-mono text-amber-400"
              >
                Unit: °{unit}
              </button>
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 w-full px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    isActive
                      ? "bg-amber-400/10 text-amber-300 font-medium border border-amber-500/20"
                      : "text-stone-300 hover:bg-stone-900"
                  }`}
                >
                  <Icon className="w-4 h-4 text-amber-400" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        )}
      </header>
    </>
  );
};
