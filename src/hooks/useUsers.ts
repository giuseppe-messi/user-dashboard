import { API_ENDPOINTS } from "../constants/api";
import { BadgeType, UserData } from "../types/user";
import { mapBadgeToRole, mapRoleToBadge } from "../utils/roleMapper";
import { buildQueryString } from "../utils/queryString";
import { useRef, useState } from "react";

interface DummyJSONResponse {
  users: UserData[];
  total: number;
  skip: number;
  limit: number;
}

const PAGE_SIZE = 10;

const cache = new Map<string, DummyJSONResponse>();

export const useUsers = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [lastQuery, setLastQuery] = useState("");
  const [activeRole, setActiveRole] = useState<BadgeType | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const fetchUsers = async (
    query: string,
    pageNumber = 1,
    roleFilter: BadgeType | null = activeRole
  ) => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setHasSearched(true);
    setLoading(true);
    setError(null);
    setLastQuery(query);
    setPage(pageNumber);

    const skip = (pageNumber - 1) * PAGE_SIZE;

    try {
      const baseUrl = roleFilter
        ? API_ENDPOINTS.usersFilter
        : API_ENDPOINTS.users;

      const url =
        baseUrl +
        buildQueryString(
          roleFilter
            ? {
                key: "role",
                value: mapBadgeToRole(roleFilter),
                limit: PAGE_SIZE,
                skip
              }
            : { q: query, limit: PAGE_SIZE, skip }
        );

      // check cache first
      const cached = cache.get(url);

      if (cached) {
        setTotal(cached.total);
        setUsers(cached.users);
        setLoading(false);
        return;
      }

      const res = await fetch(url, { signal: controller.signal });
      if (!res.ok) throw new Error(res.statusText);

      const data: DummyJSONResponse = await res.json();

      // Map API roles to badge types
      const usersWithBadges =
        data?.users.map((user) => ({
          ...user,
          badgeType: mapRoleToBadge(user.role)
        })) || [];

      setUsers(usersWithBadges);
      setTotal(data.total);
      cache.set(url, { ...data, users: usersWithBadges });
    } catch (e: unknown) {
      if (e instanceof Error && e.name !== "AbortError") {
        setError(e);
      }
    } finally {
      if (!controller.signal.aborted) {
        setLoading(false);
      }
    }
  };

  const nextPage = () => fetchUsers(lastQuery, page + 1, activeRole);
  const prevPage = () => fetchUsers(lastQuery, page - 1, activeRole);

  const setFilterByTag = (tag: BadgeType) => {
    setActiveRole(tag);
    fetchUsers(lastQuery, 1, tag);
  };

  const resetAndFetch = () => {
    setActiveRole(null);
    fetchUsers("", 1, null);
  };

  const searchAndFetch = (query: string) => {
    setActiveRole(null);
    fetchUsers(query, 1, null);
  };

  return {
    users,
    loading,
    error,
    hasSearched,
    page,
    total,
    fetchUsers,
    nextPage,
    prevPage,
    activeRole,
    setFilterByTag,
    resetAndFetch,
    searchAndFetch
  };
};
