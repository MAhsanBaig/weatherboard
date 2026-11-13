
import { MapPin, CalendarDays } from "lucide-react";
import { getWeatherIcon } from "../utils/weatherUtils";
function CurrentWeather({
  city,
  temperature,
  condition,
  loading,
  high,
  low,
  temperatureUnit,
  weatherCode,
isDay,
}) {
  const unitSymbol = temperatureUnit === "fahrenheit" ? "°F" : "°C";
const WeatherIcon = getWeatherIcon(weatherCode, isDay);
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <MapPin size={16} />
            Current location
          </div>

          <h2 className="mt-2 text-2xl font-bold">
            {city.name}, {city.country}
          </h2>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-400">
          <CalendarDays size={16} />
          Today's overview
        </div>
      </div>

      <div className="mt-10 flex flex-col justify-between gap-8 sm:flex-row sm:items-center">

        <div>
          <p className="text-sm font-medium text-slate-500">
            {loading ? "Loading..." : condition}
          </p>

          <div className="mt-2 flex items-start">
            <span className="text-7xl font-bold tracking-tighter sm:text-8xl">
              {loading ? "--" : temperature}
            </span>

            <span className="mt-3 text-3xl font-medium text-slate-400">
              {unitSymbol}
            </span>
          </div>

          <p className="mt-3 text-sm text-slate-500">
            H: {high != null ? `${high}${unitSymbol}` : "--"}
            <span className="mx-2">|</span>
            L: {low != null ? `${low}${unitSymbol}` : "--"}
          </p>
        </div>

        <div className="flex flex-col items-center justify-center rounded-2xl bg-blue-50 p-8 sm:min-w-48">
         <WeatherIcon
  size={100}
  strokeWidth={1.3}
  className="text-blue-500"
/>

          <p className="mt-3 text-sm font-semibold text-blue-700">
            {loading ? "Loading..." : condition}
          </p>
        </div>

      </div>

      <div className="mt-8 border-t border-slate-100 pt-4 text-xs text-slate-400">
      </div>
    </section>
  );
}

export default CurrentWeather;
