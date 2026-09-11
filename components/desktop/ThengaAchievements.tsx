"use client";

import React from "react";
import { useThengaStore } from "@/store/useThengaStore";
import PixelCoconut from "./PixelCoconut";

interface PixelBadgeProps {
  unlocked: boolean;
  type: string;
}

function PixelBadge({ unlocked, type }: PixelBadgeProps) {
  const INK = "#191008";

  if (!unlocked) {
    return (
      <div className="w-8 h-8 border-2 border-[#191008] bg-[#d8c593] flex items-center justify-center text-[10px] font-bold text-[#6b4728]">
        🔒
      </div>
    );
  }

  // Golden trophy or medal
  return (
    <div className="w-8 h-8 border-2 border-[#191008] bg-[#f5a81e] flex items-center justify-center shadow-[1px_1px_0_#191008]">
      {type === "trophy" ? (
        <svg width="20" height="20" viewBox="0 0 16 16" shapeRendering="crispEdges">
          <rect x={4} y={1} width={8} height={1} fill={INK} />
          <rect x={3} y={2} width={10} height={6} fill="#ffe666" />
          <rect x={2} y={3} width={1} height={4} fill="#ffe666" />
          <rect x={13} y={3} width={1} height={4} fill="#c9820e" />
          <rect x={6} y={8} width={4} height={3} fill="#c9820e" />
          <rect x={4} y={11} width={8} height={2} fill="#ffe666" />
          <rect x={7} y={4} width={2} height={2} fill="#693c1b" />
        </svg>
      ) : (
        <PixelCoconut state="sitting" size={18} />
      )}
    </div>
  );
}

interface AchievementDisplay {
  id: string;
  name: string;
  desc: string;
  badgeType: string;
}

const ACHIEVEMENT_LIST: AchievementDisplay[] = [
  { id: "booted-thenga", name: "BOOTED THE THENGA", desc: "Successfully booted into the coconut operating system.", badgeType: "coconut" },
  { id: "first-kola", name: "FIRST KOLA", desc: "Clustered a new bunch of coconuts into the canopy.", badgeType: "trophy" },
  { id: "questionable-mathematics", name: "QUESTIONABLE MATHEMATICS", desc: "Divided by zero and provoked a coconut reaction.", badgeType: "trophy" },
  { id: "virus-removed", name: "WHY DID YOU OPEN THAT?", desc: "Executed Definitely_Not_A_Virus.thg anyway.", badgeType: "trophy" },
  { id: "coconut-physics", name: "COCONUT FALL", desc: "Introduced coconut to gravitational principles.", badgeType: "coconut" },
  { id: "security-expert", name: "THENGA SECURITY", desc: "Scanned and eliminated an undercover coconut threat.", badgeType: "trophy" },
  { id: "easter-egg", name: "PATIENT USER", desc: "Discovered a hidden Kerala secret in the canopy.", badgeType: "coconut" },
  { id: "thenga-had-enough", name: "THENGA MASTER", desc: "Exhausted all patience. Triggered peak annoyance.", badgeType: "trophy" },
];

export default function ThengaAchievements() {
  const unlocked = useThengaStore((state) => state.unlockedAchievements);
  const unlockedCount = ACHIEVEMENT_LIST.filter((a) => unlocked[a.id]).length;

  return (
    <div className="flex flex-col h-full bg-[#fdf7e7] text-[#191008] select-none font-mono text-xs">
      {/* Header */}
      <div className="p-3 bg-[#ecdba8] border-b-2 border-[#191008] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm">🏆</span>
          <span className="font-bold text-[11px] uppercase tracking-wider">
            COCONUT ACHIEVEMENTS
          </span>
        </div>
        <span className="bg-[#2b9e38] text-white px-2 py-0.5 border border-[#191008] font-bold text-[10px]">
          {unlockedCount} / {ACHIEVEMENT_LIST.length} UNLOCKED
        </span>
      </div>

      {/* Progress Bar */}
      <div className="p-2.5 bg-[#f4ebd2] border-b-2 border-[#191008]">
        <div className="w-full h-3 border-2 border-[#191008] bg-white p-0.5">
          <div
            className="h-full bg-[#f5a81e] transition-all duration-300"
            style={{ width: `${(unlockedCount / ACHIEVEMENT_LIST.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Secret Trophy Room List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {ACHIEVEMENT_LIST.map((ach) => {
          const isUnlocked = !!unlocked[ach.id];
          return (
            <div
              key={ach.id}
              className={`thenga-pixel-frame-sm p-2 flex items-center gap-2.5 ${
                isUnlocked ? "bg-white" : "bg-[#ecdba8]/50 opacity-60"
              }`}
            >
              <PixelBadge unlocked={isUnlocked} type={ach.badgeType} />

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs truncate text-[#191008]">
                    {ach.name}
                  </span>
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.2 border border-[#191008] ${
                      isUnlocked
                        ? "bg-[#2b9e38] text-white"
                        : "bg-[#d8c593] text-[#6b4728]"
                    }`}
                  >
                    {isUnlocked ? "UNLOCKED" : "LOCKED"}
                  </span>
                </div>
                <p className="text-[10px] text-[#6b4728] truncate mt-0.5">
                  {ach.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="p-2 bg-[#ecdba8] border-t-2 border-[#191008] flex justify-between text-[10px] text-[#6b4728]">
        <span>Secret Trophies</span>
        <span>Saved in Local Husk Cache</span>
      </div>
    </div>
  );
}
