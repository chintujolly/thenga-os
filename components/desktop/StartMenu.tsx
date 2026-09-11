"use client";

import React, { useEffect, useRef, useState } from "react";
import { WindowId } from "@/types/window";
import PixelIcon from "./PixelIcon";
import PixelCoconut from "./PixelCoconut";
import { sound } from "@/utils/sound";

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onLaunchApp?: (appId: WindowId) => void;
}

type CategoryName = "SYSTEM" | "COCONUT" | "QUESTIONABLE NECESSITIES";

interface LauncherItem {
  id: WindowId;
  name: string;
  desc: string;
  category: CategoryName;
  badge?: string;
}

const LAUNCHER_ITEMS: LauncherItem[] = [
  // SYSTEM
  { id: "terminal", name: "Terminal", desc: "Coconut fiber shell & commands", category: "SYSTEM", badge: "CLI" },
  { id: "explorer", name: "Explorer", desc: "Browse canopy VFS folders", category: "SYSTEM", badge: "VFS" },
  { id: "task-manager", name: "Task Manager", desc: "Live system processes & juice RAM", category: "SYSTEM" },
  { id: "readme", name: "README.the", desc: "System documentation manual", category: "SYSTEM" },

  // COCONUT
  { id: "kola-manager", name: "Kola Manager", desc: "Active coconut bunches & threads", category: "COCONUT" },
  { id: "bin", name: "Copra Bin", desc: "Recycle discarded shells & husks", category: "COCONUT" },
  { id: "calculator", name: "Coconut Calculator", desc: "Arithmetic, coconut-flavored", category: "COCONUT" },
  { id: "physics", name: "Coconut Physics", desc: "Discover gravity. Bounce coconuts.", category: "COCONUT" },

  // QUESTIONABLE NECESSITIES
  { id: "defender", name: "Thenga Defender", desc: "Scan and remove suspicious coconuts", category: "QUESTIONABLE NECESSITIES", badge: "SAFE" },
  { id: "achievements", name: "Achievements", desc: "Trophy room of coconut milestones", category: "QUESTIONABLE NECESSITIES" },
];

const CATEGORIES: CategoryName[] = ["SYSTEM", "COCONUT", "QUESTIONABLE NECESSITIES"];

export default function StartMenu({ isOpen, onClose, onLaunchApp }: StartMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState("");
  const [powerNotice, setPowerNotice] = useState<string | null>(null);

  // Close on outside click or Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredItems = LAUNCHER_ITEMS.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.desc.toLowerCase().includes(search.toLowerCase())
  );

  const handleLaunch = (id: WindowId) => {
    sound.playClick();
    onLaunchApp?.(id);
    onClose();
  };

  const handlePower = (action: string) => {
    sound.playClick();
    setPowerNotice(`Cannot ${action.toLowerCase()} coconut: It is purely vegetative.`);
    setTimeout(() => setPowerNotice(null), 2500);
  };

  return (
    <div
      ref={menuRef}
      className="thenga-window-in thenga-pixel-frame absolute bottom-12 left-2 sm:left-4 w-[min(94vw,390px)] max-h-[calc(100vh-70px)] z-50 flex flex-col font-mono text-xs text-[#191008] overflow-hidden shadow-[5px_5px_0_#191008]"
      role="dialog"
      aria-label="Thenga OS Start Menu"
    >
      {/* Header Bar */}
      <div className="p-3 bg-[#f5a81e] border-b-3 border-[#191008] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <PixelCoconut state="sitting" size={28} />
          <div>
            <div className="thenga-pixel text-[11px] font-bold text-[#191008] leading-tight">
              THENGA OS
            </div>
            <div className="text-[10px] text-[#4d2b10] leading-tight">
              Operating system for things that don&apos;t need one.
            </div>
          </div>
        </div>
      </div>

      {/* User profile strip */}
      <div className="px-3 py-1.5 bg-[#ecdba8] border-b-2 border-[#191008] flex items-center justify-between text-[10px]">
        <span className="font-bold">Chief Thenga Climber</span>
        <span className="bg-[#2b9e38] text-white px-1.5 py-0.2 font-bold text-[9px] border border-[#191008]">
          Husk: Intact
        </span>
      </div>

      {/* Retro Search Box */}
      <div className="p-2.5 bg-[#f4ebd2] border-b-2 border-[#191008]">
        <div className="flex items-center border-2 border-[#191008] bg-white px-2 py-1 shadow-[inset_1px_1px_0_rgba(0,0,0,0.15)]">
          <span className="text-[#6b4728] mr-1.5">🔍</span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search programs..."
            className="w-full bg-transparent border-none outline-none font-mono text-xs text-[#191008] placeholder:text-[#6b4728]/50"
            autoFocus
          />
        </div>
      </div>

      {/* Categorized Applications List */}
      <div className="flex-1 overflow-y-auto p-2.5 space-y-3 bg-[#fdf7e7] max-h-[380px]">
        {filteredItems.length === 0 ? (
          <div className="text-center py-6 text-xs text-[#6b4728]">
            No coconut programs found.
          </div>
        ) : (
          CATEGORIES.map((category) => {
            const items = filteredItems.filter((i) => i.category === category);
            if (items.length === 0) return null;
            return (
              <div key={category} className="space-y-1">
                <div className="text-[10px] font-bold tracking-wider text-[#6b4728] px-1 uppercase flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-[#f5a81e] inline-block border border-[#191008]" />
                  <span>{category}</span>
                </div>
                <div className="space-y-0.5">
                  {items.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleLaunch(item.id)}
                      className="w-full flex items-center gap-2.5 p-1.5 hover:bg-[#ecdba8] border border-transparent hover:border-[#191008] transition-colors text-left cursor-pointer group select-none"
                    >
                      <div className="shrink-0 group-hover:scale-110 transition-transform">
                        <PixelIcon id={item.id} size={22} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs truncate text-[#191008]">
                            {item.name}
                          </span>
                          {item.badge && (
                            <span className="text-[9px] px-1 py-0.2 bg-[#d8c593] border border-[#191008] font-bold">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-[#6b4728] truncate">
                          {item.desc}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            );
          })
        )}

        {powerNotice && (
          <div className="p-2 bg-[#ecdba8] border border-[#191008] text-[10px] text-center font-bold text-[#c93b2b]">
            {powerNotice}
          </div>
        )}
      </div>

      {/* Footer / System Power Control */}
      <div className="p-2 bg-[#d6b86a] border-t-3 border-[#191008] flex items-center justify-between">
        <span className="text-[10px] font-bold text-[#4d2b10]">
          ORGANIC EDITION v0.1
        </span>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => handlePower("Restart")}
            title="Restart Coconut"
            className="thenga-pixel-btn px-2 py-0.5 text-[10px] font-bold bg-[#fdf7e7] hover:bg-white"
          >
            RESTART
          </button>
          <button
            type="button"
            onClick={() => handlePower("De-husk")}
            title="De-husk / Power Down"
            className="thenga-pixel-btn px-2 py-0.5 text-[10px] font-bold bg-[#c93b2b] text-white hover:bg-[#e04533]"
          >
            DE-HUSK
          </button>
        </div>
      </div>
    </div>
  );
}
