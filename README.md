# DW Tailored Systems

Solo practice site. **AI workflow automation for research and clinical labs.**

Live: [dwtailored.com](https://dwtailored.com)

## Tech Stack

- **Frontend:** Vite + React 19 (SWC), Tailwind v4, React Router v7, Framer Motion
- **Backend:** Vercel Serverless Functions (`/api`) — Anthropic proxy, projects API, admin endpoints
- **Storage:** `@vercel/blob` for project assets
- **Booking:** Cal.com inline + popup
- **Hosting:** Vercel

## Scripts

| Command           | Description                      |
| ----------------- | -------------------------------- |
| `npm run dev`     | Vite dev server                  |
| `npm run build`   | Production build                 |
| `npm run preview` | Preview production build locally |
| `npm run lint`    | ESLint                           |
| `vercel dev`      | Local Vercel emulation           |
| `vercel --prod`   | Deploy production                |

## Environment

`ANTHROPIC_API_KEY` set via `vercel env add` — never in client code.

## Project Structure

```
src/
  App.jsx                # Routes
  pages/
    Home.jsx             # Hero + WhatIAutomate + filtered work + pilot CTA
    Engagement.jsx       # Three engagement options + 5-step process
    Work.jsx             # All projects index
    About.jsx            # One-paragraph bio + tools
    Contact.jsx          # Cal.com inline + form
    ProjectDetail.jsx    # Case study template
    Segment.jsx          # /for/:slug audience pages
    Admin*.jsx           # Auth-gated CMS
    _shared.jsx          # PillNav, FooterBlock, palette, BookCallButton
  data/
    projects.js          # Case study source of truth
    segments.js          # Audience segments (only `labs` is publicly linked)
  components/
    ProjectArtwork.jsx   # Vector art for project cards
api/
  chat.js                # Anthropic proxy
  projects.js            # Project data API
  admin/                 # Admin endpoints
```

## Changelog

### 2026-04-27 — Repositioned for AI lab automation

- Public positioning narrowed to AI workflow automation for research and clinical labs.
- New `/engagement` page (Pilot $1.5K / Standard $5K–$7.5K / Ongoing retainer); no `/pricing` route.
- Nav reduced to **Work / Engagement / About / Contact**.
- Home rewritten: lab-AI hero, "What I automate" three-card section, filtered SelectedWork bento, pilot CTA tile.
- About reduced to one-paragraph bio + tools list (Claude Code, n8n, Python, Anthropic API, Vercel, Postgres).
- Removed `Ten99` project entry; segments `business-tools` and `websites` hidden from public nav.
- Footer + CTAs updated to "Book a free 20-minute lab audit".
