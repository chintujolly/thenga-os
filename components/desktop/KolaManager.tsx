"use client";

import React, { useState } from "react";
import { useThengaStore } from "@/store/useThengaStore";
import PixelCoconut from "./PixelCoconut";
import { sound } from "@/utils/sound";

export default function KolaManager() {
  const kolas = useThengaStore((state) => state.kolas);
  const createKola = useThengaStore((state) => state.createKola);
  const [optimizing, setOptimizing] = useState(false);
  const [optimizeMessage, setOptimizeMessage] = useState<string | null>(null);

  const handleCreate = () => {
    sound.playClick();
    createKola();
  };

  const handleOptimize = () => {
    sound.playChirp();
    setOptimizing(true);
    setOptimizeMessage("Optimizing fiber alignment...");
    setTimeout(() => {
      setOptimizing(false);
      setOptimizeMessage("Optimization complete. Performance increased by: 0%. Excellent.");
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full bg-[#fdf7e7] text-[#191008] select-none font-mono text-xs">
      {/* Top Controls Header */}
      <div className="p-2.5 bg-[#ecdba8] border-b-2 border-[#191008] flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <PixelCoconut state="sitting" size={20} />
          <span className="font-bold text-[11px] uppercase tracking-wider">
            KOLA INVENTORY SYSTEM
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleCreate}
            className="thenga-pixel-btn px-2.5 py-1 text-[11px] font-bold bg-[#f5a81e] hover:bg-[#ffba3b]"
          >
            + MOUNT KOLA
          </button>
          <button
            type="button"
            onClick={handleOptimize}
            disabled={optimizing}
            className="thenga-pixel-btn px-2 py-1 text-[10px] font-bold bg-white hover:bg-[#fffdf6] disabled:opacity-40"
          >
            {optimizing ? "OPTIMIZING..." : "OPTIMIZE"}
          </button>
        </div>
      </div>

      {/* Optimization Notice if active */}
      {optimizeMessage && (
        <div className="px-3 py-1.5 bg-[#2b9e38] text-white border-b-2 border-[#191008] text-[11px] font-bold">
          {optimizeMessage}
        </div>
      )}

      {/* Main Inventory Workspace */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        <div className="flex items-center justify-between text-[11px] text-[#6b4728] border-b border-[#d8c593] pb-1">
          <span className="font-bold">ACTIVE CLUSTERS: {kolas.length}</span>
          <span>SYNC: TERMINAL &amp; CANOPY LIVE</span>
        </div>

        {kolas.length === 0 ? (
          <div className="border-2 border-dashed border-[#191008]/40 p-8 text-center bg-white/60 space-y-2">
            <div className="flex justify-center">
              <PixelCoconut state="sitting" size={40} />
            </div>
            <div className="font-bold text-[#191008] text-xs">
              NO ACTIVE KOLAS IN CANOPY
            </div>
            <p className="text-[11px] text-[#6b4728] max-w-xs mx-auto">
              Run <code className="text-[#2b9e38] bg-[#ecdba8] px-1 font-bold">thenga-kola</code> in Terminal or click &ldquo;+ MOUNT KOLA&rdquo; above.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {kolas.map((k) => (
              <div
                key={k.id}
                className="thenga-pixel-frame-sm p-2.5 bg-white space-y-2 select-none"
              >
                {/* Kola Slot Title Bar */}
                <div className="flex items-center justify-between border-b border-[#191008] pb-1">
                  <span className="font-bold text-xs text-[#2b9e38]">{k.id.toUpperCase()}</span>
                  <span className="bg-[#ecdba8] border border-[#191008] text-[9px] font-bold px-1.5 py-0.2">
                    {k.status}
                  </span>
                </div>

                {/* Bunch Visualization (Cluster of pixel coconuts) */}
                <div className="flex items-center gap-1 py-1 border border-[#d8c593] bg-[#fdf7e7] p-1.5 overflow-x-auto">
                  {Array.from({ length: Math.min(k.bunchCount, 8) }).map((_, idx) => (
                    <PixelCoconut key={idx} state="sitting" size={20} />
                  ))}
                  {k.bunchCount > 8 && (
                    <span className="text-[10px] font-bold text-[#6b4728]">
                      +{k.bunchCount - 8}
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-1 text-[10px] text-[#543015]">
                  <div>
                    <span className="text-[#6b4728]">BUNCH:</span>{" "}
                    <span className="font-bold">{k.bunchCount} coconuts</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[#6b4728]">TIME:</span> {k.createdAt}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-2 bg-[#ecdba8] border-t-2 border-[#191008] flex items-center justify-between text-[10px] text-[#6b4728]">
        <span>Electrolyte Buffer: 100% Brix</span>
        <span>Stalk Layer 4</span>
      </div>
    </div>
  );
}
