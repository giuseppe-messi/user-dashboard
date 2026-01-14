import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useUsers } from "../hooks/useUsers";
import { mockUser } from "../test/mocks/sharedMocks";
import { API_ENDPOINTS } from "../constants/api";

const mockResponse = {
  users: [mockUser],
  total: 1,
  skip: 0,
  limit: 10
};

describe("useUsers hook", () => {
  beforeEach(() => {
    vi.restoreAllMocks();

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse)
    }) as never;
  });

  it("should have initial state", () => {
    const { result } = renderHook(() => useUsers());

    expect(result.current.users).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.hasSearched).toBe(false);
    expect(result.current.page).toBe(1);
    expect(result.current.activeRole).toBeNull();
  });

  it("should fetch users successfully", async () => {
    const { result } = renderHook(() => useUsers());

    await act(async () => {
      await result.current.fetchUsers("");
    });

    expect(fetch).toHaveBeenCalled();
    expect(result.current.users[0].firstName).toBe("John");
    expect(result.current.total).toBe(1);
    expect(result.current.hasSearched).toBe(true);
    expect(result.current.loading).toBe(false);
  });

  it("should fetch using role filter endpoint", async () => {
    const { result } = renderHook(() => useUsers());

    await act(async () => {
      result.current.setFilterByTag("admin");
    });

    const calledUrl = (fetch as unknown as Mock).mock.calls[0][0];

    expect(calledUrl).toContain(API_ENDPOINTS.usersFilter);
    expect(result.current.activeRole).toBe("admin");
  });

  it("should clear role when searching", async () => {
    const { result } = renderHook(() => useUsers());

    await act(async () => {
      result.current.setFilterByTag("admin");
    });

    expect(result.current.activeRole).toBe("admin");

    await act(async () => {
      result.current.searchAndFetch("john");
    });

    expect(result.current.activeRole).toBeNull();
  });

  it("should reset filter and fetch all users", async () => {
    const { result } = renderHook(() => useUsers());

    await act(async () => {
      result.current.setFilterByTag("admin");
    });

    await act(async () => {
      result.current.resetAndFetch();
    });

    expect(result.current.activeRole).toBeNull();
    expect(result.current.page).toBe(1);
  });

  it("should go to next page", async () => {
    const { result } = renderHook(() => useUsers());

    await act(async () => {
      result.current.fetchUsers("");
    });

    await act(async () => {
      result.current.nextPage();
    });

    expect(result.current.page).toBe(2);
  });

  it("should go to previous page", async () => {
    const { result } = renderHook(() => useUsers());

    await act(async () => {
      result.current.fetchUsers("", 2);
    });

    await act(async () => {
      result.current.prevPage();
    });

    expect(result.current.page).toBe(1);
  });

  it("should set error when fetch throws a non-AbortError", async () => {
    const testError = new Error("Network failure");

    global.fetch = vi.fn().mockRejectedValue(testError) as never;

    const { result } = renderHook(() => useUsers());

    await act(async () => {
      result.current.fetchUsers("");
    });

    expect(result.current.error).toBe(testError);
    expect(result.current.loading).toBe(false);
  });
});
