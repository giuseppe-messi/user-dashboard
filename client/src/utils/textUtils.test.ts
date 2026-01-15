import { describe, it, expect } from "vitest";
import { truncateText, buildOtherDetailsText } from "./textUtils";
import { mockUser } from "../test/mocks/sharedMocks";

describe("methods in textUtils.ts", () => {
  describe("truncateText function", () => {
    it("should not truncate text shorter than maxLength", () => {
      expect(truncateText("Hello", 10)).toBe("Hello");
    });

    it("should truncate text longer than maxLength", () => {
      expect(truncateText("Hello World", 5)).toBe("Hello...");
    });
  });

  describe("buildOtherDetailsText function", () => {
    it("should build complete details text", () => {
      const result = buildOtherDetailsText(mockUser);
      expect(result).toContain("30-year-old male");
      expect(result).toContain("born on 1994-01-01");
      expect(result).toContain("Height 180 cm, weight 75 kg");
      expect(result).toContain("blue eyes");
      expect(result).toContain("brown straight hair");
      expect(result).toContain("Studied at MIT");
      expect(result).toContain("Works as Software Engineer at Tech Corp");
      expect(result).toContain("Engineering department");
      expect(result).toContain("Based in San Francisco, CA, USA");
      expect(result).toContain("Interested in Bitcoin on the Ethereum network");
    });
  });
});
