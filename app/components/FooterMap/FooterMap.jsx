import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { MapSideContent } from './MapSideContent';
import { ImgIcon } from '../Block/ImgIcon';

export const FooterMap = props => {
  const { showContent, email, fax, header, link, telephone, className } = props;
  return (
    <div className={cx('footer-map-container', className)}>
      {showContent && <MapSideContent email={email} fax={fax} header={header} link={link} telephone={telephone} />}
      <ImgIcon className={cx('pull-right-map', {'has-side-content': showContent})} src="/assets/images/url/map-with-labels-cropped.svg" />
    </div>
  );
};

FooterMap.propTypes = {
  showContent: PropTypes.bool,
  email: PropTypes.string,
  fax: PropTypes.string,
  header: PropTypes.string,
  link: PropTypes.object,
  telephone: PropTypes.string,
  className: PropTypes.string,
};
