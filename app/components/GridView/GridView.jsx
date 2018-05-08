import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { createCenteredPagination } from '../Paginator';

export const GridView = props => {
  const { children, baseUrl, onPageChange, totalPages, pageNumber, activePage, className, paginatorClassName } = props;
  const Pagination = createCenteredPagination({baseUrl});

  return (
    <div className={cx('grid-view-container', className)}>
      { children }
      <Pagination className={paginatorClassName} onPageChange={onPageChange} activePage={activePage} totalPages={totalPages} pageNumber={pageNumber} />
    </div>
  );
};

GridView.propTypes = {
  baseUrl: PropTypes.string,
  onPageChange: PropTypes.func,
  totalPages: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  pageNumber: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  className: PropTypes.string,
  paginatorClassName: PropTypes.string,
};
