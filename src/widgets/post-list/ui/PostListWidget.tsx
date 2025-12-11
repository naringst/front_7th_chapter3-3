import { Edit2, MessageSquare, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react"
import {
  Button,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../shared/ui"
import { highlightText } from "../../../shared/ui/highlightText"
import { Post } from "../../../entities/post/model/postTypes"

// Features
import { PostFiltersBar, Pagination } from "../../../features/post-filters"

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
  // 게시물 테이블 렌더링
  const renderPostTable = () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">ID</TableHead>
          <TableHead>제목</TableHead>
          <TableHead className="w-[150px]">작성자</TableHead>
          <TableHead className="w-[150px]">반응</TableHead>
          <TableHead className="w-[150px]">작업</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.map((post) => (
          <TableRow key={post.id}>
            <TableCell>{post.id}</TableCell>
            <TableCell>
              <div className="space-y-1">
                <div>{highlightText(post.title, q)}</div>

                <div className="flex flex-wrap gap-1">
                  {post.tags?.map((postTag) => (
                    <span
                      key={postTag}
                      className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
                        tag === postTag
                          ? "text-white bg-blue-500 hover:bg-blue-600"
                          : "text-blue-800 bg-blue-100 hover:bg-blue-200"
                      }`}
                      onClick={() => onTagChange(postTag)}
                    >
                      {postTag}
                    </span>
                  ))}
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => post.author && onUserClick(post)}
              >
                <img src={post.author?.image} alt={post.author?.username} className="w-8 h-8 rounded-full" />
                <span>{post.author?.username}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <ThumbsUp className="w-4 h-4" />
                <span>{post.reactions?.likes || 0}</span>
                <ThumbsDown className="w-4 h-4" />
                <span>{post.reactions?.dislikes || 0}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => onPostDetail(post)}>
                  <MessageSquare className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => onPostEdit(post)}>
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => onPostDelete(post.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )

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
        {loading ? <div className="flex justify-center p-4">로딩 중...</div> : renderPostTable()}

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
