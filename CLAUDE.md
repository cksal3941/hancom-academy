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

Copy `.env.example` to `.env`. All Firebase vars are prefixed `VITE_FIREBASE_*`. The app gracefully degrades when Firebase is unconfigured — `isFirebaseConfigured` (exported from `src/firebase/firebase.js`) is `false` and auth features are disabled without throwing.

| Variable | Purpose |
|---|---|
| `VITE_FIREBASE_*` | Firebase project credentials (API key, auth domain, project ID, etc.) |
| `VITE_FIREBASE_ENABLE_APPLE` | Set `true` to expose Apple sign-in (defaults to `false`) |
| `VITE_ADMIN_EMAILS` | Comma-separated admin emails; `isAdminUser()` checks this to show write/edit controls |
| `VITE_KAKAO_MAP_APP_KEY` | Kakao Developers JavaScript key for the branch location map |
| `VITE_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name for image uploads |
| `VITE_CLOUDINARY_UPLOAD_PRESET` | Cloudinary unsigned upload preset name |

For `VITE_KAKAO_MAP_APP_KEY`, register `http://localhost:5173` and `http://127.0.0.1:5173` as Web platform domains in the Kakao Developers console.

## Architecture

Single-page React 19 app built with Vite 8, written in plain JavaScript (no TypeScript). Korean-language academy (한컴아카데미) website. Uses react-router-dom v7, Swiper v12, Firebase v12, AOS, react-icons, @shadergradient/react (+ three / @react-three/fiber), Cloudinary (image upload), and Kakao Maps SDK (branch map).

### Routing

`src/router.jsx` uses `createBrowserRouter`. The layout shell (`App.jsx`) wraps all routes via `<Outlet>`. `LoginPage` is lazy-loaded with `Suspense`.

```
/                               → HomePage
/login                          → LoginPage (lazy)
/signup                         → SignUpPage
/about                          → AboutPage
/about/intro                    → AboutPage
/about/teachers                 → TeachersPage
/about/awards                   → AwardsPage
/about/location                 → LocationPage
/courses/gifted                 → CoursesGiftedPage
/notice                         → NoticePage (ProtectedRoute)
/notice/announcement            → NoticePage (ProtectedRoute)
/notice/write                   → NoticeWritePage (ProtectedRoute, admin only)
/notice/:noticeId               → NoticeDetailPage (ProtectedRoute)
/notice/:noticeId/edit          → NoticeEditPage (ProtectedRoute, admin only)
/notice/start                   → OpeningNoticePage
/notice/start/write             → OpeningNoticeWritePage (admin only)
/notice/start/:openingNoticeId  → OpeningNoticeDetailPage
/notice/news                    → NewsPage
/notice/news/write              → NewsWritePage
/notice/news/:newsId            → NewsDetailPage
/notice/news/:newsId/edit       → NewsEditPage
/news                           → NewsPage
/news/write                     → NewsWritePage
/news/:newsId                   → NewsDetailPage
/news/:newsId/edit              → NewsEditPage
/opening-news/**                → ComingSoonPage
*                               → ComingSoonPage
```

`ProtectedRoute` in `router.jsx` wraps routes that require login — it reads `useAuth()` and redirects to `/login` with `state.from` if unauthenticated. Notice routes (`/notice`, `/notice/announcement`, `/notice/write`, `/notice/:noticeId`, `/notice/:noticeId/edit`) are all gated at the router level via `ProtectedRoute`.

`App.jsx` derives `isAuthPage` (`/login`, `/signup`) to hide `FloatingQuickMenu` and `TopButton` on those routes. On sub-pages (non-`/`) `FloatingQuickMenu` receives `mobileOnly={true}`.

### Component structure

