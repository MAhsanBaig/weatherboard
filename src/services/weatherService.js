
const WEATHER_API_URL = "https://api.open-meteo.com/v1/forecast";

export async function getWeather(latitude, longitude) {
  const params = new URLSearchParams({
    latitude,
    longitude,

    current: [
      "is_day",
      "wind_speed_10m",
      "wind_direction_10m",
      "apparent_temperature",
      "relative_humidity_2m",
      "temperature_2m",
      "weather_code",
    ].join(","),

    daily: [
      "weather_code",
      "temperature_2m_max",
      "temperature_2m_min",
      "sunrise",
      "sunset",
      "wind_speed_10m_max",
      "uv_index_max",
    ].join(","),

    timezone: "auto",
    forecast_days: 6,
  });

  const response = await fetch(`${WEATHER_API_URL}?${params}`);

  if (!response.ok) {
    throw new Error("Unable to fetch weather information.");
  }

  return response.json();
}
