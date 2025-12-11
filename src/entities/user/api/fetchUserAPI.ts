import { API_BASE_URL } from "../../../shared/config/api"

export const fetchUsersAPI = async () => {
  const response = await fetch(`${API_BASE_URL}/users?limit=0&select=username,image`)
  const data = await response.json()
  return data
}
