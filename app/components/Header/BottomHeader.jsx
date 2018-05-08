import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { SellShareNowButton } from '../Block/Button';
import { Navigation } from '../Common/Navigation';
import { StarwardLink } from '../Block/StarwardLink';

const animationMiddle = 150;
const animationEnd = 300;


export class BottomHeader extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { animateStyle: {} };

    this.runAnimation = this.runAnimation.bind(this);
    this.animationStartStage = this.animationStartStage.bind(this);
    this.animationMiddleStage = this.animationMiddleStage.bind(this);
    this.animationEndStage = this.animationEndStage.bind(this);
    this.animateFadeIn = this.animateFadeIn.bind(this);
    this.animateFadeOut = this.animateFadeOut.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { navOpen: currentNavOpen } = this.props;
    const { navOpen: nextNavOpen } = nextProps;

    if (currentNavOpen !== nextNavOpen) {
      if (nextNavOpen) {
        this.animateFadeIn();
      } else {
        this.animateFadeOut();
      }
    }
  }

  runAnimation(before, after) {
    this.setState({ animateStyle: before });
    setTimeout(() => {
      this.setState({ animateStyle: after });
    }, 10);
  }

  animationStartStage(before, after) {
    this.runAnimation(before, after);
  }

  animationMiddleStage(before, after) {
    setTimeout(() => {
      this.runAnimation(before, after);
    }, animationMiddle);
  }

  animationEndStage(before, after) {
    setTimeout(() => {
      this.runAnimation(before, after);
    }, animationEnd);
  }


  animateFadeIn() {
    this.animationMiddleStage({ display: 'flex' }, { display: 'flex', opacity: 1 });
  }

  animateFadeOut() {
    this.animationStartStage({});
  }

  render() {
    const { navigation, currentPath } = this.props;
    const { animateStyle } = this.state;
    return (
      <div className="bottom-header">
        <div className="bottom-header-draw" style={animateStyle}>
          <Navigation
            items={navigation}
            currentPath={currentPath}
            className="primary-navigation"
          />
          <SellShareNowButton>Sell Shares Now</SellShareNowButton>
          <StarwardLink className="contact-number" url="tel:1300722852" external><span className="detail">Tel</span> 1300 722 852</StarwardLink>
        </div>
      </div>
    );
  }
}

BottomHeader.propTypes = {
  navigation: PropTypes.array.isRequired,
  currentPath: PropTypes.string.isRequired,
};
