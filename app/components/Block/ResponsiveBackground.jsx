import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { OnVisibleFade } from './StarwardOnVisible';
import { hexToRgb, isChrome } from '../../utils/starward';
import { cssVariableThumbs, extractWpImageUrl, extractWpThumbnails } from '../../utils/wordpress';

// if we are provided a src, a specific size or the subtype is svg, then it's not responsive
const isNotResponsive = ({size, subtype, src}) => src || size || subtype === 'svg+xml';

const getWpImageStyle = ({image, size, subtype, renderImage, backgroundPosition}) => {
  let { thumbs, url } = extractWpThumbnails(image);
  let cssVarStyle = {};

  // if a size is passed in, don't use css-var's to pick an image responsively.
  // also if it's an SVG then we don't need responsive
  if (isNotResponsive({size, subtype})) {
    url = extractWpImageUrl(image, size);
  } else {
    cssVarStyle = cssVariableThumbs(thumbs);
  }

  const backgroundStyles = url && renderImage ? {
    backgroundImage: `url(${url})`,
    ...cssVarStyle,
    backgroundPosition,
  } : null;

  return backgroundStyles;
};

const rawUrlBackgroundStyle = ({rawUrl, renderImage, backgroundPosition}) => {
  const backgroundStyles = rawUrl && renderImage ? {
    backgroundImage: `url(${rawUrl})`,
    backgroundPosition,
  } : null;

  return backgroundStyles;
};

// Will stretch to fit parent, displays an image inside, below
// are some other implementations with different size options
export class ResponsiveBackground extends PureComponent {
  constructor(props) {
    super(props);

    const { showOnLoad } = props;
    this.state = { renderImage: !!showOnLoad || isChrome }; // chrome cannot handle delayed rendering (jerks around when urls added dynamically)
    this.onVisibilityChange = this.onVisibilityChange.bind(this);
  }

  onVisibilityChange(isVisible) {
    if (isVisible) {
      this.setState({ renderImage: true });
    }
  }

  render() {
    const { image, src, size, className, mask, showOnLoad, backgroundPosition, children } = this.props;
    const { renderImage } = this.state;
    const { maskColor = '', maskOpacity = 1 } = mask || {};
    const { subtype } = image || {};
    const responsive = !isNotResponsive({size, subtype, src});

    const backgroundStyles = src ?
      rawUrlBackgroundStyle({rawUrl: src, renderImage, backgroundPosition}) :
      getWpImageStyle({image, size, subtype, renderImage, backgroundPosition})

    const maskStyles = {};

    if (mask) {
      const { r, g, b } = hexToRgb(maskColor);

      maskStyles.backgroundColor = `rgba(${r}, ${g}, ${b}, ${maskOpacity})`;
    }

    return (
      <OnVisibleFade fast percent="-100" onChange={this.onVisibilityChange} className={classNames('responsive-background', className, {'no-opacity-anim': showOnLoad, responsive})} style={backgroundStyles}>
        { mask && <div className={classNames('color-mask')} style={maskStyles}>{children}</div> }
        {!mask && <div className="color-mask">{children}</div>}
      </OnVisibleFade>
    );
  }
}

export const ResponsiveBackgroundCover = props => {
  const { className, ...otherProps } = props;

  return <ResponsiveBackground {...otherProps} className={classNames('responsive-background-cover', className)} />;
};

export const ResponsiveBackgroundContain = props => {
  const { className, ...otherProps } = props;

  return <ResponsiveBackground {...otherProps} className={classNames('responsive-background-contain', className)} />;
};

export const maskShape = PropTypes.shape({
  maskColor: PropTypes.string,
  maskOpacity: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
});

ResponsiveBackground.propTypes = {
  image: PropTypes.object,
  size: PropTypes.string,
  src: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  mask: maskShape,
};

ResponsiveBackgroundCover.propTypes = {
  image: PropTypes.object,
  size: PropTypes.string,
  src: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  mask: maskShape,
};

ResponsiveBackgroundContain.propTypes = {
  image: PropTypes.object,
  size: PropTypes.string,
  src: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  mask: maskShape,
};
