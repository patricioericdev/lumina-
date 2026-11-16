"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTasks } from "@/hooks/useTasks";
import { useHabits } from "@/hooks/useHabits";
import { useProfile } from "@/hooks/useProfile";

export default function Home() {
  const [dataFormatada, setDataFormatada] = useState("Carregando data...");
  const [saudacao, setSaudacao] = useState("Olá");
  const [diasEnem, setDiasEnem] = useState("...");

  const { name, target } = useProfile();

  const { tasks, isLoaded: tasksLoaded, toggleTask, total, completedCount, percentage } =
    useTasks();

  const {
    habits,
    isLoaded: habitsLoaded,
    isHabitDoneToday,
    toggleHabitToday,
    todayCompletedCount,
    todayTotalHabits,
  } = useHabits();

  useEffect(() => {
    const hoje = new Date();
    const diasDaSemana = [
      "Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira",
      "Quinta-feira", "Sexta-feira", "Sábado",
    ];
    const meses = [
      "janeiro", "fevereiro", "março", "abril", "maio", "junho",
      "julho", "agosto", "setembro", "outubro", "novembro", "dezembro",
    ];

    const hora = hoje.getHours();
    setSaudacao(hora < 12 ? "Bom dia" : hora < 18 ? "Boa tarde" : "Boa noite");
    setDataFormatada(
      `${diasDaSemana[hoje.getDay()]}, ${hoje.getDate()} de ${meses[hoje.getMonth()]}`
    );

    const hojeMeiaNoite = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());
    const enem2027 = new Date(2027, 10, 7);
    const diff = Math.max(0, Math.ceil((enem2027.getTime() - hojeMeiaNoite.getTime()) / 86400000));
    setDiasEnem(`${diff} dias`);
  }, []);

  const pendentes = tasks.filter((t) => !t.completed).slice(0, 4);

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-10 max-w-7xl mx-auto space-y-6 md:space-y-8">
      {/* Cabeçalho Lumina */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6 pb-2">
        <div>
          <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-[#F8EAF2] px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#9C7890] shadow-xs mb-3">
            <span>📅</span>
            <span>{dataFormatada}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#75445F] tracking-tight flex flex-wrap items-center gap-2 sm:gap-3">
            <span>{saudacao}, {name}!</span>
            <span className="text-2xl animate-pulse">✨</span>
          </h1>

          <p className="text-[#9C7890] mt-2 text-sm italic font-medium max-w-xl">
            &quot;Um passo de cada vez. Cada pequeno esforço constrói um futuro maior.&quot;
          </p>
        </div>

        {/* Badge do App */}
        <div className="bg-gradient-to-r from-rose-50 to-purple-50 border border-[#F8EAF2] px-5 py-3 rounded-2xl flex items-center gap-3 shrink-0 shadow-xs self-start md:self-auto">
          <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-sm shadow-xs">
            🌸
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-[#75445F]">Lumina</p>
            <p className="text-[10px] text-[#9C7890] truncate max-w-[200px]">{target}</p>
          </div>
        </div>
      </header>

      {/* Grid de Cards de Alta Estética */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1 - Progresso do dia */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 border border-[#F8EAF2] shadow-[0_4px_20px_-4px_rgba(199,125,165,0.06)] hover:shadow-[0_8px_30px_-4px_rgba(199,125,165,0.12)] transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[#75445F] font-bold text-base flex items-center gap-2">
                <span>📊</span> Progresso do dia
              </h2>
              <span className="text-xs font-extrabold text-[#C77DA5] bg-gradient-to-r from-[#F8EAF2] to-[#EDE5F7] px-3 py-1 rounded-full shadow-2xs">
                {tasksLoaded ? `${percentage}%` : "..."}
              </span>
            </div>

            <div className="w-full bg-[#F8EAF2] rounded-full h-3 overflow-hidden p-0.5">
              <div
                className="bg-gradient-to-r from-[#C77DA5] to-[#D488AC] h-2 rounded-full transition-all duration-700 ease-out shadow-xs"
                style={{ width: `${tasksLoaded ? percentage : 0}%` }}
              ></div>
            </div>

            <p className="text-xs text-[#9C7890] font-medium mt-3.5 flex items-center justify-between">
              <span>{completedCount} de {total} tarefas concluídas</span>
              <span>{tasksLoaded ? `${percentage}% concluído` : ""}</span>
            </p>
          </div>

          <div className="mt-5 pt-3.5 border-t border-[#F8EAF2] text-xs text-[#75445F] font-medium flex items-center gap-2 bg-[#FFF9FC] p-3 rounded-2xl">
            <span>✨</span>
            <span className="truncate">
              {percentage === 100
                ? "Dia produtivo completo! Descanse bem."
                : percentage >= 50
                ? "Você já passou da metade, continue assim!"
                : "Mantenha o foco, você é capaz!"}
            </span>
          </div>
        </div>

        {/* Card 2 - Próximos estudos */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 border border-[#F8EAF2] shadow-[0_4px_20px_-4px_rgba(199,125,165,0.06)] hover:shadow-[0_8px_30px_-4px_rgba(199,125,165,0.12)] transition-all flex flex-col justify-between">
          <div>
            <h2 className="text-[#75445F] font-bold text-base mb-4 flex items-center gap-2">
              <span>📚</span> Próximos estudos
            </h2>
            <ul className="space-y-3 text-sm text-[#75445F]">
              <li className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-[#FFF9FC] transition-colors">
                <span className="w-2.5 h-2.5 bg-[#C77DA5] rounded-full shrink-0 shadow-2xs"></span>
                <span className="font-medium">Matemática — Álgebra & Funções</span>
              </li>
              <li className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-[#FFF9FC] transition-colors">
                <span className="w-2.5 h-2.5 bg-[#B36B92] rounded-full shrink-0 shadow-2xs"></span>
                <span className="font-medium">Biologia — Ecologia & Impactos</span>
              </li>
              <li className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-[#FFF9FC] transition-colors">
                <span className="w-2.5 h-2.5 bg-[#EDE5F7] rounded-full shrink-0 border border-[#C77DA5]"></span>
                <span className="font-medium">Redação — 15 Repertórios Coringas</span>
              </li>
            </ul>
          </div>

          <Link
            href="/estudos"
            className="mt-5 pt-3.5 border-t border-[#F8EAF2] text-xs font-bold text-[#C77DA5] hover:text-[#75445F] flex items-center justify-between group transition-colors"
          >
            <span>Acessar Central ENEM</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        {/* Card 3 - Tarefas pendentes */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 border border-[#F8EAF2] shadow-[0_4px_20px_-4px_rgba(199,125,165,0.06)] hover:shadow-[0_8px_30px_-4px_rgba(199,125,165,0.12)] transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[#75445F] font-bold text-base flex items-center gap-2">
                <span>✅</span> Tarefas pendentes
              </h2>
              <span className="text-[11px] bg-[#EDE5F7] text-[#75445F] px-2.5 py-0.5 rounded-full font-bold">
                {pendentes.length} pendentes
              </span>
            </div>

            {pendentes.length === 0 ? (
              <div className="text-center py-6 text-sm text-[#9C7890]">
                <p className="text-3xl mb-1">🎉</p>
                <p className="font-bold text-[#75445F]">Tudo em dia!</p>
                <p className="text-xs mt-0.5">Nenhuma tarefa pendente no momento.</p>
              </div>
            ) : (
              <ul className="space-y-2.5 text-sm text-[#75445F]">
                {pendentes.map((task) => (
                  <li
                    key={task.id}
                    className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-[#FFF9FC] transition-colors group cursor-pointer"
                    onClick={() => toggleTask(task.id)}
                  >
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                      className="accent-[#C77DA5] rounded mt-0.5 cursor-pointer shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p
                        className={`truncate leading-snug font-medium transition-all ${
                          task.completed
                            ? "line-through text-[#9C7890]"
                            : "group-hover:text-[#C77DA5]"
                        }`}
                      >
                        {task.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] bg-[#F8EAF2] text-[#75445F] font-semibold px-2 py-0.2 rounded-md">
                          {task.category}
                        </span>
                        {task.dueDate && (
                          <span className="text-[10px] text-[#9C7890] font-medium">
                            {task.dueDate}
                          </span>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <Link
            href="/tarefas"
            className="mt-5 pt-3.5 border-t border-[#F8EAF2] text-xs font-bold text-[#C77DA5] hover:text-[#75445F] flex items-center justify-between group transition-colors"
          >
            <span>Gerenciar todas as tarefas</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        {/* Card 4 - ENEM 2027 (Card Destaque) */}
        <div className="bg-gradient-to-br from-[#C77DA5] via-[#B86B94] to-[#8E446C] rounded-3xl p-7 text-white shadow-md shadow-[#C77DA5]/20 flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute -right-6 -bottom-6 text-8xl opacity-10 pointer-events-none select-none">
            🎯
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-extrabold uppercase tracking-wider bg-white/20 px-3 py-0.5 rounded-full backdrop-blur-xs">
                Contagem Regressiva
              </span>
              <span className="text-lg">✨</span>
            </div>

            <p className="text-4xl lg:text-5xl font-black my-2 tracking-tight">{diasEnem}</p>
            <p className="text-xs text-pink-100 font-medium leading-relaxed opacity-95">
              Cada hora dedicada hoje é um passo mais perto da sua vaga dos sonhos.
            </p>
          </div>

          <Link
            href="/estudos"
            className="mt-5 pt-3.5 border-t border-white/20 text-xs font-bold text-white/95 hover:text-white flex items-center justify-between group-hover:translate-x-0.5 transition-all"
          >
            <span>Acessar as últimas 5 provas</span>
            <span>→</span>
          </Link>
        </div>

        {/* Card 5 - Hábitos de hoje */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 border border-[#F8EAF2] shadow-[0_4px_20px_-4px_rgba(199,125,165,0.06)] hover:shadow-[0_8px_30px_-4px_rgba(199,125,165,0.12)] transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[#75445F] font-bold text-base flex items-center gap-2">
                <span>🌿</span> Hábitos de hoje
              </h2>
              <span className="text-xs bg-[#F8EAF2] text-[#C77DA5] px-2.5 py-0.5 rounded-full font-extrabold">
                {habitsLoaded ? `${todayCompletedCount}/${todayTotalHabits}` : "..."}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {habits.slice(0, 6).map((habit) => {
                const isDone = isHabitDoneToday(habit);

                return (
                  <button
                    key={habit.id}
                    type="button"
                    onClick={() => toggleHabitToday(habit.id)}
                    className={`text-xs px-3.5 py-2 rounded-2xl font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                      isDone
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-200 shadow-2xs scale-102"
                        : "bg-[#FFF9FC] text-[#75445F] border border-[#F8EAF2] hover:bg-[#F8EAF2]"
                    }`}
                  >
                    <span>{isDone ? "✓" : habit.icon}</span>
                    <span>{habit.name.split(" ")[0]} {habit.name.split(" ")[1] || ""}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <Link
            href="/habitos"
            className="mt-5 pt-3.5 border-t border-[#F8EAF2] text-xs font-bold text-[#C77DA5] hover:text-[#75445F] flex items-center justify-between group transition-colors"
          >
            <span>Abrir hábitos & diário</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        {/* Card 6 - Resumo semanal */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 border border-[#F8EAF2] shadow-[0_4px_20px_-4px_rgba(199,125,165,0.06)] hover:shadow-[0_8px_30px_-4px_rgba(199,125,165,0.12)] transition-all flex flex-col justify-between">
          <div>
            <h2 className="text-[#75445F] font-bold text-base mb-4 flex items-center gap-2">
              <span>📈</span> Esta semana
            </h2>
            <div className="space-y-3 text-sm text-[#75445F]">
              <div className="flex justify-between items-center p-2 rounded-xl bg-[#FFF9FC] border border-[#F8EAF2]">
                <span className="font-medium text-xs">Horas focadas</span>
                <span className="font-extrabold text-[#C77DA5]">12 horas</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded-xl bg-[#FFF9FC] border border-[#F8EAF2]">
                <span className="font-medium text-xs">Tarefas concluídas</span>
                <span className="font-extrabold text-[#C77DA5]">
                  {completedCount}/{total} metas
                </span>
              </div>
              <div className="flex justify-between items-center p-2 rounded-xl bg-[#FFF9FC] border border-[#F8EAF2]">
                <span className="font-medium text-xs">Hábitos cumpridos</span>
                <span className="font-extrabold text-emerald-600">
                  {todayCompletedCount}/{todayTotalHabits} hoje
                </span>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3.5 border-t border-[#F8EAF2] text-xs text-[#9C7890] flex items-center gap-1.5 font-medium">
            <span>🌸</span>
            <span>Cada hábito é um abraço na sua rotina.</span>
          </div>
        </div>
      </div>

      {/* ── Atalhos Rápidos de Estudos de Alta Performance ── */}
      <section className="bg-gradient-to-r from-[#F8EAF2] via-white to-[#EDE5F7] rounded-3xl p-6 sm:p-7 border border-[#F8EAF2] shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-lg font-bold text-[#75445F] flex items-center gap-2">
              <span>🚀</span> Ferramentas de Estudos & Alta Performance
            </h2>
            <p className="text-xs text-[#9C7890] mt-0.5">
              Acesso rápido às suas estações de revisão, fórmulas e aulas.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Link
            href="/ferretto"
            className="p-4 rounded-2xl bg-white border border-[#F8EAF2] hover:border-[#C77DA5] hover:shadow-xs transition-all flex flex-col justify-between group cursor-pointer"
          >
            <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">🎓</div>
            <div>
              <p className="font-bold text-xs sm:text-sm text-[#75445F]">Hub Ferretto</p>
              <p className="text-[10px] text-[#9C7890] mt-0.5">Aulas, portal & playlists</p>
            </div>
          </Link>

          <Link
            href="/formulas"
            className="p-4 rounded-2xl bg-white border border-[#F8EAF2] hover:border-[#C77DA5] hover:shadow-xs transition-all flex flex-col justify-between group cursor-pointer"
          >
            <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">🧮</div>
            <div>
              <p className="font-bold text-xs sm:text-sm text-[#75445F]">Banco de Fórmulas</p>
              <p className="text-[10px] text-[#9C7890] mt-0.5">Mat, Fís, Quím & Bio</p>
            </div>
          </Link>

          <Link
            href="/pomodoro"
            className="p-4 rounded-2xl bg-white border border-[#F8EAF2] hover:border-[#C77DA5] hover:shadow-xs transition-all flex flex-col justify-between group cursor-pointer"
          >
            <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">🍅</div>
            <div>
              <p className="font-bold text-xs sm:text-sm text-[#75445F]">Timer Pomodoro</p>
              <p className="text-[10px] text-[#9C7890] mt-0.5">Sessões de 25 min & pausas</p>
            </div>
          </Link>

          <Link
            href="/erros"
            className="p-4 rounded-2xl bg-white border border-[#F8EAF2] hover:border-[#C77DA5] hover:shadow-xs transition-all flex flex-col justify-between group cursor-pointer"
          >
            <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">📝</div>
            <div>
              <p className="font-bold text-xs sm:text-sm text-[#75445F]">Caderno de Erros</p>
              <p className="text-[10px] text-[#9C7890] mt-0.5">Revisão inteligente</p>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
