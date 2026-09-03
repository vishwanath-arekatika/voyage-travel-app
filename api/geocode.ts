export default async function handler(req: any, res: any) {
  try {
    const query = (req.query?.q as string) || "";
    if (!query || query.trim().length < 2) {
      return res.status(400).json({ error: "Query must be at least 2 characters" });
    }

    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      query.trim()
    )}&count=8&language=en&format=json`;

    const response = await fetch(geoUrl);
    if (!response.ok) {
      throw new Error(`Geocoding failed with status ${response.status}`);
    }

    const data: any = await response.json();
    const results = (data.results || []).map((item: any) => ({
      id: item.id,
      name: item.name,
      country: item.country,
      countryCode: item.country_code,
      admin1: item.admin1 || "",
      latitude: item.latitude,
      longitude: item.longitude,
      timezone: item.timezone,
    }));

    res.status(200).json({ results });
  } catch (error: any) {
    res.status(500).json({ error: "Failed to search location", message: error.message });
  }
}
