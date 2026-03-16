# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

DW Tailored Systems — a high-end, minimalistic portfolio site with an integrated AI concierge powered by Claude 3 Opus.

## Tech Stack

- **Frontend:** Vite + React (SWC), Tailwind CSS
- **Backend:** Firebase (Hosting + Cloud Functions as AI proxy)
- **AI:** Anthropic SDK (Claude 3 Opus) called server-side via Firebase Functions
- **State:** React Hooks + Context API for chat state

## Build & Dev Commands

```bash
npm run dev          # Local dev server (Vite)
npm run build        # Production build
npm run preview      # Preview production build
firebase emulators:start  # Local Firebase emulation (functions + hosting)
firebase deploy      # Deploy to Firebase
```

## Architecture

- `src/components/Hero.jsx` — Minimalist intro section
- `src/components/ProjectGrid.jsx` — Project cards grid, data-driven from `projects.js`
- `src/components/AiConcierge.jsx` — Floating/slide-over chat UI (terminal/IDE aesthetic)
- `functions/index.js` — Firebase Cloud Function `handleChat`: receives prompt from frontend, prepends system message, calls Anthropic API, returns response

## Design Constraints

- Dark mode by default: Tailwind `zinc` palette (`zinc-950` backgrounds)
- Typography: `inter` font family
- Glassmorphism cards: `backdrop-blur-md` with subtle borders
- All transitions: `transition-all duration-500 ease-in-out`
- AI responses rendered as Markdown in the chat UI

## Security

- Anthropic API key stored in Firebase environment config (`process.env.ANTHROPIC_API_KEY`), never in frontend code
- All AI calls routed through Firebase Cloud Functions — no direct client-to-Anthropic requests
