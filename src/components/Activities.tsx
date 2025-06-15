import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CodeBracketIcon,
  PencilSquareIcon,
  MicrophoneIcon,
  CubeIcon,
  AcademicCapIcon,
  TrophyIcon,
} from "@heroicons/react/24/outline";
import Button from "./Button";

gsap.registerPlugin(ScrollTrigger);

interface Activity {
  id: number;
  title: string;
  description: string;
  detailDescription: string;
  imageUrl: string;
  tags: string[];
  link: string;
  icon: React.ElementType;
  period: string;
  achievements: string[];
  color: string;
}

const Activities = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const [currentSlide, setCurrentSlide] = useState(0);

  const activities: Activity[] = [
    {
      id: 1,
      title: "오픈소스 기여",
      description:
        "React, TypeScript 관련 오픈소스 프로젝트에 기여하며 개발 커뮤니티와 함께 성장하고 있습니다.",
      detailDescription: `오픈소스 생태계에 적극적으로 참여하며 개발 커뮤니티에 기여하고 있습니다.

주요 활동:
• React, Vue.js 등 주요 프론트엔드 라이브러리 버그 수정
• 문서화 개선 및 번역 작업 참여
• 새로운 기능 제안 및 구현
• 코드 리뷰 및 이슈 해결 지원
• 개발자 커뮤니티 멘토링 활동

기여 성과:
• 총 50+ Pull Request 승인
• 10+ 오픈소스 프로젝트 기여
• 커뮤니티 내 활발한 토론 참여
• 신규 개발자 온보딩 지원`,
      imageUrl: "https://source.unsplash.com/800x600?opensource&sig=1",
      tags: ["Open Source", "GitHub", "Community", "Mentoring"],
      link: "https://github.com/yourusername",
      icon: CodeBracketIcon,
      period: "2022 - 현재",
      achievements: ["10+ PR 승인", "5개 프로젝트 기여", "커뮤니티 활동"],
      color: "from-gray-600 to-gray-500",
    },
    {
      id: 2,
      title: "기술 블로그 운영",
      description:
        "개발 경험과 학습 내용을 정리하여 다른 개발자들과 지식을 공유하고 있습니다.",
      detailDescription: `개발자로서의 경험과 학습한 내용을 체계적으로 정리하여 공유하고 있습니다.

주요 콘텐츠:
• 프론트엔드 개발 트렌드 및 기술 분석
• 실무에서 마주한 문제 해결 과정 공유
• 새로운 기술 스택 학습 후기
• 개발 도구 및 워크플로우 최적화 팁
• 코드 리팩토링 및 성능 최적화 사례

운영 성과:
• 월 평균 10,000+ 페이지뷰
• 50+ 기술 아티클 발행
• 개발자 커뮤니티 내 활발한 피드백
• 기술 세미나 발표 경험`,
      imageUrl: "https://source.unsplash.com/800x600?blog&sig=2",
      tags: ["Tech Blog", "Writing", "Knowledge Sharing", "SEO"],
      link: "https://blog.example.com",
      icon: PencilSquareIcon,
      period: "2021 - 현재",
      achievements: ["50+ 포스팅", "월 1만+ 조회수", "개발 팁 공유"],
      color: "from-gray-600 to-gray-500",
    },
    {
      id: 3,
      title: "컨퍼런스 발표",
      description:
        "프론트엔드 개발 관련 컨퍼런스에서 발표하며 경험을 공유했습니다.",
      detailDescription: `최신 기술 트렌드를 파악하고 개발자 네트워크를 확장하기 위해 적극적으로 참여하고 있습니다.

참여 컨퍼런스:
• FEConf 2023 - 프론트엔드 개발 트렌드
• DEVIEW 2023 - 네이버 개발자 컨퍼런스
• JSConf Korea 2023 - JavaScript 생태계
• React Korea Meetup - 정기 모임 참여
• GDG DevFest Seoul - Google 기술 세미나

활동 내용:
• 최신 기술 트렌드 학습 및 적용
• 업계 전문가들과의 네트워킹
• 기술 세션 참여 및 질의응답
• 개발자 커뮤니티 활동 확대`,
      imageUrl: "https://source.unsplash.com/800x600?conference&sig=3",
      tags: ["Conference", "Networking", "Learning", "Community"],
      link: "https://example.com/conferences",
      icon: MicrophoneIcon,
      period: "2023",
      achievements: ["3회 발표", "200+ 참석자", "긍정적 피드백"],
      color: "from-gray-600 to-gray-500",
    },
    {
      id: 4,
      title: "사이드 프로젝트",
      description:
        "개인 프로젝트를 통해 새로운 기술을 학습하고 실무에 적용하고 있습니다.",
      detailDescription: `업무 외 시간을 활용하여 창의적이고 실험적인 프로젝트들을 진행하고 있습니다.

진행 프로젝트:
• 개발자를 위한 생산성 도구 개발
• AI를 활용한 코드 리뷰 자동화 도구
• 실시간 협업 화이트보드 애플리케이션
• 개발자 포트폴리오 템플릿 제작
• 오픈소스 UI 컴포넌트 라이브러리

기술적 도전:
• 새로운 기술 스택 실험 및 적용
• 사용자 중심의 UX/UI 디자인 연구
• 성능 최적화 및 확장성 고려
• 지속 가능한 개발 프로세스 구축`,
      imageUrl: "https://source.unsplash.com/800x600?project&sig=4",
      tags: ["Side Project", "Innovation", "Experimentation", "Creativity"],
      link: "https://github.com/yourusername/side-projects",
      icon: CubeIcon,
      period: "2022 - 현재",
      achievements: ["5개 프로젝트 완성", "새 기술 도입", "사용자 피드백 반영"],
      color: "from-gray-600 to-gray-500",
    },
    {
      id: 5,
      title: "멘토링 활동",
      description:
        "주니어 개발자들을 대상으로 멘토링을 진행하며 성장을 돕고 있습니다.",
      detailDescription: `개발 지식과 경험을 나누며 후배 개발자들의 성장을 돕고 있습니다.

멘토링 활동:
• 주니어 개발자 1:1 멘토링 (월 2회)
• 코딩 부트캠프 멘토 활동
• 대학교 프로그래밍 동아리 지도
• 온라인 개발자 커뮤니티 질의응답
• 취업 준비생 포트폴리오 리뷰

교육 내용:
• 프론트엔드 개발 기초부터 심화까지
• 실무 프로젝트 경험 공유
• 코드 리뷰 및 개선 방향 제시
• 개발자 커리어 상담 및 조언
• 기술 면접 준비 지원`,
      imageUrl: "https://source.unsplash.com/800x600?mentoring&sig=5",
      tags: ["Mentoring", "Education", "Teaching", "Career Guidance"],
      link: "https://example.com/mentoring",
      icon: AcademicCapIcon,
      period: "2023 - 현재",
      achievements: ["10명 멘티", "코드 리뷰", "커리어 상담"],
      color: "from-gray-600 to-gray-500",
    },
    {
      id: 6,
      title: "해커톤 참여",
      description:
        "다양한 해커톤에 참여하여 빠른 프로토타이핑과 팀워크 경험을 쌓았습니다.",
      detailDescription: `제한된 시간 내에 창의적인 아이디어를 구현하는 해커톤에 적극 참여하고 있습니다.

참여 해커톤:
• Junction X Seoul 2023 - 핀테크 솔루션 개발
• 서울 스타트업 해커톤 - 사회문제 해결 앱
• 대학생 프로그래밍 경진대회 - 웹 서비스 개발
• 기업 주관 해커톤 - 업무 효율성 도구
• 글로벌 온라인 해커톤 - AI 활용 서비스

성과 및 수상:
• Junction X Seoul 2023 - 우수상 수상
• 서울 스타트업 해커톤 - 최우수상
• 총 5회 해커톤 참여, 3회 수상
• 빠른 프로토타이핑 및 MVP 개발 경험
• 다양한 분야 개발자들과의 협업 경험`,
      imageUrl: "https://source.unsplash.com/800x600?hackathon&sig=6",
      tags: ["Hackathon", "Prototyping", "Innovation", "Teamwork"],
      link: "https://example.com/hackathons",
      icon: TrophyIcon,
      period: "2022 - 2023",
      achievements: ["3회 참여", "1회 수상", "팀 리더 경험"],
      color: "from-gray-600 to-gray-500",
    },
  ];

  const itemsPerSlide = 3;
  const totalSlides = Math.ceil(activities.length / itemsPerSlide);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".activity-card",
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: sliderRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-black via-gray-900 to-gray-800 relative overflow-hidden"
    >
      {/* 배경 패턴 - 모던한 그레이 톤 */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-gray-700 to-gray-600 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-gray-600 to-gray-500 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-gray-500 to-gray-600 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* 섹션 타이틀 */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-heading-2 md:text-heading-1 font-bold text-gray-100 mb-4">
            Activities
          </h2>
          <p className="text-body-1 text-gray-400 max-w-2xl mx-auto leading-relaxed">
            개발 커뮤니티와 함께하는 다양한 활동들
          </p>
        </div>

        {/* 슬라이더 */}
        <div ref={sliderRef} className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
                    {activities
                      .slice(
                        slideIndex * itemsPerSlide,
                        (slideIndex + 1) * itemsPerSlide
                      )
                      .map((activity, index) => (
                        <div
                          key={slideIndex * itemsPerSlide + index}
                          className="activity-card bg-gray-800/80 backdrop-blur-md rounded-2xl p-6 hover:bg-gray-800 transition-all duration-300 hover:-translate-y-2 border border-gray-700 hover:border-gray-600 shadow-lg hover:shadow-xl"
                        >
                          <div className="w-14 h-14 bg-gradient-to-br from-gray-600 to-gray-500 rounded-xl flex items-center justify-center mb-5 shadow-lg">
                            <activity.icon className="w-7 h-7 text-gray-100" />
                          </div>

                          <div className="mb-4">
                            <h3 className="text-heading-4 font-semibold text-gray-100 mb-2">
                              {activity.title}
                            </h3>
                            <p className="text-caption text-gray-400 font-medium">
                              {activity.period}
                            </p>
                          </div>

                          <p className="text-body-2 text-gray-300 leading-relaxed mb-4">
                            {activity.description}
                          </p>

                          {/* 태그들 - 작은 크기, 위아래 패딩 늘리고 좌우 패딩 줄임 */}
                          {activity.tags && activity.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mb-4">
                              {activity.tags
                                .slice(0, 3)
                                .map((tag, tagIndex) => (
                                  <span
                                    key={tagIndex}
                                    className="px-2 py-1.5 bg-gray-700 text-gray-200 text-xs font-medium rounded-lg border border-gray-600"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              {activity.tags.length > 3 && (
                                <span className="px-2 py-1.5 bg-gray-700/50 text-gray-400 text-xs font-medium rounded-lg border border-gray-600/50">
                                  +{activity.tags.length - 3}
                                </span>
                              )}
                            </div>
                          )}

                          <div className="space-y-2">
                            {activity.achievements.map(
                              (achievement, achievementIndex) => (
                                <div
                                  key={achievementIndex}
                                  className="flex items-center space-x-2"
                                >
                                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full flex-shrink-0" />
                                  <span className="text-caption text-gray-400">
                                    {achievement}
                                  </span>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 네비게이션 버튼 */}
          <div className="flex justify-center items-center space-x-6 mt-12">
            <Button
              variant="ghost"
              size="md"
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="text-gray-300 hover:bg-gray-800/50 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-600 hover:border-gray-500 px-4 py-2"
              icon={<ChevronLeftIcon className="w-5 h-5" />}
            >
              이전
            </Button>

            {/* 인디케이터 */}
            <div className="flex space-x-2">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentSlide
                      ? "bg-gray-400 scale-125 shadow-lg shadow-gray-400/50"
                      : "bg-gray-600 hover:bg-gray-500"
                  }`}
                />
              ))}
            </div>

            <Button
              variant="ghost"
              size="md"
              onClick={nextSlide}
              disabled={currentSlide === totalSlides - 1}
              className="text-gray-300 hover:bg-gray-800/50 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-600 hover:border-gray-500 px-4 py-2"
              icon={<ChevronRightIcon className="w-5 h-5" />}
              iconPosition="right"
            >
              다음
            </Button>
          </div>
        </div>

        {/* 추가 정보 섹션 */}
        <div className="mt-16">
          <div className="bg-gradient-to-br from-gray-800/80 to-gray-700/80 backdrop-blur-md rounded-2xl p-8 border border-gray-600/50 shadow-xl">
            <h3 className="text-heading-4 font-semibold text-gray-100 mb-4 text-center">
              함께 성장하는 개발자
            </h3>
            <p className="text-body-1 text-gray-300 leading-relaxed mb-6 max-w-3xl mx-auto text-center">
              개발은 혼자 하는 것이 아니라고 생각합니다. 커뮤니티와 함께
              성장하며, 배운 것을 나누고, 새로운 도전을 통해 더 나은 개발자가
              되기 위해 노력하고 있습니다.
            </p>
            <div className="text-center">
              <Button
                variant="primary"
                size="lg"
                className="bg-gray-100 hover:bg-white text-black shadow-lg border-0"
              >
                더 많은 활동 보기
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Activities;
