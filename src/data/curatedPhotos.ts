export interface CuratedPhoto {
  id: string;
  url: string;
  thumb: string;
  photographer: string;
  photographerUrl: string;
  description: string;
  source: string;
  tags: string[];
}

export const CURATED_PHOTOS: CuratedPhoto[] = [
  // Beaches & Tropical
  {
    id: "beach-maldives-1",
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
    thumb: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
    photographer: "Sean Oulashin",
    photographerUrl: "https://unsplash.com/@seanoulashin",
    description: "White sand beach with leaning palm trees and crystal turquoise waves",
    source: "Voyage Curated",
    tags: ["beach", "tropical", "maldives", "ocean", "sea", "palm", "paradise", "summer"],
  },
  {
    id: "beach-bora-bora",
    url: "https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=1600&q=80",
    thumb: "https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=600&q=80",
    photographer: "Sébastien Jermer",
    photographerUrl: "https://unsplash.com/@sebastienjermer",
    description: "Overwater luxury bungalows above crystal blue lagoon in Bora Bora",
    source: "Voyage Curated",
    tags: ["beach", "tropical", "resort", "bungalow", "lagoon", "island", "honeymoon"],
  },
  {
    id: "beach-seychelles",
    url: "https://images.unsplash.com/photo-1589553416260-f586c8f1514f?auto=format&fit=crop&w=1600&q=80",
    thumb: "https://images.unsplash.com/photo-1589553416260-f586c8f1514f?auto=format&fit=crop&w=600&q=80",
    photographer: "Alessandro Russo",
    photographerUrl: "https://unsplash.com/@ale_russo",
    description: "Granite boulders and turquoise water at Anse Source d'Argent, Seychelles",
    source: "Voyage Curated",
    tags: ["beach", "tropical", "seychelles", "rocks", "island", "nature"],
  },

  // Japan & Kyoto
  {
    id: "kyoto-pagoda-1",
    url: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1600&q=80",
    thumb: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80",
    photographer: "Su San Lee",
    photographerUrl: "https://unsplash.com/@susan_lee",
    description: "Historic pagoda framed by Japanese maple trees in Kyoto",
    source: "Voyage Curated",
    tags: ["kyoto", "japan", "temple", "pagoda", "asia", "culture", "autumn", "bamboo"],
  },
  {
    id: "tokyo-shibuya-night",
    url: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1600&q=80",
    thumb: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80",
    photographer: "Jezael Melgoza",
    photographerUrl: "https://unsplash.com/@jezael",
    description: "Vibrant neon-lit Tokyo skyline with illuminated Tokyo Tower at night",
    source: "Voyage Curated",
    tags: ["tokyo", "japan", "city", "night", "neon", "skyline", "urban", "asia"],
  },
  {
    id: "japan-fuji-cherry",
    url: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?auto=format&fit=crop&w=1600&q=80",
    thumb: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?auto=format&fit=crop&w=600&q=80",
    photographer: "David Becker",
    photographerUrl: "https://unsplash.com/@davidbecker",
    description: "Snow-capped Mount Fuji surrounded by blooming pink cherry blossoms",
    source: "Voyage Curated",
    tags: ["fuji", "japan", "cherry blossom", "sakura", "mountain", "spring"],
  },

  // Greece & Mediterranean
  {
    id: "santorini-caldera-1",
    url: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1600&q=80",
    thumb: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=600&q=80",
    photographer: "Heidi Kaden",
    photographerUrl: "https://unsplash.com/@heidikaden",
    description: "Blue dome churches overlooking the Aegean Sea caldera in Oia, Santorini",
    source: "Voyage Curated",
    tags: ["santorini", "greece", "caldera", "island", "aegean", "europe", "white", "architecture"],
  },
  {
    id: "santorini-sunset",
    url: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1600&q=80",
    thumb: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80",
    photographer: "Will Truettner",
    photographerUrl: "https://unsplash.com/@willtruettner",
    description: "Golden hour sunset bathing cliffside terraces and whitewashed windmills",
    source: "Voyage Curated",
    tags: ["santorini", "sunset", "greece", "coast", "mediterranean", "romantic"],
  },

  // Italy & Amalfi
  {
    id: "amalfi-positano-1",
    url: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1600&q=80",
    thumb: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=600&q=80",
    photographer: "Daniele D'Andreti",
    photographerUrl: "https://unsplash.com",
    description: "Pastel cliffside villas cascading into the Mediterranean waters of Positano",
    source: "Voyage Curated",
    tags: ["amalfi", "positano", "italy", "cliff", "mediterranean", "europe", "coast"],
  },
  {
    id: "rome-colosseum",
    url: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1600&q=80",
    thumb: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=600&q=80",
    photographer: "David Kohler",
    photographerUrl: "https://unsplash.com/@davidkohler",
    description: "Ancient Colosseum in Rome bathed in warm afternoon sunlight",
    source: "Voyage Curated",
    tags: ["rome", "italy", "colosseum", "ancient", "history", "europe", "architecture"],
  },

  // Alpine Mountains & Lakes
  {
    id: "banff-moraine-1",
    url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80",
    thumb: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    photographer: "Bailey Zindel",
    photographerUrl: "https://unsplash.com/@baileyzindel",
    description: "Alpine glacier lake reflecting mountain peaks in Canadian Rockies",
    source: "Voyage Curated",
    tags: ["banff", "canada", "mountain", "lake", "rockies", "nature", "hiking", "water"],
  },
  {
    id: "swiss-alps-matterhorn",
    url: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1600&q=80",
    thumb: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=600&q=80",
    photographer: "Lucas Favre",
    photographerUrl: "https://unsplash.com/@lucasfavre",
    description: "The iconic pyramid peak of the Matterhorn in Zermatt, Switzerland",
    source: "Voyage Curated",
    tags: ["swiss", "switzerland", "alps", "matterhorn", "snow", "mountain", "ski"],
  },
  {
    id: "dolomites-peaks",
    url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80",
    thumb: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
    photographer: "Kalvis Upitis",
    photographerUrl: "https://unsplash.com",
    description: "Dramatic jagged peaks and green alpine meadow under dramatic clouds",
    source: "Voyage Curated",
    tags: ["dolomites", "mountain", "hiking", "nature", "alps", "italy"],
  },

  // France & Paris
  {
    id: "paris-eiffel-tower",
    url: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1600&q=80",
    thumb: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80",
    photographer: "Chris Karidis",
    photographerUrl: "https://unsplash.com/@chriskaridis",
    description: "Eiffel Tower viewed through Parisian streets and Haussmann buildings",
    source: "Voyage Curated",
    tags: ["paris", "france", "eiffel", "europe", "city", "romantic", "architecture"],
  },
  {
    id: "paris-louvre-night",
    url: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=1600&q=80",
    thumb: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=600&q=80",
    photographer: "Anthony Delanoix",
    photographerUrl: "https://unsplash.com/@anthonydelanoix",
    description: "Glass Pyramid courtyard of the Louvre illuminated against twilight sky",
    source: "Voyage Curated",
    tags: ["paris", "france", "louvre", "museum", "night", "art", "architecture"],
  },

  // South Africa & Cape Town
  {
    id: "cape-town-camps-bay",
    url: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=1600&q=80",
    thumb: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=600&q=80",
    photographer: "Jean van der Meulen",
    photographerUrl: "https://unsplash.com",
    description: "Camps Bay coastline with dramatic Twelve Apostles mountain backdrop",
    source: "Voyage Curated",
    tags: ["cape town", "south africa", "africa", "coast", "table mountain", "beach"],
  },

  // Morocco & Marrakech
  {
    id: "marrakech-medina",
    url: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1600&q=80",
    thumb: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80",
    photographer: "Annie Spratt",
    photographerUrl: "https://unsplash.com/@anniespratt",
    description: "Exquisite carved arches and terracotta courtyard in a historic Moroccan riad",
    source: "Voyage Curated",
    tags: ["marrakech", "morocco", "africa", "riad", "medina", "architecture", "desert"],
  },

  // Bali & Indonesia
  {
    id: "bali-rice-terraces",
    url: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1600&q=80",
    thumb: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80",
    photographer: "Oliver Sjöström",
    photographerUrl: "https://unsplash.com/@ollivves",
    description: "Lush emerald green Tegallalang rice terraces in Ubud, Bali",
    source: "Voyage Curated",
    tags: ["bali", "indonesia", "rice", "terrace", "asia", "tropical", "nature"],
  },

  // New Zealand & Fjords
  {
    id: "new-zealand-queenstown",
    url: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1600&q=80",
    thumb: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80",
    photographer: "Tobias Keller",
    photographerUrl: "https://unsplash.com/@keller_tobias",
    description: "Winding alpine road through pristine New Zealand peaks and lakes",
    source: "Voyage Curated",
    tags: ["new zealand", "queenstown", "roadtrip", "mountains", "fjord", "nature", "adventure"],
  },
];

/**
 * Intelligent photo matcher that searches curated travel photos
 * even without an external API key.
 */
export function getCuratedPhotos(query: string, limit = 12): CuratedPhoto[] {
  if (!query || !query.trim()) {
    return CURATED_PHOTOS.slice(0, limit);
  }

  const qTerms = query
    .toLowerCase()
    .split(/\s+/)
    .filter((t) => t.length > 2);

  if (qTerms.length === 0) {
    return CURATED_PHOTOS.slice(0, limit);
  }

  // Score each photo
  const scored = CURATED_PHOTOS.map((photo) => {
    let score = 0;
    const descLower = photo.description.toLowerCase();
    const tagsLower = photo.tags.join(" ").toLowerCase();

    for (const term of qTerms) {
      if (tagsLower.includes(term)) score += 3;
      if (descLower.includes(term)) score += 2;
    }

    return { photo, score };
  });

  const matched = scored
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.photo);

  // If matches found, fill up to limit with general curated photos
  if (matched.length > 0) {
    const remaining = CURATED_PHOTOS.filter((p) => !matched.some((m) => m.id === p.id));
    return [...matched, ...remaining].slice(0, limit);
  }

  // Fallback to top curated
  return CURATED_PHOTOS.slice(0, limit);
}
