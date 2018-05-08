import React from 'react';
import cx from 'classnames';

// because sometimes we need to use -ve z-index, all colors need to be WAAaaAAyyyYY in the -ve background
export const PageBackground = props => {
  const { colorClass, children } = props;
  return (
    <div className={cx('page-background', colorClass)}>
      {children}
    </div>
  );
};
