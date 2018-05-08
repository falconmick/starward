import React from 'react';
import PropTypes from 'prop-types';
import { createSection } from './Section';
import { ResponsiveBackgroundCover } from '../../Block/ResponsiveBackground';

export const BackgroundSection = props => {
  const { image, ...otherProps } = props;

  const Section = createSection({
    renderBackground: () => <ResponsiveBackgroundCover image={image} />,
    sectionClass: 'color-section',
  });

  return (
    <Section {...otherProps} />
  );
};

BackgroundSection.propTypes = {
  name: PropTypes.string,
  outerClassName: PropTypes.string,
  innerClassName: PropTypes.string,
  image: PropTypes.string,
};
