
import { CloudSun, Settings } from "lucide-react";
import SearchBar from "./SearchBar";

function Header({
  onCitySelect,
  temperatureUnit,
  onUnitChange,
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-10">

        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
            <CloudSun size={24} />
          </div>

          <div>
            <h2 className="text-lg font-bold tracking-tight">
              WeatherBoard
            </h2>
            <p className="text-[10px] text-slate-400">
              WEATHER INTELLIGENCE
            </p>
          </div>
        </div>

        <div className="order-3 w-full md:order-2 md:w-auto md:flex-1 md:max-w-md">
          <SearchBar onCitySelect={onCitySelect} />
        </div>

        <div className="order-2 flex items-center gap-2 md:order-3">
          <button
            onClick={() => onUnitChange("celsius")}
            aria-pressed={temperatureUnit === "celsius"}
            className={`min-h-11 rounded-lg px-3 text-sm font-semibold transition ${
              temperatureUnit === "celsius"
                ? "bg-blue-50 text-blue-700"
                : "text-slate-500 hover:bg-slate-100"
            }`}
          >
            °C
          </button>

          <button
            onClick={() => onUnitChange("fahrenheit")}
            aria-pressed={temperatureUnit === "fahrenheit"}
            className={`min-h-11 rounded-lg px-3 text-sm font-semibold transition ${
              temperatureUnit === "fahrenheit"
                ? "bg-blue-50 text-blue-700"
                : "text-slate-500 hover:bg-slate-100"
            }`}
          >
            °F
          </button>

          <button
            aria-label="Settings"
            className="flex h-11 w-11 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100"
          >
            <Settings size={20} />
          </button>
        </div>

      </div>
    </header>
  );
}

export default Header;
