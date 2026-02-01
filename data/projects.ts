/**
 * 포트폴리오 프로젝트 목록
 * summary: 카드에 보이는 한 줄 요약
 * detail: 상세 페이지 개요
 * diagramType: 아키텍처 | 데이터 플로우 | 시퀀스 중 하나
 * diagramUrl: 다이어그램 이미지 URL (public/ 또는 외부 URL)
 * diagramMermaid / erdMermaid / sequenceDiagramMermaid: Mermaid 코드 문자열 (이미지 대신 사용, 있으면 우선 표시)
 */

export type DiagramType = "architecture" | "dataflow" | "sequence";

export interface Project {
  id: string;
  title: string;
  summary: string;
  detail: string;
  diagramType: DiagramType;
  diagramUrl: string | null;
  /** 아키텍처 다이어그램 Mermaid 코드 (이미지 대신 사용 가능) */
  diagramMermaid?: string | null;
  /** ERD 이미지 (선택) */
  erdUrl?: string | null;
  /** ERD Mermaid 코드 (이미지 대신 사용 가능) */
  erdMermaid?: string | null;
  /** 시퀀스 다이어그램 이미지 (선택) */
  sequenceDiagramUrl?: string | null;
  /** 시퀀스 다이어그램 Mermaid 코드 (이미지 대신 사용 가능) */
  sequenceDiagramMermaid?: string | null;
  /** 시퀀스 다이어그램 여러 개 (제목 + Mermaid, 있으면 단일 시퀀스 대신 사용) */
  sequenceDiagrams?: { title: string; mermaid: string }[];
  problem: string;
  solution: string;
  result: string;
  stack: string[];
  githubUrl: string;
  demoUrl?: string | null;
  imageUrl?: string | null;
}

const diagramLabels: Record<DiagramType, string> = {
  architecture: "아키텍처",
  dataflow: "데이터 플로우",
  sequence: "시퀀스 다이어그램",
};

export function getDiagramLabel(type: DiagramType): string {
  return diagramLabels[type];
}

