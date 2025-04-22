import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { WeatherDisplay } from '../components/WeatherDisplay';
import { MoodSelector } from '../components/MoodSelector';
import { NoteInput } from '../components/NoteInput';
import { WeatherData, MoodType } from '../types';
import { weatherService } from '../services/weatherService';
import { geolocationService } from '../services/geolocationService';
import { moodService } from '../services/moodService';
import { getMoodColors, getTemperatureBackground } from '../utils/theme';

export const Dashboard = () => {
  const navigate = useNavigate();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [note, setNote] = useState('');
  const [quote, setQuote] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const moodColors = getMoodColors(selectedMood);
  const temperatureBackground = weather ? getTemperatureBackground(weather.temp) : '';

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const position = await geolocationService.getCurrentLocation();
        const weatherData = await weatherService.getCurrentWeather(position.latitude, position.longitude);
        setWeather(weatherData);
        
        // Fetch a random weather quote
        const quotes = [
          "Every cloud has a silver lining.",
          "After the storm comes the calm.",
          "Red sky at night, sailor's delight.",
          "Whatever the weather, we'll weather it together.",
          "Sunshine is delicious, rain is refreshing, wind braces us up, snow is exhilarating."
        ];
        setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSaveMood = async () => {
    if (!selectedMood || !weather) return;
    setShowConfirmation(true);
  };

  const handleConfirmSave = async () => {
    try {
      await moodService.addEntry({
        date: new Date().toISOString(),
        mood: selectedMood,
        notes: note,
        weather: {
          temp: weather.temp,
          description: weather.description,
          icon: weather.icon,
          humidity: weather.humidity,
          main: weather.main,
          location: weather.location
        }
      });
      
      // Reset form
      setSelectedMood(null);
      setNote('');
      setShowConfirmation(false);
      
      // Redirect to notes page
      navigate('/notes');
    } catch (err) {
      setError('Failed to save mood entry');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div 
      className={`min-h-screen p-6 transition-colors duration-300 ease-in-out ${moodColors.background}`}
      style={{
        backgroundImage: temperatureBackground ? `url(${temperatureBackground})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Welcome Section */}
        <div className={`p-6 rounded-lg shadow-lg ${moodColors.accent} backdrop-blur-md bg-opacity-90`}>
          <h1 className={`text-3xl font-bold mb-4 ${moodColors.text}`}>
            Welcome to Your Daily Mood Tracker
          </h1>
          <p className={`text-lg ${moodColors.text}`}>
            Take a moment to reflect on your day and record how you're feeling.
          </p>
        </div>

        {/* Weather Card */}
        {weather && (
          <div className={`p-6 rounded-lg shadow-lg ${moodColors.accent} backdrop-blur-md bg-opacity-90`}>
            <h2 className={`text-2xl font-semibold mb-4 ${moodColors.text}`}>Current Weather</h2>
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div>
                <p className={`text-xl font-medium mb-2 ${moodColors.text}`}>{weather.location}</p>
                <p className={`text-4xl font-bold ${moodColors.text}`}>{Math.round(weather.temp)}°C</p>
                <p className={`text-lg capitalize ${moodColors.text}`}>{weather.description}</p>
                <p className={`${moodColors.text}`}>Humidity: {weather.humidity}%</p>
              </div>
              <img 
                src={`https://openweathermap.org/img/wn/${weather.icon}@4x.png`}
                alt={weather.description}
                className="w-32 h-32"
              />
            </div>
          </div>
        )}

        {/* Mood Selection */}
        <div className={`p-6 rounded-lg shadow-lg ${moodColors.accent} backdrop-blur-md bg-opacity-90`}>
          <h2 className={`text-2xl font-semibold mb-4 ${moodColors.text}`}>How are you feeling?</h2>
          <MoodSelector 
            selectedMood={selectedMood} 
            onSelect={setSelectedMood}
          />
          <div className="mt-6">
            <NoteInput 
              value={note} 
              onChange={setNote}
            />
          </div>
          <button
            onClick={handleSaveMood}
            disabled={!selectedMood}
            className={`
              mt-4 px-6 py-2 rounded-lg font-medium
              transition-colors duration-200
              ${selectedMood ? moodColors.button : 'bg-gray-300 cursor-not-allowed'}
              ${selectedMood ? 'hover:opacity-90' : ''}
            `}
          >
            Save Entry
          </button>
        </div>

        {/* Quote Card */}
        <div className={`p-6 rounded-lg shadow-lg ${moodColors.accent} backdrop-blur-md bg-opacity-90`}>
          <blockquote className={`text-lg italic ${moodColors.text}`}>
            "{quote}"
          </blockquote>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Save Entry</h3>
            <p className="text-gray-600 mb-6">
              Do you want to save this mood entry? Your notes will be saved and you'll be redirected to the notes page.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowConfirmation(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSave}
                className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
              >
                Save & Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 