"use client";

import React, { useEffect, useState } from "react";
import { useThengaStore } from "@/store/useThengaStore";
import { sound } from "@/utils/sound";
import PixelCoconut from "./PixelCoconut";

type Stage = "warning" | "installing" | "congrats" | "storm" | "removed";

const STORM_LINES = [
  "Unexpected coconut detected.",
  "System integrity: Questionable.",
  "Coconut overflow in buffer.",
];

export default function VirusEventDialog({ onClose }: { onClose: () => void }) {
  const [stage, setStage] = useState<Stage>("warning");
  const [progress, setProgress] = useState(0);
  const [stormLine, setStormLine] = useState(STORM_LINES[0]);
  const spawnCoconutFall = useThengaStore((state) => state.spawnCoconutFall);
  const triggerScreenShake = useThengaStore((state) => state.triggerScreenShake);
  const unlockAchievement = useThengaStore((state) => state.unlockAchievement);

  const run = () => {
    sound.playClick();
    setProgress(0);
    setStage("installing");
  };

  // installing -> progress bar -> congrats
  useEffect(() => {
    if (stage !== "installing") return;
    const step = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(step);
          return 100;
        }
        return p + 10;
      });
    }, 60);
    const advance = setTimeout(() => {
      sound.playChirp();
      setStage("congrats");
    }, 1200);
    return () => {
      clearInterval(step);
      clearTimeout(advance);
    };
  }, [stage]);

  // congrats -> brief pause -> storm
  useEffect(() => {
    if (stage !== "congrats") return;
    const t = setTimeout(() => {
      sound.playError();
      setStage("storm");
    }, 850);
    return () => clearTimeout(t);
  }, [stage]);

  // storm: cycle warning lines + spawn coconuts across the whole desktop
  useEffect(() => {
    if (stage !== "storm") return;
    triggerScreenShake();
    spawnCoconutFall(5);

    let i = 0;
    const cycle = setInterval(() => {
      i += 1;
      setStormLine(STORM_LINES[i % STORM_LINES.length]);
      triggerScreenShake();
    }, 450);

    const advance = setTimeout(() => {
      clearInterval(cycle);
      sound.playAchievement();
      setStage("removed");
      unlockAchievement("virus-removed");
    }, 1900);

    return () => {
      clearInterval(cycle);
      clearTimeout(advance);
    };
  }, [stage, spawnCoconutFall, triggerScreenShake, unlockAchievement]);

  return (
    <div className="thenga-window-in thenga-pixel-frame w-full max-w-sm bg-[#fdf7e7] text-[#191008] font-mono shadow-[6px_6px_0_#191008] overflow-hidden">
      {/* Title Bar */}
      <div className="flex items-center gap-2 px-3 py-1.5 border-b-2 border-[#191008] bg-[#c93b2b] text-white font-bold text-[11px]">
        <span>⚠</span>
        <span className="truncate">Definitely_Not_A_Virus.thg</span>
      </div>

      {/* Dialog Body */}
      <div className="p-4 space-y-3 text-xs leading-relaxed min-h-[140px] flex flex-col justify-center">
        {stage === "warning" && (
          <>
            <div className="font-bold text-[#c93b2b] text-[13px]">
              CRITICAL ADVISORY
            </div>
            <p className="text-[#38210f]">
              This file looks extremely suspicious. Run anyway?
            </p>
            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={run}
                className="thenga-pixel-btn flex-1 py-1 text-xs font-bold bg-[#f5a81e]"
              >
                RUN
              </button>
              <button
                type="button"
                onClick={run}
                className="thenga-pixel-btn flex-1 py-1 text-xs font-bold bg-[#f5a81e]"
              >
                RUN (COCONUT)
              </button>
            </div>
          </>
        )}

        {stage === "installing" && (
          <>
            <div className="font-bold text-[#191008]">
              Extracting Organic Payload...
            </div>
            <div className="w-full h-4 border-2 border-[#191008] bg-white p-0.5 shadow-[inset_1px_1px_0_rgba(0,0,0,0.2)]">
              <div
                className="h-full bg-[#2b9e38] transition-[width] duration-75"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-right text-[10px] text-[#6b4728] font-bold">
              {Math.min(progress, 100)}%
            </div>
          </>
        )}

        {stage === "congrats" && (
          <div className="text-center space-y-1">
            <div className="font-bold text-[#2b9e38] text-[13px]">
              Congratulations.
            </div>
            <p className="text-[#38210f]">You now possess:</p>
            <div className="thenga-pixel text-base font-extrabold text-[#f5a81e]">
              THENGA.
            </div>
          </div>
        )}

        {stage === "storm" && (
          <div className="text-center space-y-2">
            <div className="font-bold text-[#c93b2b] text-sm thenga-shake">
              ⚠ {stormLine}
            </div>
            <div className="flex justify-center">
              <PixelCoconut state="falling" size={32} />
            </div>
            <p className="text-[10px] text-[#6b4728]">
              Coconuts are actively breaching desktop boundaries.
            </p>
          </div>
        )}

        {stage === "removed" && (
          <div className="space-y-1">
            <div className="font-bold text-[#2b9e38] text-[13px]">
              Threat neutralized.
            </div>
            <p className="text-[#38210f]">
              Reason: <span className="italic font-bold">&ldquo;It got bored.&rdquo;</span>
            </p>
            <p className="text-[10px] text-[#6b4728]">
              Malayalam review: &ldquo;Poli.&rdquo;
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-2.5 bg-[#ecdba8] border-t-2 border-[#191008] flex justify-end">
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          disabled={stage !== "removed"}
          className="thenga-pixel-btn px-4 py-1 text-xs font-bold bg-[#fdf7e7] disabled:opacity-40 disabled:cursor-not-allowed"
        >
          OK
        </button>
      </div>
    </div>
  );
}
