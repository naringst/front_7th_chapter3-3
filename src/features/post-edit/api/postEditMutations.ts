import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updatePostAPI } from "../../../entities/post/api/updatePostAPI"
import { deletePostAPI } from "../../../entities/post/api/deletePostAPI"
import { postKeys } from "../../../entities/post/api/postKeys"
import { Post } from "../../../entities/post/model/postTypes"

interface PostsData {
  posts: Post[]
  total: number
}

export const useUpdatePostMutation = (options?: { onSuccess?: (data: Post) => void }) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (selectedPost: Post) => updatePostAPI({ selectedPost }),
    onMutate: async (updatedPost) => {
      await queryClient.cancelQueries({ queryKey: postKeys.all })

      const previousPosts = queryClient.getQueriesData<PostsData>({ queryKey: postKeys.lists() })

      // 낙관적 업데이트
      queryClient.setQueriesData<PostsData>({ queryKey: postKeys.lists() }, (old) => {
        if (!old) return old
        return {
          ...old,
          posts: old.posts.map((post) => (post.id === updatedPost.id ? updatedPost : post)),
        }
      })

      return { previousPosts }
    },
    onError: (_error, _updatedPost, context) => {
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
      queryClient.invalidateQueries({ queryKey: postKeys.lists() })
    },
  })
}

export const useDeletePostMutation = (options?: { onSuccess?: (id: number) => void }) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => deletePostAPI({ id }),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: postKeys.all })

      const previousPosts = queryClient.getQueriesData<PostsData>({ queryKey: postKeys.lists() })

      // 낙관적 업데이트
      queryClient.setQueriesData<PostsData>({ queryKey: postKeys.lists() }, (old) => {
        if (!old) return old
        return {
          ...old,
          posts: old.posts.filter((post) => post.id !== id),
          total: old.total - 1,
        }
      })

      return { previousPosts, deletedId: id }
    },
    onError: (_error, _id, context) => {
      // 에러 시 롤백
      if (context?.previousPosts) {
        context.previousPosts.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data)
        })
      }
    },
    onSuccess: (_, id) => {
      options?.onSuccess?.(id)
    },
  })
}
