import { useQuery } from "@tanstack/react-query"
import { commentsByPostQueryOptions } from "../api/commentQueries"

/**
 * 댓글 조회 전용 hook (entities layer)
 * mutation은 features layer에서 처리
 */
export const useComment = (postId?: number) => {
  const { data: comments = [], refetch: fetchComments } = useQuery({
    ...commentsByPostQueryOptions(postId || 0),
    enabled: !!postId,
  })

  return {
    comments,
    fetchComments,
  }
}
