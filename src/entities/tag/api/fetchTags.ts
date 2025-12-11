import { API_BASE_URL } from "../../../shared/config/api"

/**
 * 태그 목록을 가져오는 API 함수
 */
export const fetchTags = async () => {
  const response = await fetch(`${API_BASE_URL}/posts/tags`)
  const data = await response.json()
  return data
}
