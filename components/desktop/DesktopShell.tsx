"use client";

import React, { useState, useCallback, useEffect } from "react";
import Taskbar from "./Taskbar";
import StartMenu from "./StartMenu";
import Window from "./Window";
import ThengaMascot from "./ThengaMascot";
import PixelIcon from "./PixelIcon";
import PixelScenery from "./PixelScenery";
import CoconutFallLayer from "./CoconutFallLayer";
import { WindowPlaceholderContent } from "./WindowPlaceholders";
import { WindowId, WindowState } from "@/types/window";
import { useThengaStore } from "@/store/useThengaStore";
import { sound } from "@/utils/sound";

interface DesktopIconItem {
  id: WindowId;
  name: string;
}

const DESKTOP_ICONS: DesktopIconItem[] = [
  { id: "terminal", name: "THENGA Terminal" },
  { id: "explorer", name: "THENGA Explorer" },
  { id: "kola-manager", name: "Kola Manager" },
  { id: "readme", name: "README.the" },
  { id: "bin", name: "Copra Bin" },
  { id: "calculator", name: "Coconut Calculator" },
  { id: "task-manager", name: "Thenga Task Manager" },
  { id: "physics", name: "Coconut Physics" },
  { id: "defender", name: "Thenga Defender" },
  { id: "achievements", name: "Achievements" },
];

const OPEN_ACHIEVEMENT_MAP: Partial<Record<WindowId, string>> = {
  terminal: "terminal-survivor",
  bin: "coconut-recycling",
  calculator: "questionable-mathematics",
  "task-manager": "system-administrator",
};

const INITIAL_WINDOWS: WindowState[] = [
  {
    id: "terminal",
    title: "THENGA Terminal",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 80, y: 35 },
    size: { width: 560, height: 380 },
    zIndex: 10,
  },
  {
    id: "explorer",
    title: "THENGA Explorer",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 130, y: 65 },
    size: { width: 580, height: 400 },
    zIndex: 10,
  },
  {
    id: "kola-manager",
    title: "Kola Manager",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 170, y: 85 },
    size: { width: 520, height: 380 },
    zIndex: 10,
  },
  {
    id: "bin",
    title: "Copra Bin",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 210, y: 110 },
    size: { width: 450, height: 330 },
    zIndex: 10,
  },
  {
    id: "readme",
    title: "README.the",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 150, y: 70 },
    size: { width: 480, height: 350 },
    zIndex: 10,
  },
  {
    id: "calculator",
    title: "Coconut Calculator",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 280, y: 50 },
    size: { width: 320, height: 500 },
    zIndex: 10,
  },
  {
    id: "task-manager",
    title: "Thenga Task Manager",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 200, y: 60 },
    size: { width: 490, height: 440 },
    zIndex: 10,
  },
  {
    id: "physics",
    title: "Coconut Physics",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 240, y: 75 },
    size: { width: 430, height: 460 },
    zIndex: 10,
  },
  {
    id: "defender",
    title: "Thenga Defender",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 270, y: 100 },
    size: { width: 430, height: 420 },
    zIndex: 10,
  },
  {
    id: "achievements",
    title: "Achievements",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 300, y: 65 },
    size: { width: 450, height: 470 },
    zIndex: 10,
  },
];

