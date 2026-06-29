# 한글과 컴퓨터 학원 Website

<!--
  README 템플릿 사용법
  - 아래 섹션 순서는 유지하고, 프로젝트에 맞게 내용만 교체하세요.
  - 이미지, 링크, 기여도, Trouble Shooting은 실제 작업 내역으로 업데이트하세요.
  - GitHub Preview에서 깨지지 않도록 Markdown 문법만 사용했습니다.
-->

## 1. 프로젝트 소개

한글과 컴퓨터 학원 웹사이트를 React 기반 SPA로 구현한 프로젝트입니다.  
메인 슬라이드, 반응형 헤더, 모바일 메뉴, 교육 과정 소개, 위치 안내, 로그인/회원가입 기능을 포함합니다.

> 예시 문구: 이 프로젝트는 `{서비스명}`의 브랜드 소개와 사용자 진입 경험을 개선하기 위해 제작한 `{웹사이트/웹앱}`입니다.

| 항목 | 내용 |
| --- | --- |
| 프로젝트명 | 한글과 컴퓨터 학원 Website |
| 프로젝트 유형 | 교육기관 웹사이트 / React SPA |
| 주요 목적 | 학원 소개, 교육 과정 안내, 사용자 인증, 반응형 UX 구현 |
| 배포 환경 | Vercel |

## 2. Before / After 이미지

<!-- 이미지는 GitHub 저장소에 업로드한 뒤 경로를 교체하세요. -->

| Before | After |
| --- | --- |
| ![Before](./docs/images/before.png) | ![After](./docs/images/after.png) |

> 이미지가 없다면 `docs/images` 폴더를 만들고 화면 캡처 이미지를 추가하세요.

## 3. 주의사항

- Firebase 환경변수는 `.env` 파일에서 관리하며 GitHub에 업로드하지 않습니다.
- 일부 메뉴는 준비 중 페이지로 연결됩니다.
- 로컬 실행 시 Node.js와 npm 설치가 필요합니다.
- 이미지 경로와 정적 파일 경로를 변경할 경우 Vite 빌드 결과를 반드시 확인해야 합니다.

```env
# .env 예시
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_ENABLE_APPLE=false
```

## 4. 프로젝트 정보

### 담당 역할

| 역할 | 내용 |
| --- | --- |
| Frontend | React SPA 구조 설계 및 UI 구현 |
| UI/UX | 반응형 레이아웃, 메인 비주얼, 헤더/드롭다운, 모바일 메뉴 구현 |
| Auth | Firebase Authentication 기반 로그인/회원가입 구현 |
| Data | 화면별 데이터 분리 및 컴포넌트 재사용 구조 작성 |
| Deploy | Vercel 배포 환경 구성 |

### 작업 기간 2026.6.8~6.28

| 구분 | 기간 |
| --- | --- |
| 기획 및 구조 설계 | 2026.06.08 ~ 2026.06.10 |
| UI 구현 | 2026.06.11 ~ 2026.06.20 |
| 인증 및 기능 구현 | 2026.06.21 ~ 2026.06.25 |
| 테스트 및 배포 | 2026.06.26 ~ 2026.06.28 |

### 기여도

| 항목 | 기여도 |
| --- | --- |
| 화면 구현 | 100% |
| 반응형 구현 | 100% |
| 컴포넌트 구조화 | 100% |
| 인증 기능 연동 | 100% |
| 배포 | 100% |

## 5. 기술 스택

| 분류 | 기술 |
| --- | --- |
| Frontend | React 19, JavaScript |
| Build Tool | Vite 8 |
| Routing | React Router DOM |
| UI Interaction | Swiper, AOS, React Icons |
| 3D / Visual | Three.js, React Three Fiber, ShaderGradient |
| Auth / DB | Firebase Authentication, Cloud Firestore |
| Map | Leaflet |
| Lint | ESLint |
| Deploy | Vercel |

## 6. AI 활용

### 사용한 AI 도구

| 도구 | 활용 목적 |
| --- | --- |
| Claude | 웹사이트 구현 보조, UI 코드 개선 |
| Codex | 코드 분석, README 작성, 구현 흐름 점검 |
| ChatGPT | 프롬프트 재구성, 문서화 방향 정리 |

### AI 활용 내용

- Claude, Codex를 활용한 웹사이트 구현 보조
- 웹사이트 구현 프롬프트 재구성
- 컴포넌트 구조와 README 문서화 방향 검토
- 반복되는 UI 패턴 정리 및 개선 아이디어 도출

### 직접 구현한 내용

