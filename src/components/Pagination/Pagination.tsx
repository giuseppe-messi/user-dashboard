import styles from "./Pagination.module.css";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPrevPage: () => void;
  onNextPage: () => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPrevPage,
  onNextPage
}: PaginationProps) => {
  return (
    <nav className={styles.pagination} aria-label="Pagination">
      <button
        type="button"
        className="button-m"
        disabled={currentPage === 1}
        onClick={onPrevPage}
      >
        Prev
      </button>

      <span className={styles.paginationInfo} aria-live="polite">
        Page {currentPage} of {totalPages}
      </span>

      <button
        type="button"
        className="button-m"
        disabled={currentPage >= totalPages}
        onClick={onNextPage}
      >
        Next
      </button>
    </nav>
  );
};
