import React from 'react';
import { ResponsiveBackgroundCover } from '../Block/ResponsiveBackground';
import { HeroSlideTitleSection } from './HeroSlideTitleSection';
import { IconColumns } from './IconColumns';

export const mapHeroSlide = (slide, index) => {
  const { background, showTitle, title, subtitle, showIconColumns, iconColumnsTitle, iconColumns } = slide;

  const mask = {
    maskColor: '#2E2E2E',
    maskOpacity: 0.85,
  };

  return (
    <ResponsiveBackgroundCover image={background} key={index.toString()} className="hero-slide" mask={mask}>
      <div className="slide-content-wrapper">
        {showTitle && <HeroSlideTitleSection title={title} subtitle={subtitle} sliderNumber={index} />}
        {showIconColumns && <IconColumns iconColumnsTitle={iconColumnsTitle} iconColumns={iconColumns} />}
      </div>
    </ResponsiveBackgroundCover>
  );
};
