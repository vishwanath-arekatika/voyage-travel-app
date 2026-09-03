import React, { useState, useRef } from "react";
import {
  Search,
  Compass,
  ChevronDown,
  Sparkles,
  MapPin,
  Palmtree,
  Waves,
} from "lucide-react";
import { Region, UserLocation } from "../types";

interface HeroVideoProps {
  onSearchChange: (query: string) => void;
  searchQuery: string;
  selectedRegion: Region;
  onSelectRegion: (region: Region) => void;
  onScrollToExplorer: () => void;
  userLocation: UserLocation;
  onOpenLocationModal: () => void;
}

const VIDEO_THEMES = [
  {
    id: "tropical-beach",
    label: "Tropical Beach & Palms",
    icon: Palmtree,
    mp4: "/tropical-beach.mp4",
    webm: "https://vjs.zencdn.net/v/oceans.webm",
    poster: "/beach-hero.jpg",
    description: "White sand beach, leaning coconut palms, and crystal turquoise waves",
  },
  {
    id: "coastal-ocean",
    label: "Azure Waters",
    icon: Waves,
    mp4: "https://vjs.zencdn.net/v/oceans.mp4",
    webm: "https://vjs.zencdn.net/v/oceans.webm",
    poster: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=2400&q=85",
    description: "Deep azure sea currents and coastal horizon",
  },
];

export const HeroVideo: React.FC<HeroVideoProps> = ({
  onSearchChange,
  searchQuery,
  selectedRegion,
  onSelectRegion,
  onScrollToExplorer,
  userLocation,
  onOpenLocationModal,
}) => {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const currentVideo = VIDEO_THEMES[activeVideoIndex];
  const regions: Region[] = ["All", "Europe", "Asia", "Americas", "Africa", "Oceania"];

  return (
    <section className="relative w-full min-h-[92vh] flex items-center justify-center overflow-hidden bg-stone-950">
      {/* Background Looping Video: repeats continuously and stays muted */}
      <video
        ref={videoRef}
        key={currentVideo.id}
        autoPlay
        loop
        muted
        playsInline
        poster={currentVideo.poster}
        className="absolute inset-0 w-full h-full object-cover opacity-55 scale-105 transition-opacity duration-1000 pointer-events-none select-none"
      >
        <source src={currentVideo.mp4} type="video/mp4" />
        <source src={currentVideo.webm} type="video/webm" />
      </video>

      {/* Cinematic Gradient Overlays for optimal typographic contrast & luxury aesthetic */}
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/65 to-stone-950/35 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
        {/* Design Badge */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-stone-900/80 border border-stone-700/60 backdrop-blur-md mb-8 animate-in fade-in slide-in-from-bottom-2 duration-700">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-xs font-medium tracking-wider uppercase text-stone-300">
            Intelligent Travel Discovery
          </span>
          <span className="w-1 h-1 rounded-full bg-stone-500" />
          <span className="text-xs text-amber-400/90 font-mono">Curated Escapes</span>
        </div>

        {/* Main Headline */}
        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-stone-100 max-w-4xl leading-[1.12] mb-6 drop-shadow-md">
          Wander Further. <br />
          <span className="italic font-normal text-amber-100/90">
            Travel with intention.
          </span>
        </h1>

        {/* Supporting Narrative */}
        <p className="font-sans text-base sm:text-xl text-stone-200/95 max-w-2xl leading-relaxed mb-10 font-normal drop-shadow">
          Curated world travel destinations, live OpenWeather conditions, architectural landmarks,
          and Gemini AI-powered day-by-day itineraries.
        </p>

        {/* Search & Location Bar */}
        <div className="w-full max-w-2xl bg-stone-900/95 backdrop-blur-xl p-2 rounded-2xl border border-stone-800 shadow-2xl transition-all focus-within:border-amber-500/60 focus-within:ring-2 focus-within:ring-amber-500/20">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="relative flex-1 flex items-center px-3 py-1">
              <Search className="w-5 h-5 text-stone-400 mr-3 shrink-0" />
              <input
                id="hero-destination-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") onScrollToExplorer();
                }}
                placeholder="Search Kyoto, Maldives, Santorini, Cape Town, Paris..."
                className="w-full bg-transparent text-stone-100 placeholder-stone-400 text-sm sm:text-base focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-2 border-t sm:border-t-0 sm:border-l border-stone-800 pt-2 sm:pt-0 sm:pl-2">
              <button
                id="hero-location-filter-btn"
                onClick={onOpenLocationModal}
                className="flex items-center space-x-1.5 px-3 py-2.5 rounded-xl bg-stone-800/80 hover:bg-stone-750 text-xs text-stone-300 hover:text-white transition-colors border border-stone-700/50"
                title="Your detected base location"
              >
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span className="max-w-[100px] truncate">{userLocation.cityName}</span>
              </button>

              <button
                id="hero-explore-submit-btn"
                onClick={onScrollToExplorer}
                className="flex items-center justify-center space-x-2 px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-semibold text-sm transition-all shadow-lg hover:shadow-amber-400/20 active:scale-95"
              >
                <Compass className="w-4 h-4" />
                <span>Explore</span>
              </button>
            </div>
          </div>
        </div>

        {/* Region Filter Quick Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6 max-w-2xl">
          {regions.map((region) => (
            <button
              key={region}
              id={`hero-region-chip-${region.toLowerCase()}`}
              onClick={() => {
                onSelectRegion(region);
                onScrollToExplorer();
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                selectedRegion === region
                  ? "bg-amber-400 text-stone-950 font-semibold shadow-sm"
                  : "bg-stone-900/70 text-stone-300 hover:text-white hover:bg-stone-800/80 border border-stone-800/80"
              }`}
            >
              {region}
            </button>
          ))}
        </div>

        {/* Video Ambiance Switcher Pill */}
        <div className="flex items-center space-x-2 mt-8 px-3.5 py-1.5 rounded-full bg-stone-900/60 border border-stone-800 text-[11px] text-stone-400">
          <Palmtree className="w-3.5 h-3.5 text-amber-400" />
          <span>Cinematic Scene:</span>
          {VIDEO_THEMES.map((theme, idx) => (
            <button
              key={theme.id}
              onClick={() => setActiveVideoIndex(idx)}
              className={`px-2.5 py-0.5 rounded transition-colors ${
                activeVideoIndex === idx
                  ? "text-amber-300 font-semibold bg-stone-800"
                  : "hover:text-stone-200"
              }`}
            >
              {theme.label}
            </button>
          ))}
        </div>
      </div>

      {/* Downward Scroll Cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
        <button
          id="scroll-to-destinations-btn"
          onClick={onScrollToExplorer}
          className="flex flex-col items-center space-y-1 text-stone-400 hover:text-amber-400 transition-colors focus:outline-none group"
          aria-label="Scroll to destination explorer"
        >
          <span className="text-[10px] tracking-widest uppercase font-mono group-hover:text-amber-300">
            Scroll to Explore
          </span>
          <ChevronDown className="w-4 h-4 animate-bounce group-hover:text-amber-400" />
        </button>
      </div>
    </section>
  );
};
