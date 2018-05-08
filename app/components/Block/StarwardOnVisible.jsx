import React from 'react';
import PropTypes from 'prop-types';
import OnVisible from 'react-on-visible';
import cx from 'classnames';

const onVisibleClass = 'on-vis';

export const OnVisibleFade = props => {
  const { children, className, fast, percent = 10, ...otherProps } = props;

  return (
    <OnVisible {...otherProps} className={cx('on-vis-fade', className, onVisibleClass, {'on-vis-fast': fast})} percent={percent}>{children}</OnVisible>
  );
};

export const OnVisibleFadeDrop = props => {
  const { children, invert, className, percent = 10, ...otherProps } = props;

  return (
    <OnVisible {...otherProps} className={cx('on-vis-fade-drop', className, onVisibleClass, {'on-vis-invert': invert})} percent={percent}>{children}</OnVisible>
  );
};

export const OnVisibleFadeFronSide = props => {
  const { children, className, fadeLeft, index = 0, percent = 10, ...otherProps } = props;

  const isEvenIndex = fadeLeft ? index % 2 === 0 : index % 2 !== 0;
  const fadeClass = isEvenIndex ? 'fade-left' : 'fade-right';
  return (
    <OnVisible {...otherProps} className={cx(className, onVisibleClass, fadeClass, 'on-vis-fade-side')} percent={percent}>{children}</OnVisible>
  );
};

OnVisibleFade.propTypes = {
  className: PropTypes.string,
  fast: PropTypes.bool,
};

OnVisibleFadeDrop.propTypes = {
  className: PropTypes.string,
  invert: PropTypes.bool,
};


OnVisibleFadeFronSide.propTypes = {
  className: PropTypes.string,
  fadeLeft: PropTypes.bool,
  index: PropTypes.number,
};
