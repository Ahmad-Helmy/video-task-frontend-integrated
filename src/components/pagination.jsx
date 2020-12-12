import React from "react";

const Pagination = props => {
  const { itemsCount, currentPage, pageSize, onPageChange } = props;
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return <p></p>;
  const pages = [];
  for (let index = 1; index <= pagesCount; index++) pages.push(index);

  return (
    <ul className="pagination">
      {pages.map(p => (
        <li
          key={p}
          className={p === currentPage ? "page-item active" : "page-item"}
        >
          <button onClick={() => onPageChange(p)} className="page-link">
            {p}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
