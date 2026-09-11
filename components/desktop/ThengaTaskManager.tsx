"use client";

import React, { useState } from "react";
import { WindowState } from "@/types/window";
import { sound } from "@/utils/sound";

interface ThengaTaskManagerProps {
  windows?: WindowState[];
}

export default function ThengaTaskManager({ windows = [] }: ThengaTaskManagerProps) {
  const [selectedPid, setSelectedPid] = useState<string>("p1");
  const [endTaskNotice, setEndTaskNotice] = useState<string | null>(null);

  const openApps = windows.filter((w) => w.isOpen);

  // System processes based on prompt instructions
  const systemProcesses = [
    { pid: "p1", name: "CommonSense.exe", cpu: "0.0%", memory: "0 KB", status: "NOT FOUND" },
    { pid: "p2", name: "Purpose.exe", cpu: "0.0%", memory: "0 KB", status: "NOT FOUND" },
    { pid: "p3", name: "Kernel.sys", cpu: "0.0%", memory: "0 KB", status: "Nope." },
    { pid: "p4", name: "tender_water_d.sys", cpu: "0.2%", memory: "512 MB", status: "Hydrated" },
    { pid: "p5", name: "fiber_weave_daemon", cpu: "0.1%", memory: "16 KB", status: "Organic" },
  ];

  const handleEndTask = () => {
    sound.playClick();
    setEndTaskNotice("Request considered by coconut... Task ignored. Coconut refuses.");
    setTimeout(() => setEndTaskNotice(null), 3000);
  };

  return (
    <div className="flex flex-col h-full bg-[#fdf7e7] text-[#191008] select-none font-mono text-xs">
      {/* Top Menu / Tabs */}
      <div className="p-2 bg-[#ecdba8] border-b-2 border-[#191008] flex items-center justify-between">
        <div className="flex items-center gap-1">
          <span className="px-2 py-0.5 bg-[#fdf7e7] border-2 border-[#191008] font-bold text-[10px] shadow-[1px_1px_0_#191008]">
            PROCESSES
          </span>
          <span className="px-2 py-0.5 bg-[#ecdba8] text-[#6b4728] font-bold text-[10px]">
            PERFORMANCE
          </span>
        </div>
        <span className="text-[10px] text-[#6b4728] font-bold">
          PID MONITOR
        </span>
      </div>

      {/* Serious System Diagnostic Metrics Bar */}
      <div className="grid grid-cols-3 gap-2 p-2.5 bg-white border-b-2 border-[#191008]">
        <div className="border border-[#191008] p-1.5 bg-[#fdf7e7]">
          <div className="text-[9px] text-[#6b4728] font-bold">CPU USAGE</div>
          <div className="text-base font-bold text-[#2b9e38]">0.3%</div>
        </div>
        <div className="border border-[#191008] p-1.5 bg-[#fdf7e7]">
          <div className="text-[9px] text-[#6b4728] font-bold">JUICE RAM</div>
          <div className="text-base font-bold text-[#f5a81e]">512 MB</div>
        </div>
        <div className="border border-[#191008] p-1.5 bg-[#fdf7e7]">
          <div className="text-[9px] text-[#6b4728] font-bold">HUSK INTEGRITY</div>
          <div className="text-base font-bold text-[#2b9e38]">100%</div>
        </div>
      </div>

      {/* Process Table Header & List */}
      <div className="flex-1 overflow-y-auto p-2 bg-white">
        <table className="w-full text-left text-[11px] border-collapse">
          <thead>
            <tr className="bg-[#ecdba8] text-[#191008] border-b-2 border-[#191008]">
              <th className="p-1 font-bold">PROCESS NAME</th>
              <th className="p-1 font-bold">CPU</th>
              <th className="p-1 font-bold">MEM</th>
              <th className="p-1 font-bold">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {/* System processes */}
            {systemProcesses.map((proc) => {
              const isSelected = selectedPid === proc.pid;
              return (
                <tr
                  key={proc.pid}
                  onClick={() => {
                    sound.playClick();
                    setSelectedPid(proc.pid);
                  }}
                  className={`border-b border-[#ecdba8] cursor-pointer ${
                    isSelected ? "bg-[#f5a81e] text-[#191008] font-bold" : "hover:bg-[#fdf7e7]"
                  }`}
                >
                  <td className="p-1 font-mono">{proc.name}</td>
                  <td className="p-1">{proc.cpu}</td>
                  <td className="p-1">{proc.memory}</td>
                  <td className="p-1">
                    <span
                      className={`px-1 py-0.2 text-[9px] border border-[#191008] ${
                        proc.status === "NOT FOUND" || proc.status === "Nope."
                          ? "bg-[#c93b2b] text-white"
                          : "bg-[#2b9e38] text-white"
                      }`}
                    >
                      {proc.status}
                    </span>
                  </td>
                </tr>
              );
            })}

            {/* Active user window applications */}
            {openApps.map((app) => {
              const pid = `app-${app.id}`;
              const isSelected = selectedPid === pid;
              return (
                <tr
                  key={pid}
                  onClick={() => {
                    sound.playClick();
                    setSelectedPid(pid);
                  }}
                  className={`border-b border-[#ecdba8] cursor-pointer ${
                    isSelected ? "bg-[#f5a81e] text-[#191008] font-bold" : "hover:bg-[#fdf7e7]"
                  }`}
                >
                  <td className="p-1 font-mono">{app.title}.exe</td>
                  <td className="p-1">0.1%</td>
                  <td className="p-1">8 MB</td>
                  <td className="p-1">
                    <span className="px-1 py-0.2 text-[9px] border border-[#191008] bg-[#2b9e38] text-white">
                      RUNNING
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Action Notice */}
      {endTaskNotice && (
        <div className="p-1.5 bg-[#ecdba8] border-t border-[#191008] text-[10px] font-bold text-[#c93b2b] text-center">
          {endTaskNotice}
        </div>
      )}

      {/* Task Manager Footer */}
      <div className="p-2 bg-[#ecdba8] border-t-2 border-[#191008] flex items-center justify-between">
        <span className="text-[10px] text-[#6b4728]">
          Processes: {systemProcesses.length + openApps.length}
        </span>
        <button
          type="button"
          onClick={handleEndTask}
          className="thenga-pixel-btn px-3 py-1 font-bold text-xs bg-[#c93b2b] text-white hover:bg-[#de4433]"
        >
          END TASK
        </button>
      </div>
    </div>
  );
}
