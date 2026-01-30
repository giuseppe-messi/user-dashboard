import { useState } from "react";
import { UserData } from "../../types/user";
import { UserDetailsView } from "./UserDetailsView";
import { UserDetailsEdit } from "./UserDetailsEdit";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";

export interface UserDetailsModalWrapperProps {
  user: UserData;
  onClose: () => void;
  onNextUser: () => void;
  onPrevUser: () => void;
  hasNextUser?: boolean;
  hasPrevUser?: boolean;
  onSaveUser: (user: UserData) => void;
  onDeleteUser: (id: string) => void;
  onLoading?: boolean;
}

export const UserDetailsModalWrapper = ({
  user,
  onClose,
  onNextUser,
  onPrevUser,
  hasNextUser,
  hasPrevUser,
  onSaveUser,
  onDeleteUser,
  onLoading
}: UserDetailsModalWrapperProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (updated: UserData) => {
    onSaveUser(updated);
    setIsEditing(false);
  };

  const handleDelete = (id: string) => {
    onDeleteUser(id);
    setIsEditing(false);
    onClose();
  };

  if (onLoading) {
    return <LoadingSpinner centered />;
  }

  return isEditing ? (
    <UserDetailsEdit
      user={user}
      onCancel={() => setIsEditing(false)}
      onSave={handleSave}
    />
  ) : (
    <UserDetailsView
      user={user}
      onClose={onClose}
      onNextUser={onNextUser}
      onPrevUser={onPrevUser}
      hasNextUser={hasNextUser}
      hasPrevUser={hasPrevUser}
      onEdit={() => setIsEditing(true)}
      onDelete={handleDelete}
    />
  );
};
