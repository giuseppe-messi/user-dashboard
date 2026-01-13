import styles from "./Pagination.module.css";

interface PaginationProps {
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
    <div className={styles.pagination}>
      <button
        className="button-m"
        disabled={currentPage === 1}
        onClick={onPrevPage}
      >
        Prev
      </button>

      <span className={styles.paginationInfo}>
        Page {currentPage} of {totalPages}
      </span>

      <button
        className="button-m"
        disabled={currentPage >= totalPages}
        onClick={onNextPage}
      >
        Next
      </button>
    </div>
  );
};
