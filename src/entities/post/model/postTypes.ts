import { User } from "../../user/model/userTypes"

export interface NewPost {
  title: string
  body: string
  userId: number
}

export interface Reactions {
  likes: number
  dislikes: number
}
export interface Post extends NewPost {
  author?: User
  reactions: Reactions
  tags: string[]
  id: number
}
