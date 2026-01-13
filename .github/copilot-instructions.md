# Copilot Instructions for kavita-jadhav-portfolio

## Project Overview
This is a Vite + React TypeScript portfolio app with AI integration (Gemini API) and deployment to Google Cloud Run. The codebase is organized for clarity and modularity, with a focus on personal branding and interactive AI features.

## Key Components & Structure
- **App.tsx**: Main app entry, sets up global layout and theme.
- **components/**: UI components (e.g., Navbar, ProjectCard, AIChat). Each is a functional React component using props for configuration.
- **services/geminiService.ts**: Handles communication with Gemini API. All AI-related requests should go through this service.
- **constants.tsx, types.ts**: Centralized constants and TypeScript types for maintainability.
- **index.tsx, index.html**: App bootstrap and HTML template.
- **cloudbuild.yaml, Dockerfile, setup-gcp-deploy.sh**: Deployment scripts for Google Cloud Run.

## Developer Workflows
- **Local Development**:  
  - Install dependencies: `npm install`  
  - Start dev server: `npm run dev`  
  - Requires Node.js and a valid `GEMINI_API_KEY` in `.env.local`.
- **Build for Production**:  
  - `npm run build` generates optimized output for deployment.
- **Deploy to Cloud Run**:  
  - Use provided Dockerfile and `cloudbuild.yaml` for containerization and deployment.  
  - See `GCP_DEPLOYMENT_GUIDE.md` for step-by-step instructions.

## Patterns & Conventions
- **Theme Handling**: Theme state (light/dark) is managed at the top level and passed as props to components like `Navbar`.
- **Navigation**: Navbar uses anchor links to scroll to sections. Section IDs must match `navItems` in `Navbar.tsx`.
- **AI Integration**: All Gemini API calls are abstracted in `services/geminiService.ts`. Do not call the API directly from components.
- **Styling**: Uses Tailwind CSS utility classes. Prefer utility classes over custom CSS for consistency.
- **Type Safety**: All components and services use TypeScript interfaces/types. Add types for new props and API responses.

## External Integrations
- **Gemini API**: Requires API key. All requests routed via `geminiService.ts`.
- **Google Cloud Run**: Deployment configured via Dockerfile and `cloudbuild.yaml`.
- **LinkedIn**: Navbar includes a link to the author's LinkedIn profile.

## Examples
- To add a new section:  
  1. Add a new item to `navItems` in `Navbar.tsx` and create a corresponding section with matching ID in `App.tsx`.
- To extend AI functionality:  
  1. Add new methods to `geminiService.ts` and call them from UI components as needed.

## References
- See [README.md](../../README.md) for setup and deployment details.
- See [GCP_DEPLOYMENT_GUIDE.md](../../GCP_DEPLOYMENT_GUIDE.md) for cloud deployment steps.
- See [components/](../../components/) and [services/](../../services/) for code patterns.

---
*Update this file if project structure or workflows change.*
