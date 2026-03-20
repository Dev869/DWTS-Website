# Project Highlight Pages — Design Spec

## Overview

Individual project highlight pages that "sell" each portfolio project to a mixed audience (clients, recruiters, developers). Each project is assigned one of three layout variants based on its content type. Pages are reached by clicking project cards on the home page.

## Audience

Mixed — potential clients, recruiters/hiring managers, fellow developers. Pages balance technical credibility with clear business value.

## Routing & Navigation

- **Dependencies added:** `react-router-dom`, `framer-motion`
- **Routes:** `/` (home), `/project/:slug` (highlight page)
- **Home route** renders existing sections (Brand, ProjectGrid, Services, Contact, Footer) wrapped in a `motion.div` for exit animations
- **ProjectCard** navigates to `/project/{slug}` instead of external link
- **Highlight pages** include "Back to Projects" link (`/#portfolio`) and "View Live Project" CTA to the external URL
- **Navbar** updated: logo links home via `<Link>`, section links use smooth scroll on home or navigate to `/#section` from highlight pages. Mobile hamburger button is rendered but non-functional (known gap).
- **ScrollToTop** component resets scroll position on route change
- **AnimatePresence** wraps routes for page enter/exit transitions; both Home and ProjectHighlight are wrapped in `motion.div` for consistent enter/exit behavior
- **Not-found state:** `ProjectHighlight` renders a "Project Not Found" message with a back link if the slug doesn't match any project

## Project Data Model

Existing fields preserved. New fields added to each project in `src/data/projects.js`:

| Field | Type | Purpose |
|-------|------|---------|
| `slug` | `string` | URL-friendly identifier |
| `layout` | `"showcase" \| "casestudy" \| "interactive"` | Which variant to render |
| `headline` | `string` | Punchy one-liner for hero |
| `problem` | `string` | What challenge this solves |
| `approach` | `string` | How it was tackled |
| `results` | `Array<{ metric, label }>` | Measurable outcomes |
| `techStack` | `string[]` | Detailed stack list |
| `features` | `Array<{ icon, title, desc }>` | Key feature highlights with icons |
| `gallery` | `Array<{ type, src, caption }>` | Screenshots, diagrams (optional) |
| `demoUrl` | `string` | For interactive variant (optional) |

Each layout variant gracefully skips sections with no data.

## Layout Variants

### Showcase (Visual-Heavy)

Assigned to: DocuHub Education Reporting, Ten99

1. Full-bleed hero — gradient background with parallax drift, orbit ring decorations, staggered text entrance (badge, title, headline)
2. Hero image — overlapping the hero/content boundary with scan-line overlay
3. Problem section — fade-up reveal
4. Solution section — fade-up reveal with rust accent
5. Feature Grid — 4 animated cards with icons, accent bars, corner indices, staggered entrance
6. Architecture Diagram — dark-themed hub-and-spoke tech stack visualization with animated connection lines. Tech stack is split into top/bottom layers with a center hub node labeled with the project title.
7. Gallery — conditional, only renders if gallery data is populated. Items cascade from alternating left/right.
8. Results Metrics — dark background, 3-column staggered scale-up entrance
9. Tech Stack badges — staggered pop-in with rotation
10. CTA bar — back link + view source/live buttons

### Case Study (Narrative-Driven)

Assigned to: Flourescence Analysis Pipeline

1. Compact header — dark background with grid pattern overlay, accent bar
2. Challenge section — numbered (01), fade-up with large ghost number
3. Zigzag divider decoration
4. Approach section — numbered (02), fade-up
5. Preview image — dashed border with scan-line overlay
6. Feature Grid — same shared component
7. Architecture Diagram — same shared component
8. Results Metrics — same shared component
9. Key Decisions — numbered (03) with ghost number, tech stack rendered as decision cards with static placeholder rationale text. Per-item rationale is not yet in the data model.
10. Tech Stack badges
11. CTA bar

### Interactive Demo (Hands-On)

Assigned to: Pulse Wave Velocity Analysis Toolkit

1. Compact centered header — diagonal line pattern overlay
2. Demo centerpiece — terminal-style frame (traffic light dots, URL bar) containing screenshot or launch button
3. "Try it Live" button below demo
4. How It Works — numbered steps (01 Problem, 02 Approach, 03 Result) connected by vertical dashed border-left lines, step 03 renders inline metrics from `results` array
5. Feature Grid — same shared component
6. Architecture Diagram — same shared component
7. Results Metrics — same shared component
8. Tech Stack badges
9. CTA bar

## Shared Components

