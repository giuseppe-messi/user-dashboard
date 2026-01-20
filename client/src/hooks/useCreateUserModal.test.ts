import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useCreateUserModal } from "./useCreateUserModal";

describe("useCreateUserModal", () => {
  it("opens and closes modal", () => {
    const { result } = renderHook(() => useCreateUserModal());

    expect(result.current.isOpen).toBe(false);

    act(() => {
      result.current.openModal();
    });

    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.closeModal();
    });

    expect(result.current.isOpen).toBe(false);
  });
});
