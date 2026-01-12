import React from "react";
import styles from "./Home.module.css";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { FilterBar } from "../../components/FilterBar/FilterBar";
import { UserGrid } from "../../components/UserGrid/UserGrid";
import { Modal } from "../../components/Modal/Modal";
import { UserDetailsModal } from "../../components/UserDetailsModal/UserDetailsModal";
import { useUserModal } from "../../hooks/useUserModal";

const Home: React.FC = () => {
  const { selectedUser, isOpen, openModal, closeModal } = useUserModal();

  return (
    <div className={styles.container}>
      <section className={styles.heroSection}>
        <h1 className={styles.mainHeading}>
          <span className={styles.gradient}>User</span> Dashboard
        </h1>

        <SearchBar />
      </section>

      <section className={styles.usersSection}>
        <FilterBar />
        <UserGrid onViewDetails={openModal} />
      </section>

      <Modal isOpen={isOpen} onClose={closeModal}>
        {selectedUser && (
          <UserDetailsModal user={selectedUser} onClose={closeModal} />
        )}
      </Modal>
    </div>
  );
};

export default Home;
