import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../shared/ui"

type SortOrder = "asc" | "desc"

interface SortOrderSelectorProps {
  value: SortOrder
  onChange: (value: SortOrder) => void
}

export const SortOrderSelector = ({ value, onChange }: SortOrderSelectorProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="정렬 순서" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="asc">오름차순</SelectItem>
        <SelectItem value="desc">내림차순</SelectItem>
      </SelectContent>
    </Select>
  )
}
