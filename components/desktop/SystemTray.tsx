"use client";

import { useState } from "react";
import { Wifi, BatteryCharging, Volume2, Bell } from "lucide-react";
import SystemClock from "./SystemClock";

export default function SystemTray() {
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);

  return (
    <div className="relative flex items-center gap-1 sm:gap-2 h-full text-amber-200/80">
      {/* Coconut Water Battery Indicator */}
      <button
        type="button"
        title="Tender Coconut Battery: 100% (Rich Electrolytes)"
        className="flex items-center gap-1 px-1.5 py-1 rounded hover:bg-white/10 hover:text-amber-100 transition-colors cursor-pointer text-xs"
      >
        <BatteryCharging className="w-4 h-4 text-emerald-400" />
        <span className="hidden xl:inline text-[11px] font-mono font-medium text-emerald-300">
          100%
        </span>
      </button>

      {/* PalmLink Wi-Fi */}
      <button
        type="button"
        title="Wi-Fi: PalmLink-5G (Connected to Coconut Grove Mesh)"
        className="p-1.5 rounded hover:bg-white/10 hover:text-amber-100 transition-colors cursor-pointer"
      >
        <Wifi className="w-4 h-4 text-amber-300" />
      </button>

      {/* Audio / Volume */}
      <button
        type="button"
        title="Audio: Chenda Melam Stereo 80%"
        className="p-1.5 rounded hover:bg-white/10 hover:text-amber-100 transition-colors cursor-pointer"
      >
        <Volume2 className="w-4 h-4 text-amber-300" />
      </button>

      {/* Coconut Alerts / Notification Bell */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setShowNotificationPopup(!showNotificationPopup)}
          title="Coconut Alerts: 1 unread"
          className="p-1.5 rounded hover:bg-white/10 hover:text-amber-100 transition-colors cursor-pointer relative"
        >
          <Bell className="w-4 h-4 text-amber-300" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-[#1b130c] animate-pulse" />
        </button>

        {/* Quick Coconut Alert Popover */}
        {showNotificationPopup && (
          <div className="absolute bottom-12 right-0 w-64 p-3 bg-[#241a12]/95 border border-[#523a23] rounded-lg shadow-2xl backdrop-blur-md text-xs text-amber-100 z-50 animate-in fade-in slide-in-from-bottom-2">
            <div className="flex items-center justify-between font-semibold pb-1.5 border-b border-[#3d2b1a] text-amber-200">
              <span>🥥 THENGA NOTIFICATION</span>
              <button
                type="button"
                onClick={() => setShowNotificationPopup(false)}
                className="text-amber-400 hover:text-white px-1"
              >
                ✕
              </button>
            </div>
            <p className="mt-2 text-amber-200/90 leading-relaxed">
              <strong>Gravity Warning:</strong> 1 ripe coconut fell at 9.8 m/s² near your taskbar. No coconuts were harmed.
            </p>
            <div className="mt-2 text-[10px] text-amber-400/60 font-mono">
              Thenga Notification Center • Just now
            </div>
          </div>
        )}
      </div>

      {/* Vertical separator */}
      <div className="h-4 w-px bg-amber-800/40 mx-0.5" />

      {/* System Clock */}
      <SystemClock />
    </div>
  );
}
