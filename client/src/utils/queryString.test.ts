import { describe, it, expect } from "vitest";
import { buildQueryString } from "./queryString";

describe("methods in queryString.ts", () => {
  describe("buildQueryString", () => {
    it("should return empty string for undefined params", () => {
      expect(buildQueryString(undefined)).toBe("");
    });

    it("should build query string with single param", () => {
      const result = buildQueryString({ q: "test" });
      expect(result).toBe("?q=test");
    });

    it("should build query string with multiple params", () => {
      const result = buildQueryString({ q: "test", limit: 10, skip: 0 });
      expect(result).toContain("q=test");
      expect(result).toContain("limit=10");
      expect(result).toContain("skip=0");
      expect(result.startsWith("?")).toBe(true);
    });

    it("should skip null values", () => {
      const result = buildQueryString({ q: "test", filter: null as never });
      expect(result).toBe("?q=test");
      expect(result).not.toContain("filter");
    });

    it("should handle array values", () => {
      const result = buildQueryString({ tags: ["admin", "editor"] });
      expect(result).toContain("tags=admin");
      expect(result).toContain("tags=editor");
    });
  });
});
