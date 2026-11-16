"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeModal from "./ThemeModal";
import { useLuminaTheme } from "@/hooks/useLuminaTheme";
import { useProfile } from "@/hooks/useProfile";

const menuItems = [
  { icon: "🏠", label: "Início", mobileLabel: "Início", href: "/" },
  { icon: "📚", label: "Estudos ENEM", mobileLabel: "Estudos", href: "/estudos" },
  { icon: "✅", label: "Tarefas", mobileLabel: "Tarefas", href: "/tarefas" },
  { icon: "🌿", label: "Hábitos & Diário", mobileLabel: "Hábitos", href: "/habitos" },
  { icon: "⚙️", label: "Configurações", mobileLabel: "Config", href: "/config" },
];

const extraMenuItems = [
  { icon: "🍅", label: "Pomodoro", href: "/pomodoro" },
  { icon: "📊", label: "Evolução ENEM", href: "/evolucao" },
  { icon: "📝", label: "Caderno de Erros", href: "/erros" },
  { icon: "🎯", label: "Metas Semanais", href: "/metas" },
  { icon: "🧮", label: "Banco de Fórmulas", href: "/formulas" },
  { icon: "🎓", label: "Hub Ferretto", href: "/ferretto" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const { currentTheme, toggleDarkMode, isDarkMode } = useLuminaTheme();
  const { name, target, avatarInitial } = useProfile();

  return (
    <>
      {/* ── Header Mobile (visível apenas abaixo de md) ── */}
      <header className="flex md:hidden sticky top-0 z-30 items-center justify-between px-4 py-3 bg-white/90 dark:bg-[#0E0E11]/95 backdrop-blur-md border-b border-[#F1F1F5] dark:border-[#27272A] shadow-xs transition-colors duration-300">
        <Link href="/" className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-fuchsia-600 to-pink-500 flex items-center justify-center text-white text-sm font-extrabold shadow-xs shrink-0">
            ✨
          </div>
          <div className="min-w-0">
            <h1 className="text-base font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight leading-tight">
              Lumina
            </h1>
            <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-medium truncate max-w-[140px]">
              {name} • {currentTheme.name}
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setIsThemeModalOpen(true)}
            className="h-8 px-2.5 rounded-xl bg-zinc-50 dark:bg-[#18181B] border border-zinc-200/80 dark:border-[#27272A] text-xs font-semibold text-zinc-700 dark:text-zinc-200 flex items-center gap-1.5 hover:scale-105 transition-transform cursor-pointer shadow-2xs"
            title="Mudar paleta de cores"
          >
            <span>🎨</span>
          </button>

          <button
            type="button"
            onClick={toggleDarkMode}
            className="w-8 h-8 rounded-xl bg-zinc-50 dark:bg-[#18181B] border border-zinc-200/80 dark:border-[#27272A] text-xs flex items-center justify-center hover:scale-105 transition-transform cursor-pointer shadow-2xs"
            title={isDarkMode ? "Mudar para modo claro" : "Ativar modo dark"}
          >
            <span>{isDarkMode ? "☀️" : "🌙"}</span>
          </button>
        </div>
      </header>

      {/* ── Sidebar Desktop (visível a partir de md) ── */}
      <aside className="hidden md:flex sticky top-0 h-screen w-64 shrink-0 bg-white/95 dark:bg-[#0E0E11]/95 backdrop-blur-md border-r border-[#F1F1F5] dark:border-[#27272A] px-5 py-6 flex-col justify-between z-20 shadow-[1px_0_12px_rgba(0,0,0,0.02)] transition-colors duration-300 overflow-y-auto scrollbar-none">
        {/* Topo e Navegação */}
        <div>
          {/* Logo Lumina & Botão Dark Mode */}
          <div className="flex items-center justify-between mb-6 px-1">
            <Link href="/" className="group flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-fuchsia-600 via-pink-500 to-rose-400 flex items-center justify-center text-white text-base font-extrabold shadow-sm group-hover:scale-105 transition-transform">
                ✨
              </div>
              <div>
                <h1 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight group-hover:text-fuchsia-600 transition-colors">
                  Lumina
                </h1>
                <p className="text-[10px] text-zinc-400 dark:text-zinc-500 font-semibold tracking-wider uppercase">
                  Estudos & Performance
                </p>
              </div>
            </Link>

            <button
              type="button"
              onClick={toggleDarkMode}
              className="w-8 h-8 rounded-xl bg-zinc-50 dark:bg-[#18181B] border border-zinc-200/70 dark:border-[#27272A] text-xs flex items-center justify-center hover:scale-110 transition-transform cursor-pointer shadow-2xs text-zinc-600 dark:text-zinc-300"
              title={isDarkMode ? "Mudar para modo claro" : "Ativar modo dark"}
            >
              <span>{isDarkMode ? "☀️" : "🌙"}</span>
            </button>
          </div>

          {/* Menu Principal */}
          <nav>
            <ul className="space-y-1">
              {menuItems.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm transition-all text-left font-medium ${
                        isActive
                          ? "bg-fuchsia-50/90 dark:bg-[#1F1726] text-fuchsia-700 dark:text-fuchsia-300 font-bold border border-fuchsia-200/60 dark:border-[#38243A] shadow-2xs"
                          : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100/70 dark:hover:bg-[#18181B] hover:text-zinc-900 dark:hover:text-zinc-100"
                      }`}
                    >
                      <span className="text-base">{item.icon}</span>
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Ferramentas extras */}
          <div className="mt-5 pt-4 border-t border-zinc-100 dark:border-[#27272A] space-y-1">
            <p className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest px-3 mb-2">
              Ferramentas ENEM
            </p>
            {extraMenuItems.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs transition-all font-medium ${
                    isActive
                      ? "bg-fuchsia-50/90 dark:bg-[#1F1726] text-fuchsia-700 dark:text-fuchsia-300 font-bold border border-fuchsia-200/60 dark:border-[#38243A]"
                      : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100/70 dark:hover:bg-[#18181B] hover:text-zinc-900 dark:hover:text-zinc-100"
                  }`}
                >
                  <span className="text-sm">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Botão de Paleta de Cores */}
          <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-[#27272A]">
            <button
              type="button"
              onClick={() => setIsThemeModalOpen(true)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-zinc-700 dark:text-zinc-300 bg-zinc-50/80 dark:bg-[#18181B] hover:bg-zinc-100 dark:hover:bg-[#202024] border border-zinc-200/60 dark:border-[#27272A] transition-all cursor-pointer shadow-2xs group"
            >
              <div className="flex items-center gap-2">
                <span>🎨</span>
                <span className="truncate max-w-[110px]">
                  Tema: <strong className="text-fuchsia-600 dark:text-fuchsia-400">{currentTheme.name.split(" ")[0]}</strong>
                </span>
              </div>
              <div className="flex items-center -space-x-1 shrink-0">
                {currentTheme.previewColors.map((c, i) => (
                  <span
                    key={i}
                    className="w-3 h-3 rounded-full border border-white dark:border-[#0E0E11] shadow-2xs"
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </button>
          </div>
        </div>

        {/* Rodapé do Perfil Sincronizado */}
        <div className="pt-4 border-t border-zinc-100 dark:border-[#27272A]">
          <Link
            href="/config"
            className="flex items-center gap-3 p-2 rounded-2xl hover:bg-zinc-100/80 dark:hover:bg-[#18181B] transition-colors cursor-pointer border border-transparent hover:border-zinc-200/60 dark:hover:border-[#27272A] group"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-fuchsia-600 to-pink-500 flex items-center justify-center text-white text-xs font-black shadow-xs shrink-0 ring-2 ring-white dark:ring-[#18181B] group-hover:scale-105 transition-transform">
              {avatarInitial}
            </div>
            <div className="overflow-hidden flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100 truncate">
                  {name}
                </p>
                <span className="text-[8px] bg-fuchsia-100 dark:bg-fuchsia-950/70 text-fuchsia-700 dark:text-fuchsia-300 font-bold px-1.5 py-0.2 rounded-md shrink-0">
                  ENEM
                </span>
              </div>
              <p className="text-[10px] text-zinc-400 dark:text-zinc-500 truncate font-medium">
                {target}
              </p>
            </div>
          </Link>
        </div>
      </aside>

      {/* ── Bottom Navigation Bar Mobile ── */}
      <nav className="flex md:hidden fixed bottom-0 left-0 right-0 z-40 items-center justify-around px-2 py-2 bg-white/95 dark:bg-[#0E0E11]/95 backdrop-blur-md border-t border-zinc-200/70 dark:border-[#27272A] shadow-md transition-colors duration-300">
        {menuItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-0.5 px-3 py-1.5 rounded-2xl min-w-[52px] transition-all ${
                isActive
                  ? "bg-fuchsia-50 dark:bg-[#1F1726] text-fuchsia-700 dark:text-fuchsia-300 font-bold"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 font-medium"
              }`}
            >
              <span className="text-xl leading-none">{item.icon}</span>
              <span className="text-[9px] leading-tight tracking-tight">
                {item.mobileLabel}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Modal de Temas */}
      <ThemeModal
        isOpen={isThemeModalOpen}
        onClose={() => setIsThemeModalOpen(false)}
      />
    </>
  );
}
