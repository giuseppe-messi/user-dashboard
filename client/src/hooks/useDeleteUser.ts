import { useToastersStore } from "@react-lab-mono/ui";
import { useRef, useState } from "react";
import { api } from "../api/baseApi";

export const useDeleteUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { enQueueToast } = useToastersStore();
  const abortRef = useRef<AbortController | null>(null);

  const deleteUser = async (id: string) => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError(null);

    try {
      await api.delete(`/users/${id}`, { signal: controller.signal });

      if (controller.signal.aborted) return;

      enQueueToast("sucess", "User deleted successfully!");
    } catch (err) {
      if (err instanceof Error && err.name !== "AbortError") {
        setError(err as Error);
        enQueueToast("error", "Something went wrong deleting the user!");
      }
    } finally {
      if (!controller.signal.aborted) {
        setLoading(false);
      }
    }
  };

  return { deleteUser, loading, error };
};
