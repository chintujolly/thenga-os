"use client";

import React, { useEffect, useRef, useState } from "react";
import { useThengaStore } from "@/store/useThengaStore";
import PixelCoconut from "./PixelCoconut";
import { sound } from "@/utils/sound";

type Phase = "idle" | "dragging" | "falling" | "impact";
type GravityKey = "earth" | "kerala" | "moon" | "jupiter" | "nonsense";

interface GravityPreset {
  label: string;
  value: number;
}

const GRAVITY_PRESETS: Record<GravityKey, GravityPreset> = {
  earth: { label: "EARTH", value: 650 },
  kerala: { label: "KERALA", value: 648 },
  moon: { label: "MOON", value: 120 },
  jupiter: { label: "JUPITER", value: 1600 },
  nonsense: { label: "ABSOLUTE NONSENSE", value: 0 },
};

const COCONUT_SIZE = 40;
const RESTITUTION = 0.45;
const MAX_BOUNCES = 4;

export default function CoconutPhysics() {
  const unlockAchievement = useThengaStore((state) => state.unlockAchievement);
  const triggerScreenShake = useThengaStore((state) => state.triggerScreenShake);

  const boxRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [gravityKey, setGravityKey] = useState<GravityKey>("kerala");
  const [pos, setPos] = useState({ x: 140, y: 12 });
  const [rotation, setRotation] = useState(0);
  const [message, setMessage] = useState<string | null>(null);

  const velRef = useRef({ x: 0, y: 0 });
  const posRef = useRef({ x: 140, y: 12 });
  const rotRef = useRef(0);
  const bounceCountRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef(0);
  const dragHistoryRef = useRef<{ x: number; y: number; t: number }[]>([]);
  const gravityKeyRef = useRef<GravityKey>("kerala");
  const elapsedRef = useRef(0);

  useEffect(() => {
    gravityKeyRef.current = gravityKey;
  }, [gravityKey]);

  const boxSize = () => {
    const box = boxRef.current;
    return { w: box?.clientWidth ?? 360, h: box?.clientHeight ?? 230 };
  };

  const centerStart = () => {
    const { w } = boxSize();
    return { x: w / 2 - COCONUT_SIZE / 2, y: 12 };
  };

  const stopLoop = () => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  const settle = (finalPos: { x: number; y: number }) => {
    stopLoop();
    sound.playThud();
    triggerScreenShake();
    posRef.current = finalPos;
    setPos(finalPos);
    setPhase("impact");
    if (gravityKeyRef.current === "nonsense") {
      setMessage("Unfortunately, gravity has discovered coconut.");
    } else {
      setMessage("Coconut has discovered gravity.");
    }
  };

  const runLoop = () => {
    lastTsRef.current = performance.now();
    elapsedRef.current = 0;

    const tick = (now: number) => {
      const dt = Math.min((now - lastTsRef.current) / 1000, 0.032);
      lastTsRef.current = now;
      elapsedRef.current += dt;

      const { w, h } = boxSize();
      const preset = GRAVITY_PRESETS[gravityKeyRef.current];
      const p = posRef.current;
      const v = velRef.current;

      let ax = 0;
      let ay = preset.value;
      if (gravityKeyRef.current === "nonsense") {
        ax = Math.sin(elapsedRef.current * 3.5) * 850;
        ay = -160 + Math.cos(elapsedRef.current * 2.2) * 300;
      }

      v.x += ax * dt;
      v.y += ay * dt;
      let nx = p.x + v.x * dt;
      let ny = p.y + v.y * dt;

      rotRef.current += v.x * 0.15;
      setRotation(rotRef.current);

      const maxX = w - COCONUT_SIZE;
      const maxY = h - COCONUT_SIZE;

      // Wall bounces
      if (nx < 0) {
        nx = 0;
        v.x = -v.x * 0.5;
        sound.playClick();
      } else if (nx > maxX) {
        nx = maxX;
        v.x = -v.x * 0.5;
        sound.playClick();
      }

      // Ceiling
      if (ny < 0) {
        ny = 0;
        v.y = -v.y * 0.5;
      }

      // Ground Impact
      if (ny >= maxY) {
        ny = maxY;
        if (Math.abs(v.y) > 70 && bounceCountRef.current < MAX_BOUNCES) {
          sound.playThud();
          v.y = -v.y * RESTITUTION;
          v.x *= 0.65;
          bounceCountRef.current += 1;
        } else {
          posRef.current = { x: nx, y: ny };
          setPos({ x: nx, y: ny });
          settle({ x: nx, y: ny });
          return;
        }
      }

      posRef.current = { x: nx, y: ny };
      setPos({ x: nx, y: ny });
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
  };

  const drop = () => {
    stopLoop();
    sound.playClick();
    unlockAchievement("coconut-physics");
    bounceCountRef.current = 0;
    const start = centerStart();
    posRef.current = start;
    velRef.current = { x: (Math.random() - 0.5) * 60, y: 0 };
    setPos(start);
    setMessage(null);
    setPhase("falling");
    runLoop();
  };

  const reset = () => {
    stopLoop();
    sound.playClick();
    bounceCountRef.current = 0;
    const start = centerStart();
    posRef.current = start;
    velRef.current = { x: 0, y: 0 };
    rotRef.current = 0;
    setRotation(0);
    setPos(start);
    setMessage(null);
    setPhase("idle");
  };

  useEffect(() => stopLoop, []);

  // Pointer drag to throw
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    stopLoop();
    sound.playClick();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    dragHistoryRef.current = [{ x: pos.x, y: pos.y, t: performance.now() }];
    setPhase("dragging");
    setMessage(null);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (phase !== "dragging") return;
    const box = boxRef.current;
    if (!box) return;
    const rect = box.getBoundingClientRect();
    const { w, h } = boxSize();
    const nx = Math.min(Math.max(e.clientX - rect.left - COCONUT_SIZE / 2, 0), w - COCONUT_SIZE);
    const ny = Math.min(Math.max(e.clientY - rect.top - COCONUT_SIZE / 2, 0), h - COCONUT_SIZE);
    posRef.current = { x: nx, y: ny };
    setPos({ x: nx, y: ny });
    dragHistoryRef.current.push({ x: nx, y: ny, t: performance.now() });
    if (dragHistoryRef.current.length > 5) dragHistoryRef.current.shift();
  };

  const handlePointerUp = () => {
    if (phase !== "dragging") return;
    const history = dragHistoryRef.current;
    const first = history[0];
    const last = history[history.length - 1];
    const dt = Math.max((last.t - first.t) / 1000, 0.001);
    const vx = history.length > 1 ? ((last.x - first.x) / dt) * 0.45 : 0;
    const vy = history.length > 1 ? ((last.y - first.y) / dt) * 0.45 : 0;
    velRef.current = { x: vx, y: vy };
    bounceCountRef.current = 0;
    unlockAchievement("coconut-physics");
    setPhase("falling");
    runLoop();
  };

  return (
    <div className="flex flex-col h-full bg-[#fdf7e7] text-[#191008] select-none font-mono text-xs">
      {/* Header */}
      <div className="p-2.5 bg-[#ecdba8] border-b-2 border-[#191008] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <PixelCoconut state="falling" size={20} />
          <span className="font-bold text-[11px] uppercase tracking-wider">
            COCONUT PHYSICS LAB
          </span>
        </div>
        <span className="text-[10px] text-[#6b4728] font-bold">
          GRAVITY ENGINE v0.1
        </span>
      </div>

      {/* Mode Buttons Bar */}
      <div className="p-2 bg-[#f4ebd2] border-b-2 border-[#191008] flex flex-wrap gap-1 items-center">
        <span className="text-[10px] font-bold text-[#6b4728] mr-1">MODE:</span>
        {(Object.keys(GRAVITY_PRESETS) as GravityKey[]).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => {
              sound.playClick();
              setGravityKey(key);
            }}
            className={`thenga-pixel-btn px-2 py-0.5 text-[10px] font-bold ${
              gravityKey === key
                ? "bg-[#f5a81e] text-[#191008]"
                : "bg-white text-[#191008] hover:bg-[#fffdf6]"
            }`}
          >
            {GRAVITY_PRESETS[key].label}
          </button>
        ))}
      </div>

      {/* Mini Pixel-Art Sandbox Arena */}
      <div className="p-3 flex-1 flex flex-col">
        <div
          ref={boxRef}
          className="relative flex-1 min-h-[220px] border-3 border-[#191008] overflow-hidden bg-[#5bb9e8] shadow-[inset_2px_2px_0_rgba(0,0,0,0.2)] touch-none"
        >
          {/* Mini Pixel Clouds in Arena */}
          <div className="absolute top-4 left-6 opacity-80 pointer-events-none">
            <div className="w-16 h-3 bg-white" />
            <div className="w-10 h-2 bg-white -mt-1 ml-3" />
          </div>
          <div className="absolute top-10 right-8 opacity-75 pointer-events-none">
            <div className="w-20 h-4 bg-white" />
            <div className="w-12 h-2 bg-white -mt-1 ml-4" />
          </div>

          {/* Mini Pixel Palm Silhouette on the left */}
          <div className="absolute bottom-6 left-2 pointer-events-none opacity-40">
            <div className="w-2 h-20 bg-[#48260e]" />
            <div className="w-12 h-4 bg-[#1b6329] -mt-20 -ml-5" />
          </div>

          {/* Ground Soil & Grass Strip */}
          <div className="absolute bottom-0 inset-x-0 h-6 bg-[#543114] border-t-2 border-[#191008]">
            <div className="h-1 bg-[#278d38] w-full" />
          </div>

          {/* The Physical Draggable Coconut */}
          <div
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            className={`absolute select-none ${
              phase === "dragging" ? "cursor-grabbing scale-110" : "cursor-grab"
            }`}
            style={{
              left: pos.x,
              top: pos.y,
              width: COCONUT_SIZE,
              height: COCONUT_SIZE,
              touchAction: "none",
            }}
            title="Drag and throw me"
          >
            <PixelCoconut
              state={phase === "dragging" ? "selected" : phase === "impact" ? "sitting" : "falling"}
              size={COCONUT_SIZE}
              rotation={rotation}
            />
          </div>

          {/* Impact message banner */}
          {message && (
            <div className="absolute inset-x-4 bottom-8 flex justify-center pointer-events-none">
              <div className="thenga-pixel-frame-sm px-3 py-1.5 bg-[#fdf7e7] text-center shadow-[3px_3px_0_#191008]">
                <div className="font-bold text-xs text-[#191008]">
                  {message}
                </div>
              </div>
            </div>
          )}

          {phase === "idle" && !message && (
            <div className="absolute inset-x-0 bottom-8 text-center text-[10px] text-white font-bold drop-shadow-sm pointer-events-none">
              DRAG &amp; THROW, OR CLICK &ldquo;DROP&rdquo; BELOW
            </div>
          )}
        </div>

        {/* Controls bar */}
        <div className="flex items-center gap-2 mt-2.5">
          <button
            type="button"
            onClick={drop}
            disabled={phase === "falling" || phase === "dragging"}
            className="thenga-pixel-btn px-3 py-1.5 font-bold text-xs bg-[#2b9e38] text-white hover:bg-[#34b542] disabled:opacity-40"
          >
            DROP COCONUT
          </button>
          <button
            type="button"
            onClick={reset}
            className="thenga-pixel-btn px-3 py-1.5 font-bold text-xs bg-white hover:bg-[#fffdf6]"
          >
            RESET
          </button>
          <span className="ml-auto text-[10px] text-[#6b4728] font-bold">
            RESTITUTION: {RESTITUTION * 100}%
          </span>
        </div>
      </div>
    </div>
  );
}
