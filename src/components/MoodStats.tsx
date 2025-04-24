import React from 'react';
import { MoodEntry, MoodType } from '../types';
import { Smile, Zap, Cloud, Frown, Angry } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MoodStatsProps {
  entries: MoodEntry[];
}

const MoodStats: React.FC<MoodStatsProps> = ({ entries }) => {
  if (entries.length === 0) {
    return (
      <div className="w-full bg-white rounded-lg shadow-sm p-4">
        <h2 className="text-lg font-semibold text-purple-dark mb-2">Mood Statistics</h2>
        <p className="text-gray-500 text-sm">No entries yet. Start tracking your mood to see statistics!</p>
      </div>
    );
  }

  const initialMoodCounts: Record<MoodType, number> = {
    happy: 0,
    excited: 0,
    calm: 0,
    sad: 0,
    angry: 0,
  };

  const moodCounts = entries.reduce((counts, entry) => {
    counts[entry.mood]++;
    return counts;
  }, initialMoodCounts);

  const totalEntries = entries.length;
  const getMoodPercentage = (count: number) => Math.round((count / totalEntries) * 100);

  const moodInfo = [
    { 
      type: 'happy' as MoodType, 
      icon: <Smile className="w-5 h-5" />, 
      label: 'Happy',
      count: moodCounts.happy,
      color: 'bg-yellow-400',
      textColor: 'text-yellow-700',
    },
    { 
      type: 'excited' as MoodType, 
      icon: <Zap className="w-5 h-5" />, 
      label: 'Excited',
      count: moodCounts.excited,
      color: 'bg-orange-400',
      textColor: 'text-orange-700',
    },
    { 
      type: 'calm' as MoodType, 
      icon: <Cloud className="w-5 h-5" />, 
      label: 'Calm',
      count: moodCounts.calm,
      color: 'bg-blue-400',
      textColor: 'text-blue-700',
    },
    { 
      type: 'sad' as MoodType, 
      icon: <Frown className="w-5 h-5" />, 
      label: 'Sad',
      count: moodCounts.sad,
      color: 'bg-gray-400',
      textColor: 'text-gray-700',
    },
    { 
      type: 'angry' as MoodType, 
      icon: <Angry className="w-5 h-5" />, 
      label: 'Angry',
      count: moodCounts.angry,
      color: 'bg-red-400',
      textColor: 'text-red-700',
    },
  ];

  return (
    <div className="w-full bg-white rounded-lg shadow-sm p-4">
      <h2 className="text-lg font-semibold text-purple-dark mb-3">Mood Statistics</h2>
      <div className="space-y-3">
        {moodInfo.map((mood) => {
          const percentage = getMoodPercentage(mood.count);
          
          return (
            <div key={mood.type} className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {mood.icon}
                  <span className="text-sm text-gray-600 ml-2">{mood.label}</span>
                </div>
                <span className="text-sm font-medium text-gray-600">
                  {mood.count} ({percentage}%)
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div 
                  className={cn(
                    "h-2 rounded-full transition-all duration-500", 
                    mood.color
                  )}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MoodStats;
