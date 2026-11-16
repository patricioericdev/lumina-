"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { PomodoroSession, PomodoroSettings, DEFAULT_POMODORO_SETTINGS } from "@/types/pomodoro";

const SESSIONS_KEY = "lumina_pomodoro_sessions_v1";
const SETTINGS_KEY = "lumina_pomodoro_settings_v1";

type TimerMode = "foco" | "pausa_curta" | "pausa_longa";

const SUBJECTS = [
  "Matemática", "Biologia", "Química", "Física",
  "História", "Geografia", "Filosofia", "Sociologia",
  "Linguagens", "Redação", "Inglês", "Livre",
];

function getTodayKey() {
  return new Date().toISOString().slice(0, 10);
}

function loadSessions(): PomodoroSession[] {
  try {
    const raw = localStorage.getItem(SESSIONS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveSessions(sessions: PomodoroSession[]) {
  try { localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions)); } catch {}
}

function loadSettings(): PomodoroSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    return raw ? { ...DEFAULT_POMODORO_SETTINGS, ...JSON.parse(raw) } : DEFAULT_POMODORO_SETTINGS;
  } catch { return DEFAULT_POMODORO_SETTINGS; }
}

export default function PomodoroPage() {
  const [settings, setSettings] = useState<PomodoroSettings>(DEFAULT_POMODORO_SETTINGS);
  const [sessions, setSessions] = useState<PomodoroSession[]>([]);
  const [mode, setMode] = useState<TimerMode>("foco");
  const [timeLeft, setTimeLeft] = useState(DEFAULT_POMODORO_SETTINGS.focusMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionCount, setSessionCount] = useState(0);
  const [subject, setSubject] = useState("Livre");
  const [showSettings, setShowSettings] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const totalForMode = useCallback((m: TimerMode, s: PomodoroSettings) => {
    if (m === "foco") return s.focusMinutes * 60;
    if (m === "pausa_curta") return s.shortBreakMinutes * 60;
    return s.longBreakMinutes * 60;
  }, []);

  useEffect(() => {
    const s = loadSettings();
    setSettings(s);
    setTimeLeft(s.focusMinutes * 60);
    setSessions(loadSessions());
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isRunning) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          setIsRunning(false);
          handleSessionComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning]);

  const handleSessionComplete = useCallback(() => {
    if (mode === "foco") {
      const newSession: PomodoroSession = {
        id: crypto.randomUUID(),
        date: getTodayKey(),
        subject,
        durationMinutes: settings.focusMinutes,
        type: "foco",
        completedAt: new Date().toISOString(),
      };
      setSessions((prev) => {
        const updated = [newSession, ...prev];
        saveSessions(updated);
        return updated;
      });
      setSessionCount((c) => c + 1);
    }
  }, [mode, subject, settings.focusMinutes]);

  const switchMode = (newMode: TimerMode) => {
    setIsRunning(false);
    setMode(newMode);
    setTimeLeft(totalForMode(newMode, settings));
  };

  const handleStartPause = () => setIsRunning((r) => !r);

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(totalForMode(mode, settings));
  };

  const handleSkip = () => {
    setIsRunning(false);
    if (mode === "foco") {
      const nextSession = sessionCount + 1;
      if (nextSession % settings.sessionsBeforeLongBreak === 0) {
        switchMode("pausa_longa");
      } else {
        switchMode("pausa_curta");
      }
    } else {
      switchMode("foco");
    }
  };

  const saveSettings = (newSettings: PomodoroSettings) => {
    setSettings(newSettings);
    setIsRunning(false);
    setTimeLeft(totalForMode(mode, newSettings));
    try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(newSettings)); } catch {}
    setShowSettings(false);
  };

  const todaySessions = sessions.filter((s) => s.date === getTodayKey() && s.type === "foco");
  const todayMinutes = todaySessions.reduce((acc, s) => acc + s.durationMinutes, 0);
  const totalMinutes = timeLeft >= 0 ? totalForMode(mode, settings) : 1;
  const progress = ((totalMinutes - timeLeft) / totalMinutes) * 100;

  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, "0");
  const seconds = (timeLeft % 60).toString().padStart(2, "0");

  const modeConfig: Record<TimerMode, { label: string; emoji: string; color: string; bg: string }> = {
    foco: { label: "Foco", emoji: "🍅", color: "#C77DA5", bg: "from-[#C77DA5] via-[#B86B94] to-[#8E446C]" },
    pausa_curta: { label: "Pausa Curta", emoji: "☕", color: "#6FAE7B", bg: "from-[#6FAE7B] via-[#5B9B68] to-[#3D7A4A]" },
    pausa_longa: { label: "Pausa Longa", emoji: "🌿", color: "#4A9BB5", bg: "from-[#4A9BB5] via-[#3A87A0] to-[#246A82]" },
  };
  const cfg = modeConfig[mode];

  if (!isLoaded) return null;

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-4xl mx-auto space-y-6 md:space-y-8">
      {/* Cabeçalho */}
      <header>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#75445F] flex items-center gap-2">
          <span>🍅</span> Timer Pomodoro
        </h1>
        <p className="text-[#9C7890] text-sm mt-1">
          Sessões de foco de {settings.focusMinutes} minutos com pausas estratégicas.
        </p>
      </header>

      {/* Stats do Dia */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 border border-[#F8EAF2] text-center shadow-sm">
          <p className="text-2xl font-black text-[#C77DA5]">{todaySessions.length}</p>
          <p className="text-xs text-[#9C7890] font-medium mt-0.5">Sessões hoje</p>
        </div>
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 border border-[#F8EAF2] text-center shadow-sm">
          <p className="text-2xl font-black text-[#C77DA5]">{Math.floor(todayMinutes / 60)}h{todayMinutes % 60 > 0 ? `${todayMinutes % 60}m` : ""}</p>
          <p className="text-xs text-[#9C7890] font-medium mt-0.5">Tempo focado</p>
        </div>
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 border border-[#F8EAF2] text-center shadow-sm">
          <p className="text-2xl font-black text-[#C77DA5]">{sessionCount}</p>
          <p className="text-xs text-[#9C7890] font-medium mt-0.5">Nesta sessão</p>
        </div>
      </div>

      {/* Timer Principal */}
      <div className={`bg-gradient-to-br ${cfg.bg} rounded-3xl p-8 text-white shadow-lg relative overflow-hidden`}>
        <div className="absolute -right-8 -bottom-8 text-9xl opacity-10 pointer-events-none select-none">{cfg.emoji}</div>

        {/* Seletor de Modo */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {(["foco", "pausa_curta", "pausa_longa"] as TimerMode[]).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => switchMode(m)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                mode === m
                  ? "bg-white/30 backdrop-blur-sm shadow-sm"
                  : "bg-white/10 hover:bg-white/20"
              }`}
            >
              {modeConfig[m].emoji} {modeConfig[m].label}
            </button>
          ))}
        </div>

        {/* Matéria */}
        <div className="mb-6">
          <label className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-1.5 block">
            Estudando:
          </label>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="bg-white/20 backdrop-blur-sm text-white text-sm font-semibold border border-white/30 rounded-2xl px-4 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/50 w-full sm:w-auto"
          >
            {SUBJECTS.map((s) => (
              <option key={s} value={s} className="text-[#75445F] bg-white">{s}</option>
            ))}
          </select>
        </div>

        {/* Círculo do Timer */}
        <div className="flex flex-col items-center gap-6">
          <div className="relative w-52 h-52">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="6" />
              <circle
                cx="50" cy="50" r="45" fill="none"
                stroke="rgba(255,255,255,0.9)" strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 45}`}
                strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-black tracking-tight tabular-nums">
                {minutes}:{seconds}
              </span>
              <span className="text-xs font-semibold text-white/70 mt-1 uppercase tracking-wider">
                {cfg.label}
              </span>
            </div>
          </div>

          {/* Controles */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handleReset}
              className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition-all cursor-pointer"
              title="Reiniciar"
            >
              <span className="text-sm">↺</span>
            </button>

            <button
              type="button"
              onClick={handleStartPause}
              className="w-20 h-20 rounded-full bg-white text-[#C77DA5] font-extrabold text-lg flex items-center justify-center shadow-lg hover:scale-105 transition-transform cursor-pointer"
              style={{ color: cfg.color }}
            >
              {isRunning ? "⏸" : "▶"}
            </button>

            <button
              type="button"
              onClick={handleSkip}
              className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition-all cursor-pointer"
              title="Pular"
            >
              <span className="text-sm">⏭</span>
            </button>
          </div>
        </div>

        {/* Progresso de sessões */}
        <div className="mt-6 flex items-center justify-between">
          <div className="flex gap-1.5">
            {Array.from({ length: settings.sessionsBeforeLongBreak }).map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full transition-all ${
                  i < (sessionCount % settings.sessionsBeforeLongBreak)
                    ? "bg-white shadow-sm"
                    : "bg-white/30"
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => setShowSettings(!showSettings)}
            className="text-xs text-white/70 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>⚙️</span> Configurar
          </button>
        </div>
      </div>

      {/* Painel de Configurações */}
      {showSettings && (
        <SettingsPanel settings={settings} onSave={saveSettings} onCancel={() => setShowSettings(false)} />
      )}

      {/* Histórico do Dia */}
      {todaySessions.length > 0 && (
        <section className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 border border-[#F8EAF2] shadow-sm">
          <h2 className="text-base font-bold text-[#75445F] flex items-center gap-2 mb-4">
            <span>📋</span> Histórico de Hoje
          </h2>
          <div className="space-y-2 max-h-64 overflow-y-auto scrollbar-thin">
            {todaySessions.map((session) => (
              <div
                key={session.id}
                className="flex items-center justify-between p-3 rounded-2xl bg-[#FFF9FC] border border-[#F8EAF2] text-sm"
              >
                <div className="flex items-center gap-2">
                  <span>🍅</span>
                  <span className="font-semibold text-[#75445F]">{session.subject}</span>
                </div>
                <div className="flex items-center gap-3 text-[#9C7890]">
                  <span className="text-xs">{session.durationMinutes} min</span>
                  <span className="text-xs">
                    {new Date(session.completedAt).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function SettingsPanel({
  settings,
  onSave,
  onCancel,
}: {
  settings: PomodoroSettings;
  onSave: (s: PomodoroSettings) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState({ ...settings });

  return (
    <section className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 border border-[#F8EAF2] shadow-sm space-y-4">
      <h2 className="text-base font-bold text-[#75445F] flex items-center gap-2">
        <span>⚙️</span> Configurações do Pomodoro
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { key: "focusMinutes" as const, label: "Foco (min)", min: 1, max: 90 },
          { key: "shortBreakMinutes" as const, label: "Pausa curta (min)", min: 1, max: 30 },
          { key: "longBreakMinutes" as const, label: "Pausa longa (min)", min: 5, max: 60 },
          { key: "sessionsBeforeLongBreak" as const, label: "Sessões p/ pausa longa", min: 2, max: 8 },
        ].map(({ key, label, min, max }) => (
          <div key={key}>
            <label className="block text-xs font-semibold text-[#75445F] mb-1">{label}</label>
            <input
              type="number"
              min={min}
              max={max}
              value={form[key]}
              onChange={(e) => setForm((prev) => ({ ...prev, [key]: Number(e.target.value) }))}
              className="w-full px-3 py-2 rounded-xl border border-[#F8EAF2] focus:outline-none focus:border-[#C77DA5] text-sm text-[#75445F] bg-white"
            />
          </div>
        ))}
      </div>
      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={() => onSave(form)}
          className="bg-[#C77DA5] hover:bg-[#b56e94] text-white px-5 py-2 rounded-2xl text-xs font-bold transition-all shadow-xs cursor-pointer"
        >
          Salvar
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-[#FFF9FC] hover:bg-[#F8EAF2] text-[#75445F] border border-[#F8EAF2] px-5 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer"
        >
          Cancelar
        </button>
      </div>
    </section>
  );
}
