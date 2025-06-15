import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  AcademicCapIcon,
  TrophyIcon,
  DocumentCheckIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";
import Button from "./Button";

gsap.registerPlugin(ScrollTrigger);

interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  type: "certificate" | "award" | "completion";
  description: string;
  credentialId?: string;
  verificationUrl?: string;
}

const Certificates = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const certificates: Certificate[] = [
    {
      id: 1,
      title: "AWS Certified Developer - Associate",
      issuer: "Amazon Web Services",
      date: "2023.08",
      type: "certificate",
      description:
        "AWS 클라우드 서비스를 활용한 애플리케이션 개발 및 배포 전문성 인증",
      credentialId: "AWS-DEV-2023-001",
      verificationUrl: "https://aws.amazon.com/verification",
    },
    {
      id: 2,
      title: "Google Analytics Individual Qualification",
      issuer: "Google",
      date: "2023.06",
      type: "certificate",
      description: "Google Analytics를 활용한 웹 분석 및 데이터 해석 능력 인증",
      credentialId: "GA-IQ-2023-002",
      verificationUrl: "https://skillshop.exceedlms.com/student/award",
    },
    {
      id: 3,
      title: "해커톤 대상 수상",
      issuer: "한국정보화진흥원",
      date: "2023.04",
      type: "award",
      description:
        "AI 기반 웹 서비스 개발 해커톤에서 혁신적인 아이디어와 구현으로 대상 수상",
    },
    {
      id: 4,
      title: "React 전문가 과정 수료",
      issuer: "패스트캠퍼스",
      date: "2022.12",
      type: "completion",
      description: "React 생태계 전반에 대한 심화 학습 및 실무 프로젝트 완성",
      credentialId: "FC-REACT-2022-003",
    },
    {
      id: 5,
      title: "정보처리기사",
      issuer: "한국산업인력공단",
      date: "2022.08",
      type: "certificate",
      description: "정보시스템 개발 및 관리에 대한 전문 지식과 실무 능력 인증",
      credentialId: "22202030123",
    },
    {
      id: 6,
      title: "오픈소스 기여상",
      issuer: "GitHub",
      date: "2023.10",
      type: "award",
      description: "오픈소스 프로젝트에 지속적인 기여와 커뮤니티 활동으로 수상",
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
    awards: certificates.filter((cert) => cert.type === "award").length,
    completions: certificates.filter((cert) => cert.type === "completion")
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-xl border border-gray-700 hover:shadow-2xl transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-600 to-gray-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <DocumentCheckIcon className="w-8 h-8 text-gray-100" />
            </div>
            <h3 className="text-heading-4 font-bold text-gray-100 mb-2">
              {stats.certificates}
            </h3>
            <p className="text-body-2 text-gray-400">자격증</p>
          </div>

          <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-xl border border-gray-700 hover:shadow-2xl transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-500 to-gray-400 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <TrophyIcon className="w-8 h-8 text-gray-100" />
            </div>
            <h3 className="text-heading-4 font-bold text-gray-100 mb-2">
              {stats.awards}
            </h3>
            <p className="text-body-2 text-gray-400">수상</p>
          </div>

          <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-xl border border-gray-700 hover:shadow-2xl transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-500 to-gray-400 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <AcademicCapIcon className="w-8 h-8 text-gray-100" />
            </div>
            <h3 className="text-heading-4 font-bold text-gray-100 mb-2">
              {stats.completions}
            </h3>
            <p className="text-body-2 text-gray-400">수료증</p>
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
                  <p className="text-body-2 text-gray-600 leading-relaxed line-clamp-3">
                    {certificate.description}
                  </p>
                </div>

                {/* 자격증 번호 */}
                {certificate.credentialId && (
                  <div className="mb-4 p-3 bg-gray-700 rounded-xl border border-gray-600">
                    <p className="text-caption text-gray-400 mb-1">
                      자격증 번호
                    </p>
                    <p className="text-body-2 font-mono text-gray-100">
                      {certificate.credentialId}
                    </p>
                  </div>
                )}

                {/* 검증 링크 */}
                {certificate.verificationUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      window.open(certificate.verificationUrl, "_blank")
                    }
                    icon={<ArrowTopRightOnSquareIcon className="w-4 h-4" />}
                    iconPosition="right"
                    fullWidth
                    className="text-gray-400 border-gray-600 hover:border-gray-500 hover:bg-gray-700"
                  >
                    검증하기
                  </Button>
                )}
              </div>
            );
          })}
        </div>

        {/* 추가 정보 섹션 */}
        <div className="text-center">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 text-gray-100 shadow-2xl">
            <h3 className="text-heading-4 font-semibold mb-4">
              지속적인 성장과 학습
            </h3>
            <p className="text-body-1 opacity-90 leading-relaxed mb-6 max-w-3xl mx-auto">
              기술의 빠른 변화에 발맞춰 지속적으로 학습하고 성장하고 있습니다.
              새로운 기술과 방법론을 익히며, 전문성을 높이기 위해 노력하고
              있습니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="secondary"
                size="lg"
                className="bg-gray-800 text-gray-100 hover:bg-gray-700 border-none shadow-lg"
              >
                전체 이력서 보기
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-gray-700/30 text-gray-100 hover:bg-gray-600/10 hover:border-gray-600/50"
              >
                LinkedIn 프로필
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certificates;
