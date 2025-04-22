import axios from "axios";

/**
 * NOTE: 추후 baseURL을 환경변수로 관리할 예정입니다.
 */

const api = axios.create({
  baseURL: "https://api.github.com/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
