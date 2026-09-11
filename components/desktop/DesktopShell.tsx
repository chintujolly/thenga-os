"use client";

import { useState, useCallback } from "react";
import {
  Terminal,
  FolderTree,
  Activity,
  Trash2,
  FileText,
  Info,
  Cpu,
  Droplets,
  TreePalm,
} from "lucide-react";
import Taskbar from "./Taskbar";
import StartMenu from "./StartMenu";
import Window from "./Window";
import { WindowPlaceholderContent } from "./WindowPlaceholders";
import { WindowId, WindowState } from "@/types/window";

interface DesktopIconItem {
  id: WindowId;
  name: string;
  icon: typeof Terminal;
  badge?: string;
}

const DESKTOP_ICONS: DesktopIconItem[] = [
  { id: "terminal", name: "THENGA Terminal", icon: Terminal, badge: "sh" },
  { id: "explorer", name: "THENGA Explorer", icon: FolderTree },
  { id: "kola-manager", name: "Kola Manager", icon: Activity },
  { id: "readme", name: "README.the", icon: FileText },
  { id: "bin", name: "Copra Bin", icon: Trash2 },
];

const INITIAL_WINDOWS: WindowState[] = [
  {
    id: "terminal",
    title: "THENGA Terminal",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 70, y: 40 },
    size: { width: 560, height: 380 },
    zIndex: 10,
  },
  {
    id: "explorer",
    title: "THENGA Explorer",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 120, y: 70 },
    size: { width: 600, height: 400 },
    zIndex: 10,
  },
  {
    id: "kola-manager",
    title: "Kola Manager",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 170, y: 90 },
    size: { width: 540, height: 370 },
    zIndex: 10,
  },
  {
    id: "bin",
    title: "Copra Bin",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 220, y: 120 },
    size: { width: 440, height: 320 },
    zIndex: 10,
  },
  {
    id: "readme",
    title: "README.the",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 150, y: 80 },
    size: { width: 480, height: 340 },
    zIndex: 10,
  },
];

