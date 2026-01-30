import { describe, it, expect } from "vitest";
import { truncateText } from "./textUtils";

describe("methods in textUtils.ts", () => {
  describe("truncateText function", () => {
    it("should not truncate text shorter than maxLength", () => {
      expect(truncateText("Hello", 10)).toBe("Hello");
    });

    it("should truncate text longer than maxLength", () => {
      expect(truncateText("Hello World", 5)).toBe("Hello...");
    });
  });
});
