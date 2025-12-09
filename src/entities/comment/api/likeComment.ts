import { Comment } from "../model/commentTypes"

export const likeCommentAPI = async (id: number, updatedComment: Comment) => {
  const response = await fetch(`/api/comments/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ likes: updatedComment }),
  })
  return response.json()
}
