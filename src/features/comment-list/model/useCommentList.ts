import { useState } from "react"
import { useComment } from "../../../entities/comment/model/useComment"
import type { Comment } from "../../../entities/comment/model/commentTypes"

/**
 * 댓글 목록 관리 기능
 * entities/comment의 useComment를 사용하여 댓글 목록 관련 로직을 조합
 */
export const useCommentList = (postId: number | undefined) => {
  const { comments, newComment, setNewComment, fetchComments, addComment, updateComment, deleteComment, likeComment } =
    useComment(postId)

  // UI 상태는 feature에서 관리
  const [showAddCommentDialog, setShowAddCommentDialog] = useState(false)
  const [showEditCommentDialog, setShowEditCommentDialog] = useState(false)
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null)

  const handleAddComment = () => {
    if (!postId) return
    setNewComment((prev) => ({ ...prev, postId }))
    setShowAddCommentDialog(true)
  }

  const handleEditComment = (comment: Comment) => {
    setSelectedComment(comment)
    setShowEditCommentDialog(true)
  }

  const handleUpdateComment = async () => {
    if (!selectedComment) return
    await updateComment(selectedComment)
    setSelectedComment(null)
    setShowEditCommentDialog(false)
  }

  const handleAddCommentSubmit = async () => {
    await addComment()
    setShowAddCommentDialog(false)
  }

  const handleLikeComment = (id: number, pId: number) => {
    likeComment(id, pId)
  }

  const handleDeleteComment = (id: number, pId: number) => {
    deleteComment(id, pId)
  }

  return {
    comments,
    fetchComments,
    onAddComment: handleAddComment,
    onLikeComment: handleLikeComment,
    onEditComment: handleEditComment,
    onDeleteComment: handleDeleteComment,
    // Dialog 관련
    showAddCommentDialog,
    showEditCommentDialog,
    setShowAddCommentDialog,
    setShowEditCommentDialog,
    addComment: handleAddCommentSubmit,
    updateComment: handleUpdateComment,
    newComment,
    setNewComment,
    selectedComment,
    setSelectedComment,
  }
}
