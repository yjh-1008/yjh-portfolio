import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
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
  tags: string[];
  icon: React.ElementType;
  period: string;
  achievements: string[];
}

const Activities = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const [currentSlide, setCurrentSlide] = useState(0);

  const activities: Activity[] = [
    {
      id: 1,
      title: "빵 예약 서비스 (Bread It Now)",
      description: "Next.js와 Firebase를 활용한 B2C 빵집 예약 서비스 개발",
      tags: ["Next.js", "Zustand", "Vitest", "Tailwind", "Firebase"],
      icon: CubeIcon,
      period: "2025.01 ~ 2025.06",
      achievements: ["소셜 로그인 구현", "FCM 알람 기능", "컴포넌트 최적화"],
    },
    {
      id: 2,
      title: "사이드 프로젝트 모집 사이트 (Wahtpl)",
      description: "Nuxt.js와 TypeScript를 활용한 사이드 프로젝트 모집 플랫폼",
      tags: ["Nuxt.js", "TypeScript", "Pinia", "Tailwind", "OAuth2"],
      icon: AcademicCapIcon,
      period: "2024.01 ~ 2024.10",
      achievements: ["무한 스크롤 구현", "SEO 최적화", "소셜 로그인"],
    },
    {
      id: 3,
      title: "개인 포트폴리오 웹사이트",
      description:
        "React와 TypeScript를 활용한 인터랙티브 포트폴리오 사이트 개발",
      tags: ["React", "TypeScript", "Tailwind", "GSAP", "Vite"],
      icon: TrophyIcon,
      period: "2025.01 - 진행중",
      achievements: ["반응형 디자인", "GSAP 애니메이션", "GitHub Pages 배포"],
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
      className="py-2 bg-gradient-to-br from-black via-gray-900 to-gray-800 relative overflow-hidden"
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
      </div>
    </section>
  );
};

export default Activities;
