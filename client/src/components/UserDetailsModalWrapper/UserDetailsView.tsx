import { UserData } from "../../types/user";
import styles from "./UserDetailsModal.module.css";

interface Props {
  user: UserData;
  onClose: () => void;
  onNextUser: () => void;
  onPrevUser: () => void;
  hasNextUser?: boolean;
  hasPrevUser?: boolean;
  onEdit: () => void;
  onDelete: (id: string) => void;
}

export const UserDetailsView = ({
  user,
  onClose,
  onNextUser,
  onPrevUser,
  hasNextUser,
  hasPrevUser,
  onEdit,
  onDelete
}: Props) => {
  return (
    <div className={styles.modalContent}>
      <div className={styles.wrapCloseButtonBadge}>
        <span className={`badge badge-${user.role.toLowerCase()}`}>
          {user.role}
        </span>
        <div className={styles.editRow}>
          <button className="button button-s" onClick={onEdit}>
            Edit
          </button>
          <button className="button button-s" onClick={() => onDelete(user.id)}>
            Delete
          </button>
          <button type="button" className="button button-s" onClick={onClose}>
            Close
          </button>
        </div>
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
          className="button button-m"
          onClick={onPrevUser}
          disabled={!hasPrevUser}
        >
          Prev
        </button>
        <button
          className="button button-m"
          onClick={onNextUser}
          disabled={!hasNextUser}
        >
          Next
        </button>
      </div>
    </div>
  );
};
