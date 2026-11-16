"use client";

import { useState, useEffect } from "react";
import { Habit, JournalEntry, MoodType } from "@/types/habits";

const HABITS_KEY = "study_life_habits_v1";
const JOURNAL_KEY = "study_life_journal_v1";
const MOOD_KEY = "study_life_moods_v1";

const DEFAULT_HABITS: Habit[] = [
  {
    id: "hab-1",
    name: "Beber 2L de água",
    icon: "💧",
    category: "Saúde",
    streak: 4,
    completedDates: [],
  },
  {
    id: "hab-2",
    name: "Ler 20 minutos de literatura",
    icon: "📖",
    category: "Estudos",
    streak: 3,
    completedDates: [],
  },
  {
    id: "hab-3",
    name: "Alongamento ou caminhada leve",
    icon: "🧘",
    category: "Saúde",
    streak: 2,
    completedDates: [],
  },
  {
    id: "hab-4",
    name: "Dormir no horário (8h de sono)",
    icon: "😴",
    category: "Rotina",
    streak: 5,
    completedDates: [],
  },
  {
    id: "hab-5",
    name: "Organizar a mesa de estudos",
    icon: "🧹",
    category: "Rotina",
    streak: 1,
    completedDates: [],
  },
  {
    id: "hab-6",
    name: "Momento de autocuidado ou skin care",
    icon: "✨",
    category: "Mente",
    streak: 6,
    completedDates: [],
  },
];

const DEFAULT_JOURNAL: JournalEntry[] = [
  {
    id: "j-1",
    date: "Hoje",
    createdAt: "2026-11-09T18:00:00.000Z",
    title: "Um dia produtivo e calmo",
    content: "Consegui avançar bem na matéria de Ecologia e fiz as questões com calma. Percebi que respirar fundo antes de começar me ajuda a não ficar ansiosa.",
    mood: "bem",
    gratitude: "Grata pela xícara de café quente e pelo apoio da minha família.",
  },
  {
    id: "j-2",
    date: "Ontem",
    createdAt: "2026-11-08T18:00:00.000Z",
    title: "Começando a me organizar pro ENEM",
    content: "Decidi que vou estudar com consistência, sem me cobrar perfeição. Cada pequeno passo hoje vai fazer a diferença em 2027.",
    mood: "radiante",
    gratitude: "Grata por ter clareza do que quero alcançar.",
  },
];

