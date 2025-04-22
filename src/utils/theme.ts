import { MoodType } from '../types';

export const moodColors = {
  1: { // Happy
    background: 'bg-yellow-50',
    accent: 'bg-yellow-100',
    text: 'text-yellow-900',
    border: 'border-yellow-200',
    hover: 'hover:bg-yellow-100',
    button: 'bg-yellow-500 hover:bg-yellow-600',
  },
  2: { // Energetic
    background: 'bg-orange-50',
    accent: 'bg-orange-100',
    text: 'text-orange-900',
    border: 'border-orange-200',
    hover: 'hover:bg-orange-100',
    button: 'bg-orange-500 hover:bg-orange-600',
  },
  3: { // Calm
    background: 'bg-blue-50',
    accent: 'bg-blue-100',
    text: 'text-blue-900',
    border: 'border-blue-200',
    hover: 'hover:bg-blue-100',
    button: 'bg-blue-500 hover:bg-blue-600',
  },
  4: { // Sad
    background: 'bg-indigo-50',
    accent: 'bg-indigo-100',
    text: 'text-indigo-900',
    border: 'border-indigo-200',
    hover: 'hover:bg-indigo-100',
    button: 'bg-indigo-500 hover:bg-indigo-600',
  },
  5: { // Angry
    background: 'bg-rose-50',
    accent: 'bg-rose-100',
    text: 'text-rose-900',
    border: 'border-rose-200',
    hover: 'hover:bg-rose-100',
    button: 'bg-rose-500 hover:bg-rose-600',
  },
};

export const getTemperatureBackground = (temp: number): string => {
  // Return background image based on temperature
  if (temp <= 0) {
    return 'bg-[url("/images/cold.jpg")]';
  } else if (temp <= 10) {
    return 'bg-[url("/images/cool.jpg")]';
  } else if (temp <= 20) {
    return 'bg-[url("/images/mild.jpg")]';
  } else if (temp <= 30) {
    return 'bg-[url("/images/warm.jpg")]';
  } else {
    return 'bg-[url("/images/hot.jpg")]';
  }
};

export const getMoodColors = (mood: MoodType | null) => {
  if (!mood) {
    return {
      background: 'bg-gray-50',
      accent: 'bg-gray-100',
      text: 'text-gray-900',
      border: 'border-gray-200',
      hover: 'hover:bg-gray-100',
      button: 'bg-gray-500 hover:bg-gray-600',
    };
  }
  return moodColors[mood];
}; 