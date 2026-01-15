import styles from "./FilterBar.module.css";
import { BADGE_TYPES, BadgeType } from "../../types/user";

export interface FilterBarProps {
  activeRole: BadgeType | null;
  onFilterByTag: (tag: BadgeType) => void;
}

export const FilterBar = ({ activeRole, onFilterByTag }: FilterBarProps) => (
  <div className={styles.filterBar}>
    <span className={`${styles.filterLabel} label`}>FILTER BY:</span>
    <div className={styles.filterButtons}>
      {BADGE_TYPES.map((badge) => (
        <button
          type="button"
          key={badge}
          className={`badge badge-${badge} ${styles.filterButton} ${
            activeRole === badge ? styles.active : ""
          }`}
          onClick={() => onFilterByTag(badge)}
          aria-pressed={activeRole === badge}
        >
          {badge.toUpperCase()}
        </button>
      ))}
    </div>
  </div>
);
