import { useState, useEffect, useRef, useCallback, memo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Card from "./Card";
import Modal from "./Modal";
import { createTitleAnimation, createCardAnimation } from "../utils/animations";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  description: string;
  detailDescription: string;
  period: string;
  status: "progress" | "completed";
  achievements: string[];
  company?: string;
  tags: string[];
  link: string;
}

const Projects = memo(() => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projects: Project[] = [
    {
      id: 1,
      title: "AI 업무비서 챗봇 사이트",
      description: "Vue3 기반 NW AI 업무비서 챗봇 개발 (미디어로그)",
      detailDescription: `미디어로그에서 Vue3를 기반으로 개발한 AI 업무비서 챗봇 사이트입니다. (2025.01 ~ 진행 중)

주요 성과:
• Reverse Virtual Scroll 개발을 통한 렌더링 최적화
  - DOM에 많은 렌더링으로 인한 성능 저하 문제 해결
  - Container의 scrollTop + clientHeight 값과 누적합 알고리즘 활용
  - 가변 높이 적용 및 에러 핸들링을 위한 직접 구현

• Redis Pub/Sub과 EventSource를 통한 SSE 구현
  - AI 응답 시 한 글자씩 자연스럽게 생성되는 Animation 구현
  - Polyfill을 통한 브라우저 버전 호환성 이슈 해결
  - ChatGPT, Gemini 등 다양한 챗봇 UI 연구 및 적용

• DND 기능 성능 개선
  - requestAnimationFrame으로 드래그 중 버벅임 현상 개선
  - 외부 영역 이동 시 자동 스크롤 기능 구현

• 성능 개선 결과
  - FCP: 2.7s → 0.6s, LCP: 3.6s → 1.3s, TTI: 3.3s → 2.0s

기술적 특징:
• 웹/모바일 크로스 브라우징 지원
• 웹뷰 브릿지를 통한 파일 다운로드 및 브라우저 종료 로직 구현`,
      period: "2025.01 ~ 진행중",
      status: "progress" as const,
      achievements: [
        "Reverse Virtual Scroll 개발을 통한 렌더링 최적화",
        "Redis의 Pub/Sub과 EventSource 객체를 통한 SSE를 통해 AI 응답 UI 개선",
        "DND 기능 성능 개선",
      ],
      company: "미디어로그",
      tags: [
        "Vue3",
        "Vite",
        "Pinia",
        "es-toolkit",
        "Tanstack-query",
        "SSE",
        "Redis",
      ],
      link: "#",
    },
    {
      id: 2,
      title: "유/무선 사용자 데이터 처리 배치 관리 시스템",
      description: "Chart.js 대시보드와 성능 최적화가 적용된 관리 시스템",
      detailDescription: `유/무선 사용자 데이터 처리를 위한 배치 관리 시스템 개발 (2024.11 ~ 2025.01)

핵심 기능:
• Chart.js를 활용한 Nifi 상태 조회 대시보드
• 결재 승인 페이지 및 공통 모듈/컴포넌트 개발

서버 상태 캐싱 최적화:
• Tanstack-query 도입으로 불필요한 API 호출 개선
• 네트워크 요청 평균 43% 감소, 응답속도 57% 개선
• 데이터 변동성 기반 stale Time, gc Time 설정으로 캐싱 성능 최적화

렌더링 성능 최적화:
• 반복 렌더링 컴포넌트 최적화 (최대 4번 → 1회, 75% 개선)
• manualChunk 옵션을 통한 외부 라이브러리 캐싱
• FCP: 3.0s → 0.8s, LCP: 3.8s → 1.2s, TTI: 4.3s → 2.3s

타입스크립트 도입:
• 코드 안정성 향상을 위한 TypeScript 도입
• API 설계서 기반 Interface 사전 정의로 API 에러 개선
• Interface 확장 및 타입 리팩토링을 통한 클린 코드 추구

컴포넌트 구조 개선:
• Atomic Design Pattern 도입으로 관심사 분리
• UI 통일성 및 유지보수성 향상`,
      period: "2024.11 ~ 2025.01",
      status: "completed" as const,
      achievements: [
        "서버 상태 캐싱을 통한 불필요한 API 호출을 개선하고자 Tanstack-query를 도입",
        "렌더링 성능 최적화 번들 사이즈 개선을 통해 사용자 경험 개선",
        "타입스크립트 도입 및 코드 안정성 확보",
        "Atomic Design Pattern 도입을 통한 컴포넌트 구조 개선 및 리팩토링",
      ],
      tags: [
        "Vue3",
        "TypeScript",
        "Vite",
        "Pinia",
        "Tailwind",
        "Chart.js",
        "Tanstack-query",
      ],
      link: "#",
    },
    {
      id: 3,
      title: "SSO 적용 권한 관리 통합 웹 포털",
      description: "테스팅 환경과 성능 최적화가 적용된 통합 포털",
      detailDescription: `SSO 적용 권한 관리 통합 웹 포털 구축 (2024.02 ~ 진행 중)

주요 개발 업무:
• 결재 신청 및 승인 페이지 개발
• 공통 컴포넌트 개발 및 테스팅 환경 구축

UI 및 내부 구조 개선:
• URL 기반 검색 필터 정보 저장으로 새로고침 시 정보 유지
• 이미지 lazy-loading, Virtual Scroller 구현 (렌더링 횟수 85% 개선)
• Directive와 composable로 모듈화하여 팀 내 공유

Vitest, Storybook 테스팅 환경 구축:
• QA 팀 테스팅 후 오류 수정으로 인한 생산성 저하 개선
• TDD 개발론 도입으로 QA 검증 시 오류 발생률 92% 개선 (13회 → 1회)
• 계층적 컴포넌트 구조 재설계로 점진적 확장 지원
• 테스팅 라이브러리 사용 방법 문서화 및 팀원 공유

컴포넌트 디자인 시스템:
• theme, variant를 통한 class 주입으로 UI 통일성 증대
• 사용성과 일관성을 모두 고려한 컴포넌트 설계

기술적 성과:
• 신입 개발자로서 팀 내 기술 방향성에 적극적인 의견 제시
• 개선을 이끌어낸 경험으로 성장 기반 마련`,
      period: "2024.02 ~ 진행중",
      status: "progress" as const,
      achievements: [
        "UI 및 내부 구조 개선",
        "Vitest, Stor ybook을 도입하여 테스팅 환경 구축",
        "컴포넌트에 theme, variant로 class를 주입하여 UI 통일성과 사용성 증가",
      ],
      tags: ["Vue3", "Pinia", "Tailwind", "Storybook", "Vitest", "TDD"],
      link: "#",
    },
    {
      id: 4,
      title: "5G 기업 SLA 감시 웹 사이트",
      description: "Vue3 마이그레이션과 성능 최적화를 통한 시스템 개선",
      detailDescription: `5G 기업 SLA 감시 웹 사이트 구축 (2023.08 ~ 2024.01)

주요 개발 업무:
• 결재 신청, 승인 페이지 개발
• Vue2 → Vue3 마이그레이션
• Okta 로그인 연동

비즈니스 로직 리팩토링:
• yup 라이브러리 도입으로 API 호출 전 파라미터 검증
• vee-validate 라이브러리로 사용자 Validation UI/UX 개선
• debounce, throttle 사용으로 API, Event 호출 횟수 50% 단축

번들 사이즈 개선:
• 느린 빌드 시간과 TTV, TTI 개선을 위한 번들링 최적화
• 불필요한 Theme CSS, 기능 제거로 라이브러리 경량화
• moment → day.js, Ag Grid 버전 업그레이드 등 경량 라이브러리 도입
• Optimization, externals 옵션을 통한 청크 파일 사이즈 및 빌드 시간 개선

Vue3 마이그레이션:
• Vue3 권장 Composition API로 변경
• Vuex → Pinia 마이그레이션 및 모듈화
• 팀 내 혼선 방지를 위한 Composition API, Pinia 사용법 조사 및 공유`,
      period: "2023.08 ~ 2024.01",
      status: "completed" as const,
      achievements: [
        "비즈니스 로직 리팩토링 및 안정성 확보",
        "번들 사이즈 개선 및 라이브러리 변경",
        "Vue3 마이그레이션 및 모듈화",
      ],
      tags: ["Vue3", "Sass", "Pinia", "yup", "Webpack", "Okta"],
      link: "#",
    },
    {
      id: 5,
      title: "프론트엔드 CI/CD 환경 개선",
      description: "GitLab과 Teamcity를 활용한 배포 자동화 시스템",
      detailDescription: `프론트엔드 프로젝트 CI/CD 환경 개선 프로젝트

주요 개선 사항:
• SVN에서 GitLab으로 전환
• Teamcity Trigger와 GitLab MergeRequest 연동

CI/CD 프로세스 성능 향상:
• 자동화 및 최적화 작업으로 배포 시간 80% 단축
• 팀원이 업무에만 집중할 수 있는 환경 개선
• Teamcity Template 기능을 활용한 npm, yarn 버전별 템플릿 생성

CI/CD 편의성 개선:
• 개발 서버 자동 빌드/배포 시스템 구축
• GitLab 브랜치의 merge request 발생 시 자동 배포 설정

프로세스 개선 경험 공유:
• 팀 내 공유 문서 사이트에 CI/CD 환경 구축 가이드 문서 배포
• 주간 팀 회의에서 프론트엔드 CI/CD 설정 및 GitLab Trigger 설정 발표
• 개발 효율성 향상을 위한 지속적인 프로세스 개선`,
      period: "2023년 ~ 2024년",
      status: "completed" as const,
      achievements: [
        "CI/CD 프로세스 성능 향상",
        "CI/CD 편의성 개선 작업",
        "프로세스 개선 경험 문서화 및 팀 내 공유",
      ],
      tags: ["GitLab", "Teamcity", "CI/CD", "DevOps", "자동화"],
      link: "#",
    },
    {
      id: 6,
      title: "기술 문서 공유 사이트",
      description: "VitePress 기반 중앙화된 개발 문서 관리 시스템",
      detailDescription: `프로젝트별로 분리되어 있던 문서를 중앙에서 관리하기 위한 기술 문서 공유 사이트 구축

문서 공유 환경 개선:
• 프로젝트마다 분산되어 있던 개발 문서를 하나의 프로젝트에서 통합 관리
• 문서 작성 및 관리 편의성 대폭 개선
• VitePress Web UI를 통한 마크다운 문서 가독성 향상

프로젝트 설정 가이드:
• 프로젝트 구축 환경 가이드 및 CI/CD 설정 문서 제작
• 개발 편의성 향상을 위한 상세한 가이드 제공
• Front-end, Back-end별 환경변수 파일 문서화

보안성 개선:
• 기존 파일 공유 방식의 보안 위험도 단축
• OAuth2 연동을 통한 문서 유출 위험성 최소화
• 접근 권한 관리를 통한 보안 강화

기술적 성과:
• 팀 내 지식 공유 체계 구축
• 개발 온보딩 프로세스 개선
• 문서 관리 효율성 극대화`,
      period: "2023년 ~ 2024년",
      status: "completed" as const,
      achievements: [
        "문서 공유 환경 및 마크다운 UI 편의성 개선",
        "프로젝트 설정 및 환경변수 가이드 공유 편의성 개선",
      ],
      tags: ["VitePress", "마크다운", "OAuth2", "문서화"],
      link: "#",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      createTitleAnimation(titleRef.current);
      createCardAnimation(".project-card", gridRef.current);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleProjectDetail = useCallback((project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedProject(null);
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-black via-gray-900 to-gray-800 relative overflow-hidden"
    >
      {/* 배경 패턴 - 모던한 그레이 톤 */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-gray-700 to-gray-600 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-gray-600 to-gray-500 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-gray-500 to-gray-400 rounded-full blur-3xl opacity-60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* 섹션 타이틀 */}
        <div ref={titleRef} className="text-center mb-12 sm:mb-16">
          <h2 className="text-heading-2 md:text-heading-1 font-bold text-gray-100 mb-4">
            Projects
          </h2>
          <p className="text-body-1 text-gray-400 max-w-2xl mx-auto leading-relaxed">
            기술적 도전과 창의적 문제 해결이 담긴 프로젝트들
          </p>
        </div>

        {/* 프로젝트 그리드 */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16"
        >
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <Card
                title={project.title}
                description={project.description}
                period={project.period}
                status={project.status}
                achievements={project.achievements}
                company={project.company}
                tags={project.tags}
                link={project.link}
                onDetail={() => handleProjectDetail(project)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 모달 */}
      {selectedProject && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={selectedProject.title}
          description={selectedProject.description}
          detailDescription={selectedProject.detailDescription}
          period={selectedProject.period}
          status={selectedProject.status}
          achievements={selectedProject.achievements}
          company={selectedProject.company}
          tags={selectedProject.tags}
          link={selectedProject.link}
        />
      )}
    </section>
  );
});

export default Projects;
