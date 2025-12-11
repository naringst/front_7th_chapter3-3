import { useEffect } from "react"
import { usePost } from "../../../entities/post/model/usePost"
import { usePostFilters } from "../../post-filters/model/usePostFilters"

export const usePostList = () => {
  const { q, skip, limit, sortBy, sortOrder, tag, setQ, setSkip, setLimit, setSortBy, setSortOrder, setTag } =
    usePostFilters()

  const {
    loading,
    posts,
    total,
    fetchPosts,
    searchPosts,
    fetchPostsByTag,
    addPostToList,
    updatePostInList,
    removePostFromList,
  } = usePost({ limit, skip })

  useEffect(() => {
    if (tag) {
      fetchPostsByTag({ tag })
    } else {
      fetchPosts()
    }
  }, [skip, limit, sortBy, sortOrder, tag])

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
