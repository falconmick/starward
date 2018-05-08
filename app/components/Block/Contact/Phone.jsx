import React from 'react';
import PropTypes from 'prop-types';
import { removeAllNonDigits } from '../../../utils/starward';
import { StarwardLink } from '../StarwardLink';

export const Phone = props => {
  const { number } = props;

  const link = `tel:${removeAllNonDigits(number)}`;
  return (
    <StarwardLink href={link} className="phone">{number}</StarwardLink>
  );
};

Phone.propTypes = {
  number: PropTypes.string,
};
