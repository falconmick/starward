import React from 'react';
import { BackgroundSection } from '../Section';
import { RenderContent } from '../../Content/RenderContent';
import { ResponsiveImage, UnResponsiveImage } from '../../Block/ResponsiveImage';

const RenderParagraph = props => {
  const { paragraph } = props;

  return (
    <RenderContent content={paragraph} className="step-paragraph" useReactRouter rewriteAssets />
  );
};

const mapStep = (props, index) => {
  const { icon, asideParagraph } = props;

  return (
    <li className="step-step" key={index.toString()}>
      <UnResponsiveImage image={icon} />
      <RenderContent content={asideParagraph} className="aside-paragraph" useReactRouter rewriteAssets />
    </li>
  );
};

const RenderSteps = props => {
  const { steps } = props;

  return (
    <ul className="step-list">
      {steps.map(mapStep)}
    </ul>
  );
};

const mapSimpleStepContent = (content, index) => {
  const { type, ...otherContent } = content;
  return (
    <div className="step-content" key={index.toString()}>
      {type === 'p' && <RenderParagraph {...otherContent} />}
      {type === 's' && <RenderSteps {...otherContent} />}
    </div>
  );
};

export const SimpleSteps = props => {
  const { image, content } = props;

  return (
    <BackgroundSection
      name="Simple Steps"
      backgroundColor="white"
      innerClassName="wrapper-content med-padded"
      image={image}
    >
      <div className="step-wrapper">
        {content.map(mapSimpleStepContent)}
      </div>
    </BackgroundSection>
  );
};

