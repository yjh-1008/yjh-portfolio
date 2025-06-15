import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  AcademicCapIcon,
  TrophyIcon,
  DocumentCheckIcon,
} from "@heroicons/react/24/outline";

gsap.registerPlugin(ScrollTrigger);

interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  type: "certificate" | "award" | "completion";
  verificationUrl?: string;
}

const Certificates = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const certificates: Certificate[] = [
    {
      id: 1,
      title: "정보처리기사",
      issuer: "한국정보산업연합회",
      date: "2023.11.15",
      type: "certificate",
    },
    {
      id: 2,
      title: "정보처리기능사",
      issuer: "한국정보산업연합회",
      date: "2019.09.05",
      type: "certificate",
    },
  ];

  const getTypeInfo = (type: Certificate["type"]) => {
    switch (type) {
      case "certificate":
        return {
          icon: DocumentCheckIcon,
          color: "from-gray-600 to-gray-500",
          bgColor: "bg-gray-800",
          textColor: "text-gray-100",
          label: "자격증",
        };
      case "award":
        return {
          icon: TrophyIcon,
          color: "from-gray-500 to-gray-400",
          bgColor: "bg-gray-800",
          textColor: "text-gray-100",
          label: "수상",
        };
      case "completion":
        return {
          icon: AcademicCapIcon,
          color: "from-gray-500 to-gray-400",
          bgColor: "bg-gray-800",
          textColor: "text-gray-100",
          label: "수료증",
        };
    }
  };

  const stats = {
    certificates: certificates.filter((cert) => cert.type === "certificate")
      .length,
  };

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
        ".certificate-card",
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden"
    >
      {/* 배경 패턴 */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-gray-700 to-gray-600 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-gray-600 to-gray-500 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-gray-500 to-gray-400 rounded-full blur-3xl opacity-60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* 섹션 타이틀 */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-heading-2 md:text-heading-1 font-bold text-gray-100 mb-4">
            Certificates & Awards
          </h2>
          <p className="text-body-1 text-gray-400 max-w-2xl mx-auto">
            전문성 향상을 위한 지속적인 학습과 성과
          </p>
        </div>

        {/* 통계 섹션 */}
        <div className="mb-16">
          <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-xl border border-gray-700 hover:shadow-2xl transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-600 to-gray-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <DocumentCheckIcon className="w-8 h-8 text-gray-100" />
            </div>
            <h3 className="text-heading-4 font-bold text-gray-100 mb-2">
              {stats.certificates}
            </h3>
            <p className="text-body-2 text-gray-400">자격증</p>
          </div>
        </div>

        {/* 인증서 그리드 */}
        <div
          ref={gridRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {certificates.map((certificate) => {
            const typeInfo = getTypeInfo(certificate.type);
            return (
              <div
                key={certificate.id}
                className="certificate-card bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-700/20"
              >
                {/* 헤더 */}
                <div className="flex items-start justify-between mb-6">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${typeInfo.color} rounded-2xl flex items-center justify-center shadow-lg`}
                  >
                    <typeInfo.icon className="w-8 h-8 text-gray-100" />
                  </div>
                  <span
                    className={`px-3 py-1 ${typeInfo.bgColor} ${typeInfo.textColor} text-caption font-medium rounded-full border border-current/20`}
                  >
                    {typeInfo.label}
                  </span>
                </div>

                {/* 내용 */}
                <div className="mb-6">
                  <h3 className="text-heading-4 font-semibold text-gray-100 mb-2 line-clamp-2">
                    {certificate.title}
                  </h3>
                  <p className="text-body-2 text-gray-400 font-medium mb-1">
                    {certificate.issuer}
                  </p>
                  <p className="text-caption text-gray-500 mb-4">
                    {certificate.date}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Certificates;
