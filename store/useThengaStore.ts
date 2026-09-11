import { create } from "zustand";
import { persist, createJSONStorage, type StateStorage } from "zustand/middleware";

export interface KolaItem {
  id: string;
  bunchCount: number;
  status: string;
  createdAt: string;
}

/* ------------------------------------------------------------------
 * SIMULATED FILESYSTEM (ThengaFS)
 * Nothing here touches the real machine. Every "file" is just data
 * in memory, and every "open" only shows an in-app dialog.
 * ------------------------------------------------------------------ */

export type ThengaFileKind = "thg" | "pdf" | "txt";

export type ThengaDialogTone = "info" | "warning" | "error";

export interface ThengaFile {
  id: string;
  name: string;
  kind: ThengaFileKind;
  size: string;
  /** Look of the simulated dialog shown on open */
  tone: ThengaDialogTone;
  dialogTitle: string;
  dialogLines: string[];
  footnote?: string;
  /** Opening this file also spawns a Kola in the shared store */
  spawnsKola?: boolean;
}

const THENGA_FILES: ThengaFile[] = [
  {
    id: "thenga",
    name: "thenga.thg",
    kind: "thg",
    size: "1.4 KB",
    tone: "info",
    dialogTitle: "THENGA VIEWER",
    dialogLines: [
      "Rendering coconut... done.",
      "Shape: Spheroid  •  Husk: Fibrous  •  Water: 240 ml",
      "This is a coconut. It is doing nothing. It is doing it well.",
    ],
    footnote: "Simulated preview. No coconuts were opened.",
  },
  {
    id: "thenga-kola",
    name: "thenga_kola.thg",
    kind: "thg",
    size: "6.2 KB",
    tone: "info",
    dialogTitle: "KOLA BUNDLE MOUNTED",
    dialogLines: [
      "Unpacking coconut cluster from archive...",
      "Cluster anchored to canopy layer 4.",
      "Check Kola Manager — the new Kola is listed there.",
    ],
    footnote: "Same cluster engine used by the 'thenga-kola' terminal command.",
    spawnsKola: true,
  },
  {
    id: "assignment-final",
    name: "assignment_final_FINAL.pdf",
    kind: "pdf",
    size: "812 KB",
    tone: "warning",
    dialogTitle: "VERSION CONFLICT",
    dialogLines: [
      "This document was superseded by assignment_final_FINAL_REAL.pdf.",
      "Which was superseded by nothing, because it was never written.",
      "Deadline status: aggressively approaching.",
    ],
    footnote: "ThengaFS cannot help you. ThengaFS is also a coconut.",
  },
  {
    id: "assignment-final-real",
    name: "assignment_final_FINAL_REAL.pdf",
    kind: "pdf",
    size: "4 KB",
    tone: "warning",
    dialogTitle: "DOCUMENT MOSTLY EMPTY",
    dialogLines: [
      "Page 1 of 1: the title, your name, and a lot of confidence.",
      "Word count: 11 (three of which are 'coconut').",
      "Suggested next step: open the other FINAL file. It is also empty.",
    ],
    footnote: "Simulated document. Contains no actual assignment.",
  },
  {
    id: "not-a-virus",
    name: "Definitely_Not_A_Virus.thg",
    kind: "thg",
    size: "0.5 KB",
    tone: "error",
    dialogTitle: "HUSK GUARD — THREAT SIMULATION",
    dialogLines: [
      "Scanning file... 100%",
      "Result: harmless. It is a coconut wearing a fake moustache.",
      "0 files touched. 0 commands run. 0 kernels harmed (there is no kernel).",
    ],
    footnote: "This is a joke dialog only. Nothing was executed or downloaded.",
  },
  {
    id: "dont-open",
    name: "dont_open_this.txt",
    kind: "txt",
    size: "0 KB",
    tone: "error",
    dialogTitle: "THENGA OS ERROR 0x4B4F4C41",
    dialogLines: [
      "It said DON'T OPEN THIS. You opened this.",
      "The coconut is disappointed but not surprised.",
      "System response: a single, slow, fibrous sigh.",
    ],
    footnote: "No real file was read. The husk remains intact.",
  },
];

