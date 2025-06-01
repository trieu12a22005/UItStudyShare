import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];

  const maxPagesToShow = 2;
  let startPage = currentPage;
  let endPage = currentPage + maxPagesToShow - 1;

  // Đảm bảo endPage không vượt quá totalPages
  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(endPage - maxPagesToShow + 1, 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="inline-flex rounded-md shadow-sm" aria-label="Pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="relative inline-flex items-center px-3 py-1 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
      >
        Previous
      </button>

      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`relative inline-flex items-center px-3 py-1 border border-gray-300 bg-white text-sm font-medium ${number === currentPage
            ? 'text-blue-600 font-semibold'
            : 'text-gray-700 hover:bg-gray-50'
            }`}
        >
          {number}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="relative inline-flex items-center px-3 py-1 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
      >
        Next
      </button>
    </nav>
  );
};

export default Pagination;
