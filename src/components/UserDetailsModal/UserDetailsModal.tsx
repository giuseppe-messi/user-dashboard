import { UserData } from "../../hooks/useUserModal";
import styles from "./UserDetailsModal.module.css";

interface UserDetailsModalProps {
  user: UserData;
  onClose: () => void;
}

export const UserDetailsModal = ({ user, onClose }: UserDetailsModalProps) => {
  return (
    <div className={styles.modalContent}>
      <span className={`badge badge-${user.badgeType}`}>
        {user.badgeType.toUpperCase()}
      </span>

      <div className={styles.userInfo}>
        <h2 className={styles.userName}>{user.name}</h2>
        <p className={styles.role}>{user.role}</p>
      </div>

      <div className={styles.detailRow}>
        <span className={styles.label}>Team:</span>
        <span className={styles.value}>{user.team}</span>
      </div>

      <div className={styles.detailRow}>
        <span className={styles.label}>Contact information:</span>
        <a href={`mailto:${user.email}`} className={styles.email}>
          {user.email}
        </a>
      </div>

      <div className={styles.detailRow}>
        <span className={styles.label}>Other details:</span>
        <p className={styles.otherDetails}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
      <button className={`button-m ${styles.closeButton}`} onClick={onClose}>
        Close
      </button>
    </div>
  );
};
