"use client";

import { Activity, Cpu, HardDrive, TreePalm, Sparkles } from "lucide-react";
import { useThengaStore } from "@/store/useThengaStore";

export default function KolaManager() {
  const kolas = useThengaStore((state) => state.kolas);

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
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-amber-300 bg-amber-950/80 border border-amber-500/40 px-2 py-0.5 rounded">
            Active Kolas: {kolas.length}
          </span>
          <span className="text-[10px] text-emerald-300 bg-emerald-950 border border-emerald-500/40 px-2 py-0.5 rounded">
            Cluster Health: 100%
          </span>
        </div>
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

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto divide-y divide-[#2a1d13]">
        {/* ACTIVE KOLAS SECTION */}
        <div className="p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-amber-300 font-bold text-[11px] tracking-wide">
              <TreePalm className="w-3.5 h-3.5 text-emerald-400" />
              <span>ACTIVE KOLAS ({kolas.length})</span>
            </div>
            <span className="text-[10px] text-amber-400/60">
              Auto-syncs with Terminal
            </span>
          </div>

          {kolas.length === 0 ? (
            <div className="p-3 rounded-xl bg-[#18110a] border border-[#362518] text-center text-amber-300/60 text-[11px]">
              <Sparkles className="w-4 h-4 mx-auto mb-1 text-amber-400/40" />
              No active Kolas clustered yet.
              <br />
              <span className="text-amber-400/80">
                Run <code className="text-emerald-400 bg-emerald-950/60 px-1 py-0.5 rounded">thenga-kola</code> in Terminal to spawn a cluster.
              </span>
            </div>
          ) : (
            <div className="border border-[#382618] rounded-xl overflow-hidden bg-[#160f09]">
              <table className="w-full text-left text-[11px]">
                <thead>
                  <tr className="bg-[#20150d] text-amber-400/70 border-b border-[#382618]">
                    <th className="py-1.5 px-2.5 font-semibold">KOLA ID</th>
                    <th className="py-1.5 px-2 font-semibold">BUNCH COUNT</th>
                    <th className="py-1.5 px-2 font-semibold">STATUS</th>
                    <th className="py-1.5 px-2 font-semibold text-right">SPAWNED</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#26190f]">
                  {kolas.map((k) => (
                    <tr key={k.id} className="hover:bg-white/5 text-amber-100 transition-colors">
                      <td className="py-1.5 px-2.5 font-bold text-amber-300 flex items-center gap-1">
                        <span>🥥</span> {k.id}
                      </td>
                      <td className="py-1.5 px-2 text-emerald-300">
                        {k.bunchCount} coconuts
                      </td>
                      <td className="py-1.5 px-2">
                        <span className="inline-block px-1.5 py-0.2 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[10px]">
                          {k.status}
                        </span>
                      </td>
                      <td className="py-1.5 px-2 text-right text-amber-400/60 text-[10px]">
                        {k.createdAt}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* SYSTEM DAEMONS SECTION */}
        <div className="p-3">
          <div className="text-amber-400/60 font-bold text-[10px] tracking-wider uppercase mb-2">
            System Daemon Processes
          </div>
          <div className="border border-[#382618] rounded-xl overflow-hidden bg-[#160f09]">
            <table className="w-full text-left text-[11px]">
              <thead>
                <tr className="bg-[#20150d] text-amber-400/70 border-b border-[#382618]">
                  <th className="py-1.5 px-2.5">PID</th>
                  <th className="py-1.5 px-2">Process</th>
                  <th className="py-1.5 px-2">CPU</th>
                  <th className="py-1.5 px-2">Juice RAM</th>
                  <th className="py-1.5 px-2 text-right">State</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#26190f]">
                {mockProcesses.map((proc) => (
                  <tr key={proc.pid} className="hover:bg-white/5 text-amber-200/90">
                    <td className="py-1.5 px-2.5 text-amber-400/60">{proc.pid}</td>
                    <td className="py-1.5 px-2 font-medium text-amber-100">{proc.name}</td>
                    <td className="py-1.5 px-2 text-emerald-400">{proc.cpu}</td>
                    <td className="py-1.5 px-2">{proc.memory}</td>
                    <td className="py-1.5 px-2 text-right text-amber-300">{proc.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
