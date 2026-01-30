import { UserData } from "../types/user";
import { useEffect, useRef, useState } from "react";
import { api } from "../api/baseApi";
import { Role } from "./useUserRoles";

interface APIResponse {
  data: UserData[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    skip: number;
    totalPages: number;
    hasMore: boolean;
    hasPrev: boolean;
  };
}

interface FetchUsersParams {
  search?: string;
  roles?: Role[];
  page?: number;
  limit?: number;
}

const DEFAULT_LIMIT = 10;

// export const cache = new Map<string, APIResponse>();

export const useUsers = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(DEFAULT_LIMIT);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeRoles, setActiveRoles] = useState<Role[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const applyResponse = (response: APIResponse) => {
    setUsers(response.data);
    setTotal(response.pagination.total);
    setTotalPages(response.pagination.totalPages);
    setHasMore(response.pagination.hasMore);
    setHasPrev(response.pagination.hasPrev);
  };

  const fetchUsers = async (params?: FetchUsersParams) => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    // use current state if no new params, this allows partial updates
    const search = params?.search !== undefined ? params.search : searchQuery;
    const roles = params?.roles !== undefined ? params.roles : activeRoles;
    const pageNum = params?.page !== undefined ? params.page : page;
    const pageLimit = params?.limit !== undefined ? params.limit : limit;

    setLoading(true);
    setError(null);
    setSearchQuery(search);
    setActiveRoles(roles);
    setPage(pageNum);
    setLimit(pageLimit);

    try {
      // Build query params
      const queryParams = new URLSearchParams();
      if (search) queryParams.append("search", search);

      if (roles?.length) {
        queryParams.append("roles", roles.join(","));
      }
      queryParams.append("page", pageNum.toString());
      queryParams.append("limit", pageLimit.toString());

      const url = `/users?${queryParams.toString()}`;

      // Check cache first
      // const cached = cache.get(url);
      // if (cached) {
      //   applyResponse(cached);
      //   setLoading(false);
      //   return;
      // }

      const { data: response } = await api.get<APIResponse>(url, {
        signal: controller.signal
      });

      if (controller.signal.aborted) return;

      applyResponse(response);

      // Cache the result
      // cache.set(url, response);
    } catch (e: unknown) {
      if (controller.signal.aborted) return;

      setError(e as Error);
      setUsers([]);
      setTotal(0);
    } finally {
      if (!controller.signal.aborted) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Prevent state updates after unmounting
  useEffect(() => {
    return () => {
      abortRef.current?.abort();
    };
  }, []);

  const nextPage = () => {
    if (hasMore) {
      fetchUsers({ page: page + 1 });
    }
  };

  const prevPage = () => {
    if (hasPrev) {
      fetchUsers({ page: page - 1 });
    }
  };

  const setRoleFilters = (roles: Role[]) => {
    fetchUsers({ roles, page: 1 });
  };

  const searchUsers = (search: string) => {
    fetchUsers({ search, page: 1 });
  };

  const resetFilters = () => {
    fetchUsers({
      search: "",
      roles: [],
      page: 1
    });
  };

  return {
    users,
    loading,
    error,
    page,
    limit,
    total,
    totalPages,
    hasMore,
    hasPrev,
    searchQuery,
    activeRoles,
    fetchUsers,
    nextPage,
    prevPage,
    setRoleFilters,
    searchUsers,
    resetFilters
  };
};
