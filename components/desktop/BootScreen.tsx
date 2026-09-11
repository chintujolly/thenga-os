"use client";

import { useEffect, useRef, useState } from "react";

interface BootScreenProps {
  onComplete: () => void;
}

// Simulated boot log lines. Purely cosmetic — nothing here touches
// any real system, file, or process.
const BOOT_LINES: string[] = [
  "THENGA BIOS v0.1 — Cocos nucifera Systems",
  "Checking husk integrity......... OK",
  "Mounting tender water partition.. OK",
  "Loading fiber drivers........... OK",
  "Searching for kernel............ NOT FOUND (expected)",
  "Falling back to pure vegetative state",
  "Starting ThengaEngine daemon..... OK",
  "Starting Kola cluster service.... OK",
  "Calibrating canopy sensors....... OK",
  "Mounting THENGA Explorer VFS..... OK",
  "Welcome to THENGA OS.",
];

const LINE_DELAY_MS = 180;

export default function BootScreen({ onComplete }: BootScreenProps) {
  const [visibleCount, setVisibleCount] = useState(0);
  const completedRef = useRef(false);

  const finish = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    onComplete();
  };

  // Reveal boot lines one at a time, then hand off to the desktop
  useEffect(() => {
    if (visibleCount >= BOOT_LINES.length) {
      const holdTimer = setTimeout(finish, 350);
      return () => clearTimeout(holdTimer);
    }

    const timer = setTimeout(() => {
      setVisibleCount((count) => count + 1);
    }, LINE_DELAY_MS);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleCount]);

  // Allow skipping the boot sequence with a click or key press
  useEffect(() => {
    const handleSkip = () => finish();
    window.addEventListener("keydown", handleSkip);
    window.addEventListener("click", handleSkip);
    return () => {
      window.removeEventListener("keydown", handleSkip);
      window.removeEventListener("click", handleSkip);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const progress = Math.round((visibleCount / BOOT_LINES.length) * 100);

  return (
    <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#0a0704] text-amber-100 select-none cursor-pointer">
      <div className="absolute inset-0 coconut-desktop-grid pointer-events-none opacity-60" />
      <div className="absolute inset-0 crt-scanlines opacity-40 pointer-events-none" />

      <div className="relative w-[min(90vw,520px)] px-4">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-3xl">🥥</span>
          <div>
            <div className="font-mono font-extrabold tracking-widest text-amber-200 text-lg">
              THENGA OS
            </div>
            <div className="font-mono text-[10px] text-amber-500/60">
              VER 0.1 • COCOS NUCIFERA EDITION
            </div>
          </div>
        </div>

        <div className="font-mono text-[11px] sm:text-xs space-y-1 min-h-[220px]">
          {BOOT_LINES.slice(0, visibleCount).map((line, idx) => (
            <div
              key={idx}
              className={
                line.includes("NOT FOUND")
                  ? "text-amber-400"
                  : idx === BOOT_LINES.length - 1
                  ? "text-emerald-300 font-semibold pt-1"
                  : "text-emerald-400/90"
              }
            >
              {line}
            </div>
          ))}
          {visibleCount < BOOT_LINES.length && (
            <span className="inline-block w-2 h-3.5 bg-emerald-400 animate-pulse align-middle" />
          )}
        </div>

        <div className="mt-5 w-full h-1.5 rounded-full bg-[#1c130c] border border-[#3b2718] overflow-hidden">
          <div
            className="h-full bg-emerald-500 transition-all duration-150 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-2 text-center font-mono text-[10px] text-amber-500/40">
          Click, tap, or press any key to skip
        </div>
      </div>
    </div>
  );
}
