import styles from "./UserCard.module.css";
import { UserData } from "../../types/user";
import { truncateText } from "../../utils/textUtils";

export interface UserCardProps {
  user: UserData;
  onViewDetails: () => void;
}

export const UserCard = ({ user, onViewDetails }: UserCardProps) => {
  const fullName = `${user.firstName} ${user.lastName}`;
  const truncatedName = truncateText(fullName, 14);
  const truncatedPosition = truncateText(user.position, 24);
  const truncatedEmail = truncateText(user.email, 30);

  return (
    <article className={`card ${styles.userCard}`}>
      <span className={`badge badge-${user.role.toLowerCase()}`}>
        {user.role}
      </span>

      <div className={styles.userInfo}>
        <h3 className={styles.userName}>{truncatedName}</h3>
        <p className={styles.userRole}>{truncatedPosition}</p>
      </div>

      <div className={styles.userDetails}>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Team:</span>
          <span className={styles.detailValue}>{user.team}</span>
        </div>
      </div>

      <div className={styles.contactInfo}>
        <span className={styles.contactLabel}>Contact information:</span>
        <a href={`mailto:${user.email}`} className={styles.contactEmail}>
          {truncatedEmail}
        </a>
      </div>

      <button type="button" className="button-m" onClick={onViewDetails}>
        View details
      </button>
    </article>
  );
};
