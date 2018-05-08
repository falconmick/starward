import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ControlledSlider, MobileColumnSlider } from '../Sliders';
import { mapHeroSlide } from './HeroSlide';
import { mapAchievementSlide } from './AchievementSlide';

const _HeroContainer = props => {
  const { slides, achievements } = props;

  return (
    <div className="hero-container">
      <ControlledSlider className="hero-height">
        { (slides || []).map(mapHeroSlide) }
      </ControlledSlider>
      <MobileColumnSlider className="star-slider-achievment">
        { (achievements || []).map(mapAchievementSlide) }
      </MobileColumnSlider>
    </div>
  );
};

const mapStateToProps = props => {
  const { starward } = props;
  const { settings } = starward;
  const { achievements } = settings;
  return {
    achievements,
  };
};

export const HeroContainer = connect(mapStateToProps)(_HeroContainer);

HeroContainer.propTypes = {
  slides: PropTypes.array.isRequired,
};
