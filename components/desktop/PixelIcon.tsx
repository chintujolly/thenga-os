"use client";

import React from "react";
import { WindowId } from "@/types/window";

interface PixelIconProps {
  id: WindowId;
  size?: number;
  className?: string;
}

/**
 * PixelIcon: Handcrafted bespoke pixel-art sprites for each THENGA OS application.
 * Rendered on a 16x16 pixel grid with crispEdges.
 * No generic cards, no vector abstractions — authentic retro computer OS objects.
 */
export default function PixelIcon({ id, size = 32, className = "" }: PixelIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      className={className}
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      <PixelGlyph id={id} />
    </svg>
  );
}

function PixelGlyph({ id }: { id: WindowId }) {
  const INK = "#191008";

  switch (id) {
    case "terminal":
      // Vintage beige CRT Monitor displaying green phosphor prompt
      return (
        <g>
          {/* Monitor Casing */}
          <rect x={1} y={1} width={14} height={11} fill="#e5d4aa" />
          <rect x={2} y={2} width={12} height={9} fill="#35281e" />
          <rect x={1} y={1} width={14} height={1} fill="#f4ebd0" />
          {/* Bevel Shadow & Outline */}
          <rect x={0} y={0} width={16} height={1} fill={INK} />
          <rect x={0} y={0} width={1} height={13} fill={INK} />
          <rect x={15} y={0} width={1} height={13} fill={INK} />
          <rect x={0} y={12} width={16} height={1} fill={INK} />
          {/* CRT Screen */}
          <rect x={3} y={3} width={10} height={7} fill="#0d140e" />
          {/* Green Phosphor CLI prompt >_ */}
          <rect x={4} y={4} width={1} height={1} fill="#3de865" />
          <rect x={5} y={5} width={1} height={1} fill="#3de865" />
          <rect x={4} y={6} width={1} height={1} fill="#3de865" />
          <rect x={7} y={7} width={2} height={1} fill="#3de865" />
          {/* Monitor Stand Base */}
          <rect x={6} y={13} width={4} height={1} fill="#d2bc8d" />
          <rect x={4} y={14} width={8} height={1} fill="#bfa572" />
          <rect x={3} y={15} width={10} height={1} fill={INK} />
        </g>
      );

    case "explorer":
      // Manila Retro Folder with Coconut Leaf Tab
      return (
        <g>
          {/* Outline */}
          <rect x={1} y={2} width={6} height={2} fill={INK} />
          <rect x={1} y={4} width={14} height={11} fill={INK} />
          {/* Back tab */}
          <rect x={2} y={3} width={4} height={2} fill="#d18a38" />
          {/* Green Leaf Accent sticking out */}
          <rect x={7} y={1} width={3} height={3} fill="#278d38" />
          <rect x={8} y={0} width={2} height={2} fill="#7bcd2f" />
          <rect x={9} y={2} width={1} height={1} fill="#145223" />
          {/* Folder Body Front */}
          <rect x={2} y={5} width={12} height={9} fill="#e5a044" />
          {/* Folder Highlight */}
          <rect x={2} y={5} width={12} height={1} fill="#f7bf6d" />
          <rect x={2} y={6} width={1} height={7} fill="#f7bf6d" />
          {/* Folder Shadow crease */}
          <rect x={13} y={6} width={1} height={8} fill="#ab6e22" />
          <rect x={2} y={13} width={11} height={1} fill="#ab6e22" />
          {/* Coconut icon stamped on folder */}
          <rect x={6} y={8} width={4} height={4} fill="#693c1b" />
          <rect x={7} y={7} width={2} height={1} fill="#693c1b" />
          <rect x={7} y={9} width={1} height={1} fill="#191008" />
          <rect x={8} y={9} width={1} height={1} fill="#191008" />
        </g>
      );

    case "kola-manager":
      // A fresh heavy Kola (cluster of coconuts bound together)
      return (
        <g>
          {/* Stalk Anchor */}
          <rect x={7} y={0} width={2} height={4} fill="#543015" />
          <rect x={6} y={1} width={1} height={2} fill="#824f28" />
          {/* Top Coconut */}
          <rect x={5} y={3} width={6} height={5} fill={INK} />
          <rect x={6} y={4} width={4} height={3} fill="#693c1b" />
          <rect x={6} y={4} width={2} height={1} fill="#965426" />
          {/* Left Coconut */}
          <rect x={1} y={7} width={6} height={6} fill={INK} />
          <rect x={2} y={8} width={4} height={4} fill="#543015" />
          <rect x={2} y={8} width={2} height={2} fill="#78471e" />
          {/* Right Coconut */}
          <rect x={9} y={7} width={6} height={6} fill={INK} />
          <rect x={10} y={8} width={4} height={4} fill="#693c1b" />
          <rect x={10} y={8} width={2} height={2} fill="#965426" />
          {/* Bottom Center Coconut */}
          <rect x={5} y={10} width={6} height={5} fill={INK} />
          <rect x={6} y={11} width={4} height={3} fill="#78471e" />
          <rect x={6} y={11} width={2} height={1} fill="#965426" />
          {/* Tender green frond binding */}
          <rect x={6} y={6} width={4} height={1} fill="#7bcd2f" />
        </g>
      );

    case "bin":
      // Copra Bin: Wooden crate with dry coconut husks
      return (
        <g>
          {/* Dry husks overflowing top */}
          <rect x={3} y={2} width={3} height={3} fill="#91562b" />
          <rect x={6} y={1} width={4} height={3} fill="#6b3b19" />
          <rect x={10} y={2} width={3} height={3} fill="#b5733e" />
          <rect x={4} y={3} width={8} height={2} fill="#48260e" />
          {/* Crate Outline */}
          <rect x={1} y={4} width={14} height={11} fill={INK} />
          {/* Crate Slats */}
          <rect x={2} y={5} width={12} height={9} fill="#824f28" />
          {/* Slat gaps */}
          <rect x={2} y={7} width={12} height={1} fill={INK} />
          <rect x={2} y={10} width={12} height={1} fill={INK} />
          {/* Slat Wood grain highlights */}
          <rect x={2} y={5} width={12} height={1} fill="#aa6b3c" />
          <rect x={2} y={8} width={12} height={1} fill="#aa6b3c" />
          <rect x={2} y={11} width={12} height={1} fill="#aa6b3c" />
          {/* Diagonal cross brace */}
          <rect x={2} y={6} width={2} height={2} fill="#543015" />
          <rect x={5} y={8} width={2} height={2} fill="#543015" />
          <rect x={8} y={10} width={2} height={2} fill="#543015" />
          <rect x={11} y={12} width={2} height={2} fill="#543015" />
        </g>
      );

    case "calculator":
      // Retro Pocket Calculator
      return (
        <g>
          {/* Body */}
          <rect x={2} y={0} width={12} height={16} fill={INK} />
          <rect x={3} y={1} width={10} height={14} fill="#885fad" />
          <rect x={3} y={1} width={10} height={1} fill="#a87fce" />
          {/* LCD Screen Bevel */}
          <rect x={4} y={2} width={8} height={4} fill="#141e16" />
          <rect x={5} y={3} width={6} height={2} fill="#4ef082" />
          <rect x={6} y={3} width={1} height={1} fill="#0d140e" />
          <rect x={8} y={4} width={2} height={1} fill="#0d140e" />
          {/* Keypad Buttons */}
          <rect x={4} y={7} width={2} height={2} fill="#f4ebd0" />
          <rect x={7} y={7} width={2} height={2} fill="#f4ebd0" />
          <rect x={10} y={7} width={2} height={2} fill="#e5a044" />

          <rect x={4} y={10} width={2} height={2} fill="#f4ebd0" />
          <rect x={7} y={10} width={2} height={2} fill="#f4ebd0" />
          <rect x={10} y={10} width={2} height={2} fill="#e5a044" />

          <rect x={4} y={13} width={2} height={1} fill="#c93b2b" />
          <rect x={7} y={13} width={2} height={1} fill="#f4ebd0" />
          <rect x={10} y={13} width={2} height={1} fill="#3db352" />
        </g>
      );

    case "task-manager":
      // Vintage System Gauge / Diagnostic Monitor
      return (
        <g>
          {/* Outer Housing */}
          <rect x={1} y={1} width={14} height={13} fill={INK} />
          <rect x={2} y={2} width={12} height={11} fill="#3e6f96" />
          <rect x={2} y={2} width={12} height={1} fill="#629ac4" />
          {/* Gauge Face */}
          <rect x={3} y={4} width={10} height={7} fill="#fdf7e7" />
          {/* Dial Arc */}
          <rect x={4} y={5} width={8} height={1} fill="#278d38" />
          <rect x={10} y={5} width={2} height={1} fill="#c93b2b" />
          <rect x={4} y={6} width={1} height={2} fill="#278d38" />
          <rect x={11} y={6} width={1} height={2} fill="#c93b2b" />
          {/* Needle Pivot & Arm */}
          <rect x={7} y={8} width={2} height={2} fill={INK} />
          <line x1={8} y1={8} x2={10} y2={5} stroke="#c93b2b" strokeWidth={1} />
          {/* LED Status Bar below */}
          <rect x={4} y={12} width={2} height={1} fill="#3de865" />
          <rect x={7} y={12} width={2} height={1} fill="#f5a81e" />
          <rect x={10} y={12} width={2} height={1} fill="#3de865" />
        </g>
      );

    case "physics":
      // Coconut flying mid-air with gravity speed trails
      return (
        <g>
          {/* Speed Trail Lines */}
          <rect x={0} y={4} width={3} height={1} fill="#ffffff" />
          <rect x={1} y={7} width={4} height={1} fill="#ffffff" opacity={0.8} />
          <rect x={0} y={10} width={3} height={1} fill="#ffffff" />
          {/* Flying Coconut Body */}
          <rect x={5} y={2} width={8} height={10} fill={INK} />
          <rect x={6} y={3} width={6} height={8} fill="#693c1b" />
          <rect x={6} y={3} width={3} height={3} fill="#965426" />
          <rect x={9} y={7} width={2} height={3} fill="#48260e" />
          {/* Apex Pores */}
          <rect x={10} y={4} width={1} height={1} fill="#191008" />
          <rect x={11} y={5} width={1} height={1} fill="#191008" />
          {/* Ground Impact Spark */}
          <rect x={11} y={13} width={2} height={2} fill="#f5a81e" />
          <rect x={9} y={14} width={2} height={1} fill="#f5a81e" />
          <rect x={13} y={12} width={1} height={2} fill="#ffe666" />
        </g>
      );

    case "defender":
      // Antivirus Bronze/Steel Shield with Coconut Emblem
      return (
        <g>
          {/* Shield Outline */}
          <path d="M 2 1 L 14 1 L 14 8 L 8 15 L 2 8 Z" fill={INK} />
          {/* Shield Fill - Emerald & Teal Protection */}
          <path d="M 3 2 L 13 2 L 13 8 L 8 14 L 3 8 Z" fill="#1b8577" />
          {/* Highlight Left half */}
          <path d="M 3 2 L 8 2 L 8 14 L 3 8 Z" fill="#2eb8a6" />
          {/* Gold Shield Border Crest */}
          <rect x={4} y={2} width={8} height={1} fill="#ffe666" />
          {/* Central Protective Coconut Emblem */}
          <rect x={6} y={5} width={4} height={4} fill="#543015" />
          <rect x={7} y={6} width={2} height={2} fill="#78471e" />
          <rect x={7} y={6} width={1} height={1} fill="#ffe666" />
        </g>
      );

    case "achievements":
      // Pixel Gold Trophy Cup with Palm Star
      return (
        <g>
          {/* Trophy Cup Outline */}
          <rect x={4} y={1} width={8} height={1} fill={INK} />
          <rect x={3} y={2} width={10} height={6} fill={INK} />
          <rect x={2} y={3} width={1} height={4} fill={INK} />
          <rect x={13} y={3} width={1} height={4} fill={INK} />
          <rect x={5} y={8} width={6} height={2} fill={INK} />
          <rect x={6} y={10} width={4} height={3} fill={INK} />
          <rect x={4} y={13} width={8} height={3} fill={INK} />
          {/* Gold Cup Fill */}
          <rect x={4} y={2} width={8} height={5} fill="#f5a81e" />
          <rect x={4} y={2} width={4} height={5} fill="#ffe666" />
          {/* Handles */}
          <rect x={2} y={4} width={1} height={2} fill="#ffe666" />
          <rect x={13} y={4} width={1} height={2} fill="#c9820e" />
          {/* Stem & Base */}
          <rect x={7} y={10} width={2} height={2} fill="#f5a81e" />
          <rect x={5} y={14} width={6} height={1} fill="#c9820e" />
          <rect x={5} y={13} width={6} height={1} fill="#ffe666" />
          {/* Sparkling Coconut in Cup */}
          <rect x={7} y={4} width={2} height={2} fill="#693c1b" />
        </g>
      );

    case "readme":
      // Vintage Computer User Manual / Dog-eared Pixel Document
      return (
        <g>
          {/* Outline */}
          <path d="M 2 1 L 10 1 L 14 5 L 14 15 L 2 15 Z" fill={INK} />
          {/* Paper Face */}
          <rect x={3} y={2} width={7} height={12} fill="#fdf7e7" />
          <rect x={10} y={5} width={3} height={9} fill="#fdf7e7" />
          {/* Folded Dog-ear Corner */}
          <polygon points="10,1 14,5 10,5" fill="#d8c593" />
          {/* Printed Text Lines */}
          <rect x={4} y={4} width={4} height={1} fill="#278d38" /> {/* Title */}
          <rect x={4} y={6} width={7} height={1} fill="#583316" />
          <rect x={4} y={8} width={8} height={1} fill="#583316" />
          <rect x={4} y={10} width={6} height={1} fill="#583316" />
          <rect x={4} y={12} width={4} height={1} fill="#c93b2b" />
        </g>
      );

    default:
      return <rect x={2} y={2} width={12} height={12} fill="#693c1b" />;
  }
}
