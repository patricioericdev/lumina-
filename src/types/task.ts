export type Priority = "baixa" | "media" | "alta";

export type Category =
  | "Estudos"
  | "Escola"
  | "Casa"
  | "Pessoal"
  | "Saúde"
  | "Outros";

export interface Task {
  id: string;
  title: string;
  category: Category;
  priority: Priority;
  dueDate?: string;
  completed: boolean;
  createdAt: string;
}
