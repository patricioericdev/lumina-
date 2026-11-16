export interface WeeklyGoal {
  id: string;
  createdAt: string; // ISO timestamp
  weekStart: string; // YYYY-MM-DD (segunda-feira)
  subject: string;
  goalDescription: string;
  targetHours: number;
  loggedHours: number;
  completed: boolean;
  color: string; // Tailwind color class or hex
}

export const GOAL_COLORS = [
  { label: "Rosa", value: "#C77DA5" },
  { label: "Lavanda", value: "#A78BCA" },
  { label: "Matcha", value: "#6FAE7B" },
  { label: "Pêssego", value: "#E8956A" },
  { label: "Oceano", value: "#4A9BB5" },
  { label: "Latte", value: "#B5956A" },
] as const;
