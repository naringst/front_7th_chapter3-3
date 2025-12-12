import { queryOptions } from "@tanstack/react-query"
import { postKeys } from "./postKeys"
import { userKeys } from "../../user/api/userKeys"
import { Post } from "../model/postTypes"
import { User } from "../../user/model/userTypes"
import { API_BASE_URL } from "../../../shared/config/api"

interface PostsResponse {
  posts: Post[]
  total: number
}

interface UsersResponse {
  users: User[]
}

// posts와 users를 조합하는 헬퍼 함수
const mergePostsWithUsers = (posts: Post[], users: User[]): Post[] => {
  return posts.map((post) => ({
    ...post,
    author: users.find((user) => user.id === post.userId),
  }))
}

// 기본 posts 가져오기 (users와 조합)
export const postsQueryOptions = (filters: { limit: number; skip: number }) =>
  queryOptions({
    queryKey: postKeys.list(filters),
    queryFn: async () => {
      const [postsRes, usersRes] = await Promise.all([
        fetch(`${API_BASE_URL}/posts?limit=${filters.limit}&skip=${filters.skip}`),
        fetch(`${API_BASE_URL}/users?limit=0&select=username,image`),
      ])
      const postsData: PostsResponse = await postsRes.json()
      const usersData: UsersResponse = await usersRes.json()

      return {
        posts: mergePostsWithUsers(postsData.posts, usersData.users),
        total: postsData.total,
      }
    },
  })

// 태그별 posts 가져오기
export const postsByTagQueryOptions = (tag: string, filters: { limit: number; skip: number }) =>
  queryOptions({
    queryKey: postKeys.byTag(tag, filters),
    queryFn: async () => {
      const [postsRes, usersRes] = await Promise.all([
        fetch(`${API_BASE_URL}/posts/tag/${tag}?limit=${filters.limit}&skip=${filters.skip}`),
        fetch(`${API_BASE_URL}/users?limit=0&select=username,image`),
      ])
      const postsData: PostsResponse = await postsRes.json()
      const usersData: UsersResponse = await usersRes.json()

      return {
        posts: mergePostsWithUsers(postsData.posts, usersData.users),
        total: postsData.total,
      }
    },
    enabled: !!tag && tag !== "all",
  })

// 검색
export const searchPostsQueryOptions = (q: string, filters: { limit: number; skip: number }) =>
  queryOptions({
    queryKey: postKeys.search(q, filters),
    queryFn: async () => {
      const [postsRes, usersRes] = await Promise.all([
        fetch(`${API_BASE_URL}/posts/search?q=${q}&limit=${filters.limit}&skip=${filters.skip}`),
        fetch(`${API_BASE_URL}/users?limit=0&select=username,image`),
      ])
      const postsData: PostsResponse = await postsRes.json()
      const usersData: UsersResponse = await usersRes.json()

      return {
        posts: mergePostsWithUsers(postsData.posts, usersData.users),
        total: postsData.total,
      }
    },
    enabled: !!q,
  })

// Users 목록 (posts와 조합용)
export const usersQueryOptions = () =>
  queryOptions({
    queryKey: userKeys.list(),
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/users?limit=0&select=username,image`)
      const data: UsersResponse = await response.json()
      return data.users
    },
    staleTime: 1000 * 60 * 5, // 5분간 캐시
  })
