# Mood Tracker

A modern mood tracking application that helps users record their daily moods along with weather information and notes.

## Features

-  Real-time weather integration
-  Daily mood tracking
-  Mood history visualization
-  Dynamic UI based on mood and weather
-  Responsive design

## Tech Stack

- **Frontend Framework**: React with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn-ui
- **Weather API**: OpenWeatherMap
- **State Management**: React Hooks
- **Storage**: Local Storage

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Vagdevi-yalla//mood-app.git
cd mood-app
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your OpenWeather API key:
```
VITE_OPENWEATHER_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `https://weather-mood-git-master-vagdeviyallas-projects.vercel.app/`

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── services/      # API and service integrations
├── types/         # TypeScript type definitions
├── utils/         # Utility functions
└── App.tsx        # Main application component
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## Acknowledgments

- OpenWeatherMap for weather data
- Tailwind CSS for styling
