// 백엔드URI를 동적으로 가져와서 도메인이 바뀌는 경우를 대비하는 설정 파일

let backendHost;

const hostname = window && window.location && window.location.hostname;

if (hostname === "localhost") {
  backendHost = "http://localhost:8080";
}

export const API_BASE_URL = `${backendHost}`;
