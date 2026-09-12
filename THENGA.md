# THENGA OS

## Concept

THENGA OS is a browser-based interactive operating system simulation for a coconut.

The project is intentionally useless:
coconuts do not need an operating system.

## Important

This is NOT a real operating system or kernel.

It is an application-level OS simulation running in the browser.

## Tech Stack

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- Zustand (with localStorage persistence)
- Web Audio API (custom 8-bit retro sound synthesizer)

## Architecture

UI Components → Zustand Store (`useThengaStore`) / Web Audio (`sound`) → State / Events

## Core Features (Implemented)

1. Boot screen (simulated BIOS sequence with skip option)
2. Desktop (16-bit Kerala pixel-art landscape with sky, drifting clouds, mountains, palms, house, power lines, and flying crows)
3. Window system (draggable, minimizable, maximizable, focus/z-index management)
4. Taskbar & Start Menu (categorized launcher, window tabs, system tray with battery, network, audio toggle, and clock)
5. THENGA Terminal (commands: `help`, `clear`, `whoami`, `thenga status`, `thenga-kola`, `thurakku`, `adakku`, `sudo thenga`, `matrix`, command history, and coconut drop on repeated errors)
6. THENGA Explorer (simulated read-only ThengaFS files with text previews and humorous dialogs)
7. Kola Manager (mounted coconut cluster manager synchronized with Terminal)
8. Copra Bin (simulated recycling bin with delete, restore, and empty actions)
9. Coconut Calculator (arithmetic operations, Coconut Mode, and division-by-zero reaction)
10. Thenga Task Manager (CPU/Juice RAM/Husk stats, background process list, and "End Task" refusal)
11. Coconut Physics (mini sandbox with gravity presets: Earth, Kerala, Moon, Jupiter, Absolute Nonsense)
12. Thenga Defender (antivirus scanner with threat detection and removal)
13. Achievements (8 unlockable badges tracked in store and persisted in localStorage)
14. Sound effects (synthesized 8-bit audio: click, thud, buzzer, fanfare, chirp)
15. Environmental events (falling coconut physics event, Malayalam annoyance escalation, flying birds)

## Rules

- No real kernel.
- No real filesystem access (ThengaFS is completely simulated in memory).
- No backend or external database.
- No authentication or user accounts.
- No AI chatbot or browser apps.
- Keep code clean, typed, and dependency-light.
- Test after every change.

## Development Strategy

Build small features and test them before moving on.

AI is an accelerator, not a dependency.

Architecture, decisions, integration, testing and scope control are handled by the team.