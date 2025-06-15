import { useEffect, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Button from "./Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  detailDescription: string;
  period?: string;
  status?: "progress" | "completed";
  achievements?: string[];
  company?: string;
  tags: string[];
  link?: string;
}

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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
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
              className="relative w-full max-w-4xl max-h-[90vh] bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-700"
              onClick={(e) => e.stopPropagation()}
            >
              {/* 헤더 */}
              <div className="relative bg-gradient-to-r from-gray-800 to-gray-700 p-6 border-b border-gray-600">
                {/* 닫기 버튼 */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-10 h-10 bg-gray-700/50 hover:bg-gray-600/70 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 border border-gray-600/50"
                >
                  <XMarkIcon className="w-5 h-5 text-gray-300" />
                </button>

                {/* 프로젝트 메타 정보 */}
                <div className="flex flex-wrap items-center gap-3 mb-4 pr-12">
                  {company && (
                    <span className="text-sm font-medium text-gray-300 bg-gray-700/60 px-3 py-1.5 rounded-lg">
                      {company}
                    </span>
                  )}
                  {status && (
                    <span
                      className={`text-sm font-medium px-3 py-1.5 rounded-full ${
                        status === "progress"
                          ? "bg-blue-500/20 text-blue-300 border border-blue-400/30"
                          : "bg-green-500/20 text-green-300 border border-green-400/30"
                      }`}
                    >
                      {status === "progress" ? "진행중" : "완료"}
                    </span>
                  )}
                  {period && (
                    <span className="text-sm text-gray-400 bg-gray-700/40 px-3 py-1.5 rounded-lg border border-gray-600/50">
                      {period}
                    </span>
                  )}
                </div>

                {/* 타이틀과 설명 */}
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-100 mb-3">
                    {title}
                  </h2>
                  <p className="text-base text-gray-300 leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>

              {/* 콘텐츠 */}
              <div className="p-6 max-h-[60vh] overflow-y-auto">
                {/* 주요 성과 */}
                {achievements && achievements.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                      주요 성과
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {achievements.map((achievement, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 p-4 bg-gray-800/50 rounded-lg border border-gray-700/50"
                        >
                          <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm text-gray-300 leading-relaxed">
                            {achievement}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 상세 설명 */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center">
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                    프로젝트 상세
                  </h3>
                  <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700/50">
                    <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">
                      {detailDescription}
                    </p>
                  </div>
                </div>

                {/* 기술 스택 */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center">
                    <span className="w-2 h-2 bg-orange-400 rounded-full mr-3"></span>
                    사용 기술
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-2 bg-gray-800 text-gray-200 text-sm font-medium rounded-lg border border-gray-600 hover:bg-gray-700 transition-colors duration-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* 푸터 */}
              <div className="p-6 bg-gray-800/50 border-t border-gray-700">
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
