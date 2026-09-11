"use client";

import { useEffect } from "react";
import { useThengaStore } from "@/store/useThengaStore";
import PixelCoconut from "./PixelCoconut";
import { sound } from "@/utils/sound";

/**
 * CoconutFallLayer: Renders falling pixel coconut sprites across the desktop.
 * Uses realistic stepped gravity, rotation, ground impact bounce, roll, and settle.
 * Plays 8-bit thud audio and triggers screen shake on impact.
 */
export default function CoconutFallLayer() {
  const coconutFalls = useThengaStore((state) => state.coconutFalls);
  const clearCoconutFall = useThengaStore((state) => state.clearCoconutFall);

  useEffect(() => {
    if (coconutFalls.length > 0) {
      // Play impact audio slightly before landing
      const timer = setTimeout(() => {
        sound.playThud();
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [coconutFalls]);

  if (coconutFalls.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[150]" aria-hidden="true">
      {coconutFalls.map((fall) => (
        <div
          key={fall.id}
          className="thenga-falling-coconut drop-shadow-md"
          style={{
            left: `${fall.x}%`,
            animationDuration: `${fall.durationMs}ms`,
            animationDelay: `${fall.delayMs}ms`,
          }}
          onAnimationEnd={() => {
            clearCoconutFall(fall.id);
          }}
        >
          <PixelCoconut state="falling" size={fall.size || 36} />
        </div>
      ))}
    </div>
  );
}
