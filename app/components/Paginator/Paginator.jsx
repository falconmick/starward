import React from 'react';
import cx from 'classnames';
import ReactPaginate from 'react-js-pagination';
import { browserHistory } from 'react-router';
import { safeUrl } from '../../utils/starward';
import { SVGIcon } from '../Block/SVGIcon';

const InternalPaginator = props => {
  const { onPageChange, activePage, totalPages } = props;

  return (
    <ReactPaginate
      activePage={activePage}
      itemsCountPerPage={1}
      totalItemsCount={totalPages}
      pageRangeDisplayed={4}
      onChange={onPageChange}
      firstPageText={<SVGIcon name="arrow_left" width="15px" height="25px" />}
      lastPageText={<SVGIcon name="arrow_right" width="15px" height="25px" />}
    />
  );
};


// pagination with navigation
const createPagination = ({alignmentClassname}) => ({baseUrl}) => props => {
  const { onPageChange, className } = props;
  const safeBaseUrl = safeUrl(baseUrl || '');
  const onPageChangeFunc = baseUrl ? (data) => browserHistory.push(safeBaseUrl + data) : onPageChange;
  return (
    <div className={cx('paginator-component paginator-component-centered', className)}>
      <div className={alignmentClassname}>
        <InternalPaginator
          {...props}
          onPageChange={onPageChangeFunc} />
      </div>
    </div>
  );
};

export const createCenteredPagination = createPagination({alignmentClassname: 'paginator-container-to-center'})
export const createLeftPagination = createPagination({alignmentClassname: ''})
export const createRightPagination = createPagination({alignmentClassname: 'paginator-container-to-right'})
