
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { MoodType, WeatherData } from '../types';
import MoodSelector from './MoodSelector';
import { formatDateISO, formatDate, getToday } from '../utils/dateUtils';
import { saveMoodEntry } from '../utils/storage';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface MoodEntryProps {
  weather: WeatherData | null;
  onEntrySaved: () => void;
}

const MoodEntry: React.FC<MoodEntryProps> = ({ weather, onEntrySaved }) => {
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const today = getToday();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedMood) {
      toast({
        title: "Mood required",
        description: "Please select your mood before saving",
        variant: "destructive",
      });
      return;
    }

    if (!weather) {
      toast({
        title: "Weather data required",
        description: "Please wait for weather data to load",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    const entry = {
      id: uuidv4(),
      date: formatDateISO(today),
      mood: selectedMood,
      note: note.trim(),
      weather,
    };

    try {
      saveMoodEntry(entry);
      setSelectedMood(null);
      setNote('');
      toast({
        title: "Entry saved!",
        description: "Your mood has been recorded",
      });
      onEntrySaved();
    } catch (error) {
      toast({
        title: "Error saving entry",
        description: "An error occurred while saving your entry",
        variant: "destructive",
      });
      console.error('Error saving mood entry:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-purple-dark mb-2">Today's Mood</h1>
        <p className="text-gray-500">{formatDate(today)}</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <MoodSelector selected={selectedMood} onSelect={setSelectedMood} />
        
        <div>
          <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-1">
            Add a note (optional)
          </label>
          <Textarea
            id="note"
            placeholder="How was your day? What's on your mind?"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="min-h-[100px]"
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-purple-light hover:bg-purple-light/90 text-white"
          disabled={isSubmitting || !selectedMood || !weather}
        >
          {isSubmitting ? 'Saving...' : 'Save Entry'}
        </Button>
      </form>
    </div>
  );
};

export default MoodEntry;
