import { renderHook, act } from "@testing-library/react"
import { describe, it, expect, beforeEach } from "vitest"
import { BrowserRouter } from "react-router-dom"
import { usePostFilters } from "./usePostFilters"

const wrapper = ({ children }: { children: React.ReactNode }) => <BrowserRouter>{children}</BrowserRouter>

describe("usePostFilters", () => {
  beforeEach(() => {
    window.history.pushState({}, "", "/")
  })

  describe("Initial State", () => {
    it("returns default filter values", () => {
      const { result } = renderHook(() => usePostFilters(), { wrapper })

      expect(result.current.q).toBeUndefined()
      expect(result.current.tag).toBeUndefined()
      expect(result.current.sortBy).toBe("none")
      expect(result.current.sortOrder).toBe("asc")
      expect(result.current.skip).toBe(0)
      expect(result.current.limit).toBe(10)
    })

    it("parses URL params correctly", () => {
      window.history.pushState({}, "", "/?q=test&tag=history&sortBy=id&sortOrder=desc&skip=10&limit=20")

      const { result } = renderHook(() => usePostFilters(), { wrapper })

      expect(result.current.q).toBe("test")
      expect(result.current.tag).toBe("history")
      expect(result.current.sortBy).toBe("id")
      expect(result.current.sortOrder).toBe("desc")
      expect(result.current.skip).toBe(10)
      expect(result.current.limit).toBe(20)
    })
  })

  describe("Setters", () => {
    it("updates search query", () => {
      const { result } = renderHook(() => usePostFilters(), { wrapper })

      act(() => {
        result.current.setQ("search term")
      })

      expect(result.current.q).toBe("search term")
    })

    it("updates tag filter", () => {
      const { result } = renderHook(() => usePostFilters(), { wrapper })

      act(() => {
        result.current.setTag("history")
      })

      expect(result.current.tag).toBe("history")
    })

    it("updates sortBy", () => {
      const { result } = renderHook(() => usePostFilters(), { wrapper })

      act(() => {
        result.current.setSortBy("title")
      })

      expect(result.current.sortBy).toBe("title")
    })

    it("updates sortOrder", () => {
      const { result } = renderHook(() => usePostFilters(), { wrapper })

      act(() => {
        result.current.setSortOrder("desc")
      })

      expect(result.current.sortOrder).toBe("desc")
    })

    it("updates skip", () => {
      const { result } = renderHook(() => usePostFilters(), { wrapper })

      act(() => {
        result.current.setSkip(20)
      })

      expect(result.current.skip).toBe(20)
    })

    it("updates limit", () => {
      const { result } = renderHook(() => usePostFilters(), { wrapper })

      act(() => {
        result.current.setLimit(30)
      })

      expect(result.current.limit).toBe(30)
    })
  })

  describe("Update Function", () => {
    it("updates multiple filters at once", () => {
      const { result } = renderHook(() => usePostFilters(), { wrapper })

      act(() => {
        result.current.update({
          q: "multi",
          tag: "test",
          sortBy: "reactions",
        })
      })

      expect(result.current.q).toBe("multi")
      expect(result.current.tag).toBe("test")
      expect(result.current.sortBy).toBe("reactions")
    })

    it("preserves existing filters when updating", () => {
      window.history.pushState({}, "", "/?q=existing")

      const { result } = renderHook(() => usePostFilters(), { wrapper })

      act(() => {
        result.current.setTag("newTag")
      })

      expect(result.current.q).toBe("existing")
      expect(result.current.tag).toBe("newTag")
    })
  })

  describe("URL Sync", () => {
    it("updates URL when filter changes", () => {
      const { result } = renderHook(() => usePostFilters(), { wrapper })

      act(() => {
        result.current.setQ("urltest")
      })

      expect(window.location.search).toContain("q=urltest")
    })

    it("removes default values from URL", () => {
      const { result } = renderHook(() => usePostFilters(), { wrapper })

      act(() => {
        result.current.update({
          sortBy: "none",
          sortOrder: "asc",
          skip: 0,
          limit: 10,
        })
      })

      expect(window.location.search).not.toContain("sortBy")
      expect(window.location.search).not.toContain("sortOrder")
      expect(window.location.search).not.toContain("skip")
      expect(window.location.search).not.toContain("limit")
    })
  })
})
