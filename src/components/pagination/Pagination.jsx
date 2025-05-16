import React, { useState, useEffect } from "react";
import styles from "./Pagination.module.css";
import { RiArrowLeftSFill, RiArrowRightSFill } from "react-icons/ri";

const Paginations = ({ totalPages, currentPage, onPageChange }) => {
  const [maxVisiblePages, setMaxVisiblePages] = useState(
    window.innerWidth < 768 ? 3 : 5
  );

  useEffect(() => {
    const handleResize = () => {
      setMaxVisiblePages(window.innerWidth < 768 ? 3 : 5);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  let startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
  const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

  if (endPage === totalPages) {
    startPage = Math.max(endPage - maxVisiblePages + 1, 1);
  }

  const visiblePages = Array.from(
    { length: Math.min(totalPages, maxVisiblePages) },
    (_, index) => startPage + index
  );

  const handlePageClick = (pageNumber) => {
    onPageChange(pageNumber);
  };

  return (
    <div className={styles.pagination}>
      <button
        className={
          currentPage === 1
            ? `${styles.arrow} ${styles.arrowLeft} ${styles.disabled}`
            : `${styles.arrow} ${styles.arrowLeft}`
        }
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <RiArrowLeftSFill className={styles.icons} />
      </button>

      {visiblePages.map((pageNumber) => (
        <button
          key={pageNumber}
          className={
            pageNumber === currentPage
              ? `${styles.active} ${styles.button}`
              : styles.button
          }
          onClick={() => handlePageClick(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}

      <button
        className={
          currentPage === totalPages
            ? `${styles.arrow} ${styles.arrowRight} ${styles.disabled}`
            : `${styles.arrow} ${styles.arrowRight}`
        }
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <RiArrowRightSFill className={styles.icons} />
      </button>
    </div>
  );
};

export default Paginations;
