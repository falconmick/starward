import React from 'react';
import { ColorSection } from '../Section';
import { Header } from '../../Block/Header';
import { PackageContainer } from '../../Package';

export const PackageComparison = props => {
  const { header, subHeader, packages } = props;

  return (
    <ColorSection
      name="Package Comparison"
      backgroundColor="light"
    >
      <div className="head wrapper-container med-padded">
        <Header h3 className="package-comparison-header">{header}</Header>
        {subHeader && <p className="package-comparison-subheader">{subHeader}</p>}
      </div>
      <PackageContainer packages={packages} />
    </ColorSection>
  );
};

