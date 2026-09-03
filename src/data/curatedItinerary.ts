import { Itinerary, ItineraryDay } from "../types";

export function generateCuratedItinerary(
  dest: string,
  country: string,
  daysCount: number,
  style: string,
  budget: string
): Itinerary {
  const days: ItineraryDay[] = [];
  const themes = [
    { title: "Historic Architecture & Iconic Landmarks", theme: "Cultural Heritage" },
    { title: "Hidden Quarters, Craft Alleys & Local Cafes", theme: "Authentic Living" },
    { title: "Scenic Panoramas & Natural Escapes", theme: "Nature & Vistas" },
    { title: "Gastronomic Journey & Artisanal Markets", theme: "Culinary & Crafts" },
    { title: "Modern Design & Waterfront Leisure", theme: "Contemporary Vibes" },
    { title: "Farewell Strolls & Evening Panorama", theme: "Unwinding & Memories" },
  ];

  for (let i = 1; i <= Math.min(daysCount, 7); i++) {
    const t = themes[(i - 1) % themes.length];
    days.push({
      day: i,
      title: `${t.title}`,
      theme: t.theme,
      morning: {
        activity: `Morning exploration of ${dest}'s premier historic district`,
        description: `Start early before crowds gather. Wander through the quiet stone alleys, admire preserved facade architecture, and enjoy coffee at a corner roastery.`,
        duration: "2.5 hours",
        tip: "Arrive before 9:00 AM for soft morning light and clear photos.",
      },
      afternoon: {
        activity: `Curated museum & heritage pavilion visit in ${dest}`,
        description: `Immerse in the region's artistic history and craft collections. Take time in the museum sculpture courtyards and temporary exhibitions.`,
        duration: "3 hours",
        tip: "Pre-book timed tickets to bypass ticket counter lines.",
      },
      evening: {
        activity: `Sunset promenade and panoramic viewpoint`,
        description: `Head to the elevated viewpoint as dusk transforms the cityscape with ambient amber streetlamps and skyline reflections.`,
        duration: "2 hours",
        tip: "Settle into an open-air terrace 30 minutes before sunset.",
      },
      culinaryHighlight: {
        dish: `Local ${style.toLowerCase()} regional specialty`,
        spot: `Artisanal bistro in the Old Quarter`,
        notes: `Ask for the daily seasonal chef recommendation paired with regional vintage.`,
      },
    });
  }

  return {
    destination: dest,
    country: country,
    totalDays: daysCount,
    summary: `A carefully paced ${daysCount}-day ${style.toLowerCase()} itinerary in ${dest}, blending monumental architecture, peaceful neighborhood walks, and local cuisine.`,
    bestTimeToVisit: "Spring (April–May) and Autumn (September–October) for ideal temperatures and radiant skies.",
    packingEssentials: [
      "Comfortable broken-in walking shoes",
      "Light breathable layers and evening jacket",
      "Universal adapter and portable power bank",
      "Refillable insulated water flask",
    ],
    estimatedDailyBudget:
      budget === "Luxury"
        ? "$350 - $600 USD"
        : budget === "Budget"
        ? "$60 - $110 USD"
        : "$140 - $250 USD",
    days,
  };
}
