export interface NewComment {
  body: string
  postId: number | null
  userId: number
}
export interface Comment extends NewComment {
  id: number
  likes: number
}
