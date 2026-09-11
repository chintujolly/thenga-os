"use client";

import React from "react";
import { WindowState, WindowId } from "@/types/window";
import PixelIcon from "./PixelIcon";
import SystemTray from "./SystemTray";
import PixelCoconut from "./PixelCoconut";

interface TaskbarProps {
  isStartMenuOpen: boolean;
  onToggleStartMenu: () => void;
  windows: WindowState[];
  focusedWindowId: WindowId | null;
  onSelectWindowTab: (id: WindowId) => void;
}

/**
 * Taskbar: A compact retro OS taskbar with pixel borders, chunky controls,
 * and clear active states.
 */
export default function Taskbar({
  isStartMenuOpen,
  onToggleStartMenu,
  windows,
  focusedWindowId,
  onSelectWindowTab,
}: TaskbarProps) {
  const openWindows = windows.filter((w) => w.isOpen);

  return (
    <footer
      className="relative z-40 h-11 w-full bg-[#d6b86a] border-t-3 border-[#191008] px-2 flex items-center justify-between select-none font-mono"
      role="region"
      aria-label="Thenga OS Taskbar"
    >
      {/* Left: Start Button & Open Window Tabs */}
      <div className="flex items-center gap-1.5 h-full overflow-x-auto max-w-[calc(100vw-210px)] sm:max-w-[70%] py-1">
        {/* Thenga OS Start Button */}
        <button
          type="button"
          onClick={onToggleStartMenu}
          className={`thenga-pixel-btn flex items-center gap-1.5 h-full px-2.5 sm:px-3 text-xs font-bold shrink-0 ${
            isStartMenuOpen
              ? "bg-[#f5a81e] text-[#191008] translate-x-[2px] translate-y-[2px] shadow-none"
              : "bg-[#fdf7e7] text-[#191008] hover:bg-[#fffdf6]"
          }`}
          aria-expanded={isStartMenuOpen}
          aria-haspopup="dialog"
        >
          <PixelCoconut state="sitting" size={18} />
          <span className="tracking-wide">THENGA OS</span>
        </button>

        {/* Separator */}
        {openWindows.length > 0 && (
          <div className="h-6 w-[2px] bg-[#191008]/40 mx-0.5 shrink-0" />
        )}

        {/* Running Applications Tabs */}
        <div className="flex items-center gap-1.5 h-full overflow-x-auto">
          {openWindows.map((win) => {
            const isFocused = focusedWindowId === win.id && !win.isMinimized;
            return (
              <button
                key={win.id}
                type="button"
                onClick={() => onSelectWindowTab(win.id)}
                title={win.title}
                className={`thenga-pixel-btn relative flex items-center gap-1.5 h-full px-2 text-[11px] font-mono shrink-0 max-w-[155px] cursor-pointer ${
                  isFocused
                    ? "bg-[#fdf7e7] text-[#191008] font-bold translate-x-[1px] translate-y-[1px] shadow-none border-t-2 border-[#2b9e38]"
                    : win.isMinimized
                    ? "bg-[#c9ad62] text-[#191008]/60 opacity-80"
                    : "bg-[#e5cb87] text-[#191008]"
                }`}
              >
                <PixelIcon id={win.id} size={15} />
                <span className="truncate">{win.title}</span>
                {isFocused && (
                  <span className="absolute bottom-0 inset-x-1 h-[2px] bg-[#2b9e38]" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Right: System Tray */}
      <div className="flex items-center shrink-0">
        <SystemTray />
      </div>
    </footer>
  );
}
