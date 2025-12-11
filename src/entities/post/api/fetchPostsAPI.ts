export const fetchPostsAPI = async ({ limit, skip }: { limit: number; skip: number }) => {
  const response = await fetch(`/api/posts?limit=${limit}&skip=${skip}`)
  const data = await response.json()
  return data
}
