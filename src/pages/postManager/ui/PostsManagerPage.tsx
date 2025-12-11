import { Plus } from "lucide-react"
import { Button, Card, CardHeader, CardTitle } from "../../../shared/ui"

// Features
import { usePostAdd, PostAddDialog } from "../../../features/post-add"
import { usePostEdit, PostEditDialog } from "../../../features/post-edit"
import { usePostDetail, PostDetailDialog } from "../../../features/post-detail"
import { usePostList } from "../../../features/post-list"
import { useUserDetail, UserDetailDialog } from "../../../features/user-detail"

// Widgets
import { PostListWidget } from "../../../widgets/post-list"

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
  } = usePostList()

  // Features
  const postAdd = usePostAdd()
  const postEdit = usePostEdit()
  const postDetail = usePostDetail()
  const userDetail = useUserDetail()

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

      <PostListWidget
        q={q || ""}
        tag={tag || ""}
        sortBy={sortBy}
        sortOrder={sortOrder}
        skip={skip}
        limit={limit}
        total={total}
        loading={loading}
        posts={posts}
        onQChange={setQ}
        onTagChange={setTag}
        onSortByChange={setSortBy}
        onSortOrderChange={setSortOrder}
        onSkipChange={setSkip}
        onLimitChange={setLimit}
        onSearch={() => searchPosts({ q: q || "" })}
        onPostDetail={postDetail.open}
        onPostEdit={postEdit.open}
        onPostDelete={postEdit.remove}
        onUserClick={(post) => post.author && userDetail.open(post.author)}
      />

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
