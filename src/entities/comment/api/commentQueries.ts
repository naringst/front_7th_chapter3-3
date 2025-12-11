import { queryOptions } from "@tanstack/react-query"
import { commentKeys } from "../../../shared/api/queryKeys"
import { Comment } from "../model/commentTypes"

interface CommentsResponse {
  comments: Comment[]
}

export const commentsByPostQueryOptions = (postId: number) =>
  queryOptions({
    queryKey: commentKeys.byPost(postId),
    queryFn: async () => {
      const response = await fetch(`/api/comments/post/${postId}`)
      const data: CommentsResponse = await response.json()
      return data.comments
    },
    enabled: !!postId,
  })
