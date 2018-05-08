/* eslint-disable no-multi-spaces */
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { blankFunction } from './../../utils/component';
import { StarwardLink } from './StarwardLink';

// These simple websites don't usually have different text other than Read Me and other,
// so to make the components more understandable on what they do I am pulling
// the text part of a button into a curry so I can make a button that always says "Read Me"
export const createButton = ({text, href: hrefDefault, className} = {}) => props => {
  const { onClick, showAsButton = true, href: hrefOverride, external, disabled, children, style, target, className: dynamicClassName, wpLink } = props;
  const { url: wpUrl, target: wpTarget, title: wpText } = wpLink || {}; // takes priority except for creatButton inital args

  const href = hrefOverride || wpUrl || hrefDefault;
  // if not disabled and we do have a url, use it or return undefined
  const url              = (!disabled && href)    ? href     : undefined;
  // if we are using onClick, we need to replace it with a blank func call if disabled
  const onClickBlankable = (!disabled && onClick) ? onClick  : blankFunction;
  return (
    <StarwardLink url={url} style={style} onClick={onClickBlankable} className={cx(className, dynamicClassName, {button: showAsButton, disabled})} target={wpTarget || target} external={external}>{text || wpText || children}</StarwardLink>
  );
};

// use this when you have to modify the colors based on ordering
export const BlankButton = createButton({className: 'blank-button'});

export const BlueButton = createButton({className: 'blue-button'});

export const BlueLightButton = createButton({className: 'blue-light-button'});

export const SellShareNowButton = createButton({className: 'blue-button sell-shares-now', href: '/sharesaleapp'});

export const NavyButton = createButton({className: 'navy-button'});

export const LightButton = createButton({className: 'light-button'});

LightButton.propTypes = NavyButton.propTypes = BlueButton.propTypes = BlueLightButton.propType = BlankButton.propType = {
  onClick: PropTypes.func,
  showAsButton: PropTypes.bool,
  href: PropTypes.string,
  external: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.node,
  style: PropTypes.object,
  target: PropTypes.string,
  className: PropTypes.string,
  wpLink: PropTypes.object,
};
