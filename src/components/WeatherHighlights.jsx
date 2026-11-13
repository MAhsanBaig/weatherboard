
import {
  Droplets,
  Wind,
  Thermometer,
  Sun,
} from "lucide-react";

function WeatherHighlights({
  humidity,
  windSpeed,
  feelsLike,
  uvIndex,
  loading,
  temperatureUnit,
}) {
  const unitSymbol = temperatureUnit === "fahrenheit" ? "°F" : "°C";

  const getUVDescription = (value) => {
    if (value === "--") return "Unavailable";
    if (value <= 2) return "Low exposure";
    if (value <= 5) return "Moderate exposure";
    if (value <= 7) return "High exposure";
    if (value <= 10) return "Very high exposure";
    return "Extreme exposure";
  };

  const highlights = [
    {
      title: "Humidity",
      value: `${humidity}${humidity !== "--" ? "%" : ""}`,
      description: "Relative humidity",
      icon: Droplets,
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      title: "Wind Speed",
      value: `${windSpeed}${windSpeed !== "--" ? " km/h" : ""}`,
      description: "Current wind speed",
      icon: Wind,
      color: "text-cyan-600",
      bg: "bg-cyan-50",
    },
    {
      title: "Feels Like",
      value: `${feelsLike}${feelsLike !== "--" ? unitSymbol : ""}`,
      description: "Perceived temperature",
      icon: Thermometer,
      color: "text-orange-500",
      bg: "bg-orange-50",
    },
    {
      title: "UV Index",
      value: uvIndex,
      description: getUVDescription(uvIndex),
      icon: Sun,
      color: "text-amber-500",
      bg: "bg-amber-50",
    },
  ];

  return (
    <section>
      <h2 className="mb-4 text-lg font-bold">
        Today's Highlights
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {highlights.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">
                  {item.title}
                </p>

                <div className={`rounded-xl p-2 ${item.bg}`}>
                  <Icon size={20} className={item.color} />
                </div>
              </div>

              <h3 className="mt-5 text-2xl font-bold">
                {loading ? "--" : item.value}
              </h3>

              <p className="mt-1 text-xs text-slate-400">
                {loading ? "Loading..." : item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default WeatherHighlights;
