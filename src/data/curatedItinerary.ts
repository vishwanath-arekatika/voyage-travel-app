import { Itinerary, ItineraryDay } from "../types";
import { DESTINATIONS } from "./destinations";

export function generateCuratedItinerary(
  dest: string,
  country: string,
  daysCount: number,
  style: string,
  budget: string
): Itinerary {
  const normalizedDest = dest.trim().toLowerCase();
  const matchedDest = DESTINATIONS.find(
    (d) =>
      d.name.toLowerCase() === normalizedDest ||
      d.id.toLowerCase().includes(normalizedDest) ||
      normalizedDest.includes(d.name.toLowerCase())
  );

  const finalCountry = country || matchedDest?.country || "World";
  const finalBestTime =
    matchedDest?.bestTimeToVisit ||
    "Spring (April–May) and Autumn (September–October) for ideal temperatures and radiant skies.";

  const famous = matchedDest?.famousPlaces || [];
  const days: ItineraryDay[] = [];

  const genericThemes = [
    { title: "Historic Architecture & Iconic Landmarks", theme: "Cultural Heritage" },
    { title: "Hidden Quarters, Craft Alleys & Local Cafes", theme: "Authentic Living" },
    { title: "Scenic Panoramas & Natural Escapes", theme: "Nature & Vistas" },
    { title: "Gastronomic Journey & Artisanal Markets", theme: "Culinary & Crafts" },
    { title: "Modern Design & Waterfront Leisure", theme: "Contemporary Vibes" },
    { title: "Farewell Strolls & Evening Panorama", theme: "Unwinding & Memories" },
    { title: "Coastal Relaxation & Local Immersion", theme: "Serenity" },
  ];

  for (let i = 1; i <= Math.min(daysCount, 7); i++) {
    const t = genericThemes[(i - 1) % genericThemes.length];
    const place1 = famous[(i - 1) % (famous.length || 1)];
    const place2 = famous[i % (famous.length || 1)];

    const morningActivity = place1
      ? `Morning visit to ${place1.name}`
      : `Morning exploration of ${dest}'s historic center`;
    const morningDesc = place1
      ? `${place1.description} Arrive early to experience the morning atmosphere before the busiest hours.`
      : `Start early before crowds gather. Wander through the quiet stone alleys, admire preserved architecture, and enjoy coffee at a corner roastery.`;
    const morningTip = place1?.visitorTips || "Arrive before 9:00 AM for soft morning light and clear photography.";

    const afternoonActivity = place2 && place2.name !== place1?.name
      ? `Afternoon exploration of ${place2.name}`
      : `Curated cultural pavilion & neighborhood discovery in ${dest}`;
    const afternoonDesc = place2 && place2.name !== place1?.name
      ? `${place2.description} Take time to explore the surrounding quarters and scenic viewpoints.`
      : `Immerse in the region's artistic history and craft collections. Take time in the sculpture courtyards and artisan boutiques.`;
    const afternoonTip = place2?.visitorTips || "Pre-book timed tickets to bypass ticket counter lines.";

    days.push({
      day: i,
      title: place1 ? `${place1.name} & ${t.title}` : t.title,
      theme: t.theme,
      morning: {
        activity: morningActivity,
        description: morningDesc,
        duration: "2.5 hours",
        tip: morningTip,
      },
      afternoon: {
        activity: afternoonActivity,
        description: afternoonDesc,
        duration: "3 hours",
        tip: afternoonTip,
      },
      evening: {
        activity: `Sunset panorama and evening stroll in ${dest}`,
        description: `Head to an elevated terrace or scenic waterfront as dusk transforms the surroundings with ambient warm lanterns and evening reflections.`,
        duration: "2 hours",
        tip: "Settle into an open-air terrace 30 minutes before sunset.",
      },
      culinaryHighlight: {
        dish: `Local ${style.toLowerCase()} specialty`,
        spot: `Artisanal bistro near the historic quarter`,
        notes: `Ask for the daily seasonal chef recommendation paired with regional vintage or tea.`,
      },
    });
  }

  return {
    destination: matchedDest?.name || dest,
    country: finalCountry,
    totalDays: daysCount,
    summary: `A carefully paced ${daysCount}-day ${style.toLowerCase()} itinerary in ${
      matchedDest?.name || dest
    }, balancing celebrated icons, quiet neighborhood walks, and culinary heritage.`,
    bestTimeToVisit: finalBestTime,
    packingEssentials: [
      "Comfortable broken-in walking shoes",
      "Light breathable layers and evening jacket",
      "Universal travel adapter and portable power bank",
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

