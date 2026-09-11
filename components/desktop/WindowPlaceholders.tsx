"use client";

import React from "react";
import { WindowId, WindowState } from "@/types/window";
import ThengaTerminal from "./ThengaTerminal";
import KolaManager from "./KolaManager";
import ThengaExplorer from "./ThengaExplorer";
import CopraBin from "./CopraBin";
import CoconutCalculator from "./CoconutCalculator";
import ThengaTaskManager from "./ThengaTaskManager";
import CoconutPhysics from "./CoconutPhysics";
import ThengaDefender from "./ThengaDefender";
import ThengaAchievements from "./ThengaAchievements";
import PixelCoconut from "./PixelCoconut";

export function ReadmePlaceholder() {
  return (
    <div className="flex flex-col h-full bg-[#fdf7e7] text-[#191008] font-mono text-xs select-text overflow-y-auto">
      {/* Manual Header */}
      <div className="p-3 bg-[#ecdba8] border-b-2 border-[#191008] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <PixelCoconut state="sitting" size={20} />
          <span className="font-bold tracking-wider uppercase text-[11px]">
            THENGA OS USER MANUAL [DOC-THG-001]
          </span>
        </div>
        <span className="bg-[#191008] text-white text-[9px] px-1.5 py-0.5 font-bold">
          OFFICIAL
        </span>
      </div>

      {/* Manual Content */}
      <div className="p-4 space-y-4 leading-relaxed max-w-lg mx-auto">
        <div className="border-2 border-[#191008] bg-white p-3 shadow-[2px_2px_0_#191008]">
          <div className="thenga-pixel text-[13px] text-[#2b9e38] mb-1">
            THENGA OS
          </div>
          <p className="text-[10px] text-[#6b4728] uppercase font-bold tracking-wider">
            Standard Operating Instructions for Cocos Nucifera
          </p>
        </div>

        <div className="space-y-3 text-xs">
          <div className="border-l-3 border-[#2b9e38] pl-2.5">
            <div className="font-bold text-[#191008] text-[11px] uppercase tracking-wide">
              WHAT IS THENGA OS?
            </div>
            <p className="text-[#38210f] mt-0.5">
              An operating system for a coconut.
            </p>
          </div>

          <div className="border-l-3 border-[#f5a81e] pl-2.5">
            <div className="font-bold text-[#191008] text-[11px] uppercase tracking-wide">
              WHY?
            </div>
            <p className="text-[#38210f] mt-0.5">
              Nobody asked.
            </p>
          </div>

          <div className="border-l-3 border-[#3e6f96] pl-2.5">
            <div className="font-bold text-[#191008] text-[11px] uppercase tracking-wide">
              HOW?
            </div>
            <p className="text-[#38210f] mt-0.5">
              Nobody knows.
            </p>
          </div>

          <div className="border-l-3 border-[#c93b2b] pl-2.5">
            <div className="font-bold text-[#191008] text-[11px] uppercase tracking-wide">
              KERNEL?
            </div>
            <p className="text-[#38210f] mt-0.5">
              Nope.
            </p>
          </div>

          <div className="border-l-3 border-[#885fad] pl-2.5">
            <div className="font-bold text-[#191008] text-[11px] uppercase tracking-wide">
              PURPOSE?
            </div>
            <p className="text-[#38210f] mt-0.5">
              Unknown.
            </p>
          </div>
        </div>

        {/* Warning Callout Box */}
        <div className="p-2.5 border-2 border-[#191008] bg-[#f8e5bd] text-[11px] text-[#543015] shadow-[2px_2px_0_#191008]">
          <span className="font-bold">NOTICE:</span> Do not attempt to install real software onto a coconut.
          Tender coconut water is non-conductive to binary logic.
        </div>

        <div className="text-[10px] text-[#6b4728] italic text-center pt-2">
          &ldquo;Naalikerathinte nattil aarkkum ee OS venda.&rdquo;
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto p-2 bg-[#ecdba8] border-t-2 border-[#191008] text-[10px] text-[#6b4728] flex justify-between">
        <span>Section 1 of 1</span>
        <span>Printed on organic coconut husk</span>
      </div>
    </div>
  );
}

export function WindowPlaceholderContent({
  id,
  windows,
}: {
  id: WindowId;
  windows?: WindowState[];
}) {
  switch (id) {
    case "terminal":
      return <ThengaTerminal />;
    case "explorer":
      return <ThengaExplorer />;
    case "kola-manager":
      return <KolaManager />;
    case "bin":
      return <CopraBin />;
    case "readme":
      return <ReadmePlaceholder />;
    case "calculator":
      return <CoconutCalculator />;
    case "task-manager":
      return <ThengaTaskManager windows={windows} />;
    case "physics":
      return <CoconutPhysics />;
    case "defender":
      return <ThengaDefender />;
    case "achievements":
      return <ThengaAchievements />;
    default:
      return (
        <div className="p-4 font-mono text-xs text-[#191008]">
          Application {id} initialized.
        </div>
      );
  }
}
