import React, { PureComponent } from 'react';
import { Header } from '../Block/Header';
import { RenderContent } from '../Content/RenderContent';
import { Email, Phone } from '../Block/Contact';
import { StarwardLink } from '../Block/StarwardLink';
import { SVGIcon } from '../Block/SVGIcon';
import { Collapsible } from '../Block/Collapsible';

export class LocationItem extends PureComponent {
  constructor(props) {
    super(props);

    this.renderTitle = this.renderTitle.bind(this);
    this.renderCollapsed = this.renderCollapsed.bind(this);
  }

  renderTitle() {
    const { office } = this.props;
    return (
      <Header h6>{office}</Header>
    );
  }

  renderCollapsed() {
    const { location, telephone, email, googleMapsLink, facebookLink } = this.props;
    return (
      <div className="location-collapsed">
        <RenderContent element="p" content={location} />
        <p className="tel">T <Phone number={telephone} /></p>
        <p className="mail">E <Email email={email} subject="Website Contact" /></p>
        <p className="goog-n-book">
          <span className="google-map">
            <SVGIcon name="google_plus_icon" width="17px" height="17px" />&nbsp;<span>See us on <StarwardLink url={googleMapsLink} external target="_blank">Google Maps</StarwardLink> for location & reviews</span>
          </span>
          <span className="facebook-link">
            <SVGIcon name="facebook_icon" width="17px" height="17px" />&nbsp;<span>See our <StarwardLink url={facebookLink} external target="_blank">Facebook</StarwardLink> page reviews & more</span>
          </span>
        </p>
      </div>
    );
  }

  render() {
    const { className } = this.props;

    return (
      <Collapsible
        autoExpandTablet
        expandTitleClick
        className={className}
        renderTitle={this.renderTitle}
        renderCollapsed={this.renderCollapsed}
        className="location-item"
      />
    );
  }
}

export const mapLocationItem = (props, index) => {
  return (
    <LocationItem {...props} key={index.toString()} />
  );
};
