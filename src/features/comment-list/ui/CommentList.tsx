import { useEffect } from "react"
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Textarea } from "../../../shared/ui"
import { useCommentList } from "../model/useCommentList"
import { CommentListView } from "./CommentListView"
import { Comment } from "../../../entities/comment/model/commentTypes"

interface CommentListProps {
  postId: number | undefined
  searchQuery?: string
}

/**
 * 댓글 목록 기능 컴포넌트
 * feature에서 entities를 조합하여 사용자 기능을 제공
 */
export const CommentList = ({ postId, searchQuery = "" }: CommentListProps) => {
  const {
    comments,
    fetchComments,
    onAddComment,
    onLikeComment,
    onEditComment,
    onDeleteComment,
    showAddCommentDialog,
    showEditCommentDialog,
    setShowAddCommentDialog,
    setShowEditCommentDialog,
    addComment,
    updateComment,
    newComment,
    setNewComment,
    selectedComment,
    setSelectedComment,
  } = useCommentList(postId)

  useEffect(() => {
    if (postId) {
      fetchComments()
    }
  }, [postId, fetchComments])

  return (
    <>
      <CommentListView
        postId={postId!}
        comments={comments}
        searchQuery={searchQuery}
        onAddComment={onAddComment}
        onLikeComment={onLikeComment}
        onEditComment={onEditComment}
        onDeleteComment={onDeleteComment}
      />

      {/* 댓글 추가 대화상자 */}
      <Dialog open={showAddCommentDialog} onOpenChange={setShowAddCommentDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>새 댓글 추가</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="댓글 내용"
              value={newComment.body}
              onChange={(e) => setNewComment({ ...newComment, body: e.target.value })}
            />
            <Button onClick={addComment}>댓글 추가</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 댓글 수정 대화상자 */}
      <Dialog open={showEditCommentDialog} onOpenChange={setShowEditCommentDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>댓글 수정</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="댓글 내용"
              value={selectedComment?.body || ""}
              onChange={(e) => setSelectedComment({ ...selectedComment, body: e.target.value } as Comment)}
            />
            <Button onClick={updateComment}>댓글 업데이트</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
