import React from 'react';
import { ColorSection } from '../Section';
import { Director, mapTeamMember } from '../../TeamBio';

export const TeamBio = props => {
  const { employees: [director, ...staff] } = props;


  return (
    <ColorSection
      name="Team Bio"
      backgroundColor="light"
    >
      <div className="director-wrapper">
        <Director {...director} />
      </div>
      <div className="team-wrapper med-padded wrapper-container">
        {staff.map(mapTeamMember)}
      </div>
    </ColorSection>
  );
};
