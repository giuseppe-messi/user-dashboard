import styles from "./FilterBar.module.css";

export const FilterBar = () => {
  return (
    <div className={styles.filterBar}>
      <span className={`${styles.filterLabel} label`}>FILTER BY:</span>
      <div className={styles.filterButtons}>
        <button className="badge badge-admin">ADMIN</button>
        <button className="badge badge-editor">EDITOR</button>
        <button className="badge badge-viewer">VIEWER</button>
        <button className="badge badge-guest">GUEST</button>
        <button className="badge badge-owner">OWNER</button>
        <button className="badge badge-inactive">INACTIVE</button>
      </div>
    </div>
  );
};
