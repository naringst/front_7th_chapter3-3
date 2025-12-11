import { PostFilters } from "./schema"

/**
 * PostFilters 객체를 URLSearchParams로 변환
 * undefined나 null 값은 제외
 */
export const buildSearchParams = (filters: PostFilters) => {
  const params = new URLSearchParams()

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      // sortBy가 "none"인 경우 제외
      if (key === "sortBy" && value === "none") {
        return
      }
      // skip이 0인 경우 제외
      if (key === "skip" && value === 0) {
        return
      }
      // limit이 기본값(10)인 경우 제외
      if (key === "limit" && value === 10) {
        return
      }
      // sortOrder가 기본값(asc)인 경우 제외
      if (key === "sortOrder" && value === "asc") {
        return
      }
      params.set(key, String(value))
    }
  })

  return params
}