```
App.jsx              — layout shell: Header + <Outlet> + Footer + FloatingQuickMenu + TopButton
                       initialises AOS once; refreshes on route change
pages/
  HomePage.jsx       — composes sections: MainVisual, NewsNoticeSection (above-fold 100vh),
                       EducationFieldSection, AcademyIntroSection, SeminarSection, LocationSection
  AboutPage.jsx      — academy intro page with hero/tabs/breadcrumb/values cards
  TeachersPage.jsx   — teacher grid rendered from teacherData; shares hero/tabs pattern
  AwardsPage.jsx     — scroll-driven timeline of competition awards; uses useTimelineProgress
                       and useActiveTimelineYear to sync a decade tab bar with scroll position
  LocationPage.jsx   — branch selector (LocationTabs) + info card + Kakao Maps
  CoursesGiftedPage.jsx — 영재고·과학고 내신 curriculum page; tabs reference /courses/olympiad
                          and /courses/certification (→ ComingSoonPage); static image content
  NoticePage.jsx     — filterable notice board; category filter + keyword search across
                       title/content/author; admin write button shown to isAdminUser()
  NoticeDetailPage.jsx — single notice view; requires login; admin edit button shown to isAdminUser()
  NoticeWritePage.jsx  — admin write form for notices; uses addNotice() from noticeService
  NoticeEditPage.jsx   — admin edit form for notices; uses fetchNoticeById() + updateNotice()
  OpeningNoticePage.jsx — opening-news board; same layout/CSS as NoticePage, no auth gate
  OpeningNoticeDetailPage.jsx — single opening-news view; uses fetchOpeningNoticeById()
  OpeningNoticeWritePage.jsx  — admin write form for opening-news; uses addOpeningNotice()
  NewsPage.jsx       — news board; same layout as NoticePage; fetches from newsService
  NewsDetailPage.jsx — single news view; uses fetchNewsById() + incrementNewsViews()
  NewsWritePage.jsx  — write form for news; uses addNews() from newsService
  NewsEditPage.jsx   — edit form for news; uses fetchNewsById() + updateNews()
  LoginPage.jsx      — email + Google + Apple sign-in (lazy loaded); single component
                       manages both 'login' and 'forgot' views via a `view` state string
  SignUpPage.jsx     — email registration
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
  home/              — home-page section components
                       (NewsNoticeSection, EducationFieldSection, AcademyIntroSection, LocationSection)
  cards/             — NewsNoticeColumn, NewsNoticeItem, EducationFieldCard, AcademyIntroCard
  location/          — LocationInfoCard, LocationTabs, MapBox
  awards/
    AwardsTimeline.jsx — scroll-animated vertical timeline grouped by year
    DecadeTabs.jsx     — sticky decade filter tabs (e.g. "2020s", "2010s")
  auth/
    GoogleLoginButton.jsx
firebase/
  firebase.js        — initialises Firebase only when all env vars are present;
                       exports auth, db, storage, isFirebaseConfigured, isAppleAuthEnabled
services/
  authService.js       — loginWithGoogle, loginWithApple, loginWithEmail, signUpWithEmail,
                         sendPasswordReset, logout; each calls ensureFirebaseConfigured() before use
  noticeService.js     — Firestore CRUD for notices (`notices`) and opening-notices (`opening-notices`);
                         image upload via cloudinaryService; falls back to static data when unconfigured
  newsService.js       — Firestore CRUD for news (`news`); image upload via cloudinaryService;
                         falls back to static newsData when unconfigured
  cloudinaryService.js — uploadImages(files[]) → secure_url[]; requires Cloudinary env vars
hooks/
  useAuth.js              — useAuth() → { user, loading }; subscribes to onAuthStateChanged
  useTimelineProgress.js  — rAF scroll hook; returns 0–1 progress of containerRef through viewport
  useActiveTimelineYear.js — IntersectionObserver hook; watches year section elements and
                             returns the year whose data-year element is closest to viewport center
data/                — static JS arrays: newsData, noticeData, openingNewsData,
                       educationFieldsData, academyIntroData, locationData,
                       quickMenuData, seminarData, footerData, mobileMenuData,
                       teacherData, awardsData
utils/
  admin.js           — isAdminUser(user) checks user.email against VITE_ADMIN_EMAILS
  firebaseErrorMessage.js  — maps Firebase auth error codes to Korean user-facing strings
```

### Implementation status

All sections are fully implemented. Unimplemented routes point to `ComingSoonPage` (`/courses/olympiad`, `/courses/certification`, `/opening-news/**`).

### Sub-page layout pattern

All implemented sub-pages use `<SubPageHero eyebrow="..." title="..." tabs={heroTabs} />` at the top — the `tabs` prop renders an in-hero tab nav. After the hero, every page has a `.subpage-breadcrumb` bar. New sub-pages should follow: `SubPageHero` → breadcrumb → content.

Desktop nav and breadcrumb are separate sources of truth: `navItems` in `Header.jsx` (desktop) and `mobileMenuData` in `src/data/mobileMenuData.js` (mobile) must both be updated when adding new routes.

### Notice / News boards

All three boards (공지사항, 개강소식, 뉴스) share the same `NoticePage.css` and `notice-board__*` BEM block. Each has list → detail → write → edit pages backed by Firestore, with static data as fallback.

