import React, { useState } from "react";
import {
  Sparkles,
  Clock,
  Ticket,
  Lightbulb,
  CheckCircle2,
  Bookmark,
  BookmarkCheck,
  Compass,
} from "lucide-react";
import { FamousPlace } from "../types";

interface FamousPlacesSectionProps {
  places: FamousPlace[];
  destinationName: string;
}

export const FamousPlacesSection: React.FC<FamousPlacesSectionProps> = ({
  places,
  destinationName,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());

  const categories = ["All", ...Array.from(new Set(places.map((p) => p.category)))];

  const filteredPlaces =
    selectedCategory === "All"
      ? places
      : places.filter((p) => p.category === selectedCategory);

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <section id="famous-places-section" className="py-12 border-t border-stone-800">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-medium mb-2.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Landmarks & Monuments</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-100">
            Famous Places in {destinationName}
          </h2>
          <p className="text-sm text-stone-400 mt-1 max-w-xl">
            Presented with high-resolution photography, architectural context,
            visitor timings, and insider traveler tips.
          </p>
        </div>

        {/* Category filter pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? "bg-amber-400 text-stone-950 font-semibold"
                  : "bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of famous places - presented properly, not as a bare list! */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredPlaces.map((place) => {
          const isSaved = bookmarkedIds.has(place.id);
          return (
            <div
              key={place.id}
              id={`place-card-${place.id}`}
              className="bg-stone-900/80 rounded-2xl border border-stone-800/90 overflow-hidden hover:border-stone-700 transition-all flex flex-col group"
            >
              {/* Image & Badges */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-stone-950">
                <img
                  src={place.image}
                  alt={place.name}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-black/30 pointer-events-none" />

                {/* Category Pill */}
                <div className="absolute top-3.5 left-3.5 z-10">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-stone-950/80 backdrop-blur-md text-amber-300 border border-amber-500/30">
                    {place.category}
                  </span>
                </div>

                {/* Bookmark Button */}
                <button
                  onClick={() => toggleBookmark(place.id)}
                  className="absolute top-3.5 right-3.5 z-10 p-2 rounded-full bg-stone-950/80 backdrop-blur-md text-stone-300 hover:text-amber-400 border border-stone-800 transition-colors"
                  title={isSaved ? "Saved to your list" : "Save this place"}
                >
                  {isSaved ? (
                    <BookmarkCheck className="w-4 h-4 text-amber-400" />
                  ) : (
                    <Bookmark className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Detail Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-stone-100 mb-2 group-hover:text-amber-300 transition-colors">
                    {place.name}
                  </h3>
                  <p className="text-sm text-stone-300 leading-relaxed">
                    {place.description}
                  </p>
                </div>

                {/* Key Highlights */}
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-400 block mb-2">
                    Key Highlights:
                  </span>
                  <ul className="space-y-1.5">
                    {place.highlights.map((highlight, idx) => (
                      <li
                        key={idx}
                        className="flex items-start text-xs text-stone-300 space-x-2"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Visitor Tip Callout */}
                <div className="p-3.5 rounded-xl bg-stone-950/70 border border-amber-500/20 text-xs text-stone-300 flex items-start space-x-2.5">
                  <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-amber-300">Insider Tip: </span>
                    <span>{place.visitorTips}</span>
                  </div>
                </div>

                {/* Timings & Entry Ticket info */}
                <div className="pt-3 border-t border-stone-800/80 flex flex-wrap items-center justify-between gap-2 text-xs text-stone-400">
                  <div className="flex items-center space-x-1.5">
                    <Clock className="w-3.5 h-3.5 text-stone-500" />
                    <span>Best Time: {place.bestTimeToExplore}</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Ticket className="w-3.5 h-3.5 text-stone-500" />
                    <span className="font-medium text-stone-300">{place.entryFee}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
