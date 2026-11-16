export interface FerrettoClassLog {
  id: string;
  course: string; // ex: "Extensivo ENEM 2027", "Matemática do Zero"
  subject: string; // "Matemática", "Física", "Química", "Biologia", "Humanas", "Redação"
  teacher: string; // "Prof. Ferretto", "Prof. Michel", "Prof. Coelho", "Prof. Landim", etc.
  moduleName: string; // "Módulo 03 - Geometria Plana"
  lessonTitle: string; // "Aula 02 - Áreas de Triângulos e Quadriláteros"
  completed: boolean;
  completedAt?: string; // ISO date
  notes?: string;
  lessonUrl?: string; // Link direto para a aula na plataforma do Ferretto
}

export interface FerrettoCuratedPlaylist {
  id: string;
  subject: string;
  teacher: string;
  title: string;
  description: string;
  url: string;
  badge: string;
  durationApprox: string;
  topicsCovered: string[];
}
