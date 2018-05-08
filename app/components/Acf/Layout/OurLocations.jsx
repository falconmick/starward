import React from 'react';
import cx from 'classnames';
import { ColorSection } from '../Section';
import { Header } from '../../Block/Header';
import { FooterMap } from '../../FooterMap';
import { LocationList } from '../../LocationList';

export const OurLocations = props => {
  const { header } = props;

  return (
    <ColorSection
      name="Our Locations"
      backgroundColor="light"
    >
      <div className="map-container">
        <FooterMap />
      </div>
      <div className="locations med-padded wrapper-content">
        {header && <Header>{header}</Header>}
        <LocationList />
      </div>
    </ColorSection>
  );
};
