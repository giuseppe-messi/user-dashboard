import { useRef } from "react";
import styles from "./SearchBar.module.css";

export interface SearchBarProps {
  onSearch: (query: string) => void;
  onResetFetch: () => void;
}

export const SearchBar = ({ onSearch, onResetFetch }: SearchBarProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    if (inputRef.current) {
      const isEmptySearch = inputRef.current.value.trim() === "";

      if (isEmptySearch) {
        onResetFetch();
        return;
      }
      onSearch(inputRef.current.value);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={styles.searchSection}>
      <p className={`${styles.searchLabel} label`}>WHAT ARE YOU LOOKING FOR?</p>
      <div className={styles.searchBar}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search by name..."
          className={styles.searchInput}
          onKeyDown={handleKeyPress}
        />
        <button
          className={`button-l ${styles.searchButton}`}
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
};
