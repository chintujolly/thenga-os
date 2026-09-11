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
  "kolas" | "nextKolaId" | "binItems" | "nextBinItemId"
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

      restoreBinItem: (id: string) =>
        set((state) => ({
          binItems: state.binItems.filter((item) => item.id !== id),
        })),

      emptyBin: () => set({ binItems: [] }),
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

        return { ...currentState, kolas, nextKolaId, binItems, nextBinItemId };
      },
    }
  )
);
