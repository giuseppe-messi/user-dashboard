import { useState } from "react";

export interface UserData {
  name: string;
  role: string;
  badgeType: "admin" | "editor" | "viewer" | "guest" | "owner";
  team: string;
  email: string;
}

export const useUserModal = () => {
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (user: UserData) => {
    setSelectedUser(user);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  return {
    selectedUser,
    isOpen,
    openModal,
    closeModal
  };
};
