"use client";

import { useState, useEffect } from "react";
import { useLuminaTheme } from "@/hooks/useLuminaTheme";
import { useProfile } from "@/hooks/useProfile";

export default function ConfigPage() {
  const { currentThemeId, themes, changeTheme } = useLuminaTheme();
  const { name, target, updateProfile, isLoaded } = useProfile();

  const [studentName, setStudentName] = useState("Estudante");
  const [studentTarget, setStudentTarget] = useState("ENEM 2027 — Medicina / Alta Performance");
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      setStudentName(name);
      setStudentTarget(target);
    }
  }, [isLoaded, name, target]);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(studentName, studentTarget);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-5xl mx-auto space-y-6 md:space-y-8">
      {/* Cabeçalho */}
      <header>
        <h1 className="text-3xl font-extrabold text-[#75445F] flex items-center gap-2">
          <span>⚙️</span> Configurações & Personalização
        </h1>
        <p className="text-[#9C7890] text-sm mt-1">
          Personalize a estética e os dados do seu espaço pessoal no Lumina.
        </p>
      </header>

      {/* SEÇÃO 1: TEMAS DE CORES */}
      <section className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-[#F8EAF2] shadow-sm space-y-6">
        <div>
          <h2 className="text-xl font-bold text-[#75445F] flex items-center gap-2">
            <span>🎨</span> Paletas de Cores & Estéticas
          </h2>
          <p className="text-xs text-[#9C7890] mt-1">
            Escolha um dos 7 temas criados para inspirar sua rotina de estudos.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {themes.map((theme) => {
            const isSelected = currentThemeId === theme.id;

            return (
              <button
                key={theme.id}
                type="button"
                onClick={() => changeTheme(theme.id)}
                className={`p-5 rounded-2xl border transition-all text-left flex flex-col justify-between gap-4 cursor-pointer group ${
                  isSelected
                    ? "border-[#C77DA5] bg-gradient-to-br from-[#FFF9FC] to-[#F8EAF2] ring-2 ring-[#C77DA5]/30 shadow-xs scale-102"
                    : "border-[#F8EAF2] bg-white hover:border-[#C77DA5] hover:bg-[#FFF9FC]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{theme.emoji}</span>
                    {isSelected && (
                      <span className="text-[10px] bg-[#C77DA5] text-white px-2.5 py-0.5 rounded-full font-bold">
                        Ativo
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-[#75445F] text-base">{theme.name}</h3>
                  <p className="text-xs text-[#9C7890] mt-1 leading-relaxed">
                    {theme.description}
                  </p>
                </div>

                {/* Cores da Paleta */}
                <div className="flex items-center gap-2 pt-2 border-t border-[#F8EAF2]">
                  {theme.previewColors.map((color, idx) => (
                    <span
                      key={idx}
                      className="w-6 h-6 rounded-full border border-black/10 shadow-2xs"
                      style={{ backgroundColor: color }}
                    ></span>
                  ))}
                  <span className="text-[11px] text-[#9C7890] font-semibold ml-auto group-hover:text-[#C77DA5]">
                    {isSelected ? "Em uso" : "Aplicar →"}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* SEÇÃO 2: PERFIL */}
      <section className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-[#F8EAF2] shadow-sm space-y-6">
        <div>
          <h2 className="text-xl font-bold text-[#75445F] flex items-center gap-2">
            <span>👤</span> Perfil da Estudante
          </h2>
          <p className="text-xs text-[#9C7890] mt-1">
            Como você quer ser chamada no aplicativo e qual o seu foco principal.
          </p>
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-4 max-w-xl">
          <div>
            <label className="block text-xs font-semibold text-[#75445F] mb-1.5">
              Seu Nome ou Apelido
            </label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Ex: Clara, Mari, Estudante..."
              className="w-full px-4 py-2.5 rounded-2xl border border-[#F8EAF2] focus:outline-none focus:border-[#C77DA5] text-sm text-[#75445F] bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#75445F] mb-1.5">
              Sua Meta Principal no ENEM
            </label>
            <input
              type="text"
              value={studentTarget}
              onChange={(e) => setStudentTarget(e.target.value)}
              placeholder="Ex: ENEM 2027 — Medicina / 800+ Geral"
              className="w-full px-4 py-2.5 rounded-2xl border border-[#F8EAF2] focus:outline-none focus:border-[#C77DA5] text-sm text-[#75445F] bg-white"
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="bg-[#C77DA5] hover:bg-[#b56e94] text-white px-6 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              Salvar Alterações 💗
            </button>

            {savedSuccess && (
              <span className="text-xs font-bold text-emerald-600 animate-in fade-in flex items-center gap-1">
                <span>✓</span> Salvo com sucesso!
              </span>
            )}
          </div>
        </form>
      </section>

      {/* SEÇÃO 3: SOBRE O LUMINA */}
      <section className="bg-gradient-to-r from-[#F8EAF2] via-[#FFF9FC] to-[#EDE5F7] rounded-3xl p-6 border border-[#F8EAF2] text-xs text-[#75445F] space-y-2">
        <p className="font-bold text-sm text-[#C77DA5] flex items-center gap-1.5">
          <span>✨</span> Lumina Platform v1.0 (Beta)
        </p>
        <p className="text-[#9C7890] leading-relaxed">
          Desenvolvido com a filosofia de que um passo de cada vez constrói um futuro brilhante.
          Estudos, rotina, autocuidado e alta performance sem cobranças tóxicas.
        </p>
      </section>
    </div>
  );
}
