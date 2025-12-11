import { Comment } from "../model/commentTypes"
import { API_BASE_URL } from "../../../shared/config/api"

export const likeCommentAPI = async (id: number, updatedComment: Comment) => {
  const response = await fetch(`${API_BASE_URL}/comments/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ likes: updatedComment }),
  })
  return response.json()
}
