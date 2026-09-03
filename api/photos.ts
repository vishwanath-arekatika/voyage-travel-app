import { getCuratedPhotos } from "../src/data/curatedPhotos";

export default async function handler(req: any, res: any) {
  try {
    const query = (req.query?.q as string) || "travel";

    // 1. If Unsplash Access Key is present, search Unsplash
    if (process.env.UNSPLASH_ACCESS_KEY) {
      try {
        const unsplashUrl = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
          query
        )}&per_page=12&orientation=landscape`;

        const uRes = await fetch(unsplashUrl, {
          headers: {
            Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
          },
        });

        if (uRes.ok) {
          const uData: any = await uRes.json();
          const photos = (uData.results || []).map((p: any) => ({
            id: p.id,
            url: p.urls?.regular || p.urls?.full,
            thumb: p.urls?.small,
            photographer: p.user?.name || "Unsplash Creator",
            photographerUrl: p.user?.links?.html,
            description: p.alt_description || p.description || query,
            source: "Unsplash API",
          }));
          return res.status(200).json({ photos, source: "Unsplash Live" });
        }
      } catch (uErr) {
        console.warn("Unsplash API fetch failed:", uErr);
      }
    }

    // 2. Curated travel photography archive (works 100% without any API key)
    const curatedPhotos = getCuratedPhotos(query, 12);
    res.status(200).json({ photos: curatedPhotos, source: "Curated Travel Archive" });
  } catch (error: any) {
    res.status(500).json({ error: "Failed to fetch photos", message: error.message });
  }
}
