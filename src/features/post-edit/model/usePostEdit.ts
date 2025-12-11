import { useState } from "react"
import { updatePostAPI } from "../../../entities/post/api/updatePostAPI"
import { deletePostAPI } from "../../../entities/post/api/deletePostAPI"
import { Post } from "../../../entities/post/model/postTypes"

interface UsePostEditProps {
  onUpdateSuccess: (post: Post) => void
  onDeleteSuccess: (id: number) => void
}

export const usePostEdit = ({ onUpdateSuccess, onDeleteSuccess }: UsePostEditProps) => {
  const [showDialog, setShowDialog] = useState(false)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)

  const open = (post: Post) => {
    setSelectedPost(post)
    setShowDialog(true)
  }

  const close = () => {
    setShowDialog(false)
    setSelectedPost(null)
  }

  const update = async () => {
    if (!selectedPost) return
    try {
      const data = await updatePostAPI({ selectedPost })
      close()
      onUpdateSuccess(data)
    } catch (error) {
      console.error("게시물 업데이트 오류:", error)
    }
  }

  const remove = async (id: number) => {
    try {
      await deletePostAPI({ id })
      onDeleteSuccess(id)
    } catch (error) {
      console.error("게시물 삭제 오류:", error)
    }
  }

  return {
    showDialog,
    selectedPost,
    setSelectedPost,
    open,
    close,
    update,
    remove,
  }
}
