import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="pagination">
      <button onClick={handlePrevious} disabled={currentPage === 1}>Önceki</button>
      <span>Sayfa {currentPage} / {totalPages}</span>
      <button onClick={handleNext} disabled={currentPage === totalPages}>Sonraki</button>
    </div>
  );
};

export default Pagination;