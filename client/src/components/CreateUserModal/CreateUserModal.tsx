import { useState } from "react";
import { UserData } from "../../types/user";
import { UserDetailsForm } from "../UserDetailsModalWrapper/UserDetailsForm";

interface CreateUserModalProps {
  onCreateUser: (user: UserData) => Promise<void>;
  onCancel: () => void;
}

export const CreateUserModal = ({
  onCreateUser,
  onCancel
}: CreateUserModalProps) => {
  const [form, setForm] = useState<UserData>({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    role: "GUEST"
  } as UserData);

  const handleChange = (key: keyof UserData, value: string) =>
    setForm({ ...form, [key]: value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateUser(form);
    onCancel();
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
