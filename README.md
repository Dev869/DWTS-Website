# DW Tailored Systems

A high-end, minimalistic portfolio site with an integrated AI concierge powered by Claude 3 Opus.

## Tech Stack

- **Frontend:** [Vite](https://vite.dev/) + [React 19](https://react.dev/) (SWC), [Tailwind CSS v4](https://tailwindcss.com/)
- **Routing:** [React Router v7](https://reactrouter.com/)
- **Animation:** [Framer Motion](https://www.framer.com/motion/)
- **AI Chat:** [Anthropic SDK](https://docs.anthropic.com/) (Claude 3 Opus) via Firebase Cloud Functions
- **Backend:** [Firebase](https://firebase.google.com/) (Hosting + Cloud Functions)
- **Markdown:** [react-markdown](https://github.com/remarkjs/react-markdown) for AI response rendering

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- Firebase CLI (`npm install -g firebase-tools`)

### Installation

```bash
npm install
cd functions && npm install && cd ..
```

### Development

```bash
npm run dev
```

### Firebase Emulators

```bash
firebase emulators:start
```

### Production Build

```bash
npm run build
npm run preview
```

### Deploy

```bash
firebase deploy
```

## Project Structure

```
src/
  App.jsx                  # Root component with routing
  main.jsx                 # Entry point
  index.css                # Global styles (Tailwind)
  assets/                  # Static assets
  context/
    ChatContext.jsx         # AI concierge chat state
  data/
    projects.js            # Project card data (title, tags, beta flag, etc.)
  components/
    Brand.jsx              # Logo / brand identity
    Navbar.jsx             # Site navigation
    Hero.jsx               # Landing hero section
    Services.jsx           # Services overview
    ProjectGrid.jsx        # Project cards grid layout
    ProjectCard.jsx        # Individual project card (supports beta badge)
    Contact.jsx            # Contact form / CTA
    Clients.jsx            # Client logos / social proof
    Footer.jsx             # Site footer
    ScrollToTop.jsx        # Scroll restoration on route change
    ScrollGraphics.jsx     # Scroll-driven visual effects
    highlights/            # Project detail page sections
    ui/                    # Reusable UI primitives
  pages/
    Home.jsx               # Landing page
    ProjectHighlight.jsx   # Individual project detail page
functions/
  index.js                 # Firebase Cloud Function (AI chat proxy)
```

## Design

- **Dark retro aesthetic:** warm `zinc` / parchment palette (`#F5F0E3` backgrounds, `#2C2C2C` text)
- **Typography:** Inter + Bungee for headings
- **Glassmorphism cards** with `backdrop-blur-md` and dashed borders
- **Transitions:** `transition-all duration-500 ease-in-out`
- **AI responses** rendered as Markdown in a terminal-style chat UI

## Environment Variables

The Anthropic API key is stored in Firebase environment config and never exposed to the client:

```bash
firebase functions:config:set anthropic.api_key="sk-..."
```

## Scripts

| Command             | Description                        |
| ------------------- | ---------------------------------- |
| `npm run dev`       | Start Vite dev server              |
| `npm run build`     | Production build                   |
| `npm run preview`   | Preview production build locally   |
| `npm run lint`      | Run ESLint                         |
| `firebase deploy`   | Deploy to Firebase                 |

## License

Private project. All rights reserved.
