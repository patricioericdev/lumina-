export interface Formula {
  id: string;
  title: string;
  formula: string; // texto da fórmula (pode usar notação simples)
  description: string;
  variables?: string; // explicação das variáveis
  example?: string;
  subject: FormulaSubject;
  category: string;
  tags: string[];
}

export type FormulaSubject = "matematica" | "fisica" | "quimica" | "biologia";

export const FORMULA_SUBJECTS: { id: FormulaSubject; label: string; emoji: string }[] = [
  { id: "matematica", label: "Matemática", emoji: "📐" },
  { id: "fisica", label: "Física", emoji: "⚡" },
  { id: "quimica", label: "Química", emoji: "🧪" },
  { id: "biologia", label: "Biologia", emoji: "🧬" },
];
