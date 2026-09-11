"use client";

import React, { useEffect, useState } from "react";
import { useThengaStore, ThengaFile } from "@/store/useThengaStore";
import VirusEventDialog from "./VirusEventDialog";
import PixelCoconut from "./PixelCoconut";
import { sound } from "@/utils/sound";

const VIRUS_FILE_ID = "not-a-virus";

// Bespoke pixel file icon sprite
function PixelFileSprite({ kind }: { kind: ThengaFile["kind"] }) {
  const INK = "#191008";

  if (kind === "thg") {
    return <PixelCoconut state="sitting" size={26} />;
  }

  if (kind === "pdf") {
    return (
      <svg width="26" height="26" viewBox="0 0 16 16" shapeRendering="crispEdges">
        <path d="M 2 1 L 10 1 L 14 5 L 14 15 L 2 15 Z" fill={INK} />
        <rect x={3} y={2} width={7} height={12} fill="#fdf7e7" />
        <rect x={10} y={5} width={3} height={9} fill="#fdf7e7" />
        <polygon points="10,1 14,5 10,5" fill="#d8c593" />
        {/* Red PDF banner */}
        <rect x={4} y={6} width={8} height={4} fill="#c93b2b" />
        <rect x={5} y={7} width={6} height={2} fill="#ffffff" />
      </svg>
    );
  }

  // txt file
  return (
    <svg width="26" height="26" viewBox="0 0 16 16" shapeRendering="crispEdges">
      <path d="M 2 1 L 10 1 L 14 5 L 14 15 L 2 15 Z" fill={INK} />
      <rect x={3} y={2} width={7} height={12} fill="#fdf7e7" />
      <rect x={10} y={5} width={3} height={9} fill="#fdf7e7" />
      <polygon points="10,1 14,5 10,5" fill="#d8c593" />
      <rect x={4} y={5} width={6} height={1} fill="#543015" />
      <rect x={4} y={7} width={7} height={1} fill="#543015" />
      <rect x={4} y={9} width={5} height={1} fill="#543015" />
      <rect x={4} y={11} width={6} height={1} fill="#543015" />
    </svg>
  );
}

export default function ThengaExplorer() {
  const files = useThengaStore((state) => state.files);
  const openedFileId = useThengaStore((state) => state.openedFileId);
  const openFile = useThengaStore((state) => state.openFile);
  const closeFile = useThengaStore((state) => state.closeFile);

  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => closeFile, [closeFile]);

  const openedFile = files.find((f) => f.id === openedFileId) ?? null;

  return (
    <div className="relative flex flex-col h-full bg-[#fdf7e7] text-[#191008] select-none font-mono text-xs">
      {/* Directory Address Bar */}
      <div className="p-2 bg-[#ecdba8] border-b-2 border-[#191008] flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <button
            type="button"
            className="w-5 h-5 border border-[#191008] bg-[#fdf7e7] flex items-center justify-center font-bold text-[10px] shadow-[1px_1px_0_#191008] cursor-pointer"
            onClick={() => sound.playClick()}
          >
            ←
          </button>
          <button
            type="button"
            className="w-5 h-5 border border-[#191008] bg-[#fdf7e7] flex items-center justify-center font-bold text-[10px] shadow-[1px_1px_0_#191008] cursor-pointer"
            onClick={() => sound.playClick()}
          >
            →
          </button>
          <div className="flex-1 flex items-center border border-[#191008] bg-white px-2 py-0.5 text-[11px] shadow-[inset_1px_1px_0_rgba(0,0,0,0.1)]">
            <span className="text-[#6b4728] mr-1">📁</span>
            <span className="truncate">C:\KERALA\CANOPY\FIBER_VFS\</span>
          </div>
        </div>
        <span className="bg-[#2b9e38] text-white px-1.5 py-0.2 border border-[#191008] text-[9px] font-bold hidden sm:inline">
          MOUNTED
        </span>
      </div>

      {/* File Grid */}
      <div className="flex-1 p-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 overflow-y-auto content-start">
        {files.map((file) => {
          const isSelected = selectedId === file.id;
          return (
            <div
              key={file.id}
              onClick={() => {
                sound.playClick();
                setSelectedId(file.id);
              }}
              onDoubleClick={() => {
                sound.playClick();
                openFile(file.id);
              }}
              title={`Double click to open ${file.name}`}
              className={`thenga-pixel-btn flex flex-col items-center justify-center p-2.5 text-center cursor-pointer select-none group ${
                isSelected ? "bg-[#f5a81e] border-2 border-[#191008]" : "bg-white hover:bg-[#fffdf6]"
              }`}
            >
              <div className="group-hover:scale-110 transition-transform mb-1">
                <PixelFileSprite kind={file.kind} />
              </div>
              <span className="text-[11px] font-bold text-[#191008] truncate w-full">
                {file.name}
              </span>
              <span className="text-[9px] text-[#6b4728]">{file.size}</span>
            </div>
          );
        })}
      </div>

      {/* Retro Status Bar */}
      <div className="px-3 py-1 bg-[#ecdba8] border-t-2 border-[#191008] flex justify-between text-[10px] text-[#6b4728]">
        <span>{files.length} items (0 directories)</span>
        <span>Storage: 512 MB Coconut Juice RAM</span>
      </div>

      {/* Simulated File Dialog */}
      {openedFile?.id === VIRUS_FILE_ID && (
        <div className="absolute inset-0 z-20 flex items-center justify-center p-4 bg-black/40">
          <VirusEventDialog onClose={closeFile} />
        </div>
      )}

      {openedFile && openedFile.id !== VIRUS_FILE_ID && (
        <div className="absolute inset-0 z-20 flex items-center justify-center p-4 bg-black/40">
          <div className="thenga-window-in thenga-pixel-frame w-full max-w-sm bg-[#fdf7e7] text-[#191008] font-mono shadow-[6px_6px_0_#191008]">
            {/* Title bar */}
            <div className="flex items-center justify-between px-3 py-1.5 border-b-2 border-[#191008] bg-[#f5a81e] font-bold text-[11px]">
              <span className="truncate">{openedFile.dialogTitle}</span>
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  closeFile();
                }}
                className="w-4 h-4 border border-[#191008] bg-[#fdf7e7] hover:bg-[#c93b2b] hover:text-white flex items-center justify-center text-[9px] cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Dialog Content */}
            <div className="p-3.5 space-y-2 text-xs leading-relaxed">
              <div className="font-bold text-[#191008] flex items-center gap-1.5">
                <PixelFileSprite kind={openedFile.kind} />
                <span>{openedFile.name}</span>
              </div>

              {/* Special reaction for dont_open_this.txt */}
              {openedFile.name === "dont_open_this.txt" && (
                <div className="p-2 bg-[#f8e5bd] border border-[#191008] font-bold text-[#c93b2b] text-center">
                  &ldquo;Vere pani nokk.&rdquo;
                </div>
              )}

              {openedFile.dialogLines.map((line, idx) => (
                <p key={idx} className="text-[#38210f]">{line}</p>
              ))}

              {openedFile.footnote && (
                <p className="pt-1.5 text-[10px] text-[#6b4728] italic border-t border-[#d8c593]">
                  {openedFile.footnote}
                </p>
              )}
            </div>

            {/* Dialog Footer */}
            <div className="p-2.5 bg-[#ecdba8] border-t-2 border-[#191008] flex justify-end">
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  closeFile();
                }}
                className="thenga-pixel-btn px-4 py-1 text-xs font-bold bg-[#fdf7e7]"
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
