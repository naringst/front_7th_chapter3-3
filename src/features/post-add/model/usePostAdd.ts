import { useState } from "react"
import { addPostAPI } from "../../../entities/post/api/addPostAPI"
import { NewPost, Post } from "../../../entities/post/model/postTypes"

interface UsePostAddProps {
  onSuccess: (post: Post) => void
}

export const usePostAdd = ({ onSuccess }: UsePostAddProps) => {
  const [showDialog, setShowDialog] = useState(false)
  const [newPost, setNewPost] = useState<NewPost>({ title: "", body: "", userId: 1 })

  const open = () => setShowDialog(true)

  const close = () => {
    setShowDialog(false)
    setNewPost({ title: "", body: "", userId: 1 })
  }

  const submit = async () => {
    try {
      const data = await addPostAPI({ newPost })
      close()
      onSuccess(data)
    } catch (error) {
      console.error("게시물 추가 오류:", error)
    }
  }

  return {
    showDialog,
    newPost,
    setNewPost,
    open,
    close,
    submit,
  }
}
