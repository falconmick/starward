import React from 'react';
import PropTypes from 'prop-types';
import { ResponsiveBackgroundCover } from '../Block/ResponsiveBackground';
import { Header } from '../Block/Header';
import { RenderContent } from '../Content/RenderContent';
import { WP_SIZE_LARGE } from '../../utils/constants';
import { UnResponsiveImage } from '../Block/ResponsiveImage';

export const Director = props => {
  const { name, jobRole, photo, biography } = props;

  return (
    <div className="director-wrapper-inner">
      <UnResponsiveImage image={photo} className="director-photo" size={WP_SIZE_LARGE} />
      <div className="floating-head-box wrapper-container med-padded">
        <UnResponsiveImage image={photo} className="director-photo-desktop" size={WP_SIZE_LARGE} />
        <div className="director-bio">
          <Header h3 className="director-header">{name}</Header>
          <p className="sub-header">{jobRole}</p>
          <RenderContent content={biography} useReactRouter />
        </div>
      </div>
    </div>
  );
};

Director.propTypes = {};