export default function DesktopShell() {
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [windows, setWindows] = useState<WindowState[]>(INITIAL_WINDOWS);
  const [focusedWindowId, setFocusedWindowId] = useState<WindowId | null>(null);
  const [topZIndex, setTopZIndex] = useState(20);

  // Bring a window to front
  const focusWindow = useCallback(
    (id: WindowId) => {
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
    },
    []
  );

  // Open window from icon or start menu
  const openWindow = useCallback(
    (id: WindowId) => {
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
    },
    []
  );

  // Close window
  const closeWindow = useCallback(
    (id: WindowId) => {
      setWindows((prevWindows) =>
        prevWindows.map((win) =>
          win.id === id
            ? { ...win, isOpen: false, isMinimized: false, isMaximized: false }
            : win
        )
      );
      setFocusedWindowId((currentFocused) => {
        if (currentFocused === id) {
          // Find remaining open and non-minimized windows
          const remaining = windows.filter(
            (w) => w.isOpen && w.id !== id && !w.isMinimized
          );
          if (remaining.length > 0) {
            // Pick the window with highest zIndex
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
  const minimizeWindow = useCallback(
    (id: WindowId) => {
      setWindows((prevWindows) =>
        prevWindows.map((win) =>
          win.id === id ? { ...win, isMinimized: true } : win
        )
      );
      setFocusedWindowId((current) => (current === id ? null : current));
    },
    []
  );

  // Toggle Maximize / Restore window
  const toggleMaximizeWindow = useCallback((id: WindowId) => {
    setWindows((prevWindows) =>
      prevWindows.map((win) => {
        if (win.id !== id) return win;

        if (win.isMaximized) {
          // Restore previous position & size
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
          // Maximize and save previous bounds
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

  // Update window position when dragged
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

  // Handle clicking taskbar window tab
  const handleSelectWindowTab = useCallback(
    (id: WindowId) => {
      const targetWindow = windows.find((w) => w.id === id);
      if (!targetWindow) return;

      if (targetWindow.isMinimized) {
        // Unminimize and bring to front
        focusWindow(id);
      } else if (focusedWindowId === id) {
        // If already active and focused, minimize it
        minimizeWindow(id);
      } else {
        // Bring to front
        focusWindow(id);
      }
    },
    [windows, focusedWindowId, focusWindow, minimizeWindow]
  );

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSelectedIcon(null);
      if (isStartMenuOpen) {
        setIsStartMenuOpen(false);
      }
    }
  };

  const getWindowIcon = (id: WindowId) => {
    switch (id) {
      case "terminal":
        return <Terminal className="w-4 h-4" />;
      case "explorer":
        return <FolderTree className="w-4 h-4" />;
      case "kola-manager":
        return <Activity className="w-4 h-4" />;
      case "bin":
        return <Trash2 className="w-4 h-4" />;
      case "readme":
        return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div
      className="relative flex flex-col h-screen w-screen overflow-hidden select-none bg-[#0a0704] text-amber-50"
      onClick={handleBackgroundClick}
    >
      {/* Retro Grid & Scanline Background */}
      <div className="absolute inset-0 coconut-desktop-grid pointer-events-none opacity-80" />
      <div className="absolute inset-0 crt-scanlines opacity-40 pointer-events-none" />

      {/* Subtle Ambient Radial Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-900/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Desktop Work Area (Where windows and icons render) */}
      <main
        id="thenga-window-workspace"
        className="relative flex-1 p-4 sm:p-6 overflow-hidden"
        onClick={handleBackgroundClick}
      >
        {/* Central Retro Watermark */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-20 select-none">
          <div className="text-7xl sm:text-8xl mb-2 drop-shadow-md">🥥</div>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-mono tracking-widest text-amber-200">
            THENGA OS
          </h1>
          <p className="text-xs sm:text-sm font-mono tracking-wider text-amber-400/80 mt-1">
            VER 0.1 • COCOS NUCIFERA EDITION
          </p>
          <p className="text-[11px] font-mono text-amber-500/60 mt-0.5">
            No Kernel. Just Fiber.
          </p>
        </div>

        {/* Desktop Shortcut Icons (Left side) */}
        <div className="relative z-0 flex flex-col gap-3 w-28">
          {DESKTOP_ICONS.map((item) => {
            const Icon = item.icon;
            const isSelected = selectedIcon === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedIcon(item.id);
                  openWindow(item.id);
                }}
                onDoubleClick={(e) => {
                  e.stopPropagation();
                  openWindow(item.id);
                }}
                className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all cursor-pointer group text-center ${
                  isSelected
                    ? "bg-amber-500/20 border border-amber-500/60 shadow-lg backdrop-blur-sm"
                    : "hover:bg-white/5 border border-transparent"
                }`}
                title={`Click to open ${item.name}`}
              >
                <div className="relative w-12 h-12 rounded-2xl bg-[#1f150d] border border-[#422e1e] flex items-center justify-center text-amber-300 shadow-md group-hover:scale-105 group-hover:border-amber-400/60 group-hover:text-amber-100 transition-all">
                  <Icon className="w-6 h-6" />
                  {item.badge && (
                    <span className="absolute -top-1 -right-1 text-[8px] font-mono px-1 py-0.2 bg-emerald-950 text-emerald-300 border border-emerald-500/40 rounded">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="mt-1.5 text-xs font-medium text-amber-100/90 group-hover:text-white drop-shadow leading-tight line-clamp-2">
                  {item.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Retro Coconut Telemetry Widget (Top Right - visible on medium+ screens) */}
        <div className="hidden md:block absolute top-6 right-6 z-0 w-64 p-3.5 bg-[#140e09]/80 border border-[#3b291a] rounded-2xl backdrop-blur-md shadow-xl text-xs font-mono text-amber-200/90 pointer-events-none select-none">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#2e2014] text-amber-300 font-semibold">
            <span className="flex items-center gap-1.5">
              <TreePalm className="w-3.5 h-3.5 text-emerald-400" />
              THENGA SPECS
            </span>
            <span className="text-[10px] text-emerald-400 bg-emerald-950/70 border border-emerald-500/30 px-1.5 py-0.5 rounded">
              ONLINE
            </span>
          </div>
          <div className="space-y-1.5 text-[11px]">
            <div className="flex items-center justify-between">
              <span className="text-amber-400/60 flex items-center gap-1">
                <Cpu className="w-3 h-3" /> Architecture:
              </span>
              <span className="text-amber-100">Cocos nucifera</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-amber-400/60 flex items-center gap-1">
                <Droplets className="w-3 h-3" /> Juice RAM:
              </span>
              <span className="text-amber-100">512 MB Water</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-amber-400/60 flex items-center gap-1">
                <Info className="w-3 h-3" /> Kernel:
              </span>
              <span className="text-amber-300">Nil (Fiber Only)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-amber-400/60">Husk Integrity:</span>
              <span className="text-emerald-400 font-bold">100%</span>
            </div>
          </div>
          <div className="mt-2.5 pt-2 border-t border-[#2e2014] text-[10px] text-amber-400/50 italic text-center">
            &ldquo;Coconuts do not need an OS.&rdquo;
          </div>
        </div>

        {/* Render Open Application Windows */}
        {windows
          .filter((win) => win.isOpen)
          .map((win) => (
            <Window
              key={win.id}
              window={win}
              icon={getWindowIcon(win.id)}
              onFocus={focusWindow}
              onClose={closeWindow}
              onMinimize={minimizeWindow}
              onMaximizeToggle={toggleMaximizeWindow}
              onMove={moveWindow}
            >
              <WindowPlaceholderContent id={win.id} />
            </Window>
          ))}
      </main>

      {/* Start Menu Popover */}
      <StartMenu
        isOpen={isStartMenuOpen}
        onClose={() => setIsStartMenuOpen(false)}
        onLaunchApp={openWindow}
      />

      {/* Taskbar */}
      <Taskbar
        isStartMenuOpen={isStartMenuOpen}
        onToggleStartMenu={() => setIsStartMenuOpen(!isStartMenuOpen)}
        windows={windows}
        focusedWindowId={focusedWindowId}
        onSelectWindowTab={handleSelectWindowTab}
      />
    </div>
  );
}
