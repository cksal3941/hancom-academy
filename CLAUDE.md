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

`VITE_ADMIN_EMAILS` — comma-separated list of admin email addresses (e.g. `admin@example.com,dev@example.com`). Used by `isAdminUser()` in `src/utils/admin.js` to show admin-only UI (write/edit buttons in notice pages).

## Architecture

Single-page React 19 app built with Vite 8, written in plain JavaScript (no TypeScript). Korean-language academy (한컴아카데미) website. Uses react-router-dom v7, Swiper v12, Firebase v12, AOS, react-icons, @shadergradient/react (+ three / @react-three/fiber), and Leaflet.

### Routing

`src/router.jsx` uses `createBrowserRouter`. The layout shell (`App.jsx`) wraps all routes via `<Outlet>`. `LoginPage` is lazy-loaded with `Suspense`.

```
/                        → HomePage
/login                   → LoginPage (lazy)
/signup                  → SignUpPage
/about                   → AboutPage
/about/intro             → AboutPage
/about/teachers          → TeachersPage
/about/awards            → AwardsPage
/about/location          → LocationPage
/notice                  → NoticePage
/notice/announcement     → NoticePage
/notice/start            → OpeningNoticePage
/notice/write            → NoticeWritePage (admin only)
/notice/:noticeId        → NoticeDetailPage
/notice/news             → ComingSoonPage
/opening-news/**         → ComingSoonPage
/news/**                 → ComingSoonPage
*                        → ComingSoonPage
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
  LoginPage.jsx      — email + Google + Apple sign-in (lazy loaded); single component
                       manages both 'login' and 'forgot' views via a `view` state string
  SignUpPage.jsx     — email registration
  AwardsPage.jsx     — scroll-driven awards timeline; DecadeTabs + AwardsTimeline
  LocationPage.jsx   — branch selector (LocationTabs) + Leaflet map (MapBox)
  NoticePage.jsx     — filterable notice board; category + search; admin write button
  OpeningNoticePage.jsx — opening news board (reuses NoticePage.css)
  NoticeDetailPage.jsx  — notice detail; requires login (lock screen if unauthenticated);
                          admin edit button; redirects to /notice if noticeId not found
  NoticeWritePage.jsx   — admin-only notice creation form; category select, title, content
                          textarea, image upload (up to 5, stored in Firebase Storage);
                          uses addNotice() from noticeService; reuses NoticePage.css
  ComingSoonPage.jsx — placeholder for unimplemented routes
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
    SubPageHero.jsx  — unified sub-page hero: eyebrow + h1 + optional tabs nav;
                       accepts tabs={[{ label, to, active? }]}; used by all sub-pages
  awards/
    AwardsTimeline.jsx — scroll-animated vertical timeline grouped by year
    DecadeTabs.jsx     — sticky decade filter tabs (e.g. "2020s", "2010s")
  home/              — home-page section components
                       (NewsNoticeSection, EducationFieldSection, AcademyIntroSection, LocationSection)
  cards/             — NewsNoticeColumn, NewsNoticeItem, EducationFieldCard, AcademyIntroCard
  location/          — LocationInfoCard, LocationTabs, MapBox
  auth/
    GoogleLoginButton.jsx
firebase/
  firebase.js        — initialises Firebase only when all env vars are present;
                       exports auth, db, storage, isFirebaseConfigured, isAppleAuthEnabled
services/
  authService.js     — loginWithGoogle, loginWithApple, loginWithEmail, signUpWithEmail,
                       sendPasswordReset, logout; each calls ensureFirebaseConfigured() before use
  noticeService.js   — addNotice(), fetchNotices(), fetchNoticeById(); Firestore collection
                       'notices' ordered by createdAt desc; image files uploaded to Firebase
                       Storage under notices/; falls back to static noticeData when Firebase
                       is unconfigured
hooks/
  useAuth.js              — useAuth() → { user, loading }; subscribes to onAuthStateChanged
  useTimelineProgress.js  — scroll progress (0–1) within a container ref (rAF + passive scroll)
  useActiveTimelineYear.js — IntersectionObserver-based active year for AwardsTimeline
data/                — static JS arrays: newsData, noticeData, openingNewsData,
                       educationFieldsData, academyIntroData, locationData,
                       quickMenuData, seminarData, footerData, mobileMenuData,
                       teacherData, awardsData
utils/
  firebaseErrorMessage.js  — maps Firebase auth error codes to Korean user-facing strings
  admin.js                 — isAdminUser(user): checks user.email against VITE_ADMIN_EMAILS
```

### Implementation status

Fully implemented: all HomePage sections, `AboutPage`, `TeachersPage`, `AwardsPage`, `LocationPage`, `NoticePage`, `OpeningNoticePage`, `NoticeDetailPage`, `NoticeWritePage`, `LoginPage`, `SignUpPage`, `MobileMenu`, `FloatingQuickMenu`, `TopButton`, `Footer`.

Still `ComingSoonPage`: `/notice/news`, `/opening-news/**`, `/news/**`, and all `/courses/**` + `/orientation/**` routes.

### Sub-page layout pattern

All sub-pages use `<SubPageHero eyebrow="..." title="..." tabs={[...]} />` followed by a `.subpage-breadcrumb` bar. The `tabs` prop is optional — auth pages (`/login`, `/signup`) omit it. New sub-pages should follow this hero → breadcrumb → content structure.

`AboutPage` renders its own hero section directly (not via `SubPageHero`) to support the full-bleed image layout with inline tabs. `TeachersPage` follows the same pattern. For new pages under `/about/**`, use `SubPageHero` with the standard 4-tab set (`학원 소개 / 강사진 소개 / 수상 실적 / 오시는 길`).

### MainVisual (Swiper)

