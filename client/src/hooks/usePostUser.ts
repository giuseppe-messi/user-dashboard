import { useRef, useState } from "react";
import { UserData } from "../types/user";
import { useToastersStore } from "@react-lab-mono/ui";
import { api } from "../api/baseApi";

export const usePostUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { enQueueToast } = useToastersStore();
  const abortRef = useRef<AbortController | null>(null);

  const createUser = async (user: UserData) => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError(null);

    try {
      await api.post(`/users`, user, { signal: controller.signal });

      if (controller.signal.aborted) return;

      enQueueToast("sucess", "User created successfully!");
    } catch (err) {
      if (err instanceof Error && err.name !== "AbortError") {
        setError(err as Error);
        enQueueToast("error", "Something went wrong creating the user!");
      }
    } finally {
      if (!controller.signal.aborted) {
        setLoading(false);
      }
    }
  };

  return { createUser, loading, error };
};
