"use client";

import React from "react";

export type CoconutState =
  | "sitting"
  | "falling"
  | "rolling"
  | "bouncing"
  | "cracked"
  | "selected"
  | "highlighted"
  | "flying"
  | "spinning";

interface PixelCoconutProps {
  state?: CoconutState;
  size?: number;
  className?: string;
  rotation?: number;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent) => void;
  title?: string;
}

/**
 * PixelCoconut: A handcrafted pixel-art coconut sprite.
 * Built with crisp 16x16 pixel blocks.
 * Not a cartoon smiling face — a realistic pixel coconut with fibrous texture,
 * apex germ pores, light-source shading, and multiple state representations.
 */
export default function PixelCoconut({
  state = "sitting",
  size = 32,
  className = "",
  rotation = 0,
  style = {},
  onClick,
  title,
}: PixelCoconutProps) {
  // Shading colors
  const INK = "#191008";
  const HUSK_DARK = "#48260e";
  const HUSK_MID = "#6b3b19";
  const HUSK_LIGHT = "#91562b";
  const HUSK_HIGHLIGHT = "#b5733e";
  const EYE = "#210f04";
  const MEAT_WHITE = "#fbfaf7";
  const WATER_CYAN = "#4ed2ea";
  const GOLD_OUTLINE = "#f5a81e";

  const isSelected = state === "selected" || state === "highlighted";
  const isCracked = state === "cracked";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      className={className}
      shapeRendering="crispEdges"
      onClick={onClick}
      style={{
        transform: `rotate(${rotation}deg)`,
        imageRendering: "pixelated",
        ...style,
      }}
      aria-hidden="true"
    >
      {title && <title>{title}</title>}
      {/* Outer Selection Highlight if selected */}
      {isSelected && (
        <g fill={GOLD_OUTLINE} opacity={0.9}>
          <rect x={4} y={0} width={8} height={1} />
          <rect x={2} y={1} width={2} height={2} />
          <rect x={12} y={1} width={2} height={2} />
          <rect x={0} y={4} width={1} height={8} />
          <rect x={15} y={4} width={1} height={8} />
          <rect x={2} y={13} width={2} height={2} />
          <rect x={12} y={13} width={2} height={2} />
          <rect x={4} y={15} width={8} height={1} />
        </g>
      )}

      {/* Coconut Outline & Base Silhouette */}
      <g fill={INK}>
        <rect x={5} y={1} width={6} height={1} />
        <rect x={3} y={2} width={2} height={1} />
        <rect x={11} y={2} width={2} height={1} />
        <rect x={2} y={3} width={1} height={2} />
        <rect x={13} y={3} width={1} height={2} />
        <rect x={1} y={5} width={1} height={6} />
        <rect x={14} y={5} width={1} height={6} />
        <rect x={2} y={11} width={1} height={2} />
        <rect x={13} y={11} width={1} height={2} />
        <rect x={3} y={13} width={2} height={1} />
        <rect x={11} y={13} width={2} height={1} />
        <rect x={5} y={14} width={6} height={1} />
      </g>

      {!isCracked ? (
        <>
          {/* Main Husk Body fill */}
          <g fill={HUSK_MID}>
            <rect x={5} y={2} width={6} height={12} />
            <rect x={3} y={3} width={2} height={10} />
            <rect x={11} y={3} width={2} height={10} />
            <rect x={2} y={5} width={1} height={6} />
            <rect x={13} y={5} width={1} height={6} />
          </g>

          {/* Darker shadow on lower-right side */}
          <g fill={HUSK_DARK}>
            <rect x={11} y={5} width={2} height={8} />
            <rect x={13} y={6} width={1} height={4} />
            <rect x={7} y={12} width={5} height={2} />
            <rect x={5} y={13} width={2} height={1} />
          </g>

          {/* Highlight and fiber texture on upper-left */}
          <g fill={HUSK_LIGHT}>
            <rect x={4} y={3} width={3} height={3} />
            <rect x={3} y={5} width={2} height={5} />
            <rect x={5} y={6} width={1} height={4} />
            <rect x={7} y={4} width={2} height={2} />
          </g>
          <g fill={HUSK_HIGHLIGHT}>
            <rect x={4} y={4} width={2} height={2} />
            <rect x={3} y={6} width={1} height={2} />
          </g>

          {/* Three natural germ pores ("eyes") at the apex */}
          <g fill={EYE}>
            <rect x={6} y={3} width={1} height={1} />
            <rect x={8} y={3} width={1} height={1} />
            <rect x={7} y={4} width={1} height={1} />
          </g>

          {/* Natural fiber striations */}
          <g fill={HUSK_DARK} opacity={0.6}>
            <rect x={5} y={9} width={1} height={3} />
            <rect x={8} y={8} width={1} height={4} />
            <rect x={10} y={6} width={1} height={3} />
          </g>
        </>
      ) : (
        /* Cracked Coconut state with white kernel & water splash */
        <>
          <g fill={HUSK_MID}>
            <rect x={2} y={5} width={3} height={6} />
            <rect x={3} y={3} width={2} height={10} />
            <rect x={12} y={5} width={2} height={6} />
            <rect x={11} y={3} width={2} height={10} />
          </g>
          {/* Exposed white coconut meat */}
          <g fill={MEAT_WHITE}>
            <rect x={5} y={4} width={6} height={8} />
            <rect x={4} y={6} width={8} height={4} />
          </g>
          {/* Jagged crack line */}
          <g fill={INK}>
            <rect x={7} y={3} width={2} height={3} />
            <rect x={8} y={6} width={1} height={3} />
            <rect x={7} y={9} width={2} height={3} />
          </g>
          {/* Splash of tender coconut water */}
          <g fill={WATER_CYAN}>
            <rect x={6} y={6} width={2} height={4} />
            <rect x={9} y={7} width={1} height={3} />
            <rect x={8} y={1} width={1} height={1} />
            <rect x={12} y={3} width={1} height={1} />
            <rect x={3} y={4} width={1} height={1} />
          </g>
        </>
      )}

      {/* Motion lines if flying / falling */}
      {(state === "falling" || state === "flying") && (
        <g fill="#ffffff" opacity={0.7}>
          <rect x={1} y={0} width={1} height={2} />
          <rect x={3} y={-1} width={1} height={2} />
          <rect x={13} y={-1} width={1} height={2} />
        </g>
      )}
    </svg>
  );
}
