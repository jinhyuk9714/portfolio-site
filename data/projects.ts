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
  /** ERD 여러 개 (제목 + Mermaid, 있으면 단일 ERD 대신 사용) */
  erdDiagrams?: { title: string; mermaid: string }[];
  /** 상세 섹션 (제목 + 항목 리스트, detail 아래에 렌더링) */
  sections?: { title: string; items: string[] }[];
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
      "7인 팀 백엔드 리드. 첫 Spring 프로젝트, N+1 최적화(31→1쿼리), p95 40% 개선.",
    detail:
      "멋쟁이사자처럼 12기 데모데이에서 7인 팀(디자인 1, 프론트 2, 백엔드 4)으로 개발한 추억 공유 서비스입니다. 친구·연인·가족과 1년간의 추억을 앨범 형태로 기록하고, 연말에 함께 열어보는 '타임캡슐' 컨셉입니다. 처음으로 Spring Boot를 사용해 본 프로젝트로, 실전에서 JPA 최적화와 REST API 설계를 익혔습니다.",
    sections: [
      {
        title: "팀 내 역할 (백엔드 리드)",
        items: [
          "전체 API 설계 및 백엔드 아키텍처 구성 (14개 DTO, 6개 Controller)",
          "앨범·편지·사진 CRUD, JWT 인증(토큰 블랙리스트 로그아웃) 구현",
          "AWS S3 연동 이미지 업로드 파이프라인 구축",
          "N+1 문제 해결 및 k6 부하 테스트로 Before/After 성능 측정",
          "팀원 3명에게 JPA 연관관계, 쿼리 최적화, 인덱스 설계 코드 리뷰 진행",
        ],
      },
      {
        title: "성능 최적화",
        items: [
          "편지 목록: N+1(31쿼리) → @Query 서브쿼리 COUNT로 1쿼리 최적화",
          "앨범 조회: Lazy 로딩 3쿼리 → @EntityGraph로 1쿼리",
          "인덱스 4개 추가: idx_album_owner, idx_letter_album_id, idx_letter_created_at, idx_photo_letter_id",
          "k6 테스트: 회원가입 16.5 RPS, 로그인 49.7 RPS, 앨범 143.7 RPS, 편지 96.7 RPS",
        ],
      },
      {
        title: "인프라 구성",
        items: [
          "Docker Compose: MySQL 8 + Spring Boot, healthcheck 기반 순차 기동",
          "GitHub Actions CI: 자동 테스트 + JaCoCo 커버리지 리포트 생성",
          "환경 변수로 N+1 Before/After 재현 가능 (APP_PERF_USE_N1_LETTERS)",
          "Swagger/OpenAPI 3.0 API 문서화",
        ],
      },
    ],
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
    problem: `1. 편지 목록 조회 시 편지별 사진 개수를 위해 N+1 쿼리(1 + 30회 = 31회)가 발생해 p95 22.8ms로 응답이 느렸습니다.
2. 앨범 상세 조회 시 owner, letters를 Lazy 로딩해 3회 쿼리가 발생했습니다.
3. 성능 개선 전·후를 정량적으로 비교할 부하 테스트 환경이 없었습니다.
4. 팀원마다 로컬 MySQL 설정이 달라 환경 불일치 문제가 있었습니다.`,
    solution: `1. LetterRepository에 @Query로 서브쿼리 COUNT를 사용한 findLettersWithPhotoCountByAlbumId를 작성해 1회 쿼리로 최적화했습니다.
2. AlbumRepository에 @EntityGraph(attributePaths = {"owner", "letters"})를 적용한 findByIdWithOwnerAndLetters로 JOIN FETCH 효과를 구현했습니다.
3. k6 스크립트 5개(스모크, 회원가입, 로그인, 앨범, 편지)를 작성하고, APP_PERF_USE_N1_LETTERS 환경변수로 최적화 전·후를 재현해 비교 측정했습니다.
4. Docker Compose로 MySQL 8 + Spring Boot 앱을 정의하고, depends_on + healthcheck(mysqladmin ping)로 안정적인 순차 기동을 구현했습니다.`,
    result: `1. 편지 목록 API: 쿼리 31회 → 1회, p95 22.8ms → 13.8ms(↓40%), 평균 11.5ms → 6.7ms(↓42%) 개선.
2. 앨범 조회 API: 3회 → 1회 쿼리, 4개 인덱스(idx_album_owner, idx_letter_album_id, idx_letter_created_at, idx_photo_letter_id) 추가.
3. k6 부하테스트 결과: 회원가입 16.5 RPS(p95 115ms), 로그인 49.7 RPS(p95 116ms), 앨범 143.7 RPS(p95 12.9ms), 편지 96.7 RPS(p95 13.8ms), 모두 에러율 0%.
4. GitHub Actions CI에서 push 시 자동 테스트 + JaCoCo 커버리지 리포트 생성, 아티팩트 7일 보관.`,
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
      "GitHub Actions",
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
      "동시성 제어 3종 비교. 비관적 락 162 RPS·에러 0%, 캐시 70% 개선, Resilience4j 장애 대응.",
    detail:
      "쿠팡 로켓배송, 배민 타임세일처럼 특정 시간에 몰리는 주문을 어떻게 처리할지 궁금해서 시작한 프로젝트입니다. 실무에서 '재고 정합성'과 '동시성 제어'가 중요하다는 걸 알게 되어, 직접 구현하고 정량적으로 비교해보고 싶었습니다.",
    sections: [
      {
        title: "학습 목표",
        items: [
          "동시성 제어 전략(비관적/낙관적/분산 락)의 차이를 실제 부하로 비교",
          "장애 상황(DB/Redis 다운)에서 시스템이 어떻게 동작하는지 검증",
          "캐시, Rate Limit, Circuit Breaker 등 실무 패턴 직접 경험",
        ],
      },
      {
        title: "동시성 제어 비교 (200 VU 스파이크)",
        items: [
          "비관적 락: 162 RPS, p95 935ms, 성공률 100%, 6,594건 처리",
          "낙관적 락: 144.7 RPS, p95 1,170ms, 실패율 23.3% (version 충돌)",
          "분산 락(Redis): 132 RPS, p95 1,770ms, 실패율 42.6% (락 획득 실패)",
          "결론: 고경합 상황에서는 비관적 락이 처리량과 안정성 모두 우수",
        ],
      },
      {
        title: "기술적 구현",
        items: [
          "order.lock-strategy 설정으로 3가지 전략 런타임 전환",
          "Caffeine 캐시(10K 엔트리, 10분 TTL)로 조회 p95 70% 개선",
          "Resilience4j Rate Limiter(100 req/s) + Circuit Breaker(50% 임계치)",
          "Prometheus + Grafana 대시보드로 RPS·레이턴시·JVM 메모리 실시간 모니터링",
          "Testcontainers로 MySQL/Redis 통합 테스트 환경 구성",
        ],
      },
    ],
    diagramType: "architecture",
    diagramUrl: "/image/TimeDeal_Architecture.png",
    erdUrl: "/image/TimeDeal_ERD.png",
    sequenceDiagramUrl: "/image/TimeDeal_SequenceDiagram.png",
    problem: `1. 타임딜 오픈 시점에 동일 상품에 200명 동시 주문이 몰리면서 재고 정합성이 깨질 수 있었습니다.
2. 낙관적 락만 사용 시 version 충돌로 23.3% 실패율이 발생했습니다.
3. 상품 조회 부하가 커서 p95 38.8ms로 응답이 느렸습니다.
4. 메트릭 없이 병목을 확인하기 어려웠고, DB/Redis 장애 시 동작 검증이 필요했습니다.`,
    solution: `1. 비관적·낙관적·분산 락(Redis SET NX PX, 5초 TTL) 세 가지 전략을 구현하고 order.lock-strategy로 전환 가능하게 했습니다.
2. k6로 동일 조건(0→200 VU, 60초)에서 비교해 비관적 락이 처리량(162 vs 132 RPS)과 성공률(100% vs 57.4%) 모두 우수함을 확인했습니다.
3. Caffeine 캐시(itemList, items 키, 10분 TTL)와 Resilience4j Rate Limiter(100 req/s)·Circuit Breaker(10 콜 윈도우, 50% 임계치, 5초 복구)를 적용했습니다.
4. Prometheus(15초 스크래핑) + Grafana 대시보드를 구성하고, timedeal.order.create 커스텀 메트릭으로 성공/실패별 레이턴시를 추적했습니다.`,
    result: `1. 비관적 락 기준 162 RPS, p95 935ms, 6,594건 주문 성공, 에러율 0%를 달성했습니다.
2. 분산 부하(멀티 상품) 시 247 RPS까지 처리량이 증가했습니다.
3. 캐시 도입으로 상품 조회 p95가 38.8ms → 11.6ms로 70% 개선되었습니다.
4. Rate Limiter 적용 후 99.87% 성공률을 유지하며 8건만 429로 거부되었습니다.
5. DB 장애 시 즉시 실패 처리, 복구 후 15초 내 정상화됨을 검증하고 PERF_RESULT.md에 문서화했습니다.`,
    stack: [
      "Java 21",
      "Spring Boot 4",
      "Spring Data JPA",
      "Querydsl",
      "MySQL",
      "Redis",
      "JWT",
      "Caffeine",
      "Resilience4j",
      "Prometheus",
      "Grafana",
      "Springdoc OpenAPI",
      "Testcontainers",
      "k6",
    ],
    githubUrl: "https://github.com/jinhyuk9714/timedeal-service",
    demoUrl: null,
    imageUrl: "/image/timedeal_thumbnail.svg",
  },
  {
    id: "msa-shop",
    title: "MSA Shop",
    summary:
      "6개 서비스 MSA. SAGA/Outbox 분산 트랜잭션, K8s HPA, 11개 E2E 시나리오 CI 자동화.",
    detail:
      "모놀리식에서 MSA로 전환할 때 어떤 문제가 생기고, 어떻게 해결하는지 직접 경험해보고 싶어 시작한 프로젝트입니다. 특히 '분산 환경에서 트랜잭션을 어떻게 보장하는가'라는 질문에 답하고 싶었습니다.",
    sections: [
      {
        title: "서비스 구성 (6개 독립 서비스)",
        items: [
          "API Gateway(8080): JWT 검증, 라우팅, Rate Limit(120 req/min)",
          "User Service(8081): 회원가입, 로그인(JWT HS256), 인증",
          "Product Service(8082): 상품 CRUD, 재고 관리, Redis 캐싱",
          "Order Service(8083): 주문 생성, 장바구니, SAGA 오케스트레이션, Outbox 보상",
          "Payment Service(8084): 결제 승인/취소, RabbitMQ 이벤트 발행",
          "Settlement Service(8085): 일별/월별 매출 집계, 배치 스케줄러",
        ],
      },
      {
        title: "분산 트랜잭션 패턴",
        items: [
          "SAGA: 재고 예약 → 결제 → 주문 저장, 실패 시 보상 트랜잭션 실행",
          "Outbox: 결제 성공 후 주문 저장 실패 시, Outbox 테이블에 보상 이벤트 저장",
          "Outbox Processor: 5초 간격 폴링, 배치 20건씩 처리, 결제 취소·재고 복구 호출",
          "Resilience4j: Retry 3회(200ms 간격), CircuitBreaker(50% 임계치, 5초 복구)",
        ],
      },
      {
        title: "인프라 & DevOps",
        items: [
          "K8s Helm 차트: 19개 템플릿, order-service HPA(1-3 replicas, CPU 70%)",
          "GitHub Actions: CI(빌드+테스트+E2E) + CD(ghcr.io 멀티플랫폼 이미지)",
          "관측성: Prometheus(15초 스크래핑) + Grafana + Zipkin 분산 트레이싱",
          "E2E 테스트: 11개 시나리오(인증, 주문, 장바구니, 실패 케이스, 정산 등) 자동화",
        ],
      },
    ],
    diagramType: "architecture",
    diagramUrl: "/image/MsaShop_Architecture.png",
    erdUrl: "/image/MsaShop_ERD.png",
    sequenceDiagramUrl: "/image/MsaShop_SequenceDiagram.png",
    problem: `1. 주문·결제·재고가 6개 서비스와 5개 DB에 분산되어 있어, 한 단계 실패 시 이전 단계를 되돌려야 했습니다.
2. 결제는 성공했는데 주문 저장만 실패하는 경우, 단순 메시지 발행으로는 유실·중복 가능성이 있었습니다.
3. 6개 서비스를 한 번에 기동·배포·검증할 수 있는 환경과 자동화된 테스트가 필요했습니다.`,
    solution: `1. SAGA 패턴으로 재고 예약 → 결제 → 주문 저장 흐름을 정의하고, Resilience4j(Retry 3회, 200ms)로 일시적 실패를 처리하며, 결제 실패 시 재고 자동 복구를 구현했습니다.
2. Outbox 패턴으로 결제 성공 후 주문 저장 실패 시, 같은 트랜잭션에 Outbox 테이블에 보상 이벤트를 저장하고, 별도 스케줄러(5초 간격, 20건 배치)가 폴링해 결제 취소·재고 복구를 호출합니다.
3. Docker Compose로 로컬 개발 환경, Helm 차트로 K8s 배포를 구성하고, GitHub Actions에서 E2E 11개 시나리오를 자동 실행합니다.`,
    result: `1. 6개 서비스 + Gateway를 Docker Compose로 일괄 기동, 11개 E2E 시나리오(인증 4개, 주문 3개, 장바구니 5개, 실패 케이스 3개, 정산 2개)로 검증합니다.
2. SAGA·Outbox로 분산 트랜잭션 일관성을 보장하고, RabbitMQ 이벤트(payment.completed) 기반 비동기 정산 집계를 구현했습니다.
3. Helm 차트(19개 템플릿)로 K8s 배포, order-service HPA(CPU 70% 기준 1-3 replicas), ghcr.io 멀티플랫폼(amd64/arm64) 이미지 CI/CD를 구성했습니다.
4. Zipkin으로 서비스 간 요청 추적, Prometheus+Grafana로 실시간 메트릭 모니터링 환경을 구축했습니다.`,
    stack: [
      "Java 21",
      "Spring Boot 3",
      "Spring Cloud Gateway",
      "Spring Data JPA",
      "Spring Security",
      "JWT",
      "MySQL",
      "RabbitMQ",
      "Resilience4j",
      "Docker",
      "Kubernetes",
      "Helm",
      "Prometheus",
      "Grafana",
      "Zipkin",
      "GitHub Actions",
    ],
    githubUrl: "https://github.com/jinhyuk9714/msa-shop",
    demoUrl: null,
    imageUrl: "/image/msa_shop_thumbnail.svg",
  },
  {
    id: "running-app",
    title: "Running App",
    summary:
      "실 배포 풀스택 앱. Spring Boot + React + iOS, 이벤트 비동기·Redis 캐싱·29% TPS 향상.",
    detail:
      "직접 러닝을 즐기면서 '내가 쓰고 싶은 앱'을 만들어보자는 생각으로 시작한 프로젝트입니다. 백엔드뿐 아니라 웹 프론트엔드와 iOS 네이티브 앱까지 풀스택으로 구현했고, 실제로 NCP에 배포해 운영 중입니다.",
    sections: [
      {
        title: "실제 서비스 운영",
        items: [
          "NCP(네이버 클라우드)에 HTTPS 배포, 현재 운영 중",
          "데모: https://jinhyuk-portfolio1.shop",
          "개인 러닝 기록용으로 실제 사용 중 (주 3-4회 활동 기록)",
        ],
      },
      {
        title: "풀스택 구현",
        items: [
          "Backend: Spring Boot 3 + PostgreSQL + Redis",
          "Web: React 18 + TypeScript + Tailwind CSS",
          "iOS: SwiftUI + HealthKit + Core Location",
        ],
      },
      {
        title: "주요 기능",
        items: [
          "활동 기록, 레벨 시스템(Lv.1-10)",
          "챌린지(6종), 훈련 계획(5K/10K/하프 9종)",
          "GPS 경로 추적, HealthKit 연동(심박·케이던스·걸음 수)",
        ],
      },
      {
        title: "기술적 도전",
        items: [
          "활동 저장 시 Spring Events + @Async로 비동기 분리 → 응답 시간 95% 단축",
          "Redis 캐싱으로 조회 API 응답 70-86% 개선",
          "k6 부하테스트로 전체 처리량 29% 향상 검증",
        ],
      },
    ],
    diagramType: "architecture",
    diagramUrl: null,
    diagramMermaid: `flowchart LR
    subgraph Clients
      Web[React Web]
      iOS[SwiftUI iOS]
    end
    subgraph Backend["Spring Boot"]
      API[REST API]
      JWT[JWT 인증]
      Event[Spring Events]
      Async[Async Listeners]
      API --> JWT
      API --> Event
      Event --> Async
    end
    subgraph Data
      PG[(PostgreSQL)]
      Redis[(Redis)]
    end
    subgraph Infra
      Nginx[Nginx]
      NCP[NCP Cloud]
    end
    Web --> Nginx
    iOS --> Nginx
    Nginx --> API
    API --> PG
    API --> Redis
    Async --> PG`,
    erdUrl: null,
    erdMermaid: `erDiagram
    users ||--o{ running_activity : "기록"
    users ||--o{ user_challenge : "참여"
    users ||--o{ user_plan : "등록"
    challenge ||--o{ user_challenge : "포함"
    training_plan ||--o{ plan_week : "구성"
    training_plan ||--o{ user_plan : "포함"

    users {
      bigint id PK
      varchar email UK
      varchar password
      varchar nickname
      int level
      double total_distance
      double weight
      double height
    }
    running_activity {
      bigint id PK
      bigint user_id FK
      double distance
      int duration
      double pace
      int heart_rate
      int cadence
      json route
      varchar memo
      datetime created_at
    }
    challenge {
      bigint id PK
      varchar name
      enum type
      double target_distance
      int target_count
      date start_date
      date end_date
      int recommended_level
    }
    user_challenge {
      bigint id PK
      bigint user_id FK
      bigint challenge_id FK
      double current_distance
      int current_count
      datetime joined_at
      datetime completed_at
    }
    training_plan {
      bigint id PK
      varchar name
      enum goal_type
      enum difficulty
    }
    plan_week {
      bigint id PK
      bigint plan_id FK
      int week_number
      double target_distance
      int target_run_count
    }
    user_plan {
      bigint id PK
      bigint user_id FK
      bigint plan_id FK
      int current_week
      datetime started_at
      datetime completed_at
    }`,
    sequenceDiagramUrl: null,
    sequenceDiagramMermaid: null,
    sequenceDiagrams: [
      {
        title: "활동 기록 (이벤트 비동기)",
        mermaid: `sequenceDiagram
    participant C as Client
    participant API as Controller
    participant AS as ActivityService
    participant E as EventPublisher
    participant UL as UserLevelListener
    participant CL as ChallengeListener
    participant PL as PlanListener
    C->>API: POST /api/activities
    API->>AS: createActivity
    AS->>AS: save to DB
    AS->>E: publish ActivityCreatedEvent
    AS-->>API: Activity
    API-->>C: 201 Created
    Note over E,PL: AFTER_COMMIT 비동기 처리
    par 병렬 실행
      E->>UL: onActivityCreated
      UL->>UL: updateUserLevel
    and
      E->>CL: onActivityCreated
      CL->>CL: updateChallengeProgress
    and
      E->>PL: onActivityCreated
      PL->>PL: updatePlanProgress
    end`,
      },
      {
        title: "챌린지 참여",
        mermaid: `sequenceDiagram
    C->>API: POST /api/challenges/{id}/join
    API->>CS: joinChallenge
    CS->>CS: validate eligibility
    CS->>UC: save UserChallenge
    API-->>C: 200 OK`,
      },
      {
        title: "훈련 계획 시작",
        mermaid: `sequenceDiagram
    C->>API: POST /api/plans/{id}/start
    API->>PS: startPlan
    PS->>PS: check not already enrolled
    PS->>UP: save UserPlan
    API-->>C: 200 OK`,
      },
    ],
    problem: `1. 활동 저장 시 레벨·챌린지·훈련 계획 업데이트를 동기로 처리하면 응답 시간이 길어지고 트랜잭션 범위가 커집니다.
2. 활동 요약, 챌린지 목록 등 빈번한 조회 API가 매번 DB를 조회해 응답 시간이 느렸습니다.
3. JOIN FETCH 없이 연관 엔티티를 조회하면 N+1 쿼리가 발생했습니다.
4. 최적화 효과를 정량적으로 측정·비교할 부하 테스트 환경이 없었습니다.`,
    solution: `1. Spring Events + @TransactionalEventListener(AFTER_COMMIT) + @Async로 레벨·챌린지·계획 업데이트를 비동기 분리했습니다. @Retryable(maxAttempts=3)로 실패 시 재시도합니다.
2. Redis 캐싱을 도입해 activitySummary(5분), activeChallenges(10분), plans(30분) TTL로 조회 부하를 줄였습니다.
3. JOIN FETCH 쿼리와 11개 복합 인덱스를 추가해 N+1 문제를 해결했습니다.
4. k6 스크립트로 baseline, optimized, async-event, compression 시나리오를 작성하고 100 VU 부하로 Before/After를 측정했습니다.`,
    result: `1. POST /activities 응답 시간: ~100ms → ~5ms (95% 감소), 비동기 이벤트로 메인 트랜잭션 분리.
2. GET /activities/summary 응답 시간: 7.43ms → 1.01ms (86% 감소), Redis 캐시 적중.
3. N+1 쿼리(5건 조회 시): 6회 → 1회 (83% 감소), JOIN FETCH 적용.
4. 전체 처리량(TPS): 69.88 → 90.16 req/s (29% 향상), 에러율 0% 유지.
5. Docker 이미지 크기: 350MB → 220MB (37% 감소), 멀티스테이지 빌드 + Alpine.`,
    stack: [
      "Java 17",
      "Spring Boot 3",
      "Spring Security",
      "JWT",
      "Spring Data JPA",
      "PostgreSQL",
      "Redis",
      "Spring Events",
      "React 18",
      "TypeScript",
      "Tailwind CSS",
      "SwiftUI",
      "HealthKit",
      "Docker",
      "Nginx",
      "GitHub Actions",
      "k6",
      "Prometheus",
    ],
    githubUrl: "https://github.com/jinhyuk9714/Running_App",
    demoUrl: "https://jinhyuk-portfolio1.shop",
    imageUrl: "/image/running_app_thumbnail.svg",
  },
];
