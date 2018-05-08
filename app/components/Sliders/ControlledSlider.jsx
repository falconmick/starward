import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Slider from 'react-slick';

export const ControlledSlider = props => {
  const { settings, className, children } = props;

  const defaultSettings = {
    dots: true,
    arrows: false,
    infinite: true,
    draggable: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };


  return (

    <Slider {...defaultSettings} {...settings} className={cx('star-slider star-slider-controlled', className)}>
      { children }
    </Slider>
  );
};

ControlledSlider.propTypes = {
  settings: PropTypes.object,
  className: PropTypes.string,
};
