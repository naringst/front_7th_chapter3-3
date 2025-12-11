import { useTag } from "../../../entities/tag/model/useTag"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../shared/ui/Select"

interface TagSelectorProps {
  value: string
  onChange: (value: string) => void
}

export const TagSelector = ({ value, onChange }: TagSelectorProps) => {
  const { tags } = useTag()

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="태그 선택" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">모든 태그</SelectItem>
        {tags.map((t) => (
          <SelectItem key={t.url} value={t.slug}>
            {t.slug}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
