import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../shared/ui"
import { highlightText } from "../../../shared/ui/highlightText"
import { Post } from "../../../entities/post/model/postTypes"
import { CommentList } from "../../comment-list/ui/CommentList"

interface PostDetailDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  post: Post | null
  searchQuery?: string
}

export const PostDetailDialog = ({
  open,
  onOpenChange,
  post,
  searchQuery = "",
}: PostDetailDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{highlightText(post?.title || "", searchQuery)}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>{highlightText(post?.body || "", searchQuery)}</p>
          <CommentList postId={post?.id} searchQuery={searchQuery} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
