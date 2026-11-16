"use client";

import { useState } from "react";
import { useTasks } from "@/hooks/useTasks";
import { Category, Priority } from "@/types/task";

const CATEGORIES: Category[] = [
  "Estudos",
  "Escola",
  "Casa",
  "Pessoal",
  "Saúde",
  "Outros",
];

export default function TarefasPage() {
  const {
    tasks,
    isLoaded,
    addTask,
    toggleTask,
    deleteTask,
    total,
    completedCount,
    percentage,
  } = useTasks();

  const [filterStatus, setFilterStatus] = useState<"todas" | "pendentes" | "concluidas">("todas");
  const [selectedCategory, setSelectedCategory] = useState<string>("Todas");

  // Form states
  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState<Category>("Estudos");
  const [newPriority, setNewPriority] = useState<Priority>("media");
  const [newDueDate, setNewDueDate] = useState("Hoje");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    addTask(newTitle, newCategory, newPriority, newDueDate);
    setNewTitle("");
    setShowForm(false);
  };

  // Filtragem
  const filteredTasks = tasks.filter((task) => {
    const matchesStatus =
      filterStatus === "todas"
        ? true
        : filterStatus === "pendentes"
        ? !task.completed
        : task.completed;

    const matchesCategory =
      selectedCategory === "Todas" || task.category === selectedCategory;

    return matchesStatus && matchesCategory;
  });

  const pendingCount = total - completedCount;

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-6xl mx-auto">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#75445F] flex items-center gap-2">
            <span>✅</span> Gerenciador de Tarefas
          </h1>
          <p className="text-[#9C7890] text-sm mt-1">
            Planeje seu dia com leveza, sem cobranças excessivas.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowForm(!showForm)}
          className="bg-[#C77DA5] hover:bg-[#b56e94] text-white px-5 py-2.5 rounded-2xl text-sm font-semibold shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>{showForm ? "✕ Fechar" : "＋ Nova Tarefa"}</span>
        </button>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-2xl p-4 border border-[#F8EAF2] shadow-sm">
          <p className="text-xs text-[#9C7890] font-medium">Total de tarefas</p>
          <p className="text-2xl font-bold text-[#75445F] mt-1">{total}</p>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-[#F8EAF2] shadow-sm">
          <p className="text-xs text-[#9C7890] font-medium">Pendentes</p>
          <p className="text-2xl font-bold text-[#C77DA5] mt-1">{pendingCount}</p>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-[#F8EAF2] shadow-sm">
          <p className="text-xs text-[#9C7890] font-medium">Concluídas</p>
          <p className="text-2xl font-bold text-emerald-600 mt-1">{completedCount}</p>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-[#F8EAF2] shadow-sm">
          <p className="text-xs text-[#9C7890] font-medium">Taxa de sucesso</p>
          <p className="text-2xl font-bold text-[#75445F] mt-1">{percentage}%</p>
        </div>
      </div>

      {/* Formulário de Nova Tarefa */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl p-6 border-2 border-[#F8EAF2] shadow-sm mb-8 transition-all animate-in fade-in"
        >
          <h2 className="text-[#75445F] font-bold text-lg mb-4 flex items-center gap-2">
            <span>✨</span> Criar nova tarefa
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#75445F] mb-1.5">
                O que você precisa fazer?
              </label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Ex: Fazer resumo de Biologia, beber água..."
                className="w-full px-4 py-2.5 rounded-xl border border-[#F8EAF2] focus:outline-none focus:border-[#C77DA5] text-sm text-[#75445F]"
                autoFocus
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Categoria */}
              <div>
                <label className="block text-xs font-semibold text-[#75445F] mb-1.5">
                  Categoria
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as Category)}
                  className="w-full px-3 py-2 rounded-xl border border-[#F8EAF2] focus:outline-none focus:border-[#C77DA5] text-sm text-[#75445F] bg-white"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Prioridade */}
              <div>
                <label className="block text-xs font-semibold text-[#75445F] mb-1.5">
                  Prioridade
                </label>
                <select
                  value={newPriority}
                  onChange={(e) => setNewPriority(e.target.value as Priority)}
                  className="w-full px-3 py-2 rounded-xl border border-[#F8EAF2] focus:outline-none focus:border-[#C77DA5] text-sm text-[#75445F] bg-white"
                >
                  <option value="baixa">🟢 Baixa</option>
                  <option value="media">🟡 Média</option>
                  <option value="alta">🔴 Alta</option>
                </select>
              </div>

              {/* Prazo */}
              <div>
                <label className="block text-xs font-semibold text-[#75445F] mb-1.5">
                  Prazo / Quando
                </label>
                <input
                  type="text"
                  value={newDueDate}
                  onChange={(e) => setNewDueDate(e.target.value)}
                  placeholder="Ex: Hoje, Amanhã, Sex..."
                  className="w-full px-3 py-2 rounded-xl border border-[#F8EAF2] focus:outline-none focus:border-[#C77DA5] text-sm text-[#75445F]"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 rounded-xl text-sm text-[#9C7890] hover:bg-[#FFF9FC] cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-[#C77DA5] hover:bg-[#b56e94] text-white px-5 py-2 rounded-xl text-sm font-semibold shadow-sm transition-all cursor-pointer"
              >
                Salvar tarefa 💗
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Barra de Filtros */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        {/* Status */}
        <div className="flex items-center gap-1.5 bg-white p-1 rounded-2xl border border-[#F8EAF2]">
          <button
            type="button"
            onClick={() => setFilterStatus("todas")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
              filterStatus === "todas"
                ? "bg-[#C77DA5] text-white font-semibold shadow-xs"
                : "text-[#75445F] hover:bg-[#FFF9FC]"
            }`}
          >
            Todas ({total})
          </button>
          <button
            type="button"
            onClick={() => setFilterStatus("pendentes")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
              filterStatus === "pendentes"
                ? "bg-[#C77DA5] text-white font-semibold shadow-xs"
                : "text-[#75445F] hover:bg-[#FFF9FC]"
            }`}
          >
            Pendentes ({pendingCount})
          </button>
          <button
            type="button"
            onClick={() => setFilterStatus("concluidas")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
              filterStatus === "concluidas"
                ? "bg-[#C77DA5] text-white font-semibold shadow-xs"
                : "text-[#75445F] hover:bg-[#FFF9FC]"
            }`}
          >
            Concluídas ({completedCount})
          </button>
        </div>

        {/* Categorias */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          <button
            type="button"
            onClick={() => setSelectedCategory("Todas")}
            className={`px-3 py-1 rounded-full text-xs font-medium shrink-0 cursor-pointer transition-colors ${
              selectedCategory === "Todas"
                ? "bg-[#75445F] text-white"
                : "bg-white text-[#75445F] border border-[#F8EAF2] hover:bg-[#F8EAF2]"
            }`}
          >
            Todas
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium shrink-0 cursor-pointer transition-colors ${
                selectedCategory === cat
                  ? "bg-[#75445F] text-white"
                  : "bg-white text-[#75445F] border border-[#F8EAF2] hover:bg-[#F8EAF2]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Lista de Tarefas */}
      {!isLoaded ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-[#F8EAF2]">
          <p className="text-sm text-[#9C7890]">Carregando suas tarefas...</p>
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-[#F8EAF2]">
          <p className="text-4xl mb-3">🌸</p>
          <h3 className="text-lg font-semibold text-[#75445F]">
            Nenhuma tarefa encontrada
          </h3>
          <p className="text-sm text-[#9C7890] mt-1 max-w-sm mx-auto">
            {filterStatus === "pendentes"
              ? "Parabéns! Todas as tarefas dessa categoria foram concluídas!"
              : "Clique no botão '＋ Nova Tarefa' acima para adicionar uma nova meta."}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredTasks.map((task) => {
            const priorityBadge =
              task.priority === "alta"
                ? { label: "Alta", color: "bg-red-50 text-red-600 border-red-200" }
                : task.priority === "media"
                ? { label: "Média", color: "bg-amber-50 text-amber-600 border-amber-200" }
                : { label: "Baixa", color: "bg-emerald-50 text-emerald-600 border-emerald-200" };

            return (
              <div
                key={task.id}
                className={`group bg-white rounded-2xl p-4 border transition-all flex items-center justify-between gap-4 ${
                  task.completed
                    ? "border-[#F8EAF2] opacity-70 bg-white/70"
                    : "border-[#F8EAF2] hover:border-[#C77DA5] hover:shadow-xs"
                }`}
              >
                <div className="flex items-center gap-3.5 flex-1 min-w-0">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    className="accent-[#C77DA5] w-5 h-5 rounded cursor-pointer shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p
                      onClick={() => toggleTask(task.id)}
                      className={`text-sm font-medium cursor-pointer transition-all ${
                        task.completed
                          ? "line-through text-[#9C7890]"
                          : "text-[#75445F]"
                      }`}
                    >
                      {task.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                      <span className="text-[11px] bg-[#F8EAF2] text-[#75445F] font-medium px-2 py-0.5 rounded-full">
                        {task.category}
                      </span>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${priorityBadge.color}`}
                      >
                        {priorityBadge.label}
                      </span>
                      {task.dueDate && (
                        <span className="text-[11px] text-[#9C7890] flex items-center gap-1">
                          <span>📅</span> {task.dueDate}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Botão de excluir */}
                <button
                  type="button"
                  onClick={() => deleteTask(task.id)}
                  className="opacity-0 group-hover:opacity-100 text-[#9C7890] hover:text-red-500 hover:bg-red-50 p-2 rounded-xl transition-all cursor-pointer"
                  title="Excluir tarefa"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
