export interface NewComment {
  body: string
  postId: number | null
  userId: number
}

export interface CommentUser {
  id: number
  username: string
  image?: string
}

export interface Comment extends NewComment {
  id: number
  likes: number
  user: CommentUser
}
