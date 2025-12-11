import { useState } from "react"
import { usePost } from "../../../entities/post/model/usePost"
import { usePostFilters } from "../../post-filters/model/usePostFilters"

export const usePostList = () => {
  const { q, skip, limit, sortBy, sortOrder, tag, setQ, setSkip, setLimit, setSortBy, setSortOrder, setTag } =
    usePostFilters()

  // 검색어는 로컬 state로 관리, 검색 버튼 클릭 시에만 실제 검색 실행
  const [searchQuery, setSearchQuery] = useState("")

  const { loading, posts, total, addPostToList, updatePostInList, removePostFromList } = usePost({
    limit,
    skip,
    tag: tag || undefined,
    searchQuery: searchQuery || undefined,
  })

  // 검색 실행
  const searchPosts = (params: { q: string }) => {
    setSearchQuery(params.q)
    if (params.q) {
      setQ(params.q) // URL에도 반영
    }
  }

  return {
    // 필터 상태
    q,
    skip,
    limit,
    sortBy,
    sortOrder,
    tag,
    setQ,
    setSkip,
    setLimit,
    setSortBy,
    setSortOrder,
    setTag,

    // 포스트 데이터
    loading,
    posts,
    total,
    searchPosts,
    addPostToList,
    updatePostInList,
    removePostFromList,
  }
}
