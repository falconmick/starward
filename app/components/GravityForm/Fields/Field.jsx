import React from 'react';
import PropTypes from 'prop-types';

export const Field = props => {
  const { htmlFor, label, isRequired, children } = props;

  return (
    <label htmlFor={htmlFor}>
      {label}{isRequired ? <abbr>*</abbr> : null}
      {children}
    </label>
  );
};

Field.propTypes = {
  htmlFor: PropTypes.string,
  label: PropTypes.string.isRequired,
  isRequired: PropTypes.bool,
  children: PropTypes.node
};