export const projects: Project[] = [
  {
    id: "memory-of-year",
    title: "Memory of Year",
    summary:
      "앨범·편지·사진 관리 REST API. N+1 최적화·k6 부하테스트·Docker·CI/CD.",
    detail:
      "멋쟁이사자처럼 12기 팀 멋삼핑에서 제작한 UGC 앨범 서비스 백엔드입니다. 앨범·편지·사진·스티커 CRUD, JWT 인증·로그아웃(토큰 무효화), AWS S3 미디어 저장, Swagger API 문서를 제공합니다.\n\n편지 목록 API에서 편지별 사진 개수(photoCount) 조회 시 N+1 쿼리(31회)가 발생해 @Query 서브쿼리로 1회로 최적화했고, 앨범 조회는 @EntityGraph로 3회→1회로 개선했습니다. k6로 회원가입·로그인·앨범·편지 API 부하를 측정하고 Before/After 결과를 문서화했습니다. Docker Compose로 MySQL + 앱을 한 번에 기동하며, GitHub Actions CI와 JaCoCo 커버리지 리포트를 구성했습니다.",
    diagramType: "architecture",
    diagramUrl: null,
    diagramMermaid: `flowchart LR
    subgraph Client
      FE[프론트엔드]
    end
    subgraph Backend["Spring Boot"]
      API[REST API]
      JWT[JWT 검증]
      API --> JWT
    end
    subgraph Data
      MySQL[(MySQL)]
      S3[(S3)]
    end
    FE --> API
    API --> MySQL
    API --> S3`,
    erdUrl: null,
    erdMermaid: `erDiagram
    users ||--o{ album : "소유"
    album ||--o{ letter : "포함"
    letter ||--o{ photo : "포함"

    users {
      bigint user_id PK
      varchar username UK
      varchar nickname UK
      varchar email UK
      varchar role
    }
    album {
      bigint album_id PK
      bigint user_id FK
      varchar title
      varchar album_color
      boolean visibility
      varchar sticker_url
    }
    letter {
      bigint letter_id PK
      bigint album_id FK
      varchar letter_title
      text content
      datetime created_at
      boolean is_anonymous
      varchar letter_color
    }
    photo {
      bigint photo_id PK
      bigint letter_id FK
      varchar url
      varchar comment
      varchar sticker_url
    }`,
    sequenceDiagramUrl: null,
    sequenceDiagramMermaid: null,
    sequenceDiagrams: [
      {
        title: "로그인",
        mermaid: `sequenceDiagram
    C->>API: POST /api/auth/login
    API->>US: authenticateUser
    US->>UR: findByUsername
    alt 성공
        API->>JWT: createToken
        API-->>C: 200 { token }
    else 실패
        API-->>C: 401
    end`,
      },
      {
        title: "앨범 생성",
        mermaid: `sequenceDiagram
    C->>API: POST /api/albums/create
    API->>AS: hasAlbum, createAlbum
    AS->>AR: save
    API-->>C: 201 { Album }`,
      },
      {
        title: "편지 작성",
        mermaid: `sequenceDiagram
    C->>API: POST /api/albums/{id}/create
    API->>LS: createLetter
    LS->>LR: save
    API-->>C: 201 { Letter }`,
      },
      {
        title: "사진 업로드",
        mermaid: `sequenceDiagram
    C->>API: POST /api/letters/{id}/photos
    API->>PS: addPhoto
    PS->>S3: uploadFile
    PS->>PR: save
    API-->>C: 201 { Photo }`,
      },
    ],
    problem: `1. 편지 목록 조회 시 편지별 사진 개수를 위해 N+1 쿼리(1 + 30회)가 발생해 응답 시간이 길었습니다.
2. 앨범 조회 시 owner, letters를 Lazy 로딩으로 3회 쿼리가 발생했습니다.
3. 성능 개선 전·후를 정량적으로 비교할 수 있는 부하 테스트 환경이 없었습니다.
4. 로컬에서 MySQL 설정 없이 실행·배포 환경을 빠르게 구성하기 어려웠습니다.`,
    solution: `1. LetterRepository에 서브쿼리 COUNT를 사용한 findLettersWithPhotoCountByAlbumId로 1회 쿼리로 최적화했습니다.
2. AlbumRepository에 @EntityGraph로 owner, letters를 한 번에 fetch하는 findByIdWithOwnerAndLetters를 추가했습니다.
3. k6 스크립트(00~04)로 스모크·회원가입·로그인·앨범·편지 부하를 측정하고, APP_PERF_USE_N1_LETTERS로 N+1 Before/After를 재현·비교했습니다.
4. Docker Compose로 MySQL 8 + 앱을 정의하고 depends_on + healthcheck로 순서 기동하게 했습니다. GitHub Actions CI, JaCoCo 리포트를 추가했습니다.`,
    result: `1. 편지 목록 API: DB 쿼리 31회 → 1회, p95 22.8ms → 13.8ms(↓40%), 평균 11.5ms → 6.7ms(↓42%)로 개선했습니다.
2. 앨범 조회 API: 3회 → 1회 쿼리, 인덱스(idx_album_owner, idx_letter_album_id 등) 추가로 조회 성능을 최적화했습니다.
3. k6 부하테스트 결과(회원가입 16.5 RPS, 로그인 49.7 RPS, 앨범 143.7 RPS, 편지 96.7 RPS)를 README에 문서화했습니다.
4. docker compose up --build 한 번에 MySQL + 앱 기동, push 시 자동 테스트·커버리지 리포트를 구성했습니다.`,
    stack: [
      "Java 17",
      "Spring Boot 3",
      "Spring Security",
      "JWT",
      "Spring Data JPA",
      "MySQL",
      "H2",
      "AWS S3",
      "Swagger",
      "Docker",
      "k6",
      "JaCoCo",
    ],
    githubUrl: "https://github.com/jinhyuk9714/memory_of_year",
    demoUrl: null,
    imageUrl: "/image/MemoryOfYear_Thumbnail.png",
  },
  {
    id: "timedeal-service",
    title: "타임딜 서비스",
    summary:
      "특정 시간 오픈 상품 주문 API. 동시성 제어·성능 최적화·레질리언스, k6로 검증.",
    detail:
      "특정 시간에 오픈되는 상품에 대한 주문을 처리하는 Spring Boot 기반 REST API입니다.\n\n비관적·낙관적·분산 락(Redis) 세 가지 동시성 전략을 구현하고, Caffeine 캐시·인덱스·커넥션 풀로 성능을 최적화했습니다. Resilience4j Rate limiting·Circuit breaker로 과부하와 장애 전파를 막았고, k6 부하·스파이크·Soak 시나리오로 검증·문서화했습니다.",
    diagramType: "architecture",
    diagramUrl: "/image/TimeDeal_Architecture.png",
    erdUrl: "/image/TimeDeal_ERD.png",
    sequenceDiagramUrl: "/image/TimeDeal_SequenceDiagram.png",
    problem: `1. 타임딜 오픈 시점에 동일 상품에 주문이 몰리면서 재고 정합성이 깨질 수 있었습니다.
2. 낙관적 락만 사용 시 version 충돌로 실패율이 높아졌습니다.
3. 상품 조회 부하가 커서 p95 지연이 컸습니다.
4. 메트릭·대시보드 없이 부하 시 병목을 눈으로 확인하기 어려웠고, DB/Redis 장애 시 동작 검증이 필요했습니다.`,
    solution: `1. 비관적·낙관적·분산 락(Redis) 세 가지 전략을 구현하고 order.lock-strategy로 전환 가능하게 했습니다.
2. 동일 부하 조건에서 k6로 성능·성공률·에러율을 비교해, 스파이크 구간에서는 비관적 락이 가장 유리함을 확인했습니다.
3. 상품 목록·상세에 Caffeine 캐시를 도입하고, Resilience4j로 Rate limiting·Circuit breaker를 적용해 과부하와 장애 전파를 완화했습니다.
4. Prometheus + Grafana 대시보드를 구성하고, DB/Redis 중단·복구 시나리오를 k6로 실측해 문서화했습니다.`,
    result: `1. 타임딜 스파이크(0→200 VU)에서 비관적 락 기준 약 160 RPS, 주문 201건 성공·에러율 0%를 달성했습니다.
2. 캐시 도입으로 상품 조회 p95가 38.8ms → 11.6ms로 약 70% 개선되었습니다.
3. Rate limiting·Circuit breaker 적용 후 성공률 99.87%를 유지하며 시스템 부하를 완화했습니다.
4. Prometheus·Grafana로 RPS·레이턴시·JVM 메모리를 실시간 확인할 수 있고, 장애 시나리오 결과를 PERF_RESULT에 정리했습니다.`,
    stack: [
      "Java 21",
      "Spring Boot",
      "Spring Data JPA",
      "Querydsl",
      "MySQL",
      "Redis",
      "JWT",
      "Caffeine",
      "Resilience4j",
      "Springdoc OpenAPI",
      "Testcontainers",
      "k6",
    ],
    githubUrl: "https://github.com/jinhyuk9714/timedeal-service",
    demoUrl: null,
    imageUrl: null,
  },
  {
    id: "msa-shop",
    title: "MSA Shop",
    summary:
      "쇼핑몰 MSA. 6개 서비스 분리·SAGA/Outbox·RabbitMQ 이벤트·Docker/K8s/Helm.",
    detail:
      "쇼핑몰 도메인으로 마이크로서비스를 설계·구현한 프로젝트입니다. User, Product, Order, Payment, Settlement 5개 도메인 서비스와 API Gateway로 경계를 나누고, 각 서비스별 독립 DB(MySQL)를 사용합니다.\n\n주문 흐름은 재고 예약 → 결제 → 주문 저장 순입니다. 실패 시 SAGA로 재고 복구·결제 취소를 수행하고, 결제 성공 후 주문 저장 실패 시 Outbox 패턴으로 보상 트랜잭션을 처리합니다. 결제 완료는 RabbitMQ로 발행해 settlement-service가 일/월 매출을 집계합니다.\n\nGateway에서 JWT 검증·Rate Limit·통합 Swagger를 담당하고, 장바구니(CRUD)·상품 검색·카테고리, Resilience4j Retry·CircuitBreaker, Prometheus·Grafana·Zipkin 관측성, CI(E2E 포함)·Helm·HPA까지 구현했습니다.",
    diagramType: "architecture",
    diagramUrl: "/image/MsaShop_Architecture.png",
    erdUrl: "/image/MsaShop_ERD.png",
    sequenceDiagramUrl: "/image/MsaShop_SequenceDiagram.png",
    problem: `1. 주문·결제·재고가 서로 다른 서비스와 DB에 분산되어 있어, 한 단계 실패 시 이전 단계를 되돌려야 했습니다.
2. 결제는 성공했는데 주문 저장만 실패하는 경우, 단순 메시지 발행으로는 유실·중복 가능성이 있어 일관성을 보장하기 어려웠습니다.
3. 여러 서비스를 한 번에 기동·배포·검증할 수 있는 환경이 필요했습니다.`,
    solution: `1. 주문 흐름을 재고 예약 → 결제 → 주문 저장 순으로 정의하고, 각 단계 실패 시 SAGA로 재고 복구·결제 취소를 수행했습니다.
2. 결제 성공 후 주문 저장 실패 구간은 Outbox 테이블에 보상 이벤트를 저장한 뒤 스케줄러가 폴링해 결제 취소·재고 복구를 호출하도록 해 메시지 유실 없이 보상을 보장했습니다.
3. API Gateway를 단일 진입점으로 두고, Docker Compose·K8s·Helm으로 전체 스택을 기동·배포하며, CI에서 단위·통합·E2E 테스트를 자동 실행하게 했습니다.`,
    result: `1. 6개 서비스 + Gateway를 Docker Compose로 일괄 기동하고, E2E 스크립트(회원가입·로그인·주문·장바구니·실패 시나리오 등 9개)로 검증합니다.
2. SAGA·Outbox로 주문·결제·정산 간 보상 트랜잭션을 처리하고, RabbitMQ 이벤트 기반 정산·매출 집계를 구현했습니다.
3. Helm 차트로 K8s 배포·업그레이드가 가능하며, order-service HPA, Prometheus·Grafana·Zipkin 관측성, ghcr.io 이미지 CI/CD까지 구성했습니다.`,
    stack: [
      "Java 21",
      "Spring Boot",
      "Spring Cloud Gateway",
      "Spring Data JPA",
      "MySQL",
      "RabbitMQ",
      "Docker",
      "Kubernetes",
      "Helm",
    ],
    githubUrl: "https://github.com/jinhyuk9714/msa-shop",
    demoUrl: null,
    imageUrl: null,
  },
];
