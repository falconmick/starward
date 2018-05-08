import React, { PureComponent } from 'react';
import cx from 'classnames';
import reactTimeout from 'react-timeout';
import { UnResponsiveImage } from '../Block/ResponsiveImage';

const firstShakeAfter = 3000;
const shakeForLength = 1000;
const shakeAgainAfter = 7000;

// todo: instead of adding class to do shake (and thus needing timers) use repeating animations and delays
class _AchievementSlide extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      showShake: false,
    };

    this.shakeOff = this.shakeOff.bind(this);
    this.shakeOn = this.shakeOn.bind(this);
  }

  componentDidMount() {
    this.shakeOn(firstShakeAfter);
  }
  shakeOff(ms) {
    this.props.setTimeout(() => {
      this.setState({showShake: false});
      this.shakeOn(shakeAgainAfter);
    }, ms);
  }

  shakeOn(ms) {
    this.props.setTimeout(() => {
      this.setState({showShake: true});
      this.shakeOff(shakeForLength);
    }, ms);
  }

  render() {
    const { image, text } = this.props;
    const { showShake } = this.state;

    return (
      <div className="achievment">
        <div className={cx('achievment-wrapper', { shake: showShake })}>
          <UnResponsiveImage image={image} className="achievment-picture" />
          <p className="achievment-paragraph">{text}</p>
        </div>
      </div>
    );
  }
}

const AchievementSlide = reactTimeout(_AchievementSlide);

export const mapAchievementSlide = (achievement, index) => {
  const { image, text } = achievement;
  return (
    <AchievementSlide key={index.toString()} image={image} text={text} />
  );
};
