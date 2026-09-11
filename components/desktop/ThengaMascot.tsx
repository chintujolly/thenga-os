"use client";

import React from "react";
import PixelCoconut, { CoconutState } from "./PixelCoconut";

interface ThengaMascotProps {
  className?: string;
  size?: number;
  state?: CoconutState;
  onClick?: (e: React.MouseEvent) => void;
  title?: string;
}

/**
 * ThengaMascot: The in-world physical pixel coconut.
 * Authentic fibrous coconut sprite that rests naturally on the earth.
 * Clicks trigger the Malayalam annoyance escalation.
 */
export default function ThengaMascot({
  className = "",
  size = 40,
  state = "sitting",
  onClick,
  title = "A resting coconut. Click at your own risk.",
}: ThengaMascotProps) {
  return (
    <div
      className={`inline-block select-none cursor-pointer transition-transform hover:scale-110 active:scale-95 ${className}`}
      onClick={onClick}
      title={title}
      role="button"
      tabIndex={0}
      aria-label="Thenga OS Coconut Mascot"
    >
      <PixelCoconut state={state} size={size} />
    </div>
  );
}