export default function DesktopShell() {
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [windows, setWindows] = useState<WindowState[]>(INITIAL_WINDOWS);
  const [focusedWindowId, setFocusedWindowId] = useState<WindowId | null>(null);
  const [, setTopZIndex] = useState(20);

  // Store subscriptions
  const toast = useThengaStore((state) => state.toast);
  const clearToast = useThengaStore((state) => state.clearToast);
  const unlockAchievement = useThengaStore((state) => state.unlockAchievement);
  const spawnCoconutFall = useThengaStore((state) => state.spawnCoconutFall);
  const bumpAnnoyance = useThengaStore((state) => state.bumpAnnoyance);
  const screenShake = useThengaStore((state) => state.screenShake);

  // Toast dismiss timer
  useEffect(() => {
    if (!toast) return;
    sound.playClick();
    const timer = setTimeout(() => clearToast(), 3200);
    return () => clearTimeout(timer);
  }, [toast, clearToast]);

  // Initial desktop boot achievement
  useEffect(() => {
    unlockAchievement("booted-thenga");
  }, [unlockAchievement]);

  // Extremely rare random idle coconut drop (once every ~40s with low probability)
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.12) {
        useThengaStore.getState().showToast("Unexpected coconut detected. 🥥");
        spawnCoconutFall(1);
      }
    }, 40000);
    return () => clearInterval(interval);
  }, [spawnCoconutFall]);

  // Bring a window to front
  const focusWindow = useCallback((id: WindowId) => {
    sound.playClick();
    setTopZIndex((prevZ) => {
      const nextZ = prevZ + 1;
      setWindows((prevWindows) =>
        prevWindows.map((win) =>
          win.id === id ? { ...win, zIndex: nextZ, isMinimized: false } : win
        )
      );
      return nextZ;
    });
    setFocusedWindowId(id);
  }, []);

  // Open window from icon or start menu
  const openWindow = useCallback(
    (id: WindowId) => {
      sound.playClick();
      setTopZIndex((prevZ) => {
        const nextZ = prevZ + 1;
        setWindows((prevWindows) =>
          prevWindows.map((win) => {
            if (win.id === id) {
              return {
                ...win,
                isOpen: true,
                isMinimized: false,
                zIndex: nextZ,
              };
            }
            return win;
          })
        );
        return nextZ;
      });
      setFocusedWindowId(id);
      setIsStartMenuOpen(false);

      const achievementId = OPEN_ACHIEVEMENT_MAP[id];
      if (achievementId) unlockAchievement(achievementId);
    },
    [unlockAchievement]
  );

  // Close window
  const closeWindow = useCallback(
    (id: WindowId) => {
      sound.playClick();
      setWindows((prevWindows) =>
        prevWindows.map((win) =>
          win.id === id
            ? { ...win, isOpen: false, isMinimized: false, isMaximized: false }
            : win
        )
      );
      setFocusedWindowId((currentFocused) => {
        if (currentFocused === id) {
          const remaining = windows.filter(
            (w) => w.isOpen && w.id !== id && !w.isMinimized
          );
          if (remaining.length > 0) {
            const highest = remaining.reduce((prev, curr) =>
              curr.zIndex > prev.zIndex ? curr : prev
            );
            return highest.id;
          }
          return null;
        }
        return currentFocused;
      });
    },
    [windows]
  );

  // Minimize window
  const minimizeWindow = useCallback((id: WindowId) => {
    sound.playClick();
    setWindows((prevWindows) =>
      prevWindows.map((win) =>
        win.id === id ? { ...win, isMinimized: true } : win
      )
    );
    setFocusedWindowId((current) => (current === id ? null : current));
  }, []);

  // Toggle Maximize / Restore window
  const toggleMaximizeWindow = useCallback((id: WindowId) => {
    sound.playClick();
    setWindows((prevWindows) =>
      prevWindows.map((win) => {
        if (win.id !== id) return win;

        if (win.isMaximized) {
          return {
            ...win,
            isMaximized: false,
            position: win.prevBounds
              ? { x: win.prevBounds.x, y: win.prevBounds.y }
              : win.position,
            size: win.prevBounds
              ? { width: win.prevBounds.width, height: win.prevBounds.height }
              : win.size,
          };
        } else {
          return {
            ...win,
            isMaximized: true,
            prevBounds: {
              x: win.position.x,
              y: win.position.y,
              width: win.size.width,
              height: win.size.height,
            },
          };
        }
      })
    );
  }, []);

  // Move window
  const moveWindow = useCallback(
    (id: WindowId, newPos: { x: number; y: number }) => {
      setWindows((prevWindows) =>
        prevWindows.map((win) =>
          win.id === id ? { ...win, position: newPos } : win
        )
      );
    },
    []
  );

  // Handle taskbar tab click
  const handleSelectWindowTab = useCallback(
    (id: WindowId) => {
      const targetWindow = windows.find((w) => w.id === id);
      if (!targetWindow) return;

      if (targetWindow.isMinimized) {
        focusWindow(id);
      } else if (focusedWindowId === id) {
        minimizeWindow(id);
      } else {
        focusWindow(id);
      }
    },
    [windows, focusedWindowId, focusWindow, minimizeWindow]
  );

  // Click background to deselect icon & close launcher
  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSelectedIcon(null);
      if (isStartMenuOpen) {
        setIsStartMenuOpen(false);
      }
    }
  };

  return (
    <div
      className={`relative flex flex-col h-screen w-screen overflow-hidden select-none bg-[#38a5db] text-[#191008] ${
        screenShake ? "thenga-shake" : ""
      }`}
      onClick={handleBackgroundClick}
    >
      {/* Handcrafted Kerala Pixel Landscape Background */}
      <PixelScenery />

      {/* The Falling Coconut Physics Event Layer */}
      <CoconutFallLayer />

      {/* Retro Pixel Toast Notifications */}
      {toast && (
        <div className="pointer-events-none fixed top-4 left-1/2 -translate-x-1/2 z-[200]">
          <div className="thenga-toast-anim thenga-pixel-frame-sm px-4 py-2 bg-[#fdf7e7] text-xs font-mono font-bold text-[#191008] flex items-center gap-2 whitespace-nowrap shadow-[3px_3px_0_#191008]">
            <span className="w-2 h-2 bg-[#f5a81e] inline-block" />
            <span>{toast}</span>
          </div>
        </div>
      )}

      {/* Main Desktop Work Area */}
      <main
        id="thenga-window-workspace"
        className="relative flex-1 p-3 sm:p-5 overflow-hidden"
        onClick={handleBackgroundClick}
      >
        {/* Resting physical coconut in the foreground earth (Mascot Easter Egg) */}
        <div
          className="absolute z-10 cursor-pointer"
          style={{ bottom: "52px", left: "44%" }}
          onClick={(e) => {
            e.stopPropagation();
            sound.playThud();
            const msg = bumpAnnoyance();
            useThengaStore.getState().showToast(msg);
          }}
        >
          <ThengaMascot size={46} title="A silent coconut resting in Kerala soil. Click to poke." />
        </div>

        {/* Desktop Shortcuts: Two vertical columns on the left */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-2 w-[180px] sm:w-[220px] max-h-[calc(100vh-140px)] overflow-y-auto content-start p-1">
          {DESKTOP_ICONS.map((item) => {
            const isSelected = selectedIcon === item.id;
            return (
              <div
                key={item.id}
                onClick={(e) => {
                  e.stopPropagation();
                  sound.playClick();
                  setSelectedIcon(item.id);
                }}
                onDoubleClick={(e) => {
                  e.stopPropagation();
                  openWindow(item.id);
                }}
                data-selected={isSelected}
                className="thenga-desktop-icon flex flex-col items-center justify-center p-2 rounded-none cursor-pointer group text-center select-none"
                title={`Double click to open ${item.name}`}
              >
                <div className="relative flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
                  <PixelIcon id={item.id} size={36} />
                </div>
                <span className="text-[11px] font-mono font-bold text-[#191008] leading-tight line-clamp-2 px-1 py-0.5 bg-[#fdf7e7]/85 border border-[#191008]/40 shadow-[1px_1px_0_#191008]">
                  {item.name}
                </span>
              </div>
            );
          })}
        </div>

        {/* Compact Retro System Hardware Monitor Panel (Docked Top-Right) */}
        <div className="thenga-pixel-frame hidden lg:block absolute top-4 right-4 z-0 w-64 text-[11px] font-mono pointer-events-none select-none overflow-hidden">
          {/* Top Title Bar */}
          <div className="bg-[#2b9e38] text-white px-2.5 py-1.5 border-b-2 border-[#191008] flex items-center justify-between font-bold">
            <span className="flex items-center gap-1.5 text-[10px] tracking-wider uppercase">
              <span className="w-2 h-2 bg-emerald-300 inline-block animate-pulse" />
              THENGA SYSTEM
            </span>
            <span className="text-[9px] bg-[#145223] px-1 py-0.2 border border-[#191008]">
              ONLINE
            </span>
          </div>

          {/* Readout Grid */}
          <div className="p-2.5 space-y-1.5 bg-[#fdf7e7]">
            <div className="flex justify-between">
              <span className="text-[#6b4728]">Species:</span>
              <span className="font-bold text-[#191008]">Cocos nucifera</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-[#6b4728]">Juice RAM:</span>
              <div className="flex items-center gap-1">
                <div className="w-16 h-2 bg-[#d8c593] border border-[#191008] overflow-hidden">
                  <div className="h-full bg-[#2b9e38] w-full" />
                </div>
                <span className="font-bold text-[#2b9e38] text-[10px]">100%</span>
              </div>
            </div>

            <div className="flex justify-between">
              <span className="text-[#6b4728]">Husk:</span>
              <span className="font-bold text-[#2b9e38]">HEALTHY</span>
            </div>

            <div className="flex justify-between">
              <span className="text-[#6b4728]">Kernel:</span>
              <span className="text-[#965426] font-bold">Nope.</span>
            </div>

            <div className="flex justify-between">
              <span className="text-[#6b4728]">Network:</span>
              <span className="font-bold text-[#191008] text-[10px]">PalmLink-5G</span>
            </div>

            <div className="flex justify-between">
              <span className="text-[#6b4728]">Common Sense:</span>
              <span className="font-bold text-[#c93b2b]">0%</span>
            </div>

            <div className="flex justify-between">
              <span className="text-[#6b4728]">Purpose:</span>
              <span className="text-[#6b4728] italic">Unknown</span>
            </div>
          </div>

          <div className="px-2.5 py-1 bg-[#ecdba8] border-t-2 border-[#191008] text-[9px] text-[#6b4728] text-center italic">
            &ldquo;No kernel. Just fiber.&rdquo;
          </div>
        </div>

        {/* Render Open Application Windows */}
        {windows
          .filter((win) => win.isOpen)
          .map((win) => (
            <Window
              key={win.id}
              window={win}
              icon={<PixelIcon id={win.id} size={16} />}
              isFocused={focusedWindowId === win.id}
              onFocus={focusWindow}
              onClose={closeWindow}
              onMinimize={minimizeWindow}
              onMaximizeToggle={toggleMaximizeWindow}
              onMove={moveWindow}
            >
              <WindowPlaceholderContent id={win.id} windows={windows} />
            </Window>
          ))}
      </main>

      {/* Start Menu Popover */}
      <StartMenu
        isOpen={isStartMenuOpen}
        onClose={() => setIsStartMenuOpen(false)}
        onLaunchApp={openWindow}
      />

      {/* Retro Taskbar */}
      <Taskbar
        isStartMenuOpen={isStartMenuOpen}
        onToggleStartMenu={() => {
          sound.playClick();
          setIsStartMenuOpen(!isStartMenuOpen);
        }}
        windows={windows}
        focusedWindowId={focusedWindowId}
        onSelectWindowTab={handleSelectWindowTab}
      />
    </div>
  );
}
