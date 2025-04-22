import { useState, useEffect } from 'react';
import { moodService } from '../services/moodService';
import { MoodEntry } from '../types';

const Calendar = () => {
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEntry, setSelectedEntry] = useState<MoodEntry | null>(null);

  useEffect(() => {
    const fetchEntries = () => {
      const allEntries = moodService.getAllEntries();
      setEntries(allEntries);
    };

    fetchEntries();
  }, []);

  const getMoodEmoji = (mood: number): string => {
    switch (mood) {
      case 1: return '😊';
      case 2: return '⚡';
      case 3: return '☁';
      case 4: return '😢';
      case 5: return '😠';
      default: return '❓';
    }
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

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (Date | null)[] = [];

    // Add empty slots for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const getEntryForDate = (date: Date | null): MoodEntry | undefined => {
    if (!date) return undefined;
    
    return entries.find(entry => {
      const entryDate = new Date(entry.date);
      return (
        entryDate.getDate() === date.getDate() &&
        entryDate.getMonth() === date.getMonth() &&
        entryDate.getFullYear() === date.getFullYear()
      );
    });
  };

  const formatMonthYear = (date: Date): string => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const changeMonth = (increment: number) => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + increment);
      return newDate;
    });
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Mood Calendar</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => changeMonth(-1)}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            Previous
          </button>
          <h2 className="text-xl font-semibold text-gray-700">
            {formatMonthYear(currentDate)}
          </h2>
          <button
            onClick={() => changeMonth(1)}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            Next
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        {/* Day headers */}
        <div className="grid grid-cols-7 gap-4 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-4">
          {days.map((date, index) => {
            const entry = getEntryForDate(date);
            const isToday = date?.toDateString() === new Date().toDateString();

            return (
              <div
                key={index}
                className={`
                  aspect-square p-2 rounded-lg
                  ${date ? 'bg-white' : 'bg-gray-50'}
                  ${isToday ? 'ring-2 ring-purple-500' : ''}
                  ${entry ? 'cursor-pointer hover:bg-purple-50' : ''}
                  transition-colors duration-200
                `}
                onClick={() => entry && setSelectedEntry(entry)}
              >
                {date && (
                  <>
                    <div className="text-sm text-gray-500 mb-2">
                      {date.getDate()}
                    </div>
                    {entry && (
                      <div className="text-2xl flex justify-center">
                        {getMoodEmoji(entry.mood)}
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Entry Details */}
      {selectedEntry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">
                  {new Date(selectedEntry.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </h3>
                <div className="flex items-center mt-2">
                  <span className="text-3xl mr-3">{getMoodEmoji(selectedEntry.mood)}</span>
                  <span className="text-2xl mr-3">{getWeatherEmoji(selectedEntry.weather.main)}</span>
                  <span className="text-gray-600">{Math.round(selectedEntry.weather.temp)}°C</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedEntry(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            {selectedEntry.notes && (
              <div className="mt-4">
                <p className="text-gray-600 whitespace-pre-wrap">{selectedEntry.notes}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar; 