| Component | File | Purpose |
|-----------|------|---------|
| `SectionReveal` | `src/components/highlights/SectionReveal.jsx` | Framer Motion scroll-triggered reveal wrapper (up/left/right directions) |
| `ResultsMetrics` | `src/components/highlights/ResultsMetrics.jsx` | Dark-bg staggered scale-up metric display (static values, not counting animation) |
| `TechStackBar` | `src/components/highlights/TechStackBar.jsx` | Staggered badge pop-in with rotation |
| `CTABar` | `src/components/highlights/CTABar.jsx` | Bottom action bar (back to `/#portfolio` + view source/live) |
| `FeatureGrid` | `src/components/highlights/FeatureGrid.jsx` | 4-card feature grid with SVG icons and rotating accent colors |
| `ArchitectureDiagram` | `src/components/highlights/ArchitectureDiagram.jsx` | Hub-and-spoke tech stack visualization with animated connection lines |
| `ScrollToTop` | `src/components/ScrollToTop.jsx` | Resets scroll on route change |

## Animation System

### Page Transitions
- Both Home and ProjectHighlight wrapped in `motion.div`
- Exit: fade out + slide up (400ms)
- Enter: fade in + slide up from below (500ms)
- Easing: `[0.16, 1, 0.3, 1]` (custom spring-like curve)

### Scroll-Triggered Reveals
- Each section wrapped in `SectionReveal`
- Fade in + translate 40px from direction (up/left/right)
- Staggered children via `delay` prop (typically 70-200ms apart)
- Viewport trigger: `once: true`, margin `-80px`

### Signature Moments
- Hero parallax: gradient background drifts with 8s infinite cycle
- Orbit rings: dashed border circles rotating at different speeds (20s and 25s)
- Gallery cascade: items slide in from alternating left/right sides
- Results metrics: staggered scale-up entrance (0.15s delay between items), static value display
- Tech stack badges: pop-in with -3deg rotation snapping to 0
- Architecture diagram: hub-and-spoke layered reveal with connection lines scaling in from transform origin top
- Feature cards: staggered entrance (120ms apart) with hover lift effect and accent color rotation

### Design Consistency
- Reuses existing timing curve and easing patterns
- Matches retro paper aesthetic (dashed borders, scan-line overlays, corner squares)
- Same color palette: teal (#049B9F), rust (#C05A30), gold (#D4A843), olive (#7A8B4A)
- Same typography: Bungee (display), IBM Plex Sans (body), IBM Plex Mono (code/labels)

## File Structure

```
src/
├── pages/
│   ├── Home.jsx                    # Wraps existing sections in motion.div
│   └── ProjectHighlight.jsx        # Reads :slug, picks layout variant, includes 404 fallback
├── components/
│   ├── ScrollToTop.jsx             # Route change scroll reset
│   ├── Navbar.jsx                  # Updated with react-router Links
│   ├── ProjectCard.jsx             # Updated: Link to /project/:slug, includes image fallback
│   └── highlights/
│       ├── ShowcaseLayout.jsx      # Visual-heavy variant
│       ├── CaseStudyLayout.jsx     # Narrative-driven variant
│       ├── InteractiveLayout.jsx   # Demo-focused variant
│       ├── SectionReveal.jsx       # Scroll-triggered animation wrapper
│       ├── ResultsMetrics.jsx      # Staggered metric display
│       ├── TechStackBar.jsx        # Tech stack badges
│       ├── CTABar.jsx              # Bottom action bar
│       ├── FeatureGrid.jsx         # Feature highlight cards with SVG icons
│       └── ArchitectureDiagram.jsx # Hub-and-spoke tech stack visualization
├── data/
│   └── projects.js                 # Extended with highlight fields
├── App.jsx                         # Router + AnimatePresence + ScrollToTop
└── main.jsx                        # BrowserRouter wrapper
```

## Current Project Assignments

| Project | Layout | Slug |
|---------|--------|------|
| Flourescence Analysis Pipeline | `casestudy` | `fluorescence-pipeline` |
| Pulse Wave Velocity Analysis Toolkit | `interactive` | `pulse-wave-toolkit` |
| DocuHub Education Reporting | `showcase` | `docuhub-reporting` |
| Ten99 | `showcase` | `ten99` |

## Known Gaps

- Mobile hamburger menu is non-functional (renders but has no open/close logic)
- Case Study "Key Decisions" uses static placeholder rationale — future iteration should add per-item rationale to data model
- Gallery arrays are empty for all projects — screenshots to be added as they become available
- No `ten99-reporting.png` preview image exists yet

## Future Extensibility

- Add new projects by adding an entry to `projects.js` with the required fields and assigning a layout variant
- Add new layout variants by creating a new component and registering it in the `layouts` map in `ProjectHighlight.jsx`
- Gallery images can be populated per-project as screenshots become available
- Feature icons are mapped in `FeatureGrid.jsx` — new icons can be added to the `iconMap`
