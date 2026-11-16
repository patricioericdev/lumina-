import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Lumina ✨ — Estudos, Rotina & Bem-estar",
  description: "A plataforma inteligente e acolhedora de estudos para o ENEM e evolução pessoal.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Lumina",
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${poppins.className} antialiased selection:bg-fuchsia-100 selection:text-fuchsia-900`}>
        <div className="flex flex-col md:flex-row min-h-screen bg-[var(--lumina-bg-main,#FAFAFD)] transition-colors duration-300">
          <Sidebar />
          <main className="flex-1 min-w-0 pb-24 md:pb-0 overflow-x-hidden">{children}</main>
        </div>
      </body>
    </html>
  );
}
