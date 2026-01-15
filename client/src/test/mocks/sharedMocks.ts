import { vi } from "vitest";
import { useUserModal } from "../../hooks/useUserModal";
import { useUsers } from "../../hooks/useUsers";
import { UserData } from "../../types/user";

export const mockUser: UserData = {
  firstName: "John",
  lastName: "Doe",
  age: 30,
  gender: "male",
  birthDate: "1994-01-01",
  height: 180,
  weight: 75,
  eyeColor: "blue",
  hair: { color: "Brown", type: "Straight" },
  university: "MIT",
  company: {
    title: "Software Engineer",
    name: "Tech Corp",
    department: "Engineering"
  },
  address: {
    city: "San Francisco",
    state: "CA",
    country: "USA"
  },
  crypto: {
    coin: "Bitcoin",
    network: "Ethereum"
  },
  email: "john@example.com",
  role: "admin",
  team: "Frontend",
  badgeType: "admin"
};

export const createUseUsersMock = (): ReturnType<typeof useUsers> => ({
  users: [],
  loading: false,
  error: null,
  hasSearched: false,
  page: 1,
  total: 0,
  activeRole: null,
  fetchUsers: vi.fn(async () => {}),
  nextPage: vi.fn(),
  prevPage: vi.fn(),
  setFilterByTag: vi.fn(),
  resetAndFetch: vi.fn(),
  searchAndFetch: vi.fn()
});

export const createUseUserModalMock = (): ReturnType<typeof useUserModal> => ({
  selectedUser: null,
  isOpen: false,
  openModal: vi.fn(),
  closeModal: vi.fn()
});
