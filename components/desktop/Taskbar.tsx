"use client";

import { Terminal, FolderTree, Activity, Trash2, FileText } from "lucide-react";
import { WindowState, WindowId } from "@/types/window";
import SystemTray from "./SystemTray";

interface TaskbarProps {
  isStartMenuOpen: boolean;
  onToggleStartMenu: () => void;
  windows: WindowState[];
  focusedWindowId: WindowId | null;
  onSelectWindowTab: (id: WindowId) => void;
}

export default function Taskbar({
  isStartMenuOpen,
  onToggleStartMenu,
  windows,
  focusedWindowId,
  onSelectWindowTab,
}: TaskbarProps) {
  const getAppIcon = (id: WindowId) => {
    switch (id) {
      case "terminal":
        return <Terminal className="w-3.5 h-3.5" />;
      case "explorer":
        return <FolderTree className="w-3.5 h-3.5" />;
      case "kola-manager":
        return <Activity className="w-3.5 h-3.5" />;
      case "bin":
        return <Trash2 className="w-3.5 h-3.5" />;
      case "readme":
        return <FileText className="w-3.5 h-3.5" />;
      default:
        return <span>🥥</span>;
    }
  };

  const openWindows = windows.filter((w) => w.isOpen);

  return (
    <footer
      className="relative z-40 h-12 w-full bg-[#160f0a]/90 backdrop-blur-md border-t border-[#3d2b1b] px-2 sm:px-3 flex items-center justify-between shadow-2xl select-none"
      role="region"
      aria-label="Thenga OS Taskbar"
    >
      {/* Left: Start Button & Open Window Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto max-w-[calc(100vw-220px)] sm:max-w-[65%] py-1">
        <button
          type="button"
          onClick={onToggleStartMenu}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all cursor-pointer font-medium text-xs sm:text-sm shrink-0 group ${
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

        {/* Separator if there are open windows */}
        {openWindows.length > 0 && (
          <div className="h-5 w-px bg-[#3e2a1b] mx-0.5 shrink-0" />
        )}

        {/* Open Windows Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {openWindows.map((win) => {
            const isFocused = focusedWindowId === win.id && !win.isMinimized;
            return (
              <button
                key={win.id}
                type="button"
                onClick={() => onSelectWindowTab(win.id)}
                title={win.title}
                className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg border text-xs font-mono transition-all cursor-pointer shrink-0 max-w-[150px] ${
                  isFocused
                    ? "bg-[#352316] border-amber-500/70 text-amber-100 shadow-sm"
                    : win.isMinimized
                    ? "bg-[#18110a]/70 border-[#382618] text-amber-400/50 hover:bg-[#24170f] hover:text-amber-300"
                    : "bg-[#22170e]/90 border-[#45301f] text-amber-200/80 hover:bg-[#2c1d12] hover:text-amber-100"
                }`}
              >
                <span className={isFocused ? "text-amber-300" : "text-amber-400/70"}>
                  {getAppIcon(win.id)}
                </span>
                <span className="truncate">{win.title}</span>
                {isFocused && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 animate-pulse" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Center: Brand tag (only on large displays when few windows open) */}
      {openWindows.length <= 2 && (
        <div className="hidden xl:flex items-center gap-2 text-[11px] font-mono text-amber-300/40">
          <span>THENGA OS</span>
          <span>•</span>
          <span>NO KERNEL. JUST FIBER.</span>
        </div>
      )}

      {/* Right: System Tray & Clock */}
      <div className="flex items-center shrink-0">
        <SystemTray />
      </div>
    </footer>
  );
}
