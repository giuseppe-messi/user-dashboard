import styles from "./UserCard.module.css";
import { UserData } from "../../types/user";
import { truncateText } from "../../utils/textUtils";

interface UserCardProps {
  user: UserData;
  onViewDetails: () => void;
}

export const UserCard = ({ user, onViewDetails }: UserCardProps) => {
  const fullName = `${user.firstName} ${user.lastName}`;
  const truncatedName = truncateText(fullName, 15);
  const truncatedRole = truncateText(user.company.title, 26);
  const truncatedEmail = truncateText(user.email, 31);

  return (
    <div className={`card ${styles.userCard}`}>
      <span className={`badge badge-${user.badgeType}`}>
        {user.badgeType?.toUpperCase()}
      </span>

      <div className={styles.userInfo}>
        <h3 className={styles.userName}>{truncatedName}</h3>
        <p className={styles.userRole}>{truncatedRole}</p>
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

      <button className="button-m" onClick={onViewDetails}>
        View details
      </button>
    </div>
  );
};
