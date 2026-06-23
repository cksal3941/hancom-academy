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

Single-page React 19 app built with Vite 8, written in plain JavaScript (no TypeScript). Korean-language academy (한컴아카데미) website. Uses react-router-dom v7 and Swiper v12.

### Routing

`src/router.jsx` uses `createBrowserRouter`. The layout shell (`App.jsx`) wraps all routes via `<Outlet>`. Only `HomePage` is fully implemented; all other paths render `ComingSoonPage`.

```
/                  → HomePage
/opening-news/**   → ComingSoonPage
/notice/**         → ComingSoonPage
/news/**           → ComingSoonPage
*                  → ComingSoonPage
```

### Component structure

```
App.jsx            — layout shell: Header + <Outlet> + Footer + FloatingQuickMenu + TopButton
pages/
  HomePage.jsx     — composes sections in order: MainVisual, NewsNoticeSection (above-fold 100vh),
                     then EducationFieldSection, AcademyIntroSection, SeminarSection, LocationSection (each 100vh)
  ComingSoonPage   — placeholder for unimplemented pages
sections/          — full-viewport (100vh) content blocks used only in HomePage
                     (MainVisual, SeminarSection, LocationSection)
components/        — reusable UI: Header, Footer, FloatingQuickMenu, TopButton
  home/            — home-page-specific section components
                     (NewsNoticeSection, EducationFieldSection, AcademyIntroSection, LocationSection)
  cards/           — card sub-components: NewsNoticeColumn, NewsNoticeItem,
                     EducationFieldCard, AcademyIntroCard
  location/        — LocationInfoCard, LocationTabs, MapBox
data/              — static JS arrays: newsData.js, noticeData.js, openingNewsData.js,
                     educationFieldsData.js, academyIntroData.js, locationData.js,
                     quickMenuData.js, seminarData.js, footerData.js
```

### Implementation status

Implemented: `MainVisual`, `NewsNoticeSection`, `EducationFieldSection`, `AcademyIntroSection`, `LocationSection`, `FloatingQuickMenu`, `TopButton`, `Footer`.

Skeletons (`.ph` divs + `skeleton-tag` label): `SeminarSection`. When implementing a section, replace the skeleton markup with real content.

### AcademyIntroSection

Has a CSS marquee (`academy-intro__marquee-track`) running vertically in the background. The section background is a `.academy-intro__bg` CSS gradient — there is a comment in the JSX marking the swap point if a shader-gradient package is added later.

### EducationFieldSection

Renders cards from `educationFieldsData` via `EducationFieldCard`. Each card has `{ id, title, description, image, path }` — `image` points to `public/images/courses*.png`, `path` is a router link (currently leads to `ComingSoonPage`).

### MainVisual (Swiper)

`MainVisual.jsx` uses **Swiper** (`swiper/react`) with `Autoplay` and `EffectFade` modules. The slider ref is stored in `swiperRef` for imperative prev/next/play/pause control. Progress is tracked via `onAutoplayTimeLeft` and rendered as a CSS-width bar.

### Header dropdown

`Header.jsx` implements a megamenu dropdown: hover on a nav item reveals all submenu columns simultaneously, with a sliding indicator (`header__dropdown-indicator`) that translates to the active column. Position is recalculated on resize via `getBoundingClientRect`. The `navItems` array in `Header.jsx` is the single source of truth for nav structure.

### Static assets

- `src/assets/` — images imported directly in JSX (e.g., `hancom_logo.png`)
- `public/images/` — images served by path (e.g., `academyIntroData` and `educationFieldsData` reference `/images/system*.png` and `/images/courses*.png`)
- `public/icons.svg` — SVG sprite; reference symbols with `<use href="/icons.svg#icon-name">`
- `public/favicon.svg` — site favicon

## CSS conventions

Classes follow **BEM** naming: `block__element--modifier` (e.g., `header__nav-item--active`, `main-visual__control-btn`). Each component/section owns a co-located `.css` file; no CSS Modules or Tailwind.

`src/index.css` defines global resets, the `.container` max-width utility, and these design tokens:

| Token | Value |
|---|---|
| `--primary` | `#1e4fcc` |
| `--primary-dark` | `#0a1f7a` |
| `--dark-bg` | `#0d1b3e` |
| `--text` | `#1a1a2e` |
| `--max-w` | `1560px` |
| `--header-h` | `100px` |

Skeleton utilities also live in `index.css`: `.ph` (dark placeholder), `.ph--light` (light-on-dark variant), `.skeleton-tag` (uppercase label badge).

## Key details

- `@vitejs/plugin-react` uses the **Oxc** transformer (not Babel or SWC). React Compiler is not enabled.
- `@types/react` and `@types/react-dom` are devDependencies for IDE/JSDoc type hints only — no TypeScript.
- ESLint uses **flat config** (`eslint.config.js`, ESLint 10). Plugins: `eslint-plugin-react-hooks` and `eslint-plugin-react-refresh`.
- `src/App.css` is currently unused.
