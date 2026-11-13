
import {
  Sunrise,
  Sunset,
  Compass,
  Wind,
} from "lucide-react";

function formatTime(value) {
  if (!value || value === "--") return "--";

  const time = value.split("T")[1];

  if (!time) return "--";

  const [hours, minutes] = time.split(":");
  const hour = Number(hours);
  const period = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour % 12 || 12;

  return `${formattedHour}:${minutes} ${period}`;
}

function getWindDirection(degrees) {
  if (degrees == null || degrees === "--") return "--";

  const directions = [
    "N", "NNE", "NE", "ENE",
    "E", "ESE", "SE", "SSE",
    "S", "SSW", "SW", "WSW",
    "W", "WNW", "NW", "NNW",
  ];

  const index = Math.round(
    (((degrees % 360) + 360) % 360) / 22.5
  ) % 16;

  return directions[index];
}

function WeatherDetails({
  sunrise,
  sunset,
  windDirection,
  maxWindSpeed,
  loading,
}) {
  const details = [
    {
      title: "Sunrise",
      value: formatTime(sunrise),
      description: "Today's sunrise",
      icon: Sunrise,
      color: "text-orange-500",
      bg: "bg-orange-50",
    },
    {
      title: "Sunset",
      value: formatTime(sunset),
      description: "Today's sunset",
      icon: Sunset,
      color: "text-rose-500",
      bg: "bg-rose-50",
    },
    {
      title: "Wind Direction",
      value: windDirection == null
        ? "--"
        : `${getWindDirection(windDirection)} (${Math.round(windDirection)}°)`,
      description: "Current wind direction",
      icon: Compass,
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      title: "Maximum Wind",
      value:
        maxWindSpeed == null
          ? "--"
          : `${maxWindSpeed} km/h`,
      description: "Today's maximum wind speed",
      icon: Wind,
      color: "text-cyan-600",
      bg: "bg-cyan-50",
    },
  ];

  return (
    <section>
      <div className="mb-4">
        <h2 className="text-lg font-bold">
          Detailed Weather Information
        </h2>

        <p className="mt-1 text-xs text-slate-400">
          Additional weather conditions for today
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {details.map((item) => {
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

export default WeatherDetails;
