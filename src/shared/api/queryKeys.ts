/**
 * QueryKey Factory
 * 일관된 queryKey 관리를 위한 팩토리 함수
 */

export const postKeys = {
  all: ["posts"] as const,
  lists: () => [...postKeys.all, "list"] as const,
  list: (filters: { limit: number; skip: number }) => [...postKeys.lists(), filters] as const,
  byTag: (tag: string) => [...postKeys.all, "tag", tag] as const,
  search: (q: string) => [...postKeys.all, "search", q] as const,
  detail: (id: number) => [...postKeys.all, "detail", id] as const,
}

export const commentKeys = {
  all: ["comments"] as const,
  lists: () => [...commentKeys.all, "list"] as const,
  byPost: (postId: number) => [...commentKeys.lists(), { postId }] as const,
}

export const tagKeys = {
  all: ["tags"] as const,
  list: () => [...tagKeys.all, "list"] as const,
}

export const userKeys = {
  all: ["users"] as const,
  list: () => [...userKeys.all, "list"] as const,
  detail: (id: number) => [...userKeys.all, "detail", id] as const,
}
