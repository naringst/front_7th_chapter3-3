import { describe, it, expect } from "vitest"
import { buildSearchParams } from "./buildSearchParams"
import type { PostFilters } from "./schema"

describe("buildSearchParams", () => {
  describe("Default Value Exclusion", () => {
    it("excludes sortBy when value is 'none'", () => {
      const filters: PostFilters = {
        sortBy: "none",
        sortOrder: "asc",
        skip: 0,
        limit: 10,
      }
      const result = buildSearchParams(filters)

      expect(result.has("sortBy")).toBe(false)
    })

    it("excludes sortOrder when value is 'asc'", () => {
      const filters: PostFilters = {
        sortBy: "none",
        sortOrder: "asc",
        skip: 0,
        limit: 10,
      }
      const result = buildSearchParams(filters)

      expect(result.has("sortOrder")).toBe(false)
    })

    it("excludes skip when value is 0", () => {
      const filters: PostFilters = {
        sortBy: "none",
        sortOrder: "asc",
        skip: 0,
        limit: 10,
      }
      const result = buildSearchParams(filters)

      expect(result.has("skip")).toBe(false)
    })

    it("excludes limit when value is 10", () => {
      const filters: PostFilters = {
        sortBy: "none",
        sortOrder: "asc",
        skip: 0,
        limit: 10,
      }
      const result = buildSearchParams(filters)

      expect(result.has("limit")).toBe(false)
    })
  })

  describe("Including Non-Default Values", () => {
    it("includes sortBy when not 'none'", () => {
      const filters: PostFilters = {
        sortBy: "id",
        sortOrder: "asc",
        skip: 0,
        limit: 10,
      }
      const result = buildSearchParams(filters)

      expect(result.get("sortBy")).toBe("id")
    })

    it("includes sortOrder when 'desc'", () => {
      const filters: PostFilters = {
        sortBy: "none",
        sortOrder: "desc",
        skip: 0,
        limit: 10,
      }
      const result = buildSearchParams(filters)

      expect(result.get("sortOrder")).toBe("desc")
    })

    it("includes skip when greater than 0", () => {
      const filters: PostFilters = {
        sortBy: "none",
        sortOrder: "asc",
        skip: 20,
        limit: 10,
      }
      const result = buildSearchParams(filters)

      expect(result.get("skip")).toBe("20")
    })

    it("includes limit when not 10", () => {
      const filters: PostFilters = {
        sortBy: "none",
        sortOrder: "asc",
        skip: 0,
        limit: 30,
      }
      const result = buildSearchParams(filters)

      expect(result.get("limit")).toBe("30")
    })
  })

  describe("Optional String Fields", () => {
    it("includes q when provided", () => {
      const filters: PostFilters = {
        q: "searchterm",
        sortBy: "none",
        sortOrder: "asc",
        skip: 0,
        limit: 10,
      }
      const result = buildSearchParams(filters)

      expect(result.get("q")).toBe("searchterm")
    })

    it("includes tag when provided", () => {
      const filters: PostFilters = {
        tag: "history",
        sortBy: "none",
        sortOrder: "asc",
        skip: 0,
        limit: 10,
      }
      const result = buildSearchParams(filters)

      expect(result.get("tag")).toBe("history")
    })

    it("excludes q when undefined", () => {
      const filters: PostFilters = {
        sortBy: "none",
        sortOrder: "asc",
        skip: 0,
        limit: 10,
      }
      const result = buildSearchParams(filters)

      expect(result.has("q")).toBe(false)
    })

    it("excludes empty string values", () => {
      const filters: PostFilters = {
        q: "",
        sortBy: "none",
        sortOrder: "asc",
        skip: 0,
        limit: 10,
      }
      const result = buildSearchParams(filters)

      expect(result.has("q")).toBe(false)
    })
  })

  describe("Complex Scenarios", () => {
    it("builds params with multiple non-default values", () => {
      const filters: PostFilters = {
        q: "test",
        tag: "history",
        sortBy: "title",
        sortOrder: "desc",
        skip: 10,
        limit: 20,
      }
      const result = buildSearchParams(filters)

      expect(result.get("q")).toBe("test")
      expect(result.get("tag")).toBe("history")
      expect(result.get("sortBy")).toBe("title")
      expect(result.get("sortOrder")).toBe("desc")
      expect(result.get("skip")).toBe("10")
      expect(result.get("limit")).toBe("20")
    })

    it("returns empty params for all default values", () => {
      const filters: PostFilters = {
        sortBy: "none",
        sortOrder: "asc",
        skip: 0,
        limit: 10,
      }
      const result = buildSearchParams(filters)

      expect(result.toString()).toBe("")
    })
  })
})
