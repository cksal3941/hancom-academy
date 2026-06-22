# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

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
- `src/App.jsx` — root component
- `src/App.css` / `src/index.css` — component and global styles
- `src/assets/` — image assets imported directly in JSX; includes `한글과컴퓨터_D.png` (Hancom logo)
- `public/` — static files served as-is; `icons.svg` is an SVG sprite consumed via `<use href="/icons.svg#...">` in JSX

## Key details

- `@vitejs/plugin-react` uses the **Oxc** transformer (not Babel or SWC). React Compiler is not enabled.
- `@types/react` and `@types/react-dom` are present as devDependencies for IDE/JSDoc type hints only — the project has no TypeScript.
- ESLint uses the **flat config** format (`eslint.config.js`, ESLint 10). Plugins: `eslint-plugin-react-hooks` and `eslint-plugin-react-refresh`.