/* ------------------------------------------------------------------
 * COPRA BIN (Recycle Bin)
 * A small, self-contained simulated bin. It is NOT wired to Explorer
 * deletion (that would require larger architectural changes) — it
 * has its own tiny predefined/generated coconut items instead.
 * ------------------------------------------------------------------ */

export interface CopraBinItem {
  id: string;
  name: string;
  size: string;
  deletedAt: string;
}

const INITIAL_BIN_ITEMS: CopraBinItem[] = [
  { id: "bin-seed-1", name: "old_husk_fragment.the", size: "3 KB", deletedAt: "Yesterday" },
  { id: "bin-seed-2", name: "expired_tender_water.thg", size: "1 KB", deletedAt: "2 days ago" },
];

const DELETABLE_ITEM_NAMES = [
  "rotten_copra_batch.the",
  "cracked_shell_fragment.thg",
  "spilled_tender_water.txt",
  "overripe_thenga.the",
  "husk_dust.tmp",
];

/* ------------------------------------------------------------------
 * ACHIEVEMENTS
 * Tiny unlock map, keyed by achievement id. No separate framework —
 * just a record + one action, persisted alongside the rest of state.
 * ------------------------------------------------------------------ */

export interface AchievementDef {
  id: string;
  name: string;
  description: string;
  emoji: string;
}

export const ACHIEVEMENTS: AchievementDef[] = [
  { id: "booted-thenga", name: "Booted the Thenga", description: "Opened THENGA OS.", emoji: "🥥" },
  { id: "first-kola", name: "First Kola", description: "Create a Kola.", emoji: "🌴" },
  { id: "terminal-survivor", name: "Terminal Survivor", description: "Use Terminal.", emoji: "💻" },
  { id: "file-explorer", name: "File Explorer", description: "Open a file.", emoji: "📁" },
  { id: "coconut-recycling", name: "Coconut Recycling", description: "Use Copra Bin.", emoji: "🗑" },
  { id: "questionable-mathematics", name: "Questionable Mathematics", description: "Attempt division by zero.", emoji: "🧮" },
  { id: "system-administrator", name: "System Administrator", description: "Open Task Manager.", emoji: "⚙" },
  { id: "coconut-physics", name: "Coconut Gravity", description: "Drop a coconut.", emoji: "🌊" },
  { id: "security-expert", name: "Security Expert", description: "Run Thenga Defender.", emoji: "🛡" },
  { id: "virus-removed", name: "Virus Removed", description: "Survive Definitely_Not_A_Virus.thg.", emoji: "🦠" },
  { id: "easter-egg", name: "Why Did You Click That?", description: "Found a secret.", emoji: "🐦" },
  { id: "thenga-had-enough", name: "Thenga Has Had Enough", description: "Triggered maximum annoyance.", emoji: "😤" },
];

/* ------------------------------------------------------------------
 * COCONUT EVENT LAYER
 * A tiny reusable event system so any part of the OS (errors, the
 * virus dialog, achievements, idle randomness) can make coconuts fall
 * across the whole desktop without each feature hand-rolling its own
 * animation. CoconutFallLayer renders these and removes them by id
 * once their fall animation finishes.
 * ------------------------------------------------------------------ */

export interface CoconutFall {
  id: number;
  x: number; // vw percentage across the desktop
  delayMs: number;
  durationMs: number;
  rotateDir: 1 | -1;
  size: number; // px
}

/* ------------------------------------------------------------------
 * MALAYALAM ANNOYANCE ESCALATION
 * Repeatedly poking the same interactive element (the mascot, mainly)
 * escalates the OS's reaction. Resets after a few seconds of quiet so
 * the joke stays a discoverable surprise rather than a running counter.
 * ------------------------------------------------------------------ */

const ANNOYANCE_RESET_MS = 5000;
const ANNOYANCE_MESSAGES = [
  "Bro.",
  "Enthina?",
  "Eda mone...",
  "Nirthada.",
];
const ANNOYANCE_MAX_MESSAGE = "THENGA OS HAS HAD ENOUGH.";

