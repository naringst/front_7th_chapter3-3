import { Edit2, MessageSquare, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react"
import { Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../shared/ui"
import { highlightText } from "../../../shared/ui/highlightText"
import { Post } from "../../../entities/post/model/postTypes"

interface PostTableProps {
  posts: Post[]
  q: string
  tag: string
  onTagChange: (value: string) => void
  onPostDetail: (post: Post) => void
  onPostEdit: (post: Post) => void
  onPostDelete: (postId: number) => void
  onUserClick: (post: Post) => void
}

export const PostTable = ({
  posts,
  q,
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
            <TableCell>{post.id}</TableCell>
            <TableCell>
              <div className="space-y-1">
                <div>{highlightText(post.title, q)}</div>

                <div className="flex flex-wrap gap-1">
                  {post.tags?.map((postTag) => (
                    <span
                      key={postTag}
                      className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
                        tag === postTag
                          ? "text-white bg-blue-500 hover:bg-blue-600"
                          : "text-blue-800 bg-blue-100 hover:bg-blue-200"
                      }`}
                      onClick={() => onTagChange(postTag)}
                    >
                      {postTag}
                    </span>
                  ))}
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => post.author && onUserClick(post)}
              >
                <img src={post.author?.image} alt={post.author?.username} className="w-8 h-8 rounded-full" />
                <span>{post.author?.username}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <ThumbsUp className="w-4 h-4" />
                <span>{post.reactions?.likes || 0}</span>
                <ThumbsDown className="w-4 h-4" />
                <span>{post.reactions?.dislikes || 0}</span>
              </div>
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
