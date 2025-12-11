export const postKeys = {
  all: ["posts"] as const,
  lists: () => [...postKeys.all, "list"] as const,
  list: (filters: { limit: number; skip: number }) => [...postKeys.lists(), filters] as const,
  byTag: (tag: string) => [...postKeys.all, "tag", tag] as const,
  search: (q: string) => [...postKeys.all, "search", q] as const,
  detail: (id: number) => [...postKeys.all, "detail", id] as const,
}
