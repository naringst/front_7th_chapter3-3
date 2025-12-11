import { API_BASE_URL } from "../../../shared/config/api"

export const fetchPostsAPI = async ({ limit, skip }: { limit: number; skip: number }) => {
  const response = await fetch(`${API_BASE_URL}/posts?limit=${limit}&skip=${skip}`)
  const data = await response.json()
  return data
}
