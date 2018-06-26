import React, { Component } from "react"
import classNames           from "classnames"

export default class Pagination extends Component {
  render() {
    const { currentPage, totalPages, handlePaginate, children } = this.props
    const firstPage = 1
    const isShowPagination = currentPage && currentPage <= totalPages
    const pagenationLinkClass = (page) => classNames("pagination-link", { "is-current": page === currentPage })
    const renderPaginationLink = (page) => (
      <a className={pagenationLinkClass(page)} onClick={() => handlePaginate(page)} >
        {page}
      </a>
    )
    const renderEllipsis = () => (
      <span className="pagination-ellipsis">&hellip;</span>
    )
    return (
      <nav className="pagination is-small is-right">
        {isShowPagination && (
          <ul className="pagination-list is-hidden-mobile">
            {currentPage > firstPage      && <li>{renderPaginationLink(1)}</li>}
            {currentPage > firstPage + 3  && <li>{renderEllipsis()}</li>}
            {currentPage > firstPage + 2  && <li>{renderPaginationLink(currentPage - 2)}</li>}
            {currentPage > firstPage + 1  && <li>{renderPaginationLink(currentPage - 1)}</li>}
            <li>{renderPaginationLink(currentPage)}</li>
            {currentPage < totalPages - 1 && <li>{renderPaginationLink(currentPage + 1)}</li>}
            {currentPage < totalPages - 2 && <li>{renderPaginationLink(currentPage + 2)}</li>}
            {currentPage < totalPages - 3 && <li>{renderEllipsis()}</li>}
            {currentPage < totalPages     && <li>{renderPaginationLink(totalPages)}</li>}
          </ul>
        )}
        {isShowPagination && (
          <ul className="pagination-list is-only-mobile">
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
