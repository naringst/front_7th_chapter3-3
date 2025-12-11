import { useState } from "react"
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query"
import { commentsByPostQueryOptions } from "../api/commentQueries"
import { commentKeys } from "../../../shared/api/queryKeys"
import { likeCommentAPI } from "../api/likeComment"
import { postComments } from "../api/postComments"
import { deleteCommentAPI } from "../api/deleteComment"
import { putComment } from "../api/putComment"
import { NewComment, Comment } from "./commentTypes"

export const useComment = (postId?: number) => {
  const queryClient = useQueryClient()
  const [newComment, setNewComment] = useState<NewComment>({ body: "", postId: null, userId: 1 })

  // 댓글 조회
  const { data: comments = [], refetch: fetchComments } = useQuery({
    ...commentsByPostQueryOptions(postId || 0),
    enabled: !!postId,
  })

  // 댓글 추가 mutation
  const addCommentMutation = useMutation({
    mutationFn: postComments,
    onSuccess: (data) => {
      queryClient.setQueryData(commentKeys.byPost(data.postId), (old: Comment[] | undefined) => {
        return [...(old || []), data]
      })
      setNewComment({ body: "", postId: null, userId: 1 })
    },
  })

  // 댓글 수정 mutation
  const updateCommentMutation = useMutation({
    mutationFn: putComment,
    onSuccess: (data) => {
      queryClient.setQueryData(commentKeys.byPost(data.postId), (old: Comment[] | undefined) => {
        if (!old) return old
        return old.map((comment) => (comment.id === data.id ? data : comment))
      })
    },
  })

  // 댓글 삭제 mutation
  const deleteCommentMutation = useMutation({
    mutationFn: ({ id }: { id: number; postId: number }) => deleteCommentAPI(id),
    onSuccess: (_, { id, postId: pId }) => {
      queryClient.setQueryData(commentKeys.byPost(pId), (old: Comment[] | undefined) => {
        if (!old) return old
        return old.filter((comment) => comment.id !== id)
      })
    },
  })

  // 댓글 좋아요 mutation
  const likeCommentMutation = useMutation({
    mutationFn: ({ id, updatedComment }: { id: number; updatedComment: Comment; postId: number }) =>
      likeCommentAPI(id, updatedComment),
    onSuccess: (data, { postId: pId }) => {
      queryClient.setQueryData(commentKeys.byPost(pId), (old: Comment[] | undefined) => {
        if (!old) return old
        return old.map((comment) => (comment.id === data.id ? { ...data, likes: comment.likes + 1 } : comment))
      })
    },
  })

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
