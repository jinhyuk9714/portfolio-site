# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Next.js 15 (App Router) + TypeScript + Tailwind CSS 기반 포트폴리오 사이트. "Terminal Elegance" 테마의 다크/라이트 모드 지원. 정적 빌드(`output: "export"`)로 배포. Framer Motion 애니메이션, 커맨드 팔레트, 프로젝트 필터링 등 인터랙티브 기능 포함.

## Commands

```bash
npm run dev      # 개발 서버 (localhost:3000, 핫 리로드)
npm run build    # 정적 빌드 → out/ 디렉토리
npm run start    # 빌드된 정적 파일 서빙 (npx serve out)
npm run preview  # build + start 한 번에
npm run lint     # ESLint 검사
```

**주의**: `data/` 파일 수정 후 dev 모드는 새로고침으로 반영되지만, 프로덕션은 `npm run build`를 다시 해야 반영됨.

## Architecture

```
app/
├── layout.tsx               # 루트 레이아웃 (Sora + JetBrains Mono 폰트, ThemeProvider, ScrollProgress, CommandPalette)
├── page.tsx                 # 메인 페이지 (PageTransition → Hero → ProjectList → Footer)
├── projects/[id]/page.tsx   # 프로젝트 상세 페이지 (동적 라우팅)
├── not-found.tsx            # 404 페이지
└── globals.css              # CSS 변수 기반 테마, 이펙트 (노이즈, 스캔라인, 글로우)

components/
├── Hero.tsx                 # 히어로 섹션 (터미널 윈도우 애니메이션, CTA 버튼)
├── ProjectList.tsx          # 프로젝트 카드 그리드 + 기술 스택 필터링
├── ProjectCard.tsx          # 개별 프로젝트 카드
├── Footer.tsx               # 연락처 푸터
├── Achievements.tsx         # 주요 성과 통계 (프로젝트 수, 성능 개선율 등)
├── TechStack.tsx            # 기술 스택 프로그레스 바 (카테고리별)
├── ThemeProvider.tsx         # 다크/라이트 모드 Context (localStorage 저장)
├── ThemeToggle.tsx           # 테마 전환 버튼 (우상단 고정)
├── ScrollProgress.tsx        # 스크롤 프로그레스 바 (상단 고정)
├── PageTransition.tsx        # 페이지 전환 애니메이션 (Framer Motion)
├── CommandPalette.tsx        # 커맨드 팔레트 (⌘K / Ctrl+K)
├── MermaidDiagram.tsx        # Mermaid 다이어그램 렌더링 (테마 반응형)
└── ImageLightbox.tsx         # 이미지 확대 모달

data/
├── profile.ts               # 개인 정보 (이름, 이메일, GitHub, resumeUrl 등)
├── projects.ts              # 프로젝트 목록 (상세, 다이어그램, 스택 등)
└── skills.ts                # 기술 스택 카테고리 + 성과 데이터
```

## Tech Stack

- **Framework**: Next.js 15 (App Router), React 19, TypeScript 5
- **Styling**: Tailwind CSS 3.4, CSS 변수 기반 테마 시스템
- **Animation**: Framer Motion 12 (페이지 전환, 스크롤, 커맨드 팔레트)
- **Diagrams**: Mermaid 11 (아키텍처, ERD, 시퀀스)
- **Fonts**: Sora (본문), JetBrains Mono (코드)

## Data Layer

모든 콘텐츠는 `data/` 디렉토리의 TypeScript 파일에 정의됨. API 호출 없이 빌드 시점에 정적 생성.

### profile.ts
개인 정보: name, role, headline, bio, keywords, email, githubUrl, linkedInUrl, profileImageUrl, resumeUrl

### projects.ts
프로젝트 배열. 각 프로젝트는:
- `id`: URL 경로 (`/projects/[id]`)
- `summary`: 카드에 표시되는 한 줄 요약
- `detail`: 상세 페이지 개요 (여러 문단)
- `diagramMermaid`, `erdMermaid`, `sequenceDiagrams`: Mermaid 코드
- `erdDiagrams`: 복수 ERD 지원 (`{ title, mermaid }[]`)
- `sections`: 커스텀 정보 블록 (`{ title, items }[]` — 팀 구성, 목표 등)
- `problem`, `solution`, `result`: "1. ...\n2. ..." 형식의 번호 목록
- `stack`: 기술 스택 태그 배열

### skills.ts
- `skillCategories`: 카테고리별 기술 목록 (Backend, Database, DevOps, Messaging, Monitoring, Frontend)
- `achievements`: 주요 성과 수치 (프로젝트 수, 성능 개선율, RPS, MSA 서비스 수)

## Mermaid Diagrams

`MermaidDiagram.tsx`는 클라이언트 컴포넌트로, mermaid 라이브러리로 SVG 렌더링. 테마 변경 시 자동 리렌더링.
- Architecture: `diagramMermaid` (flowchart)
- ERD: `erdMermaid` (단일) 또는 `erdDiagrams` (복수, 접기/펼치기)
- Sequence: `sequenceDiagrams` 배열 (제목 + mermaid 코드, 접기/펼치기)

이미지 URL과 Mermaid 코드가 둘 다 있으면 Mermaid 우선.

## Styling

CSS 변수 기반 테마 시스템 (`globals.css` + `tailwind.config.ts`):
- **다크 모드** (기본): surface `#050508`, accent `#00ff88` (네온 그린), 터미널 색상 팔레트
- **라이트 모드**: 밝은 배경 + 조정된 색상
- **이펙트**: 노이즈 오버레이, 스캔라인 (다크 전용), 텍스트 글로우, 그라디언트 보더
- **애니메이션**: fade-in-up, slide-in-left/right, blink, pulse-glow, float, gradient-x, scan

`darkMode: "class"` 설정으로 `<html>` 태그의 `dark`/`light` 클래스로 전환.

## Interactive Features

- **커맨드 팔레트** (⌘K): 네비게이션, 프로젝트 바로가기, 외부 링크, 이력서 다운로드
- **프로젝트 필터**: 기술 스택별 필터링 (Backend, Frontend, Database, Infra), 다중 선택 AND 로직
- **스크롤 프로그레스**: 상단 고정 바, Framer Motion spring 애니메이션
- **페이지 전환**: fade + slide 애니메이션
- **이미지 라이트박스**: 클릭으로 확대, ESC/외부 클릭으로 닫기

## Static Export

`next.config.ts`에 `output: "export"` 설정으로 정적 빌드. 이미지는 `unoptimized: true`.

## Key Patterns

- 프로젝트 상세 페이지는 `generateStaticParams()`로 빌드 시점에 모든 경로 생성
- 클라이언트 컴포넌트는 `"use client"` 지시문 사용
- 프로젝트 추가 시 `data/projects.ts` 배열에 객체 추가, 이미지는 `public/image/`에 저장
- Intersection Observer로 스크롤 트리거 애니메이션 (Achievements, TechStack, ProjectList)
- ThemeProvider Context로 테마 상태 관리, localStorage 저장
- `stackColors` 매핑으로 기술 스택 태그 색상 일관성 유지
