import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { commentsByPostQueryOptions } from "../api/commentQueries"
import {
  useAddCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
  useLikeCommentMutation,
} from "../api/commentMutations"
import { NewComment, Comment } from "./commentTypes"

export const useComment = (postId?: number) => {
  const [newComment, setNewComment] = useState<NewComment>({ body: "", postId: null, userId: 1 })

  // 댓글 조회
  const { data: comments = [], refetch: fetchComments } = useQuery({
    ...commentsByPostQueryOptions(postId || 0),
    enabled: !!postId,
  })

  // Mutations
  const addCommentMutation = useAddCommentMutation(() => {
    setNewComment({ body: "", postId: null, userId: 1 })
  })
  const updateCommentMutation = useUpdateCommentMutation()
  const deleteCommentMutation = useDeleteCommentMutation()
  const likeCommentMutation = useLikeCommentMutation()

  const addComment = () => {
    addCommentMutation.mutate(newComment)
  }

  const updateComment = (selectedComment: Comment) => {
    updateCommentMutation.mutate(selectedComment)
  }

  const deleteComment = (id: number, pId: number) => {
    deleteCommentMutation.mutate({ id, postId: pId })
  }

  const likeComment = (id: number, pId: number) => {
    const comment = comments.find((c) => c.id === id)
    if (!comment) return
    const updatedComment = { ...comment, likes: comment.likes + 1 }
    likeCommentMutation.mutate({ id, updatedComment, postId: pId })
  }

  return {
    comments,
    newComment,
    setNewComment,
    fetchComments,
    addComment,
    updateComment,
    deleteComment,
    likeComment,
  }
}
