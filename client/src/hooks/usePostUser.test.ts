import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { usePostUser } from "./usePostUser";
import { api } from "../api/baseApi";
import { mockUser } from "../test/mocks/sharedMocks";

const mockToast = vi.fn();

vi.mock("@react-lab-mono/ui", () => ({
  useToastersStore: () => ({
    enQueueToast: mockToast
  })
}));

describe("usePostUser hook", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    mockToast.mockClear();
  });

  it("creates user successfully", async () => {
    const spy = vi.spyOn(api, "post").mockResolvedValueOnce({});

    const { result } = renderHook(() => usePostUser());

    await act(async () => {
      await result.current.createUser(mockUser);
    });

    expect(spy).toHaveBeenCalledWith(
      "/users",
      mockUser,
      expect.objectContaining({ signal: expect.any(AbortSignal) })
    );

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it("sets error when api fails", async () => {
    const err = new Error("fail");
    vi.spyOn(api, "post").mockRejectedValueOnce(err);

    const { result } = renderHook(() => usePostUser());

    await act(async () => {
      await result.current.createUser(mockUser);
    });

    expect(result.current.error).toBe(err);
    expect(result.current.loading).toBe(false);
  });

  it("aborts previous request when a new create starts", async () => {
    let resolveFirst!: () => void;

    const firstPromise = new Promise<void>((res) => {
      resolveFirst = res;
    });

    vi.spyOn(api, "post")
      .mockReturnValueOnce(firstPromise)
      .mockResolvedValueOnce({});

    const { result } = renderHook(() => usePostUser());

    const p1 = result.current.createUser(mockUser);
    const p2 = result.current.createUser(mockUser);

    await p2;
    resolveFirst();
    await p1;

    const successToasts = mockToast.mock.calls.filter(
      ([type]) => type === "sucess"
    );

    expect(successToasts).toHaveLength(1);
  });
});
