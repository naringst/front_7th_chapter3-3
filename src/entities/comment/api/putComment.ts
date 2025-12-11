import { Comment } from "../model/commentTypes"
import { API_BASE_URL } from "../../../shared/config/api"

export const putComment = async (selectedComment: Comment) => {
  const response = await fetch(`${API_BASE_URL}/comments/${selectedComment.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(selectedComment),
  })
  return response.json()
}
