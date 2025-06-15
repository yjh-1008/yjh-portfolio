import { useState, memo } from "react";
import {
  ArrowTopRightOnSquareIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import LazyImage from "./LazyImage";

interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  link?: string;
  onDetail?: () => void;
}

const Card = memo(
  ({ title, description, imageUrl, tags, link, onDetail }: CardProps) => {
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
        className="group h-80 w-full"
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
              {/* 이미지 */}
              <LazyImage
                src={imageUrl}
                alt={title}
                className="h-48 group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

              {/* 콘텐츠 */}
              <div className="p-5">
                <h3 className="text-heading-4 font-bold text-gray-100 mb-2 line-clamp-2">
                  {title}
                </h3>
                <p className="text-body-2 text-gray-400 mb-4 line-clamp-2 leading-relaxed">
                  {description}
                </p>

                {/* 태그들 - 작은 크기, 위아래 패딩 늘리고 좌우 패딩 줄임 */}
                <div className="flex flex-wrap gap-1.5">
                  {tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1.5 bg-gray-800 text-gray-300 text-xs font-medium rounded-lg hover:bg-gray-700 transition-colors duration-200 border border-gray-600"
                    >
                      {tag}
                    </span>
                  ))}
                  {tags.length > 3 && (
                    <span className="px-2 py-1.5 bg-gray-700 text-gray-400 text-xs font-medium rounded-lg border border-gray-600">
                      +{tags.length - 3}
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
            <div className="w-full h-full bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 rounded-2xl shadow-lg p-5 flex flex-col justify-between text-gray-100 relative overflow-hidden border border-gray-600">
              {/* 배경 패턴 */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-600/10 to-transparent" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-gray-500/20 rounded-full blur-2xl -translate-y-8 translate-x-8" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gray-600/10 rounded-full blur-xl translate-y-4 -translate-x-4" />

              <div className="relative z-10">
                <h3 className="text-heading-4 font-bold mb-3 text-gray-100">
                  {title}
                </h3>
                <p className="text-body-2 text-gray-300 leading-relaxed mb-4">
                  {description}
                </p>

                {/* 모든 태그 표시 - 작은 크기, 위아래 패딩 늘리고 좌우 패딩 줄임 */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1.5 bg-gray-600/30 backdrop-blur-sm text-gray-200 text-xs font-medium rounded-lg border border-gray-500/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* 액션 버튼들 */}
              <div className="flex gap-2.5 relative z-10">
                {onDetail && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDetail();
                    }}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-gray-600/40 hover:bg-gray-600/60 backdrop-blur-sm rounded-lg font-medium transition-all duration-200 hover:scale-105 border border-gray-500/40 hover:border-gray-500/60 text-gray-200 hover:text-gray-100"
                  >
                    <EyeIcon className="w-4 h-4" />
                    자세히 보기
                  </button>
                )}
                {link && (
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center justify-center gap-2 px-3 py-2.5 bg-gray-100 text-black hover:bg-white rounded-lg font-medium transition-all duration-200 hover:scale-105 shadow-sm"
                  >
                    <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                    링크
                  </a>
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
