import { UserCard } from "../UserCard/UserCard";
import { UserData } from "../../types/user";
import styles from "./UserGrid.module.css";

export interface UserGridProps {
  users: UserData[];
  onViewDetails: (user: UserData) => void;
}

export const UserGrid = ({ users, onViewDetails }: UserGridProps) => {
  return (
    <div className={styles.userGrid}>
      {users.map((user, index) => (
        <UserCard
          key={`${user.email}-${index}`}
          user={user}
          onViewDetails={() => onViewDetails(user)}
        />
      ))}
    </div>
  );
};
