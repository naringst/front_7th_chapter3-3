export const postKeys = {
  all: ["posts"] as const,
  lists: () => [...postKeys.all, "list"] as const,
  list: (filters: { limit: number; skip: number }) => [...postKeys.lists(), filters] as const,
  byTag: (tag: string, filters: { limit: number; skip: number }) => [...postKeys.all, "tag", tag, filters] as const,
  search: (q: string, filters: { limit: number; skip: number }) => [...postKeys.all, "search", q, filters] as const,
  detail: (id: number) => [...postKeys.all, "detail", id] as const,
}
