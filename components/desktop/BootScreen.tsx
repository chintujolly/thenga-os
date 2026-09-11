"use client";

import React, { useEffect, useRef, useState } from "react";
import PixelCoconut from "./PixelCoconut";
import { sound } from "@/utils/sound";

interface BootScreenProps {
  onComplete: () => void;
}

const BIOS_MESSAGES = [
  "THENGA BIOS v0.1 (C) 2026 Cocos Nucifera Systems",
  "64-Fiber Organic CPU Detected @ 12.8 MHz",
  "Checking husk........ OK",
  "Checking juice....... 100%",
  "Checking coconut..... PRESENT",
  "Searching for kernel. NOT FOUND",
  "Searching for purpose. NOT FOUND",
  "Starting THENGA OS...",
];

export default function BootScreen({ onComplete }: BootScreenProps) {
  const [lineIndex, setLineIndex] = useState(0);
  const [showLogo, setShowLogo] = useState(false);
  const completedRef = useRef(false);

  const finish = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    sound.playAchievement();
    onComplete();
  };

  useEffect(() => {
    if (lineIndex < BIOS_MESSAGES.length) {
      sound.playClick();
      const timer = setTimeout(() => {
        setLineIndex((prev) => prev + 1);
      }, 220);
      return () => clearTimeout(timer);
    } else if (!showLogo) {
      sound.playChirp();
      const logoTimer = setTimeout(() => {
        setShowLogo(true);
      }, 300);
      return () => clearTimeout(logoTimer);
    } else {
      const holdTimer = setTimeout(() => {
        finish();
      }, 1000);
      return () => clearTimeout(holdTimer);
    }
  }, [lineIndex, showLogo]);

  // Skip on click or any keypress
  useEffect(() => {
    const handleSkip = () => finish();
    window.addEventListener("keydown", handleSkip);
    window.addEventListener("click", handleSkip);
    return () => {
      window.removeEventListener("keydown", handleSkip);
      window.removeEventListener("click", handleSkip);
    };
  }, []);

  return (
    <div className="thenga-crt-screen fixed inset-0 z-[999] flex flex-col items-center justify-center text-[#3de865] font-mono select-none p-4 cursor-pointer">
      <div className="w-full max-w-md border-3 border-[#191008] bg-[#0c0805] p-4 space-y-4 shadow-[5px_5px_0_#191008]">
        {/* BIOS Header */}
        <div className="border-b-2 border-[#191008] pb-2 text-[10px] text-[#f8b824] flex items-center justify-between">
          <span>KERA-ROM BIOS POST</span>
          <span>MEM: 512 MB OK</span>
        </div>

        {/* BIOS Boot Logs */}
        <div className="space-y-1 text-xs min-h-[160px]">
          {BIOS_MESSAGES.slice(0, lineIndex).map((msg, i) => (
            <div
              key={i}
              className={
                msg.includes("NOT FOUND")
                  ? "text-[#f8b824] font-bold"
                  : msg.includes("OK") || msg.includes("100%") || msg.includes("PRESENT")
                  ? "text-[#3de865]"
                  : "text-white/85"
              }
            >
              {msg}
            </div>
          ))}
          {lineIndex < BIOS_MESSAGES.length && (
            <span className="inline-block w-2 h-3.5 bg-[#3de865] align-middle" />
          )}
        </div>

        {/* Brand Splash on Finish */}
        {showLogo && (
          <div className="thenga-window-in border-t-2 border-[#191008] pt-3 text-center space-y-2">
            <div className="flex justify-center">
              <PixelCoconut state="sitting" size={48} />
            </div>
            <div className="thenga-pixel text-lg text-[#f8b824] tracking-wider">
              THENGA OS
            </div>
            <p className="text-xs text-white/80 italic font-bold">
              &ldquo;No kernel. Just fiber.&rdquo;
            </p>
          </div>
        )}

        {/* Skip Tip */}
        <div className="border-t border-[#191008] pt-2 text-center text-[10px] text-[#f8b824]/60">
          Click or press any key to skip boot
        </div>
      </div>
    </div>
  );
}
