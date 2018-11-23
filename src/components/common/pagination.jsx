import React, { Component } from 'react';

import PropTypes from 'prop-types';

import './pagination.scss';

class Pagination extends Component {
  pageNumbersGiven = pages => {
    return Array.from(new Array(pages), (value, index) => index + 1);
  };

  calcNumberOfPages = () => {
    return Math.ceil(this.props.totalItems / this.props.itemsPerPage);
  };

  isCurrentPage = page => {
    return this.props.currentPage === page;
  };

  render() {
    const totalPages = this.calcNumberOfPages();
    if (totalPages === 1) {
      return null;
    }

    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {this.pageNumbersGiven(totalPages).map(page => (
            <li
              className={
                this.isCurrentPage(page) ? 'page-item active' : 'page-item'
              }
              key={page}
            >
              <a
                className="page-link"
                onClick={() => this.props.onPageChange(page)}
              >
                {page}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

Pagination.propTypes = {
  totalItems: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;
