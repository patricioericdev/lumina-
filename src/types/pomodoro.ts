export interface PomodoroSession {
  id: string;
  date: string; // ISO date string YYYY-MM-DD
  subject: string;
  durationMinutes: number;
  type: "foco" | "pausa_curta" | "pausa_longa";
  completedAt: string; // ISO timestamp
}

export interface PomodoroSettings {
  focusMinutes: number;
  shortBreakMinutes: number;
  longBreakMinutes: number;
  sessionsBeforeLongBreak: number;
  soundEnabled: boolean;
}

export const DEFAULT_POMODORO_SETTINGS: PomodoroSettings = {
  focusMinutes: 25,
  shortBreakMinutes: 5,
  longBreakMinutes: 15,
  sessionsBeforeLongBreak: 4,
  soundEnabled: true,
};
