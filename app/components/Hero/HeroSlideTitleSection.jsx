import React from 'react';
import PropTypes from 'prop-types';
import { Header } from '../Block/Header';
import { RenderContent } from '../Content/RenderContent';

export const HeroSlideTitleSection = props => {
  const { title, subtitle, sliderNumber } = props;

  const headerType = sliderNumber === 0 ? 'H1' : 'H3';
  return (
    <div className="header-text">
      <Header elementOverride={headerType} className="main-header">{title}</Header>
      <RenderContent content={subtitle} useReactRouter className="sub-header" />
    </div>
  );
};

HeroSlideTitleSection.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  sliderNumber: PropTypes.number,
};
