// 개발 환경에서는 프록시 사용, 프로덕션에서는 직접 API 호출
export const API_BASE_URL = import.meta.env.DEV ? "/api" : "https://dummyjson.com"
