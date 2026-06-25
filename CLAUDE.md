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

## Environment variables

Copy `.env.example` to `.env` and fill in Firebase credentials. All vars are prefixed `VITE_FIREBASE_*`. The app gracefully degrades when Firebase is unconfigured — `isFirebaseConfigured` (exported from `src/firebase/firebase.js`) is `false` and auth features are disabled without throwing.

`VITE_FIREBASE_ENABLE_APPLE=true` must be set explicitly to expose Apple sign-in; it defaults to `false`.

## Architecture

Single-page React 19 app built with Vite 8, written in plain JavaScript (no TypeScript). Korean-language academy (한컴아카데미) website. Uses react-router-dom v7, Swiper v12, Firebase v11, AOS, and react-icons.

### Routing

`src/router.jsx` uses `createBrowserRouter`. The layout shell (`App.jsx`) wraps all routes via `<Outlet>`. `LoginPage` is lazy-loaded with `Suspense`.

```
/                    → HomePage
/login               → LoginPage (lazy)
/signup              → SignUpPage
/about               → AboutPage
/about/intro         → AboutPage
/about/teachers      → TeachersPage
/about/awards        → ComingSoonPage
/about/location      → ComingSoonPage
/opening-news/**     → ComingSoonPage
/notice/**           → ComingSoonPage
/news/**             → ComingSoonPage
*                    → ComingSoonPage
```

`App.jsx` derives `isAuthPage` (`/login`, `/signup`) to hide `FloatingQuickMenu` and `TopButton` on those routes. On sub-pages (non-`/`) `FloatingQuickMenu` receives `mobileOnly={true}`.

### Component structure

```
App.jsx              — layout shell: Header + <Outlet> + Footer + FloatingQuickMenu + TopButton
                       initialises AOS once; refreshes on route change
pages/
  HomePage.jsx       — composes sections: MainVisual, NewsNoticeSection (above-fold 100vh),
                       EducationFieldSection, AcademyIntroSection, SeminarSection, LocationSection
  AboutPage.jsx      — academy intro page with hero/tabs/breadcrumb/values cards
  TeachersPage.jsx   — teacher grid rendered from teacherData; shares hero/tabs pattern with AboutPage
  LoginPage.jsx      — email + Google + Apple sign-in (lazy loaded)
  SignUpPage.jsx      — email registration
  ComingSoonPage     — placeholder for unimplemented routes
sections/            — full-viewport (100vh) blocks for HomePage only
                       (MainVisual, SeminarSection, LocationSection)
components/
  Header.jsx         — desktop megamenu dropdown + hamburger trigger for MobileMenu
  Footer.jsx
  FloatingQuickMenu.jsx
  TopButton.jsx
  common/
    MobileMenu.jsx   — full-screen overlay, accordion nav driven by mobileMenuData,
                       closes on ESC / link click, locks body scroll while open
  home/              — home-page section components
                       (NewsNoticeSection, EducationFieldSection, AcademyIntroSection, LocationSection)
  cards/             — NewsNoticeColumn, NewsNoticeItem, EducationFieldCard, AcademyIntroCard
  location/          — LocationInfoCard, LocationTabs, MapBox
  auth/
    GoogleLoginButton.jsx
firebase/
  firebase.js        — initialises Firebase only when all env vars are present;
                       exports auth, db, isFirebaseConfigured, isAppleAuthEnabled
services/
  authService.js     — loginWithGoogle, loginWithApple, loginWithEmail, signUpWithEmail,
                       sendPasswordReset, logout; each calls ensureFirebaseConfigured() before use
hooks/
  useAuth.js         — useAuth() → { user, loading }; subscribes to onAuthStateChanged
data/                — static JS arrays: newsData, noticeData, openingNewsData,
                       educationFieldsData, academyIntroData, locationData,
                       quickMenuData, seminarData, footerData, mobileMenuData, teacherData
utils/
  firebaseErrorMessage.js  — maps Firebase auth error codes to Korean user-facing strings
```

### Implementation status

Fully implemented: `MainVisual`, `NewsNoticeSection`, `EducationFieldSection`, `AcademyIntroSection`, `LocationSection`, `FloatingQuickMenu`, `TopButton`, `Footer`, `AboutPage`, `TeachersPage`, `LoginPage`, `SignUpPage`, `MobileMenu`.

Skeleton (`.ph` divs + `skeleton-tag` label): `SeminarSection`. When implementing a section, replace skeleton markup with real content.

### Sub-page layout pattern

`AboutPage` and `TeachersPage` share a pattern: a hero section sets a `--*-hero-image` CSS custom property for the background (sourced from `src/assets/`), followed by a `<nav>` of tab links and a breadcrumb bar. New sub-pages under `/about/**` should follow this same hero→tabs→breadcrumb→content structure.

### AOS animations

`App.jsx` calls `AOS.init()` once on mount and `AOS.refresh()` on every route change. Add scroll-reveal to elements with `data-aos="fade-up"` (or other presets). Use `data-aos-delay={n}` (ms) for staggered children.

### MainVisual (Swiper)

`MainVisual.jsx` uses **Swiper** (`swiper/react`) with `Autoplay` and `EffectFade` modules. The slider ref is stored in `swiperRef` for imperative prev/next/play/pause control. Progress is tracked via `onAutoplayTimeLeft` and rendered as a CSS-width bar.

### Header / MobileMenu

`Header.jsx` implements a megamenu dropdown for desktop: hover on a nav item reveals all submenu columns simultaneously with a sliding indicator (`header__dropdown-indicator`) that translates to the active column. Position is recalculated on resize via `getBoundingClientRect`. The `navItems` array in `Header.jsx` is the single source of truth for desktop nav structure.

`MobileMenu.jsx` is a separate full-screen overlay driven by `mobileMenuData` (separate source of truth from `navItems`). The hamburger button in `Header.jsx` controls the `isOpen` state passed down to `MobileMenu`.

### AcademyIntroSection

Has a CSS marquee (`academy-intro__marquee-track`) running vertically in the background. The section background is a `.academy-intro__bg` CSS gradient — there is a comment in the JSX marking the swap point if a shader-gradient package is added later.

### Static assets

- `src/assets/` — images imported directly in JSX (e.g., `hancom_logo.png`, `about-hero-3d.png`)
- `public/images/` — images served by path (referenced in `academyIntroData` and `educationFieldsData`)
- `public/icons.svg` — SVG sprite; reference symbols with `<use href="/icons.svg#icon-name">`
- `public/favicon.svg` — site favicon

## CSS conventions

Classes follow **BEM** naming: `block__element--modifier`. Each component/section owns a co-located `.css` file; no CSS Modules or Tailwind.

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
- `react-icons/fi` (Feather) and `react-icons/io5` (Ionicons 5) are the icon sets in use.
