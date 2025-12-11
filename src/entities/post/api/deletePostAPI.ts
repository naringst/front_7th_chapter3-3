import { API_BASE_URL } from "../../../shared/config/api"

export const deletePostAPI = async ({ id }: { id: number }) => {
  const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
    method: "DELETE",
  })
  const data = await response.json()
  return data
}
