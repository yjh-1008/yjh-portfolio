# 🚀 유준호 포트폴리오

> 현대적인 웹 기술과 창의적인 디자인이 만나는 개인 포트폴리오 웹사이트

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0+-646CFF.svg)](https://vitejs.dev/)

[🌐 **라이브 데모 보기**](https://your-portfolio-url.com)

## ✨ 주요 특징

### 🎨 **디자인 & UX**

- **현대적인 다크 테마** - Toss 디자인 시스템에서 영감을 받은 미니멀한 UI
- **완벽한 반응형** - 모든 디바이스에서 최적화된 사용자 경험
- **부드러운 애니메이션** - GSAP 기반의 고품질 스크롤 애니메이션
- **인터랙티브 요소** - 3D 카드 플립, 호버 효과, 스크롤 기반 애니메이션

### ⚡ **성능 최적화**

- **React.memo** - 컴포넌트 리렌더링 최적화
- **지연 로딩** - 이미지 및 컨텐츠 lazy loading
- **번들 분할** - 벤더 라이브러리 청크 분리로 로딩 속도 향상
- **코드 스플리팅** - 효율적인 리소스 로딩

### 🛠️ **기술적 특징**

- **타입 안전성** - TypeScript로 런타임 오류 방지
- **모던 React** - Hooks와 함수형 컴포넌트 활용
- **접근성** - WCAG 가이드라인 준수
- **SEO 친화적** - 메타 태그 및 구조화된 데이터

## 🛠️ 기술 스택

### **Frontend**

- **React 19** - 사용자 인터페이스 구축
- **TypeScript** - 정적 타입 검사
- **Vite** - 빠른 개발 환경 및 빌드 도구

### **Styling**

- **Tailwind CSS 4** - 유틸리티 퍼스트 CSS 프레임워크
- **PostCSS** - CSS 후처리

### **Animation**

- **GSAP** - 고성능 애니메이션 라이브러리
- **Framer Motion** - React용 모션 라이브러리

### **Icons & Assets**

- **Heroicons** - 아름다운 SVG 아이콘
- **Unsplash** - 고품질 이미지 리소스

### **Development**

- **ESLint** - 코드 품질 검사
- **Prettier** - 코드 포매팅

## 📂 프로젝트 구조

```
src/
├── components/          # 재사용 가능한 컴포넌트
│   ├── Hero.tsx        # 메인 히어로 섹션
│   ├── About.tsx       # 자기소개 섹션
│   ├── Projects.tsx    # 프로젝트 쇼케이스
│   ├── Activities.tsx  # 활동 내역
│   ├── Certificates.tsx # 자격증 및 수상
│   ├── Card.tsx        # 3D 플립 카드 컴포넌트
│   ├── Modal.tsx       # 프로젝트 상세 모달
│   ├── Button.tsx      # 재사용 버튼 컴포넌트
│   └── LazyImage.tsx   # 최적화된 이미지 컴포넌트
├── utils/              # 유틸리티 함수
│   ├── animations.ts   # GSAP 애니메이션 헬퍼
│   └── performance.ts  # 성능 최적화 유틸리티
├── assets/             # 정적 리소스
├── App.tsx            # 메인 앱 컴포넌트
└── main.tsx          # 앱 진입점
```

## 🚀 빠른 시작

### **필수 조건**

- Node.js 18 이상
- npm 또는 yarn

### **설치 및 실행**

```bash
# 저장소 클론
git clone https://github.com/yourusername/my-portfolio.git
cd my-portfolio

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

개발 서버가 실행되면 http://localhost:5173에서 확인할 수 있습니다.

### **빌드 및 배포**

```bash
# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview

# 코드 린팅
npm run lint
```

## 🎯 섹션 구성

### **Hero Section**

- 임팩트 있는 첫인상
- 부드러운 타이포그래피 애니메이션
- CTA 버튼으로 자연스러운 내비게이션

### **About Section**

- 개발자 소개 및 전문 분야
- 기술 스택 및 경험
- 인터랙티브 스킬 카드

### **Projects Section**

- 3D 플립 카드로 프로젝트 소개
- 상세 정보 모달
- 기술 스택 태그

### **Activities Section**

- 개발 관련 활동 내역
- 슬라이더 인터페이스
- 카테고리별 분류

### **Certificates Section**

- 자격증 및 수상 내역
- 검증 가능한 인증 정보
- 타입별 아이콘 구분

## 🎨 커스터마이징

### **색상 테마 변경**

```css
/* tailwind.config.js */
theme: {
  extend: {
    colors: {
      // 커스텀 색상 팔레트
      primary: '#your-color',
      secondary: '#your-color',
    }
  }
}
```

### **애니메이션 커스터마이징**

```typescript
// src/utils/animations.ts
export const ANIMATION_DEFAULTS = {
  duration: 0.8, // 애니메이션 지속 시간
  ease: "power3.out", // 이징 함수
  stagger: 0.1, // 순차 애니메이션 간격
};
```

## 📱 반응형 디자인

- **모바일 퍼스트** 접근 방식
- **Tailwind CSS** 브레이크포인트 활용
- **터치 친화적** 인터랙션

| 디바이스 | 브레이크포인트   | 특징                               |
| -------- | ---------------- | ---------------------------------- |
| Mobile   | `< 640px`        | 세로 레이아웃, 간소화된 네비게이션 |
| Tablet   | `640px - 1024px` | 2열 그리드, 터치 최적화            |
| Desktop  | `> 1024px`       | 3열 그리드, 호버 효과              |

## 🔧 성능 최적화

### **이미지 최적화**

- WebP 포맷 우선 사용
- Lazy loading 구현
- 반응형 이미지 세트

### **코드 최적화**

- Tree shaking으로 불필요한 코드 제거
- Dynamic imports로 코드 스플리팅
- React.memo로 리렌더링 최적화

### **번들 최적화**

- Vite의 번들 분할 기능 활용
- 벤더 라이브러리 별도 청크
- Terser로 JavaScript 압축

## 🚀 배포

### **Vercel (추천)**

```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel
```

### **Netlify**

```bash
# 빌드 명령어: npm run build
# 배포 디렉토리: dist
```

### **GitHub Pages**

```bash
# gh-pages 설치 및 배포
npm install --save-dev gh-pages
npm run build
npx gh-pages -d dist
```

## 🐛 문제 해결

### **자주 발생하는 문제**

**Q: 애니메이션이 작동하지 않아요**

```bash
# GSAP 라이센스 확인 및 재설치
npm uninstall gsap
npm install gsap
```

**Q: 이미지가 로드되지 않아요**

- 이미지 URL 확인
- CORS 정책 검토
- 네트워크 연결 상태 확인

**Q: 빌드 오류가 발생해요**

```bash
# 의존성 재설치
rm -rf node_modules package-lock.json
npm install
```

## 📄 라이센스

이 프로젝트는 [MIT 라이센스](LICENSE) 하에 배포됩니다.

## 🙏 감사의 말

- **Toss** - 디자인 영감
- **Unsplash** - 고품질 이미지 제공
- **React 커뮤니티** - 훌륭한 생태계

## 📞 연락처

- **이메일**: your.email@example.com
- **LinkedIn**: [유준호](https://linkedin.com/in/yourprofile)
- **GitHub**: [@yourusername](https://github.com/yourusername)

---

<div align="center">
  <p>💼 더 나은 디지털 경험을 만들어가는 개발자</p>
  <p>Made with ❤️ by 유준호</p>
</div>
