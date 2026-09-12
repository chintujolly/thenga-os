"use client";

import React, { useState } from "react";
import { sound } from "@/utils/sound";
import { useThengaStore } from "@/store/useThengaStore";

/**
 * PixelCrow: Clickable interactive easter egg perching on the power line.
 * When clicked, it plays a squawk blip, flies away with an animation,
 * and displays a classic Kerala exclamation toast.
 */
export function PixelCrow({ onCrowClick }: { onCrowClick?: () => void }) {
  const [flying, setFlying] = useState(false);
  const [departed, setDeparted] = useState(false);

  if (departed) return null;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playChirp();
    setFlying(true);
    const reactions = ["Daivame!", "Enthina?", "Vere pani nokk.", "Aiyyo!"];
    const text = reactions[Math.floor(Math.random() * reactions.length)];
    useThengaStore.getState().showToast(`🐦 ${text}`);
    useThengaStore.getState().unlockAchievement("easter-egg");
    if (onCrowClick) onCrowClick();
    setTimeout(() => setDeparted(true), 1200);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      title="A common Kerala crow perching quietly."
      className={`absolute cursor-pointer select-none transition-transform z-10 ${
        flying ? "-translate-y-24 -translate-x-32 opacity-0 duration-1000 ease-in" : "hover:scale-125 duration-100"
      }`}
      style={{ top: "39%", left: "28%" }}
    >
      <svg
        width="18"
        height="14"
        viewBox="0 0 14 12"
        shapeRendering="crispEdges"
        className="drop-shadow-sm"
        aria-hidden="true"
      >
        {/* Crow Body & Feathers */}
        <g fill="#16110d">
          <rect x={3} y={4} width={7} height={5} />
          <rect x={2} y={5} width={1} height={3} />
          <rect x={1} y={6} width={1} height={2} />
          <rect x={10} y={3} width={3} height={3} />
          <rect x={4} y={9} width={1} height={3} />
          <rect x={7} y={9} width={1} height={3} />
        </g>
        {/* Beak */}
        <rect x={13} y={4} width={2} height={1} fill="#e59819" />
        {/* Eye */}
        <rect x={11} y={3} width={1} height={1} fill="#ffffff" />
        {/* Wing feather highlight */}
        <rect x={4} y={5} width={4} height={2} fill="#2c2118" />
      </svg>
    </button>
  );
}

/**
 * PixelScenery: The entire pixel-art Kerala desktop world.
 * Layered from back to front:
 * 1. Tropical gradient sky + pixel sun
 * 2. Drifting pixel clouds
 * 3. Distant misty Western Ghats / Kerala hills
 * 4. Midground Kerala house with red terracotta tiled roof
 * 5. Overhead electric pole with hanging power cables
 * 6. High-detail coconut palms (segmented trunks, layered fronds, bunches)
 * 7. Grass, earth, fallen fronds, stones, and resting coconuts
 */
