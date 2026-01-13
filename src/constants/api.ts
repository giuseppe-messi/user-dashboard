export const API_BASE_URL = "https://dummyjson.com";

export const API_ENDPOINTS = {
  users: `${API_BASE_URL}/users/search`,
  usersFilter: `${API_BASE_URL}/users/filter`
} as const;
