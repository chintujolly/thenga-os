export type WindowId = "terminal" | "explorer" | "kola-manager" | "bin" | "readme";

export interface WindowBounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface WindowState {
  id: WindowId;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  prevBounds?: WindowBounds;
  zIndex: number;
}
