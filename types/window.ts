export type WindowId =
  | "terminal"
  | "explorer"
  | "kola-manager"
  | "bin"
  | "readme"
  | "calculator"
  | "task-manager"
  | "physics"
  | "defender"
  | "achievements";

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

/**
 * Per-app accent color, shared across desktop icons, taskbar tabs, and the
 * launcher so each app reads as itself while the OS chrome stays uniform —
 * "colorful but controlled" rather than a themed icon per surface.
 */
export const APP_ACCENT: Record<WindowId, string> = {
  terminal: "#2F6B3C",
  explorer: "#B97B3A",
  "kola-manager": "#2F8F5B",
  readme: "#3E7CB1",
  bin: "#C1592F",
  calculator: "#8B5FBF",
  "task-manager": "#3E7CB1",
  physics: "#D9552B",
  defender: "#1F9E8E",
  achievements: "#C99A1E",
};
