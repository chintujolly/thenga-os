"use client";

import React, { useEffect, useRef, useState } from "react";
import { useThengaStore } from "@/store/useThengaStore";
import PixelCoconut from "./PixelCoconut";
import { sound } from "@/utils/sound";

type DefenderPhase =
  | "idle"
  | "scan-husk"
  | "scan-juice"
  | "scan-coconut"
  | "threat-found"
  | "removing"
  | "removed";

export default function ThengaDefender() {
  const [phase, setPhase] = useState<DefenderPhase>("idle");
  const [progress, setProgress] = useState(0);
  const unlockAchievement = useThengaStore((state) => state.unlockAchievement);
  const spawnCoconutFall = useThengaStore((state) => state.spawnCoconutFall);
  const triggerScreenShake = useThengaStore((state) => state.triggerScreenShake);
  const showToast = useThengaStore((state) => state.showToast);

  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  useEffect(() => clearTimers, []);

  const handleScan = () => {
    if (phase !== "idle" && phase !== "removed") return;
    clearTimers();
    sound.playChirp();
    setPhase("scan-husk");
    setProgress(33);

    timersRef.current.push(
      setTimeout(() => {
        sound.playChirp();
        setPhase("scan-juice");
        setProgress(66);
      }, 700),
      setTimeout(() => {
        sound.playChirp();
        setPhase("scan-coconut");
        setProgress(100);
      }, 1400),
      setTimeout(() => {
        sound.playError();
        triggerScreenShake();
        setPhase("threat-found");
      }, 2100)
    );
  };

  const handleRemoveThreat = () => {
    sound.playClick();
    setPhase("removing");
    timersRef.current.push(
      setTimeout(() => {
        sound.playThud();
        triggerScreenShake();
        setPhase("removed");
        unlockAchievement("security-expert");
        spawnCoconutFall(1);
        showToast("Unexpected coconut detected. *THUD* — Aiyyo.");
      }, 900)
    );
  };

  const isScanning = phase === "scan-husk" || phase === "scan-juice" || phase === "scan-coconut";

  return (
    <div className="flex flex-col h-full bg-[#fdf7e7] text-[#191008] select-none font-mono text-xs">
      {/* Antivirus Header Bar */}
      <div className="p-3 bg-[#ecdba8] border-b-2 border-[#191008] flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Pixel Shield */}
          <div className="w-5 h-5 bg-[#1b8577] border border-[#191008] flex items-center justify-center text-white font-bold text-[10px]">
            🛡
          </div>
          <span className="font-bold text-[11px] tracking-wider uppercase">
            THENGA DEFENDER 2026
          </span>
        </div>
        <span
          className={`px-2 py-0.5 border border-[#191008] text-[9px] font-bold ${
            phase === "threat-found"
              ? "bg-[#c93b2b] text-white"
              : "bg-[#2b9e38] text-white"
          }`}
        >
          {phase === "threat-found" ? "THREAT DETECTED" : "SYSTEM SECURE"}
        </span>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-4 space-y-3 flex flex-col">
        {/* Antivirus Status Shield Banner */}
        <div className="thenga-pixel-frame-sm p-3 bg-white flex items-center gap-3">
          <div className="shrink-0">
            <PixelCoconut state={phase === "threat-found" ? "cracked" : "sitting"} size={36} />
          </div>
          <div>
            <div className="font-bold text-xs">
              {phase === "threat-found"
                ? "WARNING: ORGANIC ANOMALY DETECTED"
                : "ORGANIC THREAT PROTECTION: ACTIVE"}
            </div>
            <div className="text-[10px] text-[#6b4728]">
              Database version: 0.1-Kerala-Fiber
            </div>
          </div>
        </div>

        {/* Scan Button */}
        <button
          type="button"
          onClick={handleScan}
          disabled={isScanning || phase === "threat-found"}
          className="thenga-pixel-btn py-2 text-xs font-bold bg-[#f5a81e] hover:bg-[#ffba3b] disabled:opacity-40 disabled:cursor-not-allowed"
        >
          [ SCAN THENGA ]
        </button>

        {/* Scan Progress Feedback */}
        {isScanning && (
          <div className="border-2 border-[#191008] bg-white p-3 space-y-2">
            <div className="flex justify-between text-[11px] font-bold">
              <span>
                {phase === "scan-husk" && "Checking husk..."}
                {phase === "scan-juice" && "Checking juice..."}
                {phase === "scan-coconut" && "Checking coconut..."}
              </span>
              <span>{progress}%</span>
            </div>
            <div className="w-full h-3 border border-[#191008] bg-[#ecdba8] overflow-hidden p-0.5">
              <div
                className="h-full bg-[#2b9e38] transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Threat Found Screen */}
        {phase === "threat-found" && (
          <div className="thenga-pixel-frame-sm p-3 bg-[#fae8e6] border-2 border-[#c93b2b] space-y-2.5 thenga-shake">
            <div className="font-bold text-xs text-[#c93b2b] flex items-center gap-1.5">
              <span>⚠</span>
              <span>THREAT FOUND</span>
            </div>
            <p className="text-[11px] font-bold text-[#191008]">
              Suspicious coconut detected.
            </p>
            <p className="text-[10px] text-[#6b4728]">
              Target signature: Definitely_Not_A_Virus.thg (Disguised with fake moustache)
            </p>
            <button
              type="button"
              onClick={handleRemoveThreat}
              className="thenga-pixel-btn w-full py-1.5 font-bold text-xs bg-[#c93b2b] text-white hover:bg-[#de4433]"
            >
              [ REMOVE THREAT ]
            </button>
          </div>
        )}

        {/* Threat Removed State */}
        {phase === "removing" && (
          <div className="p-3 bg-white border-2 border-[#191008] text-center font-bold text-xs text-[#6b4728]">
            Removing threat from canopy...
          </div>
        )}

        {phase === "removed" && (
          <div className="thenga-pixel-frame-sm p-3 bg-[#e8f5ec] space-y-1">
            <div className="font-bold text-xs text-[#2b9e38]">
              THREAT REMOVED.
            </div>
            <div className="font-bold text-xs text-[#191008]">
              &ldquo;It was a coconut.&rdquo;
            </div>
            <div className="text-[10px] text-[#6b4728]">
              Malayalam reaction: &ldquo;Aiyyo.&rdquo;
            </div>
          </div>
        )}

        {phase === "idle" && (
          <div className="flex-1 flex items-center justify-center text-center text-[#6b4728] text-[11px]">
            No threats detected. Coconut posture: pristine.
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-2 bg-[#ecdba8] border-t-2 border-[#191008] flex justify-between text-[10px] text-[#6b4728]">
        <span>Husk Guard Engine</span>
        <span>0 kernels harmed</span>
      </div>
    </div>
  );
}
