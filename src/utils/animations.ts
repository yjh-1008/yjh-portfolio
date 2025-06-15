import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// 공통 애니메이션 설정
export const ANIMATION_DEFAULTS = {
  duration: 0.8,
  ease: "power3.out",
  stagger: 0.1,
} as const;

// 타이틀 페이드인 애니메이션
export const createTitleAnimation = (
  element: HTMLElement | null,
  trigger?: HTMLElement | null
) => {
  if (!element) return;

  return gsap.fromTo(
    element,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: ANIMATION_DEFAULTS.duration,
      ease: ANIMATION_DEFAULTS.ease,
      scrollTrigger: {
        trigger: trigger || element,
        start: "top 80%",
      },
    }
  );
};

// 카드 애니메이션 (stagger 포함)
export const createCardAnimation = (
  selector: string,
  trigger: HTMLElement | null,
  options?: {
    stagger?: number;
    scale?: number;
    x?: number;
    y?: number;
  }
) => {
  const {
    stagger = ANIMATION_DEFAULTS.stagger,
    scale = 0.95,
    x = 0,
    y = 30,
  } = options || {};

  return gsap.fromTo(
    selector,
    { opacity: 0, y, x, scale },
    {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      duration: 0.6,
      ease: ANIMATION_DEFAULTS.ease,
      stagger,
      scrollTrigger: {
        trigger,
        start: "top 80%",
      },
    }
  );
};

// 슬라이드 인 애니메이션 (좌우에서)
export const createSlideAnimation = (
  element: HTMLElement | null,
  direction: "left" | "right" = "left",
  trigger?: HTMLElement | null
) => {
  if (!element) return;

  const x = direction === "left" ? -50 : 50;

  return gsap.fromTo(
    element,
    { opacity: 0, x },
    {
      opacity: 1,
      x: 0,
      duration: ANIMATION_DEFAULTS.duration,
      ease: ANIMATION_DEFAULTS.ease,
      scrollTrigger: {
        trigger: trigger || element,
        start: "top 80%",
      },
    }
  );
};

// 히어로 섹션용 순차 애니메이션
export const createHeroTimeline = (elements: {
  title: HTMLElement | null;
  subtitle: HTMLElement | null;
  description: HTMLElement | null;
  scrollIndicator: HTMLElement | null;
}) => {
  const { title, subtitle, description, scrollIndicator } = elements;
  const tl = gsap.timeline();

  // 초기 상태 설정
  gsap.set([title, subtitle, description, scrollIndicator], {
    opacity: 0,
    y: 30,
  });

  // 순차적 애니메이션
  tl.to(title, {
    opacity: 1,
    y: 0,
    duration: ANIMATION_DEFAULTS.duration,
    ease: ANIMATION_DEFAULTS.ease,
  })
    .to(
      subtitle,
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: ANIMATION_DEFAULTS.ease,
      },
      "-=0.4"
    )
    .to(
      description,
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: ANIMATION_DEFAULTS.ease,
      },
      "-=0.3"
    )
    .to(
      scrollIndicator,
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: ANIMATION_DEFAULTS.ease,
      },
      "-=0.2"
    );

  return tl;
};

// 스크롤 인디케이터 애니메이션
export const createScrollIndicatorAnimation = (element: HTMLElement | null) => {
  if (!element) return;

  return gsap.to(element, {
    y: 10,
    duration: 2,
    ease: "power2.inOut",
    repeat: -1,
    yoyo: true,
  });
};
