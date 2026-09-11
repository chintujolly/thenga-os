"use client";

import React, { useState, useRef, useEffect } from "react";
import { useThengaStore } from "@/store/useThengaStore";
import { sound } from "@/utils/sound";

interface HistoryEntry {
  command?: string;
  output: React.ReactNode;
}

const INITIAL_OUTPUT: HistoryEntry[] = [
  {
    output: (
      <div className="space-y-1 mb-2 font-mono">
        <div className="text-[#f8b824] font-bold text-xs tracking-wider">
          THENGA TERMINAL [Version 0.1-fiber]
        </div>
        <div className="text-[#3de865]/70 text-[11px]">
          (c) 2026 THENGA OS Foundation. All organic rights reserved.
        </div>
        <div className="text-[#3de865]/90 text-[11px] pt-1">
          Type <span className="text-[#f8b824] font-bold">&apos;help&apos;</span> to view available coconut commands.
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
  const invalidRepeatRef = useRef<{ cmd: string; count: number }>({ cmd: "", count: 0 });

  useEffect(() => {
    terminalBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  const executeCommand = (cmdText: string) => {
    const trimmed = cmdText.trim();

    if (!trimmed) {
      setHistory((prev) => [...prev, { command: "", output: null }]);
      return;
    }

    sound.playClick();
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
        <div className="space-y-1 text-[11px] font-mono">
          <div className="text-[#f8b824] font-bold">AVAILABLE THENGA COMMANDS:</div>
          <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-x-2 gap-y-1 text-[#3de865]/90 pl-1">
            <div><span className="font-bold text-[#f8b824]">help</span></div>
            <div>List all available commands</div>

            <div><span className="font-bold text-[#f8b824]">clear</span></div>
            <div>Clear terminal screen</div>

            <div><span className="font-bold text-[#f8b824]">whoami</span></div>
            <div>Print current coconut identity</div>

            <div><span className="font-bold text-[#f8b824]">thenga status</span></div>
            <div>Display organic system diagnostics</div>

            <div><span className="font-bold text-[#f8b824]">thenga-kola</span></div>
            <div>Mount a new coconut cluster to canopy</div>

            <div><span className="font-bold text-[#f8b824]">thurakku</span></div>
            <div>Simulated open command (&quot;Open!&quot;)</div>

            <div><span className="font-bold text-[#f8b824]">adakku</span></div>
            <div>Simulated close command (&quot;Close!&quot;)</div>

            <div><span className="font-bold text-[#f8b824]">sudo thenga</span></div>
            <div>Request administrative coconut privilege</div>

            <div><span className="font-bold text-[#f8b824]">matrix</span></div>
            <div>Initiate pixel coconut code stream</div>
          </div>
        </div>
      );
    }
    // 3. whoami
    else if (lower === "whoami") {
      outputNode = (
        <div className="text-[#f8b824] text-xs font-mono">
          chief-thenga-climber (Kernel: Nil, Fiber: 100% Organic)
        </div>
      );
    }
    // 4. thenga status
    else if (lower === "thenga status") {
      outputNode = (
        <div className="p-2.5 border border-[#3b2718] bg-[#120c07] text-[11px] font-mono space-y-1 text-[#3de865]">
          <div className="text-[#f8b824] font-bold">
            [THENGA SYSTEM DIAGNOSTIC]
          </div>
          <div>Architecture: Cocos nucifera (64-fiber)</div>
          <div>Kernel: Nil (No kernel, purely vegetative state)</div>
          <div>Active Kolas: {kolas.length} (synchronized with Kola Manager)</div>
          <div>
            Juice RAM: 512 MB Tender Water ({kolas.length * 12} MB juiced, {Math.max(0, 512 - kolas.length * 12)} MB free)
          </div>
          <div>Husk Integrity: 100% (Weatherproof, pest-resistant)</div>
          <div>Canopy Mesh: PalmLink-5G (Connected, Latency: 1ms)</div>
          <div className="text-[#f8b824] pt-1">
            STATUS: 100% Ripe and Doing Nothing.
          </div>
        </div>
      );
    }
    // 5. thenga-kola
    else if (lower === "thenga-kola") {
      const kola = createKola();
      outputNode = (
        <div className="p-2 border border-[#3b2718] bg-[#120c07] text-[11px] font-mono space-y-1 text-[#3de865]">
          <div className="text-[#f8b824] font-bold">
            [KOLA MOUNTED] Cluster ID: {kola.id}
          </div>
          <div>Bunch Count: {kola.bunchCount} fresh coconuts</div>
          <div>Electrolytes: 100% Brix natural potassium</div>
          <div className="text-[#3de865]/80">
            ✓ Successfully mounted to palm canopy! Check Kola Manager.
          </div>
        </div>
      );
    }
    // 6. thurakku ("open")
    else if (lower === "thurakku") {
      outputNode = (
        <div className="text-xs font-mono space-y-0.5 text-[#3de865]">
          <div className="font-bold text-[#f8b824]">THURAKKU — &quot;Open!&quot;</div>
          <div>Canopy latch unsealed. Nothing was actually opened.</div>
        </div>
      );
    }
    // 7. adakku ("close")
    else if (lower === "adakku") {
      outputNode = (
        <div className="text-xs font-mono space-y-0.5 text-[#3de865]">
          <div className="font-bold text-[#f8b824]">ADAKKU — &quot;Close!&quot;</div>
          <div>Husk resealed. Tender water locked back in.</div>
        </div>
      );
    }
    // 8. sudo thenga
    else if (lower === "sudo thenga") {
      sound.playError();
      outputNode = (
        <div className="text-[#c93b2b] text-xs font-mono space-y-0.5 font-bold">
          <div>Permission denied.</div>
          <div>Coconut has no authority.</div>
        </div>
      );
    }
    // 9. matrix
    else if (lower === "matrix") {
      outputNode = (
        <div className="text-[#3de865] text-xs font-mono leading-relaxed select-none tracking-widest whitespace-pre">
          {"  🥥     🥥      🥥\n🥥    🥥      🥥    🥥\n   🥥      🥥    🥥\n🥥    🥥      🥥    🥥\n  🥥     🥥      🥥"}
        </div>
      );
    }
    // 10. Unknown command
    else {
      sound.playError();
      const repeat = invalidRepeatRef.current;
      repeat.count = repeat.cmd === lower ? repeat.count + 1 : 1;
      repeat.cmd = lower;

      if (repeat.count === 3) {
        useThengaStore.getState().spawnCoconutFall(1);
      }

      outputNode = (
        <div className="text-[#c93b2b] text-xs font-mono space-y-1">
          <div>thenga-sh: command not found: &apos;{trimmed}&apos;</div>
          <div className="text-[#f8b824] font-bold">
            Enth thenga aan ith?
          </div>
        </div>
      );
    }

    setHistory((prev) => [...prev, { command: trimmed, output: outputNode }]);
  };

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
      className="thenga-crt-screen flex flex-col h-full w-full p-3 font-mono text-xs text-[#3de865] overflow-y-auto cursor-text select-text"
      role="region"
      aria-label="Thenga Terminal Console"
    >
      {/* Output History */}
      <div className="space-y-2">
        {history.map((entry, idx) => (
          <div key={idx} className="space-y-1">
            {entry.command !== undefined && (
              <div className="flex items-center gap-2 text-[#3de865]">
                <span className="text-[#f8b824] font-bold select-none">
                  thenga@coconut:~$
                </span>
                <span className="text-white">{entry.command}</span>
              </div>
            )}
            {entry.output && <div>{entry.output}</div>}
          </div>
        ))}
      </div>

      {/* Active Input Line */}
      <div className="flex items-center gap-2 mt-2 pt-1 text-[#3de865]">
        <span className="text-[#f8b824] font-bold select-none shrink-0">
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
          className="flex-1 bg-transparent border-none outline-none text-[#3de865] font-mono text-xs caret-[#3de865] p-0 m-0 focus:ring-0"
        />
      </div>

      <div ref={terminalBottomRef} />
    </div>
  );
}
