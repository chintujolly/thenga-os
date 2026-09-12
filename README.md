# 🥥 THENGA OS

> An interactive browser-based operating system simulation for a coconut.

THENGA OS is an indie pixel-art computer environment set inside an illustrated Kerala landscape. The project is intentionally useless: coconuts do not need an operating system.

---

## What It Is (and What It Is NOT)

- **Simulated Operating System**: An application-level simulation running entirely in the browser.
- **No Real Kernel**: Does not interact with the host kernel, BIOS, or hardware.
- **No Real Filesystem**: ThengaFS is an in-memory simulated read-only file list.
- **No Backend or Database**: Zero external databases, Supabase, or server-side auth.
- **No AI / Chatbots**: Entirely deterministic retro software with Malayalam humor.

---

## Kerala Pixel-Art Desktop Environment

The desktop itself is an illustrated 16-bit tropical Kerala environment:
- **Tropical Sky**: Cyan sky with dual-layer drifting pixel clouds and pixel sun.
- **Western Ghats Hills**: Distant misty mountain silhouettes.
- **Traditional Architecture**: Sloped terracotta-tiled Kerala house with wooden eaves.
- **Electric Infrastructure**: Overhead utility pole with catenary power lines.
- **Coconut Palms**: Towering swaying palms with segmented trunks and coconut clusters.
- **Flying Crows**: Subtle pixel-art crows flying naturally across the upper sky with 2-frame flapping wings.
- **Soil & Earth**: Dithered soil, grass tufts, pebbles, and resting coconuts.

---

## Built-In Applications

All 10 applications are accessible from the desktop shortcuts and the Start Menu:

1. **THENGA Terminal** (`ThengaTerminal.tsx`):
   - Command-line interface with phosphor CRT styling.
   - Supported commands: `help`, `clear`, `whoami`, `thenga status`, `thenga-kola`, `thurakku`, `adakku`, `sudo thenga` (permission denied: coconut has no authority), `matrix` (falling coconut cascade).
   - Unknown commands return *"Enth thenga aan ith?"*; entering 3 consecutive invalid commands triggers a falling coconut.
   - Command history navigation via Up and Down arrow keys.

2. **THENGA Explorer** (`ThengaExplorer.tsx`):
   - Simulated file manager pointing to `C:\KERALA\CANOPY\`.
   - Pre-loaded with read-only simulated files (`thenga.thg`, `thenga_kola.thg`, `assignment_final_FINAL.pdf`, `assignment_final_FINAL_REAL.pdf`, `Definitely_Not_A_Virus.thg`, `dont_open_this.txt`).
   - Opening files displays text previews and humorous retro dialogs.

3. **Kola Manager** (`KolaManager.tsx`):
   - Inventory system displaying mounted coconut clusters (Kolas) with ID, bunch count, status, and creation time.
   - `+ MOUNT KOLA` mounts new clusters into the canopy (synchronized with Terminal).
   - `OPTIMIZE` button simulates fiber alignment (performance increase: 0%).

4. **Copra Bin** (`CopraBin.tsx`):
   - Simulated recycling bin with predefined discarded items.
   - `+ DELETE A COCONUT` creates a deleted coconut record.
   - Supports restoring coconuts and emptying the bin.

5. **Coconut Calculator** (`CoconutCalculator.tsx`):
   - Vintage pocket calculator with solar cell strip and chunky keys.
   - Standard arithmetic operations (+, -, ×, ÷) and decimal calculations.
   - Coconut Mode toggle.
   - Division by zero triggers *"Enth thenga aan ith?"*, error buzzer, screen shake, and a falling coconut event.

6. **Thenga Task Manager** (`ThengaTaskManager.tsx`):
   - Hardware diagnostic panel displaying CPU Usage (0.3%), Juice RAM (512 MB), and Husk Integrity (100%).
   - Lists open windows and simulated system processes (`CommonSense.exe`, `Purpose.exe`, `Kernel.sys`, `tender_water_d.sys`, `fiber_weave_daemon`).
   - "End Task" button: considered by coconut, then promptly refused.

7. **Coconut Physics** (`CoconutPhysics.tsx`):
   - Interactive mini sandbox with a draggable and tossable coconut sprite.
   - Selectable gravity presets: `EARTH` (980 px/s²), `KERALA` (1100 px/s²), `MOON` (160 px/s²), `JUPITER` (1600 px/s²), and `ABSOLUTE NONSENSE` (0 px/s²).
   - Features wall and floor collision, 45% restitution bouncing, rotational spin, and gravity punchlines.

8. **Thenga Defender** (`ThengaDefender.tsx`):
   - Retro antivirus utility with multi-step scanning: Husk → Juice → Coconut.
   - Identifies an undercover threat (`Definitely_Not_A_Virus.thg`).
   - `REMOVE THREAT` action discovers *"It was a coconut."*, spawns a falling coconut, triggers screen shake, and displays an *"Aiyyo."* toast.

9. **Achievements** (`ThengaAchievements.tsx`):
   - Tracks 8 unlockable pixel badges:
     - `booted-thenga`: Booted the Thenga
     - `first-kola`: First Kola
     - `questionable-mathematics`: Questionable Mathematics
     - `virus-removed`: Why Did You Open That?
     - `coconut-physics`: Coconut Fall
     - `security-expert`: Thenga Security
     - `easter-egg`: Patient User
     - `thenga-had-enough`: Thenga Master

10. **README.the** (`WindowPlaceholders.tsx`):
    - In-app official user manual with deadpan operational Q&A.

---

## Environmental Motion & Audio

- **Window Management**: Windows can be dragged across the workspace, minimized to the taskbar, maximized, restored, and focused with z-index ordering.
- **Retro Taskbar**: Start Menu with categorized sections (*SYSTEM*, *COCONUT*, *QUESTIONABLE NECESSITIES*), running window tabs, battery indicator, PalmLink-5G antenna, audio toggle, and digital clock.
- **8-Bit Web Audio Synthesizer** (`utils/sound.ts`): Synthesizes click blips, coconut impact thuds, error buzzers, chiptune fanfares, and chirps using the Web Audio API (zero audio file assets).
- **Falling Coconut Event Layer** (`CoconutFallLayer.tsx`): Coconuts fall from the canopy with tumbling rotation, ground impact bounce, roll, 8-bit thud, and workspace screen shake.
- **Malayalam Annoyance Escalation**: Clicking the ground coconut mascot escalates through classic Malayalam responses:
  1. *"Bro."*
  2. *"Enthina?"*
  3. *"Eda mone..."*
  4. *"Nirthada."*
  5. *"THENGA OS HAS HAD ENOUGH."* (triggers screen shake, falling coconut storm, and achievement unlock)
- **Interactive Crow**: Clicking the perching crow on the power line triggers a startled squawk, Malayalam exclamations (*"Daivame!"*, *"Enthina?"*), and causes it to fly away.
- **Client Persistence**: Kola clusters, Copra Bin items, and unlocked Achievements persist in browser `localStorage` under `thenga-os-storage`.

---

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4 + custom pixel-art CSS tokens
- **State Management**: Zustand (with `persist` middleware)
- **Audio**: Native Web Audio API

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
```
