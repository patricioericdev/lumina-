"use client";

import { useState } from "react";
import { useHabits } from "@/hooks/useHabits";
import { MoodType, Habit } from "@/types/habits";

const MOODS_CONFIG: Record<
  MoodType,
  { label: string; icon: string; color: string; message: string }
> = {
  radiante: {
    label: "Radiante",
    icon: "✨",
    color: "bg-amber-100 text-amber-800 border-amber-300",
    message: "Que energia incrível! Aproveite esse ânimo para avançar nos conteúdos mais desafiadores.",
  },
  bem: {
    label: "Muito bem",
    icon: "🌸",
    color: "bg-pink-100 text-pink-800 border-pink-300",
    message: "Que bom! Mantenha essa leveza e equilíbrio na sua rotina de hoje.",
  },
  calma: {
    label: "Tranquila",
    icon: "🌿",
    color: "bg-emerald-100 text-emerald-800 border-emerald-300",
    message: "A serenidade e a paz interior são o melhor estado mental para reter conteúdos complexos.",
  },
  cansada: {
    label: "Cansada",
    icon: "🌙",
    color: "bg-indigo-100 text-indigo-800 border-indigo-300",
    message: "Tudo bem se sentir assim. Descanso também é parte do estudo! Não hesite em fazer pausas maiores e dormir cedo hoje.",
  },
  ansiosa: {
    label: "Ansiosa",
    icon: "🌧️",
    color: "bg-purple-100 text-purple-800 border-purple-300",
    message: "Respire fundo. A preparação pro ENEM 2027 é uma caminhada de paciência. Você não precisa resolver tudo hoje — apenas dê um passinho de cada vez.",
  },
};

const AVAILABLE_ICONS = ["💧", "📖", "🧘", "😴", "🍎", "🏃‍♀️", "🧹", "🧠", "🌿", "✨", "🍵", "🎨"];

