import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, subMonths, addMonths } from 'date-fns';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MoodEntry, MoodType } from '../types';
import { Smile, Zap, Cloud, Frown, Angry, Flame } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CalendarProps {
  entries: MoodEntry[];
  onSelectDate: (date: string) => void;
}

const Calendar: React.FC<CalendarProps> = ({ entries, onSelectDate }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  const getEntryForDay = (day: Date): MoodEntry | undefined => {
    const dateStr = format(day, 'yyyy-MM-dd');
    return entries.find(entry => entry.date === dateStr);
  };
  
  const getMoodIcon = (mood: MoodType) => {
    const iconMap = {
      happy: <Smile className="w-5 h-5" />,
      excited: <Zap className="w-5 h-5" />,
      calm: <Cloud className="w-5 h-5" />,
      sad: <Frown className="w-5 h-5" />,
      angry: <Flame className="w-5 h-5" />,
    };
    
    return iconMap[mood];
  };
  
  const getMoodColor = (mood: MoodType) => {
    const colorMap = {
      happy: 'bg-mood-happy text-purple-dark',
      excited: 'bg-mood-excited text-purple-dark',
      calm: 'bg-mood-calm text-purple-dark',
      sad: 'bg-mood-sad text-purple-dark',
      angry: 'bg-mood-angry text-purple-dark',
    };
    
    return colorMap[mood];
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-purple-dark">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={prevMonth}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            onClick={nextMonth}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
        
        {daysInMonth.map(day => {
          const dateStr = format(day, 'yyyy-MM-dd');
          const entry = getEntryForDay(day);
          const isToday = isSameDay(day, new Date());
          
          return (
            <div
              key={day.toString()}
              className={cn(
                'h-12 md:h-16 border rounded-md flex flex-col items-center justify-center relative transition-all duration-200 hover:shadow-md cursor-pointer',
                isToday && !entry && 'border-purple-light bg-purple-light/10',
                entry ? getMoodColor(entry.mood) : 'hover:bg-gray-50'
              )}
              onClick={() => onSelectDate(dateStr)}
            >
              <span 
                className={cn(
                  "text-sm font-medium z-10",
                  isToday && !entry && 'text-purple-light',
                  entry ? 'text-purple-dark' : 'text-gray-700'
                )}
              >
                {format(day, 'd')}
              </span>
              {entry && (
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  {getMoodIcon(entry.mood)}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
