import { API_BASE_URL } from "../../../shared/config/api"

export const deleteCommentAPI = async (id: number) => {
  await fetch(`${API_BASE_URL}/comments/${id}`, {
    method: "DELETE",
  })
}
