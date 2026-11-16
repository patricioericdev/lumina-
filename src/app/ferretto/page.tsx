"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FERRETTO_TEACHERS,
  FERRETTO_CURATED_PLAYLISTS,
} from "@/data/ferrettoData";
import { FerrettoClassLog, FerrettoCuratedPlaylist } from "@/types/ferretto";

const STORAGE_KEY = "lumina_ferretto_tracker_v1";

const DEFAULT_SAMPLE_LOGS: FerrettoClassLog[] = [
  {
    id: "sample-1",
    course: "Extensivo ENEM 2027",
    subject: "Matemática",
    teacher: "Prof. Ferretto",
    moduleName: "Módulo 01 — Matemática Básica",
    lessonTitle: "Aula 04 — Frações e Operações Fundamentais",
    completed: true,
    completedAt: "2026-11-10T14:30:00.000Z",
    notes: "Revisar simplificação de fração e mmc antes dos exercícios.",
    lessonUrl: "https://www.professorferretto.com.br",
  },
  {
    id: "sample-2",
    course: "Extensivo ENEM 2027",
    subject: "Química",
    teacher: "Prof. Michel",
    moduleName: "Módulo 02 — Estrutura Atômica & Tabela Periódica",
    lessonTitle: "Aula 02 — Raio Atômico e Eletronegatividade",
    completed: false,
    notes: "Macetes de raio: cresce para baixo e para a esquerda.",
    lessonUrl: "https://www.professorferretto.com.br",
  },
  {
    id: "sample-3",
    course: "Extensivo ENEM 2027",
    subject: "Física",
    teacher: "Prof. Coelho",
    moduleName: "Módulo 03 — Cinemática Escalar",
    lessonTitle: "Aula 01 — Conceitos Iniciais e Velocidade Média",
    completed: true,
    completedAt: "2026-11-12T16:00:00.000Z",
    notes: "Lembrar de converter km/h para m/s dividindo por 3,6.",
    lessonUrl: "https://www.professorferretto.com.br",
  },
];

