// WMO weather code mapping to human-readable condition and icon
function decodeWmoCode(code: number): { condition: string; icon: string } {
  if (code === 0) return { condition: "Clear Sky", icon: "sun" };
  if (code === 1) return { condition: "Mainly Clear", icon: "sun-dim" };
  if (code === 2) return { condition: "Partly Cloudy", icon: "cloud-sun" };
  if (code === 3) return { condition: "Overcast", icon: "cloud" };
  if (code === 45 || code === 48) return { condition: "Foggy & Misty", icon: "cloud-fog" };
  if (code >= 51 && code <= 55) return { condition: "Light Drizzle", icon: "cloud-drizzle" };
  if (code >= 61 && code <= 65) return { condition: "Rain", icon: "cloud-rain" };
  if (code >= 71 && code <= 77) return { condition: "Snowfall", icon: "snowflake" };
  if (code >= 80 && code <= 82) return { condition: "Rain Showers", icon: "cloud-rain" };
  if (code >= 95 && code <= 99) return { condition: "Thunderstorm", icon: "cloud-lightning" };
  return { condition: "Pleasant", icon: "cloud-sun" };
}

export default async function handler(req: any, res: any) {
  try {
    const lat = parseFloat(req.query?.lat as string);
    const lon = parseFloat(req.query?.lon as string);
    const cityName = (req.query?.city as string) || "Current Location";

    if (isNaN(lat) || isNaN(lon)) {
      return res.status(400).json({ error: "Valid latitude and longitude required" });
    }

    // Check if OpenWeather key is provided and try it
    const openWeatherKey = process.env.OPENWEATHER_API_KEY;
    if (openWeatherKey) {
      try {
        const owUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${openWeatherKey}`;
        const owRes = await fetch(owUrl);
        if (owRes.ok) {
          const owData: any = await owRes.json();
          const tempC = Math.round(owData.main.temp);
          const tempF = Math.round((tempC * 9) / 5 + 32);
          const condition = owData.weather?.[0]?.main || "Clear";
          const description = owData.weather?.[0]?.description || "Pleasant";

          return res.status(200).json({
            provider: "OpenWeather",
            city: cityName || owData.name,
            tempC,
            tempF,
            feelsLikeC: Math.round(owData.main.feels_like),
            humidity: owData.main.humidity,
            windSpeedKmh: Math.round((owData.wind.speed || 0) * 3.6),
            condition,
            description,
            icon: owData.weather?.[0]?.icon || "01d",
            timestamp: new Date().toISOString(),
          });
        }
      } catch (owErr) {
        console.warn("OpenWeather query failed, falling back to Open-Meteo:", owErr);
      }
    }

    // Open-Meteo real-time global weather API (no key required, 100% reliable)
    const meteoUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto`;

    const meteoRes = await fetch(meteoUrl);
    if (!meteoRes.ok) {
      throw new Error(`Weather service returned ${meteoRes.status}`);
    }

    const meteoData: any = await meteoRes.json();
    const current = meteoData.current;
    const tempC = Math.round(current.temperature_2m);
    const tempF = Math.round((tempC * 9) / 5 + 32);
    const feelsLikeC = Math.round(current.apparent_temperature);
    const weatherInfo = decodeWmoCode(current.weather_code);

    // Build 5-day daily forecast
    const dailyForecast = (meteoData.daily?.time || []).slice(0, 5).map((date: string, idx: number) => {
      const code = meteoData.daily.weather_code[idx];
      const maxC = Math.round(meteoData.daily.temperature_2m_max[idx]);
      const minC = Math.round(meteoData.daily.temperature_2m_min[idx]);
      const precip = meteoData.daily.precipitation_probability_max?.[idx] ?? 0;
      const dayInfo = decodeWmoCode(code);

      return {
        date,
        dayOfWeek: new Date(date).toLocaleDateString("en-US", { weekday: "short" }),
        maxC,
        minC,
        maxF: Math.round((maxC * 9) / 5 + 32),
        minF: Math.round((minC * 9) / 5 + 32),
        condition: dayInfo.condition,
        icon: dayInfo.icon,
        precipChance: precip,
      };
    });

    res.status(200).json({
      provider: "Open-Meteo Global",
      city: cityName,
      latitude: lat,
      longitude: lon,
      tempC,
      tempF,
      feelsLikeC,
      feelsLikeF: Math.round((feelsLikeC * 9) / 5 + 32),
      humidity: current.relative_humidity_2m,
      windSpeedKmh: Math.round(current.wind_speed_10m),
      isDay: current.is_day === 1,
      condition: weatherInfo.condition,
      icon: weatherInfo.icon,
      forecast: dailyForecast,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("Weather error:", error);
    res.status(500).json({ error: "Failed to fetch weather data", message: error.message });
  }
}
