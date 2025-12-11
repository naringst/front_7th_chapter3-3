export const deletePostAPI = async ({ id }: { id: number }) => {
  const response = await fetch(`/api/posts/${id}`, {
    method: "DELETE",
  })
  const data = await response.json()
  return data
}
