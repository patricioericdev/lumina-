"use client";

import { useState, useEffect } from "react";
import { ErroItem, ERROR_SUBJECTS, ERROR_TAGS } from "@/types/erros";

const ERROS_KEY = "lumina_erros_v1";

function loadErros(): ErroItem[] {
  try {
    const raw = localStorage.getItem(ERROS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveErros(erros: ErroItem[]) {
  try { localStorage.setItem(ERROS_KEY, JSON.stringify(erros)); } catch {}
}

export default function ErrosPage() {
  const [erros, setErros] = useState<ErroItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [filterSubject, setFilterSubject] = useState<string>("Todas");
  const [filterReviewed, setFilterReviewed] = useState<"todas" | "pendentes" | "revisadas">("todas");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const [form, setForm] = useState({
    subject: "Matemática",
    topic: "",
    question: "",
    myAnswer: "",
    correctAnswer: "",
    whyWrong: "",
    tags: [] as string[],
    examSource: "",
  });

  useEffect(() => {
    setErros(loadErros());
    setIsLoaded(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.topic.trim() || !form.question.trim()) return;

    const newErro: ErroItem = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      date: new Date().toISOString().slice(0, 10),
      subject: form.subject,
      topic: form.topic,
      question: form.question,
      myAnswer: form.myAnswer,
      correctAnswer: form.correctAnswer,
      whyWrong: form.whyWrong,
      tags: form.tags,
      reviewed: false,
      reviewCount: 0,
      nextReviewDate: null,
      examSource: form.examSource || undefined,
    };
    const updated = [newErro, ...erros];
    setErros(updated);
    saveErros(updated);
    setShowForm(false);
    setForm({ subject: "Matemática", topic: "", question: "", myAnswer: "", correctAnswer: "", whyWrong: "", tags: [], examSource: "" });
  };

  const toggleReviewed = (id: string) => {
    const updated = erros.map((e) =>
      e.id === id
        ? { ...e, reviewed: !e.reviewed, reviewCount: e.reviewed ? e.reviewCount : e.reviewCount + 1 }
        : e
    );
    setErros(updated);
    saveErros(updated);
  };

  const handleDelete = (id: string) => {
    const updated = erros.filter((e) => e.id !== id);
    setErros(updated);
    saveErros(updated);
  };

  const toggleTag = (tag: string) => {
    setForm((prev) =>
      prev.tags.includes(tag)
        ? { ...prev, tags: prev.tags.filter((t) => t !== tag) }
        : { ...prev, tags: [...prev.tags, tag] }
    );
  };

  const filtered = erros.filter((e) => {
    const matchSub = filterSubject === "Todas" || e.subject === filterSubject;
    const matchRev =
      filterReviewed === "todas" ||
      (filterReviewed === "pendentes" && !e.reviewed) ||
      (filterReviewed === "revisadas" && e.reviewed);
    const matchSearch =
      !searchTerm ||
      e.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.subject.toLowerCase().includes(searchTerm.toLowerCase());
    return matchSub && matchRev && matchSearch;
  });

  const pendingCount = erros.filter((e) => !e.reviewed).length;

  if (!isLoaded) return null;

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-5xl mx-auto space-y-6 md:space-y-8">
      {/* Cabeçalho */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#75445F] flex items-center gap-2">
            <span>📝</span> Caderno de Erros
          </h1>
          <p className="text-[#9C7890] text-sm mt-1">
            Registre o que errou, entenda o porquê e revise antes de errar de novo.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowForm(!showForm)}
          className="bg-[#C77DA5] hover:bg-[#b56e94] text-white px-5 py-2.5 rounded-2xl text-sm font-semibold shadow-xs transition-all flex items-center gap-2 cursor-pointer shrink-0"
        >
          {showForm ? "✕ Cancelar" : "＋ Registrar Erro"}
        </button>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white/90 rounded-2xl p-4 border border-[#F8EAF2] text-center shadow-sm">
          <p className="text-2xl font-black text-[#C77DA5]">{erros.length}</p>
          <p className="text-xs text-[#9C7890] font-medium mt-0.5">Total de erros</p>
        </div>
        <div className="bg-white/90 rounded-2xl p-4 border border-[#F8EAF2] text-center shadow-sm">
          <p className="text-2xl font-black text-orange-500">{pendingCount}</p>
          <p className="text-xs text-[#9C7890] font-medium mt-0.5">Para revisar</p>
        </div>
        <div className="bg-white/90 rounded-2xl p-4 border border-[#F8EAF2] text-center shadow-sm">
          <p className="text-2xl font-black text-emerald-500">{erros.length - pendingCount}</p>
          <p className="text-xs text-[#9C7890] font-medium mt-0.5">Revisados</p>
        </div>
      </div>

      {/* Formulário */}
      {showForm && (
        <section className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 border border-[#F8EAF2] shadow-sm space-y-4">
          <h2 className="text-base font-bold text-[#75445F] flex items-center gap-2">
            <span>✏️</span> Registrar Novo Erro
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#75445F] mb-1">Matéria *</label>
                <select
                  value={form.subject}
                  onChange={(e) => setForm((p) => ({ ...p, subject: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-2xl border border-[#F8EAF2] focus:outline-none focus:border-[#C77DA5] text-sm text-[#75445F] bg-white"
                >
                  {ERROR_SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#75445F] mb-1">Tópico / Assunto *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Funções quadráticas, Célula..."
                  value={form.topic}
                  onChange={(e) => setForm((p) => ({ ...p, topic: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-2xl border border-[#F8EAF2] focus:outline-none focus:border-[#C77DA5] text-sm text-[#75445F] bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#75445F] mb-1">Enunciado / Questão *</label>
              <textarea
                required
                rows={3}
                placeholder="Descreva a questão ou o contexto do erro..."
                value={form.question}
                onChange={(e) => setForm((p) => ({ ...p, question: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-2xl border border-[#F8EAF2] focus:outline-none focus:border-[#C77DA5] text-sm text-[#75445F] bg-white resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#75445F] mb-1">Minha resposta errada</label>
                <input
                  type="text"
                  placeholder="O que eu respondi..."
                  value={form.myAnswer}
                  onChange={(e) => setForm((p) => ({ ...p, myAnswer: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-2xl border border-[#F8EAF2] focus:outline-none focus:border-[#C77DA5] text-sm text-[#75445F] bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#75445F] mb-1">Resposta correta</label>
                <input
                  type="text"
                  placeholder="A resposta certa era..."
                  value={form.correctAnswer}
                  onChange={(e) => setForm((p) => ({ ...p, correctAnswer: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-2xl border border-[#F8EAF2] focus:outline-none focus:border-[#C77DA5] text-sm text-[#75445F] bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#75445F] mb-1">Por que errei?</label>
              <textarea
                rows={2}
                placeholder="Reflita: falta de atenção, não sabia o conceito, interpretei errado..."
                value={form.whyWrong}
                onChange={(e) => setForm((p) => ({ ...p, whyWrong: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-2xl border border-[#F8EAF2] focus:outline-none focus:border-[#C77DA5] text-sm text-[#75445F] bg-white resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#75445F] mb-2">Tags rápidas</label>
              <div className="flex flex-wrap gap-2">
                {ERROR_TAGS.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all cursor-pointer border ${
                      form.tags.includes(tag)
                        ? "bg-[#C77DA5] text-white border-[#C77DA5]"
                        : "bg-[#FFF9FC] text-[#75445F] border-[#F8EAF2] hover:border-[#C77DA5]"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#75445F] mb-1">Fonte (opcional)</label>
              <input
                type="text"
                placeholder="Ex: ENEM 2023 - Dia 1, Simulado Curso..."
                value={form.examSource}
                onChange={(e) => setForm((p) => ({ ...p, examSource: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-2xl border border-[#F8EAF2] focus:outline-none focus:border-[#C77DA5] text-sm text-[#75445F] bg-white"
              />
            </div>

            <button
              type="submit"
              className="bg-[#C77DA5] hover:bg-[#b56e94] text-white px-6 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              Salvar Erro 💗
            </button>
          </form>
        </section>
      )}

      {/* Filtros */}
      {erros.length > 0 && (
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="🔍 Buscar por tópico ou matéria..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-2xl border border-[#F8EAF2] focus:outline-none focus:border-[#C77DA5] text-sm text-[#75445F] bg-white/90"
          />
          <select
            value={filterSubject}
            onChange={(e) => setFilterSubject(e.target.value)}
            className="px-4 py-2.5 rounded-2xl border border-[#F8EAF2] focus:outline-none focus:border-[#C77DA5] text-sm text-[#75445F] bg-white/90"
          >
            <option value="Todas">Todas as matérias</option>
            {ERROR_SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <div className="flex gap-2">
            {(["todas", "pendentes", "revisadas"] as const).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilterReviewed(f)}
                className={`px-3 py-2 rounded-2xl text-xs font-semibold transition-all cursor-pointer capitalize border ${
                  filterReviewed === f
                    ? "bg-[#C77DA5] text-white border-[#C77DA5]"
                    : "bg-white/90 text-[#75445F] border-[#F8EAF2] hover:border-[#C77DA5]"
                }`}
              >
                {f === "todas" ? "Todas" : f === "pendentes" ? "Para revisar" : "Revisadas"}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Lista de Erros */}
      {filtered.length > 0 ? (
        <div className="space-y-3">
          {filtered.map((erro) => (
            <div
              key={erro.id}
              className={`bg-white/90 backdrop-blur-sm rounded-3xl border shadow-sm transition-all ${
                erro.reviewed ? "border-emerald-100 opacity-75" : "border-[#F8EAF2]"
              }`}
            >
              <div
                className="p-5 cursor-pointer"
                onClick={() => setExpandedId(expandedId === erro.id ? null : erro.id)}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-white bg-[#C77DA5] px-2.5 py-0.5 rounded-full">
                        {erro.subject}
                      </span>
                      {erro.reviewed && (
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                          ✓ Revisado
                        </span>
                      )}
                      {erro.examSource && (
                        <span className="text-xs text-[#9C7890] bg-[#FFF9FC] border border-[#F8EAF2] px-2.5 py-0.5 rounded-full">
                          {erro.examSource}
                        </span>
                      )}
                    </div>
                    <p className="font-bold text-sm text-[#75445F]">{erro.topic}</p>
                    <p className="text-xs text-[#9C7890] mt-0.5 line-clamp-2">{erro.question}</p>
                    {erro.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {erro.tags.map((tag) => (
                          <span key={tag} className="text-[10px] bg-[#F8EAF2] text-[#9C7890] px-2 py-0.5 rounded-full font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <span className="text-[#9C7890] text-xs shrink-0">
                    {expandedId === erro.id ? "▲" : "▼"}
                  </span>
                </div>
              </div>

              {expandedId === erro.id && (
                <div className="px-5 pb-5 border-t border-[#F8EAF2] pt-4 space-y-3">
                  {erro.myAnswer && (
                    <div className="text-xs">
                      <span className="font-semibold text-red-500">Minha resposta: </span>
                      <span className="text-[#75445F]">{erro.myAnswer}</span>
                    </div>
                  )}
                  {erro.correctAnswer && (
                    <div className="text-xs">
                      <span className="font-semibold text-emerald-600">Resposta correta: </span>
                      <span className="text-[#75445F]">{erro.correctAnswer}</span>
                    </div>
                  )}
                  {erro.whyWrong && (
                    <div className="text-xs">
                      <span className="font-semibold text-[#C77DA5]">Por que errei: </span>
                      <span className="text-[#75445F]">{erro.whyWrong}</span>
                    </div>
                  )}
                  <div className="flex gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => toggleReviewed(erro.id)}
                      className={`flex-1 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer border ${
                        erro.reviewed
                          ? "bg-[#FFF9FC] text-[#75445F] border-[#F8EAF2]"
                          : "bg-emerald-500 text-white border-emerald-500 hover:bg-emerald-600"
                      }`}
                    >
                      {erro.reviewed ? "↩ Marcar pendente" : "✓ Marcar como revisado"}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(erro.id)}
                      className="px-4 py-2 rounded-2xl text-xs text-[#9C7890] hover:text-red-500 border border-[#F8EAF2] bg-[#FFF9FC] transition-colors cursor-pointer"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-[#9C7890]">
          <p className="text-5xl mb-4">📝</p>
          <p className="font-semibold text-[#75445F]">
            {erros.length === 0 ? "Nenhum erro registrado ainda" : "Nenhum erro encontrado com esses filtros"}
          </p>
          <p className="text-sm mt-1">
            {erros.length === 0
              ? "Registre o que você erra para nunca mais errar igual!"
              : "Tente ajustar os filtros de busca."}
          </p>
        </div>
      )}
    </div>
  );
}
