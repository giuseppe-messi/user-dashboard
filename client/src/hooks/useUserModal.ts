import { useState } from "react";
import { UserData } from "../types/user";

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
