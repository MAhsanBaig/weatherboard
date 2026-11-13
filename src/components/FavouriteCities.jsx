
import { Heart, Plus, MapPin, X } from "lucide-react";

function FavouriteCities({
  favourites = [],
  selectedCity,
  onAddFavourite,
  onCitySelect,
  onRemoveFavourite,
}) {
  const isAlreadySaved = favourites.some(
    (city) =>
      city.latitude === selectedCity?.latitude &&
      city.longitude === selectedCity?.longitude
  );

  const isLimitReached = favourites.length >= 5;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold">Favourite Cities</h2>
          <p className="mt-1 text-xs text-slate-400">
            Your saved locations ({favourites.length}/5)
          </p>
        </div>

        <div className="rounded-xl bg-rose-50 p-2">
          <Heart size={20} className="text-rose-500" />
        </div>
      </div>

      {favourites.length === 0 ? (
        <div className="mt-8 flex flex-col items-center py-8 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
            <MapPin size={28} className="text-slate-400" />
          </div>

          <h3 className="mt-5 font-semibold">
            No favourite cities yet
          </h3>

          <p className="mt-2 max-w-56 text-sm leading-6 text-slate-400">
            Save your favourite cities to quickly check their weather anytime.
          </p>

          <button
            onClick={onAddFavourite}
            disabled={!selectedCity || isLimitReached}
            className="mt-6 flex min-h-11 items-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Plus size={17} />
            Add current city
          </button>

          <p className="mt-3 text-xs text-slate-400">
            Up to 5 favourite cities
          </p>
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {favourites.map((city) => (
            <div
              key={`${city.latitude}-${city.longitude}`}
              className="flex items-center justify-between rounded-xl border border-slate-100 p-3 transition hover:bg-slate-50"
            >
              <button
                onClick={() => onCitySelect(city)}
                className="flex flex-1 items-center gap-3 text-left"
              >
                <div className="rounded-lg bg-blue-50 p-2">
                  <MapPin size={18} className="text-blue-600" />
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-slate-800">
                    {city.name}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {city.country}
                  </p>
                </div>
              </button>

              <button
                onClick={() => onRemoveFavourite(city)}
                aria-label={`Remove ${city.name} from favourites`}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-rose-50 hover:text-rose-500"
              >
                <X size={17} />
              </button>
            </div>
          ))}

          <button
            onClick={onAddFavourite}
            disabled={!selectedCity || isAlreadySaved || isLimitReached}
            className="mt-3 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-dashed border-blue-300 text-sm font-semibold text-blue-600 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Plus size={17} />
            {isAlreadySaved
              ? "Current city already saved"
              : isLimitReached
                ? "Maximum favourites reached"
                : "Add current city"}
          </button>
        </div>
      )}
    </section>
  );
}

export default FavouriteCities;
