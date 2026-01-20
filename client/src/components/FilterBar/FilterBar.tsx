import styles from "./FilterBar.module.css";
import { Role, useUserRoles } from "../../hooks/useUserRoles";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";

export interface FilterBarProps {
  activeRoles: Role[];
  onRoleFilters: (roles: Role[]) => void;
  onOpenCreateUserModal: () => void;
}

export const FilterBar = ({
  activeRoles,
  onRoleFilters,
  onOpenCreateUserModal
}: FilterBarProps) => {
  const { roles, loading, error } = useUserRoles();

  const handleRoleClick = (role: Role) => {
    const isActive = activeRoles.includes(role);

    const nextRoles = isActive
      ? activeRoles.filter((r) => r !== role)
      : [...activeRoles, role];

    onRoleFilters(nextRoles);
  };

  if (loading) {
    return <LoadingSpinner size="sm" centered />;
  }

  if (error) {
    return <div>Error loading filters</div>;
  }

  return (
    <div className={styles.filterBar}>
      <div className={styles.badgesContainer}>
        <span className={`${styles.filterLabel} label`}>FILTER BY:</span>
        <div className={styles.filterButtons}>
          {roles.map((role) => (
            <button
              type="button"
              key={role}
              className={`badge badge-${role.toLowerCase()} ${
                styles.filterButton
              } ${activeRoles?.includes(role) ? styles.active : ""}`}
              onClick={() => handleRoleClick(role)}
              aria-pressed={activeRoles?.includes(role)}
            >
              {role.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <button className="button button-m" onClick={onOpenCreateUserModal}>
        Add User
      </button>
    </div>
  );
};
