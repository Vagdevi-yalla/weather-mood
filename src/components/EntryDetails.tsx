import React from 'react';
import { MoodEntry, MoodType } from '../types';
import { formatDate, parseDate } from '../utils/dateUtils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Smile, Zap, Cloud, Frown, Angry, Cloud as CloudIcon, CloudRain, CloudSnow, CloudSun, Sun, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { deleteMoodEntry } from '../utils/storage';

interface EntryDetailsProps {
  entry: MoodEntry | null;
  onClose: () => void;
  onDelete: () => void;
}

const EntryDetails: React.FC<EntryDetailsProps> = ({ entry, onClose, onDelete }) => {
  if (!entry) {
    return null;
  }

  const getMoodIcon = (mood: MoodType) => {
    const iconMap = {
      happy: <Smile className="w-8 h-8 text-purple-dark" />,
      excited: <Zap className="w-8 h-8 text-purple-dark" />,
      calm: <Cloud className="w-8 h-8 text-purple-dark" />,
      sad: <Frown className="w-8 h-8 text-purple-dark" />,
      angry: <Flame className="w-8 h-8 text-purple-dark" />,
    };
    
    return iconMap[mood];
  };

  const getMoodLabel = (mood: MoodType) => {
    const labelMap = {
      happy: 'Happy',
      excited: 'Excited',
      calm: 'Calm',
      sad: 'Sad',
      angry: 'Angry',
    };
    
    return labelMap[mood];
  };

  const getMoodColor = (mood: MoodType) => {
    const colorMap = {
      happy: 'bg-mood-happy',
      excited: 'bg-mood-excited',
      calm: 'bg-mood-calm',
      sad: 'bg-mood-sad',
      angry: 'bg-mood-angry',
    };
    
    return colorMap[mood];
  };

  // Get weather icon based on the condition
  const getWeatherIcon = () => {
    const iconMap = {
      Clear: <Sun className="w-6 h-6 text-yellow-400" />,
      Clouds: <CloudIcon className="w-6 h-6 text-gray-400" />,
      Rain: <CloudRain className="w-6 h-6 text-blue-400" />,
      Snow: <CloudSnow className="w-6 h-6 text-blue-200" />,
      default: <CloudSun className="w-6 h-6 text-gray-400" />,
    };

    return iconMap[entry.weather.main as keyof typeof iconMap] || iconMap.default;
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      deleteMoodEntry(entry.id);
      onDelete();
    }
  };

  return (
    <Card className={`${getMoodColor(entry.mood)} border-none shadow-md`}>
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center">
          <span>{formatDate(parseDate(entry.date))}</span>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClose}
            className="text-purple-dark hover:bg-purple-dark/10"
          >
            Close
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-3 bg-white/50 p-3 rounded-md">
            {getMoodIcon(entry.mood)}
            <span className="text-lg font-medium text-purple-dark">
              {getMoodLabel(entry.mood)}
            </span>
          </div>
          
          {entry.note && (
            <div className="bg-white/50 p-3 rounded-md">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Note</h3>
              <p className="text-purple-dark">{entry.note}</p>
            </div>
          )}
          
          <div className="bg-white/50 p-3 rounded-md">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Weather</h3>
            <div className="flex items-center space-x-3">
              {getWeatherIcon()}
              <span className="text-purple-dark capitalize">
                {entry.weather.description}, {Math.round(entry.weather.temp)}°C
              </span>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            className="mt-2 border-red-300 text-red-500 hover:bg-red-50 hover:text-red-600"
            onClick={handleDelete}
          >
            Delete Entry
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EntryDetails;
