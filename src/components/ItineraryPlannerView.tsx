import React, { useState } from "react";
import {
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  Utensils,
  Lightbulb,
  CheckCircle2,
  Copy,
  Check,
  Printer,
  Compass,
  ArrowRight,
  RefreshCw,
  Palmtree,
  ShieldCheck,
} from "lucide-react";
import { Destination, Itinerary } from "../types";
import { planItinerary } from "../services/api";
import { generateCuratedItinerary } from "../data/curatedItinerary";

interface ItineraryPlannerViewProps {
  destinations: Destination[];
  initialDestination?: Destination;
  onSelectDestination: (dest: Destination) => void;
}

export const ItineraryPlannerView: React.FC<ItineraryPlannerViewProps> = ({
  destinations,
  initialDestination,
  onSelectDestination,
}) => {
  const [selectedDestName, setSelectedDestName] = useState(
    initialDestination?.name || "Maldives"
  );
  const [customDestination, setCustomDestination] = useState("");
  const [durationDays, setDurationDays] = useState(5);
  const [travelStyle, setTravelStyle] = useState("Balanced Culture & Leisure");
  const [budget, setBudget] = useState("Moderate / Premium Comfort");
  const [companions, setCompanions] = useState("Couple / Pair");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    "Architecture",
    "Scenic Viewpoints",
    "Local Food",
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [copied, setCopied] = useState(false);
  const [activeDayIndex, setActiveDayIndex] = useState(0);

  const interestOptions = [
    "Architecture",
    "Tropical Beaches",
    "Scenic Viewpoints",
    "Local Food",
    "Hidden Gems",
    "Museums & Art",
    "Nature Hikes",
    "Photography",
  ];

  const travelStyles = [
    "Balanced Culture & Leisure",
    "Relaxed & Coastal Retreat",
    "High Adventure & Active",
    "Culinary & Street Gastronomy",
    "Deep Architectural Heritage",
  ];

  const companionOptions = [
    "Solo Explorer",
    "Couple / Pair",
    "Family with Children",
    "Group of Friends",
  ];

  const budgetOptions = [
    "Budget Conscious",
    "Moderate / Premium Comfort",
    "Luxury & Fine Living",
  ];

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    const destName = customDestination.trim() || selectedDestName;
    setIsLoading(true);

    try {
      const generated = await planItinerary({
        destination: destName,
        durationDays,
        travelStyle,
        budget,
        companions,
        interests: selectedInterests,
      });
      if (generated && generated.days && generated.days.length > 0) {
        setItinerary(generated);
        setActiveDayIndex(0);
      } else {
        const fallback = generateCuratedItinerary(destName, "", durationDays, travelStyle, budget);
        setItinerary(fallback);
        setActiveDayIndex(0);
      }
    } catch (err) {
      console.warn("Client fallback itinerary engaged:", err);
      const fallback = generateCuratedItinerary(destName, "", durationDays, travelStyle, budget);
      setItinerary(fallback);
      setActiveDayIndex(0);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!itinerary) return;
    const text = `# ${itinerary.totalDays}-Day Itinerary for ${itinerary.destination}\n\n${itinerary.summary}\n\n` +
      itinerary.days
        .map(
          (d) =>
            `## Day ${d.day}: ${d.title} (${d.theme})\n` +
            `- Morning: ${d.morning.activity} (${d.morning.duration}) - ${d.morning.description}\n` +
            `- Afternoon: ${d.afternoon.activity} (${d.afternoon.duration}) - ${d.afternoon.description}\n` +
            `- Evening: ${d.evening.activity} (${d.evening.duration}) - ${d.evening.description}\n` +
            (d.culinaryHighlight ? `- Dish to Try: ${d.culinaryHighlight.dish} at ${d.culinaryHighlight.spot}\n` : "")
        )
        .join("\n");

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="border-b border-stone-800 pb-6 mb-8">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-medium mb-2.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Google Gemini AI Engine</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-100">
          Curated Travel Itinerary Planner
        </h1>
        <p className="text-sm text-stone-400 mt-1 max-w-2xl">
          Craft personalized, high-precision day-by-day itineraries tailored to your pace,
          architectural interests, and culinary desires.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form: Preferences & Generation Parameters */}
        <div className="lg:col-span-5 bg-stone-900/80 border border-stone-800 rounded-3xl p-6 sm:p-7 space-y-6">
          <form onSubmit={handleGenerate} className="space-y-5">
            {/* Destination Selection */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2">
                Select Destination
              </label>
              <select
                value={selectedDestName}
                onChange={(e) => {
                  setSelectedDestName(e.target.value);
                  setCustomDestination("");
                }}
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-sm text-stone-100 focus:outline-none focus:border-amber-400"
              >
                {destinations.map((d) => (
                  <option key={d.id} value={d.name}>
                    {d.name}, {d.country}
                  </option>
                ))}
              </select>

              <div className="mt-2.5">
                <input
                  type="text"
                  value={customDestination}
                  onChange={(e) => setCustomDestination(e.target.value)}
                  placeholder="Or enter any custom world city..."
                  className="w-full bg-stone-950/70 border border-stone-800/80 rounded-xl px-4 py-2 text-xs text-stone-200 placeholder-stone-400 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* Trip Duration Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                  Trip Duration
                </label>
                <span className="text-xs font-mono text-amber-400 font-bold">
                  {durationDays} {durationDays === 1 ? "Day" : "Days"}
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={10}
                value={durationDays}
                onChange={(e) => setDurationDays(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-400 mt-1">
                <span>1 Day</span>
                <span>5 Days</span>
                <span>10 Days</span>
              </div>
            </div>

            {/* Travel Style */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2">
                Travel Style & Pace
              </label>
              <select
                value={travelStyle}
                onChange={(e) => setTravelStyle(e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2 text-xs text-stone-200 focus:outline-none focus:border-amber-400"
              >
                {travelStyles.map((style) => (
                  <option key={style} value={style}>
                    {style}
                  </option>
                ))}
              </select>
            </div>

            {/* Companions & Budget */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-400 mb-1.5">
                  Companions
                </label>
                <select
                  value={companions}
                  onChange={(e) => setCompanions(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-amber-400"
                >
                  {companionOptions.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-400 mb-1.5">
                  Budget Level
                </label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-amber-400"
                >
                  {budgetOptions.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Focus Interests */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2">
                Themes & Interests
              </label>
              <div className="flex flex-wrap gap-1.5">
                {interestOptions.map((interest) => (
                  <button
                    type="button"
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                      selectedInterests.includes(interest)
                        ? "bg-amber-400 text-stone-950 font-semibold"
                        : "bg-stone-950 text-stone-400 border border-stone-800 hover:text-stone-200"
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-semibold text-sm transition-all shadow-lg hover:shadow-amber-400/20 active:scale-[0.99] flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-stone-950" />
                  <span>Synthesizing Itinerary with Gemini...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-stone-950" />
                  <span>Generate Itinerary</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Area: Generated Itinerary View */}
        <div className="lg:col-span-7">
          {isLoading ? (
            <div className="bg-stone-900/60 border border-stone-800 rounded-3xl p-12 text-center flex flex-col items-center justify-center min-h-[450px]">
              <div className="w-16 h-16 rounded-full bg-amber-400/10 flex items-center justify-center text-amber-400 mb-4 animate-pulse">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-stone-100 mb-2">
                Designing Your Journey
              </h3>
              <p className="text-sm text-stone-400 max-w-md">
                Consulting architectural chronicles, optimal daylight hours, and local culinary
                secrets with Google Gemini AI...
              </p>
            </div>
          ) : itinerary ? (
            <div className="space-y-6">
              {/* Summary Banner */}
              <div className="bg-stone-900/90 border border-stone-800 rounded-3xl p-6 sm:p-7 relative overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-5 mb-5">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 block mb-1">
                      Custom Generated Plan
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-100">
                      {itinerary.totalDays} Days in {itinerary.destination}
                    </h2>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleCopy}
                      className="p-2.5 rounded-xl bg-stone-950 hover:bg-stone-800 border border-stone-800 text-stone-300 hover:text-white transition-colors text-xs flex items-center space-x-1.5"
                      title="Copy itinerary markdown"
                    >
                      {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                      <span>{copied ? "Copied" : "Copy"}</span>
                    </button>
                    <button
                      onClick={() => window.print()}
                      className="p-2.5 rounded-xl bg-stone-950 hover:bg-stone-800 border border-stone-800 text-stone-300 hover:text-white transition-colors text-xs flex items-center space-x-1.5"
                      title="Print or save as PDF"
                    >
                      <Printer className="w-4 h-4" />
                      <span>Print</span>
                    </button>
                  </div>
                </div>

                <p className="text-sm text-stone-300 leading-relaxed mb-4">
                  {itinerary.summary}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs pt-4 border-t border-stone-800/80">
                  <div>
                    <span className="text-stone-500 block text-[11px]">Best Time:</span>
                    <span className="text-stone-300 font-medium">
                      {itinerary.bestTimeToVisit || "Spring / Autumn"}
                    </span>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[11px]">Daily Budget:</span>
                    <span className="text-stone-300 font-medium">
                      {itinerary.estimatedDailyBudget || "$180 - $320"}
                    </span>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <span className="text-stone-500 block text-[11px]">Key Essentials:</span>
                    <span className="text-stone-300 font-medium truncate block">
                      {itinerary.packingEssentials?.slice(0, 2).join(", ") || "Comfortable footwear"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Day Navigation Tabs */}
              <div className="flex items-center space-x-2 overflow-x-auto pb-2 no-scrollbar">
                {itinerary.days.map((day, idx) => (
                  <button
                    key={day.day}
                    onClick={() => setActiveDayIndex(idx)}
                    className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                      activeDayIndex === idx
                        ? "bg-amber-400 text-stone-950 font-semibold shadow-md"
                        : "bg-stone-900/80 text-stone-400 hover:text-stone-200 border border-stone-800"
                    }`}
                  >
                    Day {day.day}: {day.title}
                  </button>
                ))}
              </div>

              {/* Active Day Detail Card */}
              {itinerary.days[activeDayIndex] && (
                <div className="bg-stone-900/90 border border-stone-800 rounded-3xl p-6 sm:p-7 space-y-6">
                  <div className="flex items-center justify-between border-b border-stone-800 pb-4">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                        Day {itinerary.days[activeDayIndex].day} Theme
                      </span>
                      <h3 className="font-serif text-2xl font-bold text-stone-100">
                        {itinerary.days[activeDayIndex].title}
                      </h3>
                      <p className="text-xs text-stone-400 mt-0.5">
                        {itinerary.days[activeDayIndex].theme}
                      </p>
                    </div>
                  </div>

                  {/* Morning, Afternoon, Evening Cards */}
                  <div className="space-y-4">
                    {/* Morning */}
                    <div className="p-4 rounded-2xl bg-stone-950/70 border border-stone-800/80 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-amber-400 flex items-center space-x-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          <span>Morning</span>
                        </span>
                        <span className="text-stone-400 text-[11px]">
                          {itinerary.days[activeDayIndex].morning.duration}
                        </span>
                      </div>
                      <h4 className="font-medium text-stone-100 text-sm">
                        {itinerary.days[activeDayIndex].morning.activity}
                      </h4>
                      <p className="text-xs text-stone-300 leading-relaxed">
                        {itinerary.days[activeDayIndex].morning.description}
                      </p>
                      {itinerary.days[activeDayIndex].morning.tip && (
                        <div className="pt-2 flex items-start space-x-1.5 text-[11px] text-amber-300/90">
                          <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span>{itinerary.days[activeDayIndex].morning.tip}</span>
                        </div>
                      )}
                    </div>

                    {/* Afternoon */}
                    <div className="p-4 rounded-2xl bg-stone-950/70 border border-stone-800/80 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-amber-400 flex items-center space-x-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          <span>Afternoon</span>
                        </span>
                        <span className="text-stone-400 text-[11px]">
                          {itinerary.days[activeDayIndex].afternoon.duration}
                        </span>
                      </div>
                      <h4 className="font-medium text-stone-100 text-sm">
                        {itinerary.days[activeDayIndex].afternoon.activity}
                      </h4>
                      <p className="text-xs text-stone-300 leading-relaxed">
                        {itinerary.days[activeDayIndex].afternoon.description}
                      </p>
                      {itinerary.days[activeDayIndex].afternoon.tip && (
                        <div className="pt-2 flex items-start space-x-1.5 text-[11px] text-amber-300/90">
                          <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span>{itinerary.days[activeDayIndex].afternoon.tip}</span>
                        </div>
                      )}
                    </div>

                    {/* Evening */}
                    <div className="p-4 rounded-2xl bg-stone-950/70 border border-stone-800/80 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-amber-400 flex items-center space-x-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          <span>Evening & Sunset</span>
                        </span>
                        <span className="text-stone-400 text-[11px]">
                          {itinerary.days[activeDayIndex].evening.duration}
                        </span>
                      </div>
                      <h4 className="font-medium text-stone-100 text-sm">
                        {itinerary.days[activeDayIndex].evening.activity}
                      </h4>
                      <p className="text-xs text-stone-300 leading-relaxed">
                        {itinerary.days[activeDayIndex].evening.description}
                      </p>
                      {itinerary.days[activeDayIndex].evening.tip && (
                        <div className="pt-2 flex items-start space-x-1.5 text-[11px] text-amber-300/90">
                          <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span>{itinerary.days[activeDayIndex].evening.tip}</span>
                        </div>
                      )}
                    </div>

                    {/* Culinary Highlight */}
                    {itinerary.days[activeDayIndex].culinaryHighlight && (
                      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs space-y-1.5">
                        <div className="flex items-center space-x-1.5 text-amber-400 font-semibold">
                          <Utensils className="w-4 h-4" />
                          <span>Signature Culinary Pairing</span>
                        </div>
                        <p className="text-stone-200">
                          <span className="font-semibold text-amber-300">
                            {itinerary.days[activeDayIndex].culinaryHighlight?.dish}:
                          </span>{" "}
                          Try at {itinerary.days[activeDayIndex].culinaryHighlight?.spot} (
                          {itinerary.days[activeDayIndex].culinaryHighlight?.notes})
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-stone-900/40 border border-dashed border-stone-800 rounded-3xl p-12 text-center flex flex-col items-center justify-center min-h-[450px]">
              <Compass className="w-12 h-12 text-stone-600 mb-4" />
              <h3 className="font-serif text-xl font-bold text-stone-200 mb-2">
                Ready to Curate Your Adventure
              </h3>
              <p className="text-xs text-stone-400 max-w-sm">
                Choose your destination, customize duration and preferred activities on the left,
                then click Generate Itinerary.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
