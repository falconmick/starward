import React from 'react';
import { ColorSection } from '../Section';
import { Header } from '../../Block/Header';
import { mapFacebookReview } from '../../FacebookReview';
import { mapHeroSlide } from '../../Hero/HeroSlide';
import { ControlledSlider } from '../../Sliders';

export const FacebookReviews = props => {
  const { header, reviews } = props;

  return (
    <ColorSection
      name="Facebook Reviews"
      backgroundColor="light"
      innerClassName="wrapper-content med-padded"
    >
      <Header h3 className="share-example-header">{header}</Header>
      <div className="facebook-review-container">
        {reviews.map(mapFacebookReview)}
      </div>
      <ControlledSlider className="facebook-review-slider">
        { reviews.map(mapFacebookReview) }
      </ControlledSlider>
    </ColorSection>
  );
};
