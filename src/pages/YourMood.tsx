import { useState } from 'react';
import { MoodType } from '../types';
import { moodService } from '../services/moodService';
import { useNavigate } from 'react-router-dom';

const YourMood = () => {
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [note, setNote] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const moods = [
    { type: 'happy' as MoodType, label: 'Happy', icon: '☺' },
    { type: 'excited' as MoodType, label: 'Energetic', icon: '⚡' },
    { type: 'calm' as MoodType, label: 'Calm', icon: '☁' },
    { type: 'sad' as MoodType, label: 'Sad', icon: '☹' },
    { type: 'angry' as MoodType, label: 'Angry', icon: '😠' },
  ];

  const handleSubmit = () => {
    setShowConfirmation(true);
  };

  const handleConfirm = async () => {
    if (selectedMood) {
      try {
        setIsLoading(true);
        setError(null);
        const entry = {
          date: new Date().toISOString(),
          mood: selectedMood,
          notes: note,
          weather: {
            location: "",
            temp: 0,
            humidity: 0,
            description: 'Not available',
            icon: '',
            main: 'Unknown'
          }
        };

        await moodService.addEntry(entry);
        setShowConfirmation(false);
        setSelectedMood(null);
        setNote('');
        
        // Navigate to calendar view after saving
        navigate('/calendar');
      } catch (error) {
        console.error('Failed to save mood entry:', error);
        setError('Failed to save your mood entry. Please try again.');
        setShowConfirmation(false);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">Today's Mood</h1>
      <p className="text-gray-600 mb-8">{formattedDate}</p>

      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">How are you feeling today?</h2>
          <div className="grid grid-cols-5 gap-4">
            {moods.map((mood) => (
              <button
                key={mood.type}
                onClick={() => setSelectedMood(mood.type)}
                className={`
                  p-6 rounded-lg flex flex-col items-center justify-center space-y-2
                  transition-all duration-200
                  ${selectedMood === mood.type 
                    ? 'bg-purple-100 ring-2 ring-purple-500 scale-105' 
                    : 'bg-white hover:bg-gray-50'}
                `}
              >
                <span className="text-3xl">{mood.icon}</span>
                <span className="text-sm font-medium">{mood.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Add a note (optional)</h2>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="How was your day? What's on your mind?"
            className="w-full p-4 border rounded-lg h-32 resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={!selectedMood}
          className={`
            w-full py-4 rounded-lg font-medium text-center
            transition-colors duration-200
            ${selectedMood 
              ? 'bg-purple-200 hover:bg-purple-300 text-purple-900' 
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'}
          `}
        >
          Save Entry
        </button>
      </div>

      {/* Confirmation Dialog */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Confirm Submission</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to submit it?</p>
            {error && (
              <p className="text-red-500 mb-4">{error}</p>
            )}
            <div className="flex space-x-4">
              <button
                onClick={() => setShowConfirmation(false)}
                disabled={isLoading}
                className="flex-1 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                disabled={isLoading}
                className="flex-1 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
              >
                {isLoading ? 'Saving...' : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default YourMood; 