import { NewPost } from "../model/postTypes"
import { API_BASE_URL } from "../../../shared/config/api"

export const addPostAPI = async ({ newPost }: { newPost: NewPost }) => {
  const response = await fetch(`${API_BASE_URL}/posts/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPost),
  })
  const data = await response.json()
  return data
}
