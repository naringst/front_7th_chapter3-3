import { Post } from "../model/postTypes"
import { API_BASE_URL } from "../../../shared/config/api"

export const updatePostAPI = async ({ selectedPost }: { selectedPost: Post }) => {
  const response = await fetch(`${API_BASE_URL}/posts/${selectedPost.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(selectedPost),
  })
  const data = await response.json()
  return data
}