export function useHabits() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [todayMood, setTodayMoodState] = useState<MoodType | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [todayStr, setTodayStr] = useState<string>("");
  const [weeklyDays, setWeeklyDays] = useState<
    { label: string; dayNumber: number; dateStr: string; isToday: boolean }[]
  >([]);

  // Inicializar dados e datas somente no cliente após hidratação
  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const currentTodayStr = `${year}-${month}-${day}`;
    setTodayStr(currentTodayStr);

    // Calcular dias da semana
    const currentDay = now.getDay();
    const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;
    const days = [];
    const labels = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

    for (let i = 0; i < 7; i++) {
      const d = new Date(now);
      d.setDate(now.getDate() + mondayOffset + i);
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, "0");
      const dt = String(d.getDate()).padStart(2, "0");
      const dStr = `${y}-${m}-${dt}`;

      days.push({
        label: labels[i],
        dayNumber: d.getDate(),
        dateStr: dStr,
        isToday: dStr === currentTodayStr,
      });
    }
    setWeeklyDays(days);

    try {
      const savedHabits = localStorage.getItem(HABITS_KEY);
      if (savedHabits) {
        setHabits(JSON.parse(savedHabits));
      } else {
        // Inicializar com 2 hábitos concluídos hoje para visualização inicial
        const initial = DEFAULT_HABITS.map((h, i) =>
          i < 2 ? { ...h, completedDates: [currentTodayStr] } : h
        );
        setHabits(initial);
        localStorage.setItem(HABITS_KEY, JSON.stringify(initial));
      }

      const savedJournal = localStorage.getItem(JOURNAL_KEY);
      if (savedJournal) {
        setJournalEntries(JSON.parse(savedJournal));
      } else {
        setJournalEntries(DEFAULT_JOURNAL);
        localStorage.setItem(JOURNAL_KEY, JSON.stringify(DEFAULT_JOURNAL));
      }

      const savedMoods = localStorage.getItem(MOOD_KEY);
      if (savedMoods) {
        const moodsMap = JSON.parse(savedMoods);
        if (moodsMap[currentTodayStr]) {
          setTodayMoodState(moodsMap[currentTodayStr]);
        }
      }
    } catch {
      setHabits(DEFAULT_HABITS);
      setJournalEntries(DEFAULT_JOURNAL);
    }
    setIsLoaded(true);

    const handleSync = () => {
      try {
        const h = localStorage.getItem(HABITS_KEY);
        if (h) setHabits(JSON.parse(h));
      } catch {}
    };

    window.addEventListener("study_life_habits_updated", handleSync);
    return () => window.removeEventListener("study_life_habits_updated", handleSync);
  }, []);

  const saveHabits = (newHabits: Habit[]) => {
    setHabits(newHabits);
    try {
      localStorage.setItem(HABITS_KEY, JSON.stringify(newHabits));
      window.dispatchEvent(new Event("study_life_habits_updated"));
    } catch {}
  };

  const isHabitDoneToday = (habit: Habit) => {
    if (!todayStr) return false;
    return habit.completedDates.includes(todayStr);
  };

  const toggleHabitToday = (habitId: string) => {
    if (!todayStr) return;
    const updated = habits.map((h) => {
      if (h.id !== habitId) return h;
      const isDone = h.completedDates.includes(todayStr);

      if (isDone) {
        return {
          ...h,
          completedDates: h.completedDates.filter((d) => d !== todayStr),
          streak: Math.max(0, h.streak - 1),
        };
      } else {
        return {
          ...h,
          completedDates: [...h.completedDates, todayStr],
          streak: h.streak + 1,
        };
      }
    });

    saveHabits(updated);
  };

  const addHabit = (name: string, icon: string, category: Habit["category"]) => {
    if (!name.trim()) return;
    const newH: Habit = {
      id: `hab-${Date.now()}`,
      name: name.trim(),
      icon: icon || "🌿",
      category,
      streak: 0,
      completedDates: [],
    };
    saveHabits([...habits, newH]);
  };

  const deleteHabit = (id: string) => {
    saveHabits(habits.filter((h) => h.id !== id));
  };

  const saveJournal = (entries: JournalEntry[]) => {
    setJournalEntries(entries);
    try {
      localStorage.setItem(JOURNAL_KEY, JSON.stringify(entries));
    } catch {}
  };

  const addJournalEntry = (
    title: string,
    content: string,
    mood: MoodType,
    gratitude?: string
  ) => {
    if (!content.trim()) return;
    const now = new Date();
    const dateFormatted = `${now.getDate().toString().padStart(2, "0")}/${(now.getMonth() + 1)
      .toString()
      .padStart(2, "0")}`;

    const newEntry: JournalEntry = {
      id: `j-${Date.now()}`,
      date: dateFormatted,
      createdAt: now.toISOString(),
      title: title.trim() || "Registro do dia",
      content: content.trim(),
      mood,
      gratitude: gratitude?.trim(),
    };

    saveJournal([newEntry, ...journalEntries]);
  };

  const deleteJournalEntry = (id: string) => {
    saveJournal(journalEntries.filter((j) => j.id !== id));
  };

  const setTodayMood = (mood: MoodType) => {
    setTodayMoodState(mood);
    if (!todayStr) return;
    try {
      const saved = localStorage.getItem(MOOD_KEY);
      const moodsMap = saved ? JSON.parse(saved) : {};
      moodsMap[todayStr] = mood;
      localStorage.setItem(MOOD_KEY, JSON.stringify(moodsMap));
    } catch {}
  };

  const todayCompletedCount = habits.filter((h) => isHabitDoneToday(h)).length;
  const todayTotalHabits = habits.length;

  return {
    habits,
    journalEntries,
    todayMood,
    isLoaded,
    todayStr,
    weeklyDays,
    isHabitDoneToday,
    toggleHabitToday,
    addHabit,
    deleteHabit,
    addJournalEntry,
    deleteJournalEntry,
    setTodayMood,
    todayCompletedCount,
    todayTotalHabits,
  };
}
