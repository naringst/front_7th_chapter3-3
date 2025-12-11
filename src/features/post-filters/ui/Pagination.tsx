import { Button } from "../../../shared/ui"
import { LimitSelector } from "./LimitSelector"

interface PaginationProps {
  skip: number
  limit: number
  total: number
  onSkipChange: (value: number) => void
  onLimitChange: (value: number) => void
}

export const Pagination = ({ skip, limit, total, onSkipChange, onLimitChange }: PaginationProps) => {
  return (
    <div className="flex justify-between items-center">
      <LimitSelector value={limit} onChange={onLimitChange} />
      <div className="flex gap-2">
        <Button disabled={skip === 0} onClick={() => onSkipChange(Math.max(0, skip - limit))}>
          이전
        </Button>
        <Button disabled={skip + limit >= total} onClick={() => onSkipChange(skip + limit)}>
          다음
        </Button>
      </div>
    </div>
  )
}
