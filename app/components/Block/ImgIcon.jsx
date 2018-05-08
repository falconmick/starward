import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { StarwardLink } from './StarwardLink';

export const ImgIcon = props => {
  const { src, alt, width, height, className, onClick } = props;

  const style = {
    height,
    width,
  };
  return (
    <img src={src} alt={alt || ''} style={style} className={cx('img-icon', className, {'img-icon-clickable': onClick})} onClick={onClick} />
  );
};

export const ImgLink = props => {
  const { url, linkClassName, external = false, ...restProps } = props;

  return (
    <StarwardLink url={url} external={external} className={linkClassName} target={external ? '_blank' : null}>
      <ImgIcon {...restProps} />
    </StarwardLink>
  );
};

ImgIcon.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

ImgLink.propTypes = {
  url: PropTypes.string,
  external: PropTypes.bool,

  src: PropTypes.string,
  alt: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  className: PropTypes.string,
};
