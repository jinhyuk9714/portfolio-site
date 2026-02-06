/**
 * 기술 스택 데이터
 * level: 1-5 (1: 기초, 3: 실무 활용, 5: 심화)
 */

export interface Skill {
  name: string;
  level: number; // 1-5
}

export interface SkillCategory {
  category: string;
  icon: string; // emoji or icon name
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    category: "Backend",
    icon: "⚙️",
    skills: [
      { name: "Java", level: 4 },
      { name: "Spring Boot", level: 4 },
      { name: "Spring Security", level: 3 },
      { name: "Spring Data JPA", level: 4 },
      { name: "Spring Cloud Gateway", level: 3 },
      { name: "Querydsl", level: 3 },
      { name: "Resilience4j", level: 3 },
    ],
  },
  {
    category: "AI / RAG",
    icon: "🤖",
    skills: [
      { name: "LangChain4j", level: 3 },
      { name: "ChromaDB", level: 3 },
      { name: "LLM API", level: 3 },
    ],
  },
  {
    category: "Database",
    icon: "🗄️",
    skills: [
      { name: "MySQL", level: 4 },
      { name: "PostgreSQL", level: 3 },
      { name: "Redis", level: 3 },
      { name: "H2", level: 3 },
    ],
  },
  {
    category: "DevOps & Infra",
    icon: "🚀",
    skills: [
      { name: "Docker", level: 4 },
      { name: "Kubernetes", level: 3 },
      { name: "Helm", level: 3 },
      { name: "GitHub Actions", level: 4 },
      { name: "Nginx", level: 3 },
    ],
  },
  {
    category: "Messaging & Cache",
    icon: "📨",
    skills: [
      { name: "RabbitMQ", level: 3 },
      { name: "Caffeine", level: 3 },
      { name: "Redis Cache", level: 3 },
    ],
  },
  {
    category: "Monitoring & Testing",
    icon: "📊",
    skills: [
      { name: "Prometheus", level: 3 },
      { name: "Grafana", level: 3 },
      { name: "k6", level: 4 },
      { name: "JUnit 5", level: 4 },
      { name: "Testcontainers", level: 3 },
    ],
  },
  {
    category: "Frontend",
    icon: "🎨",
    skills: [
      { name: "React", level: 3 },
      { name: "TypeScript", level: 3 },
      { name: "Next.js", level: 3 },
      { name: "Tailwind CSS", level: 3 },
      { name: "React Query", level: 3 },
      { name: "SwiftUI", level: 2 },
    ],
  },
];

/**
 * 성과 하이라이트 데이터
 */
export interface Achievement {
  number: string;
  label: string;
  description: string;
}

export const achievements: Achievement[] = [
  {
    number: "4",
    label: "프로젝트",
    description: "Spring Boot 기반 백엔드 프로젝트",
  },
  {
    number: "42%",
    label: "성능 개선",
    description: "N+1 최적화로 API 응답 시간 단축",
  },
  {
    number: "162",
    label: "RPS",
    description: "동시성 제어로 달성한 처리량",
  },
  {
    number: "6",
    label: "MSA 서비스",
    description: "분산 트랜잭션 SAGA/Outbox 구현",
  },
];
