import { useState } from 'react';
import { MoodType } from '../types';

interface MoodOption {
  type: MoodType;
  emoji: string;
  color: string;
  label: string;
}

const moods: MoodOption[] = [
  { type: 'happy', emoji: '😊', color: 'bg-yellow-100 hover:bg-yellow-200', label: 'Happy' },
  { type: 'excited', emoji: '🤩', color: 'bg-orange-100 hover:bg-orange-200', label: 'Excited' },
  { type: 'calm', emoji: '😌', color: 'bg-blue-100 hover:bg-blue-200', label: 'Calm' },
  { type: 'sad', emoji: '😢', color: 'bg-gray-100 hover:bg-gray-200', label: 'Sad' },
  { type: 'angry', emoji: '😠', color: 'bg-red-100 hover:bg-red-200', label: 'Angry' }
];

interface MoodSelectorProps {
  onSelect: (mood: MoodType) => void;
  selected?: MoodType;
}

export const MoodSelector = ({ onSelect, selected }: MoodSelectorProps) => {
  const [hoveredMood, setHoveredMood] = useState<MoodType | null>(null);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-700">How are you feeling today?</h3>
      <div className="grid grid-cols-5 gap-4">
        {moods.map((mood) => (
          <button
            key={mood.type}
            onClick={() => onSelect(mood.type)}
            onMouseEnter={() => setHoveredMood(mood.type)}
            onMouseLeave={() => setHoveredMood(null)}
            className={`
              p-4 rounded-lg transition-all duration-200 transform
              ${mood.color}
              ${selected === mood.type ? 'scale-110 ring-2 ring-purple-500' : ''}
              ${hoveredMood === mood.type ? 'scale-105' : ''}
              flex flex-col items-center justify-center
            `}
          >
            <span className="text-4xl mb-2">{mood.emoji}</span>
            <span className="text-sm font-medium">{mood.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
