
import { format, parse } from 'date-fns';

// Format date to display format
export const formatDate = (date: Date): string => {
  return format(date, 'EEEE, MMMM do, yyyy');
};

// Format date to ISO format (for storage)
export const formatDateISO = (date: Date): string => {
  return format(date, 'yyyy-MM-dd');
};

// Parse ISO date string to Date object
export const parseDate = (dateString: string): Date => {
  return parse(dateString, 'yyyy-MM-dd', new Date());
};

// Get today's date
export const getToday = (): Date => {
  return new Date();
};

// Format date string for display in calendar
export const formatCalendarDate = (dateString: string): string => {
  const date = parse(dateString, 'yyyy-MM-dd', new Date());
  return format(date, 'MMM d');
};
