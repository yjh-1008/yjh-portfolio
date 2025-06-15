import { useState, useRef, useEffect, memo } from "react";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
}

const LazyImage = memo(
  ({
    src,
    alt,
    className = "",
    placeholder,
    onLoad,
    onError,
  }: LazyImageProps) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        },
        {
          threshold: 0.1,
          rootMargin: "50px",
        }
      );

      if (imgRef.current) {
        observer.observe(imgRef.current);
      }

      return () => observer.disconnect();
    }, []);

    const handleLoad = () => {
      setIsLoaded(true);
      onLoad?.();
    };

    const handleError = () => {
      onError?.();
    };

    return (
      <div className={`relative overflow-hidden ${className}`}>
        {/* 플레이스홀더 */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-gray-800 animate-pulse flex items-center justify-center">
            {placeholder ? (
              <img
                src={placeholder}
                alt=""
                className="w-full h-full object-cover opacity-50"
              />
            ) : (
              <div className="w-12 h-12 bg-gray-700 rounded-lg"></div>
            )}
          </div>
        )}

        {/* 실제 이미지 */}
        <img
          ref={imgRef}
          src={isInView ? src : undefined}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          loading="lazy"
          onLoad={handleLoad}
          onError={handleError}
        />
      </div>
    );
  }
);

LazyImage.displayName = "LazyImage";

export default LazyImage;
