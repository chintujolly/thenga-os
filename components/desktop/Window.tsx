"use client";

import React, { useRef, useState, useEffect } from "react";
import { WindowState } from "@/types/window";
import { sound } from "@/utils/sound";

interface WindowProps {
  window: WindowState;
  children: React.ReactNode;
  icon?: React.ReactNode;
  isFocused?: boolean;
  onFocus: (id: WindowState["id"]) => void;
  onClose: (id: WindowState["id"]) => void;
  onMinimize: (id: WindowState["id"]) => void;
  onMaximizeToggle: (id: WindowState["id"]) => void;
  onMove: (id: WindowState["id"], newPos: { x: number; y: number }) => void;
}

/**
 * Window: Chunky retro OS window frame.
 * Distinct active/inactive title bars, small square controls,
 * sharp pixel corners, dark ink borders, and hard offset shadows.
 */
export default function Window({
  window: win,
  children,
  icon,
  isFocused = false,
  onFocus,
  onClose,
  onMinimize,
  onMaximizeToggle,
  onMove,
}: WindowProps) {
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<{
    startX: number;
    startY: number;
    initialX: number;
    initialY: number;
  }>({ startX: 0, startY: 0, initialX: 0, initialY: 0 });

  // Handle Drag Start
  const handleTitleBarMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0 || win.isMaximized) return;
    onFocus(win.id);
    setIsDragging(true);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialX: win.position.x,
      initialY: win.position.y,
    };
    e.preventDefault();
  };

  // Mouse move and mouse up listeners for window dragging
  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - dragRef.current.startX;
      const deltaY = e.clientY - dragRef.current.startY;

      const nextX = Math.max(0, dragRef.current.initialX + deltaX);
      const nextY = Math.max(0, dragRef.current.initialY + deltaY);

      onMove(win.id, { x: nextX, y: nextY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, onMove, win.id]);

  if (win.isMinimized) {
    return null;
  }

  const windowStyle: React.CSSProperties = win.isMaximized
    ? {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: win.zIndex,
      }
    : {
        position: "absolute",
        left: `${win.position.x}px`,
        top: `${win.position.y}px`,
        width: `${win.size.width}px`,
        height: `${win.size.height}px`,
        maxWidth: "calc(100vw - 12px)",
        maxHeight: "calc(100vh - 58px)",
        zIndex: win.zIndex,
      };

  return (
    <div
      style={windowStyle}
      onMouseDown={() => onFocus(win.id)}
      className={`thenga-window-in flex flex-col border-3 border-[#191008] overflow-hidden select-none font-mono ${
        win.isMaximized
          ? "rounded-none shadow-none"
          : isFocused
          ? "shadow-[5px_5px_0_#191008]"
          : "shadow-[3px_3px_0_#191008] opacity-95"
      }`}
      role="region"
      aria-label={`${win.title} Window`}
    >
      {/* Title Bar */}
      <div
        onMouseDown={handleTitleBarMouseDown}
        className={`h-8 px-2 border-b-2 border-[#191008] flex items-center justify-between cursor-grab active:cursor-grabbing ${
          isFocused ? "bg-[#f5a81e] text-[#191008]" : "bg-[#d8c593] text-[#191008]/70"
        } ${win.isMaximized ? "cursor-default active:cursor-default" : ""}`}
      >
        {/* App Icon & Title */}
        <div className="flex items-center gap-2 overflow-hidden pointer-events-none">
          {icon && <span className="shrink-0">{icon}</span>}
          <span className="font-bold text-[11px] truncate tracking-wider uppercase">
            {win.title}
          </span>
          {isFocused && (
            <span className="w-1.5 h-1.5 bg-[#2b9e38] inline-block border border-[#191008] shrink-0 ml-0.5" />
          )}
        </div>

        {/* Square Retro Control Buttons */}
        <div
          className="flex items-center gap-1 shrink-0"
          onMouseDown={(e) => e.stopPropagation()}
        >
          {/* Minimize [_] */}
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onMinimize(win.id);
            }}
            title="Minimize"
            aria-label="Minimize"
            className="w-5 h-5 border border-[#191008] bg-[#fdf7e7] hover:bg-white active:translate-y-[1px] flex items-center justify-center font-bold text-[10px] cursor-pointer shadow-[1px_1px_0_#191008]"
          >
            _
          </button>

          {/* Maximize [□] */}
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onMaximizeToggle(win.id);
            }}
            title={win.isMaximized ? "Restore" : "Maximize"}
            aria-label={win.isMaximized ? "Restore" : "Maximize"}
            className="w-5 h-5 border border-[#191008] bg-[#fdf7e7] hover:bg-white active:translate-y-[1px] flex items-center justify-center font-bold text-[10px] cursor-pointer shadow-[1px_1px_0_#191008]"
          >
            {win.isMaximized ? "❐" : "□"}
          </button>

          {/* Close [X] */}
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onClose(win.id);
            }}
            title="Close"
            aria-label="Close"
            className="w-5 h-5 border border-[#191008] bg-[#fdf7e7] hover:bg-[#c93b2b] hover:text-white active:translate-y-[1px] flex items-center justify-center font-bold text-[10px] cursor-pointer shadow-[1px_1px_0_#191008]"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Window Content Area */}
      <div className="flex-1 overflow-auto relative bg-[#fdf7e7] text-[#191008]">
        {children}
      </div>
    </div>
  );
}
