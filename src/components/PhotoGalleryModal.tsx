import React, { useState, useEffect } from "react";
import { X, Search, Camera, ExternalLink, Loader2, Sparkles } from "lucide-react";

interface Photo {
  id: string;
  url: string;
  thumb: string;
  photographer: string;
  photographerUrl?: string;
  description: string;
  source: string;
}

interface PhotoGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

export const PhotoGalleryModal: React.FC<PhotoGalleryModalProps> = ({
  isOpen,
  onClose,
  initialQuery = "tropical beach travel",
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(false);
  const [source, setSource] = useState("Curated");

  const searchPhotos = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/photos?q=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      if (data.photos) {
        setPhotos(data.photos);
        setSource(data.source || "Unsplash / Pexels");
      }
    } catch (err) {
      console.error("Failed to load photos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setQuery(initialQuery);
      searchPhotos(initialQuery);
    }
  }, [isOpen, initialQuery]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-stone-900 border border-stone-800 rounded-2xl flex flex-col overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-5 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-amber-400/10 text-amber-400 border border-amber-400/20">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-semibold text-stone-100 flex items-center gap-2">
                Destination Gallery
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-stone-800 text-stone-400 border border-stone-700">
                  {source}
                </span>
              </h3>
              <p className="text-xs text-stone-400">
                High-resolution curated travel photography & world landscapes
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 bg-stone-950/60 border-b border-stone-800 flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") searchPhotos(query);
              }}
              placeholder="Search places, beaches, landmarks, architectures..."
              className="w-full pl-9 pr-4 py-2 bg-stone-900 border border-stone-800 rounded-xl text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-400/70"
            />
          </div>
          <button
            onClick={() => searchPhotos(query)}
            className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-semibold transition-colors flex items-center space-x-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Search</span>
          </button>
        </div>

        {/* Photos Grid */}
        <div className="p-5 flex-1 overflow-y-auto no-scrollbar">
          {loading ? (
            <div className="py-24 flex flex-col items-center justify-center space-y-3">
              <Loader2 className="w-6 h-6 text-amber-400 animate-spin" />
              <span className="text-xs text-stone-400">Fetching high-res photography...</span>
            </div>
          ) : photos.length === 0 ? (
            <div className="py-20 text-center text-stone-500 text-sm">
              No photos found for "{query}". Try another search.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  className="group relative rounded-xl overflow-hidden bg-stone-950 border border-stone-800 aspect-[4/3]"
                >
                  <img
                    src={photo.url || photo.thumb}
                    alt={photo.description}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end">
                    <p className="text-xs text-stone-200 line-clamp-1 font-medium">
                      {photo.description}
                    </p>
                    <div className="flex items-center justify-between mt-1 text-[11px] text-stone-400">
                      <span>Photo by {photo.photographer}</span>
                      {photo.photographerUrl && (
                        <a
                          href={photo.photographerUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-amber-400 hover:underline inline-flex items-center gap-0.5"
                        >
                          Profile <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
