import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Link } from 'react-router';
import classNames from 'classnames';
import { blankFunction } from '../../utils/component';
import { safeUrl } from '../../utils/starward';

const onEnterPress = onInteraction => event => {
  const { key } = event;
  if (key === 'Enter') {
    onInteraction({
      type: 'ENTER_PRESS',
      event,
    });
  }
};

const handleEnterPress = disableEnter => { return disableEnter ? blankFunction : onEnterPress; };

const handleOnClick = onInteraction => event => onInteraction({
  type: 'LEFT_CLICK',
  event,
});

export const StarwardLink = props => {
  const { url, external = false, children, disabled, className, ...otherProps } = props;
  if (disabled) {
    return <a className={classNames('disabled', className)} {...otherProps}>{children}</a>;
  }
  if (external) {
    return <a href={url} className={className} rel="noopener noreferrer" target="_blank" {...otherProps}>{children}</a>;
  }
  return <Link to={url && safeUrl(url)} className={className} {...otherProps}>{children}</Link>;
};

export const LinkAction = props => {
  const { className, style, href, disabled, onInteraction = blankFunction, tabIndex, children, disableEnter } = props;
  const classNameCombined = classNames('link-action', className);

  if (href) {
    return (
      <StarwardLink
        className={classNameCombined}
        style={style}
        url={href}
        tabIndex={tabIndex}
        disabled={disabled}
        onClick={handleOnClick(onInteraction)}
        onKeyPress={handleEnterPress(disableEnter)(onInteraction)}
      >
        {children}
      </StarwardLink>
    );
  }
  return (
    <span
      className={cx(classNameCombined, { disabled })}
      style={style}
      tabIndex={tabIndex}
      onClick={disabled ? blankFunction : handleOnClick(onInteraction)}
      onKeyPress={disabled ? blankFunction : handleEnterPress(disableEnter)(onInteraction)}
    >
      {children}
    </span>
  );
};

LinkAction.propTypes = {
  href: PropTypes.string,
  onInteraction: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  style: PropTypes.object,
  tabIndex: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

StarwardLink.propTypes = {
  url: PropTypes.string,
  external: PropTypes.bool,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
};
