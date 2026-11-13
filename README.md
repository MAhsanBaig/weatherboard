# WeatherBoard 🌤️

WeatherBoard is a responsive weather dashboard built with React and Vite. It allows users to search for cities, view current weather conditions, explore a 5-day forecast, and save favourite cities.

## Project Links

- **Live Demo:** Not deployed yet
- **GitHub Repository:** https://github.com/MAhsanBaig/weatherboard

## Features

- City search with autocomplete suggestions.
- Current weather information using real API data.
- Temperature, feels-like temperature, humidity, and wind speed.
- 5-day weather forecast.
- Weather condition icons based on weather codes.
- Favourite cities saved in browser localStorage.
- Celsius and Fahrenheit temperature display.
- Loading and error handling.
- Responsive interface for desktop, tablet, and mobile.

## Technology Stack

- React
- Vite
- JavaScript
- Tailwind CSS
- Lucide React
- Open-Meteo Weather API
- Open-Meteo Geocoding API
- Browser localStorage

## APIs

### Open-Meteo Weather API

Used to retrieve current weather conditions and daily forecasts.

https://open-meteo.com/

### Open-Meteo Geocoding API

Used to search for cities and retrieve geographical coordinates.

https://open-meteo.com/en/docs/geocoding-api

## Getting Started

### Prerequisites

- Node.js
- npm
- Git

### Installation

Clone the repository:

```bash
git clone https://github.com/MAhsanBaig/weatherboard.git
cd weatherboard
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL displayed in your terminal.

### Production Build

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Project Structure

```text
src/
├── components/
├── services/
├── utils/
├── App.jsx
└── main.jsx
```

- `components/` contains reusable dashboard UI components.
- `services/` contains API integration and data-fetching logic.
- `utils/` contains reusable weather formatting and helper functions.

## Architecture Decisions

- React components are separated by responsibility to improve maintainability.
- Weather API calls are kept in service modules rather than mixed into presentation components.
- Open-Meteo was selected because it provides free weather and geocoding APIs without requiring an API key.
- localStorage is used to persist favourite cities across browser sessions.
- Responsive layouts support different screen sizes.

## Known Limitations

- The current city search uses Open-Meteo Geocoding rather than the GeoDB Cities API specified in the assignment.
- A public deployment URL has not yet been added.
- PWA installation, service-worker caching, offline weather access, and scheduled notifications must be completed and verified before they can be considered supported.
- Browser notification functionality depends on browser support and user permission.

## Future Improvements

- Complete PWA installation and offline functionality.
- Add daily weather reminder notifications.
- Improve autocomplete and form validation.
- Add further accessibility and performance improvements.

## Author

**Muhammad Ahsan Baig**

GitHub: https://github.com/MAhsanBaig
