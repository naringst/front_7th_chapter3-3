import { Edit2, MessageSquare, Plus, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react"
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../shared/ui"
import { highlightText } from "../../../shared/ui/highlightText"

// Features
import { usePostAdd, PostAddDialog } from "../../../features/post-add"
import { usePostEdit, PostEditDialog } from "../../../features/post-edit"
import { usePostDetail, PostDetailDialog } from "../../../features/post-detail"
import { usePostList } from "../../../features/post-list"
import { useUserDetail, UserDetailDialog } from "../../../features/user-detail"
import { PostFiltersBar, Pagination } from "../../../features/post-filters"

export const PostsManagerPage = () => {
  // Post 목록 (필터 + 데이터)
  const {
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
    loading,
    posts,
    total,
    searchPosts,
    addPostToList,
    updatePostInList,
    removePostFromList,
  } = usePostList()

  // Features
  const postAdd = usePostAdd({ onSuccess: addPostToList })
  const postEdit = usePostEdit({
    onUpdateSuccess: updatePostInList,
    onDeleteSuccess: removePostFromList,
  })
  const postDetail = usePostDetail()
  const userDetail = useUserDetail()

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
                <div>{highlightText(post.title, q || "")}</div>

                <div className="flex flex-wrap gap-1">
                  {post.tags?.map((postTag) => (
                    <span
                      key={postTag}
                      className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
                        tag === postTag
                          ? "text-white bg-blue-500 hover:bg-blue-600"
                          : "text-blue-800 bg-blue-100 hover:bg-blue-200"
                      }`}
                      onClick={() => {
                        setTag(postTag)
                      }}
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
                onClick={() => post.author && userDetail.open(post.author)}
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
                <Button variant="ghost" size="sm" onClick={() => postDetail.open(post)}>
                  <MessageSquare className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => postEdit.open(post)}>
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => postEdit.remove(post.id)}>
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
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <Button onClick={postAdd.open}>
            <Plus className="w-4 h-4 mr-2" />
            게시물 추가
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {/* 검색 및 필터 컨트롤 */}
          <PostFiltersBar
            q={q || ""}
            tag={tag || ""}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onQChange={setQ}
            onTagChange={setTag}
            onSortByChange={setSortBy}
            onSortOrderChange={setSortOrder}
            onSearch={() => searchPosts({ q: q || "" })}
          />

          {/* 게시물 테이블 */}
          {loading ? <div className="flex justify-center p-4">로딩 중...</div> : renderPostTable()}

          {/* 페이지네이션 */}
          <Pagination
            skip={skip}
            limit={limit}
            total={total}
            onSkipChange={setSkip}
            onLimitChange={setLimit}
          />
        </div>
      </CardContent>

      {/* 게시물 추가 대화상자 */}
      <PostAddDialog
        open={postAdd.showDialog}
        onOpenChange={(open) => !open && postAdd.close()}
        newPost={postAdd.newPost}
        onNewPostChange={postAdd.setNewPost}
        onSubmit={postAdd.submit}
      />

      {/* 게시물 수정 대화상자 */}
      <PostEditDialog
        open={postEdit.showDialog}
        onOpenChange={(open) => !open && postEdit.close()}
        post={postEdit.selectedPost}
        onPostChange={postEdit.setSelectedPost}
        onSubmit={postEdit.update}
      />

      {/* 게시물 상세 보기 대화상자 */}
      <PostDetailDialog
        open={postDetail.showDialog}
        onOpenChange={postDetail.setShowDialog}
        post={postDetail.selectedPost}
        searchQuery={q}
      />

      {/* 사용자 상세 보기 대화상자 */}
      <UserDetailDialog
        open={userDetail.showDialog}
        onOpenChange={userDetail.setShowDialog}
        user={userDetail.selectedUser}
      />
    </Card>
  )
}
