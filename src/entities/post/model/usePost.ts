import { useQuery } from "@tanstack/react-query"
import { postsQueryOptions, postsByTagQueryOptions, searchPostsQueryOptions } from "../api/postQueries"

/**
 * Post 엔티티의 데이터 레이어 (TanStack Query)
 * 조회 전용 hook - mutations는 features layer에서 처리
 */
export const usePost = ({ limit, skip, tag, searchQuery }: { limit: number; skip: number; tag?: string; searchQuery?: string }) => {
  // 기본 posts 쿼리
  const postsQuery = useQuery({
    ...postsQueryOptions({ limit, skip }),
    enabled: !tag && !searchQuery,
  })

  // 태그별 posts 쿼리
  const tagQuery = useQuery({
    ...postsByTagQueryOptions(tag || ""),
    enabled: !!tag && !searchQuery,
  })

  // 검색 쿼리
  const searchQuery_ = useQuery({
    ...searchPostsQueryOptions(searchQuery || ""),
    enabled: !!searchQuery,
  })

  // 현재 활성화된 쿼리 결과 선택
  const activeQuery = searchQuery ? searchQuery_ : tag ? tagQuery : postsQuery

  return {
    posts: activeQuery.data?.posts || [],
    total: activeQuery.data?.total || 0,
    isLoading: activeQuery.isLoading,
  }
}
