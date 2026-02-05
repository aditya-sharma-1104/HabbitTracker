export type HabitCategory = 'strength' | 'intelligence' | 'discipline' | 'magic' | 'luck';

export interface Habit {
  id: string;
  title: string;
  description: string;
  category: HabitCategory;
  points: number;
  streak: number;
  completedToday: boolean;
  completedDates: string[];
  createdAt: string;
}

export interface UserProgress {
  totalPoints: number;
  level: number;
  pointsToNextLevel: number;
  categoryPoints: Record<HabitCategory, number>;
}

export const CATEGORY_INFO = {
  strength: {
    name: 'Strength',
    emoji: '💪',
    color: 'text-red-400',
    bgColor: 'bg-red-500/20',
    borderColor: 'border-red-500/30',
    description: 'Physical fitness and endurance'
  },
  intelligence: {
    name: 'Intelligence',
    emoji: '🧠',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/20',
    borderColor: 'border-blue-500/30',
    description: 'Learning and mental growth'
  },
  discipline: {
    name: 'Discipline',
    emoji: '⚔️',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/20',
    borderColor: 'border-yellow-500/30',
    description: 'Self-control and consistency'
  },
  magic: {
    name: 'Magic',
    emoji: '✨',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/20',
    borderColor: 'border-purple-500/30',
    description: 'Creativity and innovation'
  },
  luck: {
    name: 'Luck',
    emoji: '🍀',
    color: 'text-green-400',
    bgColor: 'bg-green-500/20',
    borderColor: 'border-green-500/30',
    description: 'Opportunities and networking'
  }
} as const;

export const calculateLevel = (points: number): { level: number; pointsToNext: number } => {
  const level = Math.floor(points / 100) + 1;
  const pointsToNext = (level * 100) - points;
  return { level, pointsToNext };
};
