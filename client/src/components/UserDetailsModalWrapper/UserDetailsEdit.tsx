import { useState } from "react";
import { UserData } from "../../types/user";
import styles from "./UserDetailsModal.module.css";
import { useUserRoles } from "../../hooks/useUserRoles";

interface Props {
  user: UserData;
  onSave: (user: UserData) => void;
  onCancel: () => void;
}

export const UserDetailsEdit = ({ user, onSave, onCancel }: Props) => {
  const [form, setForm] = useState<UserData>(user);
  const { roles } = useUserRoles();

  const handleChange = (key: keyof UserData, value: string) =>
    setForm({ ...form, [key]: value });

  return (
    <form
      className={styles.modalContent}
      onSubmit={(e) => {
        e.preventDefault();
        console.log("form:", form);
        onSave(form);
      }}
    >
      <div className={styles.editingWrapCloseButtonBadge}>
        <div className={styles.editRow}>
          <button type="submit" className="button button-s">
            Save
          </button>
          <button type="button" className="button button-s" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>

      <label htmlFor="role" className={`label ${styles.selectLabel}`}>
        Role:
        <select
          name="role"
          className="select"
          id="role"
          value={form.role}
          onChange={(e) => handleChange("role", e.target.value)}
        >
          {roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </label>

      <label htmlFor="firstName" className={`label ${styles.inputLabel}`}>
        First Name
        <input
          name="firstName"
          className="input"
          value={form.firstName}
          onChange={(e) => handleChange("firstName", e.target.value)}
        />
      </label>

      <label htmlFor="lastName" className={`label ${styles.inputLabel}`}>
        Last Name
        <input
          name="lastName"
          className="input"
          value={form.lastName}
          onChange={(e) => handleChange("lastName", e.target.value)}
        />
      </label>

      <label htmlFor="position" className={`label ${styles.inputLabel}`}>
        Position
        <input
          name="position"
          className="input"
          value={form.position}
          onChange={(e) => handleChange("position", e.target.value)}
        />
      </label>

      <label htmlFor="team" className={`label ${styles.inputLabel}`}>
        Team:
        <input
          name="team"
          className="input"
          value={form.team}
          onChange={(e) => handleChange("team", e.target.value)}
        />
      </label>

      <label htmlFor="email" className={`label ${styles.inputLabel}`}>
        Contact information:
        <input
          name="email"
          className="input"
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
      </label>

      <label htmlFor="details" className={`label ${styles.inputLabel}`}>
        Other details:
        <textarea
          name="details"
          className="textarea"
          value={form.details}
          onChange={(e) => handleChange("details", e.target.value)}
        />
      </label>
    </form>
  );
};
