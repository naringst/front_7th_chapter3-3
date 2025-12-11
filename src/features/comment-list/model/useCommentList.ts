import { useState } from "react"
import { useComment } from "../../../entities/comment/model/useComment"
import type { Comment, NewComment } from "../../../entities/comment/model/commentTypes"
import {
  useAddCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
  useLikeCommentMutation,
} from "../api/commentMutations"

/**
 * 댓글 목록 관리 기능
 * entities/comment의 useComment를 사용하여 댓글 조회
 * mutations는 features layer에서 직접 처리
 */
export const useCommentList = (postId: number | undefined) => {
  const { comments, fetchComments } = useComment(postId)

  // newComment 상태는 features에서 관리
  const [newComment, setNewComment] = useState<NewComment>({ body: "", postId: null, userId: 1 })

  // UI 상태는 feature에서 관리
  const [showAddCommentDialog, setShowAddCommentDialog] = useState(false)
  const [showEditCommentDialog, setShowEditCommentDialog] = useState(false)
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null)

  // Mutations
  const addCommentMutation = useAddCommentMutation(() => {
    setNewComment({ body: "", postId: null, userId: 1 })
  })
  const updateCommentMutation = useUpdateCommentMutation()
  const deleteCommentMutation = useDeleteCommentMutation()
  const likeCommentMutation = useLikeCommentMutation()

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
    await updateCommentMutation.mutateAsync(selectedComment)
    setSelectedComment(null)
    setShowEditCommentDialog(false)
  }

  const handleAddCommentSubmit = async () => {
    await addCommentMutation.mutateAsync(newComment)
    setShowAddCommentDialog(false)
  }

  const handleLikeComment = (id: number, pId: number) => {
    const comment = comments.find((c) => c.id === id)
    if (!comment) return
    likeCommentMutation.mutate({ id, updatedComment: comment, postId: pId })
  }

  const handleDeleteComment = (id: number, pId: number) => {
    deleteCommentMutation.mutate({ id, postId: pId })
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
