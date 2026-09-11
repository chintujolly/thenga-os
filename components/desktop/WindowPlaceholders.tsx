"use client";

import { Terminal, FolderTree, Activity, Trash2, FileText, Folder, File, Cpu, HardDrive } from "lucide-react";
import { WindowId } from "@/types/window";
import ThengaTerminal from "./ThengaTerminal";
import KolaManager from "./KolaManager";
import ThengaExplorer from "./ThengaExplorer";

export function TerminalPlaceholder() {
  return (
    <div className="flex flex-col h-full bg-[#0d0905] p-4 font-mono text-xs sm:text-sm text-emerald-400 select-text overflow-y-auto">
      <div className="text-amber-300 font-bold mb-2">
        🥥 THENGA TERMINAL [Version 0.1-coconut]
      </div>
      <div className="text-amber-200/70 mb-4 text-xs">
        (c) 2026 THENGA OS Foundation. All organic rights reserved.
        <br />
        Type &apos;help&apos; for a list of nonexistent commands. No kernel detected.
      </div>
      <div className="space-y-1 text-emerald-300/90 text-xs">
        <div>thenga@coconut:~$ whoami</div>
        <div className="text-amber-200">chief-thenga-climber</div>
        <div className="pt-2">thenga@coconut:~$ uname -a</div>
        <div className="text-amber-200">
          ThengaOS 0.1-fiber Cocos_nucifera Malabar_Coast GNU/Coconut
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2 text-emerald-400 font-mono text-xs">
        <span>thenga@coconut:~$</span>
        <span className="inline-block w-2 h-4 bg-emerald-400 animate-pulse" />
      </div>
      <div className="mt-auto pt-4 text-[11px] text-amber-500/40 border-t border-amber-900/30">
        * Interactive command execution engine will connect in upcoming Terminal milestone.
      </div>
    </div>
  );
}

export function ExplorerPlaceholder() {
  const mockItems = [
    { name: "husk_files", type: "folder", size: "--" },
    { name: "tender_water", type: "folder", size: "--" },
    { name: "copra_dry_store", type: "folder", size: "--" },
    { name: "secret_coconut_oil.the", type: "file", size: "24 KB" },
    { name: "tree_climbing_manual.txt", type: "file", size: "4 KB" },
    { name: "recipe_chutney.doc", type: "file", size: "12 KB" },
  ];

  return (
    <div className="flex flex-col h-full bg-[#120d09] text-amber-100 select-none text-xs">
      {/* Explorer Top Toolbar */}
      <div className="p-2.5 bg-[#1a120b] border-b border-[#3b291a] flex items-center gap-2 text-amber-300 font-mono">
        <FolderTree className="w-4 h-4 text-amber-400" />
        <span className="font-bold">THENGA EXPLORER</span>
        <span className="text-amber-600">/</span>
        <span className="bg-[#2a1d12] px-2 py-0.5 rounded text-amber-200 text-[11px]">
          /root/coconut_tree/canopy
        </span>
      </div>

      {/* Explorer Grid */}
      <div className="flex-1 p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 overflow-y-auto">
        {mockItems.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center p-3 rounded-xl bg-[#1b130c]/70 hover:bg-[#281b11] border border-[#3e2b1c] hover:border-amber-500/40 transition-colors text-center cursor-default group"
          >
            {item.type === "folder" ? (
              <Folder className="w-8 h-8 text-amber-400 group-hover:scale-105 transition-transform" />
            ) : (
              <File className="w-8 h-8 text-emerald-400 group-hover:scale-105 transition-transform" />
            )}
            <span className="mt-2 text-[11px] font-medium text-amber-100 truncate w-full">
              {item.name}
            </span>
            <span className="text-[9px] text-amber-400/50 font-mono">
              {item.size}
            </span>
          </div>
        ))}
      </div>

      {/* Status Bar */}
      <div className="px-3 py-1.5 bg-[#170f0a] border-t border-[#3b291a] flex justify-between text-[10px] font-mono text-amber-400/60">
        <span>6 items (4 folders, 2 files)</span>
        <span>Storage: 512 MB Coconut RAM remaining</span>
      </div>
    </div>
  );
}

