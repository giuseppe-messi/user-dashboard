import styles from "./SearchBar.module.css";

export const SearchBar = () => {
  return (
    <div className={styles.searchSection}>
      <p className={`${styles.searchLabel} label`}>WHAT ARE YOU LOOKING FOR?</p>
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search by name..."
          className={styles.searchInput}
        />
        <button className={`button-l ${styles.searchButton}`}>Search</button>
      </div>
    </div>
  );
};
