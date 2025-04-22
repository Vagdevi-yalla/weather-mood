export type MoodType = 1 | 2 | 3 | 4 | 5;

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