interface ThengaStore {
  kolas: KolaItem[];
  nextKolaId: number;
  createKola: () => KolaItem;
  /** Simulated filesystem shown in THENGA Explorer */
  files: ThengaFile[];
  /** File currently previewed in Explorer, null when no dialog is open */
  openedFileId: string | null;
  openFile: (id: string) => void;
  closeFile: () => void;
  /** Simulated Copra Bin contents */
  binItems: CopraBinItem[];
  nextBinItemId: number;
  deleteSimulatedItem: () => CopraBinItem;
  restoreBinItem: (id: string) => void;
  emptyBin: () => void;
  /** Achievement unlock state, keyed by achievement id */
  unlockedAchievements: Record<string, boolean>;
  unlockAchievement: (id: string) => void;
  /** Small non-blocking toast notification, shown by DesktopShell */
  toast: string | null;
  showToast: (message: string) => void;
  clearToast: () => void;
  /** Coconut Event Layer — see CoconutFallLayer */
  coconutFalls: CoconutFall[];
  nextCoconutFallId: number;
  spawnCoconutFall: (count?: number) => void;
  clearCoconutFall: (id: number) => void;
  /** Screen shake trigger for events and annoyance */
  screenShake: boolean;
  triggerScreenShake: () => void;
  /** Malayalam annoyance escalation — see bumpAnnoyance */
  annoyanceCount: number;
  lastAnnoyanceAt: number;
  bumpAnnoyance: () => string;
}

/* ------------------------------------------------------------------
 * PERSISTENCE (client-side only)
 * Only the Kola cluster state is meaningful to persist right now —
 * ThengaFS is a fixed, read-only file list (no create/rename/delete
 * yet) and openedFileId is transient dialog UI, so neither belongs
 * in long-term storage. If ThengaFS gains real mutations later, add
 * that slice to `partialize`/`merge` below.
 * ------------------------------------------------------------------ */

type PersistedThengaState = Pick<
  ThengaStore,
  "kolas" | "nextKolaId" | "binItems" | "nextBinItemId" | "unlockedAchievements"
>;

// No-op storage used during SSR / static build, where `window` and
// localStorage do not exist. Keeps `next build` and server rendering
// from crashing while still behaving correctly in the browser.
const noopStorage: StateStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
};

const thengaStorage = createJSONStorage<PersistedThengaState>(() =>
  typeof window !== "undefined" ? window.localStorage : noopStorage
);

