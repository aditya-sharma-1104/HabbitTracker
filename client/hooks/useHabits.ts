import { useState, useEffect } from 'react';
import { Habit, UserProgress, HabitCategory, calculateLevel } from '../types/habit';

const STORAGE_KEY = 'habit-tracker-data';

export const useHabits = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [progress, setProgress] = useState<UserProgress>({
    totalPoints: 0,
    level: 1,
    pointsToNextLevel: 100,
    categoryPoints: {
      strength: 0,
      intelligence: 0,
      discipline: 0,
      magic: 0,
      luck: 0
    }
  });

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      const { habits: savedHabits, progress: savedProgress } = JSON.parse(savedData);
      setHabits(savedHabits || []);
      setProgress(savedProgress || progress);
    }
  }, []);

  // Save to localStorage whenever habits change
  useEffect(() => {
    const data = { habits, progress };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [habits, progress]);

  const addHabit = (habitData: Omit<Habit, 'id' | 'streak' | 'completedToday' | 'completedDates' | 'createdAt'>) => {
    const newHabit: Habit = {
      ...habitData,
      id: Date.now().toString(),
      streak: 0,
      completedToday: false,
      completedDates: [],
      createdAt: new Date().toISOString()
    };
    setHabits(prev => [...prev, newHabit]);
  };

  const completeHabit = (habitId: string) => {
    const today = new Date().toISOString().split('T')[0];
    
    setHabits(prev => {
      const updated = prev.map(habit => {
        if (habit.id === habitId && !habit.completedToday) {
          const newCompletedDates = [...habit.completedDates, today];
          const newStreak = calculateStreak(newCompletedDates);
          
          // Update progress
          setProgress(currentProgress => {
            const newTotalPoints = currentProgress.totalPoints + habit.points;
            const newCategoryPoints = {
              ...currentProgress.categoryPoints,
              [habit.category]: currentProgress.categoryPoints[habit.category] + habit.points
            };
            const { level, pointsToNext } = calculateLevel(newTotalPoints);
            
            return {
              totalPoints: newTotalPoints,
              level,
              pointsToNextLevel: pointsToNext,
              categoryPoints: newCategoryPoints
            };
          });
          
          return {
            ...habit,
            completedToday: true,
            completedDates: newCompletedDates,
            streak: newStreak
          };
        }
        return habit;
      });
      
      return updated;
    });
  };

  const resetDayCompletion = () => {
    setHabits(prev => prev.map(habit => ({ ...habit, completedToday: false })));
  };

  const deleteHabit = (habitId: string) => {
    setHabits(prev => prev.filter(habit => habit.id !== habitId));
  };

  return {
    habits,
    progress,
    addHabit,
    completeHabit,
    resetDayCompletion,
    deleteHabit
  };
};

const calculateStreak = (completedDates: string[]): number => {
  if (completedDates.length === 0) return 0;
  
  const sortedDates = completedDates.sort().reverse();
  const today = new Date().toISOString().split('T')[0];
  let streak = 0;
  
  for (let i = 0; i < sortedDates.length; i++) {
    const expectedDate = new Date();
    expectedDate.setDate(expectedDate.getDate() - i);
    const expectedDateStr = expectedDate.toISOString().split('T')[0];
    
    if (sortedDates[i] === expectedDateStr) {
      streak++;
    } else {
      break;
    }
  }
  
  return streak;
};
