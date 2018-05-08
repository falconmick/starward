import React from 'react';
import { UnResponsiveImage } from '../Block/ResponsiveImage';
import { WP_SIZE_MEDIUM_LARGE } from '../../utils/constants';
import { Header } from '../Block/Header';
import { RenderContent } from '../Content/RenderContent';
import { ResponsiveBackgroundCover } from '../Block/ResponsiveBackground';

const TeamMember = props => {
  const { name, jobRole, photo, biography } = props;

  return (
    <div className="team-member-wrapper">
      <div className="team-member-container">
        <div className="banner">
          <ResponsiveBackgroundCover image={photo} size={WP_SIZE_MEDIUM_LARGE} className="team-member-photo">
            <div className="title">
              <Header h5 className="member-header">{name}</Header>
              <p className="job-role">{jobRole}</p>
            </div>
          </ResponsiveBackgroundCover>
        </div>
        <RenderContent content={biography} useReactRouter className="team-member-bio" />
      </div>
    </div>
  );
};

export const mapTeamMember = (props, index) => {
  return (
    <TeamMember {...props} key={index.toString()} />
  );
};
