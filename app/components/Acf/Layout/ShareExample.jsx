import React from 'react';
import { ColorSection } from '../Section';
import { Header } from '../../Block/Header';
import { mapShareExampleRow } from '../../ShareExample/ShareExampleRow';

export const ShareExample = props => {
  const { title, subHeader, examples } = props;

  return (
    <ColorSection
      name="Share Example"
      backgroundColor="light"
      innerClassName="wrapper-small med-padded"
    >
      <Header h3 className="share-example-header">{title}</Header>
      <p className="share-example-subheader">{subHeader}</p>
      <div className="example-container">
        {examples && examples.map(mapShareExampleRow)}
      </div>
    </ColorSection>
  );
};