export default function FerrettoHubPage() {
  const [activeTab, setActiveTab] = useState<"aulas" | "playlists" | "professores">("aulas");
  const [classLogs, setClassLogs] = useState<FerrettoClassLog[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<string>("Todas");

  // Form de nova aula
  const [showAddForm, setShowAddForm] = useState(false);
  const [formSubject, setFormSubject] = useState("Matemática");
  const [formTeacher, setFormTeacher] = useState("Prof. Ferretto");
  const [formCourse, setFormCourse] = useState("Extensivo ENEM 2027");
  const [formModuleName, setFormModuleName] = useState("");
  const [formLessonTitle, setFormLessonTitle] = useState("");
  const [formLessonUrl, setFormLessonUrl] = useState("");
  const [formNotes, setFormNotes] = useState("");

  // Filtro de status de aulas
  const [statusFilter, setStatusFilter] = useState<"todas" | "pendentes" | "concluidas">("todas");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setClassLogs(JSON.parse(stored));
      } else {
        setClassLogs(DEFAULT_SAMPLE_LOGS);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_SAMPLE_LOGS));
      }
    } catch {
      setClassLogs(DEFAULT_SAMPLE_LOGS);
    }
    setIsLoaded(true);
  }, []);

  const saveLogs = (logs: FerrettoClassLog[]) => {
    setClassLogs(logs);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
    } catch {}
  };

  const handleToggleComplete = (id: string) => {
    const updated = classLogs.map((log) => {
      if (log.id === id) {
        const nextCompleted = !log.completed;
        return {
          ...log,
          completed: nextCompleted,
          completedAt: nextCompleted ? new Date().toISOString() : undefined,
        };
      }
      return log;
    });
    saveLogs(updated);
  };

  const handleDeleteLog = (id: string) => {
    const updated = classLogs.filter((log) => log.id !== id);
    saveLogs(updated);
  };

  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formLessonTitle.trim()) return;

    const newLog: FerrettoClassLog = {
      id: "ferretto-" + Date.now(),
      course: formCourse.trim() || "Extensivo ENEM",
      subject: formSubject,
      teacher: formTeacher,
      moduleName: formModuleName.trim() || "Módulo Geral",
      lessonTitle: formLessonTitle.trim(),
      completed: false,
      lessonUrl: formLessonUrl.trim() || undefined,
      notes: formNotes.trim() || undefined,
    };

    const updated = [newLog, ...classLogs];
    saveLogs(updated);

    setFormLessonTitle("");
    setFormModuleName("");
    setFormLessonUrl("");
    setFormNotes("");
    setShowAddForm(false);
  };

  const handleAddPlaylistToLogs = (playlist: FerrettoCuratedPlaylist) => {
    const newLog: FerrettoClassLog = {
      id: "ferretto-" + Date.now(),
      course: "Curso Online",
      subject: playlist.subject,
      teacher: playlist.teacher,
      moduleName: playlist.title,
      lessonTitle: "Aula 01 — Introdução & Conceitos Fundamentais",
      completed: false,
      lessonUrl: playlist.url,
      notes: `Tópicos: ${playlist.topicsCovered.join(", ")}`,
    };
    const updated = [newLog, ...classLogs];
    saveLogs(updated);
    setActiveTab("aulas");
  };

  // Estatísticas do rastreador
  const totalClasses = classLogs.length;
  const completedClasses = classLogs.filter((c) => c.completed).length;
  const progressPercent = totalClasses > 0 ? Math.round((completedClasses / totalClasses) * 100) : 0;

  // Filtragem
  const filteredLogs = classLogs.filter((log) => {
    const matchSubject = selectedSubject === "Todas" || log.subject === selectedSubject;
    const matchStatus =
      statusFilter === "todas"
        ? true
        : statusFilter === "concluidas"
        ? log.completed
        : !log.completed;
    const matchSearch =
      searchQuery === "" ||
      log.lessonTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.moduleName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.teacher.toLowerCase().includes(searchQuery.toLowerCase());
    return matchSubject && matchStatus && matchSearch;
  });

  const filteredPlaylists = FERRETTO_CURATED_PLAYLISTS.filter((p) => {
    const matchSubject = selectedSubject === "Todas" || p.subject === selectedSubject;
    const matchSearch =
      searchQuery === "" ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.teacher.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.topicsCovered.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchSubject && matchSearch;
  });

  if (!isLoaded) return null;

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-6xl mx-auto space-y-6 md:space-y-8">
      {/* ── Banner Principal de Conexão com a Plataforma Ferretto ── */}
      <section className="bg-gradient-to-br from-[#1C1527] via-[#2D1B36] to-[#451B3B] text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-[#5A2C52]">
        <div className="absolute -right-10 -bottom-10 text-9xl opacity-10 select-none pointer-events-none">
          🎓
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold text-pink-200 border border-white/15">
              <span>⚡</span>
              <span>Central Integrada do Estudante Ferretto</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
              Conexão Professor Ferretto
            </h1>

            <p className="text-sm text-pink-100/80 leading-relaxed font-normal">
              Acompanhe seu cronograma de aulas, acesse diretamente a plataforma do Ferretto e tenha as melhores playlists gratuitas de Matemática, Física, Química e Biologia organizadas para o seu ENEM 2027.
            </p>
          </div>

          {/* Links e Acesso Direto */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <a
              href="https://app.professorferretto.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#C77DA5] hover:bg-[#d88eb6] text-white px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 hover:scale-102 cursor-pointer"
            >
              <span>🚀</span>
              <span>Abrir Portal do Aluno Ferretto ↗</span>
            </a>

            <a
              href="https://www.professorferretto.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-5 py-2.5 rounded-2xl text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>🌐</span>
              <span>Site Oficial Ferretto ↗</span>
            </a>
          </div>
        </div>

        {/* Barra de Progresso Rápida */}
        <div className="mt-6 pt-5 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-pink-200">Seu Progresso Ferretto:</span>
            <div className="w-40 sm:w-56 bg-white/15 rounded-full h-2.5 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-pink-400 to-rose-300 rounded-full transition-all duration-700"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="font-extrabold text-white">{progressPercent}%</span>
          </div>

          <div className="text-pink-200/90 font-medium">
            {completedClasses} de {totalClasses} aulas registradas concluídas
          </div>
        </div>
      </section>

      {/* ── Navegação entre Abas do Hub Ferretto ── */}
      <div className="flex items-center gap-2 border-b border-[#F8EAF2] pb-3 overflow-x-auto scrollbar-none">
        <button
          type="button"
          onClick={() => setActiveTab("aulas")}
          className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === "aulas"
              ? "bg-[#C77DA5] text-white shadow-xs"
              : "bg-white text-[#75445F] hover:bg-[#FFF9FC] border border-[#F8EAF2]"
          }`}
        >
          <span>📋</span>
          <span>Meu Rastreamento de Aulas</span>
          <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
            {classLogs.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("playlists")}
          className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === "playlists"
              ? "bg-[#C77DA5] text-white shadow-xs"
              : "bg-white text-[#75445F] hover:bg-[#FFF9FC] border border-[#F8EAF2]"
          }`}
        >
          <span>📺</span>
          <span>Playlists Oficiais Gratuitas</span>
          <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
            {FERRETTO_CURATED_PLAYLISTS.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("professores")}
          className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === "professores"
              ? "bg-[#C77DA5] text-white shadow-xs"
              : "bg-white text-[#75445F] hover:bg-[#FFF9FC] border border-[#F8EAF2]"
          }`}
        >
          <span>🧑‍🏫</span>
          <span>Equipe de Professores</span>
          <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
            {FERRETTO_TEACHERS.length}
          </span>
        </button>
      </div>

      {/* ── ABA 1: MEU RASTREAMENTO DE AULAS FERRETTO ── */}
      {activeTab === "aulas" && (
        <div className="space-y-6">
          {/* Barra de Filtros e Adicionar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-1">
              <input
                type="text"
                placeholder="🔍 Buscar aula, módulo ou professor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:max-w-xs px-4 py-2.5 rounded-2xl border border-[#F8EAF2] text-xs sm:text-sm text-[#75445F] bg-white focus:outline-none focus:border-[#C77DA5]"
              />

              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="px-3 py-2.5 rounded-2xl border border-[#F8EAF2] text-xs font-semibold text-[#75445F] bg-white focus:outline-none focus:border-[#C77DA5]"
              >
                <option value="Todas">Todas as Matérias</option>
                <option value="Matemática">Matemática</option>
                <option value="Física">Física</option>
                <option value="Química">Química</option>
                <option value="Biologia">Biologia</option>
                <option value="Humanas">Humanas</option>
                <option value="Redação">Redação</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex bg-white rounded-2xl p-1 border border-[#F8EAF2] text-xs font-medium">
                {(["todas", "pendentes", "concluidas"] as const).map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setStatusFilter(filter)}
                    className={`px-3 py-1.5 rounded-xl capitalize transition-all cursor-pointer ${
                      statusFilter === filter
                        ? "bg-[#C77DA5] text-white font-bold"
                        : "text-[#9C7890] hover:text-[#75445F]"
                    }`}
                  >
                    {filter === "todas" ? "Todas" : filter === "pendentes" ? "Em Aberto" : "Concluídas"}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setShowAddForm(!showAddForm)}
                className="bg-[#C77DA5] hover:bg-[#b56e94] text-white px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold shadow-xs transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <span>{showAddForm ? "✕ Fechar" : "＋ Anotar Aula"}</span>
              </button>
            </div>
          </div>

          {/* Form para adicionar aula do Ferretto */}
          {showAddForm && (
            <form
              onSubmit={handleAddLog}
              className="bg-white rounded-3xl p-6 border border-[#F8EAF2] shadow-sm space-y-4 animate-in fade-in"
            >
              <h2 className="text-base font-bold text-[#75445F] flex items-center gap-2">
                <span>📝</span> Anotar Nova Aula da Plataforma Ferretto
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#75445F] mb-1">
                    Disciplina *
                  </label>
                  <select
                    value={formSubject}
                    onChange={(e) => setFormSubject(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#F8EAF2] text-xs text-[#75445F] bg-white focus:outline-none focus:border-[#C77DA5]"
                  >
                    <option value="Matemática">Matemática</option>
                    <option value="Física">Física</option>
                    <option value="Química">Química</option>
                    <option value="Biologia">Biologia</option>
                    <option value="Humanas">Humanas</option>
                    <option value="Redação">Redação</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#75445F] mb-1">
                    Professor
                  </label>
                  <select
                    value={formTeacher}
                    onChange={(e) => setFormTeacher(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#F8EAF2] text-xs text-[#75445F] bg-white focus:outline-none focus:border-[#C77DA5]"
                  >
                    <option value="Prof. Ferretto">Prof. Ferretto</option>
                    <option value="Prof. Michel">Prof. Michel</option>
                    <option value="Prof. Coelho">Prof. Coelho</option>
                    <option value="Prof. Landim">Prof. Landim</option>
                    <option value="Prof. Geraldo / João Paulo">Prof. Geraldo / João Paulo</option>
                    <option value="Outro Professor">Outro Professor</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#75445F] mb-1">
                    Curso / Turma
                  </label>
                  <input
                    type="text"
                    value={formCourse}
                    onChange={(e) => setFormCourse(e.target.value)}
                    placeholder="Ex: Extensivo ENEM 2027"
                    className="w-full px-3 py-2 rounded-xl border border-[#F8EAF2] text-xs text-[#75445F] bg-white focus:outline-none focus:border-[#C77DA5]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#75445F] mb-1">
                    Módulo da Plataforma *
                  </label>
                  <input
                    type="text"
                    required
                    value={formModuleName}
                    onChange={(e) => setFormModuleName(e.target.value)}
                    placeholder="Ex: Módulo 04 — Geometria Plana"
                    className="w-full px-3 py-2 rounded-xl border border-[#F8EAF2] text-xs text-[#75445F] bg-white focus:outline-none focus:border-[#C77DA5]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#75445F] mb-1">
                    Título da Aula *
                  </label>
                  <input
                    type="text"
                    required
                    value={formLessonTitle}
                    onChange={(e) => setFormLessonTitle(e.target.value)}
                    placeholder="Ex: Aula 03 — Semelhança de Triângulos"
                    className="w-full px-3 py-2 rounded-xl border border-[#F8EAF2] text-xs text-[#75445F] bg-white focus:outline-none focus:border-[#C77DA5]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#75445F] mb-1">
                    Link Direto da Aula (Opcional)
                  </label>
                  <input
                    type="url"
                    value={formLessonUrl}
                    onChange={(e) => setFormLessonUrl(e.target.value)}
                    placeholder="https://app.professorferretto.com.br/..."
                    className="w-full px-3 py-2 rounded-xl border border-[#F8EAF2] text-xs text-[#75445F] bg-white focus:outline-none focus:border-[#C77DA5]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#75445F] mb-1">
                    Anotações Rápidas / Dúvidas
                  </label>
                  <input
                    type="text"
                    value={formNotes}
                    onChange={(e) => setFormNotes(e.target.value)}
                    placeholder="Ex: Refazer os exercícios 5 e 8 da lista"
                    className="w-full px-3 py-2 rounded-xl border border-[#F8EAF2] text-xs text-[#75445F] bg-white focus:outline-none focus:border-[#C77DA5]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 rounded-xl border border-[#F8EAF2] text-xs font-semibold text-[#9C7890] hover:bg-[#FFF9FC] cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-[#C77DA5] hover:bg-[#b56e94] text-white px-5 py-2 rounded-xl text-xs font-bold shadow-xs cursor-pointer"
                >
                  Salvar Aula 💗
                </button>
              </div>
            </form>
          )}

          {/* Lista de Aulas Registradas */}
          {filteredLogs.length > 0 ? (
            <div className="grid grid-cols-1 gap-3">
              {filteredLogs.map((log) => (
                <div
                  key={log.id}
                  className={`p-4 sm:p-5 rounded-3xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    log.completed
                      ? "bg-white/80 border-[#F8EAF2] opacity-85"
                      : "bg-white border-[#F8EAF2] shadow-sm hover:border-[#C77DA5]/50"
                  }`}
                >
                  <div className="flex items-start gap-3.5 min-w-0 flex-1">
                    {/* Botão de Checkbox Customizado */}
                    <button
                      type="button"
                      onClick={() => handleToggleComplete(log.id)}
                      className={`w-7 h-7 rounded-xl flex items-center justify-center text-sm font-bold transition-all cursor-pointer shrink-0 mt-0.5 ${
                        log.completed
                          ? "bg-emerald-500 text-white shadow-2xs"
                          : "border-2 border-[#C77DA5] hover:bg-[#F8EAF2] text-transparent"
                      }`}
                      title={log.completed ? "Desmarcar aula" : "Marcar como assistida"}
                    >
                      ✓
                    </button>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-[#F8EAF2] text-[#C77DA5] px-2.5 py-0.5 rounded-full">
                          {log.subject}
                        </span>
                        <span className="text-xs font-medium text-[#9C7890]">
                          {log.teacher}
                        </span>
                        <span className="text-xs text-[#B89DAF]">
                          • {log.course}
                        </span>
                      </div>

                      <h3
                        className={`text-sm sm:text-base font-bold ${
                          log.completed ? "line-through text-[#9C7890]" : "text-[#75445F]"
                        }`}
                      >
                        {log.lessonTitle}
                      </h3>

                      <p className="text-xs text-[#9C7890] mt-0.5 font-medium">
                        {log.moduleName}
                      </p>

                      {log.notes && (
                        <p className="text-xs text-[#C77DA5] mt-1.5 bg-[#FFF9FC] px-3 py-1.5 rounded-xl border border-[#F8EAF2] italic inline-block">
                          💡 &quot;{log.notes}&quot;
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Ações da Aula */}
                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    {log.lessonUrl && (
                      <a
                        href={log.lessonUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#FFF9FC] hover:bg-[#F8EAF2] text-[#C77DA5] border border-[#F8EAF2] px-3 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>Assistir</span>
                        <span>↗</span>
                      </a>
                    )}

                    <button
                      type="button"
                      onClick={() => handleDeleteLog(log.id)}
                      className="w-8 h-8 rounded-xl text-[#9C7890] hover:text-red-500 hover:bg-red-50 flex items-center justify-center transition-colors cursor-pointer text-xs"
                      title="Excluir anotação"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white/70 rounded-3xl border border-[#F8EAF2] p-8 space-y-3">
              <span className="text-4xl block">📚</span>
              <p className="font-bold text-[#75445F] text-base">
                Nenhuma aula encontrada com esses filtros
              </p>
              <p className="text-xs text-[#9C7890] max-w-sm mx-auto">
                Adicione suas aulas da plataforma Ferretto para manter seu cronograma 100% organizado no Lumina!
              </p>
            </div>
          )}
        </div>
      )}

      {/* ── ABA 2: PLAYLISTS OFICIAIS GRATUITAS DA EQUIPE FERRETTO ── */}
      {activeTab === "playlists" && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-pink-50 via-purple-50 to-rose-50 border border-[#F8EAF2] p-4 rounded-2xl flex items-center gap-3">
            <span className="text-2xl">💡</span>
            <p className="text-xs text-[#75445F] leading-relaxed">
              Estas são as principais playlists públicas e gratuitas gravadas pelos professores da plataforma Ferretto. Você pode clicar para assistir no YouTube ou adicionar diretamente ao seu rastreamento de aulas!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPlaylists.map((playlist) => (
              <div
                key={playlist.id}
                className="bg-white rounded-3xl p-6 border border-[#F8EAF2] shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold bg-[#F8EAF2] text-[#C77DA5] px-3 py-1 rounded-full">
                      {playlist.subject} • {playlist.teacher}
                    </span>
                    <span className="text-[10px] font-extrabold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                      {playlist.badge}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-[#75445F] text-base mb-1.5 leading-snug">
                    {playlist.title}
                  </h3>

                  <p className="text-xs text-[#9C7890] leading-relaxed">
                    {playlist.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {playlist.topicsCovered.map((topic, i) => (
                      <span
                        key={i}
                        className="text-[10px] bg-[#FFF9FC] text-[#75445F] border border-[#F8EAF2] px-2 py-0.5 rounded-md font-medium"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#F8EAF2] gap-2">
                  <span className="text-[11px] text-[#9C7890] font-medium">
                    ⏱️ {playlist.durationApprox}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleAddPlaylistToLogs(playlist)}
                      className="bg-[#FFF9FC] hover:bg-[#F8EAF2] text-[#C77DA5] border border-[#F8EAF2] px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer"
                      title="Adicionar ao meu rastreamento"
                    >
                      ＋ Adicionar Aula
                    </button>

                    <a
                      href={playlist.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#C77DA5] hover:bg-[#b56e94] text-white px-3.5 py-1.5 rounded-xl text-xs font-bold shadow-2xs transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <span>Assistir</span>
                      <span>↗</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── ABA 3: EQUIPE DE PROFESSORES FERRETTO ── */}
      {activeTab === "professores" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FERRETTO_TEACHERS.map((teacher, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border border-[#F8EAF2] shadow-sm flex flex-col justify-between space-y-4 hover:border-[#C77DA5]/40 transition-all"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#F8EAF2] to-[#EDE5F7] flex items-center justify-center text-2xl shadow-2xs shrink-0">
                    {teacher.avatarEmoji}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-[#75445F] text-base leading-tight">
                      {teacher.name}
                    </h3>
                    <p className="text-xs text-[#C77DA5] font-semibold">
                      {teacher.subject} • {teacher.role}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-[#9C7890] leading-relaxed">
                  {teacher.bio}
                </p>
              </div>

              <div className="pt-3 border-t border-[#F8EAF2] flex items-center gap-2">
                <a
                  href={teacher.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-[#FFF9FC] hover:bg-[#F8EAF2] text-[#75445F] border border-[#F8EAF2] py-2 px-3 rounded-xl text-xs font-bold text-center transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>📺</span>
                  <span>Canal YouTube ↗</span>
                </a>

                <a
                  href={teacher.platformUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#C77DA5] hover:bg-[#b56e94] text-white py-2 px-3 rounded-xl text-xs font-bold text-center transition-colors cursor-pointer"
                  title="Abrir página na plataforma"
                >
                  Plataforma ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
