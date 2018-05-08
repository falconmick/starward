import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Slider from 'react-slick';

export class MobileColumnSlider extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      hasHadInteraction: false,
    };

    this.turnShakeOff = this.turnShakeOff.bind(this);
  }

  turnShakeOff() {
    this.setState({hasHadInteraction: true});
  }

  render() {
    const { settings, className, children } = this.props;
    const { hasHadInteraction } = this.state;

    const defaultSettings = {
      dots: false,
      arrows: false,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      afterChange: this.turnShakeOff,
      responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 1
          }
        }
      ]
    };


    return (

      <Slider {...defaultSettings} {...settings} className={cx('star-slider star-slider-controlled', className, {'has-had-interaction': hasHadInteraction})}>
        { children }
      </Slider>
    );
  }
};

MobileColumnSlider.propTypes = {
  settings: PropTypes.object,
  className: PropTypes.string,
};