export const useThengaStore = create<ThengaStore>()(
  persist(
    (set, get) => ({
      kolas: [],
      nextKolaId: 101,
      createKola: () => {
        const currentIdNum = get().nextKolaId;
        const id = `#kola-${currentIdNum}`;
        const bunchCount = Math.floor(Math.random() * 5) + 6; // 6 to 10 coconuts
        const createdAt = new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });

        const newKola: KolaItem = {
          id,
          bunchCount,
          status: "Mounted in Canopy",
          createdAt,
        };

        set((state) => ({
          nextKolaId: state.nextKolaId + 1,
          kolas: [newKola, ...state.kolas],
        }));

        get().unlockAchievement("first-kola");
        get().showToast("🥥 New Kola generated.");

        return newKola;
      },

      files: THENGA_FILES,
      openedFileId: null,

      // Opening a file only flips in-app state and shows a dialog.
      openFile: (id: string) => {
        const file = get().files.find((f) => f.id === id);
        if (!file) return;

        // Some files also trigger an existing simulated action
        if (file.spawnsKola) {
          get().createKola();
        }

        set({ openedFileId: id });
        get().unlockAchievement("file-explorer");
        get().showToast("📁 File opened.");
      },

      closeFile: () => set({ openedFileId: null }),

      binItems: INITIAL_BIN_ITEMS,
      nextBinItemId: 1,

      // Adds a harmless simulated item to the bin — no real file is touched.
      deleteSimulatedItem: () => {
        const currentIdNum = get().nextBinItemId;
        const name = DELETABLE_ITEM_NAMES[currentIdNum % DELETABLE_ITEM_NAMES.length];
        const sizeKb = Math.floor(Math.random() * 40) + 1;
        const deletedAt = new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });

        const newItem: CopraBinItem = {
          id: `bin-${currentIdNum}`,
          name,
          size: `${sizeKb} KB`,
          deletedAt,
        };

        set((state) => ({
          nextBinItemId: state.nextBinItemId + 1,
          binItems: [newItem, ...state.binItems],
        }));

        return newItem;
      },

      restoreBinItem: (id: string) => {
        set((state) => ({
          binItems: state.binItems.filter((item) => item.id !== id),
        }));
        get().showToast("🗑 Coconut restored.");
      },

      emptyBin: () => set({ binItems: [] }),

      unlockedAchievements: {},
      unlockAchievement: (id: string) => {
        if (get().unlockedAchievements[id]) return; // already unlocked
        const def = ACHIEVEMENTS.find((a) => a.id === id);
        set((state) => ({
          unlockedAchievements: { ...state.unlockedAchievements, [id]: true },
        }));
        if (def) {
          get().showToast(`🏆 Achievement unlocked: ${def.name}`);
        }
      },

      toast: null,
      showToast: (message: string) => set({ toast: message }),
      clearToast: () => set({ toast: null }),

      coconutFalls: [],
      nextCoconutFallId: 1,
      spawnCoconutFall: (count = 1) => {
        const startId = get().nextCoconutFallId;
        const newFalls: CoconutFall[] = Array.from({ length: count }, (_, i) => ({
          id: startId + i,
          x: 6 + Math.random() * 88,
          delayMs: Math.floor(Math.random() * count * 180),
          durationMs: 1100 + Math.floor(Math.random() * 500),
          rotateDir: Math.random() > 0.5 ? 1 : -1,
          size: 22 + Math.floor(Math.random() * 14),
        }));
        set((state) => ({
          nextCoconutFallId: startId + count,
          coconutFalls: [...state.coconutFalls, ...newFalls],
        }));
      },
      clearCoconutFall: (id: number) => {
        set((state) => ({
          coconutFalls: state.coconutFalls.filter((f) => f.id !== id),
        }));
      },

      screenShake: false,
      triggerScreenShake: () => {
        set({ screenShake: true });
        setTimeout(() => {
          set({ screenShake: false });
        }, 360);
      },

      annoyanceCount: 0,
      lastAnnoyanceAt: 0,
      bumpAnnoyance: () => {
        const now = Date.now();
        const isFresh = now - get().lastAnnoyanceAt < ANNOYANCE_RESET_MS;
        const nextCount = isFresh ? get().annoyanceCount + 1 : 1;

        if (nextCount > ANNOYANCE_MESSAGES.length) {
          set({ annoyanceCount: 0, lastAnnoyanceAt: now });
          get().unlockAchievement("thenga-had-enough");
          get().triggerScreenShake();
          get().spawnCoconutFall(5);
          return ANNOYANCE_MAX_MESSAGE;
        }

        set({ annoyanceCount: nextCount, lastAnnoyanceAt: now });
        if (nextCount === 1) get().unlockAchievement("easter-egg");
        return ANNOYANCE_MESSAGES[nextCount - 1];
      },
    }),
    {
      name: "thenga-os-storage",
      storage: thengaStorage,
      version: 1,
      partialize: (state): PersistedThengaState => ({
        kolas: state.kolas,
        nextKolaId: state.nextKolaId,
        binItems: state.binItems,
        nextBinItemId: state.nextBinItemId,
        unlockedAchievements: state.unlockedAchievements,
      }),
      // Fall back to current (default) state if saved data is missing,
      // corrupted, or the wrong shape, instead of trusting it blindly.
      merge: (persistedState, currentState) => {
        const persisted = persistedState as
          | Partial<PersistedThengaState>
          | null
          | undefined;

        const kolas = Array.isArray(persisted?.kolas)
          ? persisted.kolas
          : currentState.kolas;
        const nextKolaId =
          typeof persisted?.nextKolaId === "number"
            ? persisted.nextKolaId
            : currentState.nextKolaId;
        const binItems = Array.isArray(persisted?.binItems)
          ? persisted.binItems
          : currentState.binItems;
        const nextBinItemId =
          typeof persisted?.nextBinItemId === "number"
            ? persisted.nextBinItemId
            : currentState.nextBinItemId;
        const unlockedAchievements =
          persisted?.unlockedAchievements && typeof persisted.unlockedAchievements === "object"
            ? persisted.unlockedAchievements
            : currentState.unlockedAchievements;

        return {
          ...currentState,
          kolas,
          nextKolaId,
          binItems,
          nextBinItemId,
          unlockedAchievements,
        };
      },
    }
  )
);