- **noticeService.js**: Firestore collection `notices`; opening-notices use `opening-notices`. Images are uploaded to **Cloudinary** via `cloudinaryService.js` (`uploadImages()`). `fetchNotices()` merges Firestore docs (newest first) with static `noticeData`. Also exports `deleteNotice()` and `deleteOpeningNotice()`.
- **newsService.js**: Firestore collection `news`; same Cloudinary upload pattern and merge with static `newsData`. Also exports `deleteNews()`.
- **cloudinaryService.js**: `uploadImages(files[])` — uploads to Cloudinary using unsigned preset; returns array of `secure_url` strings. Requires `VITE_CLOUDINARY_CLOUD_NAME` and `VITE_CLOUDINARY_UPLOAD_PRESET`.
- Content is stored as a `string[]` (paragraphs split on `\n`, trimmed, empty lines dropped). A `summary` field holds the first 80 chars of the first paragraph.
- Write forms use the `nw-form` BEM block (defined in `NoticeWritePage.css`). Image upload is limited to 5 files; previews use `URL.createObjectURL`. On submit, the form calls the service, shows a toast, then navigates back after 1.5 s.
- `NoticeDetailPage` requires authentication (redirects to `/login` with `state.from`). `OpeningNoticeDetailPage` and `NewsDetailPage` have no auth gate. All detail pages call `increment*Views()` to bump the Firestore view count (skipped for static-data items).
- The write button on `NewsPage` is always visible (no `isAdminUser` guard). The write/edit buttons on notice and opening-notice pages are guarded by `isAdminUser`.

### Awards page

`AwardsPage` drives a scroll-synced timeline. `awardsData` in `src/data/awardsData.js` is an array of `{ year, decade, competitions[] }` where each competition has `{ title, notes[], categories[] }` and each category has `{ title, awards[] }` with `{ rank, winners[] }`. `decades` (also exported) is a derived list of unique decade strings (e.g. `'2020s'`). The `DecadeTabs` component scrolls to the first year of that decade via `yearRefs`.

### MainVisual (Swiper)

`MainVisual.jsx` uses **Swiper** with `Autoplay` and `EffectFade` modules. Each slide entry requires both a desktop (`_d.jpg`) and a mobile (`_m.png`) image rendered via `<picture><source media="(max-width: 768px)">`. Each slide has a `theme` (`'light'` or `'dark'`) dispatched as a `header-theme` CustomEvent so `Header` and `FloatingQuickMenu` can adapt their appearance.

### SeminarSection (Swiper)

`SeminarSection.jsx` renders YouTube seminar cards in a Swiper carousel (`slidesPerView="auto"`, centred, looping). Data comes from `src/data/seminarData.js` — each entry has `{ id, videoId, title, description, youtubeUrl }`. Thumbnails are fetched from `https://img.youtube.com/vi/{videoId}/maxresdefault.jpg`. Cards with a `youtubeUrl` render as `<a target="_blank">`; cards without render as `<div>` with a "준비 중" overlay.

### Cross-component theme communication

`MainVisual` fires `window.dispatchEvent(new CustomEvent('header-theme', { detail: { theme } }))` on every slide change and stores the value in `window.__slideTheme` (for components that mount after the event fires). `Header` and `FloatingQuickMenu` both listen for this event to switch between light/dark styling. Do not remove `window.__slideTheme` — it is the fallback for late-mounting consumers.

### Header / MobileMenu

`Header.jsx` implements a megamenu dropdown for desktop: hover on a nav item reveals all submenu columns simultaneously with a sliding indicator (`header__dropdown-indicator`) that translates to the active column. Position is recalculated on resize via `getBoundingClientRect`. The `navItems` array in `Header.jsx` is the single source of truth for desktop nav structure.

`MobileMenu.jsx` is a separate full-screen overlay driven by `mobileMenuData` (separate source of truth from `navItems`). The hamburger button in `Header.jsx` controls the `isOpen` state passed down to `MobileMenu`.

### AOS animations

`App.jsx` calls `AOS.init()` once on mount and `AOS.refresh()` on every route change. Add scroll-reveal to elements with `data-aos="fade-up"` (or other presets). Use `data-aos-delay={n}` (ms) for staggered children.

### AcademyIntroSection

Has a CSS marquee (`academy-intro__marquee-track`) running vertically in the background. The section background uses `<ShaderGradientCanvas>` / `<ShaderGradient>` from `@shadergradient/react` (backed by Three.js) for an animated gradient effect.

### MapBox

`src/components/location/MapBox.jsx` uses the **Kakao Maps SDK** (not Leaflet — the CLAUDE.md previously said Leaflet, but the map has been replaced). The SDK script is loaded dynamically via a singleton promise (`loadKakaoScript`) keyed to `VITE_KAKAO_MAP_APP_KEY`. It renders in an idle → loading → ready/error state. Props: `lat`, `lng`, `name`.

### teacherData shape

`src/data/teacherData.js` exports `teacherData` — an array of `{ id, name, role, field, career[], email, campuses[], image, message }`. The `image` field currently holds Unsplash placeholder URLs; replace with real hosted images when available.

### Static assets

- `src/assets/` — images imported directly in JSX (e.g., `hancom_logo.png`, `about-hero-3d.png`, `main_slide*_d.png`, `main_slide*_m.png`)
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
