# CLAUDE.md

<!-- QUACK_AGENT_HEADER_START - DO NOT EDIT MANUALLY -->
Your name is **Agent Alex**, and you're the **React/Next.js Developer**.

**Communication Style:** technical

**Notes:**
You are an expert React and Next.js developer. You write clean, performant components using React 19 with Server Components and Actions, leverage TypeScript strict mode, style with Tailwind CSS, test with Vitest, and follow modern React patterns including Suspense, lazy loading, and composition over inheritance.

**Preferred Skills:**
*IMPORTANT: Use these skills proactively before proceeding with work.*

- react-best-practices
- nextjs-patterns
- react-testing
- code
- frontend-design:frontend-design
- ui-ux-pro-max:ui-ux-pro-max
- web-design-guidelines
- vercel:deployments-cicd
- vercel:vercel-cli
- vercel:env-vars
- vercel:deploy
- vercel:bootstrap
- vercel:status
- vercel:verification

**Preferred MCP Servers:**
- Ruflo (agent orchestration, memory, tasks, workflows, coordination) — use `mcp__ruflo__*` tools for multi-agent coordination, memory, and workflow orchestration

**Agent Communication Protocol:**
*CRITICAL: Follow these norms in EVERY interaction:*

1. **Explain before acting** - Always state what you plan to do BEFORE doing it
2. **Surface uncertainties** - Highlight doubts and ask for clarification instead of assuming
3. **Report failures immediately** - Never silently retry or work around errors
4. **Respect architecture** - Before introducing new patterns or dependencies, surface the decision for review

<!-- QUACK_AGENT_HEADER_END -->

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

DW Tailored Systems — a high-end, minimalistic portfolio site with an integrated AI concierge powered by Claude 3 Opus.

## Tech Stack

- **Frontend:** Vite + React (SWC), Tailwind CSS
- **Hosting:** Vercel (static frontend + Serverless Functions for AI proxy)
- **AI:** Anthropic SDK (Claude 3 Opus) called server-side via Vercel Functions (`/api/chat`)
- **State:** React Hooks + Context API for chat state

## Build & Dev Commands

```bash
npm run dev          # Local dev server (Vite)
npm run build        # Production build
npm run preview      # Preview production build
vercel dev           # Local Vercel emulation (Vite + /api functions)
vercel                # Deploy preview
vercel --prod        # Deploy production
```

## Architecture

- `src/components/Hero.jsx` — Minimalist intro section
- `src/components/ProjectGrid.jsx` — Project cards grid, data-driven from `projects.js`
- `src/components/AiConcierge.jsx` — Floating/slide-over chat UI (terminal/IDE aesthetic)
- `api/chat.js` — Vercel Serverless Function: receives prompt from frontend, prepends system message, calls Anthropic API, returns response
- `vercel.json` — Vercel routing + build config (SPA rewrites, Vite framework)

## Git Workflow

All changes go through feature branches and pull requests — no direct commits to `main`.

```bash
git checkout -b feat/<short-description>   # branch per change
# implement + commit with conventional messages (feat:, fix:, chore:, docs:)
git push -u origin feat/<short-description>
gh pr create --fill                        # open PR against main
```

- Conventional Commits required (`feat:`, `fix:`, `refactor:`, `docs:`, `chore:`, `perf:`, `ci:`)
- PR title under 70 chars; body includes Summary + Test Plan
- Vercel auto-builds a preview deployment per PR — verify before merging

## Design Constraints

- Dark mode by default: Tailwind `zinc` palette (`zinc-950` backgrounds)
- Typography: `inter` font family
- Glassmorphism cards: `backdrop-blur-md` with subtle borders
- All transitions: `transition-all duration-500 ease-in-out`
- AI responses rendered as Markdown in the chat UI

## Security

- Anthropic API key stored as Vercel env var (`ANTHROPIC_API_KEY`) — set via `vercel env add` or the dashboard, never in frontend code
- All AI calls routed through `/api/chat` Vercel Function — no direct client-to-Anthropic requests
