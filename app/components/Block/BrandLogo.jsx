import React from 'react';
import PropTypes from 'prop-types';
import { ImgIcon, ImgLink } from './ImgIcon';

export const BrandLogo = props => {
  const { url, src, alt, className, linkClassName } = props;

  if (url) {
    return (
      <ImgLink
        url={url}
        src={src}
        alt={alt || 'brand logo'}
        external={false}
        className={className}
        linkClassName={linkClassName}
      />
    );
  }
  return (
    <ImgIcon
      src={src}
      alt={alt || 'brand logo'}
      className={className}
    />
  );
};

BrandLogo.propTypes = {
  url: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
  linkClassName: PropTypes.string,
};
