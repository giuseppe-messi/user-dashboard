import styles from "./UserCard.module.css";

interface UserCardProps {
  name: string;
  role: string;
  badgeType: "admin" | "editor" | "viewer" | "guest" | "owner";
  team: string;
  email: string;
  onViewDetails: () => void;
}

export const UserCard = ({
  name,
  role,
  badgeType,
  team,
  email,
  onViewDetails
}: UserCardProps) => {
  return (
    <div className={`card ${styles.userCard}`}>
      <span className={`badge badge-${badgeType}`}>
        {badgeType.toUpperCase()}
      </span>

      <div className={styles.userInfo}>
        <h3 className={styles.userName}>{name}</h3>
        <p className={styles.userRole}>{role}</p>
      </div>

      <div className={styles.userDetails}>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Team:</span>
          <span className={styles.detailValue}>{team}</span>
        </div>
      </div>

      <div className={styles.contactInfo}>
        <span className={styles.contactLabel}>Contact information:</span>
        <a href={`mailto:${email}`} className={styles.contactEmail}>
          {email}
        </a>
      </div>

      <button className="button-m" onClick={onViewDetails}>
        View details
      </button>
    </div>
  );
};
