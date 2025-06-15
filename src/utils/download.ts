/**
 * 구글 드라이브에서 파일을 다운로드하는 함수
 * @param fileId 구글 드라이브 파일 ID
 * @param fileName 다운로드될 파일명 (선택사항)
 */
export const downloadFromGoogleDrive = (fileName?: string) => {
  const downloadUrl = import.meta.env.VITE_RESUME_URL;

  // 링크 요소 생성
  const link = document.createElement("a");
  link.href = downloadUrl;
  link.target = "_blank";
  if (fileName) {
    link.download = fileName;
  }

  // 다운로드 실행
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * 로컬 파일을 다운로드하는 함수
 * @param filePath public 폴더 내 파일 경로
 * @param fileName 다운로드될 파일명
 */
export const downloadLocalFile = (filePath: string, fileName: string) => {
  const link = document.createElement("a");
  link.href = filePath;
  link.download = fileName;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * 이력서 다운로드 설정
 */
export const RESUME_CONFIG = {
  // 구글 드라이브 파일 ID (실제 ID로 교체 필요)
  googleDriveFileId: import.meta.env.VITE_RESUME_URL,
  fileName: "유준호_이력서.pdf",
  // 로컬 파일 경로 (public 폴더에 파일이 있는 경우)
  localPath: "/resume/유준호_이력서.pdf",
};

/**
 * 이력서 다운로드 함수
 * @param useLocalFile 로컬 파일 사용 여부 (기본값: false, 구글 드라이브 사용)
 */
export const downloadResume = (useLocalFile: boolean = false) => {
  if (useLocalFile) {
    downloadLocalFile(RESUME_CONFIG.localPath, RESUME_CONFIG.fileName);
  } else {
    downloadFromGoogleDrive();
  }
};
