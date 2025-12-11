import { queryOptions } from "@tanstack/react-query"
import { tagKeys } from "./tagKeys"
import { Tag } from "../model/tagType"
import { API_BASE_URL } from "../../../shared/config/api"

export const tagsQueryOptions = () =>
  queryOptions({
    queryKey: tagKeys.list(),
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/posts/tags`)
      const data: Tag[] = await response.json()
      return data
    },
    staleTime: 1000 * 60 * 10, // 10분간 캐시
  })
