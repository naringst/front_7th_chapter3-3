import { Comment } from "../model/commentTypes"

export const putComment = async (selectedComment: Comment) => {
  const response = await fetch(`/api/comments/${selectedComment.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(selectedComment),
  })
  return response.json()
}