`MainVisual.jsx` uses **Swiper** with `Autoplay` and `EffectFade` modules. Each slide entry in the `slides` array requires both a desktop (`_d.png`) and a mobile (`_m.png`) image; they are rendered via `<picture><source media="(max-width: 768px)">`. Each slide also has a `theme` (`'light'` or `'dark'`) that is dispatched as a `header-theme` CustomEvent so `Header` and `FloatingQuickMenu` can adapt their appearance.

### Cross-component theme communication

`MainVisual` fires `window.dispatchEvent(new CustomEvent('header-theme', { detail: { theme } }))` on every slide change and stores the value in `window.__slideTheme` (for components that mount after the event fires). `Header` and `FloatingQuickMenu` both listen for this event to switch between light/dark styling. Do not remove `window.__slideTheme` — it is the fallback for late-mounting consumers.

### Header / MobileMenu

`Header.jsx` implements a megamenu dropdown for desktop: hover on a nav item reveals all submenu columns simultaneously with a sliding indicator (`header__dropdown-indicator`) that translates to the active column. Position is recalculated on resize via `getBoundingClientRect`. The `navItems` array in `Header.jsx` is the single source of truth for desktop nav structure. Submenu entries support `{ label, to }` for internal links or `{ label, href, external: true }` for external links (renders an `<a>` instead of `<Link>`).

`MobileMenu.jsx` is a separate full-screen overlay driven by `mobileMenuData` (separate source of truth from `navItems`). The hamburger button in `Header.jsx` controls the `isOpen` state passed down to `MobileMenu`.

### AOS animations

`App.jsx` calls `AOS.init()` once on mount and `AOS.refresh()` on every route change. Add scroll-reveal to elements with `data-aos="fade-up"` (or other presets). Use `data-aos-delay={n}` (ms) for staggered children.

### AcademyIntroSection

Has a CSS marquee (`academy-intro__marquee-track`) running vertically in the background. The section background uses `<ShaderGradientCanvas>` / `<ShaderGradient>` from `@shadergradient/react` (backed by Three.js) for an animated gradient effect.

### MapBox

`src/components/location/MapBox.jsx` uses **Leaflet** (`import L from 'leaflet'`). It patches the default marker icon paths at module load to fix Vite's asset URL resolution — do not remove that setup block or markers will be broken.

### Data shapes

`src/data/teacherData.js` — `{ id, name, role, field, career[], email, campuses[], image, message }`. `image` now uses local assets (`src/assets/teacher1-5.jpg`).

`src/data/seminarData.js` — `{ id, image, title, description, youtubeUrl }`. Images from `src/assets/slide1-3.jpg`. `SeminarSection` renders a looping Swiper carousel linking to YouTube.

`src/data/noticeData.js` / `openingNewsData.js` — `{ id, category, title, author, views, date, summary, content[], path }`. `path` is `/notice/:id`. `content[]` is paragraph strings rendered in `NoticeDetailPage`.

`src/data/awardsData.js` — exports `awardsData` (array of `{ year, decade, competitions[] }`) and `decades` (string array e.g. `['2020s', '2010s']`). Each competition has `{ title, notes[], categories[] }` → categories have `{ title, awards[] }` → awards have `{ rank, winners[] }` → winners are `{ name, school }`.

### Static assets

- `src/assets/` — images imported directly in JSX (e.g., `hancom_logo.png`, `about-hero-3d.png`, `main_slide*_d.png`, `main_slide*_m.png`)
- `public/images/` — images served by path (referenced in `academyIntroData` and `educationFieldsData`)
- `public/icons.svg` — SVG sprite; reference symbols with `<use href="/icons.svg#icon-name">`
- `public/favicon.svg` — site favicon

## CSS conventions

Classes follow **BEM** naming: `block__element--modifier`. Each component/section owns a co-located `.css` file; no CSS Modules or Tailwind.

`src/index.css` defines global resets, utilities, and design tokens:

**Colors**
| Token | Value |
|---|---|
| `--color-brand` | `#010859` |
| `--color-brand-mid` | `#4E538B` |
| `--color-brand-light` | `#B3B5CE` |
| `--color-point` | `#5689F1` |
| `--color-accent` | `#1e4fcc` |
| `--color-accent-dark` | `#0a1f7a` |
| `--color-bg` | `#F6F9FF` |
| `--color-bg-dark` | `#0d1b3e` |
| `--color-surface` | `#ffffff` |
| `--color-footer` | `#111827` |

**Layout**
| Token | Value |
|---|---|
| `--max-w` | `1560px` |
| `--header-h` | `100px` (64px on mobile) |
| `--section-py` | `80px` (48px on mobile) |
| `--container-px` | `24px` |

**Shape / Motion**
| Token | Value |
|---|---|
| `--radius-sm` | `4px` |
| `--radius-md` | `12px` |
| `--radius-pill` | `999px` |
| `--transition` | `0.2s ease` |

**Global utility classes in `index.css`**
- `.container` — centered, max-width, padded wrapper
- `.glassmorphism` — applies all `--glass-*` vars (bg, blur, border, radius, shadow)
- `.snap-section` — `scroll-snap-align: start` (parent `html` has `scroll-snap-type: y proximity`)
- `.ph` / `.ph--light` — skeleton placeholder rectangles (dark/light variants)
- `.skeleton-tag` — uppercase label badge for skeleton UIs

## Key details

- `@vitejs/plugin-react` uses the **Oxc** transformer (not Babel or SWC). React Compiler is not enabled.
- `@types/react` and `@types/react-dom` are devDependencies for IDE/JSDoc type hints only — no TypeScript.
- ESLint uses **flat config** (`eslint.config.js`, ESLint 10). Plugins: `eslint-plugin-react-hooks` and `eslint-plugin-react-refresh`.
- `src/App.css` is currently unused.
