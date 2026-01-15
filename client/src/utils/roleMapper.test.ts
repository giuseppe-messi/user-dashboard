import { describe, it, expect } from "vitest";
import { mapRoleToBadge, mapBadgeToRole } from "./roleMapper";

describe("methods in roleMapper.ts", () => {
  describe("mapRoleToBadge function", () => {
    it("should map admin role to admin badge", () => {
      expect(mapRoleToBadge("admin")).toBe("admin");
    });

    it("should map moderator role to editor badge", () => {
      expect(mapRoleToBadge("moderator")).toBe("editor");
    });

    it("should map user role to viewer badge", () => {
      expect(mapRoleToBadge("user")).toBe("viewer");
    });

    it("should handle case insensitive input", () => {
      expect(mapRoleToBadge("ADMIN")).toBe("admin");
      expect(mapRoleToBadge("Moderator")).toBe("editor");
      expect(mapRoleToBadge("USER")).toBe("viewer");
    });
  });

  describe("mapBadgeToRole function", () => {
    it("should map admin badge to admin role", () => {
      expect(mapBadgeToRole("admin")).toBe("admin");
    });

    it("should map editor badge to moderator role", () => {
      expect(mapBadgeToRole("editor")).toBe("moderator");
    });

    it("should map viewer badge to user role", () => {
      expect(mapBadgeToRole("viewer")).toBe("user");
    });
  });
});
