import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Input,
  Textarea,
} from "../../../shared/ui"
import { NewPost } from "../../../entities/post/model/postTypes"

interface PostAddDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  newPost: NewPost
  onNewPostChange: (post: NewPost) => void
  onSubmit: () => void
}

export const PostAddDialog = ({
  open,
  onOpenChange,
  newPost,
  onNewPostChange,
  onSubmit,
}: PostAddDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 게시물 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={newPost.title}
            onChange={(e) => onNewPostChange({ ...newPost, title: e.target.value })}
          />
          <Textarea
            rows={30}
            placeholder="내용"
            value={newPost.body}
            onChange={(e) => onNewPostChange({ ...newPost, body: e.target.value })}
          />
          <Input
            type="number"
            placeholder="사용자 ID"
            value={newPost.userId}
            onChange={(e) => onNewPostChange({ ...newPost, userId: Number(e.target.value) })}
          />
          <Button onClick={onSubmit}>게시물 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
