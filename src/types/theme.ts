export type ThemeId =
  | "rose"
  | "lavanda"
  | "matcha"
  | "pessego"
  | "oceano"
  | "latte"
  | "noite";

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  emoji: string;
  description: string;
  previewColors: string[]; // Amostras das 3 cores da paleta
  colors: {
    primary: string;
    primaryLight: string;
    primaryHover: string;
    bgMain: string;
    textMain: string;
    textMuted: string;
    borderMain: string;
    cardBg: string;
    gradientFrom: string;
    gradientTo: string;
  };
}
