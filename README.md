# 한글과 컴퓨터 학원 Website

## 1. 프로젝트 소개

한글과 컴퓨터 학원 웹사이트를 React 기반 SPA로 구현한 프로젝트입니다.  
메인 슬라이드, 반응형 헤더, 모바일 메뉴, 교육 과정 소개, 공지/뉴스 게시판, 위치 안내, 로그인/회원가입 기능을 포함합니다.

| 항목 | 내용 |
| --- | --- |
| 프로젝트명 | 한글과 컴퓨터 학원 Website |
| 프로젝트 유형 | 교육기관 웹사이트 / React SPA |
| 주요 목적 | 학원 소개, 교육 과정 안내, 사용자 인증, 반응형 UX 구현 |
| 배포 환경 | Vercel |

## 2. 주의사항

- Firebase 환경변수는 `.env` 파일에서 관리하며 GitHub에 업로드하지 않습니다.
- 일부 메뉴는 준비 중 페이지로 연결됩니다.
- 로컬 실행 시 Node.js와 npm 설치가 필요합니다.

```env
# .env 예시
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_ENABLE_APPLE=false
VITE_ADMIN_EMAILS=admin@example.com
```

## 3. 프로젝트 정보

### 담당 역할

| 역할 | 내용 |
| --- | --- |
| Frontend | React SPA 구조 설계 및 전체 UI 구현 |
| UI/UX | 반응형 레이아웃, 메인 비주얼, 헤더/드롭다운, 모바일 메뉴 구현 |
| Auth | Firebase Authentication 기반 로그인/회원가입 구현 |
| Board | Firestore 기반 공지사항·개강소식·뉴스 CRUD 구현 |
| Data | 화면별 데이터 분리 및 컴포넌트 재사용 구조 작성 |
| Deploy | Vercel 배포 환경 구성 |

### 작업 기간

| 구분 | 기간 |
| --- | --- |
| 기획 및 구조 설계 | 2026.06.08 ~ 2026.06.10 |
| 메인/공통 UI 구현 | 2026.06.11 ~ 2026.06.18 |
| 서브페이지 및 게시판 구현 | 2026.06.19 ~ 2026.06.28 |
| 교육과정 페이지 및 UI 개선 | 2026.06.29 ~ 2026.07.01 |

### 기여도

| 항목 | 기여도 |
| --- | --- |
| 화면 구현 | 100% |
| 반응형 구현 | 100% |
| 컴포넌트 구조화 | 100% |
| 인증 기능 연동 | 100% |
| 게시판 CRUD | 100% |
| 배포 | 100% |

## 4. 기술 스택

| 분류 | 기술 |
| --- | --- |
| Frontend | React 19, JavaScript |
| Build Tool | Vite 8 |
| Routing | React Router DOM v7 |
| UI Interaction | Swiper v12, AOS, React Icons |
| 3D / Visual | Three.js, React Three Fiber, ShaderGradient |
| Auth / DB | Firebase Authentication, Cloud Firestore, Firebase Storage |
| Map | Leaflet |
| Lint | ESLint (Flat Config) |
| Deploy | Vercel |

## 5. AI 활용

### 사용한 AI 도구

| 도구 | 활용 목적 |
| --- | --- |
| Claude | 웹사이트 구현 보조, UI 코드 개선, 컴포넌트 설계 |
| Codex | 코드 분석, README 작성, 구현 흐름 점검 |
| ChatGPT | 프롬프트 재구성, 문서화 방향 정리 |

### AI 활용 내용

- Claude를 활용한 전체 UI 구현 및 컴포넌트 설계 보조
- 게시판 Firestore CRUD 연동 및 에러 처리 구현 보조
- 반복되는 UI 패턴 정리 및 반응형 개선 아이디어 도출

### 직접 구현한 내용

- React 기반 전체 페이지 구조 설계 및 라우팅 구성
- 메인 비주얼 슬라이드 및 반응형 이미지 적용
- 헤더 드롭다운, 모바일 메뉴, 플로팅 퀵메뉴 구현
- Firebase 이메일/소셜 로그인 및 공지·뉴스 게시판 연동
- Vercel 배포 및 환경변수 구성

## 6. 프로젝트 링크

