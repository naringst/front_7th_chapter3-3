import { useState } from "react"
import { CardContent } from "../../../shared/ui"
import { Post } from "../../../entities/post/model/postTypes"
import { usePost } from "../../../entities/post/model/usePost"

// Features
import { usePostFilters } from "../../../features/post-filters/model/usePostFilters"
import { PostFiltersBar, Pagination } from "../../../features/post-filters"

// Local
import { PostTable } from "./PostTable"

interface PostListWidgetProps {
  onPostDetail: (post: Post) => void
  onPostEdit: (post: Post) => void
  onPostDelete: (postId: number) => void
  onUserClick: (post: Post) => void
}

export const PostListWidget = ({ onPostDetail, onPostEdit, onPostDelete, onUserClick }: PostListWidgetProps) => {
  const { search, skip, limit, sortBy, sortOrder, tag, setSearch, setSkip, setLimit, setSortBy, setSortOrder, setTag } =
    usePostFilters()
  const { posts, total, isLoading } = usePost({
    limit,
    skip,
    tag: tag || undefined,
    searchQuery: search || undefined,
  })

  // 검색 입력은 로컬 state로 관리, 엔터 시에만 URL에 반영
  const [searchInput, setSearchInput] = useState(search || "")

  const handleSearch = () => {
    setSearch(searchInput)
  }

  return (
    <CardContent>
      <div className="flex flex-col gap-4">
        {/* 검색 및 필터 컨트롤 */}
        <PostFiltersBar
          searchInput={searchInput}
          tag={tag || ""}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSearchInputChange={setSearchInput}
          onTagChange={setTag}
          onSortByChange={setSortBy}
          onSortOrderChange={setSortOrder}
          onSearch={handleSearch}
        />

        {/* 게시물 테이블 */}
        {isLoading ? (
          <div className="flex justify-center p-4">로딩 중...</div>
        ) : (
          <PostTable
            posts={posts}
            searchQuery={search || ""}
            tag={tag || ""}
            onTagChange={setTag}
            onPostDetail={onPostDetail}
            onPostEdit={onPostEdit}
            onPostDelete={onPostDelete}
            onUserClick={onUserClick}
          />
        )}

        {/* 페이지네이션 */}
        <Pagination skip={skip} limit={limit} total={total} onSkipChange={setSkip} onLimitChange={setLimit} />
      </div>
    </CardContent>
  )
}
