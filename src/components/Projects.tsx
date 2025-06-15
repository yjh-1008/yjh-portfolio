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
  imageUrl: string;
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
      title: "E-Commerce Platform",
      description: "현대적인 UI/UX를 갖춘 종합 쇼핑몰 플랫폼",
      detailDescription: `React와 TypeScript를 기반으로 구축된 현대적인 전자상거래 플랫폼입니다.

주요 기능:
• 반응형 디자인으로 모든 디바이스에서 최적화된 쇼핑 경험
• 실시간 재고 관리 및 주문 처리 시스템
• 안전한 결제 시스템 통합 (PG사 연동)
• 개인화된 상품 추천 알고리즘
• 관리자 대시보드를 통한 통합 관리

기술적 특징:
• Next.js를 활용한 SSR/SSG 구현으로 SEO 최적화
• Redux Toolkit을 통한 효율적인 상태 관리
• React Query를 활용한 서버 상태 관리
• Tailwind CSS로 일관된 디자인 시스템 구축
• Jest와 React Testing Library를 통한 테스트 커버리지 90% 달성`,
      imageUrl:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
      tags: [
        "React",
        "TypeScript",
        "Next.js",
        "Redux",
        "Tailwind CSS",
        "Node.js",
      ],
      link: "https://github.com/yourusername/ecommerce-platform",
    },
    {
      id: 2,
      title: "Real-time Chat Application",
      description: "WebSocket 기반 실시간 채팅 애플리케이션",
      detailDescription: `Socket.io를 활용한 실시간 채팅 애플리케이션으로, 현대적인 메신저의 모든 기능을 구현했습니다.

핵심 기능:
• 실시간 메시지 송수신 및 읽음 표시
• 파일 및 이미지 공유 기능
• 그룹 채팅 및 개인 채팅 지원
• 메시지 검색 및 히스토리 관리
• 푸시 알림 시스템

기술 구현:
• Socket.io를 통한 실시간 양방향 통신
• MongoDB를 활용한 메시지 저장 및 관리
• JWT 기반 인증 시스템
• Redis를 활용한 세션 관리
• AWS S3를 통한 파일 업로드 처리
• PWA 구현으로 모바일 앱과 같은 사용자 경험`,
      imageUrl:
        "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=800&h=600&fit=crop",
      tags: ["React", "Socket.io", "Node.js", "MongoDB", "Redis", "AWS"],
      link: "https://github.com/yourusername/chat-app",
    },
    {
      id: 3,
      title: "Analytics Dashboard",
      description: "데이터 시각화를 위한 종합 분석 대시보드",
      detailDescription: `비즈니스 인텔리전스를 위한 종합적인 데이터 분석 및 시각화 대시보드입니다.

주요 특징:
• 실시간 데이터 모니터링 및 알림 시스템
• 다양한 차트와 그래프를 통한 데이터 시각화
• 커스터마이징 가능한 대시보드 레이아웃
• 데이터 필터링 및 드릴다운 기능
• PDF/Excel 형태의 리포트 생성

기술 스택:
• React와 TypeScript로 구축된 프론트엔드
• D3.js와 Chart.js를 활용한 고급 데이터 시각화
• GraphQL을 통한 효율적인 데이터 페칭
• Apollo Client를 활용한 캐싱 및 상태 관리
• Material-UI를 기반으로 한 일관된 디자인
• Docker를 활용한 컨테이너화 배포`,
      imageUrl:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      tags: [
        "React",
        "TypeScript",
        "D3.js",
        "GraphQL",
        "Material-UI",
        "Docker",
      ],
      link: "https://github.com/yourusername/analytics-dashboard",
    },
    {
      id: 4,
      title: "Task Management System",
      description: "팀 협업을 위한 프로젝트 관리 도구",
      detailDescription: `애자일 방법론을 지원하는 현대적인 프로젝트 관리 및 팀 협업 도구입니다.

핵심 기능:
• 칸반 보드를 통한 직관적인 작업 관리
• 간트 차트를 활용한 프로젝트 일정 관리
• 팀원 간 실시간 협업 및 댓글 시스템
• 시간 추적 및 생산성 분석
• 다양한 프로젝트 템플릿 제공

기술적 구현:
• React Hook Form을 활용한 효율적인 폼 관리
• React DnD를 통한 드래그 앤 드롭 인터페이스
• Zustand를 활용한 가벼운 상태 관리
• React Query를 통한 서버 상태 동기화
• Framer Motion을 활용한 부드러운 애니메이션
• Storybook을 통한 컴포넌트 문서화`,
      imageUrl:
        "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
      tags: [
        "React",
        "TypeScript",
        "Zustand",
        "React Query",
        "Framer Motion",
        "Storybook",
      ],
      link: "https://github.com/yourusername/task-management",
    },
    {
      id: 5,
      title: "Weather Forecast App",
      description: "AI 기반 날씨 예측 및 분석 애플리케이션",
      detailDescription: `머신러닝을 활용한 정확한 날씨 예측과 아름다운 UI를 결합한 날씨 애플리케이션입니다.

주요 기능:
• 현재 위치 기반 실시간 날씨 정보
• 7일간의 상세 날씨 예보
• 시간별 날씨 변화 그래프
• 날씨 기반 의상 추천 시스템
• 날씨 알림 및 경보 서비스

기술 혁신:
• OpenWeatherMap API와 자체 ML 모델 결합
• TensorFlow.js를 활용한 클라이언트 사이드 예측
• Service Worker를 통한 오프라인 지원
• Geolocation API를 활용한 위치 기반 서비스
• CSS Grid와 Flexbox를 활용한 반응형 레이아웃
• Lighthouse 성능 점수 95점 이상 달성`,
      imageUrl:
        "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=600&fit=crop",
      tags: [
        "React",
        "TensorFlow.js",
        "PWA",
        "API Integration",
        "CSS Grid",
        "Service Worker",
      ],
      link: "https://github.com/yourusername/weather-app",
    },
    {
      id: 6,
      title: "Portfolio Website",
      description: "인터랙티브한 개인 포트폴리오 웹사이트",
      detailDescription: `현재 보고 계신 포트폴리오 웹사이트로, 최신 웹 기술을 활용해 구축했습니다.

디자인 특징:
• Toss 디자인 시스템을 참고한 모던한 UI
• GSAP를 활용한 부드러운 스크롤 애니메이션
• 3D CSS 변환을 활용한 인터랙티브 카드
• 반응형 디자인으로 모든 기기에서 최적화
• 다크/라이트 테마 지원

기술적 구현:
• Vite를 활용한 빠른 개발 환경 구축
• TypeScript로 타입 안전성 확보
• Tailwind CSS를 통한 유틸리티 퍼스트 스타일링
• Framer Motion을 활용한 페이지 전환 효과
• Intersection Observer를 통한 스크롤 기반 애니메이션
• 웹 접근성 가이드라인(WCAG) 준수`,
      imageUrl:
        "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop",
      tags: [
        "React",
        "TypeScript",
        "Vite",
        "GSAP",
        "Tailwind CSS",
        "Framer Motion",
      ],
      link: "https://github.com/yourusername/portfolio",
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
      className="py-20 bg-gradient-to-br from-black via-gray-900 to-gray-800 relative overflow-hidden"
    >
      {/* 배경 패턴 - 모던한 그레이 톤 */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-gray-700 to-gray-600 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-gray-600 to-gray-500 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-gray-500 to-gray-400 rounded-full blur-3xl opacity-60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* 섹션 타이틀 */}
        <div ref={titleRef} className="text-center mb-16">
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
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16"
        >
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <Card
                title={project.title}
                description={project.description}
                imageUrl={project.imageUrl}
                tags={project.tags}
                link={project.link}
                onDetail={() => handleProjectDetail(project)}
              />
            </div>
          ))}
        </div>

        {/* GitHub 섹션 */}
        <div className="text-center">
          <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl p-8 md:p-10 text-gray-100 shadow-xl border border-gray-600">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-heading-3 font-bold mb-4">
                더 많은 프로젝트
              </h3>
              <p className="text-body-1 text-gray-300 leading-relaxed mb-8">
                GitHub에서 더 많은 오픈소스 프로젝트와 실험적인 코드들을
                확인하실 수 있습니다. 지속적인 학습과 개발을 통해 새로운 기술을
                탐구하고 있습니다.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://github.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-6 py-3 bg-gray-100 text-black font-semibold rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg hover:bg-white"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub 방문하기
                </a>
                <button className="px-6 py-3 border-2 border-gray-500 text-gray-200 font-semibold rounded-xl transition-all duration-200 hover:bg-gray-600 hover:border-gray-400 hover:text-gray-100">
                  이력서 다운로드
                </button>
              </div>
            </div>
          </div>
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
          imageUrl={selectedProject.imageUrl}
          tags={selectedProject.tags}
          link={selectedProject.link}
        />
      )}
    </section>
  );
});

export default Projects;
