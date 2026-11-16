"use client";

import { useState, useEffect } from "react";
import { ThemeId, ThemeConfig } from "@/types/theme";
import { THEMES_LIST } from "@/data/themesData";

const THEME_STORAGE_KEY = "lumina_theme_v1";

export function useLuminaTheme() {
  const [currentThemeId, setCurrentThemeId] = useState<ThemeId>("rose");
  const [isLoaded, setIsLoaded] = useState(false);

  const applyThemeColors = (theme: ThemeConfig) => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;

    root.style.setProperty("--lumina-primary", theme.colors.primary);
    root.style.setProperty("--lumina-primary-light", theme.colors.primaryLight);
    root.style.setProperty("--lumina-primary-hover", theme.colors.primaryHover);
    root.style.setProperty("--lumina-bg-main", theme.colors.bgMain);
    root.style.setProperty("--lumina-text-main", theme.colors.textMain);
    root.style.setProperty("--lumina-text-muted", theme.colors.textMuted);
    root.style.setProperty("--lumina-border-main", theme.colors.borderMain);
    root.style.setProperty("--lumina-card-bg", theme.colors.cardBg);
    root.style.setProperty("--lumina-grad-from", theme.colors.gradientFrom);
    root.style.setProperty("--lumina-grad-to", theme.colors.gradientTo);

    root.setAttribute("data-theme", theme.id);

    if (document.body) {
      document.body.style.backgroundColor = theme.colors.bgMain;
      document.body.style.color = theme.colors.textMain;
    }

    if (theme.id === "noite") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  };

  useEffect(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY) as ThemeId | null;
      // Padrão moderno: visual claro, clean e arejado ("rose")
      const themeId = saved && saved !== "noite" && THEMES_LIST.some((t) => t.id === saved) ? saved : "rose";
      setCurrentThemeId(themeId);
      localStorage.setItem(THEME_STORAGE_KEY, themeId);

      const found = THEMES_LIST.find((t) => t.id === themeId) || THEMES_LIST[0];
      applyThemeColors(found);
    } catch {}

    setIsLoaded(true);

    const handleSync = () => {
      try {
        const saved = localStorage.getItem(THEME_STORAGE_KEY) as ThemeId | null;
        if (saved) {
          setCurrentThemeId(saved);
          const found = THEMES_LIST.find((t) => t.id === saved);
          if (found) applyThemeColors(found);
        }
      } catch {}
    };

    window.addEventListener("lumina_theme_changed", handleSync);
    return () => window.removeEventListener("lumina_theme_changed", handleSync);
  }, []);

  const changeTheme = (themeId: ThemeId) => {
    const found = THEMES_LIST.find((t) => t.id === themeId);
    if (!found) return;

    setCurrentThemeId(themeId);
    applyThemeColors(found);

    try {
      localStorage.setItem(THEME_STORAGE_KEY, themeId);
      window.dispatchEvent(new Event("lumina_theme_changed"));
    } catch {}
  };

  const toggleDarkMode = () => {
    if (currentThemeId === "noite") {
      changeTheme("rose");
    } else {
      changeTheme("noite");
    }
  };

  const currentTheme = THEMES_LIST.find((t) => t.id === currentThemeId) || THEMES_LIST[THEMES_LIST.length - 1];

  return {
    currentThemeId,
    currentTheme,
    themes: THEMES_LIST,
    changeTheme,
    toggleDarkMode,
    isDarkMode: currentThemeId === "noite",
    isLoaded,
  };
}
