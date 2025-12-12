import { useSearchParams } from "react-router-dom"
import { parseFilters } from "../lib/parse"
import { buildSearchParams } from "../lib/buildSearchParams"
import type { PostFilters } from "../lib/schema"

/**
 * Post 필터 관련 URL 파라미터를 관리하는 훅
 * URL → 필터 상태 파싱, 타입 변환, default 값 적용, invalid 값 제거를 담당
 */
export function usePostFilters() {
  const [searchParams, setSearchParams] = useSearchParams()
  const filters = parseFilters(searchParams)

  const update = (patch: Partial<PostFilters>) => {
    const next = { ...filters, ...patch }
    setSearchParams(buildSearchParams(next))
  }

  return {
    ...filters,
    setSearch: (search: string) => update({ search }),
    setTag: (tag: string) => update({ tag }),
    setSortBy: (sortBy: "none" | "id" | "title" | "reactions") => update({ sortBy }),
    setSortOrder: (sortOrder: "asc" | "desc") => update({ sortOrder }),
    setSkip: (skip: number) => update({ skip }),
    setLimit: (limit: number) => update({ limit }),
    update,
  }
}
