import { GeoLocation, WeatherData } from '../types';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const getWeatherData = async (location: GeoLocation): Promise<WeatherData> => {
  if (!API_KEY) {
    throw new Error('OpenWeather API key is not configured');
  }

  const url = `${BASE_URL}?lat=${location.latitude}&lon=${location.longitude}&appid=${API_KEY}&units=metric`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    
    const data = await response.json();
    
    return {
      temp: data.main.temp,
      humidity: data.main.humidity,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      main: data.weather[0].main,
      location: data.name
    };
  } catch (error) {
    throw new Error('Error fetching weather data: ' + (error as Error).message);
  }
}; 