export default function HabitosPage() {
  const {
    habits,
    journalEntries,
    todayMood,
    isLoaded,
    isHabitDoneToday,
    toggleHabitToday,
    addHabit,
    deleteHabit,
    addJournalEntry,
    deleteJournalEntry,
    setTodayMood,
    weeklyDays,
    todayCompletedCount,
    todayTotalHabits,
  } = useHabits();

  const [activeTab, setActiveTab] = useState<"habitos" | "diario">("habitos");

  // Estado para novo hábito
  const [showAddHabit, setShowAddHabit] = useState(false);
  const [newHabitName, setNewHabitName] = useState("");
  const [newHabitIcon, setNewHabitIcon] = useState("🌿");
  const [newHabitCategory, setNewHabitCategory] = useState<Habit["category"]>("Saúde");

  // Estado para nova entrada de diário
  const [showAddJournal, setShowAddJournal] = useState(false);
  const [journalTitle, setJournalTitle] = useState("");
  const [journalContent, setJournalContent] = useState("");
  const [journalMood, setJournalMood] = useState<MoodType>("bem");
  const [journalGratitude, setJournalGratitude] = useState("");

  const handleCreateHabit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHabitName.trim()) return;
    addHabit(newHabitName, newHabitIcon, newHabitCategory);
    setNewHabitName("");
    setShowAddHabit(false);
  };

  const handleCreateJournal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!journalContent.trim()) return;
    addJournalEntry(journalTitle, journalContent, journalMood, journalGratitude);
    setJournalTitle("");
    setJournalContent("");
    setJournalGratitude("");
    setShowAddJournal(false);
  };

  const maxStreak = habits.length > 0 ? Math.max(...habits.map((h) => h.streak)) : 0;

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-6xl mx-auto space-y-8">
      {/* Cabeçalho */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#75445F] flex items-center gap-2">
            <span>🌿</span> Hábitos & Bem-estar
          </h1>
          <p className="text-[#9C7890] text-sm mt-1">
            Cuidar de você é o primeiro passo para aprender melhor. Uma rotina equilibrada e acolhedora.
          </p>
        </div>

        {activeTab === "habitos" ? (
          <button
            type="button"
            onClick={() => setShowAddHabit(!showAddHabit)}
            className="bg-[#C77DA5] hover:bg-[#b56e94] text-white px-5 py-2.5 rounded-2xl text-sm font-semibold shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            <span>{showAddHabit ? "✕ Fechar" : "＋ Novo Hábito"}</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setShowAddJournal(!showAddJournal)}
            className="bg-[#C77DA5] hover:bg-[#b56e94] text-white px-5 py-2.5 rounded-2xl text-sm font-semibold shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            <span>{showAddJournal ? "✕ Fechar" : "＋ Escrever no Diário"}</span>
          </button>
        )}
      </header>

      {/* Card de Check-in de Humor / Sentimento do Dia */}
      <div className="bg-white rounded-3xl p-6 border border-[#F8EAF2] shadow-sm">
        <h2 className="text-sm font-bold text-[#75445F] mb-1 flex items-center gap-2">
          <span>🌸</span> Como você está se sentindo hoje?
        </h2>
        <p className="text-xs text-[#9C7890] mb-4">
          Sem julgamentos e sem cobranças. Registrar suas emoções ajuda no autoconhecimento.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {(Object.keys(MOODS_CONFIG) as MoodType[]).map((moodKey) => {
            const mood = MOODS_CONFIG[moodKey];
            const isSelected = todayMood === moodKey;

            return (
              <button
                key={moodKey}
                type="button"
                onClick={() => setTodayMood(moodKey)}
                className={`flex items-center justify-center gap-2 px-3 py-3 rounded-2xl text-xs font-semibold border transition-all cursor-pointer ${
                  isSelected
                    ? `${mood.color} scale-102 shadow-xs font-bold ring-2 ring-[#C77DA5]/30`
                    : "bg-[#FFF9FC] border-[#F8EAF2] text-[#75445F] hover:bg-white hover:border-[#C77DA5]"
                }`}
              >
                <span className="text-lg">{mood.icon}</span>
                <span>{mood.label}</span>
              </button>
            );
          })}
        </div>

        {todayMood && (
          <div className="mt-4 p-3.5 bg-[#FFF9FC] rounded-2xl border border-[#F8EAF2] flex items-center gap-2.5 animate-in fade-in">
            <span className="text-lg">{MOODS_CONFIG[todayMood].icon}</span>
            <p className="text-xs text-[#75445F] leading-relaxed">
              {MOODS_CONFIG[todayMood].message}
            </p>
          </div>
        )}
      </div>

      {/* Abas: Hábitos vs Diário */}
      <div className="flex items-center gap-3 border-b border-[#F8EAF2] pb-3">
        <button
          type="button"
          onClick={() => setActiveTab("habitos")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all cursor-pointer ${
            activeTab === "habitos"
              ? "bg-[#F8EAF2] text-[#C77DA5] shadow-xs"
              : "text-[#75445F] hover:bg-white"
          }`}
        >
          <span>🌿</span>
          <span>Rastreador de Hábitos</span>
          <span className="text-xs bg-white text-[#C77DA5] px-2 py-0.5 rounded-full font-bold ml-1">
            {todayCompletedCount}/{todayTotalHabits}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("diario")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all cursor-pointer ${
            activeTab === "diario"
              ? "bg-[#F8EAF2] text-[#C77DA5] shadow-xs"
              : "text-[#75445F] hover:bg-white"
          }`}
        >
          <span>📖</span>
          <span>Diário Pessoal</span>
          <span className="text-xs bg-white text-[#C77DA5] px-2 py-0.5 rounded-full font-bold ml-1">
            {journalEntries.length}
          </span>
        </button>
      </div>

      {/* =========================================================================
          ABA 1: RASTREADOR DE HÁBITOS
         ========================================================================= */}
      {activeTab === "habitos" && (
        <div className="space-y-6">
          {/* Métricas e Calendário da Semana */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card Concluídos Hoje */}
            <div className="bg-white rounded-3xl p-6 border border-[#F8EAF2] shadow-sm flex flex-col justify-between">
              <div>
                <p className="text-xs text-[#9C7890] font-semibold">Hábitos Concluídos Hoje</p>
                <p className="text-3xl font-bold text-[#75445F] mt-2">
                  {todayCompletedCount} <span className="text-base text-[#9C7890] font-normal">/ {todayTotalHabits}</span>
                </p>
              </div>

              <div className="w-full bg-[#F8EAF2] rounded-full h-2.5 overflow-hidden mt-4">
                <div
                  className="bg-[#C77DA5] h-2.5 rounded-full transition-all duration-500"
                  style={{
                    width: `${todayTotalHabits === 0 ? 0 : Math.round((todayCompletedCount / todayTotalHabits) * 100)}%`,
                  }}
                ></div>
              </div>
            </div>

            {/* Card Sequência Máxima */}
            <div className="bg-white rounded-3xl p-6 border border-[#F8EAF2] shadow-sm flex flex-col justify-between">
              <div>
                <p className="text-xs text-[#9C7890] font-semibold">Maior Constância Atual</p>
                <p className="text-3xl font-bold text-amber-600 mt-2 flex items-center gap-2">
                  <span>🔥</span>
                  <span>{maxStreak} dias</span>
                </p>
              </div>
              <p className="text-xs text-[#9C7890] mt-3">
                Pequenas ações diárias constroem aprovações grandiosas.
              </p>
            </div>

            {/* Calendário da Semana Atual */}
            <div className="bg-white rounded-3xl p-6 border border-[#F8EAF2] shadow-sm flex flex-col justify-between">
              <p className="text-xs text-[#9C7890] font-semibold mb-3">Sua Semana</p>
              <div className="grid grid-cols-7 gap-1.5 text-center">
                {weeklyDays.map((day) => (
                  <div
                    key={day.dateStr}
                    className={`p-2 rounded-xl text-center flex flex-col items-center justify-center ${
                      day.isToday
                        ? "bg-[#C77DA5] text-white font-bold shadow-xs"
                        : "bg-[#FFF9FC] text-[#75445F] border border-[#F8EAF2]"
                    }`}
                  >
                    <span className="text-[10px] opacity-80">{day.label}</span>
                    <span className="text-xs mt-0.5">{day.dayNumber}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* FORMULÁRIO: NOVO HÁBITO */}
          {showAddHabit && (
            <form
              onSubmit={handleCreateHabit}
              className="bg-white p-6 rounded-3xl border-2 border-[#F8EAF2] shadow-sm animate-in fade-in space-y-4"
            >
              <h3 className="text-[#75445F] font-bold text-base flex items-center gap-2">
                <span>✨</span> Cadastrar novo hábito saudável
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#75445F] mb-1">
                    Nome do Hábito
                  </label>
                  <input
                    type="text"
                    value={newHabitName}
                    onChange={(e) => setNewHabitName(e.target.value)}
                    placeholder="Ex: Beber chá antes de dormir, 15 min de yoga..."
                    className="w-full px-4 py-2.5 rounded-xl border border-[#F8EAF2] focus:outline-none focus:border-[#C77DA5] text-sm text-[#75445F]"
                    required
                    autoFocus
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#75445F] mb-1">
                    Categoria
                  </label>
                  <select
                    value={newHabitCategory}
                    onChange={(e) => setNewHabitCategory(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#F8EAF2] text-sm text-[#75445F] bg-white focus:outline-none focus:border-[#C77DA5]"
                  >
                    <option value="Saúde">💧 Saúde</option>
                    <option value="Mente">🧠 Mente / Bem-estar</option>
                    <option value="Estudos">📚 Estudos</option>
                    <option value="Rotina">🧹 Rotina & Casa</option>
                  </select>
                </div>
              </div>

              {/* Seletor de Ícones */}
              <div>
                <label className="block text-xs font-semibold text-[#75445F] mb-2">
                  Escolha um ícone fofo:
                </label>
                <div className="flex flex-wrap gap-2">
                  {AVAILABLE_ICONS.map((icon) => (
                    <button
                      key={icon}
                      type="button"
                      onClick={() => setNewHabitIcon(icon)}
                      className={`w-10 h-10 rounded-xl text-lg flex items-center justify-center transition-all cursor-pointer ${
                        newHabitIcon === icon
                          ? "bg-[#C77DA5] text-white scale-110 shadow-xs"
                          : "bg-[#FFF9FC] border border-[#F8EAF2] hover:bg-[#F8EAF2]"
                      }`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddHabit(false)}
                  className="px-4 py-2 rounded-xl text-xs text-[#9C7890] hover:bg-[#FFF9FC] cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-[#C77DA5] text-white px-5 py-2 rounded-xl text-xs font-semibold hover:bg-[#b56e94] cursor-pointer shadow-xs"
                >
                  Salvar Hábito 💗
                </button>
              </div>
            </form>
          )}

          {/* Lista de Hábitos */}
          {!isLoaded ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-[#F8EAF2]">
              <p className="text-xs text-[#9C7890]">Carregando seus hábitos...</p>
            </div>
          ) : habits.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-[#F8EAF2]">
              <p className="text-4xl mb-2">🌿</p>
              <h3 className="font-bold text-[#75445F]">Nenhum hábito cadastrado</h3>
              <p className="text-xs text-[#9C7890] mt-1">
                Clique no botão &quot;＋ Novo Hábito&quot; para começar sua rotina.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {habits.map((habit) => {
                const isDone = isHabitDoneToday(habit);

                return (
                  <div
                    key={habit.id}
                    className={`bg-white rounded-3xl p-5 border transition-all flex items-center justify-between gap-4 group ${
                      isDone
                        ? "border-emerald-200 bg-emerald-50/15"
                        : "border-[#F8EAF2] hover:border-[#C77DA5]"
                    }`}
                  >
                    <div className="flex items-center gap-3.5 flex-1 min-w-0">
                      <button
                        type="button"
                        onClick={() => toggleHabitToday(habit.id)}
                        className={`w-9 h-9 rounded-2xl flex items-center justify-center text-lg shrink-0 transition-transform cursor-pointer hover:scale-110 ${
                          isDone
                            ? "bg-emerald-500 text-white shadow-xs"
                            : "bg-[#FFF9FC] border border-[#F8EAF2]"
                        }`}
                        title={isDone ? "Clique para desmarcar" : "Clique para marcar como feito"}
                      >
                        {isDone ? "✓" : habit.icon}
                      </button>

                      <div className="flex-1 min-w-0">
                        <p
                          onClick={() => toggleHabitToday(habit.id)}
                          className={`text-sm font-semibold truncate cursor-pointer transition-colors ${
                            isDone ? "text-emerald-900" : "text-[#75445F] group-hover:text-[#C77DA5]"
                          }`}
                        >
                          {habit.name}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] bg-[#EDE5F7] text-[#75445F] px-2 py-0.5 rounded-full font-medium">
                            {habit.category}
                          </span>
                          {habit.streak > 0 && (
                            <span className="text-[10px] text-amber-700 font-semibold flex items-center gap-0.5 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                              <span>🔥</span> {habit.streak} {habit.streak === 1 ? "dia" : "dias"}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => toggleHabitToday(habit.id)}
                        className={`text-xs px-3.5 py-1.5 rounded-xl font-semibold transition-all cursor-pointer ${
                          isDone
                            ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                            : "bg-[#F8EAF2] text-[#C77DA5] hover:bg-[#C77DA5] hover:text-white"
                        }`}
                      >
                        {isDone ? "Concluído" : "Fazer"}
                      </button>

                      <button
                        type="button"
                        onClick={() => deleteHabit(habit.id)}
                        className="opacity-0 group-hover:opacity-100 text-[#9C7890] hover:text-red-500 p-1.5 rounded-xl transition-all cursor-pointer"
                        title="Excluir hábito"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          ABA 2: DIÁRIO PESSOAL & REFLEXÕES
         ========================================================================= */}
      {activeTab === "diario" && (
        <div className="space-y-6">
          {/* FORMULÁRIO: ESCREVER NO DIÁRIO */}
          {showAddJournal && (
            <form
              onSubmit={handleCreateJournal}
              className="bg-white p-6 rounded-3xl border-2 border-[#F8EAF2] shadow-sm animate-in fade-in space-y-4"
            >
              <h3 className="text-[#75445F] font-bold text-base flex items-center gap-2">
                <span>📖</span> Escrever no diário pessoal
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#75445F] mb-1">
                    Título do seu relato (opcional)
                  </label>
                  <input
                    type="text"
                    value={journalTitle}
                    onChange={(e) => setJournalTitle(e.target.value)}
                    placeholder="Ex: Como me senti estudando hoje..."
                    className="w-full px-4 py-2.5 rounded-xl border border-[#F8EAF2] focus:outline-none focus:border-[#C77DA5] text-sm text-[#75445F]"
                    autoFocus
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#75445F] mb-1">
                    Como você estava se sentindo?
                  </label>
                  <select
                    value={journalMood}
                    onChange={(e) => setJournalMood(e.target.value as MoodType)}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#F8EAF2] text-sm text-[#75445F] bg-white focus:outline-none focus:border-[#C77DA5]"
                  >
                    <option value="radiante">✨ Radiante</option>
                    <option value="bem">🌸 Muito bem</option>
                    <option value="calma">🌿 Tranquila / Calma</option>
                    <option value="cansada">🌙 Cansada</option>
                    <option value="ansiosa">🌧️ Ansiosa / Sensível</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#75445F] mb-1">
                  Seus pensamentos e sentimentos do dia
                </label>
                <textarea
                  rows={4}
                  value={journalContent}
                  onChange={(e) => setJournalContent(e.target.value)}
                  placeholder="Escreva livremente sobre como foram seus estudos, desafios ou momentos de paz..."
                  className="w-full px-4 py-3 rounded-2xl border border-[#F8EAF2] focus:outline-none focus:border-[#C77DA5] text-sm text-[#75445F] leading-relaxed resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#75445F] mb-1">
                  Uma coisa boa pela qual sou grata hoje (Gratidão)
                </label>
                <input
                  type="text"
                  value={journalGratitude}
                  onChange={(e) => setJournalGratitude(e.target.value)}
                  placeholder="Ex: Grata por ter conseguido descansar 30 minutos sem culpa..."
                  className="w-full px-4 py-2.5 rounded-xl border border-[#F8EAF2] focus:outline-none focus:border-[#C77DA5] text-sm text-[#75445F]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddJournal(false)}
                  className="px-4 py-2 rounded-xl text-xs text-[#9C7890] hover:bg-[#FFF9FC] cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-[#C77DA5] text-white px-5 py-2.5 rounded-xl text-xs font-semibold hover:bg-[#b56e94] cursor-pointer shadow-xs"
                >
                  Salvar no Diário 💗
                </button>
              </div>
            </form>
          )}

          {/* Lista de Registros do Diário */}
          {journalEntries.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-[#F8EAF2]">
              <p className="text-4xl mb-2">📖</p>
              <h3 className="font-bold text-[#75445F]">Seu diário está em branco</h3>
              <p className="text-xs text-[#9C7890] mt-1">
                Escreva seu primeiro pensamento ou momento especial para guardar aqui.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {journalEntries.map((entry) => {
                const moodConfig = MOODS_CONFIG[entry.mood];

                return (
                  <div
                    key={entry.id}
                    className="bg-white rounded-3xl p-6 border border-[#F8EAF2] shadow-xs flex flex-col justify-between hover:border-[#C77DA5] transition-all group"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${moodConfig.color}`}
                          >
                            {moodConfig.icon} {moodConfig.label}
                          </span>
                          <span className="text-xs text-[#9C7890]">{entry.date}</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => deleteJournalEntry(entry.id)}
                          className="opacity-0 group-hover:opacity-100 text-[#9C7890] hover:text-red-500 p-1 rounded-lg transition-all cursor-pointer"
                          title="Excluir relato"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>

                      <h3 className="font-bold text-[#75445F] text-base mb-2">{entry.title}</h3>

                      <p className="text-sm text-[#75445F] leading-relaxed whitespace-pre-line">
                        {entry.content}
                      </p>

                      {entry.gratitude && (
                        <div className="mt-4 p-3 bg-[#FFF9FC] border border-[#F8EAF2] rounded-2xl flex items-center gap-2">
                          <span>✨</span>
                          <p className="text-xs text-[#75445F]">
                            <strong>Gratidão:</strong> {entry.gratitude}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
