import React from 'react';
import PropTypes from 'prop-types';

export const Required = props => {
  const { isRequired } = props;
  return isRequired ? <abbr>*</abbr> : null;
};

export const Field = props => {
  const { htmlFor, label, isRequired, children } = props;

  return (
    <label htmlFor={htmlFor}>
      {label}<Required isRequired={isRequired} />
      {children}
    </label>
  );
};

Field.propTypes = {
  htmlFor: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.string.isRequired,
  isRequired: PropTypes.bool,
  children: PropTypes.node
};
