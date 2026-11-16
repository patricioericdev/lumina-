export interface SimuladoScore {
  id: string;
  date: string; // YYYY-MM-DD
  examName: string; // ex: "ENEM 2024"
  scores: {
    linguagens: number | null;
    humanas: number | null;
    natureza: number | null;
    matematica: number | null;
    redacao: number | null;
  };
  notes?: string;
}

export interface StudySessionLog {
  id: string;
  date: string; // YYYY-MM-DD
  subject: string;
  hoursStudied: number;
}

export const SUBJECT_AREAS = [
  "Matemática",
  "Linguagens",
  "Ciências Humanas",
  "Ciências da Natureza",
  "Redação",
] as const;

export type SubjectArea = (typeof SUBJECT_AREAS)[number];
