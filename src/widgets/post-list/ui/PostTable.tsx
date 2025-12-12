import { Edit2, MessageSquare, Trash2 } from "lucide-react"
import { Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../shared/ui"
import { highlightText } from "../../../shared/ui/highlightText"
import { Post } from "../../../entities/post/model/postTypes"
import { TagBadge } from "../../../entities/tag"
import { UserInfo } from "../../../entities/user"
import { PostReactions } from "../../../entities/post"

interface PostTableProps {
  posts: Post[]
  searchQuery: string
  tag: string
  onTagChange: (value: string) => void
  onPostDetail: (post: Post) => void
  onPostEdit: (post: Post) => void
  onPostDelete: (postId: number) => void
  onUserClick: (post: Post) => void
}

export const PostTable = ({
  posts,
  searchQuery,
  tag,
  onTagChange,
  onPostDetail,
  onPostEdit,
  onPostDelete,
  onUserClick,
}: PostTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">ID</TableHead>
          <TableHead>제목</TableHead>
          <TableHead className="w-[150px]">작성자</TableHead>
          <TableHead className="w-[150px]">반응</TableHead>
          <TableHead className="w-[150px]">작업</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.map((post) => (
          <TableRow key={post.id}>
            <TableCell>{post.id > 1000000000 ? "NEW" : post.id}</TableCell>
            <TableCell>
              <div className="space-y-1">
                <div>{highlightText(post.title, searchQuery)}</div>

                <div className="flex flex-wrap gap-1">
                  {post.tags?.map((postTag) => (
                    <TagBadge
                      key={postTag}
                      tag={postTag}
                      selected={tag === postTag}
                      onClick={onTagChange}
                    />
                  ))}
                </div>
              </div>
            </TableCell>
            <TableCell>
              <UserInfo
                user={post.author}
                onClick={() => post.author && onUserClick(post)}
              />
            </TableCell>
            <TableCell>
              <PostReactions reactions={post.reactions} />
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => onPostDetail(post)}>
                  <MessageSquare className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => onPostEdit(post)}>
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => onPostDelete(post.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
