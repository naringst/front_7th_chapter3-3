import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addPostAPI } from "../../../entities/post/api/addPostAPI"
import { postKeys } from "../../../entities/post/api/postKeys"
import { NewPost, Post } from "../../../entities/post/model/postTypes"

interface PostsData {
  posts: Post[]
  total: number
}

export const useAddPostMutation = (options?: { onSuccess?: (data: Post) => void }) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (newPost: NewPost) => addPostAPI({ newPost }),
    onMutate: async (newPost) => {
      // 진행 중인 쿼리 취소
      await queryClient.cancelQueries({ queryKey: postKeys.all })

      // 이전 데이터 스냅샷
      const previousPosts = queryClient.getQueriesData<PostsData>({ queryKey: postKeys.lists() })

      // 낙관적 업데이트
      queryClient.setQueriesData<PostsData>({ queryKey: postKeys.lists() }, (old) => {
        if (!old) return old
        const optimisticPost: Post = {
          id: Date.now(), // 임시 ID
          title: newPost.title,
          body: newPost.body,
          userId: newPost.userId,
          tags: [],
          reactions: { likes: 0, dislikes: 0 },
        }
        return { posts: [optimisticPost, ...old.posts], total: old.total + 1 }
      })

      return { previousPosts }
    },
    onError: (_error, _newPost, context) => {
      // 에러 시 롤백
      if (context?.previousPosts) {
        context.previousPosts.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data)
        })
      }
    },
    onSuccess: (data) => {
      options?.onSuccess?.(data)
    },
    onSettled: () => {
      // 쿼리 무효화하여 서버 데이터와 동기화
      queryClient.invalidateQueries({ queryKey: postKeys.lists() })
    },
  })
}
