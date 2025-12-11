import { useQuery } from "@tanstack/react-query"
import { tagsQueryOptions } from "../api/tagQueries"

export const useTag = () => {
  const { data: tags = [], refetch } = useQuery(tagsQueryOptions())

  return {
    tags,
    fetchTags: refetch,
  }
}
