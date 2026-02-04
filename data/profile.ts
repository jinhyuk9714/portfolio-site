/**
 * 개인 정보
 * 필수: name, headline, email, githubUrl
 * 선택: role, bio, keywords, linkedInUrl, profileImageUrl
 */

export const profile = {
  // 소개
  name: "개발자 성진혁",
  role: "백엔드 개발자" as string | null,
  headline: "배우고 나누는 개발을 지향합니다.",
  bio: "문제를 나누고 해결한 과정을 문서와 코드로 남기는 걸 좋아합니다." as string | null,
  /** 헤드라인 아래에 보이는 관심 키워드 (빈 배열이면 비표시) */
  keywords: ["동시성 제어", "MSA", "Spring", "성능·관측성"] as string[],

  // 연락
  email: "your.email@example.com",
  githubUrl: "https://github.com/jinhyuk9714",
  linkedInUrl: null as string | null,
  profileImageUrl: null as string | null,

  // 이력서 (PDF 파일을 public/resume.pdf에 저장)
  resumeUrl: "/resume.pdf" as string | null,
};
