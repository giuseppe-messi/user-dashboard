import { useFetch } from "./useFetch";
import { API_ENDPOINTS } from "../constants/api";
import { UserData } from "../types/user";
import { mapRoleToBadge } from "../utils/roleMapper";

interface DummyJSONResponse {
  users: UserData[];
  total: number;
  skip: number;
  limit: number;
}

export const useUsers = (searchQuery: string) => {
  const { data, loading, error } = useFetch<DummyJSONResponse>(
    API_ENDPOINTS.users,
    { q: searchQuery }
  );

  // Map API roles to badge types
  const usersWithBadges =
    data?.users.map((user) => ({
      ...user,
      badgeType: mapRoleToBadge(user.role)
    })) || [];

  return {
    users: usersWithBadges,
    loading,
    error
  };
};
