import { queryOptions } from "@tanstack/react-query"
import { commentKeys } from "./commentKeys"
import { Comment } from "../model/commentTypes"
import { API_BASE_URL } from "../../../shared/config/api"

interface CommentsResponse {
  comments: Comment[]
}

export const commentsByPostQueryOptions = (postId: number) =>
  queryOptions({
    queryKey: commentKeys.byPost(postId),
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/comments/post/${postId}`)
      const data: CommentsResponse = await response.json()
      return data.comments
    },
    enabled: !!postId,
  })
