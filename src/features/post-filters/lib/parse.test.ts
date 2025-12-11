import { describe, it, expect } from "vitest"
import { parseFilters } from "./parse"

describe("parseFilters", () => {
  describe("Default Values", () => {
    it("returns default values for empty params", () => {
      const params = new URLSearchParams()
      const result = parseFilters(params)

      expect(result.sortBy).toBe("none")
      expect(result.sortOrder).toBe("asc")
      expect(result.skip).toBe(0)
      expect(result.limit).toBe(10)
    })

    it("returns undefined for optional string fields", () => {
      const params = new URLSearchParams()
      const result = parseFilters(params)

      expect(result.q).toBeUndefined()
      expect(result.tag).toBeUndefined()
    })
  })

  describe("Parsing String Fields", () => {
    it("parses q parameter", () => {
      const params = new URLSearchParams("q=searchterm")
      const result = parseFilters(params)

      expect(result.q).toBe("searchterm")
    })

    it("parses tag parameter", () => {
      const params = new URLSearchParams("tag=history")
      const result = parseFilters(params)

      expect(result.tag).toBe("history")
    })
  })

  describe("Parsing Enum Fields", () => {
    it("parses valid sortBy values", () => {
      const values = ["none", "id", "title", "reactions"] as const
      values.forEach((value) => {
        const params = new URLSearchParams(`sortBy=${value}`)
        const result = parseFilters(params)
        expect(result.sortBy).toBe(value)
      })
    })

    it("parses valid sortOrder values", () => {
      const ascParams = new URLSearchParams("sortOrder=asc")
      expect(parseFilters(ascParams).sortOrder).toBe("asc")

      const descParams = new URLSearchParams("sortOrder=desc")
      expect(parseFilters(descParams).sortOrder).toBe("desc")
    })
  })

  describe("Parsing Number Fields", () => {
    it("parses skip as number", () => {
      const params = new URLSearchParams("skip=20")
      const result = parseFilters(params)

      expect(result.skip).toBe(20)
      expect(typeof result.skip).toBe("number")
    })

    it("parses limit as number", () => {
      const params = new URLSearchParams("limit=50")
      const result = parseFilters(params)

      expect(result.limit).toBe(50)
      expect(typeof result.limit).toBe("number")
    })
  })

  describe("Complex Scenarios", () => {
    it("parses all parameters together", () => {
      const params = new URLSearchParams("q=test&tag=history&sortBy=id&sortOrder=desc&skip=10&limit=20")
      const result = parseFilters(params)

      expect(result.q).toBe("test")
      expect(result.tag).toBe("history")
      expect(result.sortBy).toBe("id")
      expect(result.sortOrder).toBe("desc")
      expect(result.skip).toBe(10)
      expect(result.limit).toBe(20)
    })
  })
})
