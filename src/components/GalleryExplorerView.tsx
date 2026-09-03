import React, { useState, useEffect } from "react";
import {
  Camera,
  Search,
  ExternalLink,
  Sparkles,
  RefreshCw,
  Eye,
  X,
  Palmtree,
  Compass,
} from "lucide-react";
import { fetchPhotos, PhotoItem } from "../services/api";

export const GalleryExplorerView: React.FC = () => {
  const [query, setQuery] = useState("tropical beach");
  const [searchInput, setSearchInput] = useState("");
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activePhoto, setActivePhoto] = useState<PhotoItem | null>(null);

  const categories = [
    { label: "Tropical Beaches", q: "tropical beach white sand palm tree turquoise ocean" },
    { label: "Kyoto & Temples", q: "kyoto japan pagoda bamboo temple" },
    { label: "Santorini & Islands", q: "santorini greece caldera blue dome aegean sea" },
    { label: "Alpine Mountains", q: "banff canadian rockies mountain lake nature" },
    { label: "Coastal Cliffs", q: "amalfi coast positano cliffside sea" },
    { label: "Historic Citadels", q: "marrakech medina souk riad architecture" },
  ];

  const loadPhotos = async (q: string) => {
    setIsLoading(true);
    try {
      const items = await fetchPhotos(q);
      setPhotos(items);
    } catch (err) {
      console.error("Failed to load gallery photos:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPhotos(query);
  }, [query]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    setQuery(searchInput.trim());
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="border-b border-stone-800 pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-medium mb-2.5">
            <Camera className="w-3.5 h-3.5" />
            <span>Curated Visual Photography</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-100">
            World Destination Photography
          </h1>
          <p className="text-sm text-stone-400 mt-1 max-w-xl">
            High-resolution visual archives showcasing azure shores, sacred architecture,
            and alpine mountain peaks across the world.
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="flex items-center w-full md:w-80">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search photography..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-xs text-stone-100 placeholder-stone-400 focus:outline-none focus:border-amber-400"
            />
          </div>
          <button
            type="submit"
            className="ml-2 px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-semibold text-xs transition-colors"
          >
            Find
          </button>
        </form>
      </div>

      {/* Category Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.label}
            onClick={() => setQuery(cat.q)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
              query === cat.q
                ? "bg-amber-400 text-stone-950 font-semibold"
                : "bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Photo Grid */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 text-stone-400">
          <RefreshCw className="w-8 h-8 animate-spin text-amber-400 mb-3" />
          <p className="text-xs">Fetching high-resolution travel photography...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setActivePhoto(photo)}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-stone-900 border border-stone-800/80 cursor-pointer"
            >
              <img
                src={photo.thumb || photo.url}
                alt={photo.description}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent opacity-0 group-hover:opacity-90 transition-opacity flex flex-col justify-end p-4">
                <p className="text-xs text-stone-100 font-medium line-clamp-2 mb-1">
                  {photo.description}
                </p>
                <div className="flex items-center justify-between text-[11px] text-stone-400">
                  <span>Photo by {photo.photographer}</span>
                  <span className="text-amber-400 flex items-center space-x-1">
                    <Eye className="w-3 h-3" />
                    <span>View</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {activePhoto && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-8 animate-in fade-in duration-300">
          <div className="flex items-center justify-between text-stone-300">
            <span className="text-xs font-mono text-stone-400">
              {activePhoto.source} • Photo by {activePhoto.photographer}
            </span>
            <button
              onClick={() => setActivePhoto(null)}
              className="p-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center p-4">
            <img
              src={activePhoto.url}
              alt={activePhoto.description}
              className="max-h-[78vh] max-w-full rounded-2xl object-contain shadow-2xl"
            />
          </div>

          <div className="flex items-center justify-between text-xs text-stone-400 max-w-3xl mx-auto w-full pt-2">
            <span className="truncate pr-4 text-stone-200">{activePhoto.description}</span>
            {activePhoto.photographerUrl && (
              <a
                href={activePhoto.photographerUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1 text-amber-400 hover:underline shrink-0"
              >
                <span>Creator Profile</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
