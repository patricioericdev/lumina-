"use client";

import { useState, useEffect } from "react";
import { FORMULAS_DATA } from "@/data/formulasData";
import { FORMULA_SUBJECTS, FormulaSubject } from "@/types/formulas";

export default function FormulasPage() {
  const [activeSubject, setActiveSubject] = useState<FormulaSubject>("matematica");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todas");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => { setIsLoaded(true); }, []);

  const subjectFormulas = FORMULAS_DATA.filter((f) => f.subject === activeSubject);

  const categories = ["Todas", ...Array.from(new Set(subjectFormulas.map((f) => f.category)))];

  const filtered = subjectFormulas.filter((f) => {
    const matchCat = activeCategory === "Todas" || f.category === activeCategory;
    const term = searchTerm.toLowerCase();
    const matchSearch =
      !term ||
      f.title.toLowerCase().includes(term) ||
      f.formula.toLowerCase().includes(term) ||
      f.description.toLowerCase().includes(term) ||
      f.tags.some((t) => t.toLowerCase().includes(term));
    return matchCat && matchSearch;
  });

  const grouped: Record<string, typeof filtered> = {};
  for (const f of filtered) {
    if (!grouped[f.category]) grouped[f.category] = [];
    grouped[f.category].push(f);
  }

  const copyFormula = (formula: string, id: string) => {
    navigator.clipboard.writeText(formula).catch(() => {});
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const subjectConfig: Record<FormulaSubject, { color: string; bg: string; border: string }> = {
    matematica: { color: "#4A9BB5", bg: "from-[#4A9BB5] to-[#246A82]", border: "border-blue-100" },
    fisica:     { color: "#C77DA5", bg: "from-[#C77DA5] to-[#8E446C]", border: "border-pink-100" },
    quimica:    { color: "#6FAE7B", bg: "from-[#6FAE7B] to-[#3D7A4A]", border: "border-green-100" },
    biologia:   { color: "#A78BCA", bg: "from-[#A78BCA] to-[#6B4FA0]", border: "border-purple-100" },
  };
  const cfg = subjectConfig[activeSubject];

  if (!isLoaded) return null;

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-5xl mx-auto space-y-6 md:space-y-8">
      {/* Cabeçalho */}
      <header>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#75445F] flex items-center gap-2">
          <span>🧮</span> Banco de Fórmulas
        </h1>
        <p className="text-[#9C7890] text-sm mt-1">
          Todas as fórmulas essenciais do ENEM organizadas por matéria e categoria.
        </p>
      </header>

      {/* Seletor de Matéria */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {FORMULA_SUBJECTS.map((sub) => {
          const isActive = activeSubject === sub.id;
          const c = subjectConfig[sub.id];
          return (
            <button
              key={sub.id}
              type="button"
              onClick={() => { setActiveSubject(sub.id); setActiveCategory("Todas"); setSearchTerm(""); }}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                isActive
                  ? `bg-gradient-to-br ${c.bg} text-white shadow-md`
                  : `bg-white/90 ${c.border} hover:border-opacity-50 text-[#75445F] hover:shadow-sm border-[#F8EAF2]`
              }`}
            >
              <div className="text-2xl mb-1">{sub.emoji}</div>
              <div className={`text-sm font-bold ${isActive ? "text-white" : "text-[#75445F]"}`}>
                {sub.label}
              </div>
              <div className={`text-xs mt-0.5 ${isActive ? "text-white/70" : "text-[#9C7890]"}`}>
                {FORMULAS_DATA.filter((f) => f.subject === sub.id).length} fórmulas
              </div>
            </button>
          );
        })}
      </div>

      {/* Busca + Filtro por Categoria */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="🔍 Buscar fórmula, título ou palavra-chave..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2.5 rounded-2xl border border-[#F8EAF2] focus:outline-none focus:border-[#C77DA5] text-sm text-[#75445F] bg-white/90"
        />
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none shrink-0">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                activeCategory === cat
                  ? "text-white border-transparent shadow-sm"
                  : "bg-white/90 text-[#75445F] border-[#F8EAF2] hover:border-[#C77DA5]"
              }`}
              style={activeCategory === cat ? { backgroundColor: cfg.color } : {}}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Contagem */}
      <p className="text-xs text-[#9C7890] font-medium">
        {filtered.length} fórmula{filtered.length !== 1 ? "s" : ""} encontrada{filtered.length !== 1 ? "s" : ""}
      </p>

      {/* Lista agrupada por categoria */}
      {Object.entries(grouped).map(([category, formulas]) => (
        <section key={category}>
          <h2
            className="text-sm font-bold mb-3 flex items-center gap-2 px-1"
            style={{ color: cfg.color }}
          >
            <span
              className="w-5 h-5 rounded-lg flex items-center justify-center text-white text-[10px] font-black"
              style={{ backgroundColor: cfg.color }}
            >
              {formulas.length}
            </span>
            {category}
          </h2>

          <div className="space-y-2.5">
            {formulas.map((formula) => {
              const isExpanded = expandedId === formula.id;
              return (
                <div
                  key={formula.id}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl border border-[#F8EAF2] shadow-sm overflow-hidden transition-all"
                >
                  {/* Cabeçalho do card */}
                  <div
                    className="p-4 cursor-pointer flex items-start justify-between gap-3"
                    onClick={() => setExpandedId(isExpanded ? null : formula.id)}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm text-[#75445F] mb-1">{formula.title}</p>
                      {/* Fórmula em destaque */}
                      <div
                        className="font-mono text-sm font-semibold px-3 py-2 rounded-xl bg-[#FFF9FC] border inline-block max-w-full overflow-x-auto"
                        style={{ color: cfg.color, borderColor: cfg.color + "30" }}
                      >
                        {formula.formula}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); copyFormula(formula.formula, formula.id); }}
                        className="w-7 h-7 rounded-lg bg-[#F8EAF2] hover:bg-[#EDE5F7] flex items-center justify-center transition-all cursor-pointer text-xs"
                        title="Copiar fórmula"
                      >
                        {copiedId === formula.id ? "✓" : "📋"}
                      </button>
                      <span className="text-[#9C7890] text-xs">{isExpanded ? "▲" : "▼"}</span>
                    </div>
                  </div>

                  {/* Detalhes expandidos */}
                  {isExpanded && (
                    <div className="px-4 pb-4 border-t border-[#F8EAF2] pt-3 space-y-2.5">
                      <p className="text-xs text-[#75445F] leading-relaxed">{formula.description}</p>

                      {formula.variables && (
                        <div className="text-xs bg-[#FFF9FC] rounded-xl p-3 border border-[#F8EAF2]">
                          <span className="font-bold text-[#9C7890] block mb-1">Variáveis:</span>
                          <span className="text-[#75445F] leading-relaxed">{formula.variables}</span>
                        </div>
                      )}

                      {formula.example && (
                        <div className="text-xs bg-emerald-50 rounded-xl p-3 border border-emerald-100">
                          <span className="font-bold text-emerald-700 block mb-1">Exemplo:</span>
                          <span className="text-emerald-800 font-mono">{formula.example}</span>
                        </div>
                      )}

                      {formula.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {formula.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] font-medium px-2 py-0.5 rounded-full border cursor-pointer hover:opacity-80"
                              style={{ color: cfg.color, borderColor: cfg.color + "40", backgroundColor: cfg.color + "10" }}
                              onClick={() => setSearchTerm(tag)}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      ))}

      {filtered.length === 0 && (
        <div className="text-center py-16 text-[#9C7890]">
          <p className="text-5xl mb-4">🔍</p>
          <p className="font-semibold text-[#75445F]">Nenhuma fórmula encontrada</p>
          <p className="text-sm mt-1">Tente outro termo ou mude a categoria.</p>
        </div>
      )}
    </div>
  );
}
