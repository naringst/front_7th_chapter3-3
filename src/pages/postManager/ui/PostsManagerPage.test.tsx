import { render, screen, waitFor } from "../../../test/testUtils"
import userEvent from "@testing-library/user-event"
import { describe, it, expect, beforeEach } from "vitest"
import { PostsManagerPage } from "./PostsManagerPage"

describe("PostsManagerPage", () => {
  beforeEach(() => {
    window.history.pushState({}, "", "/")
  })

  describe("Initial Rendering", () => {
    it("renders page title", async () => {
      render(<PostsManagerPage />)
      expect(screen.getByText("게시물 관리자")).toBeInTheDocument()
    })

    it("renders add post button", async () => {
      render(<PostsManagerPage />)
      expect(screen.getByText("게시물 추가")).toBeInTheDocument()
    })

    it("loads and displays posts", async () => {
      render(<PostsManagerPage />)

      await waitFor(() => {
        expect(screen.getByText("Test Post 1")).toBeInTheDocument()
      })

      expect(screen.getByText("Test Post 2")).toBeInTheDocument()
    })

    it("displays post tags correctly", async () => {
      render(<PostsManagerPage />)

      // Wait for posts to load first
      await waitFor(
        () => {
          expect(screen.getByText("Test Post 1")).toBeInTheDocument()
        },
        { timeout: 5000 },
      )

      // Tags should be displayed in post rows
      await waitFor(
        () => {
          // Check if any tag element exists
          const tagElements = document.querySelectorAll('[class*="rounded-"][class*="cursor-pointer"]')
          expect(tagElements.length).toBeGreaterThan(0)
        },
        { timeout: 5000 },
      )
    })

    it("loads tags into select dropdown", async () => {
      render(<PostsManagerPage />)

      await waitFor(() => {
        expect(screen.getByText("태그 선택")).toBeInTheDocument()
      })
    })
  })

  describe("Search Functionality", () => {
    it("renders search input", () => {
      render(<PostsManagerPage />)

      const searchInput = screen.getByPlaceholderText("게시물 검색...")
      expect(searchInput).toBeInTheDocument()
    })

    it("updates search input value", async () => {
      const user = userEvent.setup()
      render(<PostsManagerPage />)

      const searchInput = screen.getByPlaceholderText("게시물 검색...")
      await user.type(searchInput, "test query")

      expect(searchInput).toHaveValue("test query")
    })
  })

  describe("Tag Filtering", () => {
    it("renders tag select dropdown", () => {
      render(<PostsManagerPage />)

      expect(screen.getByText("태그 선택")).toBeInTheDocument()
    })
  })

  describe("Post CRUD Operations", () => {
    it("opens add post dialog when clicking add button", async () => {
      const user = userEvent.setup()
      render(<PostsManagerPage />)

      await user.click(screen.getByText("게시물 추가"))

      await waitFor(() => {
        expect(screen.getByText("새 게시물 추가")).toBeInTheDocument()
      })
    })

    it("creates a new post", async () => {
      const user = userEvent.setup()
      render(<PostsManagerPage />)

      await user.click(screen.getByText("게시물 추가"))

      await waitFor(() => {
        expect(screen.getByText("새 게시물 추가")).toBeInTheDocument()
      })

      const titleInput = screen.getByPlaceholderText("제목")
      const bodyInput = screen.getByPlaceholderText("내용")

      await user.type(titleInput, "New Test Post")
      await user.type(bodyInput, "New Test Body")

      const addButton = screen.getAllByText("게시물 추가").find((el) => el.tagName === "BUTTON" && el.closest("form, .space-y-4"))
      if (addButton) {
        await user.click(addButton)
      }

      await waitFor(() => {
        expect(screen.queryByText("새 게시물 추가")).not.toBeInTheDocument()
      })
    })

    it("deletes a post", async () => {
      const user = userEvent.setup()
      render(<PostsManagerPage />)

      await waitFor(
        () => {
          expect(screen.getByText("Test Post 1")).toBeInTheDocument()
        },
        { timeout: 5000 },
      )

      // Wait a bit for full render
      await waitFor(
        () => {
          const rows = document.querySelectorAll("tr")
          expect(rows.length).toBeGreaterThan(1)
        },
        { timeout: 5000 },
      )

      // Find delete buttons by looking for buttons with trash icon
      const rows = document.querySelectorAll("tr")
      const firstDataRow = rows[1] // Skip header row
      const buttons = firstDataRow?.querySelectorAll("button")
      const deleteButton = buttons?.[2] // Third button is delete (message, edit, delete)

      if (deleteButton) {
        await user.click(deleteButton)
      }

      await waitFor(
        () => {
          expect(screen.queryByText("Test Post 1")).not.toBeInTheDocument()
        },
        { timeout: 5000 },
      )
    })
  })

  describe("Pagination", () => {
    it("renders pagination controls", async () => {
      render(<PostsManagerPage />)

      await waitFor(() => {
        expect(screen.getByText("이전")).toBeInTheDocument()
        expect(screen.getByText("다음")).toBeInTheDocument()
      })
    })

    it("disables previous button on first page", async () => {
      render(<PostsManagerPage />)

      await waitFor(() => {
        const prevButton = screen.getByText("이전")
        expect(prevButton).toBeDisabled()
      })
    })
  })

  describe("Sorting", () => {
    it("renders sort controls", async () => {
      render(<PostsManagerPage />)

      // Sort controls should be present immediately
      expect(screen.getByText("없음")).toBeInTheDocument()
      expect(screen.getByText("오름차순")).toBeInTheDocument()
    })
  })

  describe("Post Detail Dialog", () => {
    it("opens post detail dialog when clicking message icon", async () => {
      const user = userEvent.setup()
      render(<PostsManagerPage />)

      await waitFor(
        () => {
          expect(screen.getByText("Test Post 1")).toBeInTheDocument()
        },
        { timeout: 5000 },
      )

      // Wait a bit for full render
      await waitFor(
        () => {
          const rows = document.querySelectorAll("tr")
          expect(rows.length).toBeGreaterThan(1)
        },
        { timeout: 5000 },
      )

      // Find message button (first button in action column)
      const rows = document.querySelectorAll("tr")
      const firstDataRow = rows[1]
      const buttons = firstDataRow?.querySelectorAll("button")
      const messageButton = buttons?.[0]

      if (messageButton) {
        await user.click(messageButton)
      }

      await waitFor(() => {
        expect(screen.getByText("This is test post body 1")).toBeInTheDocument()
      })
    })
  })

  describe("Edit Post", () => {
    it("opens edit dialog when clicking edit button", async () => {
      const user = userEvent.setup()
      render(<PostsManagerPage />)

      await waitFor(
        () => {
          expect(screen.getByText("Test Post 1")).toBeInTheDocument()
        },
        { timeout: 5000 },
      )

      // Wait a bit for full render
      await waitFor(
        () => {
          const rows = document.querySelectorAll("tr")
          expect(rows.length).toBeGreaterThan(1)
        },
        { timeout: 5000 },
      )

      // Find edit button (second button in action column)
      const rows = document.querySelectorAll("tr")
      const firstDataRow = rows[1]
      const buttons = firstDataRow?.querySelectorAll("button")
      const editButton = buttons?.[1]

      if (editButton) {
        await user.click(editButton)
      }

      await waitFor(() => {
        expect(screen.getByText("게시물 수정")).toBeInTheDocument()
      })
    })
  })
})
