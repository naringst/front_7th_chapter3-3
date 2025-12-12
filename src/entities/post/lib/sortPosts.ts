import { Post } from "../model/postTypes"

type SortBy = "none" | "id" | "title" | "reactions"
type SortOrder = "asc" | "desc"

const getComparison = (a: Post, b: Post, sortBy: SortBy): number => {
  if (sortBy === "id") {
    return a.id - b.id
  }

  if (sortBy === "title") {
    return a.title.localeCompare(b.title)
  }

  if (sortBy === "reactions") {
    const aReactions = (a.reactions?.likes || 0) + (a.reactions?.dislikes || 0)
    const bReactions = (b.reactions?.likes || 0) + (b.reactions?.dislikes || 0)
    return aReactions - bReactions
  }

  return 0
}

export const sortPosts = (posts: Post[], sortBy: SortBy, sortOrder: SortOrder): Post[] => {
  if (sortBy === "none") return posts

  return [...posts].sort((a, b) => {
    const comparison = getComparison(a, b, sortBy)
    return sortOrder === "desc" ? -comparison : comparison
  })
}
