"use client";

import { useEffect, useState } from "react";
import {
  FolderTree,
  File,
  FileText,
  FileWarning,
  Info,
  ShieldAlert,
  X,
} from "lucide-react";
import { useThengaStore, ThengaFile } from "@/store/useThengaStore";

// Icon per simulated file kind (visual only)
function FileIcon({ file }: { file: ThengaFile }) {
  if (file.tone === "error") {
    return <FileWarning className="w-8 h-8 text-red-400 group-hover:scale-105 transition-transform" />;
  }
  if (file.kind === "txt" || file.kind === "pdf") {
    return <FileText className="w-8 h-8 text-amber-300 group-hover:scale-105 transition-transform" />;
  }
  return <File className="w-8 h-8 text-emerald-400 group-hover:scale-105 transition-transform" />;
}

// Colour set for the simulated dialog, matching the OS palette
const TONE_STYLES = {
  info: {
    border: "border-emerald-500/40",
    header: "bg-emerald-950/60 text-emerald-300 border-emerald-500/30",
    accent: "text-emerald-300",
  },
  warning: {
    border: "border-amber-500/50",
    header: "bg-amber-950/70 text-amber-200 border-amber-500/30",
    accent: "text-amber-300",
  },
  error: {
    border: "border-red-500/50",
    header: "bg-red-950/70 text-red-200 border-red-500/30",
    accent: "text-red-300",
  },
} as const;

export default function ThengaExplorer() {
  const files = useThengaStore((state) => state.files);
  const openedFileId = useThengaStore((state) => state.openedFileId);
  const openFile = useThengaStore((state) => state.openFile);
  const closeFile = useThengaStore((state) => state.closeFile);

  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Dialog state lives in the shared store, so drop it when Explorer closes
  useEffect(() => closeFile, [closeFile]);

  const openedFile = files.find((f) => f.id === openedFileId) ?? null;
  const tone = openedFile ? TONE_STYLES[openedFile.tone] : TONE_STYLES.info;

  return (
    <div className="relative flex flex-col h-full bg-[#120d09] text-amber-100 select-none text-xs">
      {/* Explorer Top Toolbar */}
      <div className="p-2.5 bg-[#1a120b] border-b border-[#3b291a] flex items-center gap-2 text-amber-300 font-mono">
        <FolderTree className="w-4 h-4 text-amber-400" />
        <span className="font-bold">THENGA EXPLORER</span>
        <span className="text-amber-600">/</span>
        <span className="bg-[#2a1d12] px-2 py-0.5 rounded text-amber-200 text-[11px]">
          /root/coconut_tree/canopy
        </span>
      </div>

      {/* File Grid */}
      <div className="flex-1 p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 overflow-y-auto content-start">
        {files.map((file) => {
          const isSelected = selectedId === file.id;
          return (
            <button
              key={file.id}
              type="button"
              onClick={() => setSelectedId(file.id)}
              onDoubleClick={() => openFile(file.id)}
              title={`Double-click to open ${file.name}`}
              className={`flex flex-col items-center p-3 rounded-xl border transition-colors text-center cursor-pointer group ${
                isSelected
                  ? "bg-amber-500/15 border-amber-500/60"
                  : "bg-[#1b130c]/70 hover:bg-[#281b11] border-[#3e2b1c] hover:border-amber-500/40"
              }`}
            >
              <FileIcon file={file} />
              <span className="mt-2 text-[11px] font-medium text-amber-100 truncate w-full">
                {file.name}
              </span>
              <span className="text-[9px] text-amber-400/50 font-mono">
                {file.size}
              </span>
            </button>
          );
        })}
      </div>

      {/* Status Bar */}
      <div className="px-3 py-1.5 bg-[#170f0a] border-t border-[#3b291a] flex justify-between text-[10px] font-mono text-amber-400/60">
        <span>
          {files.length} items (0 folders, {files.length} files) • simulated
        </span>
        <span>Storage: 512 MB Coconut RAM remaining</span>
      </div>

      {/* Simulated File Dialog (stays inside the Explorer window) */}
      {openedFile && (
        <div className="absolute inset-0 z-10 flex items-center justify-center p-4 bg-black/60 backdrop-blur-[2px]">
          <div
            className={`w-full max-w-sm rounded-xl bg-[#140e08] border ${tone.border} shadow-[0_16px_36px_rgba(0,0,0,0.7)] overflow-hidden font-mono`}
          >
            {/* Dialog title bar */}
            <div
              className={`flex items-center justify-between px-3 py-2 border-b ${tone.header}`}
            >
              <div className="flex items-center gap-2 text-[11px] font-bold tracking-wide">
                {openedFile.tone === "error" ? (
                  <ShieldAlert className="w-3.5 h-3.5" />
                ) : (
                  <Info className="w-3.5 h-3.5" />
                )}
                <span className="truncate">{openedFile.dialogTitle}</span>
              </div>
              <button
                type="button"
                onClick={closeFile}
                title="Dismiss"
                aria-label="Dismiss"
                className="w-5 h-5 rounded flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Dialog body */}
            <div className="p-3.5 space-y-2 text-[11px] text-amber-100/90 leading-relaxed">
              <div className={`font-bold ${tone.accent}`}>
                🥥 {openedFile.name}
              </div>
              {openedFile.dialogLines.map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
              {openedFile.footnote && (
                <p className="pt-1 text-[10px] text-amber-400/50 italic border-t border-[#2e2014]">
                  {openedFile.footnote}
                </p>
              )}
            </div>

            {/* Dialog footer */}
            <div className="px-3.5 py-2.5 bg-[#180f09] border-t border-[#2e2014] flex justify-end">
              <button
                type="button"
                onClick={closeFile}
                className="px-3 py-1 rounded-lg bg-[#241709] border border-amber-600/50 text-[11px] text-amber-200 hover:bg-[#2f1e0d] hover:text-amber-100 transition-colors cursor-pointer"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
