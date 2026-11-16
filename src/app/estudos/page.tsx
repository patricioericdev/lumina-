"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  INITIAL_SUBJECTS,
  CORINGA_REPERTOIRES,
  PREVIOUS_ENEM_EXAMS,
  ESSAY_CONNECTIVES,
  NEWS_RESOURCES,
  INTERVENTION_ELEMENTS,
} from "@/data/estudosData";
import { Subject, StudyResource, TopicStatus, Repertoire, EnemExam } from "@/types/estudos";

const SUBJECTS_STORAGE_KEY = "study_life_estudos_v2";
const EXAMS_STORAGE_KEY = "study_life_exams_v1";

export default function EstudosPage() {
  const [subjects, setSubjects] = useState<Subject[]>(INITIAL_SUBJECTS);
  const [exams, setExams] = useState<EnemExam[]>(PREVIOUS_ENEM_EXAMS);

  const [activeArea, setActiveArea] = useState<
    "matematica" | "natureza" | "humanas" | "linguagens" | "redacao" | "provas" | "atualidades"
  >("matematica");

  const [selectedSubjectId, setSelectedSubjectId] = useState<string>("matematica");
  const [subjectViewTab, setSubjectViewTab] = useState<"topicos" | "recursos">("topicos");

  // Filtros de recursos
  const [resourceFilter, setResourceFilter] = useState<string>("todos");

  // Busca e filtro em repertórios
  const [searchRepertoire, setSearchRepertoire] = useState("");
  const [selectedRepCategory, setSelectedRepCategory] = useState<string>("Todas");

  // Adicionar link personalizado
  const [showAddLinkForm, setShowAddLinkForm] = useState(false);
  const [newLinkTitle, setNewLinkTitle] = useState("");
  const [newLinkUrl, setNewLinkUrl] = useState("");
  const [newLinkProvider, setNewLinkProvider] = useState("");
  const [newLinkType, setNewLinkType] = useState<"video" | "questoes" | "resumo" | "custom">("video");

  // Adicionar novo tópico
  const [showAddTopicForm, setShowAddTopicForm] = useState(false);
  const [newTopicName, setNewTopicName] = useState("");

  // Feedback de cópia do repertório
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Subaba de Redação
  const [redacaoTab, setRedacaoTab] = useState<"repertorios" | "conectivos" | "estrutura" | "canais">("repertorios");

  // Carregar dados salvos no localStorage
  useEffect(() => {
    try {
      const savedSubj = localStorage.getItem(SUBJECTS_STORAGE_KEY);
      if (savedSubj) setSubjects(JSON.parse(savedSubj));

      const savedExams = localStorage.getItem(EXAMS_STORAGE_KEY);
      if (savedExams) setExams(JSON.parse(savedExams));
    } catch {}
  }, []);

  const saveSubjects = (updated: Subject[]) => {
    setSubjects(updated);
    try {
      localStorage.setItem(SUBJECTS_STORAGE_KEY, JSON.stringify(updated));
    } catch {}
  };

  const saveExams = (updated: EnemExam[]) => {
    setExams(updated);
    try {
      localStorage.setItem(EXAMS_STORAGE_KEY, JSON.stringify(updated));
    } catch {}
  };

  // Alternar status de tópico
  const cycleTopicStatus = (subjectId: string, topicId: string) => {
    const nextStatus: Record<TopicStatus, TopicStatus> = {
      pendente: "estudando",
      estudando: "dominado",
      dominado: "pendente",
    };

    const updated = subjects.map((subj) => {
      if (subj.id !== subjectId) return subj;
      return {
        ...subj,
        topics: subj.topics.map((t) =>
          t.id === topicId ? { ...t, status: nextStatus[t.status] } : t
        ),
      };
    });
    saveSubjects(updated);
  };

  // Adicionar novo tópico
  const handleAddTopic = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopicName.trim()) return;

    const updated = subjects.map((subj) => {
      if (subj.id !== selectedSubjectId) return subj;
      return {
        ...subj,
        topics: [
          ...subj.topics,
          {
            id: `custom-top-${Date.now()}`,
            name: newTopicName.trim(),
            weight: "normal" as const,
            status: "pendente" as const,
          },
        ],
      };
    });

    saveSubjects(updated);
    setNewTopicName("");
    setShowAddTopicForm(false);
  };

  // Adicionar link de estudo
  const handleAddLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLinkTitle.trim() || !newLinkUrl.trim()) return;

    let formattedUrl = newLinkUrl.trim();
    if (!formattedUrl.startsWith("http://") && !formattedUrl.startsWith("https://")) {
      formattedUrl = "https://" + formattedUrl;
    }

    const newRes: StudyResource = {
      id: `custom-res-${Date.now()}`,
      title: newLinkTitle.trim(),
      provider: newLinkProvider.trim() || "Meu Link",
      url: formattedUrl,
      type: newLinkType,
      description: "Adicionado aos seus materiais de estudo.",
    };

    const updated = subjects.map((subj) => {
      if (subj.id !== selectedSubjectId) return subj;
      return {
        ...subj,
        resources: [newRes, ...subj.resources],
      };
    });

    saveSubjects(updated);
    setNewLinkTitle("");
    setNewLinkUrl("");
    setNewLinkProvider("");
    setShowAddLinkForm(false);
  };

  // Atualizar pontuação de simulado/prova
  const updateExamData = (
    examId: string,
    field: "completed" | "scoreDay1" | "scoreDay2" | "essayScore",
    value: any
  ) => {
    const updated = exams.map((ex) =>
      ex.id === examId ? { ...ex, [field]: value } : ex
    );
    saveExams(updated);
  };

  // Copiar citação
  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Obter disciplinas da área ativa
  const areaSubjects = subjects.filter((s) => s.area === activeArea);
  const currentSubject =
    subjects.find((s) => s.id === selectedSubjectId) || areaSubjects[0] || subjects[0];

  const totalTopics = currentSubject.topics.length;
  const dominadosCount = currentSubject.topics.filter((t) => t.status === "dominado").length;
  const subjectProgress = totalTopics === 0 ? 0 : Math.round((dominadosCount / totalTopics) * 100);

  const filteredResources = currentSubject.resources.filter((res) => {
    if (resourceFilter === "todos") return true;
    return res.type === resourceFilter;
  });

  // Filtragem de repertórios
  const filteredRepertoires = CORINGA_REPERTOIRES.filter((rep) => {
    const matchesCategory =
      selectedRepCategory === "Todas" || rep.category === selectedRepCategory;
    const matchesSearch =
      rep.title.toLowerCase().includes(searchRepertoire.toLowerCase()) ||
      rep.author.toLowerCase().includes(searchRepertoire.toLowerCase()) ||
      rep.themes.toLowerCase().includes(searchRepertoire.toLowerCase()) ||
      rep.concept.toLowerCase().includes(searchRepertoire.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
      {/* Cabeçalho */}
      <header className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#75445F] flex items-center gap-2">
              <span>📚</span> Central Completa ENEM 2027
            </h1>
            <p className="text-[#9C7890] text-sm mt-1">
              Edital detalhado, videoaulas completas, simulados das últimas provas e repertórios coringas.
            </p>
          </div>

          <div className="bg-white border border-[#F8EAF2] px-4 py-2.5 rounded-2xl shadow-xs text-xs text-[#75445F] flex items-center gap-2 shrink-0">
            <span>🎯</span>
            <span className="font-semibold text-[#C77DA5]">ENEM 2027:</span>
            <span>Preparação de longo prazo com constância.</span>
          </div>
        </div>
      </header>

      {/* Menu Superior das Grandes Áreas e Recursos */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 scrollbar-none">
        <button
          type="button"
          onClick={() => {
            setActiveArea("matematica");
            setSelectedSubjectId("matematica");
          }}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-semibold transition-all shrink-0 cursor-pointer ${
            activeArea === "matematica"
              ? "bg-[#C77DA5] text-white shadow-sm scale-102"
              : "bg-white text-[#75445F] border border-[#F8EAF2] hover:bg-[#FFF9FC]"
          }`}
        >
          <span>📐</span>
          <span>Matemática</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveArea("natureza");
            setSelectedSubjectId("biologia");
          }}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-semibold transition-all shrink-0 cursor-pointer ${
            activeArea === "natureza"
              ? "bg-[#C77DA5] text-white shadow-sm scale-102"
              : "bg-white text-[#75445F] border border-[#F8EAF2] hover:bg-[#FFF9FC]"
          }`}
        >
          <span>🌿</span>
          <span>Ciências da Natureza</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveArea("humanas");
            setSelectedSubjectId("historia");
          }}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-semibold transition-all shrink-0 cursor-pointer ${
            activeArea === "humanas"
              ? "bg-[#C77DA5] text-white shadow-sm scale-102"
              : "bg-white text-[#75445F] border border-[#F8EAF2] hover:bg-[#FFF9FC]"
          }`}
        >
          <span>🏛️</span>
          <span>Ciências Humanas</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveArea("linguagens");
            setSelectedSubjectId("linguagens");
          }}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-semibold transition-all shrink-0 cursor-pointer ${
            activeArea === "linguagens"
              ? "bg-[#C77DA5] text-white shadow-sm scale-102"
              : "bg-white text-[#75445F] border border-[#F8EAF2] hover:bg-[#FFF9FC]"
          }`}
        >
          <span>📖</span>
          <span>Linguagens & Códigos</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveArea("redacao")}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-semibold transition-all shrink-0 cursor-pointer ${
            activeArea === "redacao"
              ? "bg-[#C77DA5] text-white shadow-sm scale-102"
              : "bg-white text-[#75445F] border border-[#F8EAF2] hover:bg-[#FFF9FC]"
          }`}
        >
          <span>✍️</span>
          <span>Redação Nota 1000</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveArea("provas")}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-semibold transition-all shrink-0 cursor-pointer ${
            activeArea === "provas"
              ? "bg-[#C77DA5] text-white shadow-sm scale-102"
              : "bg-white text-[#75445F] border border-[#F8EAF2] hover:bg-[#FFF9FC]"
          }`}
        >
          <span>📝</span>
          <span>Últimas 5 Provas (Simulados)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveArea("atualidades")}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-semibold transition-all shrink-0 cursor-pointer ${
            activeArea === "atualidades"
              ? "bg-[#C77DA5] text-white shadow-sm scale-102"
              : "bg-white text-[#75445F] border border-[#F8EAF2] hover:bg-[#FFF9FC]"
          }`}
        >
          <span>📰</span>
          <span>Radar de Atualidades</span>
        </button>

        <div className="h-6 w-px bg-[#F8EAF2] mx-1 shrink-0" />

        <Link
          href="/ferretto"
          className="flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-semibold transition-all shrink-0 bg-gradient-to-r from-pink-50 to-purple-50 text-[#75445F] border border-[#F8EAF2] hover:border-[#C77DA5] hover:shadow-xs"
        >
          <span>🎓</span>
          <span>Hub Ferretto</span>
        </Link>

        <Link
          href="/formulas"
          className="flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-semibold transition-all shrink-0 bg-white text-[#75445F] border border-[#F8EAF2] hover:border-[#C77DA5] hover:shadow-xs"
        >
          <span>🧮</span>
          <span>Banco de Fórmulas</span>
        </Link>
      </div>

      {/* =========================================================================
          SEÇÃO 1: ÁREAS DO CONHECIMENTO TRADICIONAIS
         ========================================================================= */}
      {activeArea !== "redacao" && activeArea !== "provas" && activeArea !== "atualidades" && (
        <div>
          {/* Seletor de Matéria na Área (ex: Biologia, Química, Física) */}
          {areaSubjects.length > 1 && (
            <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1">
              <span className="text-xs font-semibold text-[#9C7890] mr-2">Matéria:</span>
              {areaSubjects.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSelectedSubjectId(s.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    selectedSubjectId === s.id
                      ? "bg-[#75445F] text-white shadow-xs"
                      : "bg-white text-[#75445F] border border-[#F8EAF2] hover:bg-[#F8EAF2]"
                  }`}
                >
                  <span className="mr-1.5">{s.icon}</span>
                  {s.name}
                </button>
              ))}
            </div>
          )}

          {/* Banner da Matéria com Progresso */}
          <div className="bg-white rounded-3xl p-6 border border-[#F8EAF2] shadow-sm mb-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#F8EAF2] flex items-center justify-center text-3xl shrink-0 shadow-xs">
                {currentSubject.icon}
              </div>
              <div>
                <div className="flex items-center gap-2.5">
                  <h2 className="text-2xl font-bold text-[#75445F]">{currentSubject.name}</h2>
                  <span className="text-xs bg-[#EDE5F7] text-[#75445F] px-2.5 py-0.5 rounded-full font-semibold">
                    {totalTopics} tópicos do edital
                  </span>
                </div>
                <p className="text-xs text-[#9C7890] mt-1">
                  Clique no status do assunto para marcar: ⚪ Pendente ➔ 🟡 Estudando ➔ 🟢 Dominado!
                </p>
              </div>
            </div>

            {/* Barra de Progresso */}
            <div className="w-full md:w-80 bg-[#FFF9FC] p-4 rounded-2xl border border-[#F8EAF2]">
              <div className="flex justify-between items-center text-xs font-semibold mb-2">
                <span className="text-[#75445F]">Domínio da Matéria</span>
                <span className="text-[#C77DA5] font-bold">{subjectProgress}%</span>
              </div>
              <div className="w-full bg-[#F8EAF2] rounded-full h-3 overflow-hidden">
                <div
                  className="bg-[#C77DA5] h-3 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${subjectProgress}%` }}
                ></div>
              </div>
              <p className="text-[11px] text-[#9C7890] mt-2">
                {dominadosCount} de {totalTopics} conteúdos dominados
              </p>
            </div>
          </div>

          {/* Abas Internas da Matéria */}
          <div className="flex items-center justify-between gap-4 border-b border-[#F8EAF2] pb-3 mb-6">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSubjectViewTab("topicos")}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  subjectViewTab === "topicos"
                    ? "bg-[#F8EAF2] text-[#C77DA5] shadow-xs"
                    : "text-[#75445F] hover:bg-white"
                }`}
              >
                📋 Conteúdos do Edital ({totalTopics})
              </button>
              <button
                type="button"
                onClick={() => setSubjectViewTab("recursos")}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  subjectViewTab === "recursos"
                    ? "bg-[#F8EAF2] text-[#C77DA5] shadow-xs"
                    : "text-[#75445F] hover:bg-white"
                }`}
              >
                🌐 Aulas & Bancos de Questões ({currentSubject.resources.length})
              </button>
            </div>

            {subjectViewTab === "topicos" ? (
              <button
                type="button"
                onClick={() => setShowAddTopicForm(!showAddTopicForm)}
                className="text-xs bg-[#C77DA5] text-white px-3.5 py-2 rounded-xl font-semibold hover:bg-[#b56e94] transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>{showAddTopicForm ? "✕ Fechar" : "＋ Novo Tópico"}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setShowAddLinkForm(!showAddLinkForm)}
                className="text-xs bg-[#C77DA5] text-white px-3.5 py-2 rounded-xl font-semibold hover:bg-[#b56e94] transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>{showAddLinkForm ? "✕ Fechar" : "＋ Salvar Meu Link"}</span>
              </button>
            )}
          </div>

          {/* FORMULÁRIO: ADICIONAR TÓPICO */}
          {showAddTopicForm && subjectViewTab === "topicos" && (
            <form
              onSubmit={handleAddTopic}
              className="bg-white p-5 rounded-2xl border-2 border-[#F8EAF2] mb-6 flex flex-col sm:flex-row gap-3 items-center animate-in fade-in"
            >
              <input
                type="text"
                value={newTopicName}
                onChange={(e) => setNewTopicName(e.target.value)}
                placeholder="Ex: Teorema de Tales, Circuitos RLC..."
                className="flex-1 w-full px-4 py-2.5 rounded-xl border border-[#F8EAF2] focus:outline-none focus:border-[#C77DA5] text-sm text-[#75445F]"
                autoFocus
              />
              <button
                type="submit"
                className="w-full sm:w-auto bg-[#C77DA5] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#b56e94] transition-all cursor-pointer shrink-0"
              >
                Adicionar Tópico 💗
              </button>
            </form>
          )}

          {/* FORMULÁRIO: ADICIONAR LINK */}
          {showAddLinkForm && subjectViewTab === "recursos" && (
            <form
              onSubmit={handleAddLink}
              className="bg-white p-6 rounded-3xl border-2 border-[#F8EAF2] mb-6 space-y-4 animate-in fade-in shadow-xs"
            >
              <h3 className="text-[#75445F] font-bold text-sm flex items-center gap-2">
                <span>🔗</span> Salvar link de estudo em {currentSubject.name}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#75445F] mb-1">
                    Título da Aula ou Material
                  </label>
                  <input
                    type="text"
                    value={newLinkTitle}
                    onChange={(e) => setNewLinkTitle(e.target.value)}
                    placeholder="Ex: Playlist do Ferretto sobre Funções"
                    className="w-full px-3.5 py-2 rounded-xl border border-[#F8EAF2] text-sm text-[#75445F] focus:outline-none focus:border-[#C77DA5]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#75445F] mb-1">
                    URL / Link da Página ou Vídeo
                  </label>
                  <input
                    type="text"
                    value={newLinkUrl}
                    onChange={(e) => setNewLinkUrl(e.target.value)}
                    placeholder="Ex: https://youtube.com/watch?v=..."
                    className="w-full px-3.5 py-2 rounded-xl border border-[#F8EAF2] text-sm text-[#75445F] focus:outline-none focus:border-[#C77DA5]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#75445F] mb-1">
                    Canal / Plataforma
                  </label>
                  <input
                    type="text"
                    value={newLinkProvider}
                    onChange={(e) => setNewLinkProvider(e.target.value)}
                    placeholder="Ex: YouTube, Drive da Turma, Stoodi..."
                    className="w-full px-3.5 py-2 rounded-xl border border-[#F8EAF2] text-sm text-[#75445F] focus:outline-none focus:border-[#C77DA5]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#75445F] mb-1">
                    Tipo de Material
                  </label>
                  <select
                    value={newLinkType}
                    onChange={(e) => setNewLinkType(e.target.value as any)}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#F8EAF2] text-sm text-[#75445F] bg-white focus:outline-none focus:border-[#C77DA5]"
                  >
                    <option value="video">🎥 Videoaula / Canal</option>
                    <option value="questoes">📝 Banco de Questões</option>
                    <option value="resumo">📑 Resumo / PDF</option>
                    <option value="custom">🔗 Link Geral</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddLinkForm(false)}
                  className="px-4 py-2 rounded-xl text-xs text-[#9C7890] hover:bg-[#FFF9FC] cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-[#C77DA5] text-white px-5 py-2 rounded-xl text-xs font-semibold hover:bg-[#b56e94] cursor-pointer shadow-xs"
                >
                  Salvar nos Meus Links 💗
                </button>
              </div>
            </form>
          )}

          {/* LISTA DE CONTEÚDOS (EDITAL COMPLETO) */}
          {subjectViewTab === "topicos" && (
            <div className="space-y-3">
              {currentSubject.topics.map((topic) => {
                const statusConfig = {
                  pendente: {
                    label: "Pendente",
                    icon: "⚪",
                    style: "bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200",
                  },
                  estudando: {
                    label: "Estudando",
                    icon: "🟡",
                    style: "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 font-semibold",
                  },
                  dominado: {
                    label: "Dominado!",
                    icon: "🟢",
                    style: "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 font-bold",
                  },
                }[topic.status];

                const weightBadge =
                  topic.weight === "alto" ? (
                    <span className="text-[10px] bg-rose-50 text-rose-600 font-semibold px-2 py-0.5 rounded-md border border-rose-100">
                      Cai muito no ENEM 🔥
                    </span>
                  ) : null;

                return (
                  <div
                    key={topic.id}
                    className="bg-white rounded-2xl p-4 border border-[#F8EAF2] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-[#C77DA5] transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => cycleTopicStatus(currentSubject.id, topic.id)}
                        className="text-lg cursor-pointer hover:scale-125 transition-transform"
                        title="Alternar status (Pendente ➔ Estudando ➔ Dominado)"
                      >
                        {statusConfig.icon}
                      </button>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <p
                            className={`text-sm font-medium ${
                              topic.status === "dominado"
                                ? "text-emerald-900"
                                : "text-[#75445F]"
                            }`}
                          >
                            {topic.name}
                          </p>
                          {weightBadge}
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => cycleTopicStatus(currentSubject.id, topic.id)}
                      className={`text-xs px-4 py-1.5 rounded-full border transition-all cursor-pointer shrink-0 text-center ${statusConfig.style}`}
                    >
                      {statusConfig.icon} {statusConfig.label}
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* LISTA DE RECURSOS & LINKS */}
          {subjectViewTab === "recursos" && (
            <div>
              {/* Filtros */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6">
                {[
                  { id: "todos", label: "Todos os Recursos" },
                  { id: "video", label: "🎥 Videoaulas Gratuitas" },
                  { id: "questoes", label: "📝 Bancos de Questões" },
                  { id: "resumo", label: "📑 Resumos & Simuladores" },
                  { id: "custom", label: "🔗 Meus Links Salvos" },
                ].map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setResourceFilter(f.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all cursor-pointer ${
                      resourceFilter === f.id
                        ? "bg-[#75445F] text-white"
                        : "bg-white text-[#75445F] border border-[#F8EAF2] hover:bg-[#F8EAF2]"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              {/* Grid de Recursos */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredResources.map((res) => {
                  const typeBadge = {
                    video: { label: "Videoaula", color: "bg-red-50 text-red-600 border-red-200" },
                    questoes: { label: "Questões", color: "bg-indigo-50 text-indigo-600 border-indigo-200" },
                    resumo: { label: "Resumo / Interativo", color: "bg-emerald-50 text-emerald-600 border-emerald-200" },
                    noticia: { label: "Notícia", color: "bg-amber-50 text-amber-600 border-amber-200" },
                    podcast: { label: "Podcast", color: "bg-purple-50 text-purple-600 border-purple-200" },
                    custom: { label: "Meu Link", color: "bg-pink-50 text-[#C77DA5] border-[#F8EAF2]" },
                  }[res.type];

                  return (
                    <div
                      key={res.id}
                      className="bg-white rounded-2xl p-5 border border-[#F8EAF2] shadow-xs flex flex-col justify-between hover:border-[#C77DA5] hover:shadow-sm transition-all group"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${typeBadge.color}`}
                          >
                            {typeBadge.label}
                          </span>
                          <span className="text-[11px] text-[#9C7890] font-medium">
                            {res.provider}
                          </span>
                        </div>

                        <h3 className="font-bold text-[#75445F] text-base group-hover:text-[#C77DA5] transition-colors">
                          {res.title}
                        </h3>

                        {res.description && (
                          <p className="text-xs text-[#9C7890] mt-1.5 leading-relaxed">
                            {res.description}
                          </p>
                        )}
                      </div>

                      <a
                        href={res.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 pt-3 border-t border-[#F8EAF2] text-xs font-semibold text-[#C77DA5] flex items-center justify-between group-hover:translate-x-1 transition-all"
                      >
                        <span>Acessar conteúdo</span>
                        <span>↗</span>
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          SEÇÃO 2: REDAÇÃO NOTA 1000 & 15 REPERTÓRIOS CORINGAS
         ========================================================================= */}
      {activeArea === "redacao" && (
        <div className="space-y-6">
          {/* Banner de Redação */}
          <div className="bg-gradient-to-r from-[#C77DA5] via-[#b67396] to-[#8d4e70] rounded-3xl p-8 text-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">✍️</span>
                <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-3 py-0.5 rounded-full">
                  20% da Nota Final
                </span>
              </div>
              <h2 className="text-3xl font-extrabold">Arsenal de Redação Nota 1000</h2>
              <p className="text-sm text-pink-100 mt-2 max-w-xl">
                15 repertórios coringas de alto rigor filosófico e sociológico, banco de conectivos oficiais
                e o passo a passo dos 5 elementos da intervenção.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-center shrink-0">
              <p className="text-3xl font-black">1000</p>
              <p className="text-xs text-pink-100 font-medium">Meta de pontuação</p>
            </div>
          </div>

          {/* Submenu de Redação */}
          <div className="flex items-center gap-2 border-b border-[#F8EAF2] pb-3 overflow-x-auto">
            <button
              type="button"
              onClick={() => setRedacaoTab("repertorios")}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                redacaoTab === "repertorios"
                  ? "bg-[#F8EAF2] text-[#C77DA5] shadow-xs"
                  : "text-[#75445F] hover:bg-white"
              }`}
            >
              💎 15 Repertórios Coringas
            </button>
            <button
              type="button"
              onClick={() => setRedacaoTab("conectivos")}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                redacaoTab === "conectivos"
                  ? "bg-[#F8EAF2] text-[#C77DA5] shadow-xs"
                  : "text-[#75445F] hover:bg-white"
              }`}
            >
              🔤 Banco de Conectivos ENEM
            </button>
            <button
              type="button"
              onClick={() => setRedacaoTab("estrutura")}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                redacaoTab === "estrutura"
                  ? "bg-[#F8EAF2] text-[#C77DA5] shadow-xs"
                  : "text-[#75445F] hover:bg-white"
              }`}
            >
              🏗️ Fórmula da Intervenção (Nota 200)
            </button>
            <button
              type="button"
              onClick={() => setRedacaoTab("canais")}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                redacaoTab === "canais"
                  ? "bg-[#F8EAF2] text-[#C77DA5] shadow-xs"
                  : "text-[#75445F] hover:bg-white"
              }`}
            >
              🎥 Aulas Gratuitas
            </button>
          </div>

          {/* SUB-ABA 1: 15 REPERTÓRIOS CORINGAS */}
          {redacaoTab === "repertorios" && (
            <div className="space-y-4">
              {/* Barra de Busca e Filtro de Categoria */}
              <div className="flex flex-col md:flex-row gap-3">
                <input
                  type="text"
                  value={searchRepertoire}
                  onChange={(e) => setSearchRepertoire(e.target.value)}
                  placeholder="Buscar por tema ou autor (ex: Dimenstein, meio ambiente, tecnologia, racismo)..."
                  className="flex-1 bg-white px-4 py-2.5 rounded-2xl border border-[#F8EAF2] focus:outline-none focus:border-[#C77DA5] text-sm text-[#75445F]"
                />

                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
                  {["Todas", "Legislação", "Sociologia", "Filosofia", "História", "Literatura"].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedRepCategory(cat)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 cursor-pointer transition-colors ${
                        selectedRepCategory === cat
                          ? "bg-[#75445F] text-white"
                          : "bg-white text-[#75445F] border border-[#F8EAF2] hover:bg-[#F8EAF2]"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid de Repertórios */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredRepertoires.map((rep) => {
                  const isCopied = copiedId === rep.id;

                  return (
                    <div
                      key={rep.id}
                      className="bg-white rounded-3xl p-6 border border-[#F8EAF2] shadow-xs flex flex-col justify-between hover:border-[#C77DA5] transition-all"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="text-[11px] font-bold bg-[#EDE5F7] text-[#75445F] px-2.5 py-0.5 rounded-full">
                            {rep.category}
                          </span>
                          <span className="text-xs text-[#9C7890] font-medium">{rep.author}</span>
                        </div>

                        <h3 className="text-lg font-bold text-[#75445F] mb-2">{rep.title}</h3>

                        <div className="bg-[#FFF9FC] p-3 rounded-xl mb-3 border border-[#F8EAF2]">
                          <p className="text-xs text-[#75445F] leading-relaxed">
                            <strong className="text-[#C77DA5]">Conceito Teórico:</strong> {rep.concept}
                          </p>
                        </div>

                        <p className="text-xs text-[#9C7890] mb-3 leading-relaxed">
                          <strong className="text-[#75445F]">Em quais temas usar:</strong> {rep.themes}
                        </p>

                        <div className="bg-rose-50/50 border border-rose-100 p-3.5 rounded-xl">
                          <p className="text-xs font-semibold text-[#75445F] mb-1">
                            Como citar na redação:
                          </p>
                          <p className="text-xs text-[#75445F] italic leading-relaxed">
                            &quot;{rep.quoteOrExample}&quot;
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => copyText(rep.quoteOrExample, rep.id)}
                        className={`mt-4 w-full py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                          isCopied
                            ? "bg-emerald-600 text-white shadow-xs"
                            : "bg-[#F8EAF2] text-[#C77DA5] hover:bg-[#C77DA5] hover:text-white"
                        }`}
                      >
                        <span>{isCopied ? "✓ Citação copiada com sucesso!" : "📋 Copiar modelo de citação"}</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* SUB-ABA 2: BANCO DE CONECTIVOS */}
          {redacaoTab === "conectivos" && (
            <div className="space-y-4">
              <div className="bg-white rounded-3xl p-6 border border-[#F8EAF2] shadow-sm">
                <h3 className="text-xl font-bold text-[#75445F] mb-2">
                  🔤 Guia de Conectivos & Operadores Argumentativos (Competência 4)
                </h3>
                <p className="text-xs text-[#9C7890] mb-6">
                  Para garantir a nota máxima na C4, você precisa usar conectivos interparágrafos
                  (no início de D1, D2 e Conclusão) e intraparágrafos (dentro dos períodos).
                </p>

                <div className="space-y-4">
                  {ESSAY_CONNECTIVES.map((con, idx) => (
                    <div
                      key={idx}
                      className="bg-[#FFF9FC] p-4 rounded-2xl border border-[#F8EAF2]"
                    >
                      <h4 className="font-bold text-[#75445F] text-sm mb-1">{con.category}</h4>
                      <p className="text-xs text-[#9C7890] mb-3">{con.purpose}</p>
                      <div className="flex flex-wrap gap-2">
                        {con.examples.map((ex, exIdx) => (
                          <span
                            key={exIdx}
                            className="bg-white border border-[#F8EAF2] text-[#C77DA5] font-semibold text-xs px-3 py-1.5 rounded-xl shadow-2xs"
                          >
                            {ex}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SUB-ABA 3: ESTRUTURA DOS 5 ELEMENTOS */}
          {redacaoTab === "estrutura" && (
            <div className="bg-white rounded-3xl p-6 border border-[#F8EAF2] shadow-sm">
              <h3 className="text-xl font-bold text-[#75445F] mb-2 flex items-center gap-2">
                <span>🎯</span> Os 5 Elementos Obrigatórios da Proposta (Competência 5)
              </h3>
              <p className="text-xs text-[#9C7890] mb-6">
                Para tirar os 200 pontos inteiros na C5, sua proposta de intervenção precisa conter
                exatamente esses 5 itens sem faltar nenhum:
              </p>

              <div className="space-y-4">
                {INTERVENTION_ELEMENTS.map((item) => (
                  <div
                    key={item.element}
                    className="bg-[#FFF9FC] p-4 rounded-2xl border border-[#F8EAF2] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="sm:w-1/3">
                      <p className="font-bold text-[#C77DA5] text-sm">{item.element}</p>
                      <p className="text-xs text-[#75445F]">{item.question}</p>
                    </div>
                    <div className="sm:w-2/3 bg-white p-3 rounded-xl border border-[#F8EAF2]">
                      <p className="text-xs text-[#9C7890]">
                        <strong className="text-[#75445F]">Exemplo prático:</strong> {item.example}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SUB-ABA 4: CANAIS DE REDAÇÃO */}
          {redacaoTab === "canais" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-3xl p-6 border border-[#F8EAF2] shadow-xs flex flex-col justify-between">
                <div>
                  <span className="text-2xl">👩‍🏫</span>
                  <h4 className="font-bold text-[#75445F] text-base mt-2">Jana Rabelo</h4>
                  <p className="text-xs text-[#9C7890] mt-1">
                    Uma das maiores especialistas de redação do país. Explicações profundas sobre argumentação e repertório.
                  </p>
                </div>
                <a
                  href="https://www.youtube.com/@JanaRabelo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 pt-3 border-t border-[#F8EAF2] text-xs font-semibold text-[#C77DA5] flex items-center justify-between"
                >
                  <span>Ver canal no YouTube</span>
                  <span>↗</span>
                </a>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-[#F8EAF2] shadow-xs flex flex-col justify-between">
                <div>
                  <span className="text-2xl">✍️</span>
                  <h4 className="font-bold text-[#75445F] text-base mt-2">Professor Tiago Valério</h4>
                  <p className="text-xs text-[#9C7890] mt-1">
                    Análise ao vivo de redações nota 1000, estruturas prontas e como não zerar nenhuma competência.
                  </p>
                </div>
                <a
                  href="https://www.youtube.com/@tiagovalerio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 pt-3 border-t border-[#F8EAF2] text-xs font-semibold text-[#C77DA5] flex items-center justify-between"
                >
                  <span>Ver canal no YouTube</span>
                  <span>↗</span>
                </a>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-[#F8EAF2] shadow-xs flex flex-col justify-between">
                <div>
                  <span className="text-2xl">🎯</span>
                  <h4 className="font-bold text-[#75445F] text-base mt-2">Redação e Gramática Zica</h4>
                  <p className="text-xs text-[#9C7890] mt-1">
                    Aulas dinâmicas e divertidas para destravar e começar o texto sem medo da folha em branco.
                  </p>
                </div>
                <a
                  href="https://www.youtube.com/@redacaoegramaticazica"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 pt-3 border-t border-[#F8EAF2] text-xs font-semibold text-[#C77DA5] flex items-center justify-between"
                >
                  <span>Ver canal no YouTube</span>
                  <span>↗</span>
                </a>
              </div>
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          SEÇÃO 3: AS ÚLTIMAS 5 PROVAS OFICIAIS DO ENEM (SIMULADOS)
         ========================================================================= */}
      {activeArea === "provas" && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-[#EDE5F7] via-[#F8EAF2] to-[#FFF9FC] rounded-3xl p-8 border border-[#F8EAF2] shadow-xs">
            <h2 className="text-2xl font-bold text-[#75445F] flex items-center gap-2">
              <span>📝</span> Cadernos e Gabaritos das Últimas 5 Edições do ENEM
            </h2>
            <p className="text-xs text-[#9C7890] mt-2 max-w-2xl leading-relaxed">
              Fazer as provas anteriores como simulados é a técnica número 1 dos aprovados em Medicina e cursos concorridos.
              Aqui você baixa os cadernos oficiais do INEP em PDF, confere o gabarito e assiste à resolução comentada de cada questão.
            </p>
          </div>

          <div className="space-y-6">
            {exams.map((exam) => (
              <div
                key={exam.id}
                className={`bg-white rounded-3xl p-6 border transition-all shadow-xs ${
                  exam.completed
                    ? "border-emerald-200 bg-emerald-50/10"
                    : "border-[#F8EAF2] hover:border-[#C77DA5]"
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#F8EAF2]">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl font-bold text-[#75445F]">{exam.edition}</span>
                      <span
                        className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                          exam.completed
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {exam.completed ? "✓ Simulado Realizado" : "⚪ Pendente"}
                      </span>
                    </div>

                    <p className="text-xs text-[#75445F] mt-2">
                      <strong className="text-[#C77DA5]">Tema Oficial da Redação:</strong> &quot;{exam.essayTheme}&quot;
                    </p>
                  </div>

                  {/* Checkbox de Simulado Feito */}
                  <label className="flex items-center gap-2 text-xs font-semibold text-[#75445F] cursor-pointer shrink-0">
                    <input
                      type="checkbox"
                      checked={exam.completed}
                      onChange={(e) => updateExamData(exam.id, "completed", e.target.checked)}
                      className="accent-[#C77DA5] w-4 h-4 rounded cursor-pointer"
                    />
                    <span>Marcar como simulado concluído</span>
                  </label>
                </div>

                {/* Links de Download e Resolução */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 my-4">
                  <a
                    href={exam.day1QuestionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#FFF9FC] border border-[#F8EAF2] hover:border-[#C77DA5] p-3 rounded-2xl text-center text-xs font-semibold text-[#75445F] transition-all"
                  >
                    <p className="text-base mb-1">📖</p>
                    <span>Caderno Dia 1</span>
                    <p className="text-[10px] text-[#9C7890] font-normal">Linguagens + Humanas</p>
                  </a>

                  <a
                    href={exam.day1AnswerKeyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#FFF9FC] border border-[#F8EAF2] hover:border-[#C77DA5] p-3 rounded-2xl text-center text-xs font-semibold text-[#75445F] transition-all"
                  >
                    <p className="text-base mb-1">🔑</p>
                    <span>Gabarito Dia 1</span>
                    <p className="text-[10px] text-[#9C7890] font-normal">Respostas Oficiais</p>
                  </a>

                  <a
                    href={exam.day2QuestionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#FFF9FC] border border-[#F8EAF2] hover:border-[#C77DA5] p-3 rounded-2xl text-center text-xs font-semibold text-[#75445F] transition-all"
                  >
                    <p className="text-base mb-1">📐</p>
                    <span>Caderno Dia 2</span>
                    <p className="text-[10px] text-[#9C7890] font-normal">Matemática + Natureza</p>
                  </a>

                  <a
                    href={exam.day2AnswerKeyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#FFF9FC] border border-[#F8EAF2] hover:border-[#C77DA5] p-3 rounded-2xl text-center text-xs font-semibold text-[#75445F] transition-all"
                  >
                    <p className="text-base mb-1">🔑</p>
                    <span>Gabarito Dia 2</span>
                    <p className="text-[10px] text-[#9C7890] font-normal">Respostas Oficiais</p>
                  </a>

                  <a
                    href={exam.videoResolutionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-rose-50/50 border border-rose-100 hover:border-[#C77DA5] p-3 rounded-2xl text-center text-xs font-semibold text-[#C77DA5] transition-all"
                  >
                    <p className="text-base mb-1">🎥</p>
                    <span>Resoluções no YouTube</span>
                    <p className="text-[10px] text-[#9C7890] font-normal">Questão por Questão</p>
                  </a>
                </div>

                {/* Registro Opcional de Desempenho no Simulado */}
                <div className="bg-[#FFF9FC] p-4 rounded-2xl border border-[#F8EAF2] flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-3">
                  <span className="text-xs font-semibold text-[#75445F] flex items-center gap-1.5">
                    <span>📊</span> Seu desempenho nesse simulado (opcional):
                  </span>

                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-[#9C7890]">Dia 1:</span>
                      <input
                        type="number"
                        min="0"
                        max="90"
                        placeholder="Acertos / 90"
                        value={exam.scoreDay1 ?? ""}
                        onChange={(e) => updateExamData(exam.id, "scoreDay1", e.target.value ? Number(e.target.value) : undefined)}
                        className="w-24 px-2.5 py-1 text-xs bg-white rounded-lg border border-[#F8EAF2] text-[#75445F] focus:outline-none focus:border-[#C77DA5]"
                      />
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-[#9C7890]">Dia 2:</span>
                      <input
                        type="number"
                        min="0"
                        max="90"
                        placeholder="Acertos / 90"
                        value={exam.scoreDay2 ?? ""}
                        onChange={(e) => updateExamData(exam.id, "scoreDay2", e.target.value ? Number(e.target.value) : undefined)}
                        className="w-24 px-2.5 py-1 text-xs bg-white rounded-lg border border-[#F8EAF2] text-[#75445F] focus:outline-none focus:border-[#C77DA5]"
                      />
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-[#9C7890]">Redação:</span>
                      <input
                        type="number"
                        min="0"
                        max="1000"
                        step="20"
                        placeholder="Nota 0-1000"
                        value={exam.essayScore ?? ""}
                        onChange={(e) => updateExamData(exam.id, "essayScore", e.target.value ? Number(e.target.value) : undefined)}
                        className="w-24 px-2.5 py-1 text-xs bg-white rounded-lg border border-[#F8EAF2] text-[#75445F] focus:outline-none focus:border-[#C77DA5]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          SEÇÃO 4: RADAR DE ATUALIDADES & NOTÍCIAS PARA O ENEM
         ========================================================================= */}
      {activeArea === "atualidades" && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-[#EDE5F7] via-[#f4eaf7] to-[#F8EAF2] rounded-3xl p-8 border border-[#F8EAF2] shadow-xs">
            <h2 className="text-2xl font-bold text-[#75445F] flex items-center gap-2">
              <span>📰</span> Radar de Atualidades & Notícias para o ENEM
            </h2>
            <p className="text-xs text-[#9C7890] mt-2 max-w-2xl leading-relaxed">
              O ENEM é uma prova contextualizada: os temas de Redação e as questões de Geografia e História
              abordam os principais acontecimentos sociais, ambientais e tecnológicos do Brasil e do mundo.
              Aqui estão os melhores canais e podcasts para você se manter informada em 15 minutinhos por dia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {NEWS_RESOURCES.map((news) => (
              <div
                key={news.id}
                className="bg-white rounded-3xl p-6 border border-[#F8EAF2] shadow-xs flex flex-col justify-between hover:border-[#C77DA5] transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold bg-[#EDE5F7] text-[#75445F] px-2.5 py-0.5 rounded-full">
                      {news.type === "podcast" ? "🎧 Podcast Diário" : "📰 Portal de Notícias"}
                    </span>
                    <span className="text-xs text-[#9C7890] font-medium">{news.source}</span>
                  </div>

                  <h3 className="text-lg font-bold text-[#75445F] group-hover:text-[#C77DA5] transition-colors">
                    {news.title}
                  </h3>

                  <p className="text-xs text-[#9C7890] mt-2 leading-relaxed">
                    {news.description}
                  </p>
                </div>

                <a
                  href={news.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 pt-3 border-t border-[#F8EAF2] text-xs font-semibold text-[#C77DA5] flex items-center justify-between group-hover:translate-x-1 transition-all"
                >
                  <span>Acessar portal / Ouvir episódios</span>
                  <span>↗</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
