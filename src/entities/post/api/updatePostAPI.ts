import { Post } from "../model/postTypes"

export const updatePostAPI = async ({ selectedPost }: { selectedPost: Post }) => {
  const response = await fetch(`/api/posts/${selectedPost.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(selectedPost),
  })
  const data = await response.json()
  return data
}
