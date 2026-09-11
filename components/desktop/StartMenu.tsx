"use client";

import { useEffect, useRef, useState } from "react";
import {
  Search,
  Terminal,
  FolderTree,
  Activity,
  AlertTriangle,
  Settings,
  Power,
  RotateCcw,
  Sparkles,
} from "lucide-react";

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onLaunchApp?: (appName: string) => void;
}

interface AppShortcut {
  id: string;
  name: string;
  category: string;
  icon: typeof Terminal;
  description: string;
  badge?: string;
}

const APPS: AppShortcut[] = [
  {
    id: "terminal",
    name: "Thenga Terminal",
    category: "System",
    icon: Terminal,
    description: "Coconut shell CLI & fiber commands",
    badge: "CLI",
  },
  {
    id: "explorer",
    name: "Thenga Explorer",
    category: "Files",
    icon: FolderTree,
    description: "Browse folders, fibers, & copra",
    badge: "VFS",
  },
  {
    id: "kola-manager",
    name: "Kola Manager",
    category: "Monitoring",
    icon: Activity,
    description: "Inspect active coconut threads & juices",
    badge: "Stats",
  },
  {
    id: "panic",
    name: "Kernel Panic (Why?)",
    category: "Diagnostics",
    icon: AlertTriangle,
    description: "Panic simulator (no kernel exists)",
    badge: "404",
  },
  {
    id: "settings",
    name: "Thenga Settings",
    category: "Preferences",
    icon: Settings,
    description: "Adjust husk density & palm theme",
  },
];

export default function StartMenu({ isOpen, onClose, onLaunchApp }: StartMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Close when clicking outside or pressing Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredApps = APPS.filter(
    (app) =>
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAppClick = (app: AppShortcut) => {
    setStatusMessage(`App "${app.name}" will be ready in future updates.`);
    if (onLaunchApp) {
      onLaunchApp(app.name);
    }
    setTimeout(() => setStatusMessage(null), 2500);
  };

  const handlePowerAction = (action: string) => {
    setStatusMessage(`Coconut cannot ${action.toLowerCase()}. It is purely vegetative.`);
    setTimeout(() => setStatusMessage(null), 2500);
  };

  return (
    <div
      ref={menuRef}
      className="absolute bottom-14 left-2 sm:left-4 w-[calc(100vw-1rem)] sm:w-[420px] max-h-[580px] bg-[#1a120b]/95 backdrop-blur-xl border border-[#483321] rounded-2xl shadow-2xl overflow-hidden flex flex-col z-50 text-amber-100 transition-all duration-200 animate-in fade-in slide-in-from-bottom-3"
      role="dialog"
      aria-label="Thenga OS Launcher"
    >
      {/* Top Header / Coconut Profile */}
      <div className="p-4 bg-gradient-to-r from-[#2c1d12] via-[#20150d] to-[#160e09] border-b border-[#3d2a1b] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-600 to-amber-950 border border-amber-400/40 flex items-center justify-center text-2xl shadow-inner">
            🥥
          </div>
          <div>
            <div className="text-sm font-semibold text-amber-100 flex items-center gap-1.5">
              <span>Chief Thenga Climber</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <p className="text-[11px] text-amber-300/70 font-mono">
              THENGA OS v0.1 • Organic Edition
            </p>
          </div>
        </div>
        <div className="text-right">
          <span className="inline-block px-2 py-0.5 rounded-full text-[10px] bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-mono">
            Husk: Intact
          </span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-3 border-b border-[#302114] bg-[#150e08]/70">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-amber-400/60 absolute left-3 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search apps, husk files, or copra..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg bg-[#251910] border border-[#422e1e] text-amber-100 placeholder:text-amber-300/40 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 font-mono"
            autoFocus
          />
        </div>
      </div>

      {/* App List Area */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1 max-h-[320px]">
        <div className="text-[10px] uppercase font-mono tracking-wider text-amber-400/60 px-2 py-1 font-semibold">
          Pinned Applications
        </div>

        {filteredApps.length === 0 ? (
          <div className="text-center py-6 text-xs text-amber-300/50">
            No coconut apps found matching &ldquo;{searchQuery}&rdquo;
          </div>
        ) : (
          filteredApps.map((app) => {
            const Icon = app.icon;
            return (
              <button
                key={app.id}
                type="button"
                onClick={() => handleAppClick(app)}
                className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/5 border border-transparent hover:border-[#4b3522] transition-all text-left group cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-[#271b12] border border-[#4d3623] flex items-center justify-center text-amber-300 group-hover:scale-105 group-hover:text-emerald-400 group-hover:border-emerald-500/50 transition-all">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-amber-100 group-hover:text-amber-200 truncate">
                      {app.name}
                    </span>
                    {app.badge && (
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-900/40 text-amber-300/80 border border-amber-800/40 font-mono">
                        {app.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-amber-300/60 truncate">
                    {app.description}
                  </p>
                </div>
              </button>
            );
          })
        )}

        {/* Temporary Feedback Message */}
        {statusMessage && (
          <div className="p-2 mt-2 text-xs bg-amber-950/80 border border-amber-600/50 rounded-lg text-amber-200 text-center font-mono animate-in fade-in">
            {statusMessage}
          </div>
        )}
      </div>

      {/* Kerala Coconut Brainrot Quote Bar */}
      <div className="px-4 py-2 bg-[#120c07] border-t border-[#2d1e12] flex items-center gap-2 text-[11px] text-amber-300/80">
        <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
        <span className="truncate italic">
          &ldquo;Naalikeram nanma niranja bhoomi...&rdquo;
        </span>
      </div>

      {/* Footer / System Control Buttons */}
      <div className="p-3 bg-[#170f09] border-t border-[#382618] flex items-center justify-between">
        <div className="flex items-center gap-1">
          <span className="text-[11px] font-mono text-amber-400/60">
            KERA-SYS 100% OK
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => handlePowerAction("Restart")}
            title="Restart Coconut"
            className="p-1.5 rounded-lg hover:bg-white/10 text-amber-300 hover:text-amber-100 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => handlePowerAction("Power Off")}
            title="De-husk / Power Off"
            className="p-1.5 rounded-lg hover:bg-red-950/50 text-red-400 hover:text-red-200 transition-colors cursor-pointer"
          >
            <Power className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
