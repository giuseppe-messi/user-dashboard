import { useRef } from "react";
import styles from "./SearchBar.module.css";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    if (inputRef.current) {
      onSearch(inputRef.current.value);
      inputRef.current.value = "";
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
          onKeyPress={handleKeyPress}
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
