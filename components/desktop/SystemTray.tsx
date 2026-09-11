"use client";

import React, { useState } from "react";
import SystemClock from "./SystemClock";
import { sound } from "@/utils/sound";

export default function SystemTray() {
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);
  const [soundMuted, setSoundMuted] = useState(false);

  const toggleSound = () => {
    const next = !soundMuted;
    setSoundMuted(next);
    sound.enabled = !next;
    if (!next) sound.playClick();
  };

  return (
    <div className="relative flex items-center gap-1.5 sm:gap-2 h-full font-mono text-xs text-[#191008]">
      {/* Tender Coconut Juice Battery */}
      <div
        title="Tender Coconut Electrolyte Battery: 100%"
        className="flex items-center gap-1 px-1.5 py-0.5 border border-[#191008] bg-[#fdf7e7] shadow-[1px_1px_0_#191008]"
      >
        <span className="text-[10px]">🥥</span>
        <div className="w-6 h-2 bg-[#d8c593] border border-[#191008] overflow-hidden flex">
          <div className="h-full bg-[#2b9e38] w-full" />
        </div>
        <span className="text-[9px] font-bold text-[#2b9e38] hidden sm:inline">100%</span>
      </div>

      {/* PalmLink-5G Mesh Network */}
      <div
        title="Network: PalmLink-5G (Connected to Kerala Coconut Grove Mesh)"
        className="flex items-center gap-1 px-1.5 py-0.5 border border-[#191008] bg-[#fdf7e7] shadow-[1px_1px_0_#191008]"
      >
        <svg width="12" height="10" viewBox="0 0 12 10" shapeRendering="crispEdges">
          <rect x={0} y={7} width={2} height={3} fill="#191008" />
          <rect x={3} y={5} width={2} height={5} fill="#191008" />
          <rect x={6} y={3} width={2} height={7} fill="#191008" />
          <rect x={9} y={1} width={2} height={9} fill="#2b9e38" />
        </svg>
        <span className="text-[9px] font-bold text-[#191008] hidden md:inline">5G</span>
      </div>

      {/* Audio / Chenda Sound Toggle */}
      <button
        type="button"
        onClick={toggleSound}
        title={soundMuted ? "Sound: Muted (Click to enable)" : "Sound: Chenda Melam Stereo (Click to mute)"}
        className="px-1.5 py-0.5 border border-[#191008] bg-[#fdf7e7] hover:bg-[#fffdf6] shadow-[1px_1px_0_#191008] cursor-pointer"
      >
        {soundMuted ? (
          <span className="text-[10px] text-[#c93b2b]">🔇</span>
        ) : (
          <span className="text-[10px] text-[#191008]">🔊</span>
        )}
      </button>

      {/* Notification Bell */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setShowNotificationPopup(!showNotificationPopup)}
          title="System Notifications: 1 active"
          className="px-1.5 py-0.5 border border-[#191008] bg-[#fdf7e7] hover:bg-[#fffdf6] shadow-[1px_1px_0_#191008] cursor-pointer relative"
        >
          <span className="text-[10px]">🔔</span>
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#f5a81e] border border-[#191008]" />
        </button>

        {/* Retro Pixel Alert Popover */}
        {showNotificationPopup && (
          <div className="thenga-pixel-frame-sm absolute bottom-10 right-0 w-64 p-2.5 bg-[#fdf7e7] text-[#191008] z-50 shadow-[3px_3px_0_#191008]">
            <div className="flex items-center justify-between border-b-2 border-[#191008] pb-1 font-bold text-[10px] tracking-wider">
              <span>🥥 THENGA NOTIFICATION</span>
              <button
                type="button"
                onClick={() => setShowNotificationPopup(false)}
                className="hover:bg-[#ecdba8] px-1 cursor-pointer"
              >
                ✕
              </button>
            </div>
            <p className="mt-2 text-[10px] leading-tight text-[#191008]">
              <strong>Gravity Advisory:</strong> 1 ripe coconut fell at 9.8 m/s² near your taskbar. No kernel was harmed.
            </p>
            <div className="mt-2 text-[9px] text-[#6b4728] border-t border-[#d8c593] pt-1">
              Malayalam response: &ldquo;Aiyyo.&rdquo;
            </div>
          </div>
        )}
      </div>

      {/* Vertical Separator */}
      <div className="h-5 w-[2px] bg-[#191008]/40 mx-0.5" />

      {/* Retro Clock */}
      <div className="px-1.5 py-0.5 border border-[#191008] bg-[#fdf7e7] shadow-[1px_1px_0_#191008] font-bold text-[10px]">
        <SystemClock />
      </div>
    </div>
  );
}
