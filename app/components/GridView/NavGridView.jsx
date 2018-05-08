import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { GridView } from './GridView';


// builds up the pages on mount, so currently there is no adding items during runtime
export const NavGridView = props => {
  let { renderables, activePage, totalPages, baseUrl, paginatorClassName, columns } = props;
  // renderables = renderables.slice(0, 6);
  const hasMoreThanSix = renderables.length > 6;

  const start = renderables.slice(0, 2);
  const middle = renderables.slice(2, 5);
  const end = renderables.slice(5, 8);
  const desktopRenerablesOrder = hasMoreThanSix ? [...middle, ...start, ...end] : renderables;

  return (
    <div className="nav-grid-views">
      <GridView paginatorClassName={paginatorClassName} className="mobile-view archive-preview-container" totalPages={totalPages} activePage={activePage} baseUrl={baseUrl} columns={columns}>
        { renderables }
      </GridView>
      <GridView paginatorClassName={paginatorClassName} className={cx('desktop-view archive-preview-container', {'more-than-six': hasMoreThanSix})} totalPages={totalPages} activePage={activePage} baseUrl={baseUrl} columns={columns}>
        { desktopRenerablesOrder }
      </GridView>
    </div>
  );
}

NavGridView.propTypes = {
  renderables: PropTypes.array,
  activePage: PropTypes.number,
  totalPages: PropTypes.number,
  baseUrl: PropTypes.string,
  paginatorClassName: PropTypes.string,
  columns: PropTypes.number,
};

NavGridView.defaultProps = {
  renderables: [],
  activePage: 1,
  totalPages: 1,
};
