import { useState } from "react";
import { UserData } from "../../types/user";
import { UserDetailsForm } from "./UserDetailsForm";

export interface UserDetailsEditProps {
  user: UserData;
  onSave: (user: UserData) => void;
  onCancel: () => void;
}

export const UserDetailsEdit = ({
  user,
  onSave,
  onCancel
}: UserDetailsEditProps) => {
  const [form, setForm] = useState<UserData>(user);

  const handleChange = (key: keyof UserData, value: string) =>
    setForm({ ...form, [key]: value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <UserDetailsForm
      user={form}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      onChange={handleChange}
    />
  );
};