export default function PixelScenery() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
      {/* Sky Canvas SVG */}
      <svg
        className="w-full h-full"
        viewBox="0 0 320 180"
        preserveAspectRatio="xMidYMid slice"
        shapeRendering="crispEdges"
      >
        <defs>
          <linearGradient id="thengaSkyGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#48b8ec" />
            <stop offset="45%" stopColor="#6fd2f4" />
            <stop offset="70%" stopColor="#92e2fa" />
            <stop offset="72%" stopColor="#1e7834" />
            <stop offset="100%" stopColor="#145223" />
          </linearGradient>

          {/* Dither pattern for ground soil */}
          <pattern id="soilDither" width="4" height="4" patternUnits="userSpaceOnUse">
            <rect width="4" height="4" fill="#4d2b10" />
            <rect x="0" y="0" width="2" height="2" fill="#5c3414" />
            <rect x="2" y="2" width="2" height="2" fill="#3c200c" />
          </pattern>
        </defs>

        {/* Backdrop Fill */}
        <rect width="320" height="180" fill="url(#thengaSkyGradient)" />

        {/* Sun in upper sky with warm pixel aura */}
        <g opacity={0.95}>
          <rect x={268} y={12} width={12} height={12} fill="#fff275" />
          <rect x={266} y={14} width={16} height={8} fill="#ffea54" />
          <rect x={270} y={10} width={8} height={16} fill="#ffea54" />
          <rect x={270} y={14} width={8} height={8} fill="#ffffff" />
        </g>

        {/* Clouds: Far Layer (moving slower) */}
        <g opacity={0.75} className="thenga-cloud-move-2">
          {/* Cloud 1 */}
          <rect x={20} y={18} width={24} height={5} fill="#ffffff" />
          <rect x={24} y={14} width={16} height={4} fill="#ffffff" />
          <rect x={28} y={11} width={8} height={3} fill="#ffffff" />
          <rect x={20} y={23} width={24} height={2} fill="#d2ecf7" />

          {/* Cloud 2 */}
          <rect x={170} y={26} width={32} height={6} fill="#ffffff" />
          <rect x={176} y={22} width={20} height={4} fill="#ffffff" />
          <rect x={170} y={32} width={32} height={2} fill="#d2ecf7" />
        </g>

        {/* Clouds: Near Layer */}
        <g opacity={0.92} className="thenga-cloud-move-1">
          {/* Cloud 3 */}
          <rect x={85} y={16} width={38} height={8} fill="#ffffff" />
          <rect x={92} y={10} width={24} height={6} fill="#ffffff" />
          <rect x={98} y={6} width={12} height={4} fill="#ffffff" />
          <rect x={85} y={24} width={38} height={3} fill="#c1e3f2" />
        </g>

        {/* Distant Misty Kerala Hills / Western Ghats */}
        {/* Layer 1: Farthest pale hills */}
        <g fill="#37935a" opacity={0.5}>
          <path d="M0 128 L28 116 L65 125 L110 114 L160 126 L210 112 L265 124 L320 115 L320 135 L0 135 Z" />
        </g>
        {/* Layer 2: Mid-distance green ridges */}
        <g fill="#247842" opacity={0.75}>
          <path d="M0 132 L40 122 L90 130 L135 121 L185 131 L240 120 L295 129 L320 123 L320 140 L0 140 Z" />
        </g>
        {/* Layer 3: Dense Kerala tropical greenery backdrop */}
        <g fill="#185c2c">
          <rect x={0} y={130} width={320} height={12} />
          {/* Tree crown undulations */}
          {[0, 18, 35, 52, 70, 88, 105, 122, 140, 158, 175, 192, 210, 228, 245, 262, 280, 298, 312].map((x, i) => (
            <rect key={i} x={x} y={126 - (i % 3) * 2} width={14} height={6} fill="#1d6b34" />
          ))}
        </g>

        {/* Kerala House Silhouette (Terracotta tiled roof, wooden eaves) */}
        <g transform="translate(136, 108)">
          {/* Walls - Warm Kerala cream plaster */}
          <rect x={10} y={16} width={36} height={14} fill="#eedec0" />
          <rect x={12} y={18} width={8} height={10} fill="#694322" /> {/* Window */}
          <rect x={14} y={18} width={4} height={10} fill="#38210f" />
          <rect x={30} y={18} width={8} height={12} fill="#694322" /> {/* Door */}
          <rect x={32} y={20} width={4} height={10} fill="#38210f" />

          {/* Sloped Terracotta Roof */}
          <path d="M6 16 L28 4 L50 16 Z" fill="#b84627" />
          {/* Roof Ridge & Shading */}
          <path d="M28 4 L50 16 L48 17 L28 6 Z" fill="#913113" />
          {/* Tile stepped ridges */}
          <line x1={12} y1={13} x2={44} y2={13} stroke="#913113" strokeWidth={1} />
          <line x1={18} y1={9} x2={38} y2={9} stroke="#913113" strokeWidth={1} />
          {/* Eaves overhang */}
          <rect x={4} y={16} width={48} height={2} fill="#4d2410" />
        </g>

        {/* Kerala Overhead Utility Pole & Power Lines */}
        <g stroke="#1a120b" strokeWidth={1}>
          {/* Left Pole */}
          <rect x={60} y={84} width={3} height={52} fill="#3a2414" stroke="none" />
          <rect x={55} y={88} width={13} height={2} fill="#4e331f" stroke="none" />
          {/* Insulators */}
          <rect x={55} y={87} width={2} height={1} fill="#e5f5f7" stroke="none" />
          <rect x={66} y={87} width={2} height={1} fill="#e5f5f7" stroke="none" />

          {/* Right Pole */}
          <rect x={245} y={92} width={3} height={46} fill="#3a2414" stroke="none" />
          <rect x={240} y={96} width={13} height={2} fill="#4e331f" stroke="none" />
          <rect x={240} y={95} width={2} height={1} fill="#e5f5f7" stroke="none" />
          <rect x={251} y={95} width={2} height={1} fill="#e5f5f7" stroke="none" />

          {/* Power Cable with gentle catenary curve */}
          <path d="M0 91 Q 30 96, 56 88 Q 150 106, 241 96 Q 280 92, 320 89" fill="none" stroke="#1f1812" strokeWidth={0.8} />
          <path d="M0 96 Q 30 101, 67 88 Q 150 110, 252 96 Q 285 93, 320 92" fill="none" stroke="#1f1812" strokeWidth={0.8} />
        </g>

        {/* Foreground Earth Ground & Soil Foundation */}
        <rect x={0} y={138} width={320} height={42} fill="url(#soilDither)" />
        {/* Grass tufts & top soil layer */}
        <rect x={0} y={136} width={320} height={3} fill="#278d38" />
        <rect x={0} y={135} width={320} height={1} fill="#54b83b" />

        {/* Grass Blades / Texture */}
        {[8, 22, 38, 54, 76, 95, 114, 138, 160, 185, 204, 225, 250, 275, 292, 308].map((gx, i) => (
          <g key={gx} fill="#54b83b">
            <rect x={gx} y={132} width={1.5} height={3} />
            <rect x={gx + 2} y={133} width={1.5} height={2} />
            <rect x={gx - 1.5} y={134} width={1} height={1} fill="#278d38" />
          </g>
        ))}

        {/* Settled fallen coconuts on the ground */}
        <g transform="translate(18, 142)">
          <rect x={0} y={2} width={5} height={4} fill="#191008" />
          <rect x={1} y={1} width={3} height={6} fill="#613919" />
          <rect x={1} y={2} width={1} height={2} fill="#824f28" />
        </g>
        <g transform="translate(26, 145)">
          <rect x={0} y={1} width={4} height={3} fill="#191008" />
          <rect x={1} y={1} width={2} height={3} fill="#613919" />
        </g>
        <g transform="translate(295, 144)">
          <rect x={0} y={1} width={5} height={4} fill="#191008" />
          <rect x={1} y={1} width={3} height={4} fill="#613919" />
          <rect x={1} y={2} width={1} height={1} fill="#824f28" />
        </g>

        {/* Small river stones / pebbles */}
        <rect x={82} y={146} width={4} height={2} fill="#756758" />
        <rect x={180} y={148} width={5} height={2} fill="#5e5143" />
        <rect x={240} y={145} width={3} height={2} fill="#756758" />

        {/* ==========================================================
         * TALL KERALA COCONUT PALM (LEFT SIDE)
         * Tall, gently curved segmented trunk, dark outline, coconut cluster,
         * majestic fan of pixel fronds with sway animation.
         * ========================================================== */}
        <g>
          {/* Segmented leaning trunk */}
          <g fill="#5a3418">
            <path d="M 12 142 L 15 142 L 16 122 L 14 100 L 13 80 L 14 58 L 16 38 L 18 20 L 13 20 L 11 38 L 9 58 L 8 80 L 9 100 L 10 122 Z" fill="#693c1b" stroke="#1c1108" strokeWidth={1} />
            {/* Trunk notch ridges */}
            {[25, 33, 41, 49, 57, 65, 73, 81, 89, 97, 105, 113, 121, 129, 137].map((ty, i) => (
              <line key={ty} x1={9 + (i < 8 ? i * 0.4 : 3)} y1={ty} x2={15 + (i < 8 ? i * 0.4 : 3)} y2={ty} stroke="#3d210d" strokeWidth={1.2} />
            ))}
          </g>

          {/* Coconut Palm Crown (with swaying animation) */}
          <g className="thenga-sway" style={{ transformOrigin: "16px 20px" }}>
            {/* Hanging Coconut Cluster in canopy */}
            <g fill="#543015" stroke="#1c1108" strokeWidth={0.8}>
              <rect x={12} y={21} width={4} height={4} />
              <rect x={15} y={23} width={4} height={4} />
              <rect x={11} y={25} width={4} height={4} />
              <rect x={16} y={20} width={4} height={4} />
              <rect x={18} y={24} width={4} height={4} />
              {/* Highlights on coconuts */}
              <rect x={13} y={22} width={1} height={1} fill="#824f28" stroke="none" />
              <rect x={16} y={24} width={1} height={1} fill="#824f28" stroke="none" />
            </g>

            {/* Frond Blades: Left & Top & Right radiating fans */}
            {/* Frond 1: Arching Left Down */}
            <path d="M 15 20 Q 2 24, -12 36 Q 0 28, 15 20" fill="#1b6329" stroke="#123d1b" strokeWidth={0.8} />
            <path d="M -12 36 L -8 32 L -4 34 L 2 26 L 8 23" stroke="#2b873d" strokeWidth={1.2} strokeDasharray="2,2" />

            {/* Frond 2: Upper Left Arch */}
            <path d="M 15 18 Q 4 10, -6 16 Q 6 14, 15 18" fill="#258238" stroke="#123d1b" strokeWidth={0.8} />

            {/* Frond 3: Reaching Upwards Left */}
            <path d="M 16 17 Q 8 2, 4 -4 Q 12 6, 16 17" fill="#329944" stroke="#123d1b" strokeWidth={0.8} />

            {/* Frond 4: Upright Crest */}
            <path d="M 16 16 Q 16 -6, 20 -10 Q 22 2, 16 16" fill="#3db352" stroke="#123d1b" strokeWidth={0.8} />

            {/* Frond 5: Upper Right Arch */}
            <path d="M 17 18 Q 28 6, 42 8 Q 30 14, 17 18" fill="#329944" stroke="#123d1b" strokeWidth={0.8} />

            {/* Frond 6: Arching Right Downwards */}
            <path d="M 17 20 Q 34 22, 48 30 Q 32 26, 17 20" fill="#258238" stroke="#123d1b" strokeWidth={0.8} />

            {/* Frond 7: Sweeping Right Mid */}
            <path d="M 16 22 Q 30 32, 42 45 Q 26 34, 16 22" fill="#1b6329" stroke="#123d1b" strokeWidth={0.8} />
          </g>
        </g>

        {/* ==========================================================
         * SECOND KERALA COCONUT PALM (RIGHT SIDE)
         * Frames the desktop beautifully on the right
         * ========================================================== */}
        <g>
          <g fill="#693c1b" stroke="#1c1108" strokeWidth={1}>
            <path d="M 306 144 L 309 144 L 307 118 L 303 94 L 298 72 L 294 50 L 290 32 L 286 32 L 290 50 L 294 72 L 299 94 L 303 118 Z" />
          </g>
          {/* Right Palm Crown with gentle slow sway */}
          <g className="thenga-sway-slow" style={{ transformOrigin: "288px 32px" }}>
            {/* Coconut bunch */}
            <g fill="#543015" stroke="#1c1108" strokeWidth={0.8}>
              <rect x={285} y={33} width={4} height={4} />
              <rect x={288} y={35} width={4} height={4} />
              <rect x={283} y={36} width={4} height={4} />
            </g>
            {/* Right Crown Fronds */}
            <path d="M 288 32 Q 272 16, 252 20 Q 270 24, 288 32" fill="#258238" stroke="#123d1b" strokeWidth={0.8} />
            <path d="M 288 30 Q 284 8, 276 -2 Q 286 12, 288 30" fill="#3db352" stroke="#123d1b" strokeWidth={0.8} />
            <path d="M 288 32 Q 306 16, 324 22 Q 308 26, 288 32" fill="#329944" stroke="#123d1b" strokeWidth={0.8} />
            <path d="M 288 34 Q 310 32, 334 44 Q 310 40, 288 34" fill="#1b6329" stroke="#123d1b" strokeWidth={0.8} />
            <path d="M 286 35 Q 268 36, 250 48 Q 270 42, 286 35" fill="#1b6329" stroke="#123d1b" strokeWidth={0.8} />
          </g>
        </g>
      </svg>

      {/* Subtle Flying Pixel Birds / Crows in the Sky */}
      <div className="thenga-bird-flyer-1" aria-hidden="true">
        <FlyingPixelCrow size={16} wingClass="thenga-bird-wings" />
      </div>
      <div className="thenga-bird-flyer-2" aria-hidden="true">
        <FlyingPixelCrow size={13} wingClass="thenga-bird-wings-slow" />
      </div>
      <div className="thenga-bird-flyer-3" aria-hidden="true">
        <FlyingPixelCrow size={10} wingClass="thenga-bird-wings" />
      </div>

      {/* Interactive Perching Crow on the powerline */}
      <PixelCrow />
    </div>
  );
}

