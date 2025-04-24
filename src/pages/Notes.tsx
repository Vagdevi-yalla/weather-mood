import { useState, useEffect } from 'react';
import { moodService } from '../services/moodService';
import { MoodEntry, MoodType } from '../types';

const Notes = () => {
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = () => {
    const allEntries = moodService.getAllEntries();
    // Sort entries by date, most recent first
    const sortedEntries = allEntries.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    setEntries(sortedEntries);
  };

  const handleDelete = (id: string) => {
    moodService.deleteEntry(id);
    fetchEntries();
    setShowDeleteConfirm(null);
  };

  const getMoodEmoji = (mood: MoodType): string => {
    switch (mood) {
      case 'happy':   return '😊';
      case 'excited': return '⚡';
      case 'calm':    return '☁';
      case 'sad':     return '😢';
      case 'angry':   return '😠';
      default:        return '❓';
    }
  };

  const getMoodLabel = (mood: MoodType): string => {
    switch (mood) {
      case 'happy':   return 'Happy';
      case 'excited': return 'Energetic';
      case 'calm':    return 'Calm';
      case 'sad':     return 'Sad';
      case 'angry':   return 'Angry';
      default:        return 'Unknown';
    }
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (entries.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Notes</h1>
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-500">No mood entries yet. Start tracking your mood from the Dashboard!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Notes</h1>
      <div className="space-y-6">
        {entries.map((entry) => (
          <div 
            key={entry.id} 
            className="bg-white rounded-lg shadow p-6 transition-all duration-200 hover:shadow-md"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-lg font-medium text-gray-900">
                    {formatDate(entry.date)}
                  </p>
                  <button
                    onClick={() => setShowDeleteConfirm(entry.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    ×
                  </button>
                </div>
                <div className="flex items-center mt-3 space-x-4">
                  <div className="flex items-center">
                    <span className="text-3xl mr-2">{getMoodEmoji(entry.mood)}</span>
                    <span className="text-sm text-gray-600">{getMoodLabel(entry.mood)}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-2xl mr-2">{getWeatherEmoji(entry.weather.main)}</span>
                    <span className="text-sm text-gray-600">
                      {entry.weather.description}, {Math.round(entry.weather.temp)}°C
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {entry.notes && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-gray-600 whitespace-pre-wrap">{entry.notes}</p>
              </div>
            )}

            {/* Delete Confirmation Dialog */}
            {showDeleteConfirm === entry.id && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
                  <h3 className="text-lg font-semibold mb-4">Delete Entry</h3>
                  <p className="text-gray-600 mb-6">Are you sure you want to delete this entry?</p>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => setShowDeleteConfirm(null)}
                      className="flex-1 py-2 border rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleDelete(entry.id)}
                      className="flex-1 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const getWeatherEmoji = (main: string): string => {
  switch (main.toLowerCase()) {
    case 'clear': return '☀️';
    case 'clouds': return '☁️';
    case 'rain': return '🌧️';
    case 'snow': return '❄️';
    case 'thunderstorm': return '⛈️';
    case 'drizzle': return '🌦️';
    case 'mist':
    case 'fog': return '🌫️';
    default: return '🌈';
  }
};

export default Notes; 