import React, { useState } from "react";
import styles from "./Home.module.css";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { FilterBar } from "../../components/FilterBar/FilterBar";
import { UserGrid } from "../../components/UserGrid/UserGrid";
import { Modal } from "../../components/Modal/Modal";
import { UserDetailsModal } from "../../components/UserDetailsModal/UserDetailsModal";
import { useUserModal } from "../../hooks/useUserModal";
import { useUsers } from "../../hooks/useUsers";
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner";

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { users, loading, error } = useUsers(searchQuery);
  const { selectedUser, isOpen, openModal, closeModal } = useUserModal();

  console.log(users, loading, error);

  return (
    <div className={styles.container}>
      <section className={styles.heroSection}>
        <h1 className={styles.mainHeading}>
          <span className={styles.gradient}>User</span> Dashboard
        </h1>

        <SearchBar onSearch={setSearchQuery} />
      </section>

      <section className={styles.usersSection}>
        <FilterBar />
        {loading && (
          <div className={styles.loadingContainer}>
            <LoadingSpinner size="lg" />
          </div>
        )}
        {error && <p>Error: {error.message}</p>}
        {users.length === 0 && !loading && <p>No users found. Try again!</p>}
        {users && <UserGrid users={users} onViewDetails={openModal} />}
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
