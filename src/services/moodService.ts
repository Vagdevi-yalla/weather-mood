import { MoodEntry, WeatherData, MoodType } from '../types';

const STORAGE_KEY = 'mood_entries';

export const moodService = {
  getAllEntries: (): MoodEntry[] => {
    const entries = localStorage.getItem(STORAGE_KEY);
    return entries ? JSON.parse(entries) : [];
  },

  addEntry: (entry: Omit<MoodEntry, 'id'>): MoodEntry => {
    const entries = moodService.getAllEntries();
    const newEntry = {
      ...entry,
      id: Date.now().toString(),
    };
    entries.push(newEntry);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    return newEntry;
  },

  deleteEntry: (id: string): void => {
    const entries = moodService.getAllEntries();
    const filteredEntries = entries.filter(entry => entry.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredEntries));
  },

  getAverageMood: (): number => {
    const entries = moodService.getAllEntries();
    if (entries.length === 0) return 0;

    // assign each string mood a numeric value
    const score: Record<MoodType, number> = {
      happy:   5,
      excited: 4,
      calm:    3,
      sad:     2,
      angry:   1,
    };

    const sum = entries.reduce(
      (acc, entry) => acc + score[entry.mood],
      0
    );

    return Number((sum / entries.length).toFixed(1));
  }
}; 