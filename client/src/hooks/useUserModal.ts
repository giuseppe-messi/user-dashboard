import { useState } from "react";

export const useUserModal = () => {
  const [selectedUserIndex, setSelectedUserIndex] = useState<number | null>(
    null
  );
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (userIndex: number) => {
    setSelectedUserIndex(userIndex);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  return {
    selectedUserIndex,
    isOpen,
    openModal,
    closeModal
  };
};
