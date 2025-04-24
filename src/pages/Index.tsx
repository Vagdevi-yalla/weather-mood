import React, { useState, useEffect, useCallback } from 'react';
import MoodEntry from '../components/MoodEntry';
import WeatherDisplay from '../components/WeatherDisplay';
import Calendar from '../components/Calendar';
import EntryDetails from '../components/EntryDetails';
import MoodStats from '../components/MoodStats';
import { MoodEntry as MoodEntryType, WeatherData, GeoLocation } from '../types';
import { getMoodEntries, getEntriesByDate } from '../utils/storage';
import { getUserLocation, fetchWeatherData, getCityName } from '../utils/weatherAPI';
import { formatDateISO } from '../utils/dateUtils';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [entries, setEntries] = useState<MoodEntryType[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<MoodEntryType | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState<GeoLocation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Load entries from localStorage
  const loadEntries = () => {
    const allEntries = getMoodEntries();
    setEntries(allEntries);
  };

  // Fetch weather data
  const fetchWeatherInfo = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Get user location
      const userLocation = await getUserLocation();
      
      // Get city name
      const city = await getCityName(userLocation.latitude, userLocation.longitude);
      setLocation({ ...userLocation, city });
      
      // Get weather data
      const weatherData = await fetchWeatherData(userLocation.latitude, userLocation.longitude);
      setWeather(weatherData);

      toast({
        title: "Weather Updated",
        description: `Current weather data loaded for ${city}`,
      });
    } catch (err) {
      console.error('Error fetching weather data:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unable to fetch weather data';
      setError(errorMessage);
      toast({
        title: "Weather Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  // Load weather data on component mount
  useEffect(() => {
    fetchWeatherInfo();
    loadEntries();
  }, [fetchWeatherInfo]);

  // Handle entry selection from calendar
  const handleSelectDate = (date: string) => {
    const entriesForDate = getEntriesByDate(date);
    if (entriesForDate.length > 0) {
      setSelectedEntry(entriesForDate[0]);
    } else {
      setSelectedEntry(null);
    }
  };

  // Handle entry saved
  const handleEntrySaved = () => {
    loadEntries();
  };

  // Handle closing entry details
  const handleCloseEntryDetails = () => {
    setSelectedEntry(null);
  };

  // Handle deleting an entry
  const handleDeleteEntry = () => {
    setSelectedEntry(null);
    loadEntries();
  };

  return (
    <div className="min-h-screen bg-bg-light">
      <header className="bg-purple-light text-white py-4 shadow-sm">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold">Mood Tracker</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main column - Mood Entry and Weather */}
          <div className="md:col-span-2 space-y-6">
            {/* Weather Display */}
            <div className="w-full max-w-2xl mx-auto">
              <WeatherDisplay 
                weather={weather} 
                isLoading={loading}
              />
            </div>
            
            {/* Mood Entry Form or Selected Entry Details */}
            {selectedEntry ? (
              <EntryDetails 
                entry={selectedEntry} 
                onClose={handleCloseEntryDetails}
                onDelete={handleDeleteEntry}
              />
            ) : (
              <MoodEntry 
                weather={weather} 
                onEntrySaved={handleEntrySaved} 
              />
            )}
          </div>
          
          {/* Sidebar - Calendar and Stats */}
          <div className="space-y-6">
            <Calendar 
              entries={entries} 
              onSelectDate={handleSelectDate} 
            />
            
            <MoodStats entries={entries} />
          </div>
        </div>
      </main>
      
      <footer className="bg-white py-4 border-t">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Mood Tracker App</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
