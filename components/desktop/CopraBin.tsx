"use client";

import { useRef, useState } from "react";
import { Trash2, RotateCcw, Sparkles, Ban } from "lucide-react";
import { useThengaStore } from "@/store/useThengaStore";

// Funny empty-bin lines, picked once per mount
const EMPTY_MESSAGES = [
  "Copra Bin is empty.",
  "Nothing here. Much like the coconut's contribution to computing.",
  "Zero waste. The husk is proud.",
  "Empty. Even the fibers moved on.",
];

export default function CopraBin() {
  const binItems = useThengaStore((state) => state.binItems);
  const deleteSimulatedItem = useThengaStore((state) => state.deleteSimulatedItem);
  const restoreBinItem = useThengaStore((state) => state.restoreBinItem);
  const emptyBin = useThengaStore((state) => state.emptyBin);

  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [emptyMessage] = useState(
    () => EMPTY_MESSAGES[Math.floor(Math.random() * EMPTY_MESSAGES.length)]
  );
  const statusTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showStatus = (msg: string, ms = 2200) => {
    if (statusTimerRef.current) clearTimeout(statusTimerRef.current);
    setStatusMessage(msg);
    statusTimerRef.current = setTimeout(() => setStatusMessage(null), ms);
  };

  // Adds a harmless simulated item — no real file is ever touched.
  const handleDelete = () => {
    const item = deleteSimulatedItem();
    showStatus(`🥥 "${item.name}" moved to Copra Bin.`);
  };

  const handleRestore = (id: string, name: string) => {
    showStatus("Restoring coconut...", 4000);
    setTimeout(() => {
      restoreBinItem(id);
      showStatus(`Coconut successfully returned to society. 🥥 (${name})`);
    }, 600);
  };

  const handleEmpty = () => {
    if (binItems.length === 0) return;
    emptyBin();
    showStatus("Copra Bin emptied. The husk feels lighter.");
  };

  return (
    <div className="flex flex-col h-full bg-[#110c08] text-amber-100 select-none text-xs font-mono">
      {/* Header Bar */}
      <div className="p-3 bg-[#1c130b] border-b border-[#422e1e] flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2 text-amber-300 font-bold">
          <Trash2 className="w-4 h-4 text-amber-400" />
          <span>COPRA BIN</span>
        </div>
        <span className="text-[10px] text-amber-300 bg-amber-950/80 border border-amber-500/40 px-2 py-0.5 rounded">
          {binItems.length} item{binItems.length === 1 ? "" : "s"}
        </span>
      </div>

      {/* Toolbar */}
      <div className="p-2.5 bg-[#170f0a] border-b border-[#382618] flex items-center gap-2 flex-wrap">
        <button
          type="button"
          onClick={handleDelete}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#241709] border border-amber-600/50 text-amber-200 hover:bg-[#2f1e0d] hover:text-amber-100 transition-colors cursor-pointer text-[11px]"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Delete a Coconut
        </button>
        <button
          type="button"
          onClick={handleEmpty}
          disabled={binItems.length === 0}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#241010] border border-red-700/50 text-red-300 hover:bg-[#301414] hover:text-red-200 transition-colors cursor-pointer text-[11px] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#241010] disabled:hover:text-red-300"
        >
          <Ban className="w-3.5 h-3.5" />
          Empty Bin
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-3">
        {binItems.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center gap-2 p-4">
            <Sparkles className="w-6 h-6 text-amber-400/40" />
            <p className="text-[12px] font-semibold text-amber-200/80">{emptyMessage}</p>
            <p className="text-[10px] text-amber-400/50 max-w-[220px]">
              Delete a coconut above to see how this works.
            </p>
          </div>
        ) : (
          <div className="border border-[#382618] rounded-xl overflow-hidden bg-[#160f09]">
            <table className="w-full text-left text-[11px]">
              <thead>
                <tr className="bg-[#20150d] text-amber-400/70 border-b border-[#382618]">
                  <th className="py-1.5 px-2.5 font-semibold">Item</th>
                  <th className="py-1.5 px-2 font-semibold">Size</th>
                  <th className="py-1.5 px-2 font-semibold">Deleted</th>
                  <th className="py-1.5 px-2 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#26190f]">
                {binItems.map((item) => (
                  <tr key={item.id} className="hover:bg-white/5 text-amber-100 transition-colors">
                    <td className="py-1.5 px-2.5 font-medium truncate max-w-[160px]">
                      🥥 {item.name}
                    </td>
                    <td className="py-1.5 px-2 text-amber-300/80">{item.size}</td>
                    <td className="py-1.5 px-2 text-amber-400/60 text-[10px]">
                      {item.deletedAt}
                    </td>
                    <td className="py-1.5 px-2 text-right">
                      <button
                        type="button"
                        onClick={() => handleRestore(item.id, item.name)}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-950 hover:text-emerald-200 transition-colors cursor-pointer text-[10px]"
                      >
                        <RotateCcw className="w-3 h-3" />
                        Restore
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="px-3 py-1.5 bg-[#170f0a] border-t border-[#3b291a] flex items-center justify-between gap-2 text-[10px] font-mono text-amber-400/60 min-h-[26px]">
        <span className="shrink-0">Storage: 512 MB Coconut RAM remaining</span>
        {statusMessage && (
          <span className="text-amber-200 truncate">{statusMessage}</span>
        )}
      </div>
    </div>
  );
}
