import React from 'react';
import { ColorSection } from '../Section';
import { Header } from '../../Block/Header';
import { UnResponsiveImage } from '../../Block/ResponsiveImage';
import { RenderContent } from '../../Content/RenderContent';

const mapDetail = (props, index) => {
  const { icon, content } = props;

  return (
    <li className="icon-detail" key={index.toString()}>
      <UnResponsiveImage image={icon} className="detail-icon" />
      <RenderContent content={content} className="detail-paragraph" useReactRouter rewriteAssets />
    </li>
  );
};

export const IconDetailsList = props => {
  const { header, detailsList } = props;

  return (
    <ColorSection
      name="Icon Details List"
      backgroundColor="navy"
      innerClassName="wrapper-container med-padded"
    >
      <Header h3 className="icon-details-header">{header}</Header>
      <ul className="icon-details-wrapper">
        {detailsList.map(mapDetail)}
      </ul>
    </ColorSection>
  );
};

