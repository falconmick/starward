import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import * as icons from '../../../public/assets/images/inline/';
import { LinkAction, StarwardLink } from './StarwardLink';

export const SVGIcon = props => {
  const { name = 'star_gem', svgClass, fill = '#000000', width, height, className, useSvgSize, ...restProps } = props;

  const svg = icons[name];
  const classIconName = svgClass ? `svg-${svgClass}` : `svg-${name}`.replace('_', '-');
  const hasntResized = typeof width === 'undefined' && height === 'undefined';
  const style = {
    fill,
    height,
    width,
  };
  return (
    <span
      style={style}
      dangerouslySetInnerHTML={{ __html: svg }}
      className={cx('svg-icon', classIconName, className, {resized: !hasntResized && !useSvgSize})}
      {...restProps}
    />
  );
};

export const LinkSVGIcon = props => {
  const { url, external = false, className, ...restProps } = props;

  return (
    <StarwardLink url={url} external={external} target="_blank" className={cx('svg-link', className)}>
      <SVGIcon {...restProps} />
    </StarwardLink>
  );
};

export const NewWindowSVGIcon = props => {
  const { url, ...restProps } = props;

  const onClick = () => {
    window.open(url, 'Share Redlily',
      'left=20,top=20,width=600,height=600,toolbar=1,resizable=0');
    return false;
  };

  return (
    <LinkAction onClick={onClick}>
      <SVGIcon {...restProps} />
    </LinkAction>
  );
};

SVGIcon.propTypes = {
  name: PropTypes.string,
  fill: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  className: PropTypes.string,
  svgClass: PropTypes.string,
  useSvgSize: PropTypes.bool,
};

LinkSVGIcon.propTypes = {
  url: PropTypes.string,
  external: PropTypes.bool,

  name: PropTypes.string,
  fill: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  className: PropTypes.string,
  svgClass: PropTypes.string,
  useSvgSize: PropTypes.bool,
};
