"use client";

import { useState, useEffect } from "react";
import { Task, Category, Priority } from "@/types/task";

const STORAGE_KEY = "study_life_tasks_v1";

const DEFAULT_TASKS: Task[] = [
  {
    id: "1",
    title: "Revisar anotações de História — República Velha",
    category: "Estudos",
    priority: "alta",
    dueDate: "Hoje",
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Fazer 20 questões de Matemática — Funções",
    category: "Estudos",
    priority: "alta",
    dueDate: "Hoje",
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Ler capítulo 5 do livro de Literatura",
    category: "Estudos",
    priority: "media",
    dueDate: "Amanhã",
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    title: "Beber 2L de água ao longo do dia",
    category: "Saúde",
    priority: "baixa",
    dueDate: "Diário",
    completed: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "5",
    title: "Organizar a mesa de estudos",
    category: "Casa",
    priority: "baixa",
    dueDate: "Hoje",
    completed: true,
    createdAt: new Date().toISOString(),
  },
];

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Carregar do localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setTasks(JSON.parse(saved));
      } else {
        setTasks(DEFAULT_TASKS);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_TASKS));
      }
    } catch {
      setTasks(DEFAULT_TASKS);
    }
    setIsLoaded(true);

    const handleStorageChange = () => {
      try {
        const updated = localStorage.getItem(STORAGE_KEY);
        if (updated) setTasks(JSON.parse(updated));
      } catch {}
    };

    window.addEventListener("study_life_tasks_updated", handleStorageChange);
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("study_life_tasks_updated", handleStorageChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const saveTasks = (newTasks: Task[]) => {
    setTasks(newTasks);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newTasks));
      window.dispatchEvent(new Event("study_life_tasks_updated"));
    } catch {}
  };

  const addTask = (
    title: string,
    category: Category = "Estudos",
    priority: Priority = "media",
    dueDate?: string
  ) => {
    if (!title.trim()) return;
    const newTask: Task = {
      id: Date.now().toString(),
      title: title.trim(),
      category,
      priority,
      dueDate: dueDate || "Hoje",
      completed: false,
      createdAt: new Date().toISOString(),
    };
    saveTasks([newTask, ...tasks]);
  };

  const toggleTask = (id: string) => {
    const updated = tasks.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    saveTasks(updated);
  };

  const deleteTask = (id: string) => {
    const updated = tasks.filter((t) => t.id !== id);
    saveTasks(updated);
  };

  const total = tasks.length;
  const completedCount = tasks.filter((t) => t.completed).length;
  const percentage = total === 0 ? 0 : Math.round((completedCount / total) * 100);

  return {
    tasks,
    isLoaded,
    addTask,
    toggleTask,
    deleteTask,
    total,
    completedCount,
    percentage,
  };
}
