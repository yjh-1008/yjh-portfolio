import { useState, useEffect, useRef, useCallback, memo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Card from "./Card";
import Modal from "./Modal";
import { createTitleAnimation, createCardAnimation } from "../utils/animations";

gsap.registerPlugin(ScrollTrigger);

interface HierarchicalAchievement {
  title: string;
  description?: string;
  metrics?: string;
  subItems?: HierarchicalAchievement[];
}

interface Project {
  id: number;
  title: string;
  description: string;
  detailDescription: string;
  period: string;
  status: "progress" | "completed";
  achievements: string[];
  hierarchicalAchievements: HierarchicalAchievement[];
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
      title: "NW AI 업무비서 모바일 쳇봇 사이트",
      description: "Vue3 기반 AI 업무비서 챗봇 개발 (미디어로그)",
      detailDescription: `미디어로그에서 Vue3를 기반으로 개발한 AI 업무비서 챗봇 사이트입니다. (2025.01 ~ 진행 중)

주요 성과:
• Reverse Virtual Scroll 개발
  - 부하 테스트 중 300개 이상의 데이터 렌더링 시 메모리 낭비로 인한 성능 저하 발견
  - 라이브러리 사용 시 커뮤니티 대응 어려움으로 직접 구현
  - Prefix Sum 알고리즘을 활용한 컴포넌트 높이 동적 계산 성능 최적화
  - 이미지 지연로딩 구조에서 Web Worker 기반 다크모드 자동 처리를 도입해 메인 스레드 부하를 분산 (링크)
    • TBT 의 65% 감소, FPSE 15 → 55로 향상되어 스크롤 시 사용자 UX 개선
  - 메모리 사용량 100MB에서 15MB로 85% 개선

• 컴포넌트 및 아키텍처 최적화 통한 FCP(2.7s → 0.6s), LCP(3.6s → 1.3s), TTI(3.3s → 2.0s)로 성능 개선

• DND 기능 성능 개선
  - 드래그 진입/해체 시 requestAnimationFrame을 도입하여 Frame Drop 개선 (링크)
    • Performance 측정을 통한 Frame Rate 45% 개선 확인
  - 마우스 이동 이벤트에 throttle을 실험적으로 적용 (50, 100, 200, 300ms)
    • 사용자 체감 지연 없는 100ms 설정으로 최적화
    • CPU 부하와 프레임 저하 문제 개선

• WebView Bridge를 활용해 웹에서 영역외 데이터 진출 및 건전한 요청 명영 처리

• 대화형 인터페스 UI 구현 및 리팩토링
 - AI 모델별 다른 Color theme을 통한 UI 개선
 - 추천 질문 UI 구현(Chip 형태, 리스트 형태) 직용에 대한 A/B 테스트를 진행하여 추천 질문 클릭율 2.3배 향상
 -  AI 응답 평 가 아이콘 지연 로딩 및 fade-down Animation 적용

• Redis의 Pub/Sub과 EventSource 객체를 통한 SSE롤 통해 AI 응답 UI 개선
  - Polyfill을 통한 EventSource 호환성 이슈 해결`,
      period: "2025.01 ~ 진행중",
      status: "progress" as const,
      achievements: [
        "Reverse Virtual Scroll 개발을 통한 렌더링 최적화",
        "컴포넌트 및 이미지, 폰트 최적화를 통한 성능 개선",
        "DND 기능 성능 개선",
      ],
      hierarchicalAchievements: [
        {
          title: "Reverse Virtual Scroll 개발",
          description: "대량 데이터 렌더링 최적화",
          subItems: [
            {
              title: "성능 문제 해결",
              description:
                "300개 이상 데이터 렌더링 시 메모리 낭비 문제 발견 및 직접 구현",
              metrics: "메모리 사용량 100MB → 15MB (85% 개선)",
            },
            {
              title: "알고리즘 최적화",
              description:
                "Prefix Sum 알고리즘을 활용한 컴포넌트 높이 동적 계산",
            },
            {
              title: "Web Worker 활용",
              description:
                "이미지 지연로딩에서 다크모드 자동 처리로 메인 스레드 부하 분산",
              metrics: "TBT 65% 감소, FPSE 15 → 55 향상",
            },
          ],
        },
        {
          title: "전체 성능 최적화",
          description: "컴포넌트 및 아키텍처 최적화",
          metrics: "FCP: 2.7s → 0.6s, LCP: 3.6s → 1.3s, TTI: 3.3s → 2.0s",
        },
        {
          title: "DND 기능 성능 개선",
          description: "드래그 앤 드롭 기능 최적화",
          subItems: [
            {
              title: "Frame Drop 개선",
              description: "requestAnimationFrame 도입",
              metrics: "Frame Rate 45% 개선",
            },
            {
              title: "이벤트 최적화",
              description: "마우스 이벤트에 throttle 적용",
              metrics: "사용자 체감 지연 없는 100ms 설정",
            },
          ],
        },
        {
          title: "대화형 인터페이스 UI 구현",
          description: "사용자 경험 개선",
          subItems: [
            {
              title: "AI 모델별 테마",
              description: "각 모델별 다른 Color theme 적용",
            },
            {
              title: "추천 질문 UI",
              description: "A/B 테스트를 통한 UI 최적화",
              metrics: "클릭율 2.3배 향상",
            },
            {
              title: "응답 애니메이션",
              description:
                "AI 응답 평가 아이콘 지연 로딩 및 fade-down Animation",
            },
          ],
        },
        {
          title: "SSE 구현",
          description: "Redis Pub/Sub과 EventSource를 통한 실시간 AI 응답",
          subItems: [
            {
              title: "브라우저 호환성",
              description: "Polyfill을 통한 EventSource 호환성 이슈 해결",
            },
          ],
        },
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
      title: "Network 업무 지원 AI 사이트 개발",
      description: "Vue3 기반 네트워크 업무 지원 AI 시스템",
      detailDescription: `Vue3, Pinia, Tailwind, Iodash, Storybook, Vitest 기반 개발 (2024.02 ~ 진행 중)

주요 성과:
• 서버 상태 캐싱을 통한 불필요한 API 호출을 개선하고자 Tanstack-query를 도입
 - 네트워크 요청 평균 43% 감소 및 개선 성능을 특정 응답속도 57% 개선
 - 데이터 변동성을 기반으로 staleTime, pcTime 설정으로 캐싱 성능 최적화
 - HTTP 요청 수 45% 개선, DB OPS 1.6 → 0.8 50% 단축

• 모델마다 상이한 AI 응답 형태를 공통된 형태로 표준화
  - Adapter 패턴을 활용하여 ConversationId, Content, Files, nextQuestions라는 공통된 형태로 기준
  - 응답마다 다르게 처리하던 로직을 하나의 형태로 공통화하여 개발자 경험(DX) 개선

• 공통 모달 컴포넌트 개발 및 전역 상태 기반 모달 관리 로직 설계
 - Pinia를 통한 모달 호출 로직을 전역상태로 통합
 - ID 단위의 모달 계층 구조로 개선하여 라인 등록 상화
 - markRaw 및 defineAsyncComponent를 활용한 지연 로딩 적용으로 렌더링 성능 최적화

• 예리 감소 및 코드 안정성 확보를 위한 테스트 환경 구축
  - 작은 단위의 컴포넌트를 시작으로 점진적으로 테스팅을 진행하는 계층적 컴포넌트 구조로 설계
  - QA 검증 테스트 시 발생량 13회 → 1회로 92% 개선
  - 테스팅 라이브러리의 사용 방법 및 활용 범위를 문서화 및 팀원에게 공유

• URLSearchParams를 쉽게 관리할 수 있는 공통 모듈 개발

• EventStream을 지원하는 AI 모델과 구글치 않은 모델을 구분하여 컴포넌트 설계 및 개발
  - EventStream 모델에는 fade-in Animation을 적용, 비지원 모델에는 Skeleton을 적용하여 사용자 UX 개선`,

      period: "2024.02 ~ 진행중",
      status: "progress" as const,
      achievements: [
        "서버 상태 캐싱을 통한 불필요한 API 호출을 개선하고자 Tanstack-query를 도입",
        "네트워크 요청 평균 43% 감소 및 개선 성능을 특정 응답속도 57% 개선",
        "데이터 변동성을 기반으로 staleTime, pcTime 설정으로 캐싱 성능 최적화",
        "HTTP 요청 수 45% 개선, DB OPS 1.6 → 0.8 50% 단축",
        "모델마다 상이한 AI 응답 형태를 공통화 형태로 표준화",
      ],
      hierarchicalAchievements: [
        {
          title: "서버 상태 캐싱 최적화",
          description: "Tanstack-query를 통한 API 호출 개선",
          subItems: [
            {
              title: "네트워크 요청 최적화",
              metrics: "네트워크 요청 평균 43% 감소, 응답속도 57% 개선",
            },
            {
              title: "캐싱 전략 최적화",
              description: "데이터 변동성 기반 staleTime, pcTime 설정",
            },
            {
              title: "성능 지표 개선",
              metrics: "HTTP 요청 수 45% 개선, DB OPS 1.6 → 0.8 (50% 단축)",
            },
          ],
        },
        {
          title: "AI 응답 표준화",
          description: "모델별 상이한 응답 형태 통합",
          subItems: [
            {
              title: "Adapter 패턴 적용",
              description:
                "ConversationId, Content, Files, nextQuestions 공통 형태 구현",
            },
            {
              title: "개발자 경험 개선",
              description: "응답 처리 로직 일원화로 DX 향상",
            },
          ],
        },
        {
          title: "공통 모달 시스템",
          description: "전역 상태 기반 모달 관리 시스템 구축",
          subItems: [
            {
              title: "Pinia 통합",
              description: "전역상태를 통한 모달 호출 로직 통합",
            },
            {
              title: "계층적 구조",
              description: "ID 단위의 모달 계층 구조 개선",
            },
            {
              title: "지연 로딩",
              description: "markRaw 및 defineAsyncComponent 활용",
            },
          ],
        },
        {
          title: "테스팅 환경 구축",
          description: "코드 안정성 확보를 위한 테스트 시스템",
          subItems: [
            {
              title: "계층적 테스트 구조",
              description: "작은 단위부터 점진적 테스팅 구조 설계",
            },
            {
              title: "QA 개선",
              metrics: "검증 테스트 발생량 13회 → 1회 (92% 개선)",
            },
            {
              title: "문서화",
              description: "테스팅 라이브러리 사용법 문서화 및 팀 공유",
            },
          ],
        },
        {
          title: "공통 모듈 개발",
          description: "재사용 가능한 유틸리티 모듈",
          subItems: [
            {
              title: "URLSearchParams 관리",
              description: "쉽게 관리할 수 있는 공통 모듈 개발",
            },
            {
              title: "EventStream 처리",
              description: "AI 모델별 스트리밍 지원 여부에 따른 UI 분기 처리",
            },
          ],
        },
      ],
      tags: ["Vue3", "Pinia", "Tailwind", "Iodash", "Storybook", "Vitest"],
      link: "#",
    },
    {
      id: 3,
      title: "5G 기업 SLA 감시 웹 사이트",
      description: "Vue3 마이그레이션과 성능 최적화를 통한 시스템 개선",
      detailDescription: `5G 기업 SLA 감시 웹 사이트 구축 (2023.08 ~ 2024.01)

주요 개발 업무:
• N-Depth 탭 개발
  - N-Depth 에서도 대응 할 수 있도록, 재귀 알고리즘을 활용한 확 장성이 높은 컴포넌 트로 리팩토링 진행

• Layout Shift, FCP 개선
  - 공통된 UI 를 Layout 컴포넌트로 모듈화 불필요한 렌더링 방지
  - Infinite Scroll에 throttle을 200 ms 적용하여 이벤트 성능 최적화

• 자동완성 API 로직에 debounce 300ms로 적용하여 API 호출 횟수 75% 개선
  - WAS CPU 사용량 46% 감소 및 평균 응답 시간 41% 개선

• 번들 사이즈 개선 및 라이브러리 변경
  - 번들 사이즈로 인한 느린 빌 드 시간과 FCP , LCP를 개선하 기 위해 번들링 최적화 작업을 진행
   - 불필요한 Theme CSS 를 제거하여 라이브러리 경량화
  - 동일한 기능을 하는 경 량화된 라이브러리 도입 (예: moment → day.js, AG Grid 버전 업그레이드)

• 함수형 프로그래밍 및 지연평가를 통한 메서드 최적화
  - 수천건의 로그성 데이터를 가공 및 처리로 인한 메모리 누수 및 성능 저하 개선
  - lodash의 chain 메서드를 통한 지연평가 적용
  - 제너레이터 메서드를 활용한 유틸 메서드 구현
  - 지연 평가를 통한 메서드 수행시간 53 ms → 26 ms로 51% 개선, 메모리 사용량 40% 감소

• Webpack + Vue2로 개발 된 페이지를 Vite + Vue3를 사용하여 마이그레이션 진행
  - Vue3에서 권장하는 Composition API로 변경
  - .env 와 vite mode 옵션을 통한 서버 별 배포 방식 구현
  - Vuex에서 Pinia로 마이그레이션 및 모듈화
  - 마이그레이션 중, 혼선을 줄이기 위해 Composition API, Pinia 사용법을 조사 및 팀 내 공유`,
      period: "2023.08 ~ 2024.01",
      status: "completed" as const,
      achievements: [
        "비즈니스 로직 리팩토링 및 안정성 확보",
        "번들 사이즈 개선 및 라이브러리 변경",
        "Vue3 마이그레이션 및 모듈화",
      ],
      hierarchicalAchievements: [
        {
          title: "N-Depth 탭 개발",
          description: "확장성 높은 컴포넌트 구조",
          subItems: [
            {
              title: "재귀 알고리즘 활용",
              description:
                "N-Depth에서도 대응 가능한 확장성 높은 컴포넌트 리팩토링",
            },
          ],
        },
        {
          title: "Layout Shift, FCP 개선",
          description: "렌더링 성능 최적화",
          subItems: [
            {
              title: "Layout 컴포넌트 모듈화",
              description: "공통 UI를 모듈화하여 불필요한 렌더링 방지",
            },
            {
              title: "Infinite Scroll 최적화",
              description: "throttle 200ms 적용으로 이벤트 성능 최적화",
            },
          ],
        },
        {
          title: "API 최적화",
          description: "자동완성 API 성능 개선",
          subItems: [
            {
              title: "debounce 적용",
              description: "300ms debounce로 API 호출 횟수 최적화",
              metrics: "API 호출 횟수 75% 개선",
            },
            {
              title: "서버 성능 개선",
              metrics: "WAS CPU 사용량 46% 감소, 평균 응답 시간 41% 개선",
            },
          ],
        },
        {
          title: "번들 사이즈 개선",
          description: "빌드 시간 및 성능 최적화",
          subItems: [
            {
              title: "라이브러리 경량화",
              description: "불필요한 Theme CSS 제거 및 경량 라이브러리 도입",
            },
            {
              title: "라이브러리 교체",
              description: "moment → day.js, AG Grid 버전 업그레이드",
            },
          ],
        },
        {
          title: "함수형 프로그래밍 최적화",
          description: "메모리 누수 및 성능 저하 개선",
          subItems: [
            {
              title: "지연평가 적용",
              description: "lodash chain 메서드를 통한 지연평가",
            },
            {
              title: "제너레이터 활용",
              description: "유틸 메서드 구현으로 메모리 효율성 향상",
            },
            {
              title: "성능 개선 결과",
              metrics:
                "메서드 수행시간 53ms → 26ms (51% 개선), 메모리 사용량 40% 감소",
            },
          ],
        },
        {
          title: "Vue3 마이그레이션",
          description: "Webpack + Vue2에서 Vite + Vue3로 전환",
          subItems: [
            {
              title: "Composition API 도입",
              description: "Vue3 권장 패턴으로 코드 구조 개선",
            },
            {
              title: "배포 환경 구축",
              description: ".env와 vite mode 옵션을 통한 서버별 배포 방식",
            },
            {
              title: "상태 관리 마이그레이션",
              description: "Vuex → Pinia 전환 및 모듈화",
            },
            {
              title: "팀 내 공유",
              description: "Composition API, Pinia 사용법 조사 및 공유",
            },
          ],
        },
      ],
      tags: ["Vue3", "Sass", "Pinia", "yup", "Webpack", "Okta"],
      link: "#",
    },
    {
      id: 4,
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
      hierarchicalAchievements: [
        {
          title: "CI/CD 환경 전환",
          description: "개발 환경 현대화",
          subItems: [
            {
              title: "버전 관리 시스템 전환",
              description: "SVN에서 GitLab으로 마이그레이션",
            },
            {
              title: "자동화 연동",
              description: "Teamcity Trigger와 GitLab MergeRequest 연동",
            },
          ],
        },
        {
          title: "성능 향상",
          description: "배포 프로세스 최적화",
          subItems: [
            {
              title: "배포 시간 단축",
              metrics: "자동화 및 최적화로 배포 시간 80% 단축",
            },
            {
              title: "템플릿 시스템",
              description:
                "Teamcity Template 기능을 활용한 npm, yarn 버전별 템플릿 생성",
            },
          ],
        },
        {
          title: "편의성 개선",
          description: "개발자 경험 향상",
          subItems: [
            {
              title: "자동 배포 시스템",
              description: "개발 서버 자동 빌드/배포 시스템 구축",
            },
            {
              title: "자동 트리거",
              description: "GitLab MR 발생 시 자동 배포 설정",
            },
          ],
        },
        {
          title: "지식 공유",
          description: "팀 내 프로세스 개선 문화 구축",
          subItems: [
            {
              title: "문서화",
              description: "CI/CD 환경 구축 가이드 문서 작성 및 배포",
            },
            {
              title: "팀 발표",
              description:
                "주간 회의에서 CI/CD 설정 및 GitLab Trigger 설정 발표",
            },
          ],
        },
      ],
      tags: ["GitLab", "Teamcity", "CI/CD", "DevOps", "자동화"],
      link: "#",
    },
    {
      id: 5,
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
      hierarchicalAchievements: [
        {
          title: "문서 통합 관리",
          description: "분산된 문서의 중앙화",
          subItems: [
            {
              title: "통합 관리 시스템",
              description:
                "프로젝트별 분산 문서를 하나의 프로젝트에서 통합 관리",
            },
            {
              title: "작성 편의성",
              description: "문서 작성 및 관리 편의성 대폭 개선",
            },
            {
              title: "가독성 향상",
              description: "VitePress Web UI를 통한 마크다운 문서 가독성 향상",
            },
          ],
        },
        {
          title: "개발 가이드 구축",
          description: "체계적인 개발 문서화",
          subItems: [
            {
              title: "환경 구축 가이드",
              description: "프로젝트 구축 환경 가이드 및 CI/CD 설정 문서",
            },
            {
              title: "환경변수 문서화",
              description: "Front-end, Back-end별 환경변수 파일 문서화",
            },
          ],
        },
        {
          title: "보안성 강화",
          description: "문서 관리 보안 체계 구축",
          subItems: [
            {
              title: "보안 위험도 개선",
              description: "기존 파일 공유 방식의 보안 위험도 단축",
            },
            {
              title: "OAuth2 연동",
              description: "문서 유출 위험성 최소화를 위한 인증 시스템",
            },
            {
              title: "접근 권한 관리",
              description: "세밀한 권한 관리를 통한 보안 강화",
            },
          ],
        },
        {
          title: "조직 문화 개선",
          description: "지식 공유 체계 정착",
          subItems: [
            {
              title: "지식 공유 체계",
              description: "팀 내 지식 공유 문화 구축",
            },
            {
              title: "온보딩 프로세스",
              description: "새로운 팀원을 위한 온보딩 프로세스 개선",
            },
            {
              title: "문서 관리 효율성",
              description: "문서 관리 업무 효율성 극대화",
            },
          ],
        },
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
          hierarchicalAchievements={selectedProject.hierarchicalAchievements}
          company={selectedProject.company}
          tags={selectedProject.tags}
          link={selectedProject.link}
        />
      )}
    </section>
  );
});

export default Projects;
