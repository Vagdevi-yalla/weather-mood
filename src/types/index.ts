export type MoodType = 'happy' | 'sad' | 'angry' | 'calm' | 'anxious';

export interface MoodOption {
  type: MoodType;
  label: string;
  emoji: string;
}

export interface WeatherData {
  temp: number;
  description: string;
  icon: string;
  humidity: number;
  location: string;
  main: string;
}

export interface GeoLocation {
  latitude: number;
  longitude: number;
}

export interface MoodEntry {
  id: string;
  date: string;
  mood: MoodType;
  note: string;
  weather: {
    temp: number;
    description: string;
    icon: string;
  };
} 