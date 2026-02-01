# 포트폴리오 사이트

Next.js (App Router) + TypeScript + Tailwind CSS 기반 1페이지형 포트폴리오.

## 실행

```bash
npm install
```

- **개발 중** (파일 수정 시 바로 반영): `npm run dev` → http://localhost:3000  
  → `data/projects.ts`, `data/profile.ts` 수정 후 저장하면 새로고침 시 반영됨.
- **정적 빌드 후 서빙** (배포/프리뷰): `npm run build` → `npm run start`  
  → `data/` 수정 후에는 **반드시 다시 `npm run build`** 해야 반영됨. 한 번에 하려면 `npm run preview`.

## 수정할 곳

- **개인 정보**: `data/profile.ts` — 이름, 한 줄 소개, 이메일, GitHub, LinkedIn, 프로필 이미지
- **프로젝트 목록**: `data/projects.ts` — 2~4개 프로젝트 카드 (제목, 설명, 스택, GitHub, 데모/이미지)

## 배포 (Vercel)

GitHub에 푸시해 두었다면 [Vercel](https://vercel.com)에서 바로 배포할 수 있습니다.

1. [vercel.com](https://vercel.com) 접속 후 **GitHub으로 로그인**
2. **Add New… → Project** 선택
3. **Import Git Repository**에서 `jinhyuk9714/portfolio-site` 선택 후 **Import**
4. Framework Preset이 **Next.js**로 잡혀 있는지 확인하고 **Deploy** 클릭

배포가 끝나면 `https://portfolio-site-xxx.vercel.app` 형태의 URL로 접속할 수 있습니다.  
이후 `main` 브랜치에 푸시할 때마다 자동으로 재배포됩니다.

## 구조

- `app/page.tsx` — 메인 1페이지 (Hero → 프로젝트 → Footer)
- `components/Hero.tsx` — 상단 히어로
- `components/ProjectCard.tsx`, `ProjectList.tsx` — 프로젝트 카드
- `components/Footer.tsx` — 연락처 푸터

<!-- 테스트 푸시 -->
