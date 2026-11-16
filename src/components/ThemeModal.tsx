"use client";

import { useLuminaTheme } from "@/hooks/useLuminaTheme";

interface ThemeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ThemeModal({ isOpen, onClose }: ThemeModalProps) {
  const { currentThemeId, themes, changeTheme } = useLuminaTheme();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-xs animate-in fade-in">
      <div
        className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full border border-[#F8EAF2] shadow-2xl relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabeçalho do Modal */}
        <div className="flex items-center justify-between pb-4 border-b border-[#F8EAF2] mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-[#C77DA5] to-[#E5A8C8] flex items-center justify-center text-white text-base shadow-xs">
              🎨
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#75445F]">Paleta de Cores Lumina</h2>
              <p className="text-xs text-[#9C7890]">Escolha a estética que mais combina com seu momento.</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#FFF9FC] hover:bg-[#F8EAF2] text-[#75445F] flex items-center justify-center transition-colors cursor-pointer text-sm font-bold"
          >
            ✕
          </button>
        </div>

        {/* Grade de Temas */}
        <div className="space-y-3">
          {themes.map((theme) => {
            const isSelected = currentThemeId === theme.id;

            return (
              <button
                key={theme.id}
                type="button"
                onClick={() => changeTheme(theme.id)}
                className={`w-full p-4 rounded-2xl border transition-all text-left flex items-center justify-between gap-4 cursor-pointer group ${
                  isSelected
                    ? "border-[#C77DA5] bg-gradient-to-r from-[#FFF9FC] to-[#F8EAF2] ring-2 ring-[#C77DA5]/30 shadow-xs scale-101"
                    : "border-[#F8EAF2] bg-white hover:border-[#C77DA5] hover:bg-[#FFF9FC]"
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <span className="text-2xl">{theme.emoji}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-sm text-[#75445F]">{theme.name}</p>
                      {isSelected && (
                        <span className="text-[10px] bg-[#C77DA5] text-white px-2 py-0.2 rounded-full font-bold">
                          Ativo
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#9C7890] mt-0.5">{theme.description}</p>
                  </div>
                </div>

                {/* Bolinhas de Amostra de Cor */}
                <div className="flex items-center gap-1.5 shrink-0">
                  {theme.previewColors.map((color, idx) => (
                    <span
                      key={idx}
                      className="w-5 h-5 rounded-full border border-black/10 shadow-2xs"
                      style={{ backgroundColor: color }}
                    ></span>
                  ))}
                </div>
              </button>
            );
          })}
        </div>

        {/* Rodapé */}
        <div className="mt-6 pt-4 border-t border-[#F8EAF2] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="bg-[#C77DA5] hover:bg-[#b56e94] text-white px-6 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            Pronto ✨
          </button>
        </div>
      </div>
    </div>
  );
}
