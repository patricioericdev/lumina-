export interface ErroItem {
  id: string;
  createdAt: string; // ISO timestamp
  date: string; // YYYY-MM-DD
  subject: string; // ex: "Matemática", "Biologia"
  topic: string; // ex: "Funções quadráticas"
  question: string; // Descrição ou enunciado resumido
  myAnswer: string; // O que eu respondi
  correctAnswer: string; // Resposta correta
  whyWrong: string; // Por que errei
  tags: string[]; // ex: ["conta errada", "não sabia o conceito"]
  reviewed: boolean;
  reviewCount: number;
  nextReviewDate: string | null; // YYYY-MM-DD
  examSource?: string; // ex: "ENEM 2023 - Dia 1"
}

export const ERROR_SUBJECTS = [
  "Matemática",
  "Linguagens & Códigos",
  "Ciências Humanas",
  "Biologia",
  "Química",
  "Física",
  "Geografia",
  "História",
  "Filosofia & Sociologia",
  "Redação",
  "Inglês",
  "Espanhol",
] as const;

export type ErrorSubject = (typeof ERROR_SUBJECTS)[number];

export const ERROR_TAGS = [
  "Conta errada",
  "Não sabia o conceito",
  "Interpretação",
  "Falta de atenção",
  "Pegadinha",
  "Tempo insuficiente",
  "Fórmula errada",
] as const;
