import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { extractWpImageUrl, extractWpThumbnails, wpThumbnailBreakPoints } from '../../utils/wordpress';

// const mapImageSource = (imageSource, index) => {
//   const { url, name } = imageSource;
//   const maxWidth = wpThumbnailBreakPoints[name];
//   return (
//     <source srcSet={url} media={`(max-width: ${maxWidth})`} key={index} />
//   );
// };
//
// const BaseImageRender = props => {
//   const { url, mediaUrlList = [], alt, className } = props;
//   return (
//     <picture className={className}>
//       {mediaUrlList.map(mapImageSource)}
//       <source srcSet={url} />
//       <img srcSet={url} alt={alt} />
//     </picture>
//   );
// };
//
// BaseImageRender.propTypes = {
//   url: PropTypes.string,
//   mediaUrlList: PropTypes.array,
//   alt: PropTypes.string,
//   className: PropTypes.string,
// };

export const UnResponsiveImage = props => {
  const { image, size, className } = props;
  const { alt: imageAlt} = image;

  const url = extractWpImageUrl(image, size);

  return <img className={cx('img', className)} src={url} alt={imageAlt} />;
};

UnResponsiveImage.propTypes = {
  image: PropTypes.object,
  size: PropTypes.string,
  className: PropTypes.string,
};

// export const ResponsiveImage = props => {
//   const { image, className } = props;
//   const { alt: imageAlt, subtype } = image;
//
//   if (subtype === 'svg+xml') {
//     return <UnResponsiveImage image={image} className={className} />;
//   }
//
//   const { thumbs, url } = extractWpThumbnails(image);
//
//
//   return <BaseImageRender className={className} url={url} alt={imageAlt} mediaUrlList={thumbs} />;
// };
//
// ResponsiveImage.propTypes = {
//   image: PropTypes.object,
//   className: PropTypes.string,
// };
