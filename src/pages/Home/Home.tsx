import React from "react";
import styles from "./Home.module.css";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { FilterBar } from "../../components/FilterBar/FilterBar";
import { UserGrid } from "../../components/UserGrid/UserGrid";
import { Modal } from "../../components/Modal/Modal";
import { UserDetailsModal } from "../../components/UserDetailsModal/UserDetailsModal";
import { Pagination } from "../../components/Pagination/Pagination";
import { useUserModal } from "../../hooks/useUserModal";
import { useUsers } from "../../hooks/useUsers";
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner";

const Home: React.FC = () => {
  const {
    users,
    loading,
    error,
    hasSearched,
    nextPage,
    prevPage,
    page,
    total,
    activeRole,
    setFilterByTag,
    resetAndFetch,
    searchAndFetch
  } = useUsers();

  const { selectedUser, isOpen, openModal, closeModal } = useUserModal();
  const noResults = !loading && hasSearched && users.length === 0;
  const hasResults = users.length > 0;

  return (
    <div className={styles.container}>
      <section className={styles.heroSection}>
        <h1 className={styles.mainHeading}>
          <span className={styles.gradient}>User</span> Dashboard
        </h1>

        <SearchBar onSearch={searchAndFetch} onResetFetch={resetAndFetch} />
      </section>

      <section className={styles.usersSection}>
        {hasResults && (
          <FilterBar activeRole={activeRole} onFilterByTag={setFilterByTag} />
        )}
        {loading && (
          <div className={styles.loadingContainer}>
            <LoadingSpinner size="lg" />
          </div>
        )}
        {error && <p>Error: {error.message}</p>}
        {noResults && <p>No users found. Try again!</p>}
        {hasResults && <UserGrid users={users} onViewDetails={openModal} />}
      </section>

      {hasResults && (
        <Pagination
          currentPage={page}
          totalPages={Math.ceil(total / 10)}
          onPrevPage={prevPage}
          onNextPage={nextPage}
        />
      )}

      <Modal isOpen={isOpen} onClose={closeModal}>
        {selectedUser && (
          <UserDetailsModal user={selectedUser} onClose={closeModal} />
        )}
      </Modal>
    </div>
  );
};

export default Home;
