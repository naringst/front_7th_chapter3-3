import { useState } from "react"
import { fetchUsersAPI } from "../../user/api/fetchUserAPI"
import { fetchPostsAPI } from "../api/fetchPostsAPI"
import { Post } from "./postTypes"
import { User } from "../../user/model/userTypes"

/**
 * Post 엔티티의 순수 데이터 레이어
 * - 데이터 상태 관리 (posts, total, loading)
 * - 데이터 조회 (fetchPosts, searchPosts, fetchPostsByTag)
 * - UI 상태는 features에서 관리
 */
export const usePost = ({ limit, skip }: { limit: number; skip: number }) => {
  const [posts, setPosts] = useState<Post[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)

  // posts와 users를 조합하는 헬퍼 함수
  const mergePostsWithUsers = (postsData: Post[], usersData: User[]) => {
    return postsData.map((post: Post) => ({
      ...post,
      author: usersData.find((user: User) => user.id === post.userId),
    }))
  }

  // 게시물 가져오기
  const fetchPosts = async () => {
    setLoading(true)
    try {
      const [postsData, usersData] = await Promise.all([fetchPostsAPI({ limit, skip }), fetchUsersAPI()])
      const postsWithUsers = mergePostsWithUsers(postsData.posts, usersData.users)
      setPosts(postsWithUsers)
      setTotal(postsData.total)
    } catch (error) {
      console.error("게시물 가져오기 오류:", error)
    } finally {
      setLoading(false)
    }
  }

  // 게시물 검색
  const searchPosts = async ({ q }: { q: string }) => {
    if (!q) {
      fetchPosts()
      return
    }
    setLoading(true)
    try {
      const response = await fetch(`/api/posts/search?q=${q}`)
      const data = await response.json()
      setPosts(data.posts)
      setTotal(data.total)
    } catch (error) {
      console.error("게시물 검색 오류:", error)
    }
    setLoading(false)
  }

  // 태그별 게시물 가져오기
  const fetchPostsByTag = async ({ tag }: { tag: string }) => {
    if (!tag || tag === "all") {
      fetchPosts()
      return
    }
    setLoading(true)
    try {
      const [postsResponse, usersResponse] = await Promise.all([
        fetch(`/api/posts/tag/${tag}`),
        fetch("/api/users?limit=0&select=username,image"),
      ])
      const postsData = await postsResponse.json()
      const usersData = await usersResponse.json()
      const postsWithUsers = mergePostsWithUsers(postsData.posts, usersData.users)
      setPosts(postsWithUsers)
      setTotal(postsData.total)
    } catch (error) {
      console.error("태그별 게시물 가져오기 오류:", error)
    }
    setLoading(false)
  }

  // 게시물 추가 후 목록 업데이트
  const addPostToList = (post: Post) => {
    setPosts((prev) => [post, ...prev])
  }

  // 게시물 수정 후 목록 업데이트
  const updatePostInList = (updatedPost: Post) => {
    setPosts((prev) => prev.map((post) => (post.id === updatedPost.id ? updatedPost : post)))
  }

  // 게시물 삭제 후 목록 업데이트
  const removePostFromList = (id: number) => {
    setPosts((prev) => prev.filter((post) => post.id !== id))
  }

  return {
    posts,
    total,
    loading,
    fetchPosts,
    searchPosts,
    fetchPostsByTag,
    addPostToList,
    updatePostInList,
    removePostFromList,
  }
}
