import { queryOptions } from "@tanstack/react-query"
import { tagKeys } from "../../../shared/api/queryKeys"
import { Tag } from "../model/tagType"

export const tagsQueryOptions = () =>
  queryOptions({
    queryKey: tagKeys.list(),
    queryFn: async () => {
      const response = await fetch("/api/posts/tags")
      const data: Tag[] = await response.json()
      return data
    },
    staleTime: 1000 * 60 * 10, // 10분간 캐시
  })
