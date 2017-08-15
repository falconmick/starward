import React from 'react';
import PropTypes from 'prop-types';

export const FormField = props => {
  const { children, isValid, cssClass, fieldType } = props;
  return (
    <div className={!isValid ? `field error ${cssClass}` : `field ${cssClass}`}>
      <div className={fieldType}>
        {children}
      </div>
    </div>
  );
};

FormField.propTypes = {
  fieldType: PropTypes.string,
  cssClass: PropTypes.string.isRequired,
  isValid: PropTypes.bool,
  children: PropTypes.node
};
