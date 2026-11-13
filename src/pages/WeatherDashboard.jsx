
import Header from "../components/Header";
import CurrentWeather from "../components/CurrentWeather";
import WeatherHighlights from "../components/WeatherHighlights";
import Forecast from "../components/Forecast";
import FavouriteCities from "../components/FavouriteCities";

import { useEffect, useState } from "react";
import { getWeather } from "../services/weatherService";
import {
  getWeatherCondition,
  formatForecastDay,
} from "../utils/weatherUtils";
import WeatherDetails from "../components/WeatherDetails";

const STORAGE_KEY = "weatherboard-favourite-cities";

function WeatherDashboard() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  const [temperatureUnit, setTemperatureUnit] = useState("celsius");

  const [selectedCity, setSelectedCity] = useState({
    name: "Karachi",
    country: "Pakistan",
    latitude: 24.8608,
    longitude: 67.0104,
  });

  const [favourites, setFavourites] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Unable to load favourites:", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites));
  }, [favourites]);

  const handleAddFavourite = () => {
    if (!selectedCity || favourites.length >= 5) return;

    const alreadyExists = favourites.some(
      (city) =>
        city.latitude === selectedCity.latitude &&
        city.longitude === selectedCity.longitude
    );

    if (!alreadyExists) {
      setFavourites((previous) => [...previous, selectedCity]);
    }
  };

  const handleRemoveFavourite = (cityToRemove) => {
    setFavourites((previous) =>
      previous.filter(
        (city) =>
          city.latitude !== cityToRemove.latitude ||
          city.longitude !== cityToRemove.longitude
      )
    );
  };
  const handleRetry = () => {
  setRetryCount((previous) => previous + 1);
};


useEffect(() => {
  let isActive = true;

  async function fetchWeather() {
    try {
      setLoading(true);
      setError("");
      setWeather(null);

      const data = await getWeather(
        selectedCity.latitude,
        selectedCity.longitude
      );

      if (isActive) {
        setWeather(data);
      }
    } catch (err) {
      console.error(err);

      if (isActive) {
        setError("Unable to load weather. Please try again.");
      }
    } finally {
      if (isActive) {
        setLoading(false);
      }
    }
  }

  fetchWeather();

  return () => {
    isActive = false;
  };
}, [selectedCity, retryCount]);

  // Convert Celsius to Fahrenheit when required
  const convertTemperature = (value) => {
    if (value == null || value === "--") return "--";

    const temperature =
      temperatureUnit === "fahrenheit"
        ? (value * 9) / 5 + 32
        : value;

    return Math.round(temperature);
  };

  const current = weather?.current;
  const daily = weather?.daily;

  const currentTemp = current
    ? convertTemperature(current.temperature_2m)
    : "--";

  const humidity = current?.relative_humidity_2m ?? "--";
  const windSpeed = current?.wind_speed_10m ?? "--";

  const feelsLike = current
    ? convertTemperature(current.apparent_temperature)
    : "--";

  const uvIndex = daily?.uv_index_max?.[0] ?? "--";

  const condition = current
    ? getWeatherCondition(current.weather_code)
    : "Loading...";

  const forecast = daily
    ? daily.time.slice(1, 6).map((date, index) => ({
        day: formatForecastDay(date),
        condition: getWeatherCondition(
          daily.weather_code[index + 1]
        ),
        temp: convertTemperature(
          daily.temperature_2m_max[index + 1]
        ),
        low: convertTemperature(
          daily.temperature_2m_min[index + 1]
        ),
        uv: daily.uv_index_max[index + 1],
      }))
    : [];

  const todayHigh = convertTemperature(
    daily?.temperature_2m_max?.[0]
  );

  const todayLow = convertTemperature(
    daily?.temperature_2m_min?.[0]
  );
  const sunrise = daily?.sunrise?.[0] ?? "--";
const sunset = daily?.sunset?.[0] ?? "--";

const windDirection = current?.wind_direction_10m ?? "--";

const maxWindSpeed =
  daily?.wind_speed_10m_max?.[0] ?? "--";

  return (
    <main className="min-h-screen bg-[#F7F8FA] text-slate-900">
      <Header
        onCitySelect={setSelectedCity}
        temperatureUnit={temperatureUnit}
        onUnitChange={setTemperatureUnit}
      />

      <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 lg:px-10">

        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm text-slate-500">
              Your weather overview
            </p>

            <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
              Weather Dashboard
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              {selectedCity.name}, {selectedCity.country}
            </p>
          </div>

          <span className="rounded-full border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
            LIVE WEATHER
          </span>
        </div>

        {/* {loading && (
          <p className="mb-4 text-sm text-blue-600">
            Loading weather information...
          </p>
        )} */}


{error && (
  <div className="my-6 rounded-xl border border-red-200 bg-red-50 p-5 text-center">
    <p className="font-medium text-red-700">{error}</p>

    <button
      onClick={handleRetry}
      className="mt-3 rounded-lg bg-red-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
    >
      Try Again
    </button>
  </div>
)}

      
{loading ? (
  <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 animate-pulse">
    <section className="space-y-6 lg:col-span-2">
      {/* Current weather skeleton */}
      <div className="h-64 rounded-2xl bg-slate-200" />

      {/* Weather highlights skeleton */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-28 rounded-2xl bg-slate-200"
          />
        ))}
      </div>

      {/* Weather details skeleton */}
      <div className="h-40 rounded-2xl bg-slate-200" />

      {/* Forecast skeleton */}
      <div className="h-52 rounded-2xl bg-slate-200" />
    </section>

    {/* Favourite cities skeleton */}
    <aside>
      <div className="h-64 rounded-2xl bg-slate-200" />
    </aside>
  </div>
) : !error ? (
  <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
    <section className="space-y-6 lg:col-span-2">
      <CurrentWeather
        city={selectedCity}
        temperature={currentTemp}
        condition={condition}
        loading={loading}
        high={todayHigh}
        low={todayLow}
        temperatureUnit={temperatureUnit}
        weatherCode={current?.weather_code}
        isDay={current?.is_day}
      />

      <WeatherHighlights
        humidity={humidity}
        windSpeed={windSpeed}
        feelsLike={feelsLike}
        uvIndex={uvIndex}
        loading={loading}
        temperatureUnit={temperatureUnit}
      />

      <WeatherDetails
        sunrise={sunrise}
        sunset={sunset}
        windDirection={windDirection}
        maxWindSpeed={maxWindSpeed}
        loading={loading}
      />

      <Forecast
        forecast={forecast}
        loading={loading}
        temperatureUnit={temperatureUnit}
      />
    </section>

    <aside>
      <FavouriteCities
        favourites={favourites}
        selectedCity={selectedCity}
        onAddFavourite={handleAddFavourite}
        onCitySelect={setSelectedCity}
        onRemoveFavourite={handleRemoveFavourite}
      />
    </aside>
  </div>
) : null}

      </div>

      <footer className="mx-auto max-w-[1400px] px-4 py-6 text-center text-xs text-slate-400 sm:px-6 lg:px-10">
        WeatherBoard © 2026 · Powered by Ahsanbaig
      </footer>
    </main>
  );
}

export default WeatherDashboard;
