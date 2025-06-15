import { useEffect, useRef, useCallback, memo } from "react";
import { gsap } from "gsap";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Button from "./Button";
import {
  createHeroTimeline,
  createScrollIndicatorAnimation,
} from "../utils/animations";

const Hero = memo(() => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  // 스크롤 함수 최적화
  const scrollToNext = useCallback(() => {
    const nextSection = document.getElementById("about");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const scrollToProjects = useCallback(() => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const scrollToAbout = useCallback(() => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 히어로 타임라인 애니메이션 적용
      createHeroTimeline({
        title: titleRef.current,
        subtitle: subtitleRef.current,
        description: descriptionRef.current,
        scrollIndicator: scrollIndicatorRef.current,
      });

      // 스크롤 인디케이터 애니메이션
      createScrollIndicatorAnimation(scrollIndicatorRef.current);
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-gray-900 to-gray-800"
    >
      {/* 배경 그라데이션 오버레이 */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/60 via-gray-800/40 to-gray-700/50" />

      {/* 배경 패턴 */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-gray-600 to-gray-500 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-gray-500 to-gray-400 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-gray-400 to-gray-300 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* 메인 타이틀 */}
        <div ref={titleRef} className="mb-6">
          <h1 className="text-display-1 md:text-[5rem] lg:text-[6rem] font-bold text-gray-100 leading-none tracking-tight">
            안녕하세요,
            <br />
            <span className="bg-gradient-to-r from-gray-300 via-gray-200 to-gray-100 bg-clip-text text-transparent">
              Frontend Developer
            </span>{" "}
            <br />
            유준호입니다
          </h1>
        </div>

        {/* 서브타이틀 */}
        <div ref={subtitleRef} className="mb-8">
          <p className="text-heading-4 md:text-heading-3 text-gray-400 font-medium">
            끊임없이 개선하는
            <br className="hidden sm:block" />
            <span className="text-transparent bg-gradient-to-r from-gray-300 to-gray-200 bg-clip-text">
              프론트엔드 개발자
            </span>
          </p>
        </div>

        {/* 설명 */}
        <div ref={descriptionRef} className="mb-16">
          <p className="text-body-1 md:text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed">
            지속적인 성능 개선을 통해 프로젝트의 발전을 추구하고 있습니다.
            <br />
            팀의 역량 향상을 중요한 가치로 두고 있습니다.
          </p>
        </div>

        {/* CTA 버튼들 */}
        <div
          ref={descriptionRef}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20"
        >
          <Button
            variant="primary"
            size="lg"
            onClick={scrollToProjects}
            className="bg-gray-100 hover:bg-white text-black shadow-xl border-0 font-semibold"
          >
            프로젝트 보기
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={scrollToAbout}
            className="border-gray-600 text-gray-300 hover:border-gray-400 hover:text-gray-100 hover:bg-gray-800/50"
          >
            더 알아보기
          </Button>
        </div>
      </div>

      {/* 스크롤 인디케이터 */}
      <div
        ref={scrollIndicatorRef}
        onClick={scrollToNext}
        className="absolute z-10 bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer group"
      >
        <div className="flex flex-col items-center space-y-2">
          <span className="text-gray-500 text-sm font-medium group-hover:text-gray-300 transition-colors duration-300">
            스크롤
          </span>
          <div className="w-6 h-10 border-2 border-gray-600 group-hover:border-gray-400 rounded-full flex justify-center transition-colors duration-300">
            <div className="w-1 h-3 bg-gray-600 group-hover:bg-gray-400 rounded-full mt-2 animate-float transition-colors duration-300" />
          </div>
          <ChevronDownIcon className="w-5 h-5 text-gray-600 group-hover:text-gray-400 transition-colors duration-300" />
        </div>
      </div>

      {/* 하단 그라데이션 */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 to-transparent" />
    </section>
  );
});

export default Hero;
