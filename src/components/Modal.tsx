import { useEffect, useCallback, memo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  XMarkIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import Button from "./Button";

interface HierarchicalAchievement {
  title: string;
  description?: string;
  metrics?: string;
  subItems?: HierarchicalAchievement[];
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  detailDescription: string;
  period?: string;
  status?: "progress" | "completed";
  achievements?: string[];
  hierarchicalAchievements?: HierarchicalAchievement[];
  company?: string;
  tags: string[];
  link?: string;
}

// 계층적 성과를 트리 형태로 렌더링하는 컴포넌트
const AchievementTree = memo(
  ({ items }: { items: HierarchicalAchievement[] }) => {
    const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

    const toggleExpanded = (itemId: string) => {
      const newExpanded = new Set(expandedItems);
      if (newExpanded.has(itemId)) {
        newExpanded.delete(itemId);
      } else {
        newExpanded.add(itemId);
      }
      setExpandedItems(newExpanded);
    };

    const renderAchievementItem = (
      item: HierarchicalAchievement,
      depth: number = 0,
      index: number = 0
    ) => {
      const itemId = `${depth}-${index}`;
      const hasSubItems = item.subItems && item.subItems.length > 0;
      const isExpanded = expandedItems.has(itemId);

      // 깊이별 들여쓰기 클래스 정의
      const getIndentClass = (depth: number) => {
        switch (depth) {
          case 0:
            return "";
          case 1:
            return "ml-4";
          case 2:
            return "ml-8";
          default:
            return "ml-8";
        }
      };

      return (
        <div key={itemId} className={getIndentClass(depth)}>
          <div
            className={`flex items-start gap-3 p-3 sm:p-4 rounded-lg border transition-all duration-200 ${
              depth === 0
                ? "bg-gradient-to-r from-gray-800/60 to-gray-800/40 border-gray-600/60 hover:border-gray-500/60"
                : "bg-gray-800/30 border-gray-700/50 hover:border-gray-600/50"
            }`}
          >
            {/* 아이콘/확장 버튼 */}
            <div className="flex-shrink-0 mt-1">
              {hasSubItems ? (
                <button
                  onClick={() => toggleExpanded(itemId)}
                  className="w-5 h-5 flex items-center justify-center rounded hover:bg-gray-700/50 transition-colors"
                >
                  {isExpanded ? (
                    <ChevronDownIcon className="w-4 h-4 text-blue-400" />
                  ) : (
                    <ChevronRightIcon className="w-4 h-4 text-blue-400" />
                  )}
                </button>
              ) : (
                <div
                  className={`w-2 h-2 rounded-full mt-1.5 ${
                    depth === 0
                      ? "bg-blue-400"
                      : depth === 1
                      ? "bg-green-400"
                      : "bg-yellow-400"
                  }`}
                ></div>
              )}
            </div>

            {/* 콘텐츠 */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                <div className="flex-1">
                  <h4
                    className={`font-semibold text-gray-100 mb-1 ${
                      depth === 0 ? "text-base" : "text-sm"
                    }`}
                  >
                    {item.title}
                  </h4>
                  {item.description && (
                    <p className="text-sm text-gray-300 leading-relaxed mb-2">
                      {item.description}
                    </p>
                  )}
                </div>
                {item.metrics && (
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                      {item.metrics}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 하위 항목들 */}
          <AnimatePresence>
            {hasSubItems && isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-3 space-y-2 overflow-hidden"
              >
                {item.subItems!.map((subItem, subIndex) =>
                  renderAchievementItem(subItem, depth + 1, subIndex)
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    };

    return (
      <div className="space-y-3">
        {items.map((item, index) => renderAchievementItem(item, 0, index))}
      </div>
    );
  }
);

const Modal = memo(
  ({
    isOpen,
    onClose,
    title,
    description,
    detailDescription,
    period,
    status,
    achievements,
    hierarchicalAchievements,
    company,
    tags,
  }: ModalProps) => {
    // ESC 키로 모달 닫기 - useCallback으로 최적화
    const handleEsc = useCallback(
      (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
        }
      },
      [onClose]
    );

    useEffect(() => {
      if (isOpen) {
        document.addEventListener("keydown", handleEsc);
        document.body.style.overflow = "hidden";
      }

      return () => {
        document.removeEventListener("keydown", handleEsc);
        document.body.style.overflow = "unset";
      };
    }, [isOpen, handleEsc]);

    return (
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
            {/* 배경 오버레이 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={onClose}
            />

            {/* 모달 콘텐츠 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{
                duration: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="relative w-full max-w-5xl max-h-[95vh] sm:max-h-[90vh] bg-gray-900 rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden border border-gray-700"
              onClick={(e) => e.stopPropagation()}
            >
              {/* 헤더 */}
              <div className="relative bg-gradient-to-r from-gray-800 to-gray-700 p-4 sm:p-6 border-b border-gray-600">
                {/* 닫기 버튼 */}
                <button
                  onClick={onClose}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 bg-gray-700/50 hover:bg-gray-600/70 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 border border-gray-600/50"
                >
                  <XMarkIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300" />
                </button>

                {/* 프로젝트 메타 정보 */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4 pr-10 sm:pr-12">
                  {company && (
                    <span className="text-xs sm:text-sm font-medium text-gray-300 bg-gray-700/60 px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg">
                      {company}
                    </span>
                  )}
                  {status && (
                    <span
                      className={`text-xs sm:text-sm font-medium px-2 py-1 sm:px-3 sm:py-1.5 rounded-full ${
                        status === "progress"
                          ? "bg-blue-500/20 text-blue-300 border border-blue-400/30"
                          : "bg-green-500/20 text-green-300 border border-green-400/30"
                      }`}
                    >
                      {status === "progress" ? "진행중" : "완료"}
                    </span>
                  )}
                  {period && (
                    <span className="text-xs sm:text-sm text-gray-400 bg-gray-700/40 px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg border border-gray-600/50">
                      {period}
                    </span>
                  )}
                </div>

                {/* 타이틀과 설명 */}
                <div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-100 mb-2 sm:mb-3">
                    {title}
                  </h2>
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>

              {/* 콘텐츠 */}
              <div className="p-4 sm:p-6 max-h-[65vh] sm:max-h-[60vh] overflow-y-auto">
                {/* 계층적 주요 성과 */}
                {hierarchicalAchievements &&
                  hierarchicalAchievements.length > 0 && (
                    <div className="mb-6 sm:mb-8">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-100 mb-4 sm:mb-6 flex items-center">
                        <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                        주요 성과
                      </h3>
                      <AchievementTree items={hierarchicalAchievements} />
                    </div>
                  )}

                {/* 기존 평면적 성과 (fallback) */}
                {!hierarchicalAchievements &&
                  achievements &&
                  achievements.length > 0 && (
                    <div className="mb-6 sm:mb-8">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-100 mb-3 sm:mb-4 flex items-center">
                        <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                        주요 성과
                      </h3>
                      <div className="grid grid-cols-1 gap-3">
                        {achievements.map((achievement, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-3 p-3 sm:p-4 bg-gray-800/50 rounded-lg border border-gray-700/50"
                          >
                            <div className="w-2 h-2 bg-green-400 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                            <span className="text-sm text-gray-300 leading-relaxed">
                              {achievement}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                {/* 상세 설명 */}
                <div className="mb-6 sm:mb-8">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-100 mb-3 sm:mb-4 flex items-center">
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                    프로젝트 상세
                  </h3>
                  <div className="bg-gray-800/30 rounded-lg p-4 sm:p-6 border border-gray-700/50">
                    <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">
                      {detailDescription}
                    </p>
                  </div>
                </div>

                {/* 기술 스택 */}
                <div className="mb-4 sm:mb-6">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-100 mb-3 sm:mb-4 flex items-center">
                    <span className="w-2 h-2 bg-orange-400 rounded-full mr-3"></span>
                    사용 기술
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1.5 sm:px-3 sm:py-2 bg-gray-800 text-gray-200 text-xs sm:text-sm font-medium rounded-lg border border-gray-600 hover:bg-gray-700 transition-colors duration-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* 푸터 */}
              <div className="p-4 sm:p-6 bg-gray-800/50 border-t border-gray-700">
                <div className="flex justify-end">
                  <Button variant="outline" size="lg" onClick={onClose}>
                    닫기
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    );
  }
);

export default Modal;
