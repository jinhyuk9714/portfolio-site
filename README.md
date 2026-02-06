# 포트폴리오 사이트

Next.js 15 (App Router) + TypeScript + Tailwind CSS 기반 포트폴리오 사이트.
"Terminal Elegance" 테마, 다크/라이트 모드, 커맨드 팔레트(⌘K), 프로젝트 필터링 등 인터랙티브 기능 포함.

## 주요 기능

- **다크/라이트 모드**: 시스템 설정 감지 + 수동 전환, localStorage 저장
- **커맨드 팔레트 (⌘K)**: 페이지 내비게이션, 프로젝트 바로가기, 이력서 다운로드
- **프로젝트 필터링**: 기술 스택별 필터 (다중 선택)
- **Mermaid 다이어그램**: 아키텍처, ERD, 시퀀스 다이어그램 렌더링
- **페이지 전환 애니메이션**: Framer Motion 기반
- **스크롤 프로그레스 바**: 상단 고정 진행률 표시
- **이미지 라이트박스**: 클릭으로 이미지 확대
- **정적 빌드**: `output: "export"`로 어디서든 배포 가능

## 기술 스택

- **Framework**: Next.js 15, React 19, TypeScript 5
- **Styling**: Tailwind CSS 3.4
- **Animation**: Framer Motion 12
- **Diagrams**: Mermaid 11
- **Fonts**: Sora, JetBrains Mono

## 실행

```bash
npm install
```

- **개발** (핫 리로드): `npm run dev` → http://localhost:3000
- **정적 빌드 후 서빙**: `npm run build` → `npm run start`
- **빌드 + 서빙 한 번에**: `npm run preview`
- **린트 검사**: `npm run lint`

> `data/` 파일 수정 후 dev 모드는 새로고침으로 반영되지만, 프로덕션은 `npm run build`를 다시 해야 반영됩니다.

## 수정할 곳

| 파일 | 내용 |
|------|------|
| `data/profile.ts` | 이름, 한 줄 소개, 이메일, GitHub, LinkedIn, 이력서 URL |
| `data/projects.ts` | 프로젝트 목록 (제목, 설명, 스택, 다이어그램, GitHub/데모 링크) |
| `data/skills.ts` | 기술 스택 카테고리, 숙련도, 주요 성과 수치 |
| `public/image/` | 프로젝트 썸네일 및 다이어그램 이미지 |
| `public/resume.pdf` | 이력서 파일 |

## 프로젝트 구조

```
app/
├── layout.tsx               # 루트 레이아웃 (테마, 스크롤 프로그레스, 커맨드 팔레트)
├── page.tsx                 # 메인 페이지 (Hero → ProjectList → Footer)
├── projects/[id]/page.tsx   # 프로젝트 상세 페이지
├── not-found.tsx            # 404 페이지
└── globals.css              # CSS 변수 기반 테마

components/
├── Hero.tsx                 # 히어로 섹션 (터미널 윈도우 애니메이션)
├── ProjectList.tsx          # 프로젝트 카드 그리드 + 필터
├── ProjectCard.tsx          # 개별 프로젝트 카드
├── Footer.tsx               # 연락처 푸터
├── Achievements.tsx         # 주요 성과 통계
├── TechStack.tsx            # 기술 스택 프로그레스 바
├── ThemeProvider.tsx         # 다크/라이트 모드 Context
├── ThemeToggle.tsx           # 테마 전환 버튼
├── ScrollProgress.tsx        # 스크롤 프로그레스 바
├── PageTransition.tsx        # 페이지 전환 애니메이션
├── CommandPalette.tsx        # 커맨드 팔레트 (⌘K)
├── MermaidDiagram.tsx        # Mermaid 다이어그램 렌더링
└── ImageLightbox.tsx         # 이미지 확대 모달

data/
├── profile.ts               # 개인 정보
├── projects.ts              # 프로젝트 목록
└── skills.ts                # 기술 스택 + 성과 데이터
```

## 배포 (Vercel)

GitHub에 푸시해 두었다면 [Vercel](https://vercel.com)에서 바로 배포할 수 있습니다.

1. [vercel.com](https://vercel.com) 접속 후 **GitHub으로 로그인**
2. **Add New… → Project** 선택
3. **Import Git Repository**에서 `jinhyuk9714/portfolio-site` 선택 후 **Import**
4. Framework Preset이 **Next.js**로 잡혀 있는지 확인하고 **Deploy** 클릭

배포가 끝나면 `https://portfolio-site-xxx.vercel.app` 형태의 URL로 접속할 수 있습니다.
이후 `main` 브랜치에 푸시할 때마다 자동으로 재배포됩니다.
