import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const getHeader = (potentialHeadersInArray, defaultHeader = 'h1') => {
  for (let i = 0; i < potentialHeadersInArray.length; i++) {
    if (potentialHeadersInArray[i]) {
      return `h${i + 1}`;
    }
  }

  return defaultHeader;
}

export const Header = props => {
  const { h1, h2, h3, h4, h5, h6, h7, h8, elementOverride, className, headerStyle, children, style } = props;
  const potentialHeadersInArray = [h1, h2, h3, h4, h5, h6, h7, h8];
  const HeaderElement = elementOverride || getHeader(potentialHeadersInArray, 'p');

  const combinedClassName = classNames('header', className, (headerStyle || HeaderElement));

  return (
    <HeaderElement className={combinedClassName} style={style}>{children}</HeaderElement>
  );
};

Header.propTypes = {
  h1: PropTypes.any,
  h2: PropTypes.any,
  h3: PropTypes.any,
  h4: PropTypes.any,
  h5: PropTypes.any,
  h6: PropTypes.any,
  h7: PropTypes.any,
  h8: PropTypes.any,
  className: PropTypes.string,
  headerStyle: PropTypes.string,
  elementOverride: PropTypes.string,
  children: PropTypes.any,
  style: PropTypes.object,
};
