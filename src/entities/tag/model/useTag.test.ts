import { renderHook, waitFor } from "../../../test/testUtils"
import { describe, it, expect } from "vitest"
import { useTag } from "./useTag"
import { mockTags } from "../../../test/mocks/handlers"

describe("useTag", () => {
  describe("Initial State", () => {
    it("starts with empty tags array", () => {
      const { result } = renderHook(() => useTag())

      expect(result.current.tags).toEqual([])
    })

    it("provides fetchTags function", () => {
      const { result } = renderHook(() => useTag())

      expect(typeof result.current.fetchTags).toBe("function")
    })
  })

  describe("fetchTags", () => {
    it("fetches and stores tags", async () => {
      const { result } = renderHook(() => useTag())

      await result.current.fetchTags()

      await waitFor(() => {
        expect(result.current.tags).toHaveLength(mockTags.length)
      })
    })

    it("stores tag data with correct structure", async () => {
      const { result } = renderHook(() => useTag())

      await result.current.fetchTags()

      await waitFor(() => {
        expect(result.current.tags[0]).toHaveProperty("slug")
        expect(result.current.tags[0]).toHaveProperty("url")
      })
    })

    it("includes history tag", async () => {
      const { result } = renderHook(() => useTag())

      await result.current.fetchTags()

      await waitFor(() => {
        const historyTag = result.current.tags.find((t: { slug: string }) => t.slug === "history")
        expect(historyTag).toBeDefined()
      })
    })
  })
})
