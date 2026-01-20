import { vi, type Mock } from "vitest";
import { api } from "../api/baseApi";
import { renderHook, waitFor } from "@testing-library/react";
import { useDeleteUser } from "./useDeleteUser";
import { mockUser } from "../test/mocks/sharedMocks";
import { useToastersStore } from "@react-lab-mono/ui";

vi.mock("@react-lab-mono/ui", () => ({
  useToastersStore: vi.fn()
}));

describe("useDeleteUser hook", () => {
  const toastSpy = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    (useToastersStore as unknown as Mock).mockReturnValue({
      enQueueToast: toastSpy
    });
  });

  it("deletes user successfully", async () => {
    vi.spyOn(api, "delete").mockResolvedValueOnce({});

    const { result } = renderHook(() => useDeleteUser());

    await result.current.deleteUser(mockUser.id);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(api.delete).toHaveBeenCalledWith(
      `/users/${mockUser.id}`,
      expect.any(Object)
    );

    expect(toastSpy).toHaveBeenCalledWith(
      "sucess",
      "User deleted successfully!"
    );

    expect(result.current.error).toBeNull();
  });

  it("handles non-abort error", async () => {
    vi.spyOn(api, "delete").mockRejectedValueOnce(new Error("Boom"));

    const { result } = renderHook(() => useDeleteUser());

    await result.current.deleteUser(mockUser.id);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await waitFor(() => {
      expect(result.current.error).toBeInstanceOf(Error);
    });

    expect(toastSpy).toHaveBeenCalledWith(
      "error",
      "Something went wrong deleting the user!"
    );
  });

  it("ignores AbortError", async () => {
    const abortErr = new DOMException("Aborted", "AbortError");
    vi.spyOn(api, "delete").mockRejectedValueOnce(abortErr);

    const { result } = renderHook(() => useDeleteUser());

    await result.current.deleteUser(mockUser.id);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBeNull();
    expect(toastSpy).not.toHaveBeenCalled();
  });

  it("aborts previous request when a new delete starts", async () => {
    let resolveFirst!: () => void;

    const firstPromise = new Promise<void>((res) => {
      resolveFirst = res;
    });

    vi.spyOn(api, "delete")
      .mockReturnValueOnce(firstPromise)
      .mockResolvedValueOnce({});

    const { result } = renderHook(() => useDeleteUser());

    const p1 = result.current.deleteUser(mockUser.id);
    const p2 = result.current.deleteUser(mockUser.id);

    await p2;
    resolveFirst();
    await p1;

    // only second call should toast
    expect(toastSpy).toHaveBeenCalledTimes(1);
  });
});
