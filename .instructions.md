# 🤖 AI Execution Roadmap: DW Tailored Systems

**Objective:** Build a high-end, minimalistic portfolio using React (Vite), Tailwind CSS, and Firebase, featuring a secure integration with Claude 3 Opus.

---

## 1. Technical Specification
* **Framework:** Vite + React (SWC)
* **Styling:** Tailwind CSS (Focus on: `zinc-950` backgrounds, `inter` typography, subtle borders).
* **State Management:** React Hooks (Context API for AI chat state).
* **Backend:** Firebase (Hosting + Functions for AI Proxy).
* **AI Model:** Claude 3 Opus (via Anthropic SDK).

---

## 2. Component Architecture
The AI should generate the following directory structure:
1. `src/components/Hero.jsx`: Minimalist text-heavy intro with a "Bespoke" feel.
2. `src/components/ProjectGrid.jsx`: A mapped grid using a central `projects.js` data file.
3. `src/components/AiConcierge.jsx`: A slide-over or floating chat interface.
4. `functions/index.js`: Firebase Cloud Function to handle Anthropic API calls.

---

## 3. Implementation Steps for the AI

### Task A: The Visual Shell
* Apply a "Dark Mode" by default using Tailwind's `zinc` palette.
* Implement a responsive grid where cards have a glassmorphism effect (`backdrop-blur-md`).
* Ensure all transitions use `transition-all duration-500 ease-in-out`.

### Task B: Secure AI Bridge (Firebase Functions)
* Create a Node.js function `handleChat`.
* **Logic:** Accept a `prompt` from the frontend, append a system message ("You are the DW Architect..."), call `anthropic.messages.create`, and return the stream or JSON response.
* **Security:** Ensure the `process.env.ANTHROPIC_API_KEY` is referenced, never hardcoded.

### Task C: The Interactive "Architect"
* Build a chat UI that feels like a terminal or a high-end IDE.
* Program the AI to ask 3 discovery questions before proposing a "Bespoke SaaS Architecture."

---

## 4. Prompt for Code Generation
*Copy and paste this when you are ready for the AI to code:*

> "Act as a Senior Full-Stack Engineer. Using the DW Tailored Systems plan, write the code for a React 'ProjectCard' component and a corresponding 'ProjectData.js' file. Ensure the design is ultra-minimalist. Then, write a Firebase Cloud Function in Node.js that securely connects to Claude 3 Opus using the Anthropic SDK, ensuring the API key is handled via environment variables."

---

## 5. Success Criteria
- [ ] Site is fully responsive (Mobile to Ultra-wide).
- [ ] Lighthouse Performance score > 95.
- [ ] API keys are not exposed in the frontend repository.
- [ ] AI responses are formatted in clean Markdown within the UI.