# 포트폴리오 사이트 — 아키텍처·요구사항 (새 채팅 전달용)

> **용도**: 새 채팅/다른 AI에게 전달해서 포트폴리오 사이트 구현을 요청할 때 사용하는 문서.  
> 이 문서만 복사해 붙여넣고 "이 아키텍처대로 포트폴리오 사이트 만들어줘"라고 하면 됨.

---

## 1. 목적

- **대상**: 채용 담당자·면접관이 1분 안에 "이 사람이 누구고 뭘 하는 사람인지" 파악할 수 있게.
- **포함할 프로젝트**: MSA Shop(쇼핑몰 MSA 백엔드) 등 2~4개. 각 프로젝트는 한 줄 설명 + GitHub 링크 + (선택) 스크린샷/데모 링크.
- **성격**: 정적·심플한 1페이지형 포트폴리오. 블로그·CMS는 불필요.

---

## 2. 기술 스택 (권장)

| 항목 | 선택 |
|------|------|
| **프레임워크** | Next.js (App Router). React만 써도 됨. |
| **스타일** | Tailwind CSS. 다크모드 선택 사항. |
| **언어** | TypeScript 권장. |
| **배포** | Vercel (Next/React에 최적). GitHub Pages·Netlify도 가능. |
| **콘텐츠** | 프로젝트 목록은 코드 상수 또는 JSON/마크다운으로 관리해도 됨. CMS 없음. |

---

## 3. 페이지·섹션 구성

### 3.1 필수

1. **히어로(상단)**
   - 이름(또는 닉네임)
   - 한 줄 소개 (예: "백엔드 개발자, MSA·Spring 경험")
   - (선택) 프로필 이미지

2. **프로젝트**
   - 카드 형태 2~4개
   - 카드당: **제목**, **한 줄 설명**, **기술 스택(태그)**, **GitHub 링크**, (선택) **데모/스크린샷 링크**
   - 첫 번째 프로젝트 예시:
     - 제목: MSA Shop
     - 한 줄: 쇼핑몰 도메인 MSA — 서비스 경계, SAGA/Outbox, Gateway·이벤트·관측성, Docker/K8s/Helm·CI
     - 스택: Java 21, Spring Boot, Spring Cloud Gateway, RabbitMQ, MySQL, Docker, Kubernetes, Helm
     - 링크: GitHub 레포 URL

3. **연락처(푸터)**
   - 이메일
   - GitHub
   - (선택) LinkedIn, 블로그

### 3.2 선택

- **프로젝트 상세 페이지**: 카드 클릭 시 별도 페이지에서 설명·스크린샷·아키텍처 한 장 등. 없어도 됨.
- **다크/라이트 모드** 토글
- **스크롤 애니메이션**: 과하지 않게

---

## 4. 레이아웃·UX

- **1페이지 스크롤** 또는 **메인 + 프로젝트 카드만** 구성.
- **반응형**: 모바일·태블릿·데스크톱 대응.
- **로딩**: 정적이므로 빠르게. 이미지는 필요 시 lazy.
- **색·폰트**: 단정하고 가독성 좋게. 포트폴리오가 주인공이지 사이트 자체가 주인공이 아님.

---

## 5. 프로젝트 데이터 예시 (MSA Shop 포함)

구현 시 참고할 수 있도록 프로젝트 1개 예시.

```ts
// 예: projects.ts 또는 constants
{
  id: 'msa-shop',
  title: 'MSA Shop',
  description: '쇼핑몰 도메인 MSA — 서비스 경계, SAGA/Outbox, Gateway·이벤트·관측성, Docker/K8s/Helm·CI',
  stack: ['Java 21', 'Spring Boot', 'Spring Cloud Gateway', 'RabbitMQ', 'MySQL', 'Docker', 'Kubernetes', 'Helm'],
  githubUrl: 'https://github.com/jinhyuk9714/msa-shop',
  demoUrl: null,  // 또는 Swagger/스크린샷 URL
  imageUrl: null, // (선택) 대표 이미지
}
```

나머지 프로젝트는 사용자가 나중에 추가할 수 있도록 **배열/리스트**로 관리.

---

## 6. 폴더 구조 (참고)

```
portfolio/
  app/                 # Next.js App Router
    layout.tsx
    page.tsx           # 메인 1페이지
    globals.css
  components/
    Hero.tsx
    ProjectCard.tsx
    ProjectList.tsx
    Footer.tsx
  lib/ or data/
    projects.ts        # 프로젝트 목록
  public/
    (이미지 등)
```

React만 쓸 경우: `src/` 아래에 `components`, `pages`, `data` 등 비슷하게 구성.

---

## 7. 배포

- **Vercel**: GitHub 레포 연결 → push 시 자동 배포. 도메인은 `*.vercel.app` 또는 커스텀.
- **환경 변수**: 1차에는 없어도 됨. 연락처 이메일 등은 코드 상수로.

---

## 8. 전달 시 사용할 문장 (복사용)

아래를 새 채팅에 붙여넣으면 됨.

---

**아래부터 복사:**

```
포트폴리오 사이트를 만들어줘. 요구사항은 아래와 같아.

【목적】
- 채용 담당자·면접관이 1분 안에 나를 파악할 수 있는 1페이지형 포트폴리오.
- 프로젝트 2~4개를 카드로 보여주고, 각각 제목·한 줄 설명·기술 스택·GitHub 링크(와 선택적으로 데모/이미지)를 넣을 수 있게.

【기술】
- Next.js (App Router) + TypeScript + Tailwind CSS.
- 배포는 Vercel 가정. 정적 위주로.

【필수 섹션】
1. 히어로: 이름, 한 줄 소개 (프로필 이미지는 선택)
2. 프로젝트: 카드 리스트. 카드당 제목, 한 줄 설명, 스택 태그, GitHub 링크, (선택) 데모/이미지
3. 푸터: 이메일, GitHub, (선택) LinkedIn

【데이터】
- 프로젝트 목록은 코드(상수/JSON)로 관리. 예시 1개:
  - 제목: MSA Shop
  - 한 줄: 쇼핑몰 도메인 MSA — 서비스 경계, SAGA/Outbox, Gateway·이벤트·관측성, Docker/K8s/Helm·CI
  - 스택: Java 21, Spring Boot, Spring Cloud Gateway, RabbitMQ, MySQL, Docker, Kubernetes, Helm
  - GitHub: https://github.com/jinhyuk9714/msa-shop

【레이아웃·UX】
- 1페이지 스크롤, 반응형, 단정한 디자인. 다크모드·애니메이션은 선택.

위 조건으로 프로젝트 구조 잡고, 메인 페이지와 필요한 컴포넌트(Hero, ProjectCard, Footer 등) 코드까지 작성해줘. 이름·이메일·GitHub 등 개인 정보는 placeholder로 두고, 나중에 내가 바꿀 수 있게 해줘.
```

---

**복사 끝.**

---

## 9. 이 문서 위치

- **파일**: `docs/PORTFOLIO-SITE-ARCHITECTURE.md`
- **용도**: 새 채팅/다른 AI에게 붙여넣어 포트폴리오 사이트 구현 요청 시 사용.
- **수정**: 이름·GitHub URL·프로젝트 예시를 본인 정보로 바꾼 뒤 복사해 쓰면 됨.
