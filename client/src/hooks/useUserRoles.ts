import { useEffect, useState } from "react";
import { api } from "../api/baseApi";

export const ROLES = ["OWNER", "ADMIN", "EDITOR", "VIEWER", "GUEST"] as const;

export type Role = (typeof ROLES)[number];

interface APIResponse {
  roles: Role[];
}

export const useUserRoles = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchRoles = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await api.get<APIResponse>("/roles");
        setRoles(data.roles);
        setLoading(false);
      } catch (err) {
        setError(err as Error);
        setLoading(false);
      }
    };
    fetchRoles();
  }, []);

  return {
    roles,
    loading,
    error
  };
};
