"use client";

import { useState, useEffect } from "react";
import { SimuladoScore, SUBJECT_AREAS } from "@/types/evolucao";

const SCORES_KEY = "lumina_simulado_scores_v1";

function loadScores(): SimuladoScore[] {
  try {
    const raw = localStorage.getItem(SCORES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveScores(scores: SimuladoScore[]) {
  try { localStorage.setItem(SCORES_KEY, JSON.stringify(scores)); } catch {}
}

function getAreaColor(area: string): string {
  const map: Record<string, string> = {
    "linguagens": "#C77DA5",
    "humanas": "#A78BCA",
    "natureza": "#6FAE7B",
    "matematica": "#4A9BB5",
    "redacao": "#E8956A",
  };
  const key = area.toLowerCase().replace(/[^a-z]/g, "");
  return Object.entries(map).find(([k]) => key.includes(k))?.[1] ?? "#C77DA5";
}

const EXAM_NAMES = [
  "ENEM 2024", "ENEM 2023", "ENEM 2022", "ENEM 2021",
  "ENEM 2020", "Simulado Próprio", "Simulado Curso", "Outro",
];

type ScoreField = "linguagens" | "humanas" | "natureza" | "matematica" | "redacao";

const SCORE_FIELDS: { key: ScoreField; label: string; emoji: string }[] = [
  { key: "linguagens", label: "Linguagens", emoji: "📖" },
  { key: "humanas", label: "Ciências Humanas", emoji: "🌍" },
  { key: "natureza", label: "Ciências da Natureza", emoji: "🔬" },
  { key: "matematica", label: "Matemática", emoji: "📐" },
  { key: "redacao", label: "Redação", emoji: "✍️" },
];

export default function EvolucaoPage() {
  const [scores, setScores] = useState<SimuladoScore[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const [form, setForm] = useState<{
    examName: string;
    date: string;
    scores: Record<ScoreField, string>;
    notes: string;
  }>({
    examName: "ENEM 2024",
    date: "",
    scores: { linguagens: "", humanas: "", natureza: "", matematica: "", redacao: "" },
    notes: "",
  });

  useEffect(() => {
    setScores(loadScores());
    setIsLoaded(true);
    setForm((prev) => ({ ...prev, date: new Date().toISOString().slice(0, 10) }));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newScore: SimuladoScore = {
      id: crypto.randomUUID(),
      date: form.date,
      examName: form.examName,
      scores: {
        linguagens: form.scores.linguagens ? Number(form.scores.linguagens) : null,
        humanas: form.scores.humanas ? Number(form.scores.humanas) : null,
        natureza: form.scores.natureza ? Number(form.scores.natureza) : null,
        matematica: form.scores.matematica ? Number(form.scores.matematica) : null,
        redacao: form.scores.redacao ? Number(form.scores.redacao) : null,
      },
      notes: form.notes || undefined,
    };
    const updated = [newScore, ...scores].sort((a, b) => b.date.localeCompare(a.date));
    setScores(updated);
    saveScores(updated);
    setShowForm(false);
    setForm({
      examName: "ENEM 2024",
      date: new Date().toISOString().slice(0, 10),
      scores: { linguagens: "", humanas: "", natureza: "", matematica: "", redacao: "" },
      notes: "",
    });
  };

  const handleDelete = (id: string) => {
    const updated = scores.filter((s) => s.id !== id);
    setScores(updated);
    saveScores(updated);
  };

  // Calcula médias para o gráfico de barras simples
  const areaAverages: Record<ScoreField, { values: number[]; avg: number }> = {
    linguagens: { values: [], avg: 0 },
    humanas: { values: [], avg: 0 },
    natureza: { values: [], avg: 0 },
    matematica: { values: [], avg: 0 },
    redacao: { values: [], avg: 0 },
  };
  for (const s of scores) {
    for (const field of SCORE_FIELDS) {
      const val = s.scores[field.key];
      if (val !== null) areaAverages[field.key].values.push(val);
    }
  }
  for (const field of SCORE_FIELDS) {
    const vals = areaAverages[field.key].values;
    areaAverages[field.key].avg = vals.length > 0 ? vals.reduce((a, b) => a + b, 0) / vals.length : 0;
  }

  const latestScore = scores[0];
  const maxScore = 1000;

  if (!isLoaded) return null;

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-5xl mx-auto space-y-6 md:space-y-8">
      {/* Cabeçalho */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#75445F] flex items-center gap-2">
            <span>📊</span> Evolução ENEM
          </h1>
          <p className="text-[#9C7890] text-sm mt-1">
            Acompanhe sua evolução por simulado e identifique onde melhorar.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowForm(!showForm)}
          className="bg-[#C77DA5] hover:bg-[#b56e94] text-white px-5 py-2.5 rounded-2xl text-sm font-semibold shadow-xs transition-all flex items-center gap-2 cursor-pointer shrink-0"
        >
          <span>{showForm ? "✕ Cancelar" : "＋ Registrar Simulado"}</span>
        </button>
      </header>

      {/* Formulário de Novo Simulado */}
      {showForm && (
        <section className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 border border-[#F8EAF2] shadow-sm">
          <h2 className="text-base font-bold text-[#75445F] mb-4 flex items-center gap-2">
            <span>📝</span> Novo Simulado / Prova
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#75445F] mb-1">Prova / Simulado</label>
                <select
                  value={form.examName}
                  onChange={(e) => setForm((p) => ({ ...p, examName: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-2xl border border-[#F8EAF2] focus:outline-none focus:border-[#C77DA5] text-sm text-[#75445F] bg-white"
                >
                  {EXAM_NAMES.map((n) => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#75445F] mb-1">Data</label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-2xl border border-[#F8EAF2] focus:outline-none focus:border-[#C77DA5] text-sm text-[#75445F] bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {SCORE_FIELDS.map(({ key, label, emoji }) => (
                <div key={key}>
                  <label className="block text-xs font-semibold text-[#75445F] mb-1">
                    {emoji} {label}
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={1000}
                    step={0.1}
                    placeholder="0–1000"
                    value={form.scores[key]}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, scores: { ...p.scores, [key]: e.target.value } }))
                    }
                    className="w-full px-3 py-2 rounded-xl border border-[#F8EAF2] focus:outline-none focus:border-[#C77DA5] text-sm text-[#75445F] bg-white"
                  />
                </div>
              ))}
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#75445F] mb-1">Observações (opcional)</label>
              <input
                type="text"
                placeholder="Ex: Fui bem em Humanas, preciso melhorar Matemática..."
                value={form.notes}
                onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-2xl border border-[#F8EAF2] focus:outline-none focus:border-[#C77DA5] text-sm text-[#75445F] bg-white"
              />
            </div>

            <button
              type="submit"
              className="bg-[#C77DA5] hover:bg-[#b56e94] text-white px-6 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              Salvar Simulado 💗
            </button>
          </form>
        </section>
      )}

      {/* Gráfico de Médias por Área */}
      {scores.length > 0 && (
        <section className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 border border-[#F8EAF2] shadow-sm">
          <h2 className="text-base font-bold text-[#75445F] mb-5 flex items-center gap-2">
            <span>📈</span> Média por Área ({scores.length} simulado{scores.length > 1 ? "s" : ""})
          </h2>
          <div className="space-y-3">
            {SCORE_FIELDS.map(({ key, label, emoji }) => {
              const avg = areaAverages[key].avg;
              const pct = (avg / maxScore) * 100;
              const color = getAreaColor(key);
              return (
                <div key={key}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-[#75445F]">{emoji} {label}</span>
                    <span className="font-extrabold" style={{ color }}>
                      {avg > 0 ? avg.toFixed(1) : "—"}
                    </span>
                  </div>
                  <div className="h-2.5 bg-[#F8EAF2] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${pct}%`, backgroundColor: color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {latestScore && (
            <div className="mt-5 pt-4 border-t border-[#F8EAF2] text-xs text-[#9C7890]">
              <span className="font-semibold">Último simulado:</span>{" "}
              {latestScore.examName} em{" "}
              {new Date(latestScore.date + "T12:00:00").toLocaleDateString("pt-BR")}
              {latestScore.notes && (
                <p className="mt-1 italic">&quot;{latestScore.notes}&quot;</p>
              )}
            </div>
          )}
        </section>
      )}

      {/* Histórico de Simulados */}
      {scores.length > 0 ? (
        <section className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 border border-[#F8EAF2] shadow-sm">
          <h2 className="text-base font-bold text-[#75445F] mb-4 flex items-center gap-2">
            <span>📋</span> Histórico de Simulados
          </h2>
          <div className="space-y-3">
            {scores.map((score) => {
              const vals = Object.values(score.scores).filter((v): v is number => v !== null);
              const media = vals.length > 0 ? vals.reduce((a, b) => a + b, 0) / vals.length : null;
              return (
                <div
                  key={score.id}
                  className="p-4 rounded-2xl border border-[#F8EAF2] bg-[#FFF9FC] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="font-bold text-sm text-[#75445F]">{score.examName}</span>
                      <span className="text-xs text-[#9C7890]">
                        {new Date(score.date + "T12:00:00").toLocaleDateString("pt-BR")}
                      </span>
                      {media && (
                        <span className="text-xs bg-[#F8EAF2] text-[#C77DA5] font-bold px-2 py-0.5 rounded-full">
                          Média: {media.toFixed(1)}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {SCORE_FIELDS.map(({ key, emoji }) =>
                        score.scores[key] !== null ? (
                          <span key={key} className="text-xs text-[#75445F] bg-white border border-[#F8EAF2] px-2.5 py-1 rounded-xl font-medium">
                            {emoji} {score.scores[key]?.toFixed(0)}
                          </span>
                        ) : null
                      )}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDelete(score.id)}
                    className="text-xs text-[#9C7890] hover:text-red-500 transition-colors cursor-pointer shrink-0"
                  >
                    🗑️
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      ) : (
        <div className="text-center py-16 text-[#9C7890]">
          <p className="text-5xl mb-4">📊</p>
          <p className="font-semibold text-[#75445F]">Nenhum simulado registrado ainda</p>
          <p className="text-sm mt-1">Adicione suas notas para acompanhar sua evolução!</p>
        </div>
      )}
    </div>
  );
}
