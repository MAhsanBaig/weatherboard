# WeatherBoard — AI Prompt History

## Development Environment

- **Primary IDE:** Visual Studio Code
- **AI Development Agent:** OpenCode
- **Frontend Framework:** React
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Language:** JavaScript

## Important Note

This document is a reconstructed summary of the development prompts and instructions used during the WeatherBoard project.

The exact original OpenCode conversation export was not available when this document was prepared. Therefore, the prompts below represent the development tasks and instructions reconstructed from the project workflow. They are not claimed to be verbatim copies of the original prompts.

## Prompt 1 — Project Scaffolding

"Help me create a React weather dashboard using Vite. Set up a clean project structure and configure the required dependencies. Keep the architecture simple and maintainable."

**Development objective:** Establish the React application and development environment.

## Prompt 2 — Dashboard UI

"Build a modern weather dashboard interface with a current weather section, temperature display, weather condition, additional weather details, and a forecast section. Make the design clean and suitable for a consumer-facing application."

**Development objective:** Create the initial dashboard layout.

## Prompt 3 — Component Architecture

"Break the weather dashboard into reusable React components. Keep the components organized and make sure data can be passed from the parent dashboard component through props."

**Development objective:** Improve component separation and maintainability.

## Prompt 4 — Styling and Responsiveness

"Use Tailwind CSS to style the weather dashboard. Make the layout responsive for mobile, tablet, and desktop screens. Avoid horizontal scrolling and maintain readable spacing and typography."

**Development objective:** Implement responsive layouts and consistent styling.

## Prompt 5 — Weather API Integration

"Integrate the Open-Meteo forecast API to retrieve real current weather conditions and a five-day forecast. Create a separate weather service module and handle asynchronous API requests."

**Development objective:** Replace static weather information with real API data.

## Prompt 6 — City Search and Geocoding

"Integrate the Open-Meteo Geocoding API to search for cities and retrieve their latitude and longitude. Use the selected city's coordinates to request weather information."

**Development objective:** Allow users to search for different cities.

## Prompt 7 — Weather Conditions and Icons

"Create reusable utility functions to map Open-Meteo weather codes to readable weather conditions. Display appropriate weather icons based on the returned weather information and whether it is day or night."

**Development objective:** Make weather information easier to understand visually.

## Prompt 8 — Loading and Error States

"Improve the API experience by adding loading indicators, error messages, and retry functionality. Make sure users receive useful feedback when weather requests fail."

**Development objective:** Improve reliability and user experience.

## Prompt 9 — Favourite Cities

"Add a favourite cities feature. Allow users to save and access frequently viewed cities, limit favourites to five, and persist them using localStorage."

**Development objective:** Add persistent user preferences.

## Prompt 10 — Search Interaction and Accessibility

"Improve the city search component with autocomplete interaction, keyboard navigation, selection handling, and accessible labels. Include feedback for empty results and API errors."

**Development objective:** Improve search usability and accessibility.

## Prompt 11 — Final UI Refinement

"Review the dashboard components and improve spacing, responsiveness, visual consistency, and the overall user experience. Avoid unnecessary complexity and keep the existing API integration working."

**Development objective:** Polish the interface before deployment.

## Prompt 12 — Production Preparation

"Prepare the React application for production. Check the project configuration, run the production build, identify build errors, and prepare the project for GitHub and Vercel deployment."

**Development objective:** Prepare the application for public release.

## AI-Assisted Development Approach

AI assistance was used for scaffolding, component development, API integration guidance, styling, debugging, and code improvements.

Development decisions and verification remained the developer's responsibility. Generated code was reviewed and adjusted when necessary to fit the existing application structure and requirements.

## Remaining Assignment Work

The following requirements need implementation or verification before the project can be considered fully compliant:

- GeoDB Cities API integration.
- Client-side validation on blur.
- Confirmation before removing favourites.
- PWA manifest and application icons.
- Service worker and offline caching.
- Offline access to the last-viewed city's weather.
- User-configurable daily reminder notifications.
- Verification of notification behaviour when the tab is closed.
- Public deployment and final README live URL.
