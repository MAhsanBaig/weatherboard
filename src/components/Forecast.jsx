
import {
  Sun,
  Cloud,
  CloudSun,
  CloudRain,
  CloudFog,
  CloudDrizzle,
  CloudSnow,
  CloudLightning,
} from "lucide-react";

function getWeatherIcon(condition) {
  const value = condition.toLowerCase();

  if (value.includes("thunderstorm")) return CloudLightning;
  if (value.includes("snow")) return CloudSnow;
  if (value.includes("fog")) return CloudFog;
  if (value.includes("drizzle")) return CloudDrizzle;
  if (value.includes("rain") || value.includes("shower")) return CloudRain;

  if (value.includes("cloud")) {
    return value.includes("partly") ? CloudSun : Cloud;
  }

  return Sun;
}

function Forecast({
  forecast = [],
  loading,
  temperatureUnit,
}) {
  const unitSymbol =
    temperatureUnit === "fahrenheit" ? "°F" : "°C";

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold">5-Day Forecast</h2>
          <p className="mt-1 text-xs text-slate-400">
            Upcoming weather conditions
          </p>
        </div>
      </div>

      {loading ? (
        <p className="py-8 text-center text-sm text-slate-400">
          Loading forecast...
        </p>
      ) : forecast.length === 0 ? (
        <p className="py-8 text-center text-sm text-slate-400">
          Forecast information unavailable.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">

          {forecast.slice(0, 5).map((item) => {
            const Icon = getWeatherIcon(item.condition);

            return (
              <div
                key={item.day}
                className="flex flex-col items-center rounded-xl bg-slate-50 p-4 text-center transition hover:bg-blue-50"
              >
                <p className="text-xs font-semibold text-slate-500">
                  {item.day}
                </p>

                <Icon
                  size={30}
                  className="my-4 text-blue-500"
                />

                <p className="font-bold">
                  {item.temp}{unitSymbol}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  {item.low}{unitSymbol} Low
                </p>

                <p className="mt-2 text-xs text-slate-400">
                  {item.condition}
                </p>
              </div>
            );
          })}

        </div>
      )}

      <p className="mt-5 text-center text-xs text-slate-400">
      </p>
    </section>
  );
}

export default Forecast;
