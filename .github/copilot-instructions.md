# Copilot Instructions for AI Agents

## Project Overview
- **Type:** Interactive portfolio for Kavita Jadhav (Full Stack & AI Developer)
- **Stack:** React 19, TypeScript, Vite, Tailwind CSS, Google GenAI SDK
- **AI Feature:** Digital Twin chat powered by Gemini 3 Pro (Google GenAI)
- **Deployment:** Google Cloud Run (see cloudbuild.yaml, Dockerfile)

## Architecture & Key Files
- **Frontend:**
  - `App.tsx`, `index.tsx`: App entry and root rendering
  - `components/AIChat.tsx`: AI chat UI, manages message state, calls Gemini service
  - `components/Navbar.tsx`: Navigation, theme toggling
  - `constants.tsx`, `types.ts`: Project/skill data, TypeScript types
- **AI Integration:**
  - `services/geminiService.ts`: Calls `/api/gemini-proxy` with system prompt and user message
  - `api/gemini-proxy.js`: Serverless proxy for Gemini API, injects API key from env
- **Build/Deploy:**
  - `cloudbuild.yaml`: GCP Cloud Build steps (docker build/push/deploy)
  - `Dockerfile`: Multi-stage build (Node for build, Nginx for static serve)
  - `vite.config.ts`: Vite config, env var mapping for API keys

## Developer Workflows
- **Local Dev:**
  1. `npm install`
  2. Set `GEMINI_API_KEY` in `.env` (or export in terminal)
  3. `npm run dev` (Vite dev server on port 3000)
- **Build:** `npm run build` (outputs to `dist/`)
- **Deploy:** Use GCP Cloud Build or Vercel (see README.md, cloudbuild.yaml)

## Project Conventions & Patterns
- **TypeScript:** All logic/components are typed; see `types.ts` for shared types
- **Data:** Project/skill/certification data in `constants.tsx`, not hardcoded in components
- **AI Chat:**
  - Always uses a system prompt (see `geminiService.ts`) to maintain persona
  - All AI requests proxied via `/api/gemini-proxy` for API key security
- **Env Vars:**
  - `GEMINI_API_KEY` required for AI chat (mapped in Vite config and serverless API)
- **Styling:** Uses Tailwind CSS utility classes (see className usage in components)
- **Routing:** Single-page, no React Router; navigation is anchor-based
- **Aliases:** `@/` maps to project root (see `vite.config.ts` and `tsconfig.json`)

## External Integrations
- **Google GenAI SDK:** Used for AI chat (see dependencies in `package.json`)
- **GCP Cloud Run:** Main deployment target; see `cloudbuild.yaml` and docs
- **Vercel:** Alternative deployment (see API handler in `api/`)

## References
- [README.md](../README.md): Setup, features, deployment links
- [docs/](../docs/): GCP deployment and service account guides
- [cloudbuild.yaml](../cloudbuild.yaml), [Dockerfile](../Dockerfile): Build/deploy pipeline
- [services/geminiService.ts](../services/geminiService.ts): AI integration logic

---
**For AI agents:**
- Always use the system prompt in `geminiService.ts` for AI persona consistency
- Never expose or hardcode API keys; use env vars and proxy endpoints
- Follow data-driven patterns (see `constants.tsx`)
- Reference this file for project-specific conventions before generating or refactoring code
