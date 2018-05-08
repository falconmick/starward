import React, { PureComponent } from 'react';
import { Collapsible } from '../Block/Collapsible';
import { SVGIcon } from '../Block/SVGIcon';

export class DisclaimerCopyright extends PureComponent {
  constructor(props) {
    super(props);


    this.renderTitle = this.renderTitle.bind(this);
    this.renderCollapsed = this.renderCollapsed.bind(this);
    this.renderExpandButton = this.renderExpandButton.bind(this);
  }

  renderTitle() {
    return (
      <p className="mobile-title">Terms & Conditions</p>
    );
  }

  renderCollapsed() {
    return (
      <p className="disclaimer-copyright-body">
        Copyright 2017 Sell My Shares. All Rights Reserved. This site has been prepared by Riverstone Corporate Pty Ltd trading as Sell My Shares (ABN 42 883 208 403) an Authorised Representative (number 405311) of Barclay Wells Limited (ABN 88 009 352 836) which holds AFS Licence 235 070. Sell My Shares acts as an agent of Barclay Wells Ltd.
      </p>
    );
  }

  renderExpandButton() {
    return (
      <SVGIcon name="close_expand" width="10px" height="10px" />
    );
  }

  render() {
    return (
      <Collapsible
        autoExpandDesktop
        expandTitleClick
        className="disclaimer-copyright"
        renderTitle={this.renderTitle}
        renderCollapsed={this.renderCollapsed}
        renderExpandButton={this.renderExpandButton}
      />
    );
  }
}
