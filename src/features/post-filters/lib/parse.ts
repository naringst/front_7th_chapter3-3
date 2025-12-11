import { postFiltersSchema } from "./schema"

/**
 * URLSearchParams를 PostFilters 객체로 변환
 */
export const parseFilters = (searchParams: URLSearchParams) => {
  const obj = Object.fromEntries(searchParams.entries())
  return postFiltersSchema.parse(obj)
}

