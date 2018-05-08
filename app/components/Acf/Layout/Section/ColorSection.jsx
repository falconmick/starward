import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { getBackgroundColorClassFor, getGradiantColorClassFor } from '../../../utils/typography';
import { createSection } from './Section';

export const BackgroundColor = ({colorClass, style, children, className}) => {
  return <div className={cx('background-color', colorClass, className)} style={style}>{children}</div>;
}

export const ColorSection = props => {
  const { backgroundColor, gradiantName, className, ...otherProps } = props;

  const colorClass = getBackgroundColorClassFor(backgroundColor);
  const gradientClass = getGradiantColorClassFor(gradiantName);
  const Section = createSection({
    renderBackground: () => <BackgroundColor colorClass={gradientClass || colorClass} />,
    sectionClass: 'color-section',
  });

  return (
    <Section className={className} {...otherProps} />
  );
};

ColorSection.propTypes = {
  name: PropTypes.string,
  outerClassName: PropTypes.string,
  innerClassName: PropTypes.string,
  backgroundColor: PropTypes.string,
  gradiantName: PropTypes.string,
  className: PropTypes.string,
};
