import { useRef, useState } from "react";
import { UserData } from "../types/user";
import { useToastersStore } from "@react-lab-mono/ui";
import { api } from "../api/baseApi";

export const useUpdateUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { enQueueToast } = useToastersStore();
  const abortRef = useRef<AbortController | null>(null);

  const updateUser = async (user: UserData) => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError(null);

    try {
      await api.put(`/users/${user.id}`, user, { signal: controller.signal });

      if (controller.signal.aborted) return;

      enQueueToast("sucess", "User updated successfully!");
    } catch (err) {
      if (err instanceof Error && err.name !== "AbortError") {
        setError(err as Error);
        enQueueToast("error", "Something went wrong updating the user!");
      }
    } finally {
      if (!controller.signal.aborted) {
        setLoading(false);
      }
    }
  };

  return { updateUser, loading, error };
};
