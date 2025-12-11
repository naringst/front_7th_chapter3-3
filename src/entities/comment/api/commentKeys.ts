export const commentKeys = {
  all: ["comments"] as const,
  lists: () => [...commentKeys.all, "list"] as const,
  byPost: (postId: number) => [...commentKeys.lists(), { postId }] as const,
}
