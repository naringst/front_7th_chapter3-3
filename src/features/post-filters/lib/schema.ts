import { z } from "zod"

/**
 * Post 필터 관련 URL 파라미터 스키마
 */
export const postFiltersSchema = z.object({
  q: z.string().optional(),
  sortBy: z.enum(["none", "id", "title", "reactions"]).default("none"),
  sortOrder: z.enum(["asc", "desc"]).default("asc"),
  skip: z.coerce.number().min(0).default(0),
  limit: z.coerce.number().min(1).max(100).default(10),
  tag: z.string().optional(),
})

export type PostFilters = z.infer<typeof postFiltersSchema>

