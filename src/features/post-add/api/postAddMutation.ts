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

      // 모든 posts 관련 쿼리 스냅샷
      const previousPosts = queryClient.getQueriesData<PostsData>({ queryKey: postKeys.all })

      // 낙관적 업데이트 - 모든 posts 관련 쿼리에 적용
      queryClient.setQueriesData<PostsData>({ queryKey: postKeys.all }, (old) => {
        if (!old) return old
        const optimisticPost: Post = {
          id: Date.now(), // 임시 ID
          title: newPost.title,
          body: newPost.body,
          userId: newPost.userId,
          tags: [],
          reactions: { likes: 0, dislikes: 0 },
          author: {
            id: newPost.userId,
            username: "나",
            image: "",
          },
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
    onSuccess: (data, newPost) => {
      // 서버 응답으로 임시 ID를 실제 ID로 교체
      queryClient.setQueriesData<PostsData>({ queryKey: postKeys.all }, (old) => {
        if (!old) return old
        return {
          ...old,
          posts: old.posts.map((post) =>
            post.title === newPost.title && post.body === newPost.body ? { ...post, id: data.id } : post
          ),
        }
      })
      options?.onSuccess?.(data)
    },
    // dummyjson은 실제 저장하지 않으므로 invalidate하지 않음
  })
}
