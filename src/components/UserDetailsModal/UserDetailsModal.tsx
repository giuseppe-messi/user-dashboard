import { UserData } from "../../types/user";
import { buildOtherDetailsText } from "../../utils/textUtils";
import styles from "./UserDetailsModal.module.css";

export interface UserDetailsModalProps {
  user: UserData;
  onClose: () => void;
}

export const UserDetailsModal = ({ user, onClose }: UserDetailsModalProps) => {
  return (
    <div className={styles.modalContent}>
      <span className={`badge badge-${user.badgeType}`}>
        {user.badgeType?.toUpperCase()}
      </span>

      <div className={styles.userInfo}>
        <h2 className={styles.userName}>
          {user.firstName} {user.lastName}
        </h2>
        <p className={styles.role}>{user.role}</p>
      </div>

      <div className={styles.detailRow}>
        <span className={styles.label}>Team:</span>
        <span className={styles.value}>{user.company.department}</span>
      </div>

      <div className={styles.detailRow}>
        <span className={styles.label}>Contact information:</span>
        <a href={`mailto:${user.email}`} className={styles.email}>
          {user.email}
        </a>
      </div>

      <div className={styles.detailRow}>
        <span className={styles.label}>Other details:</span>
        <p className={styles.otherDetails}>{buildOtherDetailsText(user)}</p>
      </div>
      <button className={`button-m ${styles.closeButton}`} onClick={onClose}>
        Close
      </button>
    </div>
  );
};
