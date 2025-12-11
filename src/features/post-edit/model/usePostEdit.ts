import { useState } from "react"
import { Post } from "../../../entities/post/model/postTypes"
import { useUpdatePostMutation, useDeletePostMutation } from "../api/postEditMutations"

export const usePostEdit = () => {
  const [showDialog, setShowDialog] = useState(false)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)

  const updatePostMutation = useUpdatePostMutation({
    onSuccess: () => {
      setShowDialog(false)
      setSelectedPost(null)
    },
  })

  const deletePostMutation = useDeletePostMutation()

  const open = (post: Post) => {
    setSelectedPost(post)
    setShowDialog(true)
  }

  const close = () => {
    setShowDialog(false)
    setSelectedPost(null)
  }

  const update = () => {
    if (!selectedPost) return
    updatePostMutation.mutate(selectedPost)
  }

  const remove = (id: number) => {
    deletePostMutation.mutate(id)
  }

  return {
    showDialog,
    selectedPost,
    setSelectedPost,
    open,
    close,
    update,
    remove,
    isUpdating: updatePostMutation.isPending,
    isDeleting: deletePostMutation.isPending,
    updateError: updatePostMutation.error,
    deleteError: deletePostMutation.error,
  }
}
