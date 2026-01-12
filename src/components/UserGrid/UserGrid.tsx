import { UserCard } from "../UserCard/UserCard";
import { UserData } from "../../hooks/useUserModal";
import styles from "./UserGrid.module.css";

interface UserGridProps {
  onViewDetails: (user: UserData) => void;
}

export const UserGrid = ({ onViewDetails }: UserGridProps) => {
  const users: UserData[] = [
    {
      name: "George Harris",
      role: "Software Engineer",
      badgeType: "admin",
      team: "Security",
      email: "george.harris@example.com"
    },
    {
      name: "Arianna Russo",
      role: "Product Designer",
      badgeType: "editor",
      team: "Website",
      email: "arianna.russo@example.com"
    },
    {
      name: "Marco Esposito",
      role: "Software Engineer",
      badgeType: "viewer",
      team: "Finance",
      email: "marco.esposito@example.com"
    },
    {
      name: "Sarah Williams",
      role: "Product Designer",
      badgeType: "guest",
      team: "Faculty",
      email: "sarah.williams@example.com"
    }
  ];

  return (
    <div className={styles.userGrid}>
      {users.map((user, index) => (
        <UserCard
          key={`${user.email}-${index}`}
          {...user}
          onViewDetails={() => onViewDetails(user)}
        />
      ))}
    </div>
  );
};
