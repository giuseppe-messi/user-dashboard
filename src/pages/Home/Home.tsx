import React from "react";
import styles from "./Home.module.css";

const Home: React.FC = () => {
  return (
    <div className={styles.pageContainer}>
      <section className={styles.heroSection}>
        <h1 className={styles.mainHeading}>
          <span className={styles.gradient}>User</span> Dashboard
        </h1>

        <div className={styles.searchSection}>
          <p className={styles.searchLabel}>WHAT ARE YOU LOOKING FOR?</p>
          <div className={styles.searchBar}>
            <input
              type="text"
              placeholder="Search by name..."
              className={styles.searchInput}
            />
            <button className="button-m">Search</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
