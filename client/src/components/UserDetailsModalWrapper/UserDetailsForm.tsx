import { UserData } from "../../types/user";
import styles from "./UserDetailsModal.module.css";
import { useUserRoles } from "../../hooks/useUserRoles";

export interface UserDetailsFormProps {
  user: UserData;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  onChange: (key: keyof UserData, value: string) => void;
}

export const UserDetailsForm = ({
  user,
  onSubmit,
  onCancel,
  onChange
}: UserDetailsFormProps) => {
  const { roles } = useUserRoles();

  return (
    <form className={styles.modalContent} onSubmit={onSubmit}>
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
          value={user.role}
          required
          onChange={(e) => onChange("role", e.target.value)}
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
          id="firstName"
          className="input"
          value={user.firstName}
          required
          onChange={(e) => onChange("firstName", e.target.value)}
        />
      </label>

      <label htmlFor="lastName" className={`label ${styles.inputLabel}`}>
        Last Name
        <input
          name="lastName"
          id="lastName"
          className="input"
          value={user.lastName}
          required
          onChange={(e) => onChange("lastName", e.target.value)}
        />
      </label>

      <label htmlFor="position" className={`label ${styles.inputLabel}`}>
        Position
        <input
          name="position"
          id="position"
          className="input"
          value={user.position}
          required
          onChange={(e) => onChange("position", e.target.value)}
        />
      </label>

      <label htmlFor="team" className={`label ${styles.inputLabel}`}>
        Team:
        <input
          name="team"
          id="team"
          className="input"
          value={user.team}
          required
          onChange={(e) => onChange("team", e.target.value)}
        />
      </label>

      <label htmlFor="email" className={`label ${styles.inputLabel}`}>
        Contact information:
        <input
          name="email"
          id="email"
          className="input"
          value={user.email}
          required
          type="email"
          onChange={(e) => onChange("email", e.target.value)}
        />
      </label>

      <label htmlFor="details" className={`label ${styles.inputLabel}`}>
        Other details:
        <textarea
          name="details"
          id="details"
          className="textarea"
          value={user.details}
          required
          onChange={(e) => onChange("details", e.target.value)}
        />
      </label>
    </form>
  );
};
