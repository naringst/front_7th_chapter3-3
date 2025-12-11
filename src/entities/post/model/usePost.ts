import { useQuery, useQueryClient } from "@tanstack/react-query"
import { postsQueryOptions, postsByTagQueryOptions, searchPostsQueryOptions } from "../api/postQueries"
import { postKeys } from "../api/postKeys"
import { Post } from "./postTypes"

/**
 * Post 엔티티의 데이터 레이어 (TanStack Query)
 */
export const usePost = ({ limit, skip, tag, searchQuery }: { limit: number; skip: number; tag?: string; searchQuery?: string }) => {
  const queryClient = useQueryClient()

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

  // 게시물 추가 후 목록 업데이트 (optimistic update)
  const addPostToList = (post: Post) => {
    queryClient.setQueryData(postKeys.list({ limit, skip }), (old: { posts: Post[]; total: number } | undefined) => {
      if (!old) return { posts: [post], total: 1 }
      return { posts: [post, ...old.posts], total: old.total + 1 }
    })
  }

  // 게시물 수정 후 목록 업데이트
  const updatePostInList = (updatedPost: Post) => {
    queryClient.setQueryData(postKeys.list({ limit, skip }), (old: { posts: Post[]; total: number } | undefined) => {
      if (!old) return old
      return {
        ...old,
        posts: old.posts.map((post) => (post.id === updatedPost.id ? updatedPost : post)),
      }
    })
  }

  // 게시물 삭제 후 목록 업데이트
  const removePostFromList = (id: number) => {
    queryClient.setQueryData(postKeys.list({ limit, skip }), (old: { posts: Post[]; total: number } | undefined) => {
      if (!old) return old
      return {
        ...old,
        posts: old.posts.filter((post) => post.id !== id),
        total: old.total - 1,
      }
    })
  }

  return {
    posts: activeQuery.data?.posts || [],
    total: activeQuery.data?.total || 0,
    loading: activeQuery.isLoading,
    addPostToList,
    updatePostInList,
    removePostFromList,
  }
}
