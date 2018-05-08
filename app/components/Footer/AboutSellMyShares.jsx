import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { BrandLogo } from '../Block/BrandLogo';
import { Header } from '../Block/Header';
import { Collapsible } from '../Block/Collapsible';
import { LinkSVGIcon } from '../Block/SVGIcon';

const mapSocialIcon = (props, index) => {
  const { type, url } = props;

  return (
    <LinkSVGIcon name={`${type}_icon`} url={url} external key={index.toString()} />
  );
};

export class AboutSellMyShares extends PureComponent {
  constructor(props) {
    super(props);

    this.renderTitle = this.renderTitle.bind(this);
    this.renderCollapsed = this.renderCollapsed.bind(this);
  }

  renderTitle() {
    return (
      <div className="about-sell-my-shares-title">
        <BrandLogo src="/assets/images/url/sellmyshares-logo-white.svg" url="/" linkClassName="sell-my-share-icon" />
        <Header h3>About Sell My Shares</Header>
      </div>
    );
  }

  renderCollapsed() {
    const { socialLinks } = this.props;
    return (
      <div className="about-sell-my-shares-body">
        <p>
          Sell My Shares was founded in 2013 by two stockbrokers who noticed that people who just wanted to sell their shares with minimum fuss had few options outside of opening a fully fledged stockbroking account.
        </p>
        <p>
          We decided to love this type of business, and these clients, and that’s what we do – very well.
        </p>
        <div className="social-buttons">
          {socialLinks.map(mapSocialIcon)}
        </div>
      </div>
    );
  }

  render() {
    return (
      <Collapsible
        autoExpandDesktop
        expandTitleClick
        className="about-sell-my-shares"
        renderTitle={this.renderTitle}
        renderCollapsed={this.renderCollapsed}
      />
    );
  }
}

AboutSellMyShares.propTypes = {
  socialLinks: PropTypes.array,
};
