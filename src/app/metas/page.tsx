"use client";

import { useState, useEffect } from "react";
import { WeeklyGoal, GOAL_COLORS } from "@/types/metas";

const METAS_KEY = "lumina_metas_v1";

function getWeekStart(date: Date): string {
  const d = new Date(date);
  const day = d.getDay(); // 0=Dom, 1=Seg
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  return d.toISOString().slice(0, 10);
}

function getWeekEnd(weekStart: string): string {
  const d = new Date(weekStart + "T12:00:00");
  d.setDate(d.getDate() + 6);
  return d.toISOString().slice(0, 10);
}

function loadMetas(): WeeklyGoal[] {
  try {
    const raw = localStorage.getItem(METAS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveMetas(metas: WeeklyGoal[]) {
  try { localStorage.setItem(METAS_KEY, JSON.stringify(metas)); } catch {}
}

const SUBJECTS = [
  "Matemática", "Biologia", "Química", "Física",
  "História", "Geografia", "Filosofia", "Sociologia",
  "Linguagens", "Redação", "Inglês", "Revisão Geral",
];

export default function MetasPage() {
  const [metas, setMetas] = useState<WeeklyGoal[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [currentWeek, setCurrentWeek] = useState("");
  const [viewWeek, setViewWeek] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [loggingId, setLoggingId] = useState<string | null>(null);
  const [logHours, setLogHours] = useState("0.5");

  const [form, setForm] = useState<{
    subject: string;
    goalDescription: string;
    targetHours: string;
    color: string;
  }>({
    subject: "Matemática",
    goalDescription: "",
    targetHours: "5",
    color: GOAL_COLORS[0].value,
  });

  useEffect(() => {
    const now = new Date();
    const ws = getWeekStart(now);
    setCurrentWeek(ws);
    setViewWeek(ws);
    setMetas(loadMetas());
    setIsLoaded(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.goalDescription.trim()) return;
    const newMeta: WeeklyGoal = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      weekStart: currentWeek,
      subject: form.subject,
      goalDescription: form.goalDescription,
      targetHours: Number(form.targetHours),
      loggedHours: 0,
      completed: false,
      color: form.color,
    };
    const updated = [newMeta, ...metas];
    setMetas(updated);
    saveMetas(updated);
    setShowForm(false);
    setForm({ subject: "Matemática", goalDescription: "", targetHours: "5", color: GOAL_COLORS[0].value });
  };

  const handleLogHours = (id: string) => {
    const hours = parseFloat(logHours);
    if (isNaN(hours) || hours <= 0) return;
    const updated = metas.map((m) => {
      if (m.id !== id) return m;
      const newLogged = Math.min(m.loggedHours + hours, m.targetHours * 1.5);
      return { ...m, loggedHours: newLogged, completed: newLogged >= m.targetHours };
    });
    setMetas(updated);
    saveMetas(updated);
    setLoggingId(null);
    setLogHours("0.5");
  };

  const handleDelete = (id: string) => {
    const updated = metas.filter((m) => m.id !== id);
    setMetas(updated);
    saveMetas(updated);
  };

  const weekMetas = metas.filter((m) => m.weekStart === viewWeek);
  const completedCount = weekMetas.filter((m) => m.completed).length;
  const totalTargetHours = weekMetas.reduce((a, m) => a + m.targetHours, 0);
  const totalLoggedHours = weekMetas.reduce((a, m) => a + m.loggedHours, 0);

  const prevWeek = () => {
    const d = new Date(viewWeek + "T12:00:00");
    d.setDate(d.getDate() - 7);
    setViewWeek(d.toISOString().slice(0, 10));
  };

  const nextWeek = () => {
    const d = new Date(viewWeek + "T12:00:00");
    d.setDate(d.getDate() + 7);
    setViewWeek(d.toISOString().slice(0, 10));
  };

  const formatWeekLabel = (weekStart: string) => {
    const start = new Date(weekStart + "T12:00:00");
    const end = new Date(getWeekEnd(weekStart) + "T12:00:00");
    const opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "short" };
    return `${start.toLocaleDateString("pt-BR", opts)} – ${end.toLocaleDateString("pt-BR", opts)}`;
  };

  if (!isLoaded) return null;

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-5xl mx-auto space-y-6 md:space-y-8">
      {/* Cabeçalho */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#75445F] flex items-center gap-2">
            <span>🎯</span> Metas Semanais
          </h1>
          <p className="text-[#9C7890] text-sm mt-1">
            Defina o que quer estudar nessa semana e registre suas horas focadas.
          </p>
        </div>
        {viewWeek === currentWeek && (
          <button
            type="button"
            onClick={() => setShowForm(!showForm)}
            className="bg-[#C77DA5] hover:bg-[#b56e94] text-white px-5 py-2.5 rounded-2xl text-sm font-semibold shadow-xs transition-all flex items-center gap-2 cursor-pointer shrink-0"
          >
            {showForm ? "✕ Cancelar" : "＋ Nova Meta"}
          </button>
        )}
      </header>

      {/* Navegação de Semana */}
      <div className="flex items-center justify-between bg-white/90 backdrop-blur-sm rounded-2xl px-5 py-3 border border-[#F8EAF2] shadow-sm">
        <button type="button" onClick={prevWeek} className="text-[#9C7890] hover:text-[#C77DA5] text-sm font-bold cursor-pointer transition-colors">
          ← Semana anterior
        </button>
        <div className="text-center">
          <p className="text-sm font-bold text-[#75445F]">{formatWeekLabel(viewWeek)}</p>
          {viewWeek === currentWeek && (
            <span className="text-[10px] bg-[#C77DA5] text-white px-2 py-0.5 rounded-full font-bold">Esta semana</span>
          )}
        </div>
        <button
          type="button"
          onClick={nextWeek}
          disabled={viewWeek >= currentWeek}
          className="text-[#9C7890] hover:text-[#C77DA5] text-sm font-bold cursor-pointer transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Próxima semana →
        </button>
      </div>

      {/* Stats da semana */}
      {weekMetas.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/90 rounded-2xl p-4 border border-[#F8EAF2] text-center shadow-sm">
            <p className="text-2xl font-black text-[#C77DA5]">{weekMetas.length}</p>
            <p className="text-xs text-[#9C7890] font-medium mt-0.5">Metas</p>
          </div>
          <div className="bg-white/90 rounded-2xl p-4 border border-[#F8EAF2] text-center shadow-sm">
            <p className="text-2xl font-black text-[#C77DA5]">{totalLoggedHours.toFixed(1)}h</p>
            <p className="text-xs text-[#9C7890] font-medium mt-0.5">de {totalTargetHours}h</p>
          </div>
          <div className="bg-white/90 rounded-2xl p-4 border border-[#F8EAF2] text-center shadow-sm">
            <p className="text-2xl font-black text-emerald-500">{completedCount}/{weekMetas.length}</p>
            <p className="text-xs text-[#9C7890] font-medium mt-0.5">Concluídas</p>
          </div>
        </div>
      )}

      {/* Formulário */}
      {showForm && viewWeek === currentWeek && (
        <section className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 border border-[#F8EAF2] shadow-sm space-y-4">
          <h2 className="text-base font-bold text-[#75445F] flex items-center gap-2">
            <span>✨</span> Nova Meta para esta Semana
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#75445F] mb-1">Matéria</label>
                <select
                  value={form.subject}
                  onChange={(e) => setForm((p) => ({ ...p, subject: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-2xl border border-[#F8EAF2] focus:outline-none focus:border-[#C77DA5] text-sm text-[#75445F] bg-white"
                >
                  {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#75445F] mb-1">Meta de horas</label>
                <input
                  type="number"
                  min={0.5}
                  max={40}
                  step={0.5}
                  value={form.targetHours}
                  onChange={(e) => setForm((p) => ({ ...p, targetHours: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-2xl border border-[#F8EAF2] focus:outline-none focus:border-[#C77DA5] text-sm text-[#75445F] bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#75445F] mb-1">Descrição da meta *</label>
              <input
                type="text"
                required
                placeholder="Ex: Terminar os exercícios de geometria plana..."
                value={form.goalDescription}
                onChange={(e) => setForm((p) => ({ ...p, goalDescription: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-2xl border border-[#F8EAF2] focus:outline-none focus:border-[#C77DA5] text-sm text-[#75445F] bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#75445F] mb-2">Cor da meta</label>
              <div className="flex gap-2">
                {GOAL_COLORS.map(({ label, value }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setForm((p) => ({ ...p, color: value }))}
                    title={label}
                    className={`w-7 h-7 rounded-full border-2 transition-all cursor-pointer ${
                      form.color === value ? "border-[#75445F] scale-110" : "border-transparent"
                    }`}
                    style={{ backgroundColor: value }}
                  />
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="bg-[#C77DA5] hover:bg-[#b56e94] text-white px-6 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              Criar Meta 🎯
            </button>
          </form>
        </section>
      )}

      {/* Lista de Metas */}
      {weekMetas.length > 0 ? (
        <div className="space-y-4">
          {weekMetas.map((meta) => {
            const pct = Math.min(100, (meta.loggedHours / meta.targetHours) * 100);
            return (
              <div
                key={meta.id}
                className={`bg-white/90 backdrop-blur-sm rounded-3xl p-5 border shadow-sm transition-all ${
                  meta.completed ? "border-emerald-100" : "border-[#F8EAF2]"
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span
                        className="text-xs font-bold text-white px-2.5 py-0.5 rounded-full"
                        style={{ backgroundColor: meta.color }}
                      >
                        {meta.subject}
                      </span>
                      {meta.completed && (
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                          ✓ Concluída!
                        </span>
                      )}
                    </div>
                    <p className="font-semibold text-sm text-[#75445F]">{meta.goalDescription}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDelete(meta.id)}
                    className="text-xs text-[#9C7890] hover:text-red-500 transition-colors cursor-pointer shrink-0"
                  >
                    🗑️
                  </button>
                </div>

                {/* Barra de Progresso */}
                <div className="mb-3">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-[#9C7890] font-medium">
                      {meta.loggedHours.toFixed(1)}h de {meta.targetHours}h
                    </span>
                    <span className="font-bold" style={{ color: meta.color }}>
                      {pct.toFixed(0)}%
                    </span>
                  </div>
                  <div className="h-2.5 bg-[#F8EAF2] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${pct}%`, backgroundColor: meta.color }}
                    />
                  </div>
                </div>

                {/* Registrar horas */}
                {viewWeek === currentWeek && (
                  loggingId === meta.id ? (
                    <div className="flex gap-2 items-center mt-2">
                      <input
                        type="number"
                        min={0.25}
                        max={12}
                        step={0.25}
                        value={logHours}
                        onChange={(e) => setLogHours(e.target.value)}
                        className="w-24 px-3 py-1.5 rounded-xl border border-[#F8EAF2] focus:outline-none focus:border-[#C77DA5] text-sm text-[#75445F] bg-white"
                        autoFocus
                      />
                      <span className="text-xs text-[#9C7890]">horas</span>
                      <button
                        type="button"
                        onClick={() => handleLogHours(meta.id)}
                        className="px-4 py-1.5 rounded-xl bg-[#C77DA5] text-white text-xs font-bold cursor-pointer hover:bg-[#b56e94] transition-all"
                      >
                        ＋ Adicionar
                      </button>
                      <button
                        type="button"
                        onClick={() => setLoggingId(null)}
                        className="text-xs text-[#9C7890] cursor-pointer hover:text-[#75445F]"
                      >
                        Cancelar
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setLoggingId(meta.id)}
                      className="text-xs font-semibold text-[#C77DA5] hover:text-[#75445F] transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <span>＋</span> Registrar horas estudadas
                    </button>
                  )
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 text-[#9C7890]">
          <p className="text-5xl mb-4">🎯</p>
          <p className="font-semibold text-[#75445F]">
            {viewWeek === currentWeek ? "Nenhuma meta para esta semana ainda" : "Nenhuma meta registrada nessa semana"}
          </p>
          <p className="text-sm mt-1">
            {viewWeek === currentWeek && "Que tal definir o que quer conquistar essa semana?"}
          </p>
        </div>
      )}
    </div>
  );
}
