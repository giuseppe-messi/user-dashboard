import { vi } from "vitest";
import { api } from "../api/baseApi";
import { renderHook, waitFor } from "@testing-library/react";
import { useUserRoles } from "./useUserRoles";

describe("useUserRoles hook", () => {
  it("should fetch and return user roles successfully", async () => {
    vi.spyOn(api, "get").mockResolvedValueOnce({
      data: { roles: ["ADMIN", "EDITOR"] }
    });

    const { result } = renderHook(() => useUserRoles());

    await waitFor(() => {
      expect(result.current.roles).toEqual(["ADMIN", "EDITOR"]);
    });
  });
});
