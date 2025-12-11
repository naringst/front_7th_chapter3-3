import { render, screen, waitFor } from "../../../test/testUtils"
import userEvent from "@testing-library/user-event"
import { describe, it, expect } from "vitest"
import { CommentList } from "./CommentList"

describe("CommentList", () => {
  describe("Rendering", () => {
    it("renders comment section title", async () => {
      render(<CommentList postId={1} />)

      await waitFor(() => {
        expect(screen.getByText("댓글")).toBeInTheDocument()
      })
    })

    it("renders add comment button", async () => {
      render(<CommentList postId={1} />)

      await waitFor(() => {
        expect(screen.getByText("댓글 추가")).toBeInTheDocument()
      })
    })

    it("fetches and displays comments for postId", async () => {
      render(<CommentList postId={1} />)

      await waitFor(() => {
        expect(screen.getByText("Test comment 1")).toBeInTheDocument()
      })

      expect(screen.getByText("Test comment 2")).toBeInTheDocument()
    })

    it("displays comment author username", async () => {
      render(<CommentList postId={1} />)

      await waitFor(() => {
        expect(screen.getByText("user1:")).toBeInTheDocument()
      })
    })

    it("displays comment likes count", async () => {
      render(<CommentList postId={1} />)

      await waitFor(() => {
        expect(screen.getByText("5")).toBeInTheDocument()
        expect(screen.getByText("3")).toBeInTheDocument()
      })
    })
  })

  describe("Add Comment Dialog", () => {
    it("opens add comment dialog when clicking add button", async () => {
      const user = userEvent.setup()
      render(<CommentList postId={1} />)

      await waitFor(() => {
        expect(screen.getByText("댓글 추가")).toBeInTheDocument()
      })

      await user.click(screen.getByText("댓글 추가"))

      await waitFor(() => {
        expect(screen.getByText("새 댓글 추가")).toBeInTheDocument()
      })
    })

    it("shows textarea in add comment dialog", async () => {
      const user = userEvent.setup()
      render(<CommentList postId={1} />)

      await waitFor(() => {
        expect(screen.getByText("댓글 추가")).toBeInTheDocument()
      })

      await user.click(screen.getByText("댓글 추가"))

      await waitFor(() => {
        expect(screen.getByPlaceholderText("댓글 내용")).toBeInTheDocument()
      })
    })
  })

  describe("Edit Comment Dialog", () => {
    it("opens edit dialog when clicking edit button", async () => {
      const user = userEvent.setup()
      render(<CommentList postId={1} />)

      await waitFor(() => {
        expect(screen.getByText("Test comment 1")).toBeInTheDocument()
      })

      // Find edit button - second button in the comment row (like, edit, delete)
      const commentRows = document.querySelectorAll(".border-b")
      const firstCommentRow = commentRows[0]
      const buttons = firstCommentRow?.querySelectorAll("button")
      const editButton = buttons?.[1]

      if (editButton) {
        await user.click(editButton)
      }

      await waitFor(() => {
        expect(screen.getByText("댓글 수정")).toBeInTheDocument()
      })
    })
  })

  describe("Search Highlight", () => {
    it("highlights search query in comments", async () => {
      render(<CommentList postId={1} searchQuery="comment" />)

      await waitFor(() => {
        const highlights = document.querySelectorAll("mark")
        expect(highlights.length).toBeGreaterThan(0)
      })
    })
  })

  describe("Without postId", () => {
    it("does not fetch comments when postId is undefined", async () => {
      render(<CommentList postId={undefined} />)

      await waitFor(() => {
        expect(screen.getByText("댓글")).toBeInTheDocument()
      })

      expect(screen.queryByText("Test comment 1")).not.toBeInTheDocument()
    })
  })
})
