import { vi } from "vitest";
import { useUsers } from "../../hooks/useUsers";
import { UserData } from "../../types/user";
import { useUserDetailsModal } from "../../hooks/useUserDetailsModal";

export const mockUser: UserData = {
  id: "1",
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  role: "ADMIN",
  position: "Software Engineer",
  team: "Frontend",
  details: "Senior frontend engineer working on React applications."
};

export const createUseUsersMock = (): ReturnType<typeof useUsers> => ({
  users: [],
  loading: false,
  error: null,
  hasSearchedOnce: false,
  page: 1,
  limit: 10,
  total: 0,
  totalPages: 0,
  hasMore: false,
  hasPrev: false,
  searchQuery: "",
  activeRoles: [],
  fetchUsers: vi.fn(async () => {}),
  nextPage: vi.fn(),
  prevPage: vi.fn(),
  setRoleFilters: vi.fn(),
  searchUsers: vi.fn(),
  resetFilters: vi.fn()
});

export const createuseUserDetailsModalMock = (): ReturnType<
  typeof useUserDetailsModal
> => ({
  selectedUserIndex: null,
  isOpen: false,
  openModal: vi.fn(),
  closeModal: vi.fn()
});