- React 기반 전체 페이지 구조 설계
- 메인 비주얼 슬라이드 및 반응형 이미지 적용
- 헤더 드롭다운, 모바일 메뉴, 플로팅 퀵메뉴 구현
- Firebase 이메일/소셜 로그인 기능 구현
- 데이터 파일 기반 카드/섹션 렌더링 구조 구현
- Vercel 배포 및 환경변수 구성

## 7. 프로젝트 링크

- 배포 링크: [https://hancom-academy.vercel.app/](https://hancom-academy.vercel.app/)
- GitHub Repository: `<!-- 저장소 URL을 입력하세요 -->`

## 8. 프로젝트 개요

한글과 컴퓨터 학원 웹사이트는 교육기관의 브랜드 정보, 교육 과정, 설명회, 위치 안내를 한 화면 흐름으로 제공하는 웹사이트입니다.  
메인 페이지는 첫 화면에서 메인 비주얼과 공지 영역을 함께 노출하고, 이후 교육 과정과 학원 소개 정보를 순차적으로 탐색할 수 있도록 구성했습니다.

```text
방문자 진입
  -> 메인 비주얼 확인
  -> 교육 과정 탐색
  -> 학원 소개 및 설명회 확인
  -> 위치/문의 또는 로그인
```

## 9. 주요 기능

- ✅ 메인 비주얼 자동 슬라이드
- ✅ 데스크탑/모바일 반응형 이미지 분기
- ✅ 헤더 드롭다운 메뉴
- ✅ 모바일 아코디언 메뉴
- ✅ 플로팅 퀵메뉴 및 상단 이동 버튼
- ✅ 교육 과정 카드형 콘텐츠
- ✅ 설명회 Swiper 슬라이드
- ✅ Firebase 이메일 로그인/회원가입
- ✅ Google 로그인
- ✅ 비밀번호 재설정
- ✅ 준비 중 페이지 및 서브페이지 라우팅

## 10. 핵심 구현 내용

| 구현 항목 | 설명 |
| --- | --- |
| SPA 라우팅 | `react-router-dom`의 `createBrowserRouter`로 페이지 라우팅 구성 |
| 메인 슬라이드 | `swiper`의 Autoplay, EffectFade 모듈을 활용해 메인 비주얼 구현 |
| 반응형 이미지 | `<picture>`와 `<source>`를 사용해 데스크탑/모바일 이미지 분기 |
| 헤더 테마 | 슬라이드 테마 이벤트를 기반으로 헤더 색상 상태 변경 |
| 인증 상태 관리 | Firebase `onAuthStateChanged`를 커스텀 훅으로 분리 |
| 데이터 분리 | 교육 과정, 공지, 설명회, 퀵메뉴 데이터를 `src/data`로 분리 |
| 인터랙션 | AOS, Swiper, 스크롤 이벤트를 조합해 동적인 화면 경험 구현 |

```jsx
// 예시: 메인 슬라이드 이미지 분기 구조
<picture>
  <source media="(max-width: 768px)" srcSet={slide.mobileSrc} />
  <img src={slide.src} alt="메인 슬라이드" />
</picture>
```

## 11. Trouble Shooting

| 문제 | 원인 | 해결 |
| --- | --- | --- |
| Firebase 설정 누락 시 인증 오류 | 환경변수 미설정 | `isFirebaseConfigured`로 설정 여부를 확인하고 예외 처리 |
| 모바일 메뉴 오픈 시 배경 스크롤 발생 | body 스크롤 제어 없음 | 메뉴 오픈 상태에서 `body.style.overflow = 'hidden'` 적용 |
| 페이지 이동 후 AOS 애니메이션 미갱신 | SPA 라우팅에서 DOM 변경 후 AOS refresh 필요 | `location` 변경 시 `AOS.refresh()` 실행 |
| 로그인 상태 유지 옵션 필요 | 세션/로컬 persistence 분기 필요 | `rememberMe` 값에 따라 Firebase persistence 설정 |

```js
await setPersistence(
  auth,
  rememberMe ? browserLocalPersistence : browserSessionPersistence
)
```

## 12. 성능 최적화

- 로그인 페이지를 `lazy`와 `Suspense`로 분리해 초기 로딩 부담을 줄였습니다.
- 이미지 에셋은 Vite 번들링을 통해 해시 파일로 관리됩니다.
- 반복 UI는 데이터 배열 기반 렌더링으로 중복 코드를 줄였습니다.
- Swiper, AOS 등 인터랙션 라이브러리는 필요한 컴포넌트에서만 import했습니다.

### 체크리스트

- [x] 프로덕션 빌드 확인
- [x] 라우팅 구조 분리
- [x] 이미지 에셋 import 관리
- [x] 인증 로직 서비스 분리
- [ ] 이미지 포맷 WebP 전환 검토
- [ ] 라우트 단위 코드 스플리팅 확대

## 13. 데이터 구조

프로젝트의 주요 화면 데이터는 `src/data` 폴더에서 관리합니다.

| 파일 | 역할 |
| --- | --- |
| `academyIntroData.js` | 학원 소개 시스템 카드 데이터 |
| `educationFieldsData.js` | 교육 과정 카드 데이터 |
| `seminarData.js` | 설명회 슬라이드 데이터 |
| `newsData.js` | 뉴스 데이터 |
| `noticeData.js` | 공지 데이터 |
| `openingNewsData.js` | 개강 소식 데이터 |
| `quickMenuData.js` | 플로팅 퀵메뉴 데이터 |
| `teacherData.js` | 강사진 데이터 |
| `footerData.js` | 푸터 정보 데이터 |

```js
// 예시 데이터 구조
{
  id: 1,
  title: '교육 과정명',
  description: '교육 과정 설명',
  image: '/images/example.png',
  path: '/education/example'
}
```

## 14. 프로젝트 구조

```text
hancom-academy/
├─ public/
│  ├─ favicon.svg
│  └─ icons.svg
├─ src/
│  ├─ assets/              # 이미지 에셋
│  ├─ components/          # 공통 및 섹션 단위 컴포넌트
│  │  ├─ auth/
│  │  ├─ cards/
│  │  ├─ common/
│  │  ├─ home/
│  │  └─ location/
│  ├─ data/                # 화면 데이터
│  ├─ firebase/            # Firebase 설정
│  ├─ hooks/               # 커스텀 훅
│  ├─ pages/               # 라우트 페이지
│  ├─ sections/            # 메인 페이지 섹션
│  ├─ services/            # 서비스 로직
│  ├─ utils/               # 유틸 함수
│  ├─ App.jsx
│  ├─ main.jsx
│  └─ router.jsx
├─ package.json
└─ README.md
```

## 15. 실행 방법

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

## 16. 개선 예정

- [ ] 전체 페이지 콘텐츠 확장
- [ ] 공지사항/뉴스 상세 페이지 구현
- [ ] 관리자 페이지 또는 CMS 연동 검토
- [ ] 이미지 WebP 최적화
- [ ] SEO 메타 태그 개선
- [ ] 접근성 점검 및 키보드 탐색 개선
- [ ] 테스트 코드 도입

## 17. 프로젝트를 통해 배운 점

- React SPA에서 라우팅, 레이아웃, 공통 UI를 분리하는 방법을 익혔습니다.
- Firebase Authentication을 활용해 이메일/소셜 로그인 흐름을 구현했습니다.
- Swiper와 AOS를 활용해 정적인 페이지에 자연스러운 인터랙션을 추가했습니다.
- 반응형 웹에서 데스크탑/모바일 이미지와 메뉴 구조를 다르게 설계하는 경험을 쌓았습니다.
- AI 도구를 활용하되, 최종 구조와 동작은 직접 검증하는 과정의 중요성을 배웠습니다.

## 18. 프로젝트 회고

이번 프로젝트는 단순한 랜딩 페이지가 아니라 실제 교육기관 웹사이트에 필요한 정보 구조와 사용자 흐름을 고려하며 제작했습니다.  
컴포넌트 재사용, 데이터 분리, 인증 기능, 반응형 메뉴를 구현하면서 프론트엔드 프로젝트의 전체 흐름을 경험할 수 있었습니다.

좋았던 점:

- 화면 단위 컴포넌트를 분리해 유지보수성을 높였습니다.
- 메인 비주얼과 퀵메뉴를 통해 첫 화면의 사용성을 강화했습니다.
- Firebase 인증을 직접 연결하며 실서비스에 가까운 기능을 구현했습니다.

아쉬운 점:

- 일부 서브페이지는 준비 중 상태로 남아 있습니다.
- 이미지 최적화와 테스트 자동화는 추가 개선이 필요합니다.
- 콘텐츠 관리 구조를 더 확장성 있게 개선할 여지가 있습니다.

## 19. License

<!-- 프로젝트 정책에 맞게 라이선스를 선택하세요. -->

이 프로젝트는 포트폴리오 용도로 제작되었습니다.  
상업적 사용 또는 재배포 시 프로젝트 소유자의 허가가 필요합니다.

```text
Copyright (c) 2026 한글과 컴퓨터 학원 Website
All rights reserved.
```
