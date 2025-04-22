import { WeatherData } from '../types';

const API_KEY = '85b8917db6433de09908b452b192d928';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const weatherService = {
  getCurrentWeather: async (lat: number, lon: number): Promise<WeatherData> => {
    try {
      const response = await fetch(
        `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      
      if (!response.ok) {
        throw new Error('Weather data fetch failed');
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
      console.error('Error fetching weather:', error);
      throw error;
    }
  }
}; 