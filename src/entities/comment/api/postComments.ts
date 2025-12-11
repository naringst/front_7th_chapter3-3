import { NewComment } from "../model/commentTypes"
import { API_BASE_URL } from "../../../shared/config/api"

export const postComments = async (newComment: NewComment) => {
  const response = await fetch(`${API_BASE_URL}/comments/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newComment),
  })
  return response.json()
}
