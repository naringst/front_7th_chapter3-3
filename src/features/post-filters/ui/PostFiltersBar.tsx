import { SearchInput } from "./SearchInput"
import { TagSelector } from "./TagSelector"
import { SortBySelector } from "./SortBySelector"
import { SortOrderSelector } from "./SortOrderSelector"

type SortBy = "none" | "id" | "title" | "reactions"
type SortOrder = "asc" | "desc"

interface PostFiltersBarProps {
  q: string
  tag: string
  sortBy: SortBy
  sortOrder: SortOrder
  onQChange: (value: string) => void
  onTagChange: (value: string) => void
  onSortByChange: (value: SortBy) => void
  onSortOrderChange: (value: SortOrder) => void
  onSearch: () => void
}

export const PostFiltersBar = ({
  q,
  tag,
  sortBy,
  sortOrder,
  onQChange,
  onTagChange,
  onSortByChange,
  onSortOrderChange,
  onSearch,
}: PostFiltersBarProps) => {
  return (
    <div className="flex gap-4">
      <SearchInput value={q} onChange={onQChange} onSearch={onSearch} />
      <TagSelector value={tag} onChange={onTagChange} />
      <SortBySelector value={sortBy} onChange={onSortByChange} />
      <SortOrderSelector value={sortOrder} onChange={onSortOrderChange} />
    </div>
  )
}
