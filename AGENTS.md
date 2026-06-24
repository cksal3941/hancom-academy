# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server with HMR (localhost:5173)
npm run build      # Production build to dist/
npm run preview    # Preview the production build locally
npm run lint       # Run ESLint
```

No test framework is configured.

## Architecture

Single-page React 19 app built with Vite 8, written in plain JavaScript (no TypeScript).

- `src/main.jsx` — entry point; mounts `<App />` in StrictMode to `#root`
- `src/App.jsx` — root component; currently the starter template
- `src/App.css` / `src/index.css` — component and global styles
- `src/assets/` — image assets imported directly in JSX
- `public/` — static files served as-is (`favicon.svg`, `icons.svg` sprite used via `<use href="/icons.svg#...">`)

ESLint is configured with `eslint-plugin-react-hooks` and `eslint-plugin-react-refresh`. The config covers `**/*.{js,jsx}` and ignores `dist/`.
