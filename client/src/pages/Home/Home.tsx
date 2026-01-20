import React, { useEffect } from "react";
import styles from "./Home.module.css";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { FilterBar } from "../../components/FilterBar/FilterBar";
import { UserGrid } from "../../components/UserGrid/UserGrid";
import { Modal } from "../../components/Modal/Modal";
import { Pagination } from "../../components/Pagination/Pagination";
import { useUsers } from "../../hooks/useUsers";
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner";
import { UserDetailsModalWrapper } from "../../components/UserDetailsModalWrapper/UserDetailsModalWrapper";
import { Toaster } from "@react-lab-mono/ui";
import { useUpdateUser } from "../../hooks/useUpdateUser";
import { UserData } from "../../types/user";
import { useDeleteUser } from "../../hooks/useDeleteUser";
import { CreateUserModal } from "../../components/CreateUserModal/CreateUserModal";
import { useCreateUserModal } from "../../hooks/useCreateUserModal";
import { useUserDetailsModal } from "../../hooks/useUserDetailsModal";
import { usePostUser } from "../../hooks/usePostUser";

const Home: React.FC = () => {
  const {
    users,
    loading,
    error,
    nextPage,
    prevPage,
    page,
    total,
    activeRoles,
    resetFilters,
    setRoleFilters,
    searchUsers,
    fetchUsers
  } = useUsers();
  const { updateUser, loading: updateLoading } = useUpdateUser();
  const { deleteUser, loading: deleteLoading } = useDeleteUser();
  const { createUser, loading: createLoading } = usePostUser();
  const { selectedUserIndex, isOpen, openModal, closeModal } =
    useUserDetailsModal();
  const {
    isOpen: isCreateUserModalOpen,
    openModal: openCreateUserModal,
    closeModal: closeCreateUserModal
  } = useCreateUserModal();
  const noResults = !loading && users.length === 0;
  const hasResults = users.length > 0 && !loading;
  const hasNextUserInModal =
    selectedUserIndex !== null && selectedUserIndex < users.length - 1;
  const hasPrevUserInModal =
    selectedUserIndex !== null && selectedUserIndex > 0;
  const isMutatingUser = updateLoading || deleteLoading || createLoading;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const handleUpdateUser = async (user: UserData) => {
    await updateUser(user);
    fetchUsers();
  };

  const handleDeleteUser = async (id: string) => {
    await deleteUser(id);
    fetchUsers();
  };

  const handleCreateUser = async (user: UserData) => {
    await createUser(user);
    fetchUsers();
  };

  const nextUserInModal = () => {
    if (hasNextUserInModal) {
      openModal(selectedUserIndex + 1);
    }
  };

  const prevUserInModal = () => {
    if (hasPrevUserInModal) {
      openModal(selectedUserIndex - 1);
    }
  };

  return (
    <div className={styles.container}>
      <section
        className={styles.heroSection}
        aria-label="search and filter users"
      >
        <h1 className={styles.mainHeading}>
          <span className={styles.gradient}>User</span> Dashboard
        </h1>

        <SearchBar onSearch={searchUsers} onResetFetch={resetFilters} />
      </section>

      <section className={styles.usersSection} aria-label="user results">
        <FilterBar
          activeRoles={activeRoles}
          onRoleFilters={setRoleFilters}
          onOpenCreateUserModal={openCreateUserModal}
        />
        {loading && (
          <div
            className={styles.loadingContainer}
            role="status"
            aria-live="polite"
          >
            <LoadingSpinner size="lg" />
          </div>
        )}
        {error && (
          <p role="alert" aria-live="assertive">
            Something went wrong! Try again later!
          </p>
        )}
        {noResults && (
          <p role="status" aria-live="polite">
            No users found. Try again!
          </p>
        )}
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
        {selectedUserIndex !== null && (
          <UserDetailsModalWrapper
            user={users[selectedUserIndex]}
            onClose={closeModal}
            onNextUser={nextUserInModal}
            onPrevUser={prevUserInModal}
            hasNextUser={hasNextUserInModal}
            hasPrevUser={hasPrevUserInModal}
            onSaveUser={handleUpdateUser}
            onDeleteUser={handleDeleteUser}
            onLoading={isMutatingUser}
          />
        )}
      </Modal>

      <Modal isOpen={isCreateUserModalOpen} onClose={closeCreateUserModal}>
        <CreateUserModal
          onCreateUser={handleCreateUser}
          onCancel={closeCreateUserModal}
        />
      </Modal>

      <Toaster />
    </div>
  );
};

export default Home;
