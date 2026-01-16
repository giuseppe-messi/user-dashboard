import { UserData } from "../../types/user";
import styles from "./UserDetailsModal.module.css";

export interface UserDetailsModalProps {
  user: UserData;
  onClose: () => void;
  onNextUser: () => void;
  onPrevUser: () => void;
  hasNextUser?: boolean;
  hasPrevUser?: boolean;
}

export const UserDetailsModal = ({
  user,
  onClose,
  onNextUser,
  onPrevUser,
  hasNextUser,
  hasPrevUser
}: UserDetailsModalProps) => {
  return (
    <div className={styles.modalContent}>
      <div className={styles.wrapCloseButtonBadge}>
        <span className={`badge badge-${user.role.toLowerCase()}`}>
          {user.role}
        </span>
        <button
          type="button"
          className={`button-m ${styles.closeButton}`}
          onClick={onClose}
        >
          <span>⤫</span>
        </button>
      </div>

      <div className={styles.userInfo}>
        <h2 className={styles.userName}>
          {user.firstName} {user.lastName}
        </h2>
        <p className={styles.role}>{user.position}</p>
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
        <p className={styles.otherDetails}>{user.details}</p>
      </div>
      <div className={styles.wrapCTAs}>
        <button
          className="button-m"
          onClick={onPrevUser}
          disabled={!hasPrevUser}
        >
          Prev
        </button>
        <button
          className="button-m"
          onClick={onNextUser}
          disabled={!hasNextUser}
        >
          Next
        </button>
      </div>
    </div>
  );
};
