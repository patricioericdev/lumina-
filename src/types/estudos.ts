export type TopicStatus = "pendente" | "estudando" | "dominado";

export interface StudyTopic {
  id: string;
  name: string;
  weight: "alto" | "medio" | "normal";
  status: TopicStatus;
}

export interface StudyResource {
  id: string;
  title: string;
  provider: string;
  url: string;
  type: "video" | "questoes" | "resumo" | "noticia" | "podcast" | "custom";
  description?: string;
}

export interface Subject {
  id: string;
  name: string;
  area: "matematica" | "natureza" | "humanas" | "linguagens";
  icon: string;
  topics: StudyTopic[];
  resources: StudyResource[];
}

export interface Repertoire {
  id: string;
  title: string;
  author: string;
  category: "Filosofia" | "Sociologia" | "Legislação" | "História" | "Literatura" | "Psicologia";
  concept: string;
  themes: string;
  quoteOrExample: string;
}

export interface NewsResource {
  id: string;
  title: string;
  source: string;
  url: string;
  type: "portal" | "podcast" | "canal";
  description: string;
}

export interface EnemExam {
  id: string;
  year: number;
  edition: string;
  essayTheme: string;
  day1QuestionsUrl: string;
  day1AnswerKeyUrl: string;
  day2QuestionsUrl: string;
  day2AnswerKeyUrl: string;
  videoResolutionUrl: string;
  completed: boolean;
  scoreDay1?: number; // acertos de 90
  scoreDay2?: number; // acertos de 90
  essayScore?: number; // nota 0-1000
}

export interface EssayConnective {
  category: string;
  purpose: string;
  examples: string[];
}