export function KolaManagerPlaceholder() {
  const mockProcesses = [
    { pid: 101, name: "thenga-kernel-null", cpu: "0.1%", memory: "12 MB", status: "Root" },
    { pid: 204, name: "tender-water-pump", cpu: "2.4%", memory: "45 MB", status: "Juicing" },
    { pid: 318, name: "fiber-integrity-daemon", cpu: "0.8%", memory: "18 MB", status: "Weaving" },
    { pid: 412, name: "copra-sun-basking", cpu: "0.0%", memory: "8 MB", status: "Drying" },
    { pid: 509, name: "gravity-drop-sensor", cpu: "1.1%", memory: "22 MB", status: "Armed" },
  ];

  return (
    <div className="flex flex-col h-full bg-[#110c08] text-amber-100 select-none text-xs font-mono">
      {/* Header Bar */}
      <div className="p-3 bg-[#1c130b] border-b border-[#422e1e] flex items-center justify-between">
        <div className="flex items-center gap-2 text-amber-300 font-bold">
          <Activity className="w-4 h-4 text-emerald-400" />
          <span>KOLA MANAGER</span>
        </div>
        <span className="text-[10px] text-emerald-300 bg-emerald-950 border border-emerald-500/40 px-2 py-0.5 rounded">
          Cluster Health: 100%
        </span>
      </div>

      {/* Hardware meters */}
      <div className="grid grid-cols-2 gap-3 p-3 bg-[#160f09] border-b border-[#362518]">
        <div className="p-2 rounded-lg bg-[#20150d] border border-[#3d2b1b]">
          <div className="flex items-center justify-between text-[11px] text-amber-300 mb-1">
            <span className="flex items-center gap-1">
              <Cpu className="w-3 h-3 text-amber-400" /> CPU Load
            </span>
            <span className="text-emerald-400">4.4%</span>
          </div>
          <div className="w-full bg-[#100a06] h-2 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full w-[4.4%]" />
          </div>
        </div>

        <div className="p-2 rounded-lg bg-[#20150d] border border-[#3d2b1b]">
          <div className="flex items-center justify-between text-[11px] text-amber-300 mb-1">
            <span className="flex items-center gap-1">
              <HardDrive className="w-3 h-3 text-amber-400" /> Tender RAM
            </span>
            <span className="text-amber-200">105 MB / 512 MB</span>
          </div>
          <div className="w-full bg-[#100a06] h-2 rounded-full overflow-hidden">
            <div className="bg-amber-500 h-full w-[20%]" />
          </div>
        </div>
      </div>

      {/* Process Table */}
      <div className="flex-1 p-3 overflow-y-auto">
        <table className="w-full text-left text-[11px]">
          <thead>
            <tr className="text-amber-400/60 border-b border-[#362518] pb-1">
              <th className="pb-1">PID</th>
              <th className="pb-1">Process</th>
              <th className="pb-1">CPU</th>
              <th className="pb-1">Juice RAM</th>
              <th className="pb-1">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#26190f]">
            {mockProcesses.map((proc) => (
              <tr key={proc.pid} className="hover:bg-white/5 text-amber-200/90">
                <td className="py-1.5 text-amber-400/60">{proc.pid}</td>
                <td className="py-1.5 font-medium text-amber-100">{proc.name}</td>
                <td className="py-1.5 text-emerald-400">{proc.cpu}</td>
                <td className="py-1.5">{proc.memory}</td>
                <td className="py-1.5 text-amber-300">{proc.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function CopraBinPlaceholder() {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-[#0f0a06] p-6 text-center text-amber-200/90 select-none">
      <div className="w-16 h-16 rounded-2xl bg-[#1d130b] border border-[#483320] flex items-center justify-center mb-3 shadow-inner text-amber-400">
        <Trash2 className="w-8 h-8 text-amber-400/80" />
      </div>
      <h3 className="text-base font-bold font-mono text-amber-100">
        COPRA BIN
      </h3>
      <p className="text-xs text-amber-300/60 font-mono mt-1 max-w-xs">
        Recycle Bin for dehydrated coconut husks &amp; discarded shells.
      </p>
      <div className="mt-4 px-3 py-1.5 rounded-lg bg-[#1a1109] border border-[#3b2717] text-[11px] font-mono text-amber-400/70">
        Status: 0 items • 0 KB Copra Waste
      </div>
    </div>
  );
}

export function ReadmePlaceholder() {
  return (
    <div className="flex flex-col h-full bg-[#120d08] p-4 text-xs font-mono text-amber-200/90 overflow-y-auto leading-relaxed select-text">
      <div className="flex items-center gap-2 text-amber-300 font-bold border-b border-[#362518] pb-2 mb-3">
        <FileText className="w-4 h-4" />
        <span>README.the</span>
      </div>
      <p className="font-semibold text-amber-100 mb-2"># THENGA OS</p>
      <p className="mb-2">
        THENGA OS is a browser-based interactive operating system simulation for a coconut.
      </p>
      <p className="mb-2 text-amber-300/80">
        The project is intentionally useless: coconuts do not need an operating system.
      </p>
      <p className="mb-2">
        Important: This is NOT a real operating system or kernel. It is an application-level
        simulation running in the browser.
      </p>
      <div className="mt-4 p-2.5 rounded bg-[#1c130b] border border-[#3d2a1b] text-emerald-400 text-[11px]">
        🥥 Rule #1: No real kernel. Just fiber.
      </div>
    </div>
  );
}

export function WindowPlaceholderContent({ id }: { id: WindowId }) {
  switch (id) {
    case "terminal":
      return <ThengaTerminal />;
    case "explorer":
      return <ThengaExplorer />;
    case "kola-manager":
      return <KolaManager />;
    case "bin":
      return <CopraBinPlaceholder />;
    case "readme":
      return <ReadmePlaceholder />;
    default:
      return (
        <div className="p-4 font-mono text-xs text-amber-100">
          Application {id} initialized.
        </div>
      );
  }
}
