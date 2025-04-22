import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { moodService } from '../services/moodService';

const MoodEntry = () => {
  const navigate = useNavigate();
  const [mood, setMood] = useState<number>(3);
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newEntry = {
      date: new Date().toISOString().split('T')[0],
      mood,
      notes
    };
    
    moodService.addEntry(newEntry);
    navigate('/dashboard');
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Record Your Mood</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-lg font-medium mb-4">
            How are you feeling today?
          </label>
          <div className="flex justify-between items-center gap-4">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setMood(value)}
                className={`
                  w-16 h-16 rounded-full text-xl font-bold transition-all
                  ${mood === value 
                    ? 'bg-blue-500 text-white transform scale-110' 
                    : 'bg-gray-100 hover:bg-gray-200'
                  }
                `}
              >
                {value}
              </button>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>Very Bad</span>
            <span>Excellent</span>
          </div>
        </div>

        <div>
          <label htmlFor="notes" className="block text-lg font-medium mb-2">
            Notes (Optional)
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full h-32 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="How was your day? What made you feel this way?"
          />
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-6 py-2 border rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Save Entry
          </button>
        </div>
      </form>
    </div>
  );
};

export default MoodEntry; 