import { vi, type Mock } from "vitest";
import { api } from "../api/baseApi";
import { renderHook, waitFor } from "@testing-library/react";
import { useUpdateUser } from "./useUpdateUser";
import { mockUser } from "../test/mocks/sharedMocks";
import { useToastersStore } from "@react-lab-mono/ui";

vi.mock("@react-lab-mono/ui", () => ({
  useToastersStore: vi.fn()
}));

describe("useUpdateUser hook", () => {
  const toastSpy = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    (useToastersStore as unknown as Mock).mockReturnValue({
      enQueueToast: toastSpy
    });
  });

  it("updates user successfully", async () => {
    vi.spyOn(api, "put").mockResolvedValueOnce({});

    const { result } = renderHook(() => useUpdateUser());

    await result.current.updateUser(mockUser);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(api.put).toHaveBeenCalledWith(
      `/users/${mockUser.id}`,
      mockUser,
      expect.any(Object)
    );

    expect(toastSpy).toHaveBeenCalledWith(
      "sucess",
      "User updated successfully!"
    );

    expect(result.current.error).toBeNull();
  });

  it("handles non-abort error", async () => {
    vi.spyOn(api, "put").mockRejectedValueOnce(new Error("Boom"));

    const { result } = renderHook(() => useUpdateUser());

    await result.current.updateUser(mockUser);

    await waitFor(() => {
      expect(result.current.error).toBeInstanceOf(Error);
    });

    expect(toastSpy).toHaveBeenCalledWith(
      "error",
      "Something went wrong updating the user!"
    );
  });

  it("ignores AbortError", async () => {
    vi.spyOn(api, "put").mockRejectedValueOnce(
      new DOMException("Aborted", "AbortError")
    );

    const { result } = renderHook(() => useUpdateUser());

    await result.current.updateUser(mockUser);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBeNull();
    expect(toastSpy).not.toHaveBeenCalled();
  });

  it("aborts previous request when a new update starts", async () => {
    let resolveFirst!: () => void;

    const firstPromise = new Promise<void>((res) => {
      resolveFirst = res;
    });

    vi.spyOn(api, "put")
      .mockReturnValueOnce(firstPromise as Promise<unknown>)
      .mockResolvedValueOnce({});

    const { result } = renderHook(() => useUpdateUser());

    const p1 = result.current.updateUser(mockUser);
    const p2 = result.current.updateUser(mockUser);

    await p2;
    resolveFirst();
    await p1;

    // only second call should toast
    expect(toastSpy).toHaveBeenCalledTimes(1);
  });
});