- 배포 링크: [https://hancom-academy.vercel.app/](https://hancom-academy.vercel.app/)
- GitHub Repository: [https://github.com/cksal3941/hancom-academy](https://github.com/cksal3941/hancom-academy)

## 7. 프로젝트 개요

한글과 컴퓨터 학원 웹사이트는 교육기관의 브랜드 정보, 교육 과정, 설명회, 위치 안내를 한 화면 흐름으로 제공하는 웹사이트입니다.  
메인 페이지는 첫 화면에서 메인 비주얼과 공지 영역을 함께 노출하고, 이후 교육 과정과 학원 소개 정보를 순차적으로 탐색할 수 있도록 구성했습니다.

```text
방문자 진입
  → 메인 비주얼 확인
  → 공지 및 뉴스 탐색
  → 교육 과정 탐색
  → 학원 소개 및 설명회 확인
  → 위치/문의 또는 로그인
```

## 8. 주요 기능

- ✅ 메인 비주얼 자동 슬라이드 (Swiper EffectFade)
- ✅ 데스크탑/모바일 반응형 이미지 분기
- ✅ 헤더 드롭다운 메뉴 (슬라이드 테마 연동)
- ✅ 모바일 아코디언 메뉴
- ✅ 플로팅 퀵메뉴 및 상단 이동 버튼
- ✅ 교육 과정 카드형 콘텐츠
- ✅ 교육설명회 Swiper 슬라이드 (YouTube 연동)
- ✅ 공지사항 게시판 (목록·상세·작성·수정, Firestore, 로그인 필요)
- ✅ 개강소식 게시판 (목록·상세·작성)
- ✅ 뉴스 게시판 (목록·상세·작성·수정)
- ✅ 수상실적 스크롤 타임라인
- ✅ 오시는 길 지도 + 카카오·네이버·구글·티맵 길찾기 버튼
- ✅ Firebase 이메일 로그인/회원가입
- ✅ Google 소셜 로그인
- ✅ 비밀번호 재설정
- ✅ 로그인 후 원래 페이지 자동 복귀 + 팝업 안내
- ✅ 관리자 전용 작성·수정 버튼 (이메일 기반)
- ✅ 영재고·과학고 내신 교육과정 페이지
- ✅ 온라인수업 Zoom 바로가기 버튼

## 9. 핵심 구현 내용

| 구현 항목 | 설명 |
| --- | --- |
| SPA 라우팅 | `react-router-dom`의 `createBrowserRouter`로 페이지 라우팅 구성 |
| 메인 슬라이드 | Swiper Autoplay + EffectFade로 메인 비주얼 구현, 슬라이드 테마를 CustomEvent로 헤더에 전달 |
| 반응형 이미지 | `<picture>`와 `<source>`로 데스크탑/모바일 이미지 분기 |
| 게시판 CRUD | Firestore 연동, 이미지 Storage 업로드, 정적 데이터 fallback 처리 |
| 수상실적 타임라인 | `rAF` 스크롤 훅 + `IntersectionObserver`로 연도 진행 바 애니메이션 구현 |
| 인증 상태 관리 | Firebase `onAuthStateChanged`를 커스텀 훅으로 분리 |
| 관리자 권한 | `VITE_ADMIN_EMAILS` 환경변수로 이메일 기반 관리자 판별 |
| 인증 게이트 | 공지사항 목록·상세 미로그인 시 `/login` 리다이렉트, 로그인 후 원래 페이지 복귀 |
| 로그인 팝업 | 인증 필요 페이지에서 넘어올 때 5초 팝업 안내 후 자동 소멸 |
| 지도 길찾기 | Leaflet 지도 + 카카오·네이버·구글·티맵 딥링크 버튼 |
| 데이터 분리 | 교육 과정, 공지, 설명회, 퀵메뉴 데이터를 `src/data`로 분리 |

```jsx
// 메인 슬라이드 테마 이벤트 전파
window.dispatchEvent(new CustomEvent('header-theme', { detail: { theme } }))
```

## 10. Trouble Shooting

| 문제 | 원인 | 해결 |
| --- | --- | --- |
| Firebase 설정 누락 시 인증 오류 | 환경변수 미설정 | `isFirebaseConfigured`로 설정 여부를 확인하고 예외 처리 |
| 모바일 메뉴 오픈 시 배경 스크롤 발생 | body 스크롤 제어 없음 | 메뉴 오픈 상태에서 `body.style.overflow = 'hidden'` 적용 |
| 페이지 이동 후 AOS 애니메이션 미갱신 | SPA 라우팅에서 DOM 변경 후 AOS refresh 필요 | `location` 변경 시 `AOS.refresh()` 실행 |
| 태블릿 스크롤 스냅 오작동 | `scroll-snap-type: y proximity`가 태블릿에서도 동작 | 태블릿 미디어 쿼리에서 `scroll-snap-type: none` 적용 |
| Swiper 섹션 스크롤 시 카드 잘림 | 부모에 `overflow: hidden` 적용 | `overflow-x: clip`으로 변경해 세로 클리핑 해제 |
| 로그인 상태 유지 옵션 | 세션/로컬 persistence 분기 필요 | `rememberMe` 값에 따라 Firebase persistence 설정 |

```js
await setPersistence(
  auth,
  rememberMe ? browserLocalPersistence : browserSessionPersistence
)
```

## 11. 성능 최적화

- 로그인 페이지를 `lazy`와 `Suspense`로 분리해 초기 로딩 부담을 줄였습니다.
- 이미지 에셋은 Vite 번들링을 통해 해시 파일로 관리됩니다.
- 반복 UI는 데이터 배열 기반 렌더링으로 중복 코드를 최소화했습니다.
- Swiper, AOS 등 인터랙션 라이브러리는 필요한 컴포넌트에서만 import했습니다.

### 체크리스트

- [x] 프로덕션 빌드 확인
- [x] 라우팅 구조 분리
- [x] 이미지 에셋 import 관리
- [x] 인증 로직 서비스 분리
- [x] 게시판 Firestore 연동
- [ ] 이미지 포맷 WebP 전환 검토
- [ ] 라우트 단위 코드 스플리팅 확대

## 12. 데이터 구조

프로젝트의 주요 화면 데이터는 `src/data` 폴더에서 관리합니다.

| 파일 | 역할 |
| --- | --- |
| `educationFieldsData.js` | 교육 과정 카드 데이터 |
| `seminarData.js` | 교육설명회 슬라이드 데이터 (YouTube 연동) |
| `academyIntroData.js` | 학원 소개 시스템 카드 데이터 |
| `awardsData.js` | 수상실적 타임라인 데이터 |
| `teacherData.js` | 강사진 데이터 |
| `locationData.js` | 지점별 위치 및 지도 데이터 |
| `newsData.js` | 뉴스 정적 fallback 데이터 |
| `noticeData.js` | 공지사항 정적 fallback 데이터 |
| `openingNewsData.js` | 개강소식 정적 fallback 데이터 |
| `quickMenuData.js` | 플로팅 퀵메뉴 데이터 |
| `mobileMenuData.js` | 모바일 메뉴 구조 데이터 |
| `footerData.js` | 푸터 정보 데이터 |

## 13. 프로젝트 구조

```text
hancom-academy/
├─ public/
│  ├─ favicon_logo.png
│  ├─ favicon.svg
│  ├─ icons.svg
│  └─ images/              # 정적 경로 이미지
├─ src/
│  ├─ assets/              # 번들링 이미지 에셋
│  ├─ components/
│  │  ├─ auth/             # GoogleLoginButton
│  │  ├─ awards/           # AwardsTimeline, DecadeTabs
│  │  ├─ cards/            # 카드 컴포넌트
│  │  ├─ common/           # SubPageHero, MobileMenu
│  │  ├─ home/             # 홈 섹션 컴포넌트
│  │  └─ location/         # 지도 관련 컴포넌트
│  ├─ data/                # 화면 데이터
│  ├─ firebase/            # Firebase 설정
│  ├─ hooks/               # useAuth, useTimelineProgress 등
│  ├─ pages/               # 라우트 페이지
│  ├─ sections/            # 메인 페이지 전체 섹션
│  ├─ services/            # authService, noticeService, newsService
│  ├─ utils/               # admin.js, firebaseErrorMessage.js
│  ├─ App.jsx
│  ├─ main.jsx
│  └─ router.jsx
├─ .env
├─ package.json
└─ README.md
```

## 14. 실행 방법

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

### 프로덕션 빌드

```bash
npm run build
```

### 빌드 결과 미리보기

```bash
npm run preview
```

### 코드 검사

```bash
npm run lint
```

## 15. 개선 예정

- [ ] 정보올림피아드, OA·자격증 교육과정 페이지 구현
- [ ] 관리자 페이지 또는 CMS 연동 검토
- [ ] 이미지 WebP 최적화
- [ ] SEO 메타 태그 개선
- [ ] 접근성 점검 및 키보드 탐색 개선

## 16. 프로젝트를 통해 배운 점

- React SPA에서 라우팅, 레이아웃, 공통 UI를 분리하는 방법을 익혔습니다.
- Firebase Authentication과 Firestore를 활용해 실서비스 수준의 게시판을 구현했습니다.
- Swiper, AOS, Leaflet 등 다양한 라이브러리를 조합해 풍부한 인터랙션을 구현했습니다.
- 반응형 웹에서 데스크탑/태블릿/모바일 각 브레이크포인트별 UI를 설계하는 경험을 쌓았습니다.
- AI 도구를 활용하되, 최종 구조와 동작은 직접 검증하는 과정의 중요성을 배웠습니다.

## 17. 프로젝트 회고

이번 프로젝트는 단순한 랜딩 페이지가 아니라 실제 교육기관 웹사이트에 필요한 정보 구조와 사용자 흐름을 고려하며 제작했습니다.  
컴포넌트 재사용, 데이터 분리, 인증 기능, 반응형 메뉴, Firestore 게시판 연동까지 프론트엔드 프로젝트의 전체 흐름을 경험할 수 있었습니다.

**좋았던 점:**
- 화면 단위 컴포넌트를 분리해 유지보수성을 높였습니다.
- Firestore 연동으로 실제 데이터 흐름을 경험했습니다.
- 메인 비주얼과 퀵메뉴를 통해 첫 화면의 사용성을 강화했습니다.

**아쉬운 점:**
- 일부 교육과정 서브페이지는 아직 준비 중 상태입니다.
- 이미지 최적화와 테스트 자동화는 추가 개선이 필요합니다.

## 18. License

이 프로젝트는 포트폴리오 용도로 제작되었습니다.  
상업적 사용 또는 재배포 시 프로젝트 소유자의 허가가 필요합니다.

```text
Copyright (c) 2026 한글과 컴퓨터 학원 Website
All rights reserved.
```
