import axios from 'axios';
import { GeoLocation, WeatherData } from '../types';

const API_KEY = '85b8917db6433de09908b452b192d928';
const BASE_URL = 'https://api.openweathermap.org';

// Function to get the user's current location
export const getUserLocation = (): Promise<GeoLocation> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        let errorMessage = 'Failed to get location';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location permission denied. Please enable location services to get weather data.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information unavailable. Please try again.';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out. Please check your connection and try again.';
            break;
        }
        reject(new Error(errorMessage));
      }
    );
  });
};

// Function to get the city name from coordinates
export const getCityName = async (
  latitude: number,
  longitude: number
): Promise<string> => {
  try {
    const response = await axios.get(
      `${BASE_URL}/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`
    );
    
    if (response.data && response.data.length > 0) {
      return response.data[0].name;
    }
    return 'Unknown Location';
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Geocoding Error: ${error.response?.data?.message || error.message}`);
    }
    throw error;
  }
};

// Function to fetch weather data from OpenWeatherMap API
export const fetchWeatherData = async (
  latitude: number,
  longitude: number
): Promise<WeatherData> => {
  try {
    const response = await axios.get(
      `${BASE_URL}/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
    );

    if (response.data) {
      return {
        temp: response.data.main.temp,
        humidity: response.data.main.humidity,
        description: response.data.weather[0].description,
        icon: response.data.weather[0].icon,
        main: response.data.weather[0].main,
        location: response.data.name
      };
    }

    throw new Error('No weather data available');
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Weather API Error: ${error.response?.data?.message || error.message}`);
    }
    throw error;
  }
};
