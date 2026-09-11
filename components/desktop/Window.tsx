"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import { Minus, Square, Copy, X } from "lucide-react";
import { WindowState } from "@/types/window";

interface WindowProps {
  window: WindowState;
  children: React.ReactNode;
  icon?: React.ReactNode;
  onFocus: (id: WindowState["id"]) => void;
  onClose: (id: WindowState["id"]) => void;
  onMinimize: (id: WindowState["id"]) => void;
  onMaximizeToggle: (id: WindowState["id"]) => void;
  onMove: (id: WindowState["id"], newPos: { x: number; y: number }) => void;
}

export default function Window({
  window: win,
  children,
  icon,
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
    // Only drag with left click and avoid dragging when maximized
    if (e.button !== 0 || win.isMaximized) return;

    // Bring to front
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

  // Mouse move and mouse up listeners for dragging
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

  // If minimized, do not display in the workspace
  if (win.isMinimized) {
    return null;
  }

  // Dynamic window position and sizing styles
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
        maxWidth: "calc(100vw - 16px)",
        maxHeight: "calc(100vh - 64px)",
        zIndex: win.zIndex,
      };

  return (
    <div
      style={windowStyle}
      onMouseDown={() => onFocus(win.id)}
      className={`flex flex-col bg-[#140e08]/95 backdrop-blur-xl border border-[#4d3622] shadow-[0_16px_36px_rgba(0,0,0,0.6)] overflow-hidden transition-all duration-75 ${
        win.isMaximized ? "rounded-none" : "rounded-xl"
      }`}
      role="region"
      aria-label={`${win.title} Window`}
    >
      {/* Window Title Bar */}
      <div
        onMouseDown={handleTitleBarMouseDown}
        className={`h-9 px-3 bg-gradient-to-r from-[#2a1c12] via-[#20150d] to-[#180f09] border-b border-[#3e2b1b] flex items-center justify-between select-none cursor-grab active:cursor-grabbing ${
          win.isMaximized ? "cursor-default active:cursor-default" : ""
        }`}
      >
        {/* App Icon & Title */}
        <div className="flex items-center gap-2 overflow-hidden pointer-events-none">
          {icon && <span className="text-amber-400 shrink-0">{icon}</span>}
          <span className="font-mono font-semibold text-xs text-amber-100 truncate tracking-wide">
            {win.title}
          </span>
        </div>

        {/* Window Controls (Minimize, Maximize/Restore, Close) */}
        <div
          className="flex items-center gap-1.5 shrink-0"
          onMouseDown={(e) => e.stopPropagation()}
        >
          {/* Minimize Button */}
          <button
            type="button"
            onClick={() => onMinimize(win.id)}
            title="Minimize"
            aria-label="Minimize"
            className="w-6 h-6 rounded flex items-center justify-center text-amber-300/80 hover:text-amber-100 hover:bg-amber-900/40 border border-transparent hover:border-amber-700/50 transition-colors cursor-pointer"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>

          {/* Maximize / Restore Button */}
          <button
            type="button"
            onClick={() => onMaximizeToggle(win.id)}
            title={win.isMaximized ? "Restore" : "Maximize"}
            aria-label={win.isMaximized ? "Restore" : "Maximize"}
            className="w-6 h-6 rounded flex items-center justify-center text-amber-300/80 hover:text-amber-100 hover:bg-amber-900/40 border border-transparent hover:border-amber-700/50 transition-colors cursor-pointer"
          >
            {win.isMaximized ? (
              <Copy className="w-3 h-3 rotate-180" />
            ) : (
              <Square className="w-3 h-3" />
            )}
          </button>

          {/* Close Button */}
          <button
            type="button"
            onClick={() => onClose(win.id)}
            title="Close"
            aria-label="Close"
            className="w-6 h-6 rounded flex items-center justify-center text-amber-300/80 hover:text-red-200 hover:bg-red-900/60 border border-transparent hover:border-red-600/50 transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Window Content Area */}
      <div className="flex-1 overflow-auto relative bg-[#0e0a06]">
        {children}
      </div>
    </div>
  );
}
