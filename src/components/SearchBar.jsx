
import { useEffect, useId, useState } from "react";
import {
  Search,
  MapPin,
  Loader2,
  X,
} from "lucide-react";

import { searchCities } from "../services/geocodingService";

function SearchBar({ onCitySelect }) {
  const [query, setQuery] = useState("");
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const listboxId = useId();

  useEffect(() => {
    if (query.trim().length < 2) {
      setCities([]);
      setError("");
      setLoading(false);
      setActiveIndex(-1);
      return;
    }

    let active = true;

    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        setError("");

        const results = await searchCities(query);

        if (active) {
          setCities(results);
          setActiveIndex(-1);
          setIsOpen(true);
        }
      } catch (err) {
        if (active) {
          setError("Unable to search cities.");
          setCities([]);
        }
      } finally {
        if (active) setLoading(false);
      }
    }, 300);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [query]);

  const handleSelectCity = (city) => {
    onCitySelect({
      name: city.name,
      country: city.country,
      latitude: city.latitude,
      longitude: city.longitude,
    });

    setQuery("");
    setCities([]);
    setActiveIndex(-1);
    setIsOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIsOpen(true);

      if (cities.length > 0) {
        setActiveIndex((previous) =>
          previous < cities.length - 1 ? previous + 1 : 0
        );
      }
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();

      if (cities.length > 0) {
        setActiveIndex((previous) =>
          previous > 0 ? previous - 1 : cities.length - 1
        );
      }
    }

    if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      handleSelectCity(cities[activeIndex]);
    }

    if (e.key === "Escape") {
      setIsOpen(false);
      setActiveIndex(-1);
    }
  };

  const clearSearch = () => {
    setQuery("");
    setCities([]);
    setError("");
    setActiveIndex(-1);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      <Search
        size={19}
        aria-hidden="true"
        className="absolute left-4 top-4 z-10 text-slate-400"
      />

      <input
        type="text"
        value={query}
        placeholder="Search for a city..."
        aria-label="Search for a city"
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={isOpen && query.trim().length >= 2}
        aria-controls={listboxId}
        aria-activedescendant={
          activeIndex >= 0
            ? `${listboxId}-${activeIndex}`
            : undefined
        }
        onChange={(e) => {
          setQuery(e.target.value);
          setActiveIndex(-1);
          setIsOpen(true);
        }}
        onFocus={() => {
          if (query.trim().length >= 2) setIsOpen(true);
        }}
        onKeyDown={handleKeyDown}
        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-12 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
      />

      {loading ? (
        <Loader2
          size={18}
          aria-label="Searching cities"
          className="absolute right-4 top-4 animate-spin text-blue-500"
        />
      ) : query ? (
        <button
          type="button"
          aria-label="Clear city search"
          onClick={clearSearch}
          className="absolute right-4 top-3 flex h-6 w-6 items-center justify-center rounded text-slate-400 hover:bg-slate-200 focus-visible:outline-2 focus-visible:outline-blue-600"
        >
          <X size={18} />
        </button>
      ) : null}

      {isOpen && query.trim().length >= 2 && (
        <div
          id={listboxId}
          role="listbox"
          aria-label="City search suggestions"
          className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg"
        >
          {error && (
            <p role="alert" className="p-4 text-sm text-red-500">
              {error}
            </p>
          )}

          {!loading && !error && cities.length === 0 && (
            <p className="p-4 text-sm text-slate-500">
              No cities found.
            </p>
          )}

          {cities.map((city, index) => (
            <button
              key={`${city.id}-${city.latitude}-${city.longitude}`}
              id={`${listboxId}-${index}`}
              type="button"
              role="option"
              aria-selected={activeIndex === index}
              onClick={() => handleSelectCity(city)}
              onMouseEnter={() => setActiveIndex(index)}
              className={`flex w-full items-center gap-3 border-b border-slate-100 p-4 text-left transition ${
                activeIndex === index
                  ? "bg-blue-50"
                  : "hover:bg-blue-50"
              }`}
            >
              <MapPin
                size={18}
                aria-hidden="true"
                className="text-blue-500"
              />

              <div>
                <p className="text-sm font-semibold text-slate-800">
                  {city.name}
                </p>

                <p className="text-xs text-slate-400">
                  {[city.admin1, city.country]
                    .filter(Boolean)
                    .join(", ")}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
