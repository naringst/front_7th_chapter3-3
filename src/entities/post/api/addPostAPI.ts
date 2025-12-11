import { NewPost } from "../model/postTypes"

export const addPostAPI = async ({ newPost }: { newPost: NewPost }) => {
  const response = await fetch("/api/posts/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPost),
  })
  const data = await response.json()
  return data
}
