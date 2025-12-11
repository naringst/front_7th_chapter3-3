import { useState } from "react"
import { NewPost } from "../../../entities/post/model/postTypes"
import { useAddPostMutation } from "../api/postAddMutation"

export const usePostAdd = () => {
  const [showDialog, setShowDialog] = useState(false)
  const [newPost, setNewPost] = useState<NewPost>({ title: "", body: "", userId: 1 })

  const addPostMutation = useAddPostMutation({
    onSuccess: () => {
      setShowDialog(false)
      setNewPost({ title: "", body: "", userId: 1 })
    },
  })

  const open = () => setShowDialog(true)

  const close = () => {
    setShowDialog(false)
    setNewPost({ title: "", body: "", userId: 1 })
  }

  const submit = () => {
    addPostMutation.mutate(newPost)
  }

  return {
    showDialog,
    newPost,
    setNewPost,
    open,
    close,
    submit,
    isLoading: addPostMutation.isPending,
    error: addPostMutation.error,
  }
}
