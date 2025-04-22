import React from 'react';
import { WeatherData } from '../types';
import { Cloud, CloudRain, CloudSnow, CloudSun, Sun, RefreshCw, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WeatherDisplayProps {
  weather: WeatherData | null;
  isLoading?: boolean;
}

export const WeatherDisplay = ({ weather, isLoading = false }: WeatherDisplayProps) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="h-12 bg-gray-200 rounded w-1/2"></div>
      </div>
    );
  }

  if (!weather) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <p className="text-gray-500">Weather data not available</p>
      </div>
    );
  }

  // Get weather icon based on the condition
  const getWeatherIcon = () => {
    const iconMap = {
      Clear: <Sun className="w-8 h-8 text-yellow-400" />,
      Clouds: <Cloud className="w-8 h-8 text-gray-400" />,
      Rain: <CloudRain className="w-8 h-8 text-blue-400" />,
      Snow: <CloudSnow className="w-8 h-8 text-blue-200" />,
      default: <CloudSun className="w-8 h-8 text-gray-400" />,
    };

    return iconMap[weather.main as keyof typeof iconMap] || iconMap.default;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-700">Current Weather</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {Math.round(weather.temp)}°C
          </p>
          <p className="text-gray-500 capitalize">{weather.description}</p>
        </div>
        <div className="text-6xl">
          {getWeatherEmoji(weather.main)}
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-100">
        <p className="text-sm text-gray-500">
          Humidity: {weather.humidity}%
        </p>
      </div>
    </div>
  );
};

const getWeatherEmoji = (weatherMain: string): string => {
  switch (weatherMain.toLowerCase()) {
    case 'clear':
      return '☀️';
    case 'clouds':
      return '☁️';
    case 'rain':
      return '🌧️';
    case 'snow':
      return '❄️';
    case 'thunderstorm':
      return '⛈️';
    case 'drizzle':
      return '🌦️';
    case 'mist':
    case 'fog':
      return '🌫️';
    default:
      return '🌈';
  }
};

export default WeatherDisplay;
