import { CardContent } from "../../../shared/ui"
import { Post } from "../../../entities/post/model/postTypes"

// Features
import { PostFiltersBar, Pagination } from "../../../features/post-filters"

// Local
import { PostTable } from "./PostTable"

interface PostListWidgetProps {
  q: string
  tag: string
  sortBy: "none" | "id" | "title" | "reactions"
  sortOrder: "asc" | "desc"
  skip: number
  limit: number
  total: number
  loading: boolean
  posts: Post[]
  onQChange: (value: string) => void
  onTagChange: (value: string) => void
  onSortByChange: (value: "none" | "id" | "title" | "reactions") => void
  onSortOrderChange: (value: "asc" | "desc") => void
  onSkipChange: (value: number) => void
  onLimitChange: (value: number) => void
  onSearch: () => void
  onPostDetail: (post: Post) => void
  onPostEdit: (post: Post) => void
  onPostDelete: (postId: number) => void
  onUserClick: (post: Post) => void
}

export const PostListWidget = ({
  q,
  tag,
  sortBy,
  sortOrder,
  skip,
  limit,
  total,
  loading,
  posts,
  onQChange,
  onTagChange,
  onSortByChange,
  onSortOrderChange,
  onSkipChange,
  onLimitChange,
  onSearch,
  onPostDetail,
  onPostEdit,
  onPostDelete,
  onUserClick,
}: PostListWidgetProps) => {
  return (
    <CardContent>
      <div className="flex flex-col gap-4">
        {/* 검색 및 필터 컨트롤 */}
        <PostFiltersBar
          q={q}
          tag={tag}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onQChange={onQChange}
          onTagChange={onTagChange}
          onSortByChange={onSortByChange}
          onSortOrderChange={onSortOrderChange}
          onSearch={onSearch}
        />

        {/* 게시물 테이블 */}
        {loading ? (
          <div className="flex justify-center p-4">로딩 중...</div>
        ) : (
          <PostTable
            posts={posts}
            q={q}
            tag={tag}
            onTagChange={onTagChange}
            onPostDetail={onPostDetail}
            onPostEdit={onPostEdit}
            onPostDelete={onPostDelete}
            onUserClick={onUserClick}
          />
        )}

        {/* 페이지네이션 */}
        <Pagination
          skip={skip}
          limit={limit}
          total={total}
          onSkipChange={onSkipChange}
          onLimitChange={onLimitChange}
        />
      </div>
    </CardContent>
  )
}
