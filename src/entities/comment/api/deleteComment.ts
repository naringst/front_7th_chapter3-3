export const deleteCommentAPI = async (id: number) => {
  await fetch(`/api/comments/${id}`, {
    method: "DELETE",
  })
}
