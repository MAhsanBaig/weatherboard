
const GEOCODING_API =
  "https://geocoding-api.open-meteo.com/v1/search";

export async function searchCities(query) {
  if (!query || query.trim().length < 2) {
    return [];
  }

  const params = new URLSearchParams({
    name: query.trim(),
    count: "8",
    language: "en",
    format: "json",
  });

  const response = await fetch(
    `${GEOCODING_API}?${params}`
  );

  if (!response.ok) {
    throw new Error("City search failed.");
  }

  const data = await response.json();

  return data.results || [];
}
