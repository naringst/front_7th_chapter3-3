import { useMutation, useQueryClient } from "@tanstack/react-query"
import { commentKeys } from "./commentKeys"
import { likeCommentAPI } from "./likeComment"
import { postComments } from "./postComments"
import { deleteCommentAPI } from "./deleteComment"
import { putComment } from "./putComment"
import { Comment } from "../model/commentTypes"

export const useAddCommentMutation = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: postComments,
    onSuccess: (data) => {
      queryClient.setQueryData(commentKeys.byPost(data.postId), (old: Comment[] | undefined) => {
        return [...(old || []), data]
      })
      onSuccessCallback?.()
    },
  })
}

export const useUpdateCommentMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: putComment,
    onSuccess: (data) => {
      queryClient.setQueryData(commentKeys.byPost(data.postId), (old: Comment[] | undefined) => {
        if (!old) return old
        return old.map((comment) => (comment.id === data.id ? data : comment))
      })
    },
  })
}

export const useDeleteCommentMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id }: { id: number; postId: number }) => deleteCommentAPI(id),
    onSuccess: (_, { id, postId }) => {
      queryClient.setQueryData(commentKeys.byPost(postId), (old: Comment[] | undefined) => {
        if (!old) return old
        return old.filter((comment) => comment.id !== id)
      })
    },
  })
}

export const useLikeCommentMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, updatedComment }: { id: number; updatedComment: Comment; postId: number }) =>
      likeCommentAPI(id, updatedComment),
    onSuccess: (data, { postId }) => {
      queryClient.setQueryData(commentKeys.byPost(postId), (old: Comment[] | undefined) => {
        if (!old) return old
        return old.map((comment) => (comment.id === data.id ? { ...data, likes: comment.likes + 1 } : comment))
      })
    },
  })
}
