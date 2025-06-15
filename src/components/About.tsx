import { useEffect, useRef, memo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  CodeBracketIcon,
  DevicePhoneMobileIcon,
  GlobeAltIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import Button from "./Button";
import {
  createTitleAnimation,
  createSlideAnimation,
  createCardAnimation,
} from "../utils/animations";

gsap.registerPlugin(ScrollTrigger);

const About = memo(() => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 타이틀 애니메이션
      createTitleAnimation(titleRef.current);

      // 프로필 카드 애니메이션 (좌측에서 슬라이드)
      createSlideAnimation(profileRef.current, "left");

      // 스킬 카드들 애니메이션
      createCardAnimation(".skill-card", cardsRef.current);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const skills = [
    {
      icon: CodeBracketIcon,
      title: "Frontend Development",
      description: "React, TypeScript, Next.js를 활용한 모던 웹 개발",
      technologies: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
      color: "from-emerald-500 to-teal-600",
    },
    {
      icon: DevicePhoneMobileIcon,
      title: "Mobile Experience",
      description: "반응형 디자인과 모바일 최적화된 사용자 경험",
      technologies: ["Responsive Design", "PWA", "Mobile First"],
      color: "from-blue-500 to-indigo-600",
    },
    {
      icon: GlobeAltIcon,
      title: "Web Performance",
      description: "최적화된 성능과 SEO를 고려한 웹 애플리케이션",
      technologies: ["Performance", "SEO", "Accessibility"],
      color: "from-purple-500 to-pink-600",
    },
  ];

  const contacts = [
    {
      icon: EnvelopeIcon,
      label: "이메일",
      value: "yujunho@example.com",
      href: "mailto:yujunho@example.com",
      color: "from-red-500 to-pink-500",
    },
    {
      icon: PhoneIcon,
      label: "전화",
      value: "+82 10-1234-5678",
      href: "tel:+821012345678",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: MapPinIcon,
      label: "위치",
      value: "서울, 대한민국",
      href: "#",
      color: "from-blue-500 to-cyan-500",
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden"
    >
      {/* 배경 패턴 */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-gray-700 to-gray-600 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-gray-600 to-gray-500 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-gray-500 to-gray-400 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* 섹션 타이틀 */}
        <div ref={titleRef} className="text-center mb-20">
          <h2 className="text-heading-2 md:text-heading-1 font-bold text-gray-100 mb-4">
            About Me
          </h2>
          <p className="text-body-1 text-gray-400 max-w-2xl mx-auto">
            사용자 중심의 경험을 만들어가는 개발자입니다
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* 프로필 섹션 */}
          <div ref={profileRef} className="space-y-8">
            {/* 프로필 카드 */}
            <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-700">
              <div className="flex items-start space-x-6">
                <div className="w-24 h-24 bg-gradient-to-br from-gray-600 to-gray-500 rounded-xl flex items-center justify-center text-gray-100 text-2xl font-bold shadow-lg">
                  YJ
                </div>
                <div className="flex-1">
                  <h3 className="text-heading-4 font-bold text-gray-100 mb-2">
                    유준호
                  </h3>
                  <p className="text-body-2 text-gray-300 mb-4 font-medium">
                    Frontend Developer
                  </p>
                  <p className="text-body-2 text-gray-400 leading-relaxed">
                    3년차 프론트엔드 개발자로서 사용자 경험을 최우선으로
                    생각하며, 최신 기술 스택을 활용해 혁신적인 웹 서비스를
                    개발하고 있습니다.
                  </p>
                </div>
              </div>
            </div>

            {/* 연락처 정보 */}
            <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-700">
              <h4 className="text-heading-4 font-semibold text-gray-100 mb-6">
                연락처
              </h4>
              <div className="space-y-4">
                {contacts.map((contact, index) => (
                  <a
                    key={index}
                    href={contact.href}
                    className="flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-700/50 transition-colors duration-200 group"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-500 rounded-lg flex items-center justify-center transition-all duration-200 group-hover:scale-110">
                      <contact.icon className="w-6 h-6 text-gray-100" />
                    </div>
                    <div>
                      <p className="text-caption text-gray-500 font-medium">
                        {contact.label}
                      </p>
                      <p className="text-body-2 text-gray-200 font-medium">
                        {contact.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* 스킬 섹션 */}
          <div ref={cardsRef} className="space-y-6">
            <h4 className="text-heading-4 font-semibold text-gray-100 mb-8">
              전문 분야
            </h4>
            {skills.map((skill, index) => (
              <div
                key={index}
                className="skill-card bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-700"
              >
                <div className="flex items-start space-x-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-600 to-gray-500 rounded-xl flex items-center justify-center shadow-lg">
                    <skill.icon className="w-8 h-8 text-gray-100" />
                  </div>
                  <div className="flex-1">
                    <h5 className="text-heading-4 font-semibold text-gray-100 mb-3">
                      {skill.title}
                    </h5>
                    <p className="text-body-2 text-gray-400 mb-4 leading-relaxed">
                      {skill.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {skill.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-gray-700 text-gray-200 text-caption font-medium rounded-lg border border-gray-600"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* 추가 정보 카드 */}
            <div className="skill-card bg-gradient-to-br from-gray-700 to-gray-600 rounded-2xl p-8 text-gray-100 shadow-xl border border-gray-500">
              <h5 className="text-heading-4 font-semibold mb-4">
                함께 성장하고 싶습니다
              </h5>
              <p className="text-body-2 text-gray-300 leading-relaxed mb-6">
                새로운 기술에 대한 호기심과 지속적인 학습을 통해 더 나은
                개발자가 되기 위해 노력하고 있습니다.
              </p>
              <Button
                variant="secondary"
                size="md"
                className="bg-gray-800/50 hover:bg-gray-800 backdrop-blur-sm text-gray-100 border-gray-500 shadow-lg"
              >
                이력서 다운로드
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default About;
