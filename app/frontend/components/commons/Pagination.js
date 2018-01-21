import React, { Component } from "react"
import classNames           from "classnames"

export default class Pagination extends Component {
  render() {
    const { currentPage, totalPages, handlePaginate, children } = this.props
    const firstPage = 1
    const renderPaginationLink = (page) => (
      <a
        className={classNames("pagination-link", { "is-current": page === currentPage })}
        onClick={() => handlePaginate(page)}
        role="presentation"
      >
        {page}
      </a>
    )
    const renderEllipsis = () => (
      <span className="pagination-ellipsis">&hellip;</span>
    )
    return (
      <nav className="pagination is-small is-right">
        {currentPage && currentPage <= totalPages && (
          <ul className="pagination-list">
            {currentPage > firstPage      && <li>{renderPaginationLink(1)}</li>}
            {currentPage > firstPage + 2  && <li>{renderEllipsis()}</li>}
            {currentPage > firstPage + 1  && <li>{renderPaginationLink(currentPage - 1)}</li>}
            <li>{renderPaginationLink(currentPage)}</li>
            {currentPage < totalPages - 1 && <li>{renderPaginationLink(currentPage + 1)}</li>}
            {currentPage < totalPages - 2 && <li>{renderEllipsis()}</li>}
            {currentPage < totalPages     && <li>{renderPaginationLink(totalPages)}</li>}
          </ul>
        )}
        {children}
      </nav>
    )
  }
}