/**
 * FlyingPixelCrow: Subtle pixel-art crow flying gently across the sky.
 * Pure pixel edges, dark silhouette, yellow beak, and 2-frame flapping wings.
 */
function FlyingPixelCrow({ size = 16, wingClass = "thenga-bird-wings" }: { size?: number; wingClass?: string }) {
  return (
    <svg
      width={size}
      height={Math.round(size * 0.7)}
      viewBox="0 0 16 11"
      shapeRendering="crispEdges"
      className="drop-shadow-xs select-none pointer-events-none"
      aria-hidden="true"
    >
      {/* Body, head & tail in silhouette */}
      <g fill="#16110d">
        <rect x={4} y={4} width={6} height={4} />
        <rect x={10} y={3} width={3} height={3} />
        <rect x={1} y={5} width={3} height={2} />
        <rect x={0} y={6} width={1} height={1} />
      </g>
      {/* Beak */}
      <rect x={13} y={4} width={2} height={1} fill="#e59819" />
      {/* Eye */}
      <rect x={11} y={3} width={1} height={1} fill="#ffffff" />
      {/* Feather shading */}
      <rect x={5} y={7} width={4} height={1} fill="#2c2118" />

      {/* Flapping Wings */}
      <g className={wingClass}>
        <rect x={5} y={1} width={4} height={3} fill="#16110d" />
        <rect x={6} y={0} width={2} height={1} fill="#2c2118" />
        <rect x={4} y={2} width={2} height={2} fill="#16110d" />
      </g>
    </svg>
  );
}
