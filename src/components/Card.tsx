import { useState, memo } from "react";
import { EyeIcon } from "@heroicons/react/24/outline";

interface CardProps {
  title: string;
  description: string;
  period?: string;
  status?: "progress" | "completed";
  achievements?: string[];
  company?: string;
  tags: string[];
  link?: string;
  onDetail?: () => void;
}

const Card = memo(
  ({
    title,
    description,
    period,
    status,
    achievements,
    company,
    tags,
    onDetail,
  }: CardProps) => {
    const [isClickFlipped, setIsClickFlipped] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    // 클릭으로 고정된 상태가 아닐 때만 호버 효과 적용
    const shouldFlip = isClickFlipped || (!isClickFlipped && isHovered);

    const handleCardClick = (e: React.MouseEvent) => {
      // 버튼이나 링크 클릭이 아닐 때만 카드 뒤집기
      if ((e.target as HTMLElement).closest("button, a")) {
        return;
      }
      // 클릭 시 토글하고 호버 상태 초기화
      setIsClickFlipped((prev) => !prev);
      setIsHovered(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        // 클릭 시 토글하고 호버 상태 초기화
        setIsClickFlipped((prev) => !prev);
        setIsHovered(false);
      }
    };

    const handleMouseEnter = () => {
      // 클릭으로 고정되지 않은 상태에서만 호버 효과 적용
      if (!isClickFlipped) {
        setIsHovered(true);
      }
    };

    const handleMouseLeave = () => {
      // 항상 호버 상태 해제
      setIsHovered(false);
    };

    return (
      <div
        className="group h-96 sm:h-96 md:h-96 w-full min-h-[400px] sm:min-h-[384px]"
        style={{ perspective: "1000px" }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleCardClick}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-label={`${title} 프로젝트 카드`}
      >
        <div
          className="relative w-full h-full transition-transform duration-700 ease-in-out cursor-pointer"
          style={{
            transformStyle: "preserve-3d",
            transform: shouldFlip ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* 앞면 */}
          <div
            className="absolute inset-0 w-full h-full backface-hidden"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="relative w-full h-full bg-gray-900 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-700 hover:border-gray-600">
              {/* 헤더 섹션 */}
              <div className="p-4 sm:p-5 border-b border-gray-700/50">
                {/* 메타 정보 */}
                <div className="flex items-center justify-between mb-3">
                  {company && (
                    <span className="text-xs font-medium text-gray-400 bg-gray-700/50 px-2 py-1 rounded-md">
                      {company}
                    </span>
                  )}
                  {status && (
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${
                        status === "progress"
                          ? "bg-blue-500/20 text-blue-300 border border-blue-400/30"
                          : "bg-green-500/20 text-green-300 border border-green-400/30"
                      }`}
                    >
                      {status === "progress" ? "진행중" : "완료"}
                    </span>
                  )}
                </div>

                {/* 타이틀 */}
                <h3 className="text-base sm:text-lg font-bold text-gray-100 mb-2 line-clamp-2 leading-tight">
                  {title}
                </h3>

                {/* 설명 */}
                <p className="text-sm text-gray-400 mb-3 line-clamp-2 leading-relaxed">
                  {description}
                </p>

                {/* 기간 */}
                {period && (
                  <div className="text-xs text-gray-500 bg-gray-800/50 px-2 py-1 rounded border border-gray-700/50 inline-block">
                    {period}
                  </div>
                )}
              </div>

              {/* 성과 섹션 */}
              {achievements && achievements.length > 0 && (
                <div className="p-4 sm:p-5 flex-1 min-h-0">
                  <div className="text-xs font-medium text-gray-300 mb-3">
                    주요 성과
                  </div>
                  <div className="space-y-2">
                    {achievements.slice(0, 3).map((achievement, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-2 text-xs text-gray-300"
                      >
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-1.5 flex-shrink-0"></div>
                        <span className="line-clamp-2 leading-relaxed">
                          {achievement}
                        </span>
                      </div>
                    ))}
                    {achievements.length > 3 && (
                      <div className="text-xs text-gray-500 text-center pt-1">
                        +{achievements.length - 3}개 더
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* 태그 섹션 */}
              <div className="p-4 sm:p-5 pt-2">
                <div className="flex flex-wrap gap-1.5">
                  {tags.slice(0, 5).map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-800 text-gray-300 text-xs font-medium rounded border border-gray-600"
                    >
                      {tag}
                    </span>
                  ))}
                  {tags.length > 5 && (
                    <span className="px-2 py-1 bg-gray-700 text-gray-400 text-xs font-medium rounded border border-gray-600">
                      +{tags.length - 5}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 뒷면 */}
          <div
            className="absolute inset-0 w-full h-full backface-hidden"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <div className="w-full h-full bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 rounded-2xl shadow-lg p-4 sm:p-5 flex flex-col justify-between text-gray-100 relative overflow-hidden border border-gray-600">
              {/* 배경 패턴 */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-600/10 to-transparent" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-gray-500/20 rounded-full blur-2xl -translate-y-8 translate-x-8" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gray-600/10 rounded-full blur-xl translate-y-4 -translate-x-4" />

              <div className="relative z-10 flex-1 flex flex-col">
                {/* 타이틀과 설명 */}
                <div className="mb-4">
                  <h3 className="text-base sm:text-lg font-bold mb-2 text-gray-100 line-clamp-2">
                    {title}
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed line-clamp-3">
                    {description}
                  </p>
                </div>

                {/* 모든 태그 표시 */}
                <div className="flex-1 mb-4">
                  <div className="text-xs font-medium text-gray-300 mb-2">
                    기술 스택
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-600/30 backdrop-blur-sm text-gray-200 text-xs font-medium rounded border border-gray-500/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 액션 버튼 */}
                {onDetail && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDetail();
                    }}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2.5 bg-gray-600/40 hover:bg-gray-600/60 backdrop-blur-sm rounded-lg font-medium transition-all duration-200 hover:scale-105 border border-gray-500/40 hover:border-gray-500/60 text-gray-200 hover:text-gray-100"
                  >
                    <EyeIcon className="w-4 h-4" />
                    자세히 보기
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default Card;
