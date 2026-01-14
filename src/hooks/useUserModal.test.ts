import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useUserModal } from "./useUserModal";
import { mockUser } from "../test/mocks/sharedMocks";

describe("useUserModal", () => {
  it("should initialize with closed modal and no user", () => {
    const { result } = renderHook(() => useUserModal());

    expect(result.current.isOpen).toBe(false);
    expect(result.current.selectedUser).toBeNull();
  });

  it("should open modal with selected user", () => {
    const { result } = renderHook(() => useUserModal());

    act(() => {
      result.current.openModal(mockUser);
    });

    expect(result.current.isOpen).toBe(true);
    expect(result.current.selectedUser).toEqual(mockUser);
  });

  it("should close modal", () => {
    const { result } = renderHook(() => useUserModal());

    act(() => {
      result.current.openModal(mockUser);
    });

    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.closeModal();
    });

    expect(result.current.isOpen).toBe(false);
    // selectedUser remains until new user is opened
    expect(result.current.selectedUser).toEqual(mockUser);
  });

  it("should handle opening different users", () => {
    const { result } = renderHook(() => useUserModal());

    const user1 = { ...mockUser, firstName: "Alice" };
    const user2 = { ...mockUser, firstName: "Bob" };

    act(() => {
      result.current.openModal(user1);
    });

    expect(result.current.selectedUser?.firstName).toBe("Alice");

    act(() => {
      result.current.openModal(user2);
    });

    expect(result.current.selectedUser?.firstName).toBe("Bob");
    expect(result.current.isOpen).toBe(true);
  });
});
