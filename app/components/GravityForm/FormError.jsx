import React from 'react';

export const FormError = props => {
  const { errorMessage, showError } = props;
  if (showError) return <div className="form_error">{errorMessage}</div>;
  return <span />;
};
