import { create } from "zustand";

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
}

export const useThengaStore = create<ThengaStore>((set, get) => ({
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
}));
