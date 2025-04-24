export type MoodType = 'happy' | 'excited' | 'calm' | 'sad' | 'angry';

export interface WeatherData {
  temp: number;
  humidity: number;
  description: string;
  icon: string;
  main: string;
  location: string;
}

export interface GeoLocation {
  latitude: number;
  longitude: number;
  city?: string;
}

export interface MoodEntry {
  id: string;
  date: string;
  mood: MoodType;
  notes: string;
  weather: WeatherData;
}
