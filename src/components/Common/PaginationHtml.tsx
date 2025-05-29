import React from 'react'
interface PaginationProps {
    lastPage: number;
    currentPage: number;
    handlePageChange: (page: number) => void;
    getPagination: () => (number | string)[];
  }
  
const PaginationHtml = (props:PaginationProps ) => {
    const {lastPage,currentPage,handlePageChange,getPagination} = props;
  return (
    <div className="b-pagination-outer">
        <ul id="border-pagination">
          <li className="leftPrev">
            <a
            //   to={currentPage === 1 ? "#" : `?page=${currentPage - 1}`}
              onClick={(e) => {
                if (currentPage === 1) {
                  e.preventDefault();
                } else {
                  handlePageChange(currentPage - 1);
                }
              }}
              className={currentPage === 1 ? "disabled" : ""}
            >
              <img className="img--fluid" src="/assets/images/pagination-left-icon.svg" alt="" title="" />
            </a>
          </li>

          {getPagination().map((page, index) => (
          <li key={index}>
            {page === "..." ? (
              <span className="dots">...</span>
            ) : (
              <a
                className={currentPage === page ? "active" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(Number(page));
                }}
              >
                {page}
              </a>
            )}
          </li>
        ))}

          <li className="RightPrev">
            <a
              onClick={(e) => {
                if (currentPage === lastPage) {
                  e.preventDefault();
                } else {
                  handlePageChange(currentPage + 1);
                }
              }}
              className={currentPage === lastPage ? "disabled" : ""}
            >
              <img className="img--fluid" src="/assets/images/pagination-right-icon.svg" alt="" title="" />
            </a>
          </li>
        </ul>
      </div>
  )
}

export default PaginationHtml