import React from 'react';
import PropTypes from 'prop-types';
import { removeAllNonDigits } from '../../../utils/starward';
import { StarwardLink } from '../StarwardLink';

export const Email = props => {
  const { email, subject } = props;

  const encodedSubject = encodeURIComponent(subject || '');
  const subjectString = encodedSubject === '' ? '' : `?Subject=${encodedSubject}`;
  const link = `mailto:${email}${subjectString}`;
  return (
    <StarwardLink href={link} className="email">{email}</StarwardLink>
  );
};

Email.propTypes = {
  email: PropTypes.string,
  subject: PropTypes.string,
};
