import React from 'react'

const Pagination = ({totalItems, itemsPerPage, currentPage, onPageChange}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  return (
    <div>
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          disabled={currentPage === index + 1}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}
    </div>
  )
}

export default Pagination
