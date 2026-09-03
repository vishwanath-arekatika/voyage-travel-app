import React, { useState } from "react";
import {
  Calendar,
  Sparkles,
  Clock,
  MapPin,
  Utensils,
  Lightbulb,
  Share2,
  Copy,
  Check,
  Printer,
  ChevronRight,
  Compass,
  Loader2,
} from "lucide-react";
import { Destination, Itinerary } from "../types";
import { planItinerary } from "../services/api";
import { generateCuratedItinerary } from "../data/curatedItinerary";
import { DESTINATIONS } from "../data/destinations";

interface ItineraryPlannerProps {
  initialDestination?: Destination | null;
}

export const ItineraryPlanner: React.FC<ItineraryPlannerProps> = ({
  initialDestination,
}) => {
  const [destinationName, setDestinationName] = useState(
    initialDestination ? initialDestination.name : "Kyoto"
  );
  const [country, setCountry] = useState(
    initialDestination ? initialDestination.country : "Japan"
  );
  const [durationDays, setDurationDays] = useState<number>(4);
  const [travelStyle, setTravelStyle] = useState<string>("Cultural & Highlights");
  const [budget, setBudget] = useState<string>("Moderate");
  const [companions, setCompanions] = useState<string>("Couple");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    "Architecture",
    "Scenic Viewpoints",
    "Culinary",
  ]);

  const [loading, setLoading] = useState<boolean>(false);
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [activeDayTab, setActiveDayTab] = useState<number>(1);

  const interestOptions = [
    "Architecture",
    "Scenic Viewpoints",
    "Culinary",
    "Beaches & Oceans",
    "Historic Landmarks",
    "Photography",
    "Hidden Cafes",
    "Art Galleries",
    "Nature Walks",
  ];

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const result = await planItinerary({
        destination: destinationName,
        country,
        durationDays,
        travelStyle,
        budget,
        companions,
        interests: selectedInterests,
      });
      if (result && result.days && result.days.length > 0) {
        setItinerary(result);
        setActiveDayTab(1);
      } else {
        const fallback = generateCuratedItinerary(destinationName, country, durationDays, travelStyle, budget);
        setItinerary(fallback);
        setActiveDayTab(1);
      }
    } catch (err) {
      console.warn("Client fallback itinerary engaged:", err);
      const fallback = generateCuratedItinerary(destinationName, country, durationDays, travelStyle, budget);
      setItinerary(fallback);
      setActiveDayTab(1);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!itinerary) return;
    const text = `TRAVEL ITINERARY: ${itinerary.destination}, ${itinerary.country}\n${itinerary.summary}\n\n` +
      itinerary.days
        .map(
          (d) =>
            `DAY ${d.day}: ${d.title}\n- Morning: ${d.morning.activity} (${d.morning.duration})\n- Afternoon: ${d.afternoon.activity}\n- Evening: ${d.evening.activity}\n- Dinner: ${d.culinaryHighlight.dish} at ${d.culinaryHighlight.spot}\n`
        )
        .join("\n");

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div id="itinerary-planner-view" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="border-b border-stone-800 pb-6">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-medium mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Google Gemini AI Architecture</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-100">
          Intelligent Day-by-Day Itinerary Architect
        </h1>
        <p className="text-sm text-stone-400 mt-1 max-w-2xl">
          Craft meticulously scheduled, rhythmically paced travel itineraries customized to your duration, budget, and travel desires.
        </p>
      </div>

      {/* Configuration Form Panel */}
      <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Destination Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
              Destination
            </label>
            <div className="space-y-2">
              <select
                value={destinationName}
                onChange={(e) => {
                  setDestinationName(e.target.value);
                  const found = DESTINATIONS.find((d) => d.name === e.target.value);
                  if (found) setCountry(found.country);
                }}
                className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-sm text-stone-100 focus:outline-none focus:border-amber-400/80"
              >
                {DESTINATIONS.map((d) => (
                  <option key={d.id} value={d.name}>
                    {d.name}, {d.country}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Or custom city..."
                value={destinationName}
                onChange={(e) => setDestinationName(e.target.value)}
                className="w-full px-3.5 py-2 bg-stone-950/60 border border-stone-850 rounded-xl text-xs text-stone-300 placeholder-stone-600 focus:outline-none focus:border-amber-400/60"
              />
            </div>
          </div>

          {/* Duration Days */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-stone-300">
                Duration
              </label>
              <span className="text-xs font-mono font-bold text-amber-400">
                {durationDays} Days
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={7}
              value={durationDays}
              onChange={(e) => setDurationDays(parseInt(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer h-2 bg-stone-950 rounded-lg"
            />
            <div className="flex justify-between text-[10px] font-mono text-stone-500 mt-2">
              <span>1 Day</span>
              <span>3 Days</span>
              <span>5 Days</span>
              <span>7 Days</span>
            </div>
          </div>

          {/* Travel Style */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
              Travel Style
            </label>
            <select
              value={travelStyle}
              onChange={(e) => setTravelStyle(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-sm text-stone-100 focus:outline-none focus:border-amber-400/80"
            >
              <option value="Cultural & Highlights">Cultural & Highlights</option>
              <option value="Relaxed Coastal & Beach">Relaxed Coastal & Beach</option>
              <option value="Architectural & Design">Architectural & Design</option>
              <option value="Gastronomy & Wine">Gastronomy & Wine</option>
              <option value="Adventure & Active">Adventure & Active</option>
              <option value="Luxury & Serenity">Luxury & Serenity</option>
            </select>
          </div>
        </div>

        {/* Budget & Companions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 pt-6 border-t border-stone-800/80">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-300 block mb-2">
              Budget Tier:
            </span>
            <div className="flex gap-2">
              {["Budget", "Moderate", "Luxury"].map((tier) => (
                <button
                  key={tier}
                  type="button"
                  onClick={() => setBudget(tier)}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-medium border transition-colors ${
                    budget === tier
                      ? "bg-amber-400/15 border-amber-400/60 text-amber-300 font-semibold"
                      : "bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200"
                  }`}
                >
                  {tier}
                </button>
              ))}
            </div>
          </div>

          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-300 block mb-2">
              Traveling With:
            </span>
            <div className="flex gap-2">
              {["Solo", "Couple", "Family", "Friends"].map((comp) => (
                <button
                  key={comp}
                  type="button"
                  onClick={() => setCompanions(comp)}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-medium border transition-colors ${
                    companions === comp
                      ? "bg-amber-400/15 border-amber-400/60 text-amber-300 font-semibold"
                      : "bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200"
                  }`}
                >
                  {comp}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Interests Pills */}
        <div className="mt-6 pt-6 border-t border-stone-800/80">
          <span className="text-xs font-semibold uppercase tracking-wider text-stone-300 block mb-2.5">
            Key Focus Areas & Desires:
          </span>
          <div className="flex flex-wrap gap-2">
            {interestOptions.map((opt) => {
              const active = selectedInterests.includes(opt);
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => toggleInterest(opt)}
                  className={`px-3 py-1.5 rounded-full text-xs transition-all ${
                    active
                      ? "bg-stone-100 text-stone-950 font-semibold shadow-sm"
                      : "bg-stone-950 text-stone-400 hover:text-stone-200 border border-stone-800"
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>

        {/* Generate Button */}
        <div className="mt-8">
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 active:scale-[0.99] text-stone-950 font-semibold text-sm transition-all shadow-lg hover:shadow-amber-400/20 flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 text-stone-950 animate-spin" />
                <span>Architecting {durationDays}-Day Schedule with Gemini AI...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate Curated Itinerary</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Generated Itinerary Display */}
      {itinerary && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-500">
          {/* Summary Banner */}
          <div className="p-6 sm:p-8 rounded-2xl bg-stone-900 border border-stone-800 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-800">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-amber-400">
                  {itinerary.totalDays}-Day Curated Journey
                </span>
                <h2 className="font-serif text-3xl font-bold text-stone-100 mt-1">
                  {itinerary.destination}, {itinerary.country}
                </h2>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleCopy}
                  className="px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-750 text-stone-200 text-xs font-medium transition-colors flex items-center space-x-1.5 border border-stone-700/60"
                  title="Copy formatted text"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied" : "Copy"}</span>
                </button>
                <button
                  onClick={handlePrint}
                  className="px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-750 text-stone-200 text-xs font-medium transition-colors flex items-center space-x-1.5 border border-stone-700/60"
                  title="Print or Save PDF"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print / PDF</span>
                </button>
              </div>
            </div>

            <p className="text-stone-300 text-sm leading-relaxed mt-4">
              {itinerary.summary}
            </p>

            {/* Quick Stats Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-4 border-t border-stone-800/60 text-xs">
              <div className="p-3 rounded-xl bg-stone-950/70 border border-stone-850">
                <span className="text-stone-500 block mb-1">Recommended Season</span>
                <span className="text-stone-200 font-medium">{itinerary.bestTimeToVisit}</span>
              </div>
              <div className="p-3 rounded-xl bg-stone-950/70 border border-stone-850">
                <span className="text-stone-500 block mb-1">Estimated Daily Cost</span>
                <span className="text-amber-400 font-mono font-semibold">{itinerary.estimatedDailyBudget}</span>
              </div>
              <div className="p-3 rounded-xl bg-stone-950/70 border border-stone-850">
                <span className="text-stone-500 block mb-1">Packing Essentials</span>
                <span className="text-stone-300 truncate block">
                  {itinerary.packingEssentials?.slice(0, 2).join(", ")}...
                </span>
              </div>
            </div>
          </div>

          {/* Day Tabs */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 no-scrollbar">
            {itinerary.days.map((day) => (
              <button
                key={day.day}
                onClick={() => setActiveDayTab(day.day)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  activeDayTab === day.day
                    ? "bg-amber-400 text-stone-950 shadow-md"
                    : "bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800"
                }`}
              >
                Day {day.day}: {day.theme}
              </button>
            ))}
          </div>

          {/* Active Day Detail Card */}
          {(() => {
            const currentDay = itinerary.days.find((d) => d.day === activeDayTab) || itinerary.days[0];
            if (!currentDay) return null;
            return (
              <div className="bg-stone-900 rounded-2xl border border-stone-800 p-6 sm:p-8 space-y-6">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-amber-400">
                    Day {currentDay.day} • {currentDay.theme}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-100 mt-1">
                    {currentDay.title}
                  </h3>
                </div>

                {/* Day Parts: Morning, Afternoon, Evening */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                  {/* Morning */}
                  <div className="p-5 rounded-xl bg-stone-950 border border-stone-800 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs text-amber-400 font-mono mb-2">
                        <span className="font-bold">09:00 AM • Morning</span>
                        <span className="flex items-center gap-1 text-stone-500">
                          <Clock className="w-3 h-3" /> {currentDay.morning.duration}
                        </span>
                      </div>
                      <h4 className="font-serif text-lg font-bold text-stone-200 mb-2">
                        {currentDay.morning.activity}
                      </h4>
                      <p className="text-xs text-stone-400 leading-relaxed">
                        {currentDay.morning.description}
                      </p>
                    </div>

                    {currentDay.morning.tip && (
                      <div className="mt-4 pt-3 border-t border-stone-850 flex items-start space-x-2 text-[11px] text-amber-300/90">
                        <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span>{currentDay.morning.tip}</span>
                      </div>
                    )}
                  </div>

                  {/* Afternoon */}
                  <div className="p-5 rounded-xl bg-stone-950 border border-stone-800 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs text-amber-400 font-mono mb-2">
                        <span className="font-bold">01:30 PM • Afternoon</span>
                        <span className="flex items-center gap-1 text-stone-500">
                          <Clock className="w-3 h-3" /> {currentDay.afternoon.duration}
                        </span>
                      </div>
                      <h4 className="font-serif text-lg font-bold text-stone-200 mb-2">
                        {currentDay.afternoon.activity}
                      </h4>
                      <p className="text-xs text-stone-400 leading-relaxed">
                        {currentDay.afternoon.description}
                      </p>
                    </div>

                    {currentDay.afternoon.tip && (
                      <div className="mt-4 pt-3 border-t border-stone-850 flex items-start space-x-2 text-[11px] text-amber-300/90">
                        <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span>{currentDay.afternoon.tip}</span>
                      </div>
                    )}
                  </div>

                  {/* Evening */}
                  <div className="p-5 rounded-xl bg-stone-950 border border-stone-800 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs text-amber-400 font-mono mb-2">
                        <span className="font-bold">06:00 PM • Evening</span>
                        <span className="flex items-center gap-1 text-stone-500">
                          <Clock className="w-3 h-3" /> {currentDay.evening.duration}
                        </span>
                      </div>
                      <h4 className="font-serif text-lg font-bold text-stone-200 mb-2">
                        {currentDay.evening.activity}
                      </h4>
                      <p className="text-xs text-stone-400 leading-relaxed">
                        {currentDay.evening.description}
                      </p>
                    </div>

                    {currentDay.evening.tip && (
                      <div className="mt-4 pt-3 border-t border-stone-850 flex items-start space-x-2 text-[11px] text-amber-300/90">
                        <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span>{currentDay.evening.tip}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Culinary Highlight Banner */}
                {currentDay.culinaryHighlight && (
                  <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="flex items-start space-x-2.5">
                      <Utensils className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-amber-300">
                          Culinary Highlight: {currentDay.culinaryHighlight.dish}
                        </span>
                        <p className="text-stone-400 mt-0.5">
                          {currentDay.culinaryHighlight.notes} ({currentDay.culinaryHighlight.spot})
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
};
