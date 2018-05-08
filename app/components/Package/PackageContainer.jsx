import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { mapPackageBody, mapPackageFooter, mapPackageTabTitle } from './Package';

export class PackageContainer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { activeTab: 1 };

    this.setActiveTab = this.setActiveTab.bind(this);
  }

  setActiveTab(activeTab) {
    this.setState({activeTab});
  }

  render() {
    const { packages } = this.props;
    const { activeTab } = this.state;
    return (
      <div className="package-container">
        <nav className="mobile-tabs">
          <ul className="wrapper-container med-padded">
            {packages.map(mapPackageTabTitle({activeTab, setActiveTab: this.setActiveTab}))}
          </ul>
        </nav>
        <div className="packages">
          <div className="package-bodies">
            {packages.map(mapPackageBody({activeTab}))}
          </div>
          <div className="package-footers">
            {packages.map(mapPackageFooter({activeTab}))}
          </div>
        </div>
      </div>
    );
  }
}

PackageContainer.propTypes = {
  packages: PropTypes.array,
};
