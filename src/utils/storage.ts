
import { MoodEntry } from '../types';

const STORAGE_KEY = 'mood-tracker-entries';

// Function to save a mood entry to localStorage
export const saveMoodEntry = (entry: MoodEntry): void => {
  const entries = getMoodEntries();
  entries.push(entry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
};

// Function to get all mood entries from localStorage
export const getMoodEntries = (): MoodEntry[] => {
  const entriesString = localStorage.getItem(STORAGE_KEY);
  if (!entriesString) return [];
  
  try {
    return JSON.parse(entriesString);
  } catch (error) {
    console.error('Error parsing mood entries:', error);
    return [];
  }
};

// Function to get entries for a specific date
export const getEntriesByDate = (date: string): MoodEntry[] => {
  const entries = getMoodEntries();
  return entries.filter(entry => entry.date.startsWith(date));
};

// Function to get entries by mood
export const getEntriesByMood = (mood: string): MoodEntry[] => {
  const entries = getMoodEntries();
  return entries.filter(entry => entry.mood === mood);
};

// Function to delete a mood entry
export const deleteMoodEntry = (id: string): void => {
  const entries = getMoodEntries();
  const updatedEntries = entries.filter(entry => entry.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedEntries));
};
