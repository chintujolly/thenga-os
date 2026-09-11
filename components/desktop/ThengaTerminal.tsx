"use client";

import React, { useState, useRef, useEffect } from "react";
import { useThengaStore } from "@/store/useThengaStore";

interface HistoryEntry {
  command?: string;
  output: React.ReactNode;
}

const INITIAL_OUTPUT: HistoryEntry[] = [
  {
    output: (
      <div className="space-y-1 mb-2">
        <div className="text-amber-300 font-bold">
          🥥 THENGA TERMINAL [Version 0.1-coconut]
        </div>
        <div className="text-amber-200/70 text-xs">
          (c) 2026 THENGA OS Foundation. All organic rights reserved.
        </div>
        <div className="text-amber-400/80 text-xs">
          Type <span className="text-emerald-300 font-bold">&apos;help&apos;</span> to view available coconut commands.
        </div>
      </div>
    ),
  },
];

export default function ThengaTerminal() {
  const [history, setHistory] = useState<HistoryEntry[]>(INITIAL_OUTPUT);
  const [inputVal, setInputVal] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const createKola = useThengaStore((state) => state.createKola);
  const kolas = useThengaStore((state) => state.kolas);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalBottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom whenever history updates
  useEffect(() => {
    terminalBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  // Focus input when clicking anywhere in the terminal container
  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  // Execute terminal command
  const executeCommand = (cmdText: string) => {
    const trimmed = cmdText.trim();

    if (!trimmed) {
      setHistory((prev) => [...prev, { command: "", output: null }]);
      return;
    }

    // Save to command history for arrow-up/down
    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const lower = trimmed.toLowerCase();

    // 1. clear command
    if (lower === "clear") {
      setHistory([]);
      return;
    }

    let outputNode: React.ReactNode = null;

    // 2. help command
    if (lower === "help") {
      outputNode = (
        <div className="space-y-1 text-xs">
          <div className="text-amber-300 font-bold">Available THENGA Commands:</div>
          <div className="grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-1 text-emerald-300/90 pl-2">
            <div><span className="font-bold text-amber-200">help</span></div>
            <div className="text-amber-100/80">List all available commands</div>

            <div><span className="font-bold text-amber-200">clear</span></div>
            <div className="text-amber-100/80">Clear visible terminal output</div>

            <div><span className="font-bold text-amber-200">whoami</span></div>
            <div className="text-amber-100/80">Print current coconut identity</div>

            <div><span className="font-bold text-amber-200">thenga status</span></div>
            <div className="text-amber-100/80">Display simulated THENGA OS status</div>

            <div><span className="font-bold text-amber-200">thenga-kola</span></div>
            <div className="text-amber-100/80">Generate a simulated coconut cluster (Kola)</div>

            <div><span className="font-bold text-amber-200">thurakku</span></div>
            <div className="text-amber-100/80">Simulated &quot;open&quot; command (harmless)</div>

            <div><span className="font-bold text-amber-200">adakku</span></div>
            <div className="text-amber-100/80">Simulated &quot;close&quot; command (harmless)</div>
          </div>
        </div>
      );
    }
    // 3. whoami command
    else if (lower === "whoami") {
      outputNode = (
        <div className="text-amber-200 text-xs">
          chief-thenga-climber (Kernel: Nil, Fiber: 100% Organic)
        </div>
      );
    }
    // 4. thenga status command
    else if (lower === "thenga status") {
      outputNode = (
        <div className="p-2 rounded bg-[#160f0a] border border-[#3b2718] text-xs font-mono space-y-1 text-amber-100">
          <div className="text-amber-300 font-bold flex items-center gap-1">
            <span>🥥 THENGA SYSTEM DIAGNOSTIC</span>
          </div>
          <div className="text-emerald-400">● Architecture: Cocos nucifera (64-fiber)</div>
          <div>● Kernel: Nil (No kernel, purely vegetative state)</div>
          <div>● Active Kolas Clustered: {kolas.length} (live sync with Kola Manager)</div>
          <div>
            ● Juice RAM: 512 MB Tender Water ({kolas.length * 12} MB juiced,{" "}
            {512 - kolas.length * 12} MB available)
          </div>
          <div>
            ● Latest Cluster: {kolas[0] ? `${kolas[0].id} (${kolas[0].bunchCount} coconuts)` : "none yet — run thenga-kola"}
          </div>
          <div>● Husk Integrity: 100% (Weatherproof, salt-tolerant)</div>
          <div>● Tree Canopy Link: PalmLink-5G (Connected, Latency: 1ms)</div>
          <div className="text-emerald-300 font-semibold pt-1">
            Overall Health: 100% Ripe &amp; Thriving.
          </div>
        </div>
      );
    }
    // 5. thenga-kola command
    else if (lower === "thenga-kola") {
      const kola = createKola();

      outputNode = (
        <div className="p-2 rounded bg-[#18120b] border border-amber-600/40 text-xs font-mono space-y-1 text-amber-100">
          <div className="text-emerald-400 font-bold">
            🌴 [KOLA CREATED] Cluster ID: {kola.id}
          </div>
          <div className="text-amber-200">
            🥥 Bunch Count: {kola.bunchCount} fresh tender coconuts clustered
          </div>
          <div className="text-amber-300/80">
            ⚡ Electrolyte Level: 100% Brix natural potassium &amp; hydration
          </div>
          <div className="text-amber-400/70">
            📍 Canopy Attachment: Securely anchored to stalk layer 4
          </div>
          <div className="text-emerald-300 text-[11px] pt-0.5">
            ✓ Kola successfully mounted to palm tree canopy!
          </div>
        </div>
      );
    }
    // 6. thurakku command ("open" in Malayalam) — harmless simulated action
    else if (lower === "thurakku") {
      outputNode = (
        <div className="p-2 rounded bg-[#160f0a] border border-[#3b2718] text-xs font-mono space-y-1 text-amber-100">
          <div className="text-emerald-400 font-bold">
            🥥 THURAKKU — &quot;Open!&quot;
          </div>
          <div>Husk latch released. Canopy hatch swinging open in the breeze.</div>
          <div className="text-amber-300/80 text-[11px]">
            Nothing was actually opened. This coconut just likes the word.
          </div>
        </div>
      );
    }
    // 7. adakku command ("close" in Malayalam) — harmless simulated action
    else if (lower === "adakku") {
      outputNode = (
        <div className="p-2 rounded bg-[#160f0a] border border-[#3b2718] text-xs font-mono space-y-1 text-amber-100">
          <div className="text-amber-300 font-bold">
            🥥 ADAKKU — &quot;Close!&quot;
          </div>
          <div>Husk resealed. Tender water safely locked back in.</div>
          <div className="text-amber-300/80 text-[11px]">
            Nothing was actually closed. There was nothing open to begin with.
          </div>
        </div>
      );
    }
    // Unknown command
    else {
      outputNode = (
        <div className="text-red-400 text-xs font-mono">
          thenga-sh: command not found: &apos;{trimmed}&apos;. Type &apos;help&apos; for coconut commands.
        </div>
      );
    }

    setHistory((prev) => [...prev, { command: trimmed, output: outputNode }]);
  };

  // Handle Enter key and Up/Down history navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(inputVal);
      setInputVal("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;

      const nextIndex =
        historyIndex === -1
          ? commandHistory.length - 1
          : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInputVal(commandHistory[nextIndex] || "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (commandHistory.length === 0 || historyIndex === -1) return;

      const nextIndex = historyIndex + 1;
      if (nextIndex >= commandHistory.length) {
        setHistoryIndex(-1);
        setInputVal("");
      } else {
        setHistoryIndex(nextIndex);
        setInputVal(commandHistory[nextIndex] || "");
      }
    }
  };

  return (
    <div
      onClick={handleContainerClick}
      className="flex flex-col h-full w-full bg-[#0d0905] p-3 font-mono text-xs sm:text-sm text-emerald-400 overflow-y-auto cursor-text select-text"
      role="region"
      aria-label="Interactive Thenga Terminal"
    >
      {/* Output History */}
      <div className="space-y-2">
        {history.map((entry, idx) => (
          <div key={idx} className="space-y-1">
            {entry.command !== undefined && (
              <div className="flex items-center gap-2 text-emerald-400">
                <span className="text-amber-400 font-semibold select-none">
                  thenga@coconut:~$
                </span>
                <span className="text-amber-100">{entry.command}</span>
              </div>
            )}
            {entry.output && <div>{entry.output}</div>}
          </div>
        ))}
      </div>

      {/* Active Input Line */}
      <div className="flex items-center gap-2 mt-2 pt-1 text-emerald-400">
        <span className="text-amber-400 font-semibold select-none shrink-0">
          thenga@coconut:~$
        </span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          spellCheck={false}
          autoComplete="off"
          className="flex-1 bg-transparent border-none outline-none text-emerald-300 font-mono text-xs sm:text-sm caret-emerald-400 p-0 m-0 focus:ring-0"
        />
      </div>

      <div ref={terminalBottomRef} />
    </div>
  );
}
