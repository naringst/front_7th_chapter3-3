import { useEffect, useState } from "react"
import { Edit2, MessageSquare, Plus, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react"
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../shared/ui"
import { highlightText } from "../../../shared/ui/highlightText"
import { usePost } from "../../../entities/post/model/usePost"
import { User, UserDetail } from "../../../entities/user/model/userTypes"

// Features
import { usePostAdd, PostAddDialog } from "../../../features/post-add"
import { usePostEdit, PostEditDialog } from "../../../features/post-edit"
import { usePostDetail, PostDetailDialog } from "../../../features/post-detail"
import {
  usePostFilters,
  TagSelector,
  SearchInput,
  SortBySelector,
  SortOrderSelector,
  LimitSelector,
} from "../../../features/post-filters"

export const PostsManagerPage = () => {
  // Post 필터 관련 훅 (q, skip, limit, sortBy, sortOrder, tag)
  const { q, skip, limit, sortBy, sortOrder, tag, setQ, setSkip, setLimit, setSortBy, setSortOrder, setTag } =
    usePostFilters()

  // Post 데이터 관리 (entity)
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

  // Features
  const postAdd = usePostAdd({ onSuccess: addPostToList })
  const postEdit = usePostEdit({
    onUpdateSuccess: updatePostInList,
    onDeleteSuccess: removePostFromList,
  })
  const postDetail = usePostDetail()

  // 사용자 모달 상태
  const [showUserModal, setShowUserModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<UserDetail | null>(null)

  // 사용자 모달 열기
  const openUserModal = async (user: User) => {
    try {
      const response = await fetch(`/api/users/${user.id}`)
      const userData = await response.json()
      setSelectedUser(userData)
      setShowUserModal(true)
    } catch (error) {
      console.error("사용자 정보 가져오기 오류:", error)
    }
  }

  useEffect(() => {
    if (tag) {
      fetchPostsByTag({ tag })
    } else {
      fetchPosts()
    }
  }, [skip, limit, sortBy, sortOrder, tag])

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
                onClick={() => post.author && openUserModal(post.author)}
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
          <div className="flex gap-4">
            <SearchInput value={q || ""} onChange={setQ} onSearch={() => searchPosts({ q: q || "" })} />
            <TagSelector value={tag || ""} onChange={setTag} />
            <SortBySelector value={sortBy} onChange={setSortBy} />
            <SortOrderSelector value={sortOrder} onChange={setSortOrder} />
          </div>

          {/* 게시물 테이블 */}
          {loading ? <div className="flex justify-center p-4">로딩 중...</div> : renderPostTable()}

          {/* 페이지네이션 */}
          <div className="flex justify-between items-center">
            <LimitSelector value={limit} onChange={setLimit} />
            <div className="flex gap-2">
              <Button disabled={skip === 0} onClick={() => setSkip(Math.max(0, skip - limit))}>
                이전
              </Button>
              <Button disabled={skip + limit >= total} onClick={() => setSkip(skip + limit)}>
                다음
              </Button>
            </div>
          </div>
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

      {/* 사용자 모달 */}
      <Dialog open={showUserModal} onOpenChange={setShowUserModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>사용자 정보</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <img src={selectedUser?.image} alt={selectedUser?.username} className="w-24 h-24 rounded-full mx-auto" />
            <h3 className="text-xl font-semibold text-center">{selectedUser?.username}</h3>
            <div className="space-y-2">
              <p>
                <strong>이름:</strong> {selectedUser?.firstName} {selectedUser?.lastName}
              </p>
              <p>
                <strong>나이:</strong> {selectedUser?.age}
              </p>
              <p>
                <strong>이메일:</strong> {selectedUser?.email}
              </p>
              <p>
                <strong>전화번호:</strong> {selectedUser?.phone}
              </p>
              <p>
                <strong>주소:</strong> {selectedUser?.address?.address}, {selectedUser?.address?.city},{" "}
                {selectedUser?.address?.state}
              </p>
              <p>
                <strong>직장:</strong> {selectedUser?.company?.name} - {selectedUser?.company?.title}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
