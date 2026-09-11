"use client";

import { useState } from "react";
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

interface DesktopIcon {
  id: string;
  name: string;
  icon: typeof Terminal;
  badge?: string;
}

const DESKTOP_ICONS: DesktopIcon[] = [
  { id: "terminal", name: "Thenga Terminal", icon: Terminal, badge: "sh" },
  { id: "explorer", name: "Thenga Explorer", icon: FolderTree },
  { id: "kola-manager", name: "Kola Manager", icon: Activity },
  { id: "readme", name: "README.the", icon: FileText },
  { id: "bin", name: "Copra Bin", icon: Trash2 },
];

export default function DesktopShell() {
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [activeAppTitle, setActiveAppTitle] = useState<string | null>(null);
  const [systemNotice, setSystemNotice] = useState<string | null>(null);

  const handleIconClick = (id: string, name: string) => {
    setSelectedIcon(id);
  };

  const handleIconDoubleClick = (name: string) => {
    setActiveAppTitle(name);
    setSystemNotice(`Window system will mount "${name}" in the next milestone!`);
    setTimeout(() => setSystemNotice(null), 3000);
  };

  const handleBackgroundClick = (e: React.MouseEvent) => {
    // Only deselect if clicked directly on the desktop canvas
    if (e.target === e.currentTarget) {
      setSelectedIcon(null);
      if (isStartMenuOpen) {
        setIsStartMenuOpen(false);
      }
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

      {/* Main Desktop Work Area (Where future windows will be rendered) */}
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
        <div className="relative z-10 flex flex-col gap-3 w-28">
          {DESKTOP_ICONS.map((item) => {
            const Icon = item.icon;
            const isSelected = selectedIcon === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleIconClick(item.id, item.name);
                }}
                onDoubleClick={(e) => {
                  e.stopPropagation();
                  handleIconDoubleClick(item.name);
                }}
                className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all cursor-pointer group text-center ${
                  isSelected
                    ? "bg-amber-500/20 border border-amber-500/60 shadow-lg backdrop-blur-sm"
                    : "hover:bg-white/5 border border-transparent"
                }`}
                title={`Double click to open ${item.name}`}
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
        <div className="hidden md:block absolute top-6 right-6 z-10 w-64 p-3.5 bg-[#140e09]/80 border border-[#3b291a] rounded-2xl backdrop-blur-md shadow-xl text-xs font-mono text-amber-200/90 pointer-events-none select-none">
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

        {/* Interactive Notice Toast */}
        {systemNotice && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 px-4 py-2 bg-[#261a11]/95 border border-amber-500/70 rounded-xl shadow-2xl backdrop-blur-md text-xs font-mono text-amber-100 animate-in fade-in slide-in-from-bottom-2">
            🥥 {systemNotice}
          </div>
        )}
      </main>

      {/* Start Menu Popover */}
      <StartMenu
        isOpen={isStartMenuOpen}
        onClose={() => setIsStartMenuOpen(false)}
        onLaunchApp={(appName) => {
          setActiveAppTitle(appName);
          setIsStartMenuOpen(false);
          setSystemNotice(`Window system will mount "${appName}" soon!`);
          setTimeout(() => setSystemNotice(null), 3000);
        }}
      />

      {/* Taskbar */}
      <Taskbar
        isStartMenuOpen={isStartMenuOpen}
        onToggleStartMenu={() => setIsStartMenuOpen(!isStartMenuOpen)}
        activeAppTitle={activeAppTitle}
      />
    </div>
  );
}
