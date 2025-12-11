import { useState } from "react"
import { Post } from "../../../entities/post/model/postTypes"

export const usePostDetail = () => {
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

  return {
    showDialog,
    selectedPost,
    open,
    close,
    setShowDialog,
  }
}
