"use client";

import SystemTray from "./SystemTray";

interface TaskbarProps {
  isStartMenuOpen: boolean;
  onToggleStartMenu: () => void;
  activeAppTitle?: string | null;
}

export default function Taskbar({
  isStartMenuOpen,
  onToggleStartMenu,
  activeAppTitle,
}: TaskbarProps) {
  return (
    <footer
      className="relative z-40 h-12 w-full bg-[#160f0a]/90 backdrop-blur-md border-t border-[#3d2b1b] px-2 sm:px-3 flex items-center justify-between shadow-2xl select-none"
      role="region"
      aria-label="Thenga OS Taskbar"
    >
      {/* Left: Start / Launcher Button */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onToggleStartMenu}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all cursor-pointer font-medium text-xs sm:text-sm group ${
            isStartMenuOpen
              ? "bg-[#332012] border-amber-500/80 text-amber-100 shadow-[0_0_12px_rgba(245,158,11,0.25)]"
              : "bg-[#22160d]/80 hover:bg-[#2e1e12] border-[#44301f] text-amber-100/90 hover:text-amber-100"
          }`}
          aria-expanded={isStartMenuOpen}
          aria-haspopup="dialog"
        >
          <span className="text-base group-hover:rotate-12 transition-transform duration-300">
            🥥
          </span>
          <span className="font-semibold tracking-wide font-mono text-amber-200">
            Thenga
          </span>
        </button>

        {/* Running App Indicator / Window Tab (Placeholder for upcoming windows) */}
        {activeAppTitle && (
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#25180e]/90 border border-[#4a3421] text-xs text-amber-100">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono truncate max-w-[140px]">
              {activeAppTitle}
            </span>
          </div>
        )}
      </div>

      {/* Center: Subtle taskbar brand / coconut message (hidden on mobile) */}
      <div className="hidden lg:flex items-center gap-2 text-[11px] font-mono text-amber-300/40">
        <span>THENGA OS</span>
        <span>•</span>
        <span>NO KERNEL. JUST FIBER.</span>
      </div>

      {/* Right: System Tray & Clock */}
      <div className="flex items-center">
        <SystemTray />
      </div>
    </footer>
  );
}
