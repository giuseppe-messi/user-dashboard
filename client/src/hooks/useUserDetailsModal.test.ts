import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useUserDetailsModal } from "./useUserDetailsModal";

describe("useUserDetailsModal", () => {
  it("should initialize with closed modal and no selected user index", () => {
    const { result } = renderHook(() => useUserDetailsModal());

    expect(result.current.isOpen).toBe(false);
    expect(result.current.selectedUserIndex).toBeNull();
  });

  it("should open modal with selected user index", () => {
    const { result } = renderHook(() => useUserDetailsModal());

    act(() => {
      result.current.openModal(1);
    });

    expect(result.current.isOpen).toBe(true);
    expect(result.current.selectedUserIndex).toBe(1);
  });

  it("should close modal", () => {
    const { result } = renderHook(() => useUserDetailsModal());

    act(() => {
      result.current.openModal(1);
    });

    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.closeModal();
    });

    expect(result.current.isOpen).toBe(false);
    // selectedUserIndex remains until new user is opened
    expect(result.current.selectedUserIndex).toBe(1);
  });

  it("should handle opening different indexes", () => {
    const { result } = renderHook(() => useUserDetailsModal());

    act(() => {
      result.current.openModal(1);
    });

    expect(result.current.selectedUserIndex).toBe(1);

    act(() => {
      result.current.openModal(2);
    });

    expect(result.current.selectedUserIndex).toBe(2);
    expect(result.current.isOpen).toBe(true);
  });
});
