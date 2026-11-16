export type MoodType = "radiante" | "bem" | "calma" | "cansada" | "ansiosa";

export interface Habit {
  id: string;
  name: string;
  icon: string;
  category: "Saúde" | "Mente" | "Estudos" | "Rotina";
  streak: number;
  completedDates: string[]; // Formato YYYY-MM-DD
}

export interface JournalEntry {
  id: string;
  date: string;
  createdAt: string;
  title: string;
  content: string;
  mood: MoodType;
  gratitude?: string;
}

export interface DailyMood {
  date: string; // YYYY-MM-DD
  mood: MoodType;
}
