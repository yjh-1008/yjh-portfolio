import { useEffect, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  XMarkIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";
import Button from "./Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  detailDescription: string;
  imageUrl: string;
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
    imageUrl,
    tags,
    link,
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

    // 링크 열기 함수 최적화
    const handleLinkClick = useCallback(() => {
      if (link) {
        window.open(link, "_blank");
      }
    }, [link]);

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
              initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.9, rotateY: 15 }}
              transition={{
                duration: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94],
                rotateY: { duration: 0.6 },
              }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-700"
              onClick={(e) => e.stopPropagation()}
            >
              {/* 헤더 */}
              <div className="relative">
                {/* 이미지 */}
                <div className="relative h-64 md:h-80 overflow-hidden">
                  <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* 닫기 버튼 */}
                  <button
                    onClick={onClose}
                    className="absolute top-6 right-6 w-12 h-12 bg-gray-800/50 hover:bg-gray-700/70 backdrop-blur-md rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 border border-gray-600/50"
                  >
                    <XMarkIcon className="w-6 h-6 text-gray-100" />
                  </button>
                </div>

                {/* 타이틀 오버레이 */}
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                  <h2 className="text-heading-2 md:text-heading-1 font-bold text-gray-100 mb-2">
                    {title}
                  </h2>
                  <p className="text-body-1 text-gray-300">{description}</p>
                </div>
              </div>

              {/* 콘텐츠 */}
              <div className="p-8 max-h-96 overflow-y-auto">
                {/* 상세 설명 */}
                <div className="mb-8">
                  <h3 className="text-heading-4 font-semibold text-gray-100 mb-4">
                    프로젝트 상세
                  </h3>
                  <p className="text-body-1 text-gray-300 leading-relaxed whitespace-pre-line">
                    {detailDescription}
                  </p>
                </div>

                {/* 기술 스택 */}
                <div className="mb-8">
                  <h3 className="text-heading-4 font-semibold text-gray-100 mb-4">
                    사용 기술
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-gray-800 text-gray-200 text-body-2 font-medium rounded-xl border border-gray-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 액션 버튼들 */}
                <div className="flex flex-col sm:flex-row gap-4">
                  {link && (
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={handleLinkClick}
                      icon={<ArrowTopRightOnSquareIcon className="w-5 h-5" />}
                      iconPosition="left"
                    >
                      프로젝트 보기
                    </Button>
                  )}
                  <Button variant="outline" size="lg" onClick={onClose}>
                    닫기
                  </Button>
                </div>
              </div>

              {/* 하단 그라데이션 */}
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-900 to-transparent pointer-events-none" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    );
  }
);

export default Modal;
