"use client";

import React, { useState } from "react";
import { useThengaStore } from "@/store/useThengaStore";
import PixelCoconut from "./PixelCoconut";
import { sound } from "@/utils/sound";

export default function CopraBin() {
  const binItems = useThengaStore((state) => state.binItems);
  const deleteSimulatedItem = useThengaStore((state) => state.deleteSimulatedItem);
  const restoreBinItem = useThengaStore((state) => state.restoreBinItem);
  const emptyBin = useThengaStore((state) => state.emptyBin);

  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleDelete = () => {
    sound.playClick();
    const item = deleteSimulatedItem();
    setStatusMessage(`"${item.name}" moved to Copra Bin.`);
  };

  const handleRestore = (id: string) => {
    sound.playChirp();
    setStatusMessage("Restoring coconut...");
    setTimeout(() => {
      restoreBinItem(id);
      setStatusMessage("Coconut successfully returned to society. 🥥");
    }, 600);
  };

  const handleEmpty = () => {
    sound.playClick();
    if (binItems.length === 0) {
      setStatusMessage("Onnum illa.");
      return;
    }
    emptyBin();
    setStatusMessage("Copra Bin emptied. The husk feels lighter.");
  };

  return (
    <div className="flex flex-col h-full bg-[#fdf7e7] text-[#191008] select-none font-mono text-xs">
      {/* Action Toolbar */}
      <div className="p-2.5 bg-[#ecdba8] border-b-2 border-[#191008] flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="text-sm">🗑</span>
          <span className="font-bold text-[11px] uppercase tracking-wider">
            COPRA RECYCLING BIN
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleDelete}
            className="thenga-pixel-btn px-2.5 py-1 text-[11px] font-bold bg-[#f5a81e] hover:bg-[#ffba3b]"
          >
            + DELETE A COCONUT
          </button>
          <button
            type="button"
            onClick={handleEmpty}
            className="thenga-pixel-btn px-2.5 py-1 text-[11px] font-bold bg-[#c93b2b] text-white hover:bg-[#dc4635]"
          >
            EMPTY BIN
          </button>
        </div>
      </div>

      {/* Status Bar Notification */}
      {statusMessage && (
        <div className="px-3 py-1 bg-[#2b9e38] text-white border-b-2 border-[#191008] text-[11px] font-bold flex justify-between items-center">
          <span>{statusMessage}</span>
          <button
            type="button"
            onClick={() => setStatusMessage(null)}
            className="text-white hover:text-black text-xs font-bold"
          >
            ✕
          </button>
        </div>
      )}

      {/* Bin Items List */}
      <div className="flex-1 overflow-y-auto p-3">
        {binItems.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-2">
            <PixelCoconut state="cracked" size={44} />
            <div className="font-bold text-[#191008] text-xs">
              Onnum illa.
            </div>
            <p className="text-[11px] text-[#6b4728] max-w-xs">
              Copra Bin is currently empty. Discarded coconut fibers will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-1.5">
            {binItems.map((item) => (
              <div
                key={item.id}
                className="thenga-pixel-frame-sm p-2 bg-white flex items-center justify-between gap-2"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <PixelCoconut state="cracked" size={20} />
                  <div className="min-w-0">
                    <div className="font-bold text-xs truncate text-[#191008]">
                      {item.name}
                    </div>
                    <div className="text-[10px] text-[#6b4728]">
                      {item.size} • {item.deletedAt}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleRestore(item.id)}
                    className="thenga-pixel-btn px-2 py-0.5 text-[10px] font-bold bg-[#2b9e38] text-white hover:bg-[#34b542]"
                  >
                    RESTORE
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-2 bg-[#ecdba8] border-t-2 border-[#191008] flex justify-between text-[10px] text-[#6b4728]">
        <span>{binItems.length} discarded items</span>
        <span>Organic Copra Composting Active</span>
      </div>
    </div>
  );
}
