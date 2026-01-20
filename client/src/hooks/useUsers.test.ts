import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useUsers } from "../hooks/useUsers";
import { mockUser } from "../test/mocks/sharedMocks";
import { api } from "../api/baseApi";

const mockApiResponse = {
  data: [mockUser],
  pagination: {
    total: 1,
    page: 1,
    limit: 10,
    skip: 0,
    totalPages: 1,
    hasMore: true,
    hasPrev: false
  }
};

describe("useUsers hook", () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.restoreAllMocks();
  });

  it("fetches users", async () => {
    vi.spyOn(api, "get").mockResolvedValue({ data: mockApiResponse });

    const { result } = renderHook(() => useUsers());

    await act(async () => result.current.fetchUsers());

    expect(result.current.users).toEqual([mockUser]);
    expect(result.current.total).toBe(1);
    expect(result.current.loading).toBe(false);
  });

  it("handles non-abort error", async () => {
    vi.spyOn(api, "get").mockRejectedValue(new Error("Boom"));

    const { result } = renderHook(() => useUsers());

    await act(async () => result.current.fetchUsers());

    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.users).toEqual([]);
    expect(result.current.total).toBe(0);
  });

  it("ignores AbortError", async () => {
    vi.spyOn(api, "get").mockRejectedValue(
      new DOMException("Aborted", "AbortError")
    );

    const { result } = renderHook(() => useUsers());

    await act(async () => result.current.fetchUsers());

    expect(result.current.error).toBeNull();
  });
  it("ignores response resolved after abort", async () => {
    const mockApiResponse2 = {
      ...mockApiResponse,
      data: [{ ...mockUser, id: "2" }]
    };

    let resolveFirst: (v: { data: typeof mockApiResponse }) => void;

    const firstPromise = new Promise<{ data: typeof mockApiResponse }>(
      (res) => {
        resolveFirst = res;
      }
    );

    vi.spyOn(api, "get")
      .mockReturnValueOnce(firstPromise) // first request hangs
      .mockResolvedValueOnce({ data: mockApiResponse2 }); // second request completes

    const { result } = renderHook(() => useUsers());

    // Start request 1 and keep its promise so we can await it later
    let firstFetchPromise: Promise<void>;
    act(() => {
      firstFetchPromise = result.current.fetchUsers();
    });

    // Start request 2, this aborts request 1
    await act(async () => {
      await result.current.fetchUsers();
    });

    // Now resolve request 1 AFTER it has been aborted
    await act(async () => {
      resolveFirst({ data: mockApiResponse });
    });

    // wait for the first fetchUsers() chain to fully finish
    await act(async () => {
      await firstFetchPromise;
    });

    // Second response should win, proving aborted response was ignored
    expect(result.current.users).toEqual(mockApiResponse2.data);
  });

  it("handles pagination", async () => {
    vi.spyOn(api, "get").mockResolvedValue({ data: mockApiResponse });

    const { result } = renderHook(() => useUsers());

    await act(async () => result.current.fetchUsers());
    await act(async () => result.current.nextPage());

    expect(api.get).toHaveBeenCalledTimes(2);
  });

  it("handles prev page", async () => {
    vi.spyOn(api, "get").mockResolvedValue({
      data: {
        ...mockApiResponse,
        pagination: { ...mockApiResponse.pagination, hasPrev: true }
      }
    });

    const { result } = renderHook(() => useUsers());

    await act(async () => result.current.fetchUsers({ page: 2 }));
    await act(async () => result.current.prevPage());

    expect(api.get).toHaveBeenCalledTimes(2);
  });

  it("handles filters and search", async () => {
    vi.spyOn(api, "get").mockResolvedValue({ data: mockApiResponse });

    const { result } = renderHook(() => useUsers());

    await act(async () => {
      result.current.setRoleFilters(["ADMIN"]);
      result.current.searchUsers("john");
      result.current.resetFilters();
    });

    expect(api.get).toHaveBeenCalled();
  });

  it("builds query params", async () => {
    const spy = vi
      .spyOn(api, "get")
      .mockResolvedValue({ data: mockApiResponse });

    const { result } = renderHook(() => useUsers());

    await act(async () =>
      result.current.fetchUsers({ search: "john", roles: ["ADMIN"] })
    );

    const url = spy.mock.calls[0][0];
    expect(url).toContain("search=john");
    expect(url).toContain("roles=ADMIN");
  });
});
