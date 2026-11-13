
import {
  Sun,
  Moon,
  Cloud,
  CloudSun,
  CloudMoon,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudSnow,
  CloudLightning,
} from "lucide-react";

export function getWeatherCondition(code) {
  const conditions = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    71: "Slight snow",
    73: "Moderate snow",
    75: "Heavy snow",
    80: "Rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",
    95: "Thunderstorm",
    96: "Thunderstorm with hail",
    99: "Heavy thunderstorm with hail",
  };

  return conditions[code] || "Unknown conditions";
}

export function getWeatherIcon(code, isDay = 1) {
  if (code == null) return CloudSun;

  if (code === 0) {
    return isDay ? Sun : Moon;
  }

  if (code === 1 || code === 2) {
    return isDay ? CloudSun : CloudMoon;
  }

  if (code === 3) return Cloud;
  if (code === 45 || code === 48) return CloudFog;

  if (code >= 51 && code <= 55) return CloudDrizzle;

  if (
    (code >= 61 && code <= 65) ||
    (code >= 80 && code <= 82)
  ) {
    return CloudRain;
  }

  if (code >= 71 && code <= 77) return CloudSnow;

  if (code >= 95 && code <= 99) return CloudLightning;

  return CloudSun;
}

export function formatForecastDay(date) {
  return new Date(`${date}T12:00:00`).toLocaleDateString(
    "en-US",
    { weekday: "short" }
  );
}
