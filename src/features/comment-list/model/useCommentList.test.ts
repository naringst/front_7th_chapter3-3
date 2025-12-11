import { renderHook, act, waitFor } from "../../../test/testUtils"
import { describe, it, expect } from "vitest"
import { useCommentList } from "./useCommentList"

describe("useCommentList", () => {
  describe("Initial State", () => {
    it("starts with empty comments array", () => {
      const { result } = renderHook(() => useCommentList(1))

      expect(result.current.comments).toEqual([])
    })

    it("starts with dialogs closed", () => {
      const { result } = renderHook(() => useCommentList(1))

      expect(result.current.showAddCommentDialog).toBe(false)
      expect(result.current.showEditCommentDialog).toBe(false)
    })

    it("starts with null selected comment", () => {
      const { result } = renderHook(() => useCommentList(1))

      expect(result.current.selectedComment).toBeNull()
    })
  })

  describe("fetchComments", () => {
    it("fetches comments when postId is provided", async () => {
      const { result } = renderHook(() => useCommentList(1))

      await act(async () => {
        await result.current.fetchComments()
      })

      await waitFor(() => {
        expect(result.current.comments.length).toBeGreaterThan(0)
      })
    })

    it("does not fetch when postId is undefined", async () => {
      const { result } = renderHook(() => useCommentList(undefined))

      await act(async () => {
        await result.current.fetchComments()
      })

      expect(result.current.comments).toEqual([])
    })
  })

  describe("onAddComment", () => {
    it("opens add comment dialog", () => {
      const { result } = renderHook(() => useCommentList(1))

      act(() => {
        result.current.onAddComment()
      })

      expect(result.current.showAddCommentDialog).toBe(true)
    })

    it("does nothing when postId is undefined", () => {
      const { result } = renderHook(() => useCommentList(undefined))

      act(() => {
        result.current.onAddComment()
      })

      expect(result.current.showAddCommentDialog).toBe(false)
    })
  })

  describe("onEditComment", () => {
    it("opens edit dialog with selected comment", () => {
      const { result } = renderHook(() => useCommentList(1))

      const mockComment = {
        id: 1,
        body: "test",
        postId: 1,
        userId: 1,
        likes: 0,
        user: { id: 1, username: "test" },
      }

      act(() => {
        result.current.onEditComment(mockComment)
      })

      expect(result.current.showEditCommentDialog).toBe(true)
      expect(result.current.selectedComment).toEqual(mockComment)
    })
  })

  describe("Dialog State Management", () => {
    it("can close add comment dialog", () => {
      const { result } = renderHook(() => useCommentList(1))

      act(() => {
        result.current.onAddComment()
      })

      expect(result.current.showAddCommentDialog).toBe(true)

      act(() => {
        result.current.setShowAddCommentDialog(false)
      })

      expect(result.current.showAddCommentDialog).toBe(false)
    })

    it("can close edit comment dialog", () => {
      const { result } = renderHook(() => useCommentList(1))

      act(() => {
        result.current.setShowEditCommentDialog(true)
      })

      expect(result.current.showEditCommentDialog).toBe(true)

      act(() => {
        result.current.setShowEditCommentDialog(false)
      })

      expect(result.current.showEditCommentDialog).toBe(false)
    })
  })

  describe("newComment State", () => {
    it("can update new comment body", () => {
      const { result } = renderHook(() => useCommentList(1))

      act(() => {
        result.current.setNewComment({ body: "new comment body", postId: 1, userId: 1 })
      })

      expect(result.current.newComment.body).toBe("new comment body")
    })
  })
})
