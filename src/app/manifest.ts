import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Lumina — Estudos, Rotina & ENEM",
    short_name: "Lumina",
    description: "Sua plataforma pessoal e acolhedora de estudos para o ENEM 2027.",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#FAFAFD",
    theme_color: "#C026D3",